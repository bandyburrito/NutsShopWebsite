import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";

const STORAGE_PATH = path.join(process.cwd(), "data", "notify-list.json");

type NotifyEntry = { email: string; signedUpAt: string };

/**
 * Tiny local-only admin page for viewing the notify-me list.
 *
 * Accessible at /admin/notify-list?key=YOUR_KEY
 *
 * The key is read from the ADMIN_KEY env var. If unset, the page 404s —
 * so deploying without setting ADMIN_KEY keeps it hidden by default.
 */
export default async function NotifyListAdmin({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const expectedKey = process.env.ADMIN_KEY;

  // No admin key configured → page doesn't exist
  if (!expectedKey) return notFound();

  // Wrong / missing key → page doesn't exist (no hint that the page IS real)
  if (searchParams.key !== expectedKey) return notFound();

  let entries: NotifyEntry[] = [];
  try {
    const raw = await fs.readFile(STORAGE_PATH, "utf-8");
    entries = JSON.parse(raw);
  } catch {
    // No signups yet
  }

  return (
    <article className="grain min-h-[70vh]">
      <section className="max-w-4xl mx-auto px-6 py-16">
        <Link href="/" className="text-sm text-bark/60 link-underline">
          ← Back home
        </Link>
        <p className="mt-8 text-clay text-xs tracking-[0.3em] uppercase mb-4">— Admin —</p>
        <h1 className="font-display text-5xl md:text-6xl text-bark mb-3">
          Notify-me list
        </h1>
        <p className="text-bark/60 mb-10">
          {entries.length} {entries.length === 1 ? "signup" : "signups"}
        </p>

        {entries.length === 0 ? (
          <p className="text-bark/60 italic">No signups yet.</p>
        ) : (
          <div className="border border-bark/20 bg-cream">
            <table className="w-full text-sm">
              <thead className="bg-parchment border-b border-bark/20">
                <tr>
                  <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-bark/60">
                    Email
                  </th>
                  <th className="text-left px-4 py-3 text-xs tracking-widest uppercase text-bark/60">
                    Signed up
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={i} className="border-b border-bark/10 last:border-0">
                    <td className="px-4 py-3 font-mono text-bark">{e.email}</td>
                    <td className="px-4 py-3 text-bark/60">
                      {new Date(e.signedUpAt).toLocaleString("en-GB", {
                        timeZone: "Europe/Zurich",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-10 text-xs text-bark/50 italic leading-relaxed max-w-md">
          List is stored in <code>/data/notify-list.json</code>. To export, just
          open that file or copy/paste the table above into a spreadsheet.
        </p>
      </section>
    </article>
  );
}
