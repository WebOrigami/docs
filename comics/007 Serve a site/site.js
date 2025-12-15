// Standard JS
export default {
  about: {
    "index.html": "<h2>About us</h2>", // Plain text, file buffer, etc.
  },
  // You can also use functions to generate content dynamically
  "index.html": () => `<h2>Our site</h2>`,
};
