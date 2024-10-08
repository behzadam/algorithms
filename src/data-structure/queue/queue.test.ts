import { Queue } from "./queue";

describe("Queue", () => {
  it("creates empty queue", () => {
    const queue = new Queue();
    expect(queue).not.toBeNull();
    expect(queue.list).not.toBeNull();
  });

  it("enqueues data to queue", () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe("1,2");
  });

  it("enqueue/dequeue objects", () => {
    const queue = new Queue<{ key: string; value: string }>();

    queue.enqueue({ value: "test1", key: "key1" });
    queue.enqueue({ value: "test2", key: "key2" });

    const stringifier = (value: { key: string; value: string }) =>
      `${value.key}:${value.value}`;
    expect(queue.toString(stringifier)).toBe("key1:test1,key2:test2");
    expect(queue.dequeue()?.value).toBe("test1");
    expect(queue.dequeue()?.value).toBe("test2");
  });

  it("peeks data from queue", () => {
    const queue = new Queue();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it("checkes if queue is empty", () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);

    queue.enqueue(1);

    expect(queue.isEmpty()).toBe(false);
  });

  it("dequeues from queue in FIFO order", () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBe(true);
  });
});
