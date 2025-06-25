// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

/**
 * Extiende el token JWT para incluir nuestras propiedades personalizadas (id y role).
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}

/**
 * Extiende la sesión y el usuario para que TypeScript sepa de nuestras
 * propiedades personalizadas en el objeto `session` del lado del cliente.
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]; // Mantiene las propiedades originales (name, email, image)
  }

  interface User extends DefaultUser {
    role: string;
  }
}