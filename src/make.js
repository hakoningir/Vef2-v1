import { readFilesFromDir } from './readData.js';


function fileLink(dir){
    for (const i in dir){
        // const link = 
    }
}


function template(title, content){
    return `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="stylesheet" href="../public/styles.css">
    </head>
    <body>${content}</body>
</html>
`;
}

function rowTemplate(content) {
    return `<tr>
                <td>${content[0]}</td>
                <td>${content[1]}</td>
                <td>${content[2]}</td>
                <td>${content[3]}</td>
                <td>${content[4]}</td>
                <td>${content[5]}</td>
            </tr>`;
}

function firstTemplate(path) {
    const csvLink = path; 
    return `<ul>${csvLink}</ul>`
}

export function index(results) { 
    const content = readFilesFromDir("../data")
    const obj = results.map(results => `
    <li>
        <a href="${rowTemplate(content)}"></a> 
    </li>
    `).join("\n");

    return `
    <section>
    <h1>Who knows</h1>
    <ul>${obj}</ul>
    </section>`;
}

export function indexTemplate(results){
    return template('Kennsluskrá', index(results));
}

export function statsTemplate(result) {
    const title = result[0];
    const items = [];
    const item = '';
    for(item in result){
        items = result[item];
    }
    return template(title, result[item]);
}

const stat = statsTemplate(readFilesFromDir("../data"))
console.log(stat);