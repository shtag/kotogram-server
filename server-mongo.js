import { MongoClient, ServerApiVersion } from 'mongodb';

import fs from 'fs';
import { dataEnd, dataStart } from './const.js';
import data from './data.js';

const fileName = 'data.js';
const content = 'This is the content of my file.';

function saveData(data) {
    const text = `${dataStart}${data}${dataEnd}`;
    fs.writeFileSync(fileName, text);
    // await fs.writeFile(fileName, text, (err) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(`File ${fileName} has been written successfully.`);
    // });
}

export default saveData;
