"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { enquirySchema, type EnquiryInput } from "./enquiry.schema";
import { submitEnquiry, submitToGoogleScript } from "./enquiry.api";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="absolute left-0 top-full mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

// Simple client-side math CAPTCHA
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

  const isCorrect =
    nums !== null && Number(answer) === nums.a + nums.b;

  return {
    nums,
    answer,
    setAnswer,
    refresh,
    isCorrect,
  };
}

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
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  async function onSubmit(values: EnquiryInput) {
    if (!captcha.isCorrect) {
      setStatus("captcha-error");
      return;
    }

    try {
      // Main enquiry API
      await submitEnquiry(values);

      // Google Sheet — best effort
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

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-6xl rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center shadow-lg">
        <h3 className="text-lg font-semibold text-emerald-900">
          Thanks! We&apos;ll get back to you shortly.
        </h3>

        <p className="mt-1 text-sm text-emerald-700">
          Your enquiry has been received.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        w-full
        max-w-6xl
        rounded-2xl
        border
        border-white/70
        bg-white/95
        p-4
        shadow-xl
        backdrop-blur-md
        sm:p-7
      "
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex
          flex-col
          gap-3
          lg:flex-row
          lg:items-start
        "
      >
        {/* First Name */}
        <div className="relative w-full lg:flex-1">
          <Input
            id="firstName"
            placeholder="First Name *"
            autoComplete="given-name"
            className="
              h-14
              rounded-xl
              border-slate-200
              bg-white
              px-4
              text-sm
              shadow-none
              focus-visible:ring-emerald-600
            "
            {...register("firstName")}
          />

          <FieldError message={errors.firstName?.message} />
        </div>

        {/* Last Name - Optional */}
        <div className="relative w-full lg:flex-1">
          <Input
            id="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            className="
              h-14
              rounded-xl
              border-slate-200
              bg-white
              px-4
              text-sm
              shadow-none
              focus-visible:ring-emerald-600
            "
            {...register("lastName")}
          />

          <FieldError message={errors.lastName?.message} />
        </div>

        {/* Mobile Number */}
        <div className="relative w-full lg:flex-1">
          <Input
            id="phone"
            type="tel"
            placeholder="Mobile Number *"
            autoComplete="tel"
            className="
              h-14
              rounded-xl
              border-slate-200
              bg-white
              px-4
              text-sm
              shadow-none
              focus-visible:ring-emerald-600
            "
            {...register("phone")}
          />

          <FieldError message={errors.phone?.message} />
        </div>

        {/* CAPTCHA */}
        <div className="flex h-14 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 lg:w-auto">
          <span className="whitespace-nowrap text-sm font-semibold text-slate-600">
            {captcha.nums
              ? `${captcha.nums.a} + ${captcha.nums.b} =`
              : "..."}
          </span>

          <Input
            type="number"
            value={captcha.answer}
            onChange={(e) => {
              captcha.setAnswer(e.target.value);
              if (status === "captcha-error") {
                setStatus("idle");
              }
            }}
            placeholder="?"
            aria-label="Captcha answer"
            className="
              ml-2
              h-9
              w-16
              border-slate-200
              bg-white
              text-center
              shadow-none
              focus-visible:ring-emerald-600
            "
          />

          <button
            type="button"
            onClick={() => {
              captcha.refresh();
              setStatus("idle");
            }}
            aria-label="Refresh captcha"
            className="
              ml-2
              text-slate-400
              transition-transform
              duration-300
              hover:rotate-180
              hover:text-emerald-700
            "
          >
            <RotateCw className="h-4 w-4" />
          </button>
        </div>

        {/* Submit */}
        <Button
  type="submit"
  disabled={isSubmitting}
  className={cn(
    `
      group
      pointer-events-auto
      relative
      h-14
      w-full
      overflow-hidden
      rounded-xl
      bg-[#ea7236]
      px-8
      text-white
      shadow-md
      transition-all
      hover:shadow-lg
      disabled:pointer-events-none
      disabled:opacity-70
      lg:w-auto
      lg:min-w-[170px]
    `
  )}
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

      {/* Errors */}
      {status === "captcha-error" && (
        <p className="mt-2 text-center text-xs text-red-600">
          Incorrect security answer. Please try again.
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-center text-sm text-red-600">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </div>
  );
}