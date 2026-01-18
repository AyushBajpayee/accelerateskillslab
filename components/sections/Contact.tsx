"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { motion } from "motion/react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";

// Constants
const COOLDOWN_MS = 90 * 1000; // 90 seconds
const STORAGE_KEY = "contactFormLastSubmit";

// Zod validation schema
const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .trim()
    .refine(
      (val) => /^[\d\s\-\+\(\)]+$/.test(val),
      "Please enter a valid phone number"
    ),
  course: z.enum(["data-analytics", "data-engineering", "all"], {
    required_error: "Please select a course",
  }),
  message: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim().length === 0) return true; // Empty is allowed
      return val.trim().length >= 10; // If provided, must be at least 10 chars
    }, "Message must be at least 10 characters")
    .refine(
      (val) => !val || val.trim().length <= 1000,
      "Message must be less than 1000 characters"
    ),
});

type FormData = z.infer<typeof formSchema>;

// Helper function to check cooldown
const checkCooldown = (): { allowed: boolean; remainingMs?: number } => {
  try {
    const lastSubmit = localStorage.getItem(STORAGE_KEY);
    if (!lastSubmit) {
      return { allowed: true };
    }

    const lastSubmitTime = parseInt(lastSubmit, 10);
    if (isNaN(lastSubmitTime)) {
      localStorage.removeItem(STORAGE_KEY);
      return { allowed: true };
    }

    const elapsed = Date.now() - lastSubmitTime;
    if (elapsed >= COOLDOWN_MS) {
      return { allowed: true };
    }

    return { allowed: false, remainingMs: COOLDOWN_MS - elapsed };
  } catch (error) {
    // localStorage unavailable - graceful degradation
    return { allowed: true };
  }
};

// Helper function to format remaining time (rough estimate)
const formatRemainingTime = (ms: number): string => {
  const totalMinutes = ms / 60000;
  const minutes = Math.floor(totalMinutes);

  if (minutes >= 1) {
    // Round to nearest minute for rough estimate
    const roundedMinutes = Math.round(totalMinutes);
    if (roundedMinutes === 1) {
      return "about a minute";
    }
    return `about ${roundedMinutes} minutes`;
  }

  // Less than a minute
  return "less than a minute";
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");
  const [hCaptchaToken, setHCaptchaToken] = useState<string>("");
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const hCaptchaRef = useRef<HCaptcha>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      course: undefined,
      message: "",
    },
  });

  // Detect screen size for hCaptcha compact mode
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Tailwind sm breakpoint
    };

    // Check on mount
    checkScreenSize();

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const onSubmit = async (data: FormData) => {
    // Check honeypot (silent rejection for bots)
    if (honeypot) {
      return;
    }

    // Check hCaptcha
    if (!hCaptchaToken) {
      setErrorMessage("Please complete the captcha verification.");
      return;
    }

    // Check cooldown
    const cooldown = checkCooldown();
    if (!cooldown.allowed) {
      return; // Button is disabled, but return early as safety
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    // Don't clear cooldown message here - it will be cleared by the interval or on next successful submit

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms access key is not configured");
      }

      // Format course value for better readability
      const courseDisplay =
        data.course === "all"
          ? "All Courses (Data Analytics & Data Engineering)"
          : data.course === "data-analytics"
          ? "Data Analytics: Zero to Hero"
          : "Data Engineering Zero to Hero";

      const formData = {
        access_key: accessKey,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone,
        course: courseDisplay,
        message: data.message?.trim() || "",
        subject: "New Contact Form Submission from Accelerate Skills Lab",
        from_name: data.name.trim(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
        botcheck: honeypot,
        "h-captcha-response": hCaptchaToken,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store submission timestamp
        try {
          localStorage.setItem(STORAGE_KEY, Date.now().toString());
        } catch (error) {
          // localStorage unavailable - continue anyway
        }

        setSubmitStatus("success");
        reset();
        setHoneypot("");
        setHCaptchaToken(""); // Reset hCaptcha token
        hCaptchaRef.current?.resetCaptcha(); // Reset hCaptcha widget

        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        // Handle server errors
        const errorMsg =
          result.message ||
          "Something went wrong. Please try again or email us directly.";
        setSubmitStatus("error");
        setErrorMessage(errorMsg);
      }
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setSubmitStatus("error");
        setErrorMessage(
          "Connection error. Please check your internet and try again."
        );
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          "Something went wrong. Please try again or email us directly."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const cooldown = checkCooldown();
  const isCooldownActive = !cooldown.allowed;

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Ready to start your{" "}
            <span className="text-primary">zero-to-hero</span> journey?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get in touch to learn more about our 3-month intensive bootcamp
            programs. We'll help you choose the right path for your career.
          </p>
        </motion.div>

        {/* Parent Container with Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-2xl rounded-[32px] border border-[#ffffff12] bg-[#0d1117] overflow-visible"
        >
          {/* Blue Highlighter Glow - Bottom */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2756f7, transparent)",
              boxShadow: "0 0 40px 10px rgba(39, 86, 247, 0.3)",
            }}
          />

          <div className="p-4 sm:p-6">
            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#111827] rounded-2xl p-4 sm:p-8 border border-white/5 w-full max-w-2xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Reach out to us
              </h3>

              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} aria-hidden="true" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400">
                    We'll get back to you shortly to help you start your
                    journey.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                  noValidate
                  onChange={() => {
                    // Clear error message when user starts interacting with form
                    if (submitStatus === "error") {
                      setSubmitStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                >
                  {/* Honeypot field - hidden from users but visible to bots */}
                  <input
                    type="text"
                    name="botcheck"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] opacity-0 pointer-events-none h-0 w-0"
                    aria-hidden="true"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Status Messages */}
                  {submitStatus === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg"
                      role="alert"
                      aria-live="assertive"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <AlertCircle
                          size={20}
                          className="shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">
                            {errorMessage}
                          </p>
                          <p className="text-xs text-red-300/80">
                            Please check your information and try again. If the
                            problem persists, please refresh the page.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-300"
                      >
                        Name <span className="text-red-400">*</span>
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name")}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                        className={
                          errors.name
                            ? "border-red-500 focus-visible:ring-red-500/50"
                            : ""
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-sm text-red-400 mt-1"
                          role="alert"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-300"
                      >
                        Email <span className="text-red-400">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                        className={
                          errors.email
                            ? "border-red-500 focus-visible:ring-red-500/50"
                            : ""
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-sm text-red-400 mt-1"
                          role="alert"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-300"
                    >
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone")}
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={
                        errors.phone ? "phone-error" : undefined
                      }
                      className={
                        errors.phone
                          ? "border-red-500 focus-visible:ring-red-500/50"
                          : ""
                      }
                    />
                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="text-sm text-red-400 mt-1"
                        role="alert"
                      >
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-2">
                    <label
                      htmlFor="course"
                      className="text-sm font-medium text-gray-300"
                    >
                      Course Interested <span className="text-red-400">*</span>
                    </label>
                    <Select
                      id="course"
                      {...register("course")}
                      aria-invalid={errors.course ? "true" : "false"}
                      aria-describedby={
                        errors.course ? "course-error" : undefined
                      }
                      className={
                        errors.course
                          ? "border-red-500 focus-visible:ring-red-500/50"
                          : ""
                      }
                    >
                      <option value="">Select a course</option>
                      <option value="all">All Courses</option>
                      <option value="data-analytics">
                        Data Analytics: Zero to Hero
                      </option>
                      <option value="data-engineering">
                        Data Engineering Zero to Hero
                      </option>
                    </Select>
                    {errors.course && (
                      <p
                        id="course-error"
                        className="text-sm text-red-400 mt-1"
                        role="alert"
                      >
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-gray-300"
                    >
                      Message{" "}
                      <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message (optional)"
                      className={`min-h-[100px] ${
                        errors.message
                          ? "border-red-500 focus-visible:ring-red-500/50"
                          : ""
                      }`}
                      {...register("message")}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-sm text-red-400 mt-1"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* hCaptcha */}
                  <div className="flex justify-center">
                    <div className="[&_.h-captcha]:opacity-90 [&_.h-captcha]:rounded-lg [&_.h-captcha]:scale-90">
                      <HCaptcha
                        ref={hCaptchaRef}
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        theme="dark"
                        size={isSmallScreen ? "compact" : "normal"}
                        reCaptchaCompat={false}
                        onVerify={(token) => {
                          setHCaptchaToken(token);
                          setErrorMessage(""); // Clear any previous error
                        }}
                        onExpire={() => {
                          setHCaptchaToken("");
                        }}
                        onError={(error) => {
                          setHCaptchaToken("");
                          console.error("hCaptcha error:", error);
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-2">
                    <Button
                      type="submit"
                      className="w-full h-12"
                      disabled={isSubmitting || isCooldownActive}
                      aria-describedby={
                        isCooldownActive ? "cooldown-help" : undefined
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                    {isCooldownActive && !isSubmitting && (
                      <p
                        id="cooldown-help"
                        className="text-xs text-gray-400 text-center"
                      >
                        *Please wait for a while (90 seconds) before submitting
                        again.
                      </p>
                    )}
                    {submitStatus === "error" &&
                      !isSubmitting &&
                      !isCooldownActive && (
                        <p className="text-xs text-gray-400 text-center">
                          You can try submitting again or refresh the page
                        </p>
                      )}
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
