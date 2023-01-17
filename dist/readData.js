import { readdir, readFile as fsReadFile, stat } from 'fs/promises';
import { join } from 'path';
/**
 * 
 * @param {string} dir 
 * @returns `true` ef ...
 */
export async function dirExists(dir){
    try{
        const info = await stat(dir);
        return info.isDirectory();
    } catch(e) {
        return false;
    }
}

/**
 * vantar 
 * @param {string} dir 
 * @returns {string[]}
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
    const revolved = await Promise.all(mapped);

    return resolved.filter(Boolean);
}

/**
 * vantar lýsingu
 * @param {string} file 
 * @param {object} param1 
 * @returns {Promise<string | null>}
 */
export async function readFile(file, {encoding = 'ISO-8859-1'} = {}){
    try {
        const content = await fsReadFile(file);
        return content.toString(encoding);
    } catch (e) {
        return null;
    }
}