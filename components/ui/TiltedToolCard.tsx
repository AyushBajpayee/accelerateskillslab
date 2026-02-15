"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "motion/react";

interface TiltedToolCardProps {
  children: React.ReactNode;
  /** Maximum tilt angle in degrees (default 14) */
  rotateAmplitude?: number;
  /** Scale factor on hover (default 1.1) */
  scaleOnHover?: number;
  className?: string;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export function TiltedToolCard({
  children,
  rotateAmplitude = 14,
  scaleOnHover = 1.1,
  className = "",
}: TiltedToolCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`relative w-full min-w-0 max-w-full perspective-midrange flex flex-col items-center justify-center ${className}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full min-w-0 max-w-full sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] xl:max-w-[240px] h-[90px] mobile-m:h-[100px] sm:h-[120px] md:h-[130px] lg:h-[140px] xl:h-[150px] mx-auto"
      >
        {/* Outer wrapper — subtle outer border + bottom glow line */}
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[1.75rem] xl:rounded-4xl border border-[#ffffff12] bg-[#0d1117] p-1.5 mobile-m:p-2 sm:p-2.5 md:p-3 lg:p-3 xl:p-3.5 overflow-visible h-full">
          {/* Bottom glow line */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[0.5px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2756f7, transparent)",
            }}
          />

          {/* Inner card — padding and gap scale up by breakpoint */}
          <div className="bg-[#111827] rounded-lg sm:rounded-xl md:rounded-[1.25rem] lg:rounded-[1.25rem] p-2 sm:p-2.5 md:p-3 lg:p-3 xl:p-3.5 flex flex-col items-center justify-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 border border-blue-500/20 hover:border-blue-500/40 transition-colors h-full">
            {children}
          </div>
        </div>
      </motion.div>
    </figure>
  );
}
