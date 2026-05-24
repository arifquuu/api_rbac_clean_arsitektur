// ==========================================
// DOMAIN LAYER - Role Repository Interface
// ==========================================

export interface RoleEntity {
  id: string;
  name: string;
}

export interface IRoleRepository {
  findById(id: string): Promise<RoleEntity | null>;
  findAll(): Promise<RoleEntity[]>;
}
