import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

type userType = "default" | "admin";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: userType;
    } & DefaultSession["default"];
  }

  interface User extends DefaultUser {
    id: string;
    name?: string | null;
    email: string;
    role: userType;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: userType;
  }
}
