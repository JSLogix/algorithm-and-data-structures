class Queue<T> {
  private root: T[];

  constructor(initialValues: T[] = []) {
    this.root = [...initialValues];
  }

  enqueue(val: T): void {
    this.root.push(val);
  }

  dequeue(): T | undefined {
    return this.root.shift();
  }

  front(): T | undefined {
    return this.root[0];
  }

  size(): number {
    return this.root.length;
  }

  isEmpty(): boolean {
    return this.root.length === 0;
  }

  clear(): void {
    this.root.length = 0;
  }
}
