/**
 * Eclipse / Sun-Rising Effect Component
 * @description Creates a soft, diffused sunrise/eclipse glow using layered ellipses
 * @inspired-by Framer "Eclipse" background element design
 */
"use client";
import React from "react";
import { cn } from "@/lib/utils";

type LampEffectProps = {
  className?: string;
  fill?: string;
  position?: "top" | "center" | "bottom";
};

export const LampEffect = ({
  className,
  fill = "#2756f7",
  position = "bottom",
}: LampEffectProps) => {
  const positionClasses = {
    top: "top-0",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-0",
  };

  // Convert hex to RGB for opacity control in rgba() values
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
        "absolute left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-visible",
        positionClasses[position],
        className
      )}
    >
      {/* Eclipse container — positioned at bottom center, pushed mostly below.
          Only the top ~81px (623 - 542) peeks into view, showing the glow rim. */}
      <div className="absolute bottom-[-542px] left-1/2 -translate-x-1/2 w-[957px] h-[623px] overflow-visible">
        {/* Glow ellipse — large blurred blue circle that radiates upward */}
        <div
          className="absolute w-[910px] left-1/2 -translate-x-1/2 rounded-[97%]"
          style={{
            top: "-18px",
            bottom: "-116px",
            filter: "blur(152px)",
            backgroundColor: `rgba(${rgbString}, 0.64)`,
          }}
        />
        {/* Dark mask ellipse — covers the top of the glow to create the eclipse/horizon effect.
            Inset box-shadows add a subtle blue rim-light along the edge. */}
        <div
          className="absolute top-0 w-[866px] h-[342px] left-1/2 -translate-x-1/2 rounded-[97%]"
          style={{
            backgroundColor: "#090d1b",
            boxShadow: `inset 0.3px 0.6px 3.4px rgba(${rgbString}, 0.03), inset 1.1px 2.3px 12.8px rgba(${rgbString}, 0.11), inset 5px 10px 56px rgba(${rgbString}, 0.5)`,
          }}
        />
      </div>
    </div>
  );
};
