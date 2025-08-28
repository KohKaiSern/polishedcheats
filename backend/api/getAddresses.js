import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Desired Cheat Code Symbols
// These are the symbols we want to extract from the .sym file
const SYMBOLS = [
  "wTempEnemyMonSpecies",
  "wWildMonForm",
  "wItems",
  "wMedicine",
  "wBalls",
  "wBerries",
  "wTMsHMs",
  "wMoney",
  "wPartyMon1HPEV",
  "wPartyMon1AtkEV",
  "wPartyMon1DefEV",
  "wPartyMon1SpeEV",
  "wPartyMon1SatEV",
  "wPartyMon1SdfEV",
  "wPartyMon1HPAtkDV",
  "wPartyMon1DefSpeDV",
  "wPartyMon1SatSdfDV",
  "wPartyMon1Ability",
  "wPartyMon1Happiness",
  "wPartyMon1Gender",
  "wPartyMon1Moves",
  "wEnemyMonCatchRate",
  "wCoins",
  "wPartyMon1Status",
];

//Read addresses from .sym file
export const getAddresses = () => {
  //Obtain the raw file data
  const data = fs.readFileSync(
    path.join(__dirname, "..", "public", "polishedcrystal-3.1.1.sym"),
    "utf8"
  );

  //Get all addresses
  let addresses = {};
  data
    .trim()
    .split(`\n`)
    .forEach((line) => {
      //Find the relevant symbols
      if (SYMBOLS.includes(line.trim().slice(8))) {
        //Add in little endian format: HHLL -> LLHH
        addresses[line.trim().slice(8)] =
          line.trim().slice(5, 7) + line.trim().slice(3, 5);
      }
    });
  return addresses;
};
