// ==========================================
// INFRASTRUCTURE LAYER - Middleware: Role-Based Access Control
// Cek apakah user punya role yang diizinkan
// ==========================================

import { Context, Next } from "hono";
import { AuthTokenPayload } from "../../domain/entities/user.entity";

/**
 * Factory function untuk membuat middleware pengecekan role.
 * 
 * Contoh penggunaan:
 *   app.get('/admin', authMiddleware, roleMiddleware(['ADMIN']), controller)
 *   app.get('/shared', authMiddleware, roleMiddleware(['ADMIN', 'USER']), controller)
 */
export function roleMiddleware(allowedRoles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as AuthTokenPayload;

    if (!user) {
      return c.json({ message: "Unauthorized: User tidak ditemukan" }, 401);
    }

    const hasAccess = allowedRoles.includes(user.role);
    if (!hasAccess) {
      return c.json({ message: "No access" }, 403);
    }

    await next();
  };
}
