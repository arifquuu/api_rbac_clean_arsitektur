// ==========================================
// INFRASTRUCTURE LAYER - User Repository Implementation
// Implementasi konkret menggunakan Prisma ORM
// ==========================================

import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { CreateUserDTO, UserEntity } from "../../domain/entities/user.entity";
import prisma from "../prisma";

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) return null;

    // Map Prisma model → Domain Entity
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        roleId: data.roleId,
      },
      include: { role: true },
    });

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      role: {
        id: user.role.id,
        name: user.role.name,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
