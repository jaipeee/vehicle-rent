"use client";

import { useEffect, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { enquirySchema, type EnquiryInput } from "./enquiry.schema";
import { submitEnquiry, submitToGoogleScript } from "./enquiry.api";

// -----------------------------------------------------
// Floating label (label sits in the box, moves onto the border)
// -----------------------------------------------------

const LABEL_CLASS = cn(
  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 origin-left rounded bg-white px-1",
  "text-sm text-slate-500 transition-all duration-200 ease-out",
  // focused: label jumps onto the top border
  "peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-emerald-700",
  // filled: label stays on the border
  "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold"
);

const INPUT_CLASS =
  "peer h-14 rounded-xl border-slate-300 bg-white px-4 text-sm shadow-none transition-colors focus-visible:border-emerald-600 focus-visible:ring-1 focus-visible:ring-emerald-600";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="absolute left-1 top-full mt-0.5 text-[11px] leading-tight text-red-600">
      {message}
    </p>
  );
}

interface FloatingFieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}

function FloatingField({
  id,
  label,
  registration,
  error,
  type = "text",
  autoComplete,
  className,
}: FloatingFieldProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Input
        id={id}
        type={type}
        placeholder=" "
        autoComplete={autoComplete}
        className={cn(INPUT_CLASS, error && "border-red-500")}
        {...registration}
      />
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <FieldError message={error} />
    </div>
  );
}

// -----------------------------------------------------
// Simple client-side math CAPTCHA
// -----------------------------------------------------

function useCaptcha() {
  const [nums, setNums] = useState<{ a: number; b: number } | null>(null);
  const [answer, setAnswer] = useState("");

  const refresh = () => {
    setNums({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1,
    });
    setAnswer("");
  };

  useEffect(() => {
    refresh();
  }, []);

  const isCorrect = nums !== null && Number(answer) === nums.a + nums.b;

  return { nums, answer, setAnswer, refresh, isCorrect };
}

// -----------------------------------------------------
// Form
// -----------------------------------------------------

export function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "captcha-error"
  >("idle");

  const captcha = useCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { firstName: "", lastName: "", phone: "" },
  });

  async function onSubmit(values: EnquiryInput) {
    if (!captcha.isCorrect) {
      setStatus("captcha-error");
      return;
    }

    try {
      await submitEnquiry(values);

      submitToGoogleScript(values).catch((err) =>
        console.error("Google Sheet sync failed:", err)
      );

      setStatus("success");
      reset();
      captcha.refresh();
    } catch {
      setStatus("error");
    }
  }

  // Mobile: ~40% of the card sits on the hero image. Desktop: unchanged.
  const wrapper = "relative z-20 -mt-24 lg:mt-0";

  if (status === "success") {
    return (
      <div className={wrapper}>
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-lg">
          <h3 className="text-lg font-semibold text-emerald-900">
            Thanks! We&apos;ll get back to you shortly.
          </h3>
          <p className="mt-1 text-sm text-emerald-700">
            Your enquiry has been received.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-3 gap-y-6 pt-2 lg:flex lg:flex-row lg:items-start lg:gap-3 lg:pt-0"
        >
          {/* Row 1: First + Last name */}
          <FloatingField
            id="firstName"
            label="First Name *"
            autoComplete="given-name"
            registration={register("firstName")}
            error={errors.firstName?.message}
            className="lg:flex-1"
          />

          <FloatingField
            id="lastName"
            label="Last Name"
            autoComplete="family-name"
            registration={register("lastName")}
            error={errors.lastName?.message}
            className="lg:flex-1"
          />

          {/* Row 2: Mobile + Captcha */}
          <FloatingField
            id="phone"
            type="tel"
            label="Mobile Number *"
            autoComplete="tel"
            registration={register("phone")}
            error={errors.phone?.message}
            className="lg:flex-1"
          />

          <div className="relative w-full lg:w-52 lg:shrink-0">
            <Input
              id="captcha"
              type="text"
              inputMode="numeric"
              placeholder=" "
              value={captcha.answer}
              onChange={(e) => {
                captcha.setAnswer(e.target.value.replace(/\D/g, ""));
                if (status === "captcha-error") setStatus("idle");
              }}
              aria-label="Captcha answer"
              className={cn(
                INPUT_CLASS,
                "pr-9",
                status === "captcha-error" && "border-red-500"
              )}
            />
            <label htmlFor="captcha" className={LABEL_CLASS}>
              {captcha.nums
                ? `${captcha.nums.a} + ${captcha.nums.b} = ?`
                : "..."}
            </label>

            <button
              type="button"
              onClick={() => {
                captcha.refresh();
                setStatus("idle");
              }}
              aria-label="Refresh captcha"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-300 hover:rotate-180 hover:text-emerald-700"
            >
              <RotateCw className="h-4 w-4" />
            </button>
          </div>

          {/* Row 3: Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="group pointer-events-auto relative col-span-2 h-14 w-full overflow-hidden rounded-xl bg-[#ea7236] px-8 text-white shadow-md transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-70 lg:col-span-1 lg:w-auto lg:min-w-[170px]"
          >
            <span className="absolute left-0 top-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 left-1/4 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
            <span className="absolute right-1/4 top-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-0 w-1/4 bg-[#37d4d9] duration-500 group-hover:h-full" />

            <span className="relative z-10 text-xl font-bold">
              {isSubmitting ? "Submitting..." : "SUBMIT"}
            </span>
          </Button>
        </form>

        {status === "captcha-error" && (
          <p className="mt-3 text-center text-xs text-red-600">
            Incorrect security answer. Please try again.
          </p>
        )}

        {status === "error" && (
          <p className="mt-3 text-center text-sm text-red-600">
            Something went wrong. Please try again or call us directly.
          </p>
        )}
      </div>
    </div>
  );
}