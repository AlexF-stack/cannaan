type Entry = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, Entry>();

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}) {
  const now = Date.now();
  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      success: true,
      remaining: limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (existing.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  memoryStore.set(key, existing);

  return {
    success: true,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}
