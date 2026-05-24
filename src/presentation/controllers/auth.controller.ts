// ==========================================
// PRESENTATION LAYER - Auth Controller
// Hanya menangani HTTP Request/Response
// Business logic ada di Use Cases
// ==========================================

import { Context } from "hono";
import { RegisterUseCase } from "../../application/use-cases/register.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { PrismaUserRepository } from "../../infrastructure/repositories/user.repository";
import { PrismaRoleRepository } from "../../infrastructure/repositories/role.repository";

// Dependency Injection: Controller → Use Case → Repository
const userRepository = new PrismaUserRepository();
const roleRepository = new PrismaRoleRepository();
const registerUseCase = new RegisterUseCase(userRepository, roleRepository);
const loginUseCase = new LoginUseCase(userRepository);

export class AuthController {
  /**
   * POST /api/auth/register
   */
  static async register(c: Context) {
    try {
      const body = await c.req.json();
      const { email, password, roleId } = body;

      // Validasi input sederhana di presentation layer
      if (!email || !password || !roleId) {
        return c.json(
          { message: "Email, password, dan roleId wajib diisi" },
          400
        );
      }

      if (password.length < 6) {
        return c.json(
          { message: "Password minimal 6 karakter" },
          400
        );
      }

      const user = await registerUseCase.execute({ email, password, roleId });

      return c.json(
        {
          message: "Registrasi berhasil",
          data: {
            id: user.id,
            email: user.email,
            role: user.role?.name,
          },
        },
        201
      );
    } catch (error: any) {
      // Business error dari use case
      return c.json({ message: error.message }, 400);
    }
  }

  /**
   * POST /api/auth/login
   */
  static async login(c: Context) {
    try {
      const body = await c.req.json();
      const { email, password } = body;

      if (!email || !password) {
        return c.json({ message: "Email dan password wajib diisi" }, 400);
      }

      const result = await loginUseCase.execute({ email, password });

      return c.json({
        message: "Login berhasil",
        token: result.token,
        data: result.user,
      });
    } catch (error: any) {
      return c.json({ message: error.message }, 401);
    }
  }
}
