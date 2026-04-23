import { runMain } from "citty";
import { main } from "./cli.js";

const normalizedArgv = [...process.argv];

if (normalizedArgv[2] === "init") {
  normalizedArgv.splice(2, 1);
}

process.argv = normalizedArgv;

runMain(main);
