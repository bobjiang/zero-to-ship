import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Canonical card styling, defined once so it stays consistent site-wide.
 * - `cardSurface`: default look (grey border, white bg, subtle shadow). Add padding per context.
 * - `cardHover`: add to fully-clickable cards. Hover lifts the shadow only — border and text stay put.
 *   A hover lift always means "this whole card is a link."
 */
export const cardSurface = 'rounded-lg border border-gray-200 bg-white shadow-sm';
export const cardHover = 'transition-shadow hover:shadow-md';

/**
 * URL for a lesson. The first lesson of a series is canonical at the course root
 * (`/courses/<series>`), so entering a course opens lesson 1 directly. Lessons 2..N
 * live at `/courses/<series>/<slug>`.
 */
export function lessonHref(seriesSlug: string, lessonSlug: string, isFirst: boolean) {
  return isFirst ? `/courses/${seriesSlug}` : `/courses/${seriesSlug}/${lessonSlug}`;
}

/** Strip a redundant "Lesson N - " prefix from a lesson title (the UI shows its own number). */
export function cleanLessonTitle(title: string) {
  return title.replace(/^lesson\s+\d+\s*[-–:]\s*/i, '');
}
