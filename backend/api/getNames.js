import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specialMonNames = {
    "Farfetch_d" : "Farfetch'd",
    "Sirfetch_d" : "Sirfetch'd",
    "Mr__mime" : "Mr. Mime",
    "Mr__rime" : "Mr. Rime",
    "Mime_jr_" : "Mime Jr.",
    "Nidoran_f" : "Nidoran F",
    "Nidoran_m" : "Nidoran M",
    "Ho_oh" : "Ho-Oh",
    "Porygon_z" : "Porygon-Z"
};

export const getNames = () => {

    //Obtain the raw file data
    const data = fs.readFileSync(path.join(__dirname, '..', 'public', 'polishedcrystal', 'constants', 'pokemon_constants.asm'), 'utf8')

    //Get all names
    let names = [];
    data.split(`\n`).forEach((line) => { 
        if (line.trim().startsWith('const ')) {
            line = line.trim().slice(6, -5).trim();
            //Capitalization
            line = line[0] + line.slice(1).toLowerCase();
            //Special Cases: Farfetch'd, Sirfetch'd, Mr. Mime, Mr. Rime, Mime Jr., Nidoran F, Nidoran M, Ho-Oh, Porygon-Z
            if (specialMonNames.hasOwnProperty(line)) {
                line = specialMonNames[line];
            };
            names.push(line);
        }
    })
    return names;
}