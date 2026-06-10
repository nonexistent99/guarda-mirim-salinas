import { getDb } from "../db";
import { adminCredentials } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

export async function hashPassword(password: string): Promise<string> {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export async function createAdminUser(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; message: string }> {
  const db = await getDb();
  if (!db) return { success: false, message: "Database not available" };

  try {
    const existingUser = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, username))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, message: "Username already exists" };
    }

    const passwordHash = await hashPassword(password);

    await db.insert(adminCredentials).values({
      username,
      email,
      passwordHash,
      isActive: 1,
    });

    return { success: true, message: "Admin user created successfully" };
  } catch (error) {
    console.error("Error creating admin user:", error);
    return { success: false, message: "Error creating admin user" };
  }
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<{ success: boolean; user?: any; message: string }> {
  const db = await getDb();
  if (!db) return { success: false, message: "Database not available" };

  try {
    const user = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, username))
      .limit(1);

    if (user.length === 0) {
      return { success: false, message: "Invalid username or password" };
    }

    const adminUser = user[0];

    if (!adminUser.isActive) {
      return { success: false, message: "Account is inactive" };
    }

    const isPasswordValid = await verifyPassword(password, adminUser.passwordHash);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid username or password" };
    }

    // Update last login
    await db
      .update(adminCredentials)
      .set({ lastLogin: new Date() })
      .where(eq(adminCredentials.id, adminUser.id));

    return {
      success: true,
      user: {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
      },
      message: "Authentication successful",
    };
  } catch (error) {
    console.error("Error authenticating admin:", error);
    return { success: false, message: "Authentication error" };
  }
}

export async function getAdminUserById(id: number): Promise<any> {
  const db = await getDb();
  if (!db) return null;

  try {
    const user = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.id, id))
      .limit(1);

    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error getting admin user:", error);
    return null;
  }
}
