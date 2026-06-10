import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogPosts, contactMessages, InsertBlogPost, InsertContactMessage, inscriptions, settings, Inscription, InsertInscription, galleryPhotos, InsertGalleryPhoto } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Blog Posts Queries
export async function getBlogPosts(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(blogPosts).where(eq(blogPosts.published, 1)).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);
}

export async function getAllBlogPosts(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(limit).offset(offset);
}

export async function getBlogPostById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogPost(post: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(blogPosts).values(post);
  return result;
}

export async function updateBlogPost(id: number, post: Partial<InsertBlogPost>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(blogPosts).set(post).where(eq(blogPosts.id, id));
}

export async function deleteBlogPost(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
}

// Contact Messages Queries
export async function getContactMessages(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(limit).offset(offset);
}

export async function createContactMessage(message: InsertContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(contactMessages).values(message);
  return result;
}

export async function markMessageAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(contactMessages).set({ read: 1 }).where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}


// Inscriptions Queries
export async function createInscription(inscription: any) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(inscriptions).values(inscription);
  return result;
}

export async function getInscriptions(limit: number = 10, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(inscriptions).orderBy(desc(inscriptions.createdAt)).limit(limit).offset(offset);
}

export async function getInscriptionById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(inscriptions).where(eq(inscriptions.id, id));
  return result.length > 0 ? result[0] : null;
}

export async function getInscriptionByNumber(inscriptionNumber: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(inscriptions).where(eq(inscriptions.inscriptionNumber, inscriptionNumber));
  return result.length > 0 ? result[0] : null;
}

export async function updateInscriptionStatus(id: number, status: "pending" | "approved" | "rejected") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(inscriptions).set({ status }).where(eq(inscriptions.id, id));
}

export async function deleteInscription(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.delete(inscriptions).where(eq(inscriptions.id, id));
}

// Settings Queries
export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(settings).where(eq(settings.key, key));
  return result.length > 0 ? result[0].value : null;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getSetting(key);
  if (existing) {
    await db.update(settings).set({ value }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({ key, value });
  }
}

export async function isInscriptionOpen() {
  const value = await getSetting("inscriptions_open");
  return value === "true";
}

// Helper function to generate unique inscription number
export function generateInscriptionNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `GM-${year}-${random}`;
}


// Admin Credentials Functions
export async function createAdminCredential(username: string, email: string, passwordHash: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const { adminCredentials } = await import("../drizzle/schema");
  
  try {
    await db.insert(adminCredentials).values({
      username,
      email,
      passwordHash,
      isActive: 1,
    });
  } catch (error) {
    console.error("Error creating admin credential:", error);
    throw error;
  }
}

export async function getAdminByUsername(username: string) {
  const db = await getDb();
  if (!db) {
    return null;
  }

  const { adminCredentials } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");
  
  try {
    const result = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.username, username))
      .limit(1);
    
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error getting admin by username:", error);
    return null;
  }
}


// Gallery functions
export async function getGalleryPhotos(category?: string) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(galleryPhotos).where(eq(galleryPhotos.published, 1));
    
    if (category) {
      query = db.select().from(galleryPhotos).where(
        and(eq(galleryPhotos.published, 1), eq(galleryPhotos.category, category as any))
      );
    }
    
    return await query.orderBy(desc(galleryPhotos.createdAt));
  } catch (error) {
    console.error("[Database] Failed to get gallery photos:", error);
    return [];
  }
}

export async function getGalleryPhotoById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(galleryPhotos).where(eq(galleryPhotos.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get gallery photo:", error);
    return null;
  }
}

export async function createGalleryPhoto(data: InsertGalleryPhoto) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.insert(galleryPhotos).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create gallery photo:", error);
    return null;
  }
}

export async function updateGalleryPhoto(id: number, data: Partial<InsertGalleryPhoto>) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.update(galleryPhotos).set(data).where(eq(galleryPhotos.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to update gallery photo:", error);
    return null;
  }
}

export async function deleteGalleryPhoto(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.delete(galleryPhotos).where(eq(galleryPhotos.id, id));
    return result;
  } catch (error) {
    console.error("[Database] Failed to delete gallery photo:", error);
    return null;
  }
}


// Get user by ID
export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return null;

  try {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get user by ID:", error);
    return null;
  }
}
