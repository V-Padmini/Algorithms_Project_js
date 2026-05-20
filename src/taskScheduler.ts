export type Task = {
  id: string;
  executeAt: number;
  action: () => Promise<void> | void;
  priority: number;
};

export class TaskScheduler {
  private tasks: Task[] = [];
  private interval: NodeJS.Timeout | null = null;

  addTask(action: () => Promise<void> | void, delay: number, priority = 0): string {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.tasks.push({ id, executeAt: Date.now() + delay, action, priority });
    this.tasks.sort((a, b) => a.executeAt - b.executeAt || b.priority - a.priority);
    return id;
  }

  cancelTask(id: string): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  start(): void {
    if (this.interval) return;
    this.interval = setInterval(async () => {
      const now = Date.now();
      while (this.tasks.length && this.tasks[0].executeAt <= now) {
        const task = this.tasks.shift()!;
        try { await task.action(); } 
        catch (e) { console.error("Task error:", e); }
      }
    }, 100);
  }

  stop(): void {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }
}