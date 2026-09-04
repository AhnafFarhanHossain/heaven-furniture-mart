import { config } from "dotenv";
import { MongoClient } from "mongodb";

// Match Vite's local environment convention while keeping secrets server-side.
// The first file wins because dotenv does not overwrite an existing variable.
config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "heaven_furniture";

let client;
let dbPromise;

// A single MongoClient is reused for the lifetime of the process; the driver
// manages its own connection pool internally, so per-request connects would
// only add latency.
export function getDb() {
  if (!MONGODB_URI) {
    return Promise.reject(
      new Error(
        "MONGODB_URI is not set. Copy .env.example to .env and add your connection string.",
      ),
    );
  }

  if (!dbPromise) {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });

    dbPromise = client
      .connect()
      .then(async (connected) => {
        const db = connected.db(DB_NAME);
        // Index submission time for reverse-chronological reads in an admin view.
        await db
          .collection("contacts")
          .createIndex({ createdAt: -1 })
          .catch(() => {});
        return db;
      })
      .catch((error) => {
        // Reset so a later request can retry instead of caching a failed promise.
        dbPromise = undefined;
        throw error;
      });
  }

  return dbPromise;
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    dbPromise = undefined;
  }
}
