// ==========================================
// APPLICATION LAYER - Use Case: Register
// Berisi business logic murni, tidak tahu soal HTTP atau database
// ==========================================

import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { IRoleRepository } from "../../domain/repositories/role.repository.interface";
import { CreateUserDTO, UserEntity } from "../../domain/entities/user.entity";

export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<UserEntity> {
    // 1. Validasi email sudah dipakai atau belum
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    // 2. Validasi roleId valid
    const role = await this.roleRepository.findById(data.roleId);
    if (!role) {
      throw new Error("Role tidak ditemukan");
    }

    // 3. Hash password
    const hashedPassword = await Bun.password.hash(data.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // 4. Simpan user baru
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }
}
