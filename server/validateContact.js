export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  question: { min: 10, max: 1000 },
};

// Pragmatic email shape check: one @, no spaces, a dot in the domain. Deliberately
// not RFC 5322; the only authoritative validation is sending mail.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+\.[^\s@]{2,}$/;

/**
 * Validates a contact submission.
 * Returns { valid, errors, value } where `value` holds trimmed, length-capped
 * fields safe to persist.
 */
export function validateContact(input = {}) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const question =
    typeof input.question === "string" ? input.question.trim() : "";

  const errors = {};

  if (!name) {
    errors.name = "Please tell us your name.";
  } else if (name.length < LIMITS.name.min) {
    errors.name = "That name looks too short.";
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Please keep your name under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "We need an email to reply to.";
  } else if (email.length > LIMITS.email.max) {
    errors.email = "That email address is too long.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please check the email address.";
  }

  if (!question) {
    errors.question = "Let us know what you'd like to ask.";
  } else if (question.length < LIMITS.question.min) {
    errors.question = "Please add a little more detail.";
  } else if (question.length > LIMITS.question.max) {
    errors.question = `Please keep it under ${LIMITS.question.max} characters.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    value: {
      name: name.slice(0, LIMITS.name.max),
      email: email.slice(0, LIMITS.email.max).toLowerCase(),
      question: question.slice(0, LIMITS.question.max),
    },
  };
}
