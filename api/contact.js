import { getDb } from "./_db.js";
import { rateLimit } from "./_rateLimit.js";
import { validateContact } from "../server/validateContact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed." });
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : String(forwardedFor || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
  const limit = rateLimit(ip);

  if (!limit.allowed) {
    res.setHeader("Retry-After", String(limit.retryAfter));
    return res.status(429).json({
      ok: false,
      message: "That's a few messages already. Please try again a bit later.",
    });
  }

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
      userAgent: String(req.headers["user-agent"] || "").slice(0, 300),
      createdAt: new Date(),
    });

    return res.status(201).json({
      ok: true,
      id: result.insertedId,
      message: "Thanks. We'll get back to you within a day.",
    });
  } catch (error) {
    console.error("[contact] insert failed:", error.message);
    return res.status(503).json({
      ok: false,
      message: "We couldn't send that just now. Please try again shortly.",
    });
  }
}
