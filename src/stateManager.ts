// TodoStore.ts
export type Todo = {
  id: number;
  task: string;
  done: boolean;
};

export class TodoStore {
  private todos: Todo[] = [];
  private listeners: (() => void)[] = [];

  // Subscribe a listener
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify listeners
  private notify() {
    this.listeners.forEach(l => l());
  }

  // Get number of listeners
  getListenerCount(): number {
    return this.listeners.length;
  }

  // Add a todo
  addTask(task: string) {
    const todo: Todo = { id: Date.now(), task, done: false };
    this.todos.push(todo);
    this.notify();
  }

  // Complete a todo
  completeTask(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.done = true;
      this.notify();
    }
  }

  // Remove a todo
  removeTask(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.notify();
  }

  // Get current todos
  getTodos() {
    return [...this.todos];
  }
}