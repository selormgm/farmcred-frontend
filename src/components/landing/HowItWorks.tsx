"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GiFarmer,
  GiTakeMyMoney,
  GiGreenPower,
  GiCheckMark,
  GiCoins,
  GiChart,
  GiSprout,
  GiArtificialIntelligence,
  GiPadlock,
  GiScrollUnfurled,
} from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: "farmers",
    title: "For Farmers",
    image: "/images/hero3.jpg",
    icon: GiFarmer,
    benefits: [
      { icon: GiCheckMark, text: "Upload produce" },
      { icon: GiCoins, text: "Request affordable loans" },
      { icon: GiSprout, text: "Get connected to buyers" },
    ],
  },
  {
    id: "investors",
    title: "For Investors",
    image: "/images/hero5.jpg",
    icon: GiTakeMyMoney,
    benefits: [
      { icon: GiCoins, text: "Fund trusted farmers" },
      { icon: GiChart, text: "Track loan performance" },
      { icon: GiSprout, text: "Earn impact-driven returns" },
    ],
  },
  {
    id: "we-power-it",
    title: "We Power It",
    image: "/images/hero8.jpg",
    icon: GiGreenPower,
    benefits: [
      { icon: GiArtificialIntelligence, text: "AI trust scoring" },
      { icon: GiPadlock, text: "Secure smart contracts" },
      { icon: GiScrollUnfurled, text: "Transparent repayments" },
    ],
  },
];

export default function HowItWorksSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const SlideIcon = slides[currentSlide].icon;

  return (
    <section className="relative mt-74 h-[80vh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
          className="brightness-[.5]"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Swipe Arrows */}
      <div className="absolute inset-y-1/2 z-20 w-full flex justify-between px-6">
        <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full text-white backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 h-full flex items-center justify-end px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="w-full md:w-[400px] backdrop-blur-md bg-[#EFF3E4] text-[#05402E] shadow-xl rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <SlideIcon className="w-16 h-16 text-[#05402E]" />
                  <CardTitle className="text-4xl font-semibold">
                    {slides[currentSlide].title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 mt-2 text-2xl">
                {slides[currentSlide].benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-[#158f20]"
                    >
                      <BenefitIcon className="w-5 h-5 text-[#158f20]" />
                      <span>{benefit.text}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
