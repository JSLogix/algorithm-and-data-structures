class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private length = 0;

  constructor(val: T) {
    this.head = this.tail = new ListNode(val);
    this.length = 1;
  }

  push(val: T): void {
    const node = new ListNode(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  unshift(val: T): void {
    this.head = new ListNode(val, this.head);
    if (!this.tail) this.tail = this.head;
    this.length++;
  }

  pop(): T | null {
    if (!this.head) return null;
    if (this.length === 1) {
      const res = this.head.val;
      this.head = this.tail = null;
      this.length = 0;
      return res;
    }

    let temp = this.head;
    while (temp.next && temp.next.next) temp = temp.next;
    const res = temp.next!.val;
    temp.next = null;
    this.tail = temp;
    this.length--;

    return res;
  }

  shift(): T | null {
    if (!this.head) return null;
    const res = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return res;
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.length) return null;
    let temp = this.head;
    while (temp && index--) temp = temp.next;
    return temp ? temp.val : null;
  }

  set(index: number, val: T): boolean {
    let temp = this.head;
    while (temp && index--) temp = temp.next;
    if (temp) {
      temp.val = val;
      return true;
    }
    return false;
  }

  insert(index: number, val: T): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return this.unshift(val), true;
    if (index === this.length) return this.push(val), true;

    let temp = this.head;
    for (let i = 0; i < index - 1; i++) temp = temp!.next;

    temp!.next = new ListNode(val, temp!.next);
    this.length++;
    return true;
  }

  size(): number {
    return this.length;
  }
}
