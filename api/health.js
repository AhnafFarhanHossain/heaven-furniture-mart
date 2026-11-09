import { getDb } from "./_db.js";

export default async function handler(_req, res) {
  try {
    await getDb();
    return res.status(200).json({ ok: true, db: "connected" });
  } catch (error) {
    console.error("[health] database check failed:", error.message);
    return res.status(503).json({ ok: false, db: "unavailable" });
  }
}
