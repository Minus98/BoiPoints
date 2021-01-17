export async function fetchHeroes() {
    let res = await fetch("https://api.opendota.com/api/heroStats");
    let data = await res.json();

    const heroes = {};

    for (const hero of data) {
        heroes[hero.id] = hero;
    }

    return heroes;
}
