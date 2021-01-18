let heroes = undefined;

export async function fetchHeroes() {
    if (heroes === undefined) {
        let res = await fetch("https://api.opendota.com/api/heroStats");
        let data = await res.json();

        heroes = {};

        for (const hero of data) {
            heroes[hero.id] = hero;
        }
    } else {
        console.log("did not fetch heroes");
    }

    return heroes;
}
