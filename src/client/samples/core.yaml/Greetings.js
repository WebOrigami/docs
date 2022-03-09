const names = ["Alice", "Bob", "Carol"];

export default class GreetingPages {
  constructor(greeting) {
    this.greeting = greeting;
  }

  async *[Symbol.asyncIterator]() {
    yield* names;
  }

  async get(key) {
    return key === "index.html" || key.startsWith(".")
      ? undefined
      : `${this.greeting}, ${key}.`;
  }
}
