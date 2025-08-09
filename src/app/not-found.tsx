"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFoundClient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md text-center">
        <div className="relative mb-8">
          <h1 className="text-secondary text-9xl font-bold opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-secondary text-3xl font-semibold">
              Page Not Found
            </h2>
          </div>
        </div>

        <p className="mb-8 text-lg text-main">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link href="/">
          <button className="bg-setext-secondary transform rounded-lg bg-main px-6 py-3 font-medium text-white shadow-md transition duration-300 hover:scale-105">
            Back to Home
          </button>
        </Link>

        <p className="mt-8 text-sm text-main">
          If you think this is a mistake, please contact us.
        </p>
      </div>
    </motion.div>
  );
}
