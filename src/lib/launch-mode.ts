/**
 * ─── LAUNCH MODE TOGGLE ───────────────────────────────────────────────────
 *
 * Change this single value to flip the entire site between modes.
 *
 *   "preLaunch"  → checkout disabled, "notify me" forms shown,
 *                  launching-soon banner on homepage
 *
 *   "live"       → checkout fully enabled, "my orders" link visible,
 *                  no launching-soon banner
 *
 * That's it. One word change controls everything.
 */

export type LaunchMode = "preLaunch" | "live";

export const LAUNCH_MODE: LaunchMode = "preLaunch";

/** Helper so component code reads more naturally */
export const isLive = (): boolean => (LAUNCH_MODE as LaunchMode) === "live";
export const isPreLaunch = (): boolean => (LAUNCH_MODE as LaunchMode) === "preLaunch";

/** Estimated launch date — shown in the launching-soon section */
export const ESTIMATED_LAUNCH = "Summer 2026";
