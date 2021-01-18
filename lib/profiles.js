import { fetchHeroPoints } from "./heroPoints";

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

const profileIdMap = {};
const boiPointMap = {};
let profiles = undefined;

export async function fetchProfiles() {
    if (profiles === undefined) {
        profiles = [];
        for (const id of profileIds) {
            let playerRes = await fetch(
                "https://api.opendota.com/api/players/" + id
            );
            let data = await playerRes.json();

            let recentMatches = await fetch(
                "https://api.opendota.com/api/players/" + id + "/recentMatches"
            );

            data.recentMatches = await recentMatches.json();

            profileIdMap[id] = data;

            profiles.push(data);
        }
    } else {
        console.log("did not fetch profiles");
    }

    return profiles;
}

export async function fetchProfile(id) {
    let playerData = profileIdMap[id];

    if (playerData === undefined) {
        let playerRes = await fetch(
            "https://api.opendota.com/api/players/" + id
        );

        let data = await playerRes.json();

        let recentMatches = await fetch(
            "https://api.opendota.com/api/players/" + id + "/recentMatches"
        );

        data.recentMatches = await recentMatches.json();

        playerData = data;
    }

    return playerData;
}

export async function fetchBoiPoints(id) {
    let boiPoints = boiPointMap[id];

    if (boiPoints === undefined) {
        let playerData = await fetchProfile(id);
        let heroPoints = await fetchHeroPoints();

        boiPoints = getBoiPointSum(playerData.recentMatches, heroPoints);
        boiPointMap[id] = boiPoints;
    }

    return boiPoints;
}

function getBoiPointSum(matches, heropoints) {
    let boiPoints = 0;

    var i;
    for (i = 0; i < matches.length; i++) {
        boiPoints += heropoints[matches[i].hero_id];
    }

    return boiPoints;
}
