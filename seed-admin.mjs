import crypto from "crypto";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

async function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function seedAdmin() {
  try {
    const connection = await mysql.createConnection(DATABASE_URL);
    
    const passwordHash = await hashPassword("admin123");
    
    // Tentar inserir o admin user
    try {
      await connection.execute(
        "INSERT INTO admin_credentials (username, email, passwordHash, isActive) VALUES (?, ?, ?, ?)",
        ["admin", "admin@guardamirim.com", passwordHash, 1]
      );
      console.log("✓ Admin user created successfully!");
      console.log("  Username: admin");
      console.log("  Password: admin123");
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        console.log("✓ Admin user already exists");
      } else {
        throw error;
      }
    }
    
    await connection.end();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
