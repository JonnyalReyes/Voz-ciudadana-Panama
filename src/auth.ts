// src/auth.ts

import NextAuth from "next-auth";
import type { User, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/src/lib/db";
import bcrypt from 'bcrypt';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const [rows]: any[] = await db.query(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );
        const user = rows[0];

        if (!user) return null;
        if (user.status !== 'approved') throw new Error("UserNotApproved");

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordsMatch) return null;

        return {
          id: user.id.toString(),
          name: `${user.nombre} ${user.apellido}`,
          email: user.email,
          role: user.role,
        } as User;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.role = (user as any).role;
        console.log("CALLBACK JWT:", token);
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        console.log("CALLBACK SESSION:", session);
      }
      return session;
    },
  },
  pages: {
    signIn: "/registro",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig);