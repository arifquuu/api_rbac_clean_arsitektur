// ==========================================
// INFRASTRUCTURE LAYER - Prisma Singleton
// ==========================================

import { PrismaClient } from "@prisma/client";

// Singleton pattern agar tidak buat koneksi berulang
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
});

export default prisma;
