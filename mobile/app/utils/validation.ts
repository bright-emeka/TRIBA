export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

export const isValidDisplayName = (displayName: string): boolean => {
  return displayName.trim().length >= 2 && displayName.trim().length <= 50;
};

export const isValidPostContent = (content: string): boolean => {
  return content.trim().length >= 1 && content.trim().length <= 500;
};

export const isValidComment = (content: string): boolean => {
  return content.trim().length >= 1 && content.trim().length <= 300;
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
  if (password.length < 6) return 'weak';
  if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    return 'medium';
  }
  return 'weak';
};
