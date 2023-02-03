


export function csvtohtml(link){
    return link?.replace("csv", "html")??"";
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

function headerTemplate(content){
    return `<tr>
                <th>${content.nr}</th>
                <th>${content.nafn}</th>
                <th>${content.einingar}</th>
                <th>${content.misseri}</th>
                <th>${content.namsstig}</th>
            </tr>`;
}

function tableTemplate(content){
    if(content && content.length != 0){
        return `<table> 
        ${headerTemplate(content[0])}
        ${content.slice(1).map(course => rowTemplate(course)).join("\n\t\t\t")}
        </table>`
    }
    return ""
}

function rowTemplate(content) {
    let name = content.nafn;
    if(content.link){
        name = `<a href="${content.link}">${content.nafn}</a>`
    }
    return `<tr>
                <td>${content.nr}</td>
                <td>${name}</td>
                <td>${content.einingar}</td>
                <td>${content.misseri}</td>
                <td>${content.namsstig}</td>
            </tr>`;
}

export function index(results) { 
    const obj = results.map(dep => `
    <li>
        <h2>${dep.title}</h2>
        <p> ${dep.description}</p>
        <a href = "${csvtohtml(dep.csv)}"> Velja </a> 
    </li>
    `).join("\n");

    return `
    <section>
    <h1>Kennsluskrá</h1>
    <ul>${obj}</ul>
    </section>`;
}

function courseTemplate(courses, description ,title){
    return `<section>
        <h1>${title}</h1>
        <p>${description}</p>
        ${tableTemplate(courses)}
        </section>
        `
}

export function indexTemplate(results){
    return template('Kennsluskrá', index(results));
}

export function depTemplate(courses, description ,title) {
    return template(title, courseTemplate(courses, description, title));
}