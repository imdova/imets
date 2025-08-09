import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // In a real app, you would query your database here
          // User credentials
          // Admin credentials
          if (
            credentials?.email === "admin@imets.com" &&
            credentials?.password === "admin123"
          ) {
            return {
              id: "3",
              name: "Admin Account",
              image:
                "https://img.freepik.com/premium-photo/portrait-smiling-young-woman-pastel-casual-clothes-looking-camera-holding-hands-crossed-isolated-gray-wall-background-studio-people-sincere-emotions-lifestyle-concept-mock-up-copy-space_365776-24391.jpg",
              email: "admin@akar.com",
              role: "admin",
            };
          }

          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = user.role; // Using 'role' instead of 'type' for better semantics
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
