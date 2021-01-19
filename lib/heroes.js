export async function fetchHeroes() {
    let res = await fetch("https://api.opendota.com/api/heroStats");
    let data = await res.json();

    let heroes = {};

    var i;

    for (i = 0; i < data.length; i++) {
        heroes[data[i].hero_id] = data[i];
    }

    return heroes;
}
