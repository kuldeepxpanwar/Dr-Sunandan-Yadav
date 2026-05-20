'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';

const smoothEase = [0.22, 1, 0.36, 1] as const;
const floatingEase = [0.45, 0, 0.55, 1] as const;

export default function HeroSection() {
  // Framer Motion variants for staggered text reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } },
  };

  // Floating animation for the glass cards
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: floatingEase,
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-[#F8FAFC] flex items-center overflow-hidden">
      {/* Background subtle grid/pattern (Optional, adds premium feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-12 w-full">
        
        {/* LEFT COLUMN: Text Content */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={itemVariants} className="text-cyan-500 font-bold tracking-widest uppercase text-sm mb-4">
            Consultations in Jaipur
          </motion.p>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-[#0A2540] leading-tight mb-6 tracking-tight">
            Dr. Sunandan <br /> Yadav
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            MCh Urology | Consultant Urologist & Andrologist | Advanced minimally invasive care for urinary and men&apos;s health.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
            <button className="px-8 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
              Book Appointment
            </button>
            <button className="px-8 py-3 bg-white text-[#0A2540] font-semibold rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              Read Reviews
            </button>
          </motion.div>

          {/* Bottom Badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {['9+ years experience', '5000+ surgeries', 'Advanced minimally invasive urology'].map((text, i) => (
              <span key={i} className="px-4 py-2 bg-white text-xs font-semibold text-[#0A2540] rounded-md border border-gray-100 shadow-sm">
                {text}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Image & Floating Cards */}
        <div className="w-full md:w-1/2 relative flex justify-center mt-10 md:mt-0">
          
          {/* Main Image Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: smoothEase }}
            className="relative w-[300px] md:w-[450px] aspect-[4/5] rounded-t-[200px] overflow-hidden bg-gradient-to-b from-[#E0F2FE] to-transparent"
          >
            {/* Make sure 'dr-sunandan-hero.webp' is in your public folder */}
            <Image 
              src="/dr-sunandan-hero.webp" 
              alt="Dr. Sunandan Yadav"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>

          {/* Floating Card 1 (Top Left) */}
          <motion.div 
            animate={floatingAnimation}
            className="absolute top-10 md:top-20 -left-4 md:-left-12 bg-white/90 backdrop-blur-md border border-white/40 p-4 rounded-xl shadow-2xl z-20"
          >
            <p className="text-[#0A2540] font-bold text-sm md:text-base">MCh Urology</p>
            <p className="text-gray-500 text-xs mt-1">Govt Medical College Kota</p>
          </motion.div>

          {/* Floating Card 2 (Bottom Right) */}
          <motion.div 
            animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1.5 } }} // Delayed so they don't bounce together
            className="absolute bottom-10 md:bottom-20 -right-4 md:-right-10 bg-white/90 backdrop-blur-md border border-white/40 p-4 rounded-xl shadow-2xl z-20"
          >
            <p className="text-[#0A2540] font-bold text-sm md:text-base">Advanced Care</p>
            <p className="text-gray-500 text-xs mt-1 max-w-[150px]">Laser, laparoscopy & robotic techniques</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
