// ==========================================
// PRESENTATION LAYER - Protected Routes
// Route yang memerlukan autentikasi dan/atau otorisasi
// ==========================================

import { Hono } from "hono";
import { authMiddleware } from "../../infrastructure/middlewares/auth.middleware";
import { roleMiddleware } from "../../infrastructure/middlewares/role.middleware";
import { TestController } from "../controllers/protected.controller";
import { AdminController } from "../controllers/protected.controller";

const protectedRouter = new Hono();

// ✅ Hanya butuh login (role apapun)
protectedRouter.get("/test", authMiddleware, TestController.authCheck);

// ✅ Hanya ADMIN yang bisa akses
protectedRouter.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  AdminController.adminOnly
);

// ✅ USER dan ADMIN bisa akses
protectedRouter.get(
  "/user",
  authMiddleware,
  roleMiddleware(["USER", "ADMIN"]),
  AdminController.userAccess
);

export default protectedRouter;
