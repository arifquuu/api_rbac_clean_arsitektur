// ==========================================
// APPLICATION LAYER - Use Case: Login
// ==========================================

import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { LoginUserDTO } from "../../domain/entities/user.entity";
import { sign } from "jsonwebtoken";

interface LoginResult {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: LoginUserDTO): Promise<LoginResult> {
    // 1. Cek apakah user dengan email tersebut ada
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Email atau password salah");
    }

    // 2. Verifikasi password
    const isPasswordValid = await Bun.password.verify(
      data.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Email atau password salah");
    }

    // 3. Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET tidak dikonfigurasi");
    }

    const payload = {
      id: user.id,
      role: user.role?.name ?? "USER",
    };

    const token = sign(payload, jwtSecret, { expiresIn: "1d" });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role?.name ?? "USER",
      },
    };
  }
}
