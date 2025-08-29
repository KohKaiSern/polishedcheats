import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getGrowthRateCoefficients = () => {
  //Obtain the raw file data
  let data = fs
    .readFileSync(
      path.join(
        __dirname,
        "..",
        "public",
        "polishedcrystal",
        "data",
        "growth_rates.asm"
      ),
      "utf8"
    )
    .trim()

  //Get all growth rate coefficients
  let growthRateCoefficients = {}
  data = data.slice(data.indexOf("GrowthRates")).split(`\n`)
  data.forEach((line) => {
    if (line.includes('\tgrowth_rate')) {
        let growthRate = line.slice(line.indexOf(";") + 2)
        //Format name to match the base_stats files
        growthRate = growthRate.replace(" ", "_").toUpperCase()

        //Get coefficients
        let coefficients = line.slice(12, line.indexOf(";")).trim().split(",")
        coefficients = coefficients.map((coefficient) => {
            return parseInt(coefficient.trim())
        })
        growthRateCoefficients[growthRate] = coefficients
    }
  })
  return growthRateCoefficients;
};
