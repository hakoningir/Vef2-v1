import { dirExists, readcsv, getFile } from "./readData.js";
import { mkdir } from 'fs/promises';
import { join } from "path";
import { writeFile } from "fs";
import { depTemplate, indexTemplate, csvtohtml } from "./make.js";


const OUTPUT_DIR = './dist';
const DATA_DIR = './data';



async function main (){
    if(!(await dirExists(OUTPUT_DIR))){
        await mkdir(OUTPUT_DIR);
    }
    
    const files = await getFile(join(DATA_DIR, "index.json"),{encoding:"utf8"});
    const parsedFiles = await JSON.parse(files);

    for(const item of parsedFiles){
        const file = await getFile(join(DATA_DIR, item.csv),  {encoding:"latin1"});
        let data = null;
        if(file){
            data = readcsv(file);  
        }
        const templ = depTemplate(data, item.description, item.title);
        await writeFile(join(OUTPUT_DIR, csvtohtml(item.csv)), templ, {flag : 'w+'}, (e) => console.error(e));  
    }

    const filepath = join(OUTPUT_DIR, 'index.html');
    const template = indexTemplate(parsedFiles);
    await writeFile(filepath, template, {flag : 'w+'}, (e) => console.error(e));

}

main().catch((e) => console.error(e));