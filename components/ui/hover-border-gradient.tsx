"use client";
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type HoverBorderGradientProps = {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  innerStyle?: React.CSSProperties;
  animating?: boolean;
} & Record<string, unknown>;

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Component = "button",
  duration = 1,
  clockwise = true,
  innerStyle,
  animating = true,
  ...otherProps
}: HoverBorderGradientProps) => {
  const movingMap: Record<string, string> = {
    top: "radial-gradient(50% 100% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)",
    right:
      "radial-gradient(100% 50% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)",
    bottom:
      "radial-gradient(50% 100% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)",
    left: "radial-gradient(100% 50% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%)",
  };

  const directions: ("top" | "right" | "bottom" | "left")[] = [
    "top",
    "right",
    "bottom",
    "left",
  ];

  const [currentDirectionIndex, setCurrentDirectionIndex] = React.useState(0);
  const orderedDirections = clockwise ? directions : [...directions].reverse();

  // Continuously cycle through directions for smooth animation
  useEffect(() => {
    if (!animating) return;

    const interval = setInterval(() => {
      setCurrentDirectionIndex((prev) => (prev + 1) % orderedDirections.length);
    }, duration * 1000); // Convert duration to milliseconds

    return () => clearInterval(interval);
  }, [duration, orderedDirections.length, animating]);

  const currentDirection = orderedDirections[currentDirectionIndex];
  const nextDirection =
    orderedDirections[(currentDirectionIndex + 1) % orderedDirections.length];

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #2756f7 0%, rgba(255, 255, 255, 0) 100%)";

  return (
    <Component
      className={cn(
        "group/btn relative flex h-auto w-auto items-center justify-center overflow-hidden rounded-full border bg-background p-px transition duration-300",
        containerClassName
      )}
      {...otherProps}
    >
      <div
        className={cn(
          "relative z-10 inline-flex h-full w-auto items-center justify-center rounded-full text-sm font-medium transition duration-300",
          className
        )}
        style={innerStyle}
      >
        {children}
      </div>
      {animating ? (
        <motion.div
          className="absolute inset-0 z-0 opacity-100"
          key={currentDirectionIndex} // Force re-render for smooth transition
          initial={{ background: movingMap[currentDirection] }}
          animate={{ background: movingMap[nextDirection] }}
          transition={{
            duration: duration,
            ease: "linear",
          }}
        />
      ) : (
        <div className="absolute inset-0 z-0 opacity-0" />
      )}
      <div
        className={cn(
          "absolute inset-0 z-0 rounded-full blur-xl transition-opacity duration-300",
          animating ? "opacity-30" : "opacity-0"
        )}
        style={{ background: highlight }}
      />
    </Component>
  );
};
