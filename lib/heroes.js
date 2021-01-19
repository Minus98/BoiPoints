//let heroes = undefined;

export async function fetchHeroes() {
    let res = await fetch("https://api.opendota.com/api/heroStats");
    let data = await res.json();

    const heroes = {};

    var i;
    for (i = 0; i < data.length; i++) {
        heroes[data[i].id] = data[i];
    }

    return heroes;
}
