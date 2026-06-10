import { AXIOS_TIMEOUT_MS, COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import axios, { type AxiosInstance } from "axios";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

// Utility function
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

export type SessionPayload = {
  userId: number;
  role: string;
  name: string;
};

class SDKServer {
  private readonly client: AxiosInstance;

  constructor(client?: AxiosInstance) {
    this.client = client || axios.create({
      timeout: AXIOS_TIMEOUT_MS,
    });
  }

  /**
   * Verify JWT token from cookie
   */
  async verifyToken(token: string): Promise<SessionPayload | null> {
    try {
      const secret = new TextEncoder().encode(ENV.cookieSecret);
      const verified = await jwtVerify(token, secret);
      return verified.payload as SessionPayload;
    } catch (error) {
      console.error("[Auth] Token verification failed:", error);
      return null;
    }
  }

  /**
   * Create JWT token
   */
  async createToken(payload: SessionPayload): Promise<string> {
    const secret = new TextEncoder().encode(ENV.cookieSecret);
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);
    return token;
  }

  /**
   * Get current user from request
   */
  async getCurrentUser(req: Request): Promise<User | null> {
    try {
      const cookies = parseCookieHeader(req.headers.cookie || "");
      const token = cookies[COOKIE_NAME];

      if (!token) {
        return null;
      }

      const payload = await this.verifyToken(token);
      if (!payload) {
        return null;
      }

      const user = await db.getUserById(payload.userId);
      return user || null;
    } catch (error) {
      console.error("[Auth] Failed to get current user:", error);
      return null;
    }
  }
}

export const sdk = new SDKServer();
