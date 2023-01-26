import { dirExists, readcsv, readFilesFromDir } from "./readData.js";
import { stats } from "./make.js";
import { mkdir } from 'fs/promises';
import { writeFile } from "fs";

const DATA_DIR = './data';
const OUTPUT_DIR = './dist';

async function main (){
    if(!(await dirExists(OUTPUT_DIR))){
        await mkdir(OUTPUT_DIR);
    }

    const datafiles = await readFilesFromDir(DATA_DIR);
    const results = [];

    for(const file of datafiles){
        const content = await readFile(file);
        
        if (content) {
            const filename = `${csv.split(".")[0]}.html`;
            readcsv(filename);
            const result = {
                nr,
                nafn,
                einingar,
                misseri,
                namsstig,
                link,
            };
            result.push(result);
//        await writeFile(filepath, template, {flag: 'w+'});
        }
    }
    stats(results)

//    const filepath = join(OUTPUT_DIR, 'index.html');
//    const template = indexTemplate(results);

//    await writeFile(filepath, template, {flag: 'w+'});

}

main()