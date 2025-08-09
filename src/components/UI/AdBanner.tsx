import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AdBannerProps {
  imageUrl: string;
  targetUrl: string;
  altText?: string;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  imageUrl,
  targetUrl,
  altText = "Advertisement",
  className = "",
}) => {
  return (
    <div
      className={`relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Link href={targetUrl} passHref>
        <div className="relative aspect-[3/1] h-auto w-full">
          <Image
            src={imageUrl}
            alt={altText}
            className="object-cover transition-transform duration-500 hover:scale-105"
            quality={90}
            width={400}
            height={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
            Ad
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdBanner;
