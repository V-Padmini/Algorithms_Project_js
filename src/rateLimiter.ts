export class RateLimiter {
  private requests: Map<string, number[]>;
  private limit: number;
  private windowMs: number;

  constructor(limit: number, windowMs: number) {
    this.requests = new Map();
    this.limit = limit;
    this.windowMs = windowMs;
  }

  // 🔹 Helper function to remove expired timestamps
  private cleanOldRequests(user: string): void {
    if (!this.requests.has(user)) return;

    const now = Date.now();
    const timestamps = this.requests.get(user)!;

    while (timestamps.length && now - timestamps[0] > this.windowMs) {
      timestamps.shift();
    }
  }

  // 🔹 Check if user can make a request
  allowRequest(user: string): boolean {
    const now = Date.now();
    const nowFormatted = new Date(now).toLocaleTimeString();

    if (!this.requests.has(user)) this.requests.set(user, []);

    // ✅ Clean old requests before checking limit
    this.cleanOldRequests(user);

    const timestamps = this.requests.get(user)!;

    if (timestamps.length >= this.limit) {
      console.log(
        `[${nowFormatted}] ${user} request DENIED | Remaining: 0`
      );
      return false;
    }

    timestamps.push(now);
    const remaining = this.limit - timestamps.length;

    console.log(
      `[${nowFormatted}] ${user} request ALLOWED | Remaining: ${remaining}`
    );
    console.log(
      `${user} timestamps:`,
      timestamps.map(ts => new Date(ts).toLocaleTimeString())
    );

    return true;
  }

  // 🔹 Get how many requests the user can still make
  getRemaining(user: string): number {
    if (!this.requests.has(user)) return this.limit;

    // ✅ Clean old requests before calculating remaining
    this.cleanOldRequests(user);

    const timestamps = this.requests.get(user)!;
    return Math.max(this.limit - timestamps.length, 0);
  }
}