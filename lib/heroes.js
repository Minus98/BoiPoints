let lastFetched = undefined;
const refreshRate = 86400; //1 day in seconds
let heroes = {};

export async function fetchHeroes() {
    let currentTime = new Date();

    var newFetch = false;

    if (lastFetched === undefined) {
        lastFetched = currentTime;
        newFetch = true;
    } else {
        let timeDiff = currentTime - lastFetched;
        timeDiff /= 1000;

        if (timeDiff > refreshRate) {
            lastFetched = currentTime;
            newFetch = true;
        }
    }

    if (newFetch) {
        let res = await fetch("https://api.opendota.com/api/heroStats");
        let data = await res.json();

        heroes = {};

        var i;

        for (i = 0; i < data.length; i++) {
            heroes[data[i].hero_id] = data[i];
        }
    }

    return heroes;
}
