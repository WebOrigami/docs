const obj = {
  "Alice.md": "Hello, **Alice**.",
  "Bob.md": "Hello, **Bob**.",
  "Carol.md": "Hello, **Carol**.",
};

export default {
  async *[Symbol.asyncIterator]() {
    yield* Object.keys(obj);
  },

  async get(key) {
    return obj[key];
  },
};
