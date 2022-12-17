import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers heres
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === '/login') return `${baseUrl}/${url}`;
      return `${baseUrl}/settings/profile`;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};
export default NextAuth(authOptions);
