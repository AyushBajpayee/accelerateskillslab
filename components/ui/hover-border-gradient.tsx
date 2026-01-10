"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type HoverBorderGradientProps = {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
} & Record<string, unknown>;

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Component = "button",
  duration = 1,
  clockwise = true,
  ...otherProps
}: HoverBorderGradientProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [direction, setDirection] = React.useState<
    "top" | "right" | "bottom" | "left"
  >("top");

  const rotateDirection = (
    currentDirection: string
  ): "top" | "right" | "bottom" | "left" => {
    const directions: ("top" | "right" | "bottom" | "left")[] = [
      "top",
      "right",
      "bottom",
      "left",
    ];
    const currentIndex = directions.indexOf(currentDirection as any);
    const nextIndex = clockwise
      ? (currentIndex + 1) % directions.length
      : (currentIndex - 1 + directions.length) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<string, string> = {
    top: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)",
    right:
      "radial-gradient(36.8% 20.7% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)",
    bottom:
      "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)",
    left: "radial-gradient(36.8% 20.7% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%, #2756f7 0%, rgba(255, 255, 255, 0) 100%)";

  return (
    <Component
      className={cn(
        "group/btn relative flex h-auto w-auto items-center justify-center overflow-hidden rounded-full border bg-background p-px transition duration-300",
        containerClassName
      )}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setDirection("top");
      }}
      {...otherProps}
    >
      <div
        className={cn(
          "relative z-10 inline-flex h-full w-auto items-center justify-center rounded-full text-sm font-medium transition duration-300",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-0 transition duration-300 group-hover/btn:opacity-100"
        style={{
          background: hovered ? movingMap[direction] : "transparent",
        }}
        initial={false}
        animate={{
          background: hovered
            ? [movingMap[direction], movingMap[rotateDirection(direction)]]
            : "transparent",
        }}
        transition={{
          duration: duration,
          ease: "linear",
        }}
        onAnimationComplete={() => {
          if (hovered) {
            setDirection(rotateDirection(direction));
          }
        }}
      />
      <div
        className="absolute inset-0 z-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 blur-xl"
        style={{ background: hovered ? highlight : "transparent" }}
      />
    </Component>
  );
};
