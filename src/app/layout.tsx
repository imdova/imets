import { Roboto } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/NextAuthProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en" className={roboto.variable}>
        <body className="antialiased">{children}</body>
      </html>
    </NextAuthProvider>
  );
}
