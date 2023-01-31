import { readdir, readFile as fsReadFile} from 'fs/promises';
import { join } from 'path';
/**
 * 
 * @param { string } dir 
 * @returns `true` ef ...
 */
export async function dirExists(dir){
    try {
        const info = await stat(dir);
        return info.isDirectory();
    } catch(e) {
        return false;
    }
}

/**
 * vantar 
 * @param { string } dir 
 * @returns { string[] }
 */
export async function readFilesFromDir(dir){
    let files = [];
    try {
        files = await readdir(dir);
    } catch(e){
        return [];
    }

    const mapped = files.map(async (file) => {
        const path = join(dir, file);
        const info = await stat(path);

        if (info.isDirectory()) {
            return null;
        }
        return path;
    });
    const resolved = await Promise.all(mapped);

    return resolved.filter(Boolean);
}

/**
 * vantar lýsingu
 * @param { string } file 
 * @param { object } param1 
 * @returns { Promise<string | null> }
 */
export async function readFile(file, {encoding = 'utf-8'} = {}){
    try {
        const content = await fsReadFile(file);
        return content.toString(encoding);
    } catch (e) {
        return null;
    }
}

export async function readcsv(file){
    const data = await readFile(file, {encoding : 'binary'})
    let output = data.split("\n").map((row) => row.split(";"));
    const header = output.shift();

    output = output.map((col) => {
        return {
            nr : col[0],
            nafn : col[1],
            einingar : col[2],
            misseri: col[3],
            namsstig : col[4],
            link : col[5],
        };
    
        
    });
    return output;
}
// array af csv skrám með objectum, leita af þeim
let temp = await fsReadFile("../data/index.json");
const data = await JSON.parse(temp);
console.log(data)
