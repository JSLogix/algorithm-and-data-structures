class _Node<T> {
  constructor(public val: number, public next?: _Node<T> | null) {}
}

class LinkedList<T> {
  private root: _Node<T> | null = null;
  private tail: _Node<T> | null = null;
  private length: number = 0;

  constructor(val: number) {
    const node = new _Node<T>(val);
    this.root = this.tail = node;
    this.length = 1;
  }

  push(val: number): void {
    const node = new _Node<T>(val);
    if (!this.tail) {
      this.root = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  unshift(val: number): void {
    this.root = new _Node<T>(val, this.root);
    if (!this.tail) this.tail = this.root;
    this.length++;
  }

  pop(): number {
    if (!this.root) return -1;
    if (this.length === 1) {
      const res = this.root.val;
      this.root = this.tail = null;
      this.length = 0;
      return res;
    }

    let temp = this.root;
    while (temp.next && temp.next.next) temp = temp.next;
    const res = temp.next!.val;
    temp.next = null;
    this.tail = temp;
    this.length--;

    return res;
  }

  shift(): number {
    if (!this.root) return -1;
    const res = this.root.val;
    this.root = this.root.next || null;
    if (!this.root) this.tail = null;
    this.length--;
    return res;
  }

  get(index: number): number | null {
    if (this.length === 0 || this.length < index) return null;
    let temp = this.root;
    while (temp && index != 0) {
      temp = temp.next || null;
      index--;
    }
    if (temp?.val === 0) return 0;
    return temp?.val || null;
  }
  set(index: number, val: number): void {
    if (index > this.size()) return;
    let temp = this.root;
    while (temp && index != 0) {
      index--;
      temp = temp.next || null;
    }
    if (temp) {
      temp.val = val;
    }
  }
  insert(index: number, val: number): void {
    if (index > this.size()) return;
    let temp = this.root;
    while (temp && index != 1) {
      index--;
      temp = temp.next || null;
    }
    if (temp) {
      const ans = temp.next;
      temp.next = new _Node(val);
      temp.next.next = ans;
    }
  }

  size(): number {
    return this.length;
  }
}
