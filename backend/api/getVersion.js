import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Gets version number from .sym file
export const getVersion = () => {
  return fs.readdirSync(path.join(__dirname, "..", "public"))[1].slice(16, -4);
};
