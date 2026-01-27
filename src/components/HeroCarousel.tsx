"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "./Button";
import { useReducedMotion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

const slides = [
  {
    image: "/homepage.webp",
    title: "Welcome to OryFolks",
    description:
      "Your trusted partner in bridging the technological gap between Japan and India.",
    buttonLink: "/services",
  },
  {
    image: "/india.webp",
    title: "Japan-India Tech Bridge",
    description:
      "Connecting Japanese innovation with Indian technical expertise to create global solutions.",
    buttonLink: "/careers",
  },
  {
    image: "/japan.webp",
    title: "Cross-Border Excellence",
    description:
      "Leveraging the best of both worlds - Japanese precision and Indian innovation.",
    buttonLink: "/contact",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-slide (runs AFTER initial page load due to lazy import)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* IMAGE (NO animation = GPU + JS friendly) */}
      <OptimizedImage
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        className="absolute inset-0 w-full h-full object-cover"
        width={1600}
        height={900}
        loading="eager"
        {...({ fetchpriority: 'high' } as any)}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h1
            key={slides[currentSlide].title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.p
            key={slides[currentSlide].description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xl text-gray-200 mb-8"
          >
            {slides[currentSlide].description}
          </motion.p>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(slides[currentSlide].buttonLink)}
            className="group"
          >
            Discover Our Services
            <ArrowRight
              size={20}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </div>

      {/* CONTROLS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <ArrowLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <ArrowRight size={24} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
