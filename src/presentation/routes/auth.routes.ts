// ==========================================
// PRESENTATION LAYER - Auth Routes
// ==========================================

import { Hono } from "hono";
import { AuthController } from "../controllers/auth.controller";

const authRouter = new Hono();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;
