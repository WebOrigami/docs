import fs from "node:fs";
import path from "node:path";

export default {
  "index.html": `
    <button>
      ${fs.readFileSync(path.join(__dirname, "./icons/home.svg"))}
    </button>
  `,
};
