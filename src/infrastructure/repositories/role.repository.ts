// ==========================================
// INFRASTRUCTURE LAYER - Role Repository Implementation
// ==========================================

import { IRoleRepository, RoleEntity } from "../../domain/repositories/role.repository.interface";
import prisma from "../prisma";

export class PrismaRoleRepository implements IRoleRepository {
  async findById(id: string): Promise<RoleEntity | null> {
    const role = await prisma.role.findUnique({ where: { id } });
    if (!role) return null;
    return { id: role.id, name: role.name };
  }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await prisma.role.findMany();
    return roles.map((r) => ({ id: r.id, name: r.name }));
  }
}
