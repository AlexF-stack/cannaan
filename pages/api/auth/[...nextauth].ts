import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { isValidAdminPassword } from "@/lib/admin-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = process.env.ADMIN_USERNAME ?? "admin";

        if (
          credentials?.username === username &&
          isValidAdminPassword(credentials?.password ?? "")
        ) {
          return { id: "1", name: "Admin", role: "admin" };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
