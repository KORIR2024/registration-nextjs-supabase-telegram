export const COUNTRY_OPTIONS = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "United States",
  "United Kingdom",
  "Canada",
  "South Africa",
  "Nigeria",
  "Ghana",
  "India",
  "Australia",
  "Germany",
  "France",
  "United Arab Emirates",
  "Egypt",
  "Rwanda",
  "Other",
];

export type RegistrationPayload = {
  fullName: string;
  email?: string;
  country: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export function sanitizeText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeUsername(value: string) {
  return sanitizeText(value).replace(/[^a-zA-Z0-9._-]/g, "").toLowerCase();
}

export function normalizePhone(value: string) {
  return sanitizeText(value).replace(/\s+/g, " ");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateRegistrationInput(payload: RegistrationPayload) {
  const errors: string[] = [];

  if (!payload.fullName || sanitizeText(payload.fullName).length < 2) {
    errors.push("Please enter a valid full name.");
  }

  if (!payload.country || !COUNTRY_OPTIONS.includes(payload.country)) {
    errors.push("Please select a valid country.");
  }

  if (!payload.phone || sanitizeText(payload.phone).length < 7) {
    errors.push("Please enter a valid phone number.");
  }

  const username = normalizeUsername(payload.username);
  if (!username || username.length < 3 || username.length > 30) {
    errors.push("Username must be 3 to 30 characters and contain only letters, numbers, periods, underscores, or dashes.");
  }

  if (payload.email && payload.email.trim() && !isValidEmail(payload.email)) {
    errors.push("Please enter a valid email address.");
  }

  if (!payload.password || payload.password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (payload.password !== payload.confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (!payload.acceptTerms) {
    errors.push("You must accept the Terms and Conditions.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalized: {
      fullName: sanitizeText(payload.fullName),
      username,
      email: payload.email ? payload.email.trim().toLowerCase() : null,
      country: sanitizeText(payload.country),
      phone: normalizePhone(payload.phone),
    },
  };
}
