const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string, maxRequests = 10, windowMs = 60 * 1000) {
  const now = Date.now();
  const key = ip || "unknown";
  const existing = rateLimitMap.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (existing.count >= maxRequests) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)) };
  }

  existing.count += 1;
  return { ok: true };
}
