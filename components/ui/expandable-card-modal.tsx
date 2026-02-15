"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

function CloseIcon() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}

interface ExpandableCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export function ExpandableCardModal({
  isOpen,
  onClose,
  children,
  maxWidth = "800px",
}: ExpandableCardModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  /* ── Escape key + body scroll lock ── */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  /* ── Outside click ── */
  useOutsideClick(contentRef as React.RefObject<HTMLDivElement>, () => {
    if (isOpen) onClose();
  });

  /* ── SSR guard ── */
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            style={{ zIndex: 9998 }}
          />
        )}
      </AnimatePresence>

      {/* Modal Container */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 overflow-y-auto"
            style={{ zIndex: 9999 }}
          >
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
              {/* Content Wrapper */}
              <div
                ref={contentRef}
                role="dialog"
                aria-modal="true"
                className="relative"
                style={{ width: maxWidth, maxWidth: "100%", zIndex: 10 }}
              >
                {/* Close Button - positioned on card */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="absolute  top-3 right-3 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full h-10 w-10 border border-white/20 hover:bg-white/20 transition-colors z-20"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </motion.button>
                {children}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
