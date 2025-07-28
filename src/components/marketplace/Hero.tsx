"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero3.jpg",
    title: "Fresh From the Farm to Your Table",
    description:
      "Shop quality produce directly from trusted farmers across the country. No middlemen, just real freshness.",
    position: "left",
  },
  {
    id: 2,
    image: "/images/hero10.jpg",
    title: "Support Local. Shop Smart.",
    description:
      "Discover affordable, farm-fresh goods while empowering local communities and sustainable agriculture.",
    position: "right",
  },
];

export default function MarketHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[34vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="opacity-100"
            priority={index === currentSlide}
          />

          {/* Animated Content */}
          <div
            className={`absolute bottom-4 left-6 right-6 md:left-8 md:right-8 flex transition-all duration-1000 ${
              slide.position === "left" ? "justify-start" : "justify-end"
            }`}
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 max-w-2xl text-left shadow-xl">
              <div className="space-y-4 text-white drop-shadow">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg font-[Plus Jakarta Sans]">
                  {slide.title}
                </h1>
                <p className="text-white/100 font-[Inter] text-base leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
