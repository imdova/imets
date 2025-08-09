"use client";

import React from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "width=600,height=400",
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank",
      "width=600,height=400",
    );
  };

  const shareOnX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank",
      "width=600,height=400",
    );
  };

  // Removed shareOnPinterest function as it's no longer needed.

  return (
    <div className="flex gap-3">
      <button
        onClick={shareOnFacebook}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-main text-white shadow-md transition-colors duration-200 hover:bg-main-dark"
        aria-label="Share on Facebook"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={shareOnLinkedIn}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-main text-white shadow-md transition-colors duration-200 hover:bg-main-dark"
        aria-label="Share on LinkedIn"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </button>

      <button
        onClick={shareOnX}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-main text-white shadow-md transition-colors duration-200 hover:bg-main-dark"
        aria-label="Share on X (formerly Twitter)"
      >
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.75 11.392H20.25L10.253 12.01 2.25 2.25H8.08l6.075 6.94L18.244 2.25zm-.308 1.352L3.493 21.75h-.76l9.5-10.91L1.75 2.25h8.08L14.244 8.71l4.004-4.508z" />
        </svg>
      </button>
      {/* Pinterest button removed */}
    </div>
  );
};

export default ShareButtons;
