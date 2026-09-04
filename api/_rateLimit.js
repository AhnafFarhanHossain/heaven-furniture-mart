const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map();

export function rateLimit(ip = "unknown") {
  const now = Date.now();
  const current = requests.get(ip);

  if (!current || now > current.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (current.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { allowed: true };
}
