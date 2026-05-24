// ==========================================
// INFRASTRUCTURE LAYER - Middleware: JWT Authentication
// Verifikasi token JWT dari request header
// ==========================================

import { Context, Next } from "hono";
import { verify } from "jsonwebtoken";
import { AuthTokenPayload } from "../../domain/entities/user.entity";

export async function authMiddleware(c: Context, next: Next) {
  try {
    // Ambil token dari Authorization header
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ message: "Token tidak ditemukan" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return c.json({ message: "Server error: JWT tidak dikonfigurasi" }, 500);
    }

    // Verifikasi token
    const payload = verify(token, jwtSecret) as AuthTokenPayload;

    // Simpan payload ke context untuk digunakan controller
    c.set("user", payload);

    await next();
  } catch (error) {
    return c.json({ message: "Token tidak valid atau sudah expired" }, 401);
  }
}
