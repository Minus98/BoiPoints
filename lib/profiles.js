export const profileIds = [
    "71769375",
    "105304164",
    "74207028",
    "59733641",
    "71771839",
    "89993486",
    "195048322",
    "84289463",
    "87264889",
];

export async function fetchProfiles() {
    const profiles = [];

    for (const id of profileIds) {
        let profile = await fetchProfile(id);

        profiles.push(profile);
    }

    return profiles;
}

let profileMap = {};
let profileLastFetchedMap = {};
const refreshRate = 3600;

export async function fetchProfile(id) {
    let profile = profileMap[id];
    let lastFetched = profileLastFetchedMap[id];
    let currentTime = new Date();

    let newFetch = false;

    if (!profile || !lastFetched) {
        newFetch = true;
    } else {
        let timeDiff = currentTime - lastFetched;
        timeDiff /= 1000;
        if (timeDiff > refreshRate) {
            newFetch = true;
        }
    }

    if (newFetch) {
        let playerRes = await fetch(
            "https://api.opendota.com/api/players/" + id
        );

        let data = await playerRes.json();

        let recentMatches = await fetch(
            "https://api.opendota.com/api/players/" + id + "/recentMatches"
        );

        data.recentMatches = await recentMatches.json();

        data.boiPointMap = await generateBoiPointMap(id);

        data.boiPointSum = getBoiPointSum(data.recentMatches, data.boiPointMap);

        profileMap[id] = data;
        profileLastFetchedMap[id] = currentTime;

        profile = data;
    }

    return profile;
}

async function generateBoiPointMap(id) {
    let res = await fetch(
        "https://api.opendota.com/api/players/" + id + "/heroes"
    );

    let heroes = await res.json();

    let boiPointMap = {};

    var i;

    for (i = 0; i < heroes.length; i++) {
        boiPointMap[heroes[i].hero_id] = calculateHeroPoints(heroes[i]);
    }

    return boiPointMap;
}

function calculateHeroPoints(hero) {
    if (hero.games < 10) {
        return 0;
    }

    const winrate = hero.win / hero.games;

    let points = (winrate - 0.5) * 100;
    var rounded = Math.round(points * 10) / 10;

    return rounded;
}

function getBoiPointSum(matches, heropoints) {
    let boiPoints = 0;

    var i;
    for (i = 0; i < matches.length; i++) {
        boiPoints += heropoints[matches[i].hero_id];
    }

    var rounded = Math.round(boiPoints * 10) / 10;

    return rounded;
}
