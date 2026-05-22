"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Minimally Invasive Surgery",
    description: "Advanced techniques for faster recovery.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
  },
  {
    title: "Prostate Health",
    description: "Comprehensive screening and treatment options.",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Kidney Stones",
    description: "Laser therapies and percutaneous treatments.",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    title: "Men's Health",
    description: "Specialized care for delicate health matters.",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1",
  },
];

export default function MedicalServices() {
  return (
    <section className="py-24 px-4 bg-white w-full flex justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#3A3A3A] tracking-tight">
            Specialized Care
          </h2>
          <p className="mt-4 text-lg text-[#716A5C]">
            Delivering advanced urological solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
              }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-[#F5F2ED] p-8 flex flex-col justify-between border border-[#EBE7DF] hover:shadow-lg transition-shadow duration-500",
                service.colSpan,
                service.rowSpan
              )}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-serif text-[#3A3A3A] group-hover:text-black transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="mt-2 text-[#716A5C] text-sm md:text-base">
                  {service.description}
                </p>
              </div>
              
              {/* Decorative gradient reveal on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[#E3D5C8] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
