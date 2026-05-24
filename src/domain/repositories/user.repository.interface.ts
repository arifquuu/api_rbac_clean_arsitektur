// ==========================================
// DOMAIN LAYER - Repository Interface
// Kontrak yang harus diimplementasi oleh infrastructure layer
// ==========================================

import { CreateUserDTO, UserEntity } from "../entities/user.entity";

export interface IUserRepository {
  /**
   * Cari user berdasarkan email
   */
  findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Cari user berdasarkan ID
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Buat user baru
   */
  create(data: CreateUserDTO): Promise<UserEntity>;
}
