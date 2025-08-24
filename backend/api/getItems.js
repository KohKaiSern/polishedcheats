import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getItems = () => {

    //Obtain the raw file data
    const data = fs.readFileSync(path.join(__dirname, '..', 'public', 'attributes.asm'), 'utf8').trim().split('\n');

    //Get all items and item types
    let items = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].trim().startsWith(';') && data[i + 1].trim().startsWith('item_attribute')) {
            let item = data[i].trim().slice(2) 
            let itemType = data[i + 1].split(',')[3].trim()[0] + data[i + 1].split(',')[3].trim().slice(1).toLowerCase()

            //Capitalize the item name properly, skip the first character since that has to be capitalized
            for (let j = 1; j < item.length; j++) {
                //If the character is a space, the character right after should be capitalized
                if (item[j] === ' ') {
                    j++;
                    continue
                }
                item = item.slice(0, j) + item[j].toLowerCase() + item.slice(j + 1);
            }
            //Insertion
            items.push({ item : itemType });

            //Skips an extra line, since each data point is two lines long
            i++;
        }
        
    }
    return items;
}