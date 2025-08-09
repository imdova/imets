"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  name = "User",
  size = "md",
  className = "",
}) => {
  // Get the first letter of the name
  const initial = name?.charAt(0).toUpperCase() || "U";

  // Generate a consistent color based on the name
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  const colorIndex = (name?.charCodeAt(0) || 0) % colors.length;
  const bgColor = colors[colorIndex];

  // Size classes
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center rounded-full ${sizeClasses[size]} ${bgColor} font-semibold text-white ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {src ? (
        <Image
          src={src}
          alt={name || "User avatar"}
          fill
          className="rounded-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {initial}
        </motion.span>
      )}
      {/* Active status indicator (optional) */}
      <motion.div
        className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      />
    </motion.div>
  );
};

export default Avatar;
