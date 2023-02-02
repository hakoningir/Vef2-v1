import { dirExists, readcsv, readFilesFromDir, readFile } from "./readData.js";
import { mkdir } from 'fs/promises';
import { join } from "path";
import { readFile as fsReadFile , writeFile } from "fs";


const OUTPUT_DIR = '../dist';
const DATA_DIR = '../data';

async function parseCsv(file){
    const rows = file.split("\n");
    rows.forEach(row => {
        row.split(";");
    });
}

async function main (){
    if(!(await dirExists(OUTPUT_DIR))){
        await mkdir(OUTPUT_DIR);
    }
    
    const results = [];
    const datafiles = await readFilesFromDir(DATA_DIR);
    const files = await readFile(join(DATA_DIR, "index.json"));

    const parsedFiles = await JSON.parse(files);
    for(const item of parsedFiles){
        const file = await readFile(join(DATA_DIR, item.csv),  "binary");
        const data = parseCsv(file)
        console.log(data);
    }   

    for(const file of datafiles) {
        const content = await readcsv(file);
        if (content) {
            results.push(content);
        }
        // const filepath = join(OUTPUT_DIR, 'index.html');
        // const template = indexTemplate(title, results);
        // await writeFile(filepath, template, {flag : 'w+'});
    }

    // const filepath = join(OUTPUT_DIR, 'index.html');
    // const template = indexTemplate(results);
    // await writeFile(filepath, template, {flag : 'w+'});
}


main().catch((e) => console.error(e));