export async function fetchProfiles() {
    const profileIds = ["71769375", "105304164", "74207028", "59733641"];

    let profiles = [];
    console.log("hej");

    for (const id of profileIds) {
        let res = await fetch("https://api.opendota.com/api/players/" + id);
        let data = await res.json();
        profiles.push(data);
    }

    console.log(profiles);

    return profiles;
}
