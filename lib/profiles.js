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
    "130921316",
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

        let boiPoints = await generateBoiPoints(id);

        data.boiPointMap = boiPoints.boiPointMap;

        data.lowestPointHero = boiPoints.lowestPointHero;

        data.highestPointHero = boiPoints.highestPointHero;

        data.boiPointSum = getBoiPointSum(data.recentMatches, data.boiPointMap);

        profileMap[id] = data;
        profileLastFetchedMap[id] = currentTime;

        profile = data;
    }

    return profile;
}

async function generateBoiPoints(id) {
    let res = await fetch(
        "https://api.opendota.com/api/players/" + id + "/heroes"
    );

    let heroes = await res.json();

    let boiPointMap = {};

    var i;

    var highestPoint = undefined;
    var highestPointHero = undefined;
    var lowestPointHero = undefined;
    var lowestPoint = undefined;

    for (i = 0; i < heroes.length; i++) {
        let points = calculateHeroPoints(heroes[i]);

        if (!highestPoint || points > highestPoint) {
            highestPoint = points;
            highestPointHero = heroes[i];
        }

        if (!lowestPoint || points < lowestPoint) {
            lowestPoint = points;
            lowestPointHero = heroes[i];
        }

        boiPointMap[heroes[i].hero_id] = points;
    }
    return {
        boiPointMap: boiPointMap,
        highestPointHero: highestPointHero,
        lowestPointHero: lowestPointHero,
    };
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
        var outComeBonus;

        if (isWin(matches[i].radiant_win, matches[i].player_slot)) {
            outComeBonus = 3;
        } else {
            outComeBonus = -3;
        }

        let matchPoints =
            Math.round((heropoints[matches[i].hero_id] + outComeBonus) * 10) /
            10;
        matches[i].boiPoints = matchPoints;
        boiPoints += matchPoints;
    }

    var rounded = Math.round(boiPoints * 10) / 10;

    return rounded;
}

export function isWin(radiant_win, player_slot) {
    var isRadiant = player_slot < 128;
    if ((radiant_win && isRadiant) || (!radiant_win && !isRadiant)) {
        return true;
    }
    return false;
}
