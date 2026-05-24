// ==========================================
// DOMAIN LAYER - Entity
// Representasi murni data bisnis, tidak bergantung framework
// ==========================================

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  roleId: string;
  role?: {
    id: string;
    name: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  roleId: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}
