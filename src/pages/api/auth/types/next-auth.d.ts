import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      isAdmin?: boolean | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    isAdmin?: boolean | null;
  }
}
