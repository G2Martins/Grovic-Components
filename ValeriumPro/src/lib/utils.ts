import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date, pattern = "MMM d, yyyy"): string {
  return format(new Date(date), pattern)
}

export function formatRelativeDate(date: string | Date): string {
  const d = new Date(date)
  if (isToday(d)) return "Today"
  if (isYesterday(d)) return "Yesterday"
  return formatDistanceToNow(d, { addSuffix: true })
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + "…"
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function hslToString(h: number, s: number, l: number): string {
  return `${h} ${s}% ${l}%`
}

export function formatUrlWithProtocol(url: string): string {
  if (!url) return url
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`
}
