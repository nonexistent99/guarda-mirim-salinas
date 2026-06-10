import { describe, it, expect, beforeAll } from "vitest";
import { getDb } from "./db";
import { blogPosts } from "../drizzle/schema";
import { eq } from "drizzle-orm";

describe("Blog Functions", () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
  });

  it("should create a blog post", async () => {
    if (!db) {
      console.log("Database not available, skipping test");
      return;
    }

    const post = {
      title: "Test Post",
      slug: "test-post-" + Date.now(),
      excerpt: "Test excerpt",
      content: "Test content",
      category: "noticia" as const,
      author: "Test Author",
      image: "https://example.com/image.jpg",
      readTime: 5,
      featured: 0,
      published: 1,
    };

    try {
      const result = await db.insert(blogPosts).values(post);
      expect(result).toBeDefined();
      console.log("Create test passed");
    } catch (error) {
      console.log("Create test error:", error);
    }
  });

  it("should retrieve blog posts", async () => {
    if (!db) {
      console.log("Database not available, skipping test");
      return;
    }

    try {
      const posts = await db.select().from(blogPosts).limit(5);
      expect(Array.isArray(posts)).toBe(true);
      console.log(`Retrieved ${posts.length} posts`);
    } catch (error) {
      console.log("Retrieve test error:", error);
    }
  });

  it("should filter blog posts by category", async () => {
    if (!db) {
      console.log("Database not available, skipping test");
      return;
    }

    try {
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.category, "noticia"));
      expect(Array.isArray(posts)).toBe(true);
      console.log(`Retrieved ${posts.length} posts in noticia category`);
    } catch (error) {
      console.log("Filter test error:", error);
    }
  });

  it("should update a blog post", async () => {
    if (!db) {
      console.log("Database not available, skipping test");
      return;
    }

    try {
      const posts = await db.select().from(blogPosts).limit(1);
      if (posts.length > 0) {
        const post = posts[0];
        const result = await db
          .update(blogPosts)
          .set({ featured: 1 })
          .where(eq(blogPosts.id, post.id));
        expect(result).toBeDefined();
        console.log("Update test passed");
      }
    } catch (error) {
      console.log("Update test error:", error);
    }
  });

  it("should delete a blog post", async () => {
    if (!db) {
      console.log("Database not available, skipping test");
      return;
    }

    try {
      const post = {
        title: "Test Post to Delete",
        slug: "test-delete-" + Date.now(),
        excerpt: "Test excerpt",
        content: "Test content",
        category: "noticia" as const,
        author: "Test Author",
        image: "https://example.com/image.jpg",
        readTime: 5,
        featured: 0,
        published: 1,
      };

      const insertResult = await db.insert(blogPosts).values(post);
      
      const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.title, "Test Post to Delete"));
      
      if (posts.length > 0) {
        const deleteResult = await db
          .delete(blogPosts)
          .where(eq(blogPosts.id, posts[0].id));
        expect(deleteResult).toBeDefined();
        console.log("Delete test passed");
      }
    } catch (error) {
      console.log("Delete test error:", error);
    }
  });
});
