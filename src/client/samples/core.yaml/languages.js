import { DefaultPages } from "@graphorigami/origami";
import Greetings from "./Greetings.js";

export default new DefaultPages({
  english: new Greetings("Hello"),
  french: new Greetings("Bonjour"),
  spanish: new Greetings("Hola"),
});
