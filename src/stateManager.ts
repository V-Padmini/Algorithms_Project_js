export type Listener = () => void;
export type Middleware<T> = (state: T, next: (state: T) => void) => void;

export class Store<T extends Record<string, any>> {
  private state: T;
  private listeners: Listener[] = [];
  private middlewares: Middleware<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return JSON.parse(JSON.stringify(this.state));
  }

  setState(updater: Partial<T>) {
    const newState = { ...this.state, ...updater };

    const applyMiddleware = (state: T, index = 0) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](state, (nextState) => applyMiddleware(nextState, index + 1));
      } else {
        this.state = state;
        this.notify();
      }
    };

    applyMiddleware(newState);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => { this.listeners = this.listeners.filter(l => l !== listener); };
  }

  use(middleware: Middleware<T>) { this.middlewares.push(middleware); }

  private notify() { this.listeners.forEach(l => l()); }
}