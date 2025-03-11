import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a random code for game invitations
 * @returns Random 6-character alphanumeric code
 */
export function generateGameCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Gets the CSS class for a specific rank
 * @param rank - The rank (A, B, C, D, F)
 * @returns CSS class for the rank
 */
export function getRankClass(rank: string | null | undefined): string {
  if (!rank) return '';
  
  const rankMap: Record<string, string> = {
    'A': 'rank-a',
    'B': 'rank-b',
    'C': 'rank-c',
    'D': 'rank-d',
    'F': 'rank-f',
  };
  
  return rankMap[rank] || '';
}

/**
 * Format a date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
