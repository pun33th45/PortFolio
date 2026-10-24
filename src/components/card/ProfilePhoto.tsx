"use client";

import Image from "next/image";
import { useState } from "react";

const PHOTO_SRC = "/images/puneeth-portrait.jpg";

type ProfilePhotoProps = {
  sizes: string;
  className?: string;
};

// Fills its (aspect-ratio-reserving) parent. Falls back to a monogram if the photo can't load.
export default function ProfilePhoto({ sizes, className }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label="Puneeth Raj"
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold tracking-tight text-[#969A98]"
      >
        PR
      </span>
    );
  }

  return (
    <Image
      src={PHOTO_SRC}
      alt="Puneeth Raj"
      fill
      sizes={sizes}
      quality={85}
      priority
      className={className}
      style={{ objectFit: "cover", objectPosition: "50% 30%" }}
      onError={() => setFailed(true)}
    />
  );
}
