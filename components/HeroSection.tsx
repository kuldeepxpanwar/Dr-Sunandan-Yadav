"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const headingWords = ["Dr.", "Sunandan", "Yadav"];

function MagneticButton({
  children,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 18, mass: 0.25 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 18, mass: 0.25 });
  const x = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const y = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
      style={{ x, y }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "inline-flex h-14 items-center justify-center rounded-2xl px-7 text-sm font-extrabold transition-shadow",
        variant === "primary"
          ? "bg-[#00B4D8] text-white shadow-[0_20px_50px_rgba(0,180,216,0.32)] hover:shadow-[0_26px_70px_rgba(0,180,216,0.46)]"
          : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/15",
      ].join(" ")}
    >
      {children}
    </motion.a>
  );
}

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0A2540] text-white">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_25%,rgba(0,180,216,0.28),transparent_32%),linear-gradient(135deg,#061827_0%,#0A2540_48%,#06263D_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 md:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-sm font-extrabold uppercase tracking-[0.16em] text-[#00B4D8]"
          >
            Consultations in Jaipur
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.11,
                  delayChildren: 0.16,
                },
              },
            }}
            className="max-w-4xl text-6xl font-black tracking-tighter text-white md:text-8xl"
          >
            {headingWords.map((word) => (
              <motion.span
                key={word}
                variants={{
                  hidden: { opacity: 0, y: 44, filter: "blur(10px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="block leading-[0.92]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl"
          >
            MCh Urology | Consultant Urologist & Andrologist | Advanced minimally invasive care for urinary and men&apos;s health.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.84, duration: 0.6 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <MagneticButton href="#appointment">Book Appointment</MagneticButton>
            <MagneticButton href="#stories" variant="secondary">
              Read Reviews
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[620px]"
        >
          <div className="absolute -inset-8 -z-10 rounded-[3.5rem] bg-[#00B4D8]/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/10 shadow-[0_40px_140px_rgba(0,0,0,0.38)] backdrop-blur">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A2540]/88 via-transparent to-white/10" />
            <Image
              src="/dr-sunandan-hero.webp"
              alt="Dr. Sunandan Yadav in a white coat"
              width={1410}
              height={1116}
              priority
              className="aspect-[0.9] w-full object-cover object-center"
            />
          </div>

          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-[18%] rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:-left-8"
          >
            <p className="text-base font-extrabold text-white">MCh Urology</p>
            <p className="mt-1 text-sm text-white/68">Govt Medical College Kota</p>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[13%] right-0 rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md md:-right-10"
          >
            <p className="text-base font-extrabold text-white">Advanced Care</p>
            <p className="mt-1 max-w-[190px] text-sm text-white/68">
              Laser, laparoscopy and robotic techniques
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
