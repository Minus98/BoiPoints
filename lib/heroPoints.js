const readXlsxFile = require("read-excel-file/node");

export async function fetchHeroPoints() {
    const rows = await readXlsxFile("public/Heropoints.xlsx");

    const heroPoints = {};

    for (const row of rows) {
        heroPoints[row[0]] = row[2];
    }

    return heroPoints;
}
