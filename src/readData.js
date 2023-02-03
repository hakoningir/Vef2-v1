import { readdir, readFile as fsReadFile} from 'fs/promises';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';
import { URL } from 'url';

/**
 * Athugar hvort mappa sé til
 * @param { string } dir slóð
 * @returns `true` ef slóð á möppu er til
 */
export async function dirExists(dir){
    try {
        const info = existsSync(dir);
        return info;
    } catch(e) {
        return false;
    }
}

/**
 * Les csv skrár inn í möppu.
 * @param { string } dir Fær slóð á möppu sem inniheldur csv skrár
 * @returns { string[] } Skilar upplýsingum úr csv skrám
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
        const info = existsSync(path);
        var type = file.split(".");
        if (type[1] != "csv") {
            return null;
        }
        if (!info) {
            return null;
        }
        const content = getFile(path)
        return content;
    });
    const resolved = await Promise.all(mapped);

    return resolved.filter(Boolean);
}

/**
 * Les innihald csv skrár
 * @param { string } path slóð á skrá
 * @param { object } encoding breytir stöfum sem að csv skrá skilur ekki 
 * @returns { Promise<string | null> } Skilar innihaldi skráar eða null ef ekkert
 */
export async function getFile(path, {encoding = 'binary'} = {}){
    try {
        const content = await fsReadFile(path, {encoding:encoding});
        return content.toString(encoding);
    } catch (e) {
        return null;
    }
}


/**
 * Les innihald csv skrár og skiptir því upp
 * @param { String } data skrá
 * @returns Skilar möppuðum upplýsingum í nokra dálka.
 */
export function readcsv(data){
    let output = data.split(/\r?\n/).map(all => all.replace(/".*;.*"/, x => 
    x.replace(";", ":")).split(";"));

    output = output.map((col) => {
        if(col[1]){
            return {
                nr : col[0],
                nafn : col[1],
                einingar : validateEiningar(col[2]),
                misseri: validateMisseri(col[3]),
                namsstig : validateNamsstig(col[4]),
                link : validateLink(col[5])
            };
        }
        return null;
    });
    return output.filter(x => !!x);
}

function validateNamsstig(namsstig){
    return namsstig ?? ""
}

function validateEiningar(einingar){
    return einingar?.includes(".") ? "" : einingar;
}

function validateLink(link){
    try {
        const url = new URL(link);
        return link;
    } catch{
        return ""
    }
}

function validateMisseri(misseri){
    switch (misseri) {
        case "Vor":
        case "Haust":
        case "Sumar":
            return misseri
        default:
            return ""
    }
}
