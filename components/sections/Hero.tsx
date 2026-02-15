"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowRight,
  MessageSquare,
  Mic,
  Video,
  ScreenShare,
  Settings,
} from "lucide-react";
import { BackgroundBeams } from "../ui/background-beams";
import { LampEffect } from "../ui/lamp-effect";
import { Spotlight } from "../ui/spotlight";

const participants = [
  { name: "Instructor", isInstructor: true, image: "/video-call/vc_2.png" },
  { name: "Rahul Verma", isInstructor: false, image: "/video-call/vc_1.png" },
  { name: "Mei Chen", isInstructor: false, image: "/video-call/vc_3.png" },
  { name: "Vikram Singh", isInstructor: false, image: "/video-call/vc_4.png" },
  { name: "Soham Das", isInstructor: false, image: "/video-call/vc_5.png" },
  { name: "Amit Kumar", isInstructor: false, image: "/video-call/vc_6.png" },
  { name: "Priya Sharma", isInstructor: false, image: "/video-call/vc_7.png" },
  { name: "Arjun Mehta", isInstructor: false, image: "/video-call/vc_8.png" },
  { name: "Neha Gupta", isInstructor: false, image: "/video-call/vc_9.png" },
];

function LiveSessionMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative w-full  mx-auto lg:mx-0"
    >
      {/* Main container with gradient border */}
      <div className="rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 p-1 shadow-2xl">
        <div className="rounded-xl bg-slate-900 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-slate-400 ml-2">
              Data Engineering Bootcamp - Live Session
            </span>
          </div>

          {/* Participants Grid */}
          <div className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-linear-to-br from-slate-700 to-slate-800"
                >
                  {/* Participant image */}
                  <Image
                    src={participant.image}
                    alt={participant.name}
                    fill
                    className="object-cover"
                  />
                  {/* Name badge */}
                  <div className="absolute bottom-1 left-1 right-1">
                    <span
                      className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded ${
                        participant.isInstructor
                          ? "bg-primary/90 text-white"
                          : "bg-black/60 text-slate-200"
                      }`}
                    >
                      {participant.isInstructor ? "👨‍🏫 " : ""}
                      {participant.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="px-4 py-3 border-t border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-slate-400">
                Live Session - Cohort in Progress
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <MessageSquare size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Mic size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Video size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors">
                <ScreenShare size={14} />
              </button>
              <button className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 transition-colors">
                <Settings size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-3xl -z-10" />
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative py-[160px] lg:py-[200px] flex flex-col justify-center overflow-hidden">
      {/* Layered Aceternity Backgrounds */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#2756f7"
      />
      <BackgroundBeams className="opacity-60" />

      {/* Sun Lamp Effect - positioned at bottom center */}
      <LampEffect className="opacity-80" fill="#2756f7" position="bottom" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-20 relative z-10">
        {/* Two column layout - reversed on mobile so video appears first */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8 lg:gap-0">
          {/* Text Content - Left side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 lg:max-w-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              3-Month Intensive Bootcamps
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Learn <span className="text-primary">Live.</span>
              <br />
              Build <span className="text-primary">Real.</span>
              <br />
              Get <span className="text-primary">Job-Ready.</span>
            </h1>

            <p className="text-sm sm:text-base  text-muted-foreground mb-4 leading-relaxed max-w-lg">
              Live, instructor-led bootcamps - not pre-recorded videos. Go from
              beginner to job-ready in 3 months with hands-on projects,
              mentorship, and placement support. Master dashboards and
              visualization tools, or build production-grade pipelines and cloud
              infrastructure.
            </p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full w-fit"
                as="a"
                href="#courses"
                className="px-5 py-2.5 sm:px-7 text-sm font-medium text-white flex items-center space-x-2"
                innerStyle={{
                  background:
                    "radial-gradient(circle at center, #2756f7 0%, #1a3db8 50%, #0f2568 100%)",
                }}
              >
                <span>Explore Programs</span>
                <ArrowRight size={18} />
              </HoverBorderGradient>
            </motion.div>
          </motion.div>

          {/* Live Session Mockup - Right side */}
          <div className="flex-1 lg:flex-[1.5] flex justify-start lg:min-w-0">
            <LiveSessionMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
