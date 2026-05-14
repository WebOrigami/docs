// JavaScript needs a file import with an explicit relative path
import packageJson from "../../package.json" with { type: "json" };

export default {
  "index.html": `Hello from ${packageJson.name}!`,
};
