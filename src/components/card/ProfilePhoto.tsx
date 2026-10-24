"use client";

import Image from "next/image";
import { useState } from "react";

// Drop the real photo at public/images/puneeth-profile.jpg — until then the monogram is shown.
const PHOTO_SRC = "/images/puneeth-profile.jpg";
const SIZE = 112;

export default function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full border border-white/10 bg-[#19191D]"
      style={{ width: SIZE, height: SIZE }}
    >
      {failed ? (
        <span
          role="img"
          aria-label="Puneeth Raj"
          className="flex h-full w-full items-center justify-center text-3xl font-semibold tracking-tight text-[#A5A5AE]"
        >
          PR
        </span>
      ) : (
        <Image
          src={PHOTO_SRC}
          alt="Puneeth Raj"
          width={SIZE}
          height={SIZE}
          quality={85}
          priority
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
