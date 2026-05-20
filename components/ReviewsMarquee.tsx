"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

type Review = {
  name: string;
  meta: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Somit Bhandari",
    meta: "5 stars - 2 years ago",
    text: "Dr. Sunandan Yadav provided exceptional care for my 82-year-old father's urinary bladder ailment. His confident demeanor and surgical skill instilled trust from the start. He patiently addressed our questions, explained biopsy results and treatment options in detail, and maintained a compassionate approach throughout.",
  },
  {
    name: "Yash Sharma",
    meta: "5 stars - 2 years ago",
    text: "My father was treated for urethral stricture and recovered well. Dr. Yadav understood everything clearly, treated us with care, and we were completely satisfied with the way he and the hospital team managed the treatment.",
  },
  {
    name: "AKS 4 Solutions",
    meta: "5 stars - 2 years ago",
    text: "Very humble and focused surgeon. He counselled me for kidney stone and helped me recover fast after surgery.",
  },
  {
    name: "Divanshu Gangwal",
    meta: "5 stars - a year ago",
    text: "Dr. Sunandan Yadav and staff are very responsive, helpful, and explain each query politely. Treatment was done very effectively.",
  },
  {
    name: "Urmila Sharma",
    meta: "5 stars - 2 years ago",
    text: "He helped my father during prostate cancer treatment and suggested the best treatment options. Very kind doctor.",
  },
  {
    name: "Janvi Joshi",
    meta: "5 stars - a year ago",
    text: "Very good experience with Dr. Sunandan Yadav. Nice behavior towards patients.",
  },
  {
    name: "Dr. Aditi Joshi",
    meta: "5 stars - 2 years ago",
    text: "Best urologist in Jaipur.",
  },
  {
    name: "Priyanshi Sharma",
    meta: "5 stars - 2 years ago",
    text: "The compassion with which you treat patients is more effective than medication. Thank you doctor.",
  },
];

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 drop-shadow-[0_0_10px_rgba(245,179,1,0.55)]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 2.6 2.9 5.88 6.49.94-4.69 4.57 1.1 6.46L12 17.4l-5.8 3.05 1.1-6.46-4.69-4.57 6.49-.94L12 2.6Z" />
    </svg>
  );
}

function ReviewCard({
  review,
  onPause,
  onResume,
}: {
  review: Review;
  onPause: () => void;
  onResume: () => void;
}) {
  return (
    <motion.article
      onHoverStart={onPause}
      onHoverEnd={onResume}
      whileHover={{
        animationPlayState: "paused",
        y: -8,
        scale: 1.03,
        boxShadow: "0 30px 80px rgba(15, 23, 42, 0.16)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="w-[350px] shrink-0 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-slate-900/10 md:w-[400px]"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#0A2540] to-[#00B4D8] text-sm font-black text-white">
          {review.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-base font-extrabold leading-tight text-[#0A2540]">
            {review.name}
          </h3>
          <p className="text-sm text-gray-500">{review.meta}</p>
        </div>
      </div>

      <div className="mb-5 flex gap-1 text-[#f5b301]" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} />
        ))}
      </div>

      <p className="line-clamp-4 text-[15px] leading-7 text-gray-600">
        {review.text}
      </p>
    </motion.article>
  );
}

export function ReviewsMarquee() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const velocityRef = useRef(36);
  const loopedReviews = useMemo(() => [...reviews, ...reviews, ...reviews], []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !trackRef.current) return;

    const targetVelocity = isPaused ? 0 : 36;
    velocityRef.current += (targetVelocity - velocityRef.current) * 0.08;

    const loopWidth = trackRef.current.scrollWidth / 3;
    const nextX = x.get() - (velocityRef.current * delta) / 1000;

    x.set(Math.abs(nextX) >= loopWidth ? nextX + loopWidth : nextX);
  });

  return (
    <section id="stories" className="overflow-hidden bg-[#F8F9FA] py-24">
      <div className="mx-auto mb-12 max-w-6xl px-6">
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-[#00B4D8]">
          Patient reviews
        </p>
        <h2 className="max-w-3xl text-4xl font-black tracking-tight text-[#0A2540] md:text-6xl">
          Kind words from patients and families treated by Dr. Sunandan Yadav.
        </h2>
      </div>

      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          ref={trackRef}
          className="flex w-max gap-6 px-6 md:gap-8"
          style={{ x, animationPlayState: isPaused ? "paused" : "running" }}
        >
          {loopedReviews.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              review={review}
              onPause={() => setIsPaused(true)}
              onResume={() => setIsPaused(false)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
