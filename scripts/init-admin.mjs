import crypto from "crypto";
import { drizzle } from "drizzle-orm/mysql2/http";
import { adminCredentials } from "../drizzle/schema.ts";

const db = drizzle(process.env.DATABASE_URL);

async function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function initAdmin() {
  try {
    const passwordHash = await hashPassword("admin123");
    
    await db.insert(adminCredentials).values({
      username: "admin",
      email: "admin@guardamirim.com",
      passwordHash,
      isActive: 1,
    }).catch(() => {
      console.log("Admin user already exists");
    });

    console.log("Admin user initialized successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error initializing admin user:", error);
  }
}

initAdmin();
