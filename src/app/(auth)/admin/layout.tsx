"use client";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/Header/Header";

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  // Create a safe user object with default values
  const safeUser = {
    id: session?.user?.id || "",
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    image: session?.user?.image || "",
    role: session?.user?.role || "user",
  };

  return (
    <div className="flex min-h-screen">
      <div>
        <Sidebar user={safeUser} />
      </div>
      <main className="container flex-1 overflow-hidden lg:max-w-[1440px]">
        <Header />
        <div className="pt-2 lg:px-4">{children}</div>
      </main>
    </div>
  );
};

export default AccountLayout;
