"use client";

import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <article className="grain">
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <p className="text-clay text-xs tracking-[0.3em] uppercase mb-6">— Get in touch —</p>
        <h1 className="font-display text-6xl md:text-8xl text-bark leading-[0.95]">
          Say <span className="serif-display text-terracotta">hi.</span>
        </h1>
        <p className="serif-display italic text-2xl text-bark/60 mt-6 max-w-2xl">
          We answer every message ourselves. Usually within a day, sometimes two
          if the packing room is busy.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-12 gap-12">
        {/* CONTACT INFO */}
        <div className="md:col-span-5 space-y-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">Phone</p>
            <p className="serif-display text-3xl text-bark">+00 000 000 000</p>
            <p className="text-sm text-bark/60 mt-1">Mon–Fri, 9–17</p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">Email</p>
            <p className="serif-display text-3xl text-bark">hello@kernel-co.example</p>
          </div>

          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-clay mb-3">The room</p>
            <p className="serif-display text-2xl text-bark leading-snug">
              Street address line 1<br />
              City, postcode<br />
              Country
            </p>
            <p className="text-sm text-bark/60 mt-3 italic">
              By appointment only — we're usually elbow-deep in pistachios.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="md:col-span-7">
          <div className="border border-bark/20 bg-parchment p-8 md:p-10 shadow-[8px_8px_0_#2d1f15] relative">
            <div className="absolute inset-0 grain pointer-events-none" />
            {sent ? (
              <div className="relative text-center py-16">
                <p className="serif-display text-clay text-7xl mb-4">✓</p>
                <p className="serif-display italic text-3xl text-bark mb-3">Got it.</p>
                <p className="text-bark/70">We'll be in touch shortly.</p>
              </div>
            ) : (
              <div className="relative space-y-5">
                <p className="text-xs tracking-[0.3em] uppercase text-clay mb-2">Send a note</p>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-cream border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-cream border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-bark/60 mb-2">
                    What's on your mind?
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-cream border border-bark/30 px-4 py-3 text-bark focus:outline-none focus:border-terracotta resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="btn-stamp w-full md:w-auto"
                >
                  Send the note →
                </button>
                <p className="text-xs text-bark/50 italic mt-3">
                  (Form is a demo — wire it up to your email service of choice.)
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
