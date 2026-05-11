"use server";

import fs from "node:fs/promises";
import path from "node:path";

const STORAGE_PATH = path.join(process.cwd(), "data", "notify-list.json");

type NotifyEntry = {
  email: string;
  signedUpAt: string; // ISO timestamp
};

/**
 * Saves a "notify me when we launch" email to a local JSON file.
 *
 * This is intentionally simple — perfect for pre-launch.
 *
 * When you go live, swap this for one of:
 *  - Resend.com audience (free tier 100/day, perfect for small lists)
 *  - Mailchimp / Brevo (popular for newsletters)
 *  - Just keep the JSON file and export it manually when needed
 */
export async function addToNotifyList(formData: FormData): Promise<{
  ok: boolean;
  message: string;
}> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  // Basic validation
  if (!email) {
    return { ok: false, message: "Please enter an email address." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "That doesn't look like a valid email." };
  }
  if (email.length > 200) {
    return { ok: false, message: "Email too long." };
  }

  try {
    // Make sure /data folder exists
    await fs.mkdir(path.dirname(STORAGE_PATH), { recursive: true });

    // Read existing list (or start fresh)
    let entries: NotifyEntry[] = [];
    try {
      const raw = await fs.readFile(STORAGE_PATH, "utf-8");
      entries = JSON.parse(raw);
      if (!Array.isArray(entries)) entries = [];
    } catch {
      // File doesn't exist yet — that's fine
    }

    // Already on the list? Be friendly about it.
    if (entries.some((e) => e.email === email)) {
      return { ok: true, message: "You're already on the list — we'll be in touch!" };
    }

    // Add and save
    entries.push({ email, signedUpAt: new Date().toISOString() });
    await fs.writeFile(STORAGE_PATH, JSON.stringify(entries, null, 2));

    return { ok: true, message: "You're in. We'll send word when we open the doors." };
  } catch (err) {
    console.error("Failed to save notify-me signup:", err);
    return {
      ok: false,
      message: "Something went wrong on our end. Try again in a moment?",
    };
  }
}
