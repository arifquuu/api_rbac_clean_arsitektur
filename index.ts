// ==========================================
// ENTRY POINT - index.ts
// Titik masuk aplikasi, setup Hono server
// ==========================================

import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import authRouter from "./src/presentation/routes/auth.routes";
import protectedRouter from "./src/presentation/routes/protected.routes";

const app = new Hono();
const PORT = Number(process.env.PORT) || 4000;

// ==========================================
// Global Middleware
// ==========================================
app.use("*", cors());
app.use("*", logger());

// ==========================================
// Routes
// ==========================================
app.route("/api/auth", authRouter);
app.route("/api", protectedRouter);

// Health check
app.get("/", (c) => c.json({ message: "RBAC API is running 🚀" }));

// 404 handler
app.notFound((c) => c.json({ message: "Route tidak ditemukan" }, 404));

// Global error handler
app.onError((err, c) => {
  console.error(`[Error]:`, err);
  return c.json({ message: "Internal Server Error" }, 500);
});

// ==========================================
// Start Server
// ==========================================
console.log(`✅ Server berjalan di http://localhost:${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
};
