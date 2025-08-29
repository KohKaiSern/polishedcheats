import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specialMonNames = {
  Farfetch_d: "Farfetch'd",
  Sirfetch_d: "Sirfetch'd",
  Mr__mime: "Mr. Mime",
  Mr__rime: "Mr. Rime",
  Mime_jr_: "Mime Jr.",
  Nidoran_f: "Nidoran F",
  Nidoran_m: "Nidoran M",
  Ho_oh: "Ho-Oh",
  Porygon_z: "Porygon-Z",
};

export const getNames = () => {
  //Obtain the name data
  const nameData = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "public",
      "polishedcrystal",
      "constants",
      "pokemon_constants.asm"
    ),
    "utf8"
  );

  //Get all names
  let names = [];
  nameData.split(`\n`).forEach((line) => {
    if (line.trim().startsWith("const ")) {
      line = line.trim().slice(6, -5).trim();
      //Capitalization
      line = line[0] + line.slice(1).toLowerCase();
      //Special Cases: Farfetch'd, Sirfetch'd, Mr. Mime, Mr. Rime, Mime Jr., Nidoran F, Nidoran M, Ho-Oh, Porygon-Z
      if (specialMonNames.hasOwnProperty(line)) {
        line = specialMonNames[line];
      }
      names.push(line);
    }
  });

  //Obtain the growth rate data
  //By reading through the entire base_stats directory
  let growthRates = [];
  let filenames = fs.readdirSync(
    path.join(
      __dirname,
      "..",
      "public",
      "polishedcrystal",
      "data",
      "pokemon",
      "base_stats"
    )
  );
  filenames.forEach((filename) => {
    //Discard Regional Forms (growth rate unchanged between forms)
    if (
      ["alolan", "galarian", "hisuian", "paldean", "bloodmoon", "armored"].some(
        (form) => filename.includes(form)
      )
    ) {
      return;
    }
    let content = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "polishedcrystal",
        "data",
        "pokemon",
        "base_stats",
        filename
      ),
      "utf-8"
    );

    //Find the Growth Rate
    let growthRate = "";
    for (
      let i = content.indexOf("GROWTH_") + 7;
      i < content.indexOf("GROWTH_") + 20;
      i++
    ) {
      if (content[i] === " ") {
        break;
      } else {
        growthRate += content[i];
      }
    }

    //Return an object of structure { monName : growthRate }
    //Format monName in the same way as names
    let name = filename.slice(0, -4);
    if (name.includes("_plain")) {
      name = name.slice(0, -6);
    }
    name = name[0].toUpperCase() + name.slice(1);
    if (specialMonNames.hasOwnProperty(name)) {
      name = specialMonNames[name];
    }
    growthRates.push({ [name]: growthRate });
  });

  //Sort the names
  let data = [];
  names.forEach((name) => {
    growthRates.forEach((growthRate) => {
      if (growthRate.hasOwnProperty(name)) {
        data.push(growthRate);
        return;
      }
    });
  });
  return data;
};
