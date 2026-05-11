"use client";

import { useState, useTransition } from "react";
import { addToNotifyList } from "@/app/actions/notify";

type Variant = "hero" | "inline" | "dark";

export default function NotifyMeForm({
  variant = "inline",
  placeholder = "your@email.ch",
  buttonLabel = "Keep me posted →",
}: {
  variant?: Variant;
  placeholder?: string;
  buttonLabel?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  function handleSubmit(formData: FormData) {
    setResult(null);
    startTransition(async () => {
      const r = await addToNotifyList(formData);
      setResult(r);
    });
  }

  // ─── Styles vary by variant ─────────────────────────────────────────────
  const inputClasses: Record<Variant, string> = {
    hero: "bg-parchment/80 border-bark/30 placeholder:text-bark/40 text-bark",
    inline: "bg-cream border-bark/30 placeholder:text-bark/40 text-bark",
    dark: "bg-roast/40 border-cream/30 placeholder:text-cream/40 text-cream",
  };
  const buttonClasses: Record<Variant, string> = {
    hero: "btn-stamp",
    inline: "btn-stamp",
    dark: "btn-stamp",
  };
  const messageClasses: Record<Variant, string> = {
    hero: "text-bark/80",
    inline: "text-bark/80",
    dark: "text-cream/90",
  };

  if (result?.ok) {
    return (
      <div className={`flex items-center gap-3 ${messageClasses[variant]}`}>
        <span className="serif-display italic text-clay text-3xl leading-none">✓</span>
        <p className="serif-display italic text-lg">{result.message}</p>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-md"
    >
      <input
        type="email"
        name="email"
        required
        disabled={isPending}
        placeholder={placeholder}
        className={`flex-1 px-4 py-3 border focus:outline-none focus:border-terracotta transition-colors ${inputClasses[variant]}`}
      />
      <button
        type="submit"
        disabled={isPending}
        className={`${buttonClasses[variant]} disabled:opacity-60 disabled:cursor-wait shrink-0`}
        style={
          variant === "dark"
            ? { background: "#f4ecde", color: "#2d1f15", borderColor: "#f4ecde" }
            : undefined
        }
      >
        {isPending ? "Saving…" : buttonLabel}
      </button>
      {result && !result.ok && (
        <p className={`text-sm text-terracotta sm:basis-full sm:mt-1 ${variant === "dark" ? "text-cream" : ""}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
