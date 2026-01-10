/**
 * Lamp Effect Component - Rising Sun Style
 * @source https://ui.aceternity.com/components/lamp-effect
 * @version 2026-01
 * @customizations Modified to look like a rising sun (top half of circle with upward light)
 */
"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type LampEffectProps = {
  className?: string;
  fill?: string;
  position?: "top" | "center" | "bottom";
};

export const LampEffect = ({ 
  className, 
  fill = "#2756f7",
  position = "bottom"
}: LampEffectProps) => {
  const positionClasses = {
    top: "top-0",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-0",
  };

  // Convert hex to RGB for opacity control
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 39, g: 86, b: 247 };
  };

  const rgb = hexToRgb(fill);
  const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-hidden",
        positionClasses[position],
        className
      )}
    >
      {/* Main container for the sun effect */}
      <div className="relative isolate z-0 flex w-full h-full scale-y-125 items-end justify-center">
        {/* Left conic gradient - part of the sun */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, rgba(${rgbString}, 0.8), transparent, transparent)`,
            maskImage: "linear-gradient(to top, white, transparent)",
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
          }}
        />

        {/* Right conic gradient - part of the sun */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] overflow-visible"
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, rgba(${rgbString}, 0.8))`,
            maskImage: "linear-gradient(to top, white, transparent)",
            WebkitMaskImage: "linear-gradient(to top, white, transparent)",
          }}
        />

        {/* Bottom blur layer for depth */}
        <div
          className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl"
        />

        {/* Backdrop blur layer */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Main sun glow - the bright center */}
        <motion.div
          initial={{ width: "8rem", opacity: 0.3 }}
          animate={{ width: "16rem", opacity: 0.5 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl"
          style={{
            backgroundColor: fill,
          }}
        />

        {/* Sun center line - the bright core */}
        {/* <motion.div
          initial={{ width: "15rem", opacity: 0.3 }}
          animate={{ width: "30rem", opacity: 0.6 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]"
          style={{
            backgroundColor: fill,
          }}
        /> */}

        {/* Bottom mask to hide bottom half of sun */}
        {/* <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background" /> */}
      </div>
    </div>
  );
};
