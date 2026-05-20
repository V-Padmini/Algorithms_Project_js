export class RateLimiter {
  private requests: Map<string, number[]>;
  private limit: number;
  private windowMs: number;

  constructor(limit: number, windowMs: number) {
    this.requests = new Map();
    this.limit = limit;
    this.windowMs = windowMs;
  }

  allowRequest(user: string): boolean {
    const now = Date.now();
    if (!this.requests.has(user)) this.requests.set(user, []);

    const timestamps = this.requests.get(user)!;
    while (timestamps.length && now - timestamps[0] > this.windowMs) timestamps.shift();

    if (timestamps.length >= this.limit) return false;

    timestamps.push(now);
    return true;
  }

  getRemaining(user: string): number {
    if (!this.requests.has(user)) return this.limit;
    return Math.max(this.limit - this.requests.get(user)!.length, 0);
  }
}