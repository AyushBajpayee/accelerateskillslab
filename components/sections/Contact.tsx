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
import { countryCodes, defaultCountryCode } from "@/lib/country-codes";

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
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .trim()
    .refine(
      (val) => /^\d{10}$/.test(val.replace(/\D/g, "")),
      "Please enter a 10-digit phone number",
    ),
  course: z
    .string()
    .min(1, "Please select a program")
    .refine(
      (val) => ["data-analytics", "data-engineering", "all"].includes(val),
      {
        message: "Please select a program",
      },
    ),
  message: z
    .string()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState("");
  const [hCaptchaToken, setHCaptchaToken] = useState<string>("");
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const [isCaptchaLoaded, setIsCaptchaLoaded] = useState<boolean>(false);
  const hCaptchaRef = useRef<HCaptcha>(null);
  // Using a ref instead of state for the execution guard to avoid closure issues in setTimeout
  const isExecutingCaptchaRef = useRef<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      countryCode: defaultCountryCode,
      phoneNumber: "",
      course: undefined,
      message: "",
    },
  });

  // Execute hCaptcha challenge when captcha is loaded and form is submitted
  useEffect(() => {
    if (
      pendingFormData &&
      isCaptchaLoaded &&
      hCaptchaRef.current &&
      !isExecutingCaptchaRef.current
    ) {
      // Call execute() to trigger challenge directly
      const timer = setTimeout(async () => {
        try {
          // Check ref.current for real-time value (avoids stale closure)
          if (hCaptchaRef.current && !isExecutingCaptchaRef.current) {
            isExecutingCaptchaRef.current = true;
            await hCaptchaRef.current.execute();
          }
        } catch (error) {
          console.error("Error executing hCaptcha:", error);
          setSubmitStatus("error");
          setErrorMessage("Failed to load captcha. Please try again.");
          setPendingFormData(null);
          setIsVerifying(false);
          isExecutingCaptchaRef.current = false;
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pendingFormData, isCaptchaLoaded]);

  // Actual form submission function
  const submitForm = async (data: FormData, token?: string) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Use provided token or fall back to state token
    const captchaToken = token || hCaptchaToken;

    if (!captchaToken) {
      setSubmitStatus("error");
      setErrorMessage(
        "Captcha verification is required. Please complete the captcha.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms access key is not configured");
      }

      // Format course value for better readability
      const courseDisplay =
        data.course === "all"
          ? "All Programs (Data Analytics & Data Engineering)"
          : data.course === "data-analytics"
            ? "Data Analytics: Zero to Hero"
            : "Data Engineering Zero to Hero";

      // Combine country code and phone number
      const fullPhoneNumber = `${data.countryCode} ${data.phoneNumber}`;

      const formData = {
        access_key: accessKey,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: fullPhoneNumber,
        course: courseDisplay,
        message: data.message?.trim() || "",
        subject: "New Contact Form Submission from Accelerate Skills Lab",
        from_name: data.name.trim(),
        page_url: typeof window !== "undefined" ? window.location.href : "",
        botcheck: honeypot,
        "h-captcha-response": captchaToken,
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
        setSubmitStatus("success");
        reset();
        setHoneypot("");
        setHCaptchaToken("");
        setPendingFormData(null);
        setIsCaptchaLoaded(false);
        setIsVerifying(false);
        isExecutingCaptchaRef.current = false;
        hCaptchaRef.current?.resetCaptcha();

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
        // Reset captcha on error to allow retry
        setHCaptchaToken("");
        setIsCaptchaLoaded(false); // Reset loaded state to allow re-execution
        isExecutingCaptchaRef.current = false;
        hCaptchaRef.current?.resetCaptcha();
      }
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setSubmitStatus("error");
        setErrorMessage(
          "Connection error. Please check your internet and try again.",
        );
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          "Something went wrong. Please try again or email us directly.",
        );
      }
      // Reset captcha on error to allow retry
      setHCaptchaToken("");
      setIsCaptchaLoaded(false); // Reset loaded state to allow re-execution
      isExecutingCaptchaRef.current = false;
      hCaptchaRef.current?.resetCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Check honeypot (silent rejection for bots)
    if (honeypot) {
      return;
    }

    // If captcha is not verified yet, store form data and trigger captcha
    if (!hCaptchaToken) {
      setPendingFormData(data);
      setErrorMessage("");
      setIsVerifying(true); // Show "Verifying..." state
      // The useEffect will handle executing the captcha when it's loaded
      return;
    }

    // If captcha token exists, proceed with submission
    if (hCaptchaToken) {
      await submitForm(data);
    }
  };

  return (
    <section id="contact" className="relative py-10 lg:py-20">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-regular sm:text-4xl lg:text-5xl text-center mb-4"
        >
          <span className="font-bold">Ready to start</span>{" "}
          <span
            className="italic"
            style={{ fontFamily: '"IBM Plex Serif", serif' }}
          >
            your
          </span>{" "}
          <span className="text-primary font-bold">Zero-to-Hero</span>{" "}
          <span className="font-bold">journey?</span>
        </motion.h2>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-muted-foreground text-center mb-14 lg:mb-20 max-w-3xl mx-auto"
        >
          Get in touch to learn more about our 3-month intensive bootcamp
          programs. We&apos;ll help you choose the right path for your career.
        </motion.p>

        {/* Parent Container with Border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-3 sm:p-4 md:p-5 lg:p-6 mx-auto w-full max-w-2xl rounded-3xl md:rounded-[32px] border border-[#ffffff12] bg-[#0d1117] overflow-visible"
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

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#111827] rounded-xl md:rounded-2xl px-4 py-4 sm:px-5 sm:py-5 md:p-6 lg:p-8 border border-white/5"
          >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                Reach out to us
              </h3>

              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 md:py-12"
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
                  className="space-y-3 sm:space-y-4"
                  noValidate
                  onChange={() => {
                    // Clear error message when user starts interacting with form
                    if (submitStatus === "error") {
                      setSubmitStatus("idle");
                      setErrorMessage("");
                      setIsVerifying(false);
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
                      className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 sm:p-4 rounded-lg"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs md:text-sm font-medium text-gray-300"
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
                          className="text-xs md:text-sm text-red-400 mt-0.5 sm:mt-1"
                          role="alert"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs md:text-sm font-medium text-gray-300"
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
                          className="text-xs md:text-sm text-red-400 mt-0.5 sm:mt-1"
                          role="alert"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Field - Unified Input with Country Code */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="phoneNumber"
                      className="text-xs md:text-sm font-medium text-gray-300"
                    >
                      Phone <span className="text-red-400">*</span>
                    </label>

                    {/* Unified input container */}
                    <div
                      className={`flex items-center h-9 w-full rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] ${
                        errors.countryCode || errors.phoneNumber
                          ? "border-red-500 ring-red-500/20"
                          : "border-input"
                      }`}
                    >
                      {/* Country Code Selector - custom display with native select */}
                      <div className="relative h-full flex items-center rounded-l-md hover:bg-primary/10 transition-colors cursor-pointer">
                        {/* Visible display showing only flag + code */}
                        <span className="pl-3 pr-1 text-xs sm:text-sm pointer-events-none whitespace-nowrap">
                          {(() => {
                            const selectedCountry = countryCodes.find(
                              (c) => c.dialCode === watch("countryCode"),
                            );
                            return selectedCountry
                              ? `${selectedCountry.flag} ${selectedCountry.dialCode}`
                              : "🇮🇳 +91";
                          })()}
                        </span>
                        {/* Native select - invisible but functional */}
                        <select
                          id="countryCode"
                          {...register("countryCode")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          style={{ colorScheme: "dark" }}
                        >
                          {countryCodes.map((country) => (
                            <option
                              key={country.code}
                              value={country.dialCode}
                              className="bg-[#111827] text-white"
                            >
                              {country.flag} {country.dialCode} ({country.name})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Separator dot */}
                      <span className="text-gray-500 px-1">•</span>

                      {/* Phone Number Input - no border, blends into container */}
                      <input
                        id="phoneNumber"
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Enter 10-digit number"
                        maxLength={10}
                        {...register("phoneNumber", {
                          onChange: (e) => {
                            // Only allow digits
                            e.target.value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 10);
                          },
                        })}
                        className="flex-1 h-full bg-transparent border-none outline-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground pr-3"
                      />
                    </div>

                    {/* Error messages */}
                    {(errors.countryCode || errors.phoneNumber) && (
                      <p className="text-xs md:text-sm text-red-400 mt-0.5 sm:mt-1" role="alert">
                        {errors.countryCode?.message ||
                          errors.phoneNumber?.message}
                      </p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="course"
                      className="text-xs md:text-sm font-medium text-gray-300"
                    >
                      Program Interested <span className="text-red-400">*</span>
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
                      <option value="">Select a program</option>
                      <option value="all">All Programs</option>
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
                        className="text-xs md:text-sm text-red-400 mt-0.5 sm:mt-1"
                        role="alert"
                      >
                        {errors.course.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs md:text-sm font-medium text-gray-300"
                    >
                      Message{" "}
                      <span className="text-gray-500 text-xs">(optional)</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Enter your message (optional)"
                      maxLength={1001}
                      className={`min-h-[80px] md:min-h-[100px] ${
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
                        className="text-xs md:text-sm text-red-400 mt-0.5 sm:mt-1"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <Button
                      type="submit"
                      className="w-full h-10 md:h-12 text-sm md:text-base"
                      disabled={isSubmitting || isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2
                            size={18}
                            className="mr-2 animate-spin"
                            aria-hidden="true"
                          />
                          Verifying...
                        </>
                      ) : isSubmitting ? (
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
                    {submitStatus === "error" && !isSubmitting && (
                      <p className="text-xs text-gray-400 text-center">
                        You can try submitting again or refresh the page
                      </p>
                    )}
                  </div>

                  {/* hCaptcha - invisible, triggered on form submit */}
                  <HCaptcha
                    ref={hCaptchaRef}
                    sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                    theme="dark"
                    size="invisible"
                    reCaptchaCompat={false}
                    onLoad={() => {
                      setIsCaptchaLoaded(true);
                    }}
                    onReady={() => {
                      setIsCaptchaLoaded(true);
                    }}
                    onVerify={async (token) => {
                      setHCaptchaToken(token);
                      setErrorMessage("");
                      setIsVerifying(false); // Hide "Verifying..." state
                      isExecutingCaptchaRef.current = false; // Reset execution flag
                      // Auto-submit form after successful verification
                      if (pendingFormData) {
                        await submitForm(pendingFormData, token);
                      }
                    }}
                    onExpire={() => {
                      setHCaptchaToken("");
                      setIsCaptchaLoaded(false);
                      setIsVerifying(false); // Hide "Verifying..." state
                      isExecutingCaptchaRef.current = false; // Reset execution flag
                      setSubmitStatus("error");
                      setErrorMessage(
                        "Captcha verification expired. Please complete it again.",
                      );
                    }}
                    onError={(error) => {
                      setHCaptchaToken("");
                      setIsCaptchaLoaded(false);
                      setIsVerifying(false); // Hide "Verifying..." state
                      isExecutingCaptchaRef.current = false; // Reset execution flag
                      setSubmitStatus("error");
                      setErrorMessage(
                        "Captcha verification failed. Please try again.",
                      );
                      console.error("hCaptcha error:", error);
                    }}
                    onClose={() => {
                      // User dismissed the challenge without completing
                      setIsVerifying(false);
                      isExecutingCaptchaRef.current = false;
                      setPendingFormData(null);
                    }}
                  />
                </form>
              )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
