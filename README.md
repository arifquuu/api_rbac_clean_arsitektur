# API RBAC - Clean Architecture

REST API dengan Role-Based Access Control menggunakan **Bun.js**, **Hono**, **Prisma 6**, dan **MySQL**.

## 🏗️ Struktur Clean Architecture

```
api_rbac_praktek/
├── prisma/
│   ├── schema.prisma       ← Schema database
│   └── seed.ts             ← Data awal (roles)
├── src/
│   ├── domain/             ← INTI BISNIS (paling dalam)
│   │   ├── entities/
│   │   │   └── user.entity.ts        ← Tipe data murni
│   │   └── repositories/
│   │       ├── user.repository.interface.ts   ← Kontrak
│   │       └── role.repository.interface.ts
│   │
│   ├── application/        ← USE CASES / Business Logic
│   │   └── use-cases/
│   │       ├── register.use-case.ts
│   │       └── login.use-case.ts
│   │
│   ├── infrastructure/     ← IMPLEMENTASI KONKRET
│   │   ├── prisma.ts                 ← Prisma singleton
│   │   ├── repositories/
│   │   │   ├── user.repository.ts    ← Prisma implementation
│   │   │   └── role.repository.ts
│   │   └── middlewares/
│   │       ├── auth.middleware.ts    ← Verifikasi JWT
│   │       └── role.middleware.ts    ← Cek role/permission
│   │
│   └── presentation/       ← HTTP LAYER (paling luar)
│       ├── controllers/
│       │   ├── auth.controller.ts
│       │   └── protected.controller.ts
│       └── routes/
│           ├── auth.routes.ts
│           └── protected.routes.ts
│
└── index.ts                ← Entry point
```

## ⚙️ Setup & Instalasi

### 1. Clone & Install Dependencies
```bash
git clone <repo>
cd api_rbac_praktek
bun install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env sesuai konfigurasi database kamu
```

### 3. Setup Database
```bash
# Jalankan migrasi
bun run db:migrate

# Seed data roles (ADMIN & USER)
bun run db:seed
```

### 4. Jalankan Server
```bash
bun run dev   # development (auto-reload)
bun run start # production
```

---

## 📡 API Endpoints

### Auth (Public)

#### Register
```
POST http://localhost:4000/api/auth/register

Body:
{
  "email": "user@mail.com",
  "password": "123456",
  "roleId": "580b3c75-164f-4a3d-9891-9063c472740a"  ← ID role USER
}
```

#### Login
```
POST http://localhost:4000/api/auth/login

Body:
{
  "email": "user@mail.com",
  "password": "123456"
}

Response:
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": { "id": "...", "email": "...", "role": "USER" }
}
```

### Protected (Butuh JWT Token)

Header: `Authorization: Bearer <token>`

#### Test Auth
```
GET http://localhost:4000/api/test

Response:
{
  "message": "Auth success",
  "user": { "id": "...", "role": "USER", "iat": ..., "exp": ... }
}
```

#### Admin Only
```
GET http://localhost:4000/api/admin

ADMIN → { "message": "Welcome Admin" }
USER  → { "message": "No access" }  (403)
```

#### User Access (USER & ADMIN)
```
GET http://localhost:4000/api/user

→ { "message": "Welcome USER", "data": { ... } }
```

---

## 🔑 Role IDs (dari seed)

| Role  | ID                                   |
|-------|--------------------------------------|
| ADMIN | `580b3c75-164f-4a3d-9891-9063c472740b` |
| USER  | `580b3c75-164f-4a3d-9891-9063c472740a` |

---

## 🧠 Konsep Clean Architecture

```
Presentation → Application → Domain ← Infrastructure
```

- **Domain**: Tidak bergantung siapapun (entity & interface)
- **Application**: Bergantung Domain saja (use cases)
- **Infrastructure**: Implementasi konkret (Prisma, JWT)
- **Presentation**: HTTP layer (Hono routes & controllers)

**Aturan emas**: Dependency hanya boleh mengarah ke dalam (ke Domain)
