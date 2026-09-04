import { MongoClient } from "mongodb";

let cachedClient;
let cachedDb;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || "heaven_furniture";

  if (!uri) {
    throw new Error("MONGODB_URI is not configured in Vercel project settings.");
  }

  if (cachedDb) return cachedDb;

  cachedClient = cachedClient || new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
  });

  if (!cachedClient.topology?.isConnected()) {
    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(dbName);
  await cachedDb.collection("contacts").createIndex({ createdAt: -1 });
  return cachedDb;
}
