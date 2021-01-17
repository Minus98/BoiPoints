export async function fetchProfiles() {
    const profileIds = [
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

    let profiles = [];

    for (const id of profileIds) {
        let playerRes = await fetch(
            "https://api.opendota.com/api/players/" + id
        );
        let data = await playerRes.json();

        let recentMatches = await fetch(
            "https://api.opendota.com/api/players/" + id + "/recentMatches"
        );

        data.recentMatches = await recentMatches.json();

        profiles.push(data);
    }

    return profiles;
}
