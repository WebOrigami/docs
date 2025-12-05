import greet from "./greet.js";
import teamData from "./teamData.json" with { type: "json" };

export default {
  "greeting.html": greet(teamData[0].name),
};
