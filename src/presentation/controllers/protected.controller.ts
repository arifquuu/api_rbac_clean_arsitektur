// ==========================================
// PRESENTATION LAYER - Test & Protected Controllers
// Endpoint untuk verifikasi auth dan role
// ==========================================

import { Context } from "hono";
import { AuthTokenPayload } from "../../domain/entities/user.entity";

export class TestController {
  /**
   * GET /api/test
   * Test apakah JWT valid (butuh auth middleware)
   */
  static async authCheck(c: Context) {
    const user = c.get("user") as AuthTokenPayload;

    return c.json({
      message: "Auth success",
      user: {
        id: user.id,
        role: user.role,
        iat: user.iat,
        exp: user.exp,
      },
    });
  }
}

export class AdminController {
  /**
   * GET /api/admin
   * Hanya bisa diakses oleh ADMIN (sudah difilter roleMiddleware)
   */
  static async adminOnly(c: Context) {
    return c.json({ message: "Welcome Admin" });
  }

  /**
   * GET /api/user
   * Bisa diakses USER dan ADMIN
   */
  static async userAccess(c: Context) {
    const user = c.get("user") as AuthTokenPayload;
    return c.json({
      message: `Welcome ${user.role}`,
      data: { id: user.id, role: user.role },
    });
  }
}
