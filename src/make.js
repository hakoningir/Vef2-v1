export function stats(result){
    const entries = Object.entries(result.stats);

    const resulthtml = entries.map(
        ([key,value]) => `<dt>${statsKey(key)}</dt><dd>${formatNum(value)}</dd>`
    ).join('\n');

    return `<article>
    <h2> Námsbrautir ${result.title}</h2>
    <section>
        <h3>
    </section>
    `
}