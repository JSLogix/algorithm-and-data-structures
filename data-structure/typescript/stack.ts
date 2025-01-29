class Stack<T> {
  private root: T[];

  constructor(_val: T[] = []) {
    this.root = _val.slice();
  }

  push(val: T): void {
    this.root[this.root.length] = val;
  }

  pop(): T | undefined {
    return this.root.length ? this.root.pop() : undefined;
  }

  peek(): T | undefined {
    return this.root[this.root.length - 1];
  }

  size(): number {
    return this.root.length;
  }

  isEmpty(): boolean {
    return !this.root.length;
  }
}
