import express from "express";
import { getDb, closeDb } from "./db.js";
import { validateContact } from "./validateContact.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Cap the body size: a contact form never needs more than a few KB, and an
// unbounded parser is a trivial memory-exhaustion vector on a public endpoint.
app.use(express.json({ limit: "16kb" }));
app.disable("x-powered-by");

/**
 * This endpoint is intentionally public (it is a contact form, so there is no
 * user to authenticate). In place of auth it is protected by: a body-size cap,
 * strict field validation, and a fixed-window per-IP rate limit. If this is
 * ever deployed behind a proxy, set `app.set("trust proxy", 1)` so req.ip
 * reflects the real client address, and consider adding a CAPTCHA if spam
 * becomes an issue.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const submissionLog = new Map();

function rateLimit(req, res, next) {
  const key = req.ip || "unknown";
  const now = Date.now();
  const entry = submissionLog.get(key);

  if (!entry || now > entry.resetAt) {
    submissionLog.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      ok: false,
      message: "That's a few messages already. Please try again a bit later.",
    });
  }

  entry.count += 1;
  return next();
}

// Drop expired rate-limit entries so the Map cannot grow without bound.
const sweeper = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of submissionLog) {
    if (now > entry.resetAt) submissionLog.delete(key);
  }
}, RATE_LIMIT_WINDOW_MS);
sweeper.unref();

app.get("/api/health", async (_req, res) => {
  try {
    await getDb();
    res.json({ ok: true, db: "connected" });
  } catch {
    res.status(503).json({ ok: false, db: "unavailable" });
  }
});

app.post("/api/contact", rateLimit, async (req, res) => {
  const { valid, errors, value } = validateContact(req.body);

  if (!valid) {
    return res.status(400).json({
      ok: false,
      message: "Please check the highlighted fields.",
      errors,
    });
  }

  try {
    const db = await getDb();
    const result = await db.collection("contacts").insertOne({
      ...value,
      status: "new",
      source: "faq-contact-form",
      userAgent: String(req.get("user-agent") || "").slice(0, 300),
      createdAt: new Date(),
    });

    return res.status(201).json({
      ok: true,
      id: result.insertedId,
      message: "Thanks. We'll get back to you within a day.",
    });
  } catch (error) {
    // Log server-side, but never leak driver internals to the client.
    console.error("[contact] insert failed:", error.message);
    return res.status(503).json({
      ok: false,
      message: "We couldn't send that just now. Please try again shortly.",
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`[server] API listening on http://localhost:${PORT}`);
});

const shutdown = async (signal) => {
  console.log(`\n[server] ${signal} received, shutting down.`);
  server.close(async () => {
    await closeDb();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
