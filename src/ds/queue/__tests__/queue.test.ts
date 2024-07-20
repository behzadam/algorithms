import Queue from "../queue";

describe("Queue", () => {
  it("enqueues data to queue", () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toString()).toBe("1,2");
  });

  it("enqueues/dequeues  objects", () => {
    type User = {
      id: string;
      name: string;
    };
    const queue = new Queue<User>();

    queue.enqueue({ name: "test1", id: "key1" } as User);
    queue.enqueue({ name: "test2", id: "key2" } as User);

    const stringifier = (user: User) => `${user.id}:${user.name}`;

    expect(queue.toString(stringifier)).toBe("key1:test1,key2:test2");
    expect(queue.dequeue()?.name).toBe("test1");
    expect(queue.dequeue()?.name).toBe("test2");
  });

  it("peeks data from queue", () => {
    const queue = new Queue();

    expect(queue.peek()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);
  });

  it("checks if queue is empty", () => {
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
