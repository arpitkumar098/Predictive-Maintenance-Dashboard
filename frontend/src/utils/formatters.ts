/**
 * Date and number formatting utilities using date-fns.
 */
import { formatDistanceToNow, format, parseISO } from 'date-fns';

/** Format an ISO date string as "X hours ago", "2 days ago", etc. */
export function timeAgo(dateStr: string): string {
  try {
    return formatDistanceToNow(parseISO(dateStr), { addSuffix: true });
  } catch {
    return dateStr;
  }
}

/** Format an ISO date string as "Jan 15, 2026" */
export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  try {
    return format(parseISO(dateStr), 'MMM d, yyyy');
  } catch {
    return dateStr;
  }
}

/** Format an ISO date string as "10:30 AM" */
export function formatTime(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'h:mm a');
  } catch {
    return dateStr;
  }
}

/** Format a number with locale-appropriate separators */
export function formatNumber(value: number): string {
  return value.toLocaleString();
}

/** Format a percentage value */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format temperature with unit */
export function formatTemp(value: number): string {
  return `${value.toFixed(1)}°C`;
}

/** Format vibration with unit */
export function formatVibration(value: number): string {
  return `${value.toFixed(4)} mm/s`;
}

/** Format RPM */
export function formatRPM(value: number): string {
  return `${Math.round(value)} RPM`;
}
