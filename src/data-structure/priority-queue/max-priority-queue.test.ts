import MaxPriorityQueue from "../max-priority-queue";

describe("PriorityQueue", () => {
  it("creates default priority queue", () => {
    const priorityQueue = new MaxPriorityQueue();

    expect(priorityQueue).toBeDefined();
  });

  it("inserts items to the queue and respect priorities", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    expect(priorityQueue.peek()).toBe(10);

    priorityQueue.add(5, 2);
    expect(priorityQueue.peek()).toBe(5);

    priorityQueue.add(100, 0);
    expect(priorityQueue.peek()).toBe(5);
  });

  it("adds objects in priority queue", () => {
    type User = { name: string };
    const priorityQueue = new MaxPriorityQueue<User>();

    const user1 = { name: "Mike" } as User;
    const user2 = { name: "Bill" } as User;
    const user3 = { name: "Jane" } as User;

    priorityQueue.add(user1, 2);
    expect(priorityQueue.peek()).toBe(user1);

    priorityQueue.add(user2, 1);
    expect(priorityQueue.peek()).toBe(user1);

    priorityQueue.add(user3, 0);
    expect(priorityQueue.peek()).toBe(user1);
  });

  it("polls from queue with respect to priorities", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(200);
  });

  it("changes priority of head node", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    expect(priorityQueue.peek()).toBe(5);

    priorityQueue.changePriority(100, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(100);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(200);
  });

  it("changes priority of internal nodes", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    expect(priorityQueue.peek()).toBe(5);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(5);
  });

  it("changes priority along with node addition", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    priorityQueue.add(15, 15);

    expect(priorityQueue.poll()).toBe(10);
    expect(priorityQueue.poll()).toBe(15);
    expect(priorityQueue.poll()).toBe(200);
    expect(priorityQueue.poll()).toBe(5);
    expect(priorityQueue.poll()).toBe(100);
  });

  it("searchs in priority queue by value", () => {
    const priorityQueue = new MaxPriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);
    priorityQueue.add(15, 15);

    expect(priorityQueue.isExists(70)).toBe(false);
    expect(priorityQueue.isExists(15)).toBe(true);
  });
});
