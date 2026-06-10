import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { inscriptions } from "../../drizzle/schema";

export async function checkCPFExists(cpf: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(inscriptions)
    .where(eq(inscriptions.cpf, cpf))
    .limit(1);

  return result.length > 0;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db
    .select()
    .from(inscriptions)
    .where(eq(inscriptions.email, email))
    .limit(1);

  return result.length > 0;
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function isValidCPF(cpf: string): boolean {
  const cleanCPF = formatCPF(cpf);

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
