/**
 * Color Constants for Skillet'z Cafe
 *
 * This file defines the color palette used throughout the application.
 * Colors are organized by semantic purpose and include both hex values
 * and CSS custom property names for consistency.
 */

export const COLORS = {
  // Primary Brand Colors
  primary: {
    orange: '#ff7f50',
    orangeHover: '#ff6b3c',
    orangeRgb: '255, 127, 80',
  },

  // Text Colors
  text: {
    primary: '#333',
    secondary: '#555',
    muted: '#666',
    light: '#888',
    veryLight: '#999',
    white: '#ffffff',
    dark: '#222',
  },

  // Background Colors
  background: {
    white: '#ffffff',
    light: '#f8f8f8',
    dark: '#242424',
    overlay: 'rgba(255, 255, 255, 0.65)',
    darkOverlay: 'rgba(0, 0, 0, 0.3)',
  },

  // Border Colors
  border: {
    light: '#eee',
    medium: '#bbb',
    dark: '#505050',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
    text: 'rgba(0, 0, 0, 0.5)',
  },

  // Print-specific Colors
  print: {
    text: '#222',
    textSecondary: '#444',
    textMuted: '#555',
    textLight: '#666',
    textVeryLight: '#888',
    border: '#bbb',
    background: '#ffffff',
  },
} as const;

/**
 * CSS Custom Properties for Colors
 * These can be used in CSS files with var(--color-name)
 */
export const CSS_COLOR_VARS = {
  // Print-specific color variables
  '--print-text': COLORS.print.text,
  '--print-text-secondary': COLORS.print.textSecondary,
  '--print-text-muted': COLORS.print.textMuted,
  '--print-text-light': COLORS.print.textLight,
  '--print-text-very-light': COLORS.print.textVeryLight,
  '--print-border': COLORS.print.border,
  '--print-background': COLORS.print.background,
} as const;

/**
 * Type definitions for color usage
 */
export type ColorKey = keyof typeof COLORS;
export type PrintColorKey = keyof typeof COLORS.print;
