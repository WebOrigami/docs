export default {
  unpack: (packed) => {
    const text = new TextDecoder().decode(packed);
    return JSON.parse(text); // Treat as JSON for this example
  },
};
