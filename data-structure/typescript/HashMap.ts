class HashMap<T> {
  private root: Record<string, T>;
  private currentSize: number;

  constructor(val?: T | HashMap<T>) {
    if (val instanceof HashMap) {
      this.root = { ...val.root };
      this.currentSize = val.size();
    } else {
      this.root = {};
      this.currentSize = 0;
    }
  }

  set(key: string, value: T): void {
    if (!(key in this.root)) {
      this.currentSize++;
    }
    this.root[key] = value;
  }

  get(key: string): T | undefined {
    return this.root[key];
  }

  has(key: string): boolean {
    return key in this.root;
  }

  clear(): void {
    this.root = {};
    this.currentSize = 0;
  }

  size(): number {
    return this.currentSize;
  }

  keys(): string[] {
    return Object.keys(this.root);
  }

  values(): T[] {
    return Object.values(this.root);
  }

  entries(): [string, T][] {
    return Object.entries(this.root);
  }

  forEach(func: (key: string, value: T) => void): void {
    for (const [key, value] of this.entries()) {
      func(key, value);
    }
  }
}
