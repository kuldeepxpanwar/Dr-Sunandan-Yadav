"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#FAF6F0] flex items-center justify-center pt-24"
    >
      {/* Dynamic Background or Abstract Gradients can go here */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-gradient-to-br from-[#E3D5C8] to-[#FFF9F2] pointer-events-none" />

      <motion.div
        style={{ y: y1, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center max-w-5xl px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-serif text-[#3A3A3A] tracking-tight leading-[1.1]"
        >
          Expert Care with <br />
          <span className="italic text-[#716A5C]">Compassion</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-xl text-[#5C574F] max-w-2xl font-light"
        >
          Dr. Sunandan Yadav brings world-class urological expertise, focusing on minimally invasive techniques and patient-centric healing.
        </motion.p>
      </motion.div>
    </section>
  );
}
