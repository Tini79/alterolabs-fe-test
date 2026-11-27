"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImageGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return (
      <div
        role="img"
        aria-label={`${title} image unavailable`}
        className="aspect-square rounded-xl bg-porcelain"
      />
    );
  }

  return (
    <div className="min-w-0">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-porcelain">
        <Image
          src={images[activeImage]}
          alt={title}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-3"
        />
      </div>
      {images.length > 1 ? (
        <div
          role="group"
          aria-label="Product images"
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
        >
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`Show image ${index + 1} of ${title}`}
              aria-pressed={index === activeImage}
              onClick={() => setActiveImage(index)}
              className={`relative size-16 shrink-0 overflow-hidden rounded-lg border bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                index === activeImage ? "border-accent" : "border-transparent"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="64px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
