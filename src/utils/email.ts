/**
 * Utility functions for email obfuscation
 */
export const emailUtils = {
  /**
   * Encodes text to a mix of decimal and hex entities
   */
  encodeToEntities: (text: string) => {
    return text
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        return Math.random() > 0.5 ? `&#${code};` : `&#x${code.toString(16)};`;
      })
      .join('');
  },

  /**
   * Creates an obfuscated email string for display
   * @param email - The email address to obfuscate
   * @returns HTML entity encoded email string
   */
  getObfuscatedEmail: (email: string) => {
    return emailUtils.encodeToEntities(email);
  },
} as const;
