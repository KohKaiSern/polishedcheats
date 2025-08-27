import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getMoves = () => {
  //Obtain the raw file data
  let data = fs
    .readFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "polishedcrystal",
        "data",
        "moves",
        "names.asm"
      ),
      "utf8"
    )
    .trim()
    .split(`\n`);

  //Get all moves
  let moves = [];
  for (let i = 0; i < data.length; i++) {
    //Check if the line is a faithful check
    if (data[i].startsWith("if")) {
      //If so, skip the faithful move name
      i++;
      continue;
    }
    if (data[i].trim().startsWith("li ")) {
      moves.push(data[i].trim().slice(4, -1));
    }
  }
  return moves;
};
