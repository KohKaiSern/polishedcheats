import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getNames = () => {

    //Obtain the raw file data
    const data = fs.readFileSync(path.join(__dirname, '..', 'public', 'pokemon_constants.asm'), 'utf8')

    //Get all names
    let names = [];
    data.split(`\n`).forEach((line) => { 
        if (line.trim().startsWith('const ')) {
            line = line.trim().slice(6, -5).trim();
            //Capitalization
            names.push(line[0] + line.slice(1).toLowerCase());
        }
    })
    return names;
}