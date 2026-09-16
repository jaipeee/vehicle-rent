"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Mail, MapPin, Phone, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT_PHONE } from "@/components/layout/navbar/navbar.config";
import { apiFetch } from "@/lib/api";

const SERVICES = ["Car Rental", "Tempo Traveller", "Bus Rental", "Corporate Travel", "Wedding Transport", "Outstation Trip"];

function useCaptcha() {
  const [nums, setNums] = useState<{ a: number; b: number } | null>(null);
  const [answer, setAnswer] = useState("");

  const refresh = () => {
    setNums({ a: Math.floor(Math.random() * 10) + 1, b: Math.floor(Math.random() * 10) + 1 });
    setAnswer("");
  };

  useEffect(refresh, []);

  const isCorrect = nums !== null && Number(answer) === nums.a + nums.b;
  return { nums, answer, setAnswer, refresh, isCorrect };
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [agree, setAgree] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "captcha-error">("idle");
  const [submitting, setSubmitting] = useState(false);
  const captcha = useCaptcha();

  // Placeholder only — wire up an SMS provider (e.g. MSG91, Twilio) to send a real OTP.
  function handleSendOtp() {
    setOtpSent(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!agree) {
      setStatus("error");
      return;
    }
    if (!captcha.isCorrect) {
      setStatus("captcha-error");
      captcha.refresh();
      return;
    }

    setSubmitting(true);
    try {
      await apiFetch("/enquiries", {
        method: "POST",
        body: JSON.stringify({ name, phone: mobile, email, vehicleType: service, message }),
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMobile("");
      setService("");
      setMessage("");
      setAgree(false);
      setOtpSent(false);
      captcha.refresh();
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Let&apos;s Plan Your <span className="text-amber-500">Next Trip</span>
        </h2>
        <p className="mt-3 text-center text-slate-500">Get in touch with our travel experts today.</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Office info card */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-700" />
                <span className="font-bold text-slate-900">Delhi</span>
              </div>
              <span className="rounded-full border border-emerald-300 px-3 py-1 text-xs font-medium text-emerald-700">
                Corporate Office
              </span>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900">Location</p>
                {/* Placeholder — replace with your real office address */}
                <p className="mt-1">123 Business Hub, Connaught Place, New Delhi, 110001</p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="mt-1">enquiry@indiventure.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <div>
                  <p className="font-semibold text-slate-900">Phone</p>
                  <a href={CONTACT_PHONE.href} className="mt-1 block text-emerald-700 hover:underline">
                    {CONTACT_PHONE.display}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          {status === "success" ? (
            <div className="flex items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
              <div>
                <h3 className="text-lg font-semibold text-emerald-900">Thanks! We&apos;ll be in touch shortly.</h3>
                <p className="mt-1 text-sm text-emerald-700">Your message has been received.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Name *" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input
                  type="email"
                  placeholder="Email Id *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Mobile No *"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                  <Button type="button" variant="outline" onClick={handleSendOtp} disabled={otpSent} className="shrink-0">
                    {otpSent ? "OTP Sent" : "Send OTP"}
                  </Button>
                </div>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Service" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Type Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <Checkbox checked={whatsapp} onCheckedChange={(v) => setWhatsapp(!!v)} />
                I want to be connected via WhatsApp.
              </label>

              <label className="flex items-start gap-2 text-sm text-slate-600">
                <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
                <span>By submitting, I agree to Indiventure&apos;s Terms of Service and Privacy Policy.</span>
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
                <span className="whitespace-nowrap font-bold text-emerald-700">
                  {captcha.nums ? `${captcha.nums.a} + ${captcha.nums.b} =` : "..."}
                </span>
                <Input
                  type="number"
                  value={captcha.answer}
                  onChange={(e) => captcha.setAnswer(e.target.value)}
                  placeholder="?"
                  className="w-20 text-center"
                />
                <button
                  type="button"
                  onClick={captcha.refresh}
                  aria-label="Refresh captcha"
                  className="ml-auto text-slate-400 transition-transform duration-300 hover:rotate-180 hover:text-emerald-700"
                >
                  <RotateCw className="h-5 w-5" />
                </button>
              </div>

              {status === "captcha-error" && <p className="text-sm text-red-600">Incorrect answer — please try again.</p>}
              {status === "error" && (
                <p className="text-sm text-red-600">Please agree to the terms, then try again.</p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="gap-2 rounded-full bg-amber-400 px-8 text-emerald-950 hover:bg-amber-300"
              >
                {submitting ? "Submitting..." : "Submit Now"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}