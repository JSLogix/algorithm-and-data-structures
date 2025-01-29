enum EPromiseStatus {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

type Executor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

class MyPromise<T = any> {
  private status: EPromiseStatus = EPromiseStatus.PENDING;
  private value: T | undefined = undefined;
  private reason: any = undefined;

  constructor(executor: Executor<T>) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: T): void {
    if (this.status === EPromiseStatus.PENDING) {
      this.status = EPromiseStatus.FULFILLED;
      this.value = value;
    }
  }

  private reject(reason: any): void {
    if (this.status === EPromiseStatus.PENDING) {
      this.status = EPromiseStatus.REJECTED;
      this.reason = reason;
    }
  }
  private all(promises: any[] | Promise<T>[]) {
    return new MyPromise((resolve, reject) => {
      const outputs: any[] = [];
      let completed = promises.length;
      for (const promise of promises) {
        if (promise instanceof Promise) {
          promise
            .then((val) => {
              completed--;
              outputs.push(val);
              if (completed === 0) resolve(outputs);
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          completed--;
          outputs.push(promise);
          if (completed === 0) resolve(outputs);
        }
      }
    });
  }
  private allSettled(promises: any[] | Promise<T>[]) {
    return new MyPromise((resolve, reject) => {
      const outputs: any[] = [];
      let completed = 0;
      const n = promises.length;
      for (const promise of promises) {
        if (promise instanceof Promise) {
          promise
            .then((value) => {
              outputs.push(value);
            })
            .catch((error) => {
              outputs.push(error);
            });
        } else {
          outputs.push(promise);
        }
        completed--;
        if (completed === n) resolve(outputs);
      }
    });
  }
  private race(promises: any[] | Promise<T>[]) {
    return new MyPromise((resolve, reject) => {
      if (!promises.length) resolve("");
      const promise = promises[0];
      for (const promise of promises) {
        if (promise instanceof Promise) {
          promise.then(resolve).catch(reject);
        } else {
          resolve(promise);
          break;
        }
      }
    });
  }
  private any(promises: any[] | Promise<T>[]) {}
}
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});
