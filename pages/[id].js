import Layout from "../components/layout";
import { profileIds, fetchProfile, isWin } from "../lib/profiles";
import cn from "classnames";
import utilStyles from "../styles/utils.module.css";
import { fetchHeroes } from "../lib/heroes";
import HeroFilter from "../components/HeroFilter";
import { useState, createContext } from "react";
import { filter } from "underscore";

export async function getStaticProps({ params }) {
    const boi = await fetchProfile(params.id);
    const heroData = await fetchHeroes();

    return {
        revalidate: 900,
        props: {
            boi,
            heroData,
        },
    };
}

export async function getStaticPaths() {
    let paths = profileIds.map((id) => {
        return { params: { id: id } };
    });

    return {
        paths: paths,
        fallback: false,
    };
}

let input = "";

export default function Profile({ boi, heroData }) {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <img
                                className="card-img-top"
                                src={boi.profile.avatarfull}
                            ></img>
                            <div
                                className="card-body"
                                style={{ textAlign: "center" }}
                            >
                                <h3 style={{ fontWeight: "bold" }}>
                                    {boi.profile.personaname}
                                </h3>
                                <h3
                                    className={cn({
                                        [utilStyles.colorGreen]:
                                            boi.boiPointSum > 0,
                                        [utilStyles.colorRed]:
                                            boi.boiPointSum < 0,
                                    })}
                                >
                                    {boi.boiPointSum}
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <ul className="list-group recentMatchesList">
                            {boi.recentMatches.map(
                                ({
                                    match_id,
                                    hero_id,
                                    kills,
                                    deaths,
                                    assists,
                                    boiPoints,
                                    radiant_win,
                                    player_slot,
                                }) => (
                                    <li
                                        className="list-group-item"
                                        key={match_id}
                                    >
                                        <div className="row">
                                            <div className="col-4">
                                                <img
                                                    style={{
                                                        maxWidth: "120px",
                                                        margin: "0px",
                                                    }}
                                                    src={
                                                        "http://cdn.dota2.com" +
                                                        heroData[hero_id].img
                                                    }
                                                ></img>
                                            </div>
                                            <div className="col-2 centerItems">
                                                <h5>
                                                    {kills}/{deaths}/{assists}
                                                </h5>
                                            </div>
                                            <div className="col-4 centerItems">
                                                {isWin(
                                                    radiant_win,
                                                    player_slot
                                                ) ? (
                                                    <h5
                                                        className={
                                                            utilStyles.colorGreen
                                                        }
                                                    >
                                                        Win
                                                    </h5>
                                                ) : (
                                                    <h5
                                                        className={
                                                            utilStyles.colorRed
                                                        }
                                                    >
                                                        Loss
                                                    </h5>
                                                )}
                                            </div>
                                            <div className="col-2 centerItems">
                                                <h4
                                                    className={cn({
                                                        [utilStyles.colorGreen]:
                                                            boiPoints > 0,
                                                        [utilStyles.colorRed]:
                                                            boiPoints < 0,
                                                    })}
                                                >
                                                    {boiPoints > 0 ? (
                                                        <>+</>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {boiPoints}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-4">
                        <h1 className={utilStyles.colorWhite}>Best Boi:</h1>
                    </div>
                    <div className="col-4">
                        <h1 className={utilStyles.colorWhite}>Worst Boi:</h1>
                    </div>
                    <div className="col-4">
                        <h1 className={utilStyles.colorWhite}>All Bois:</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <div className="card profilePageCards">
                            <img
                                className="card-img-top"
                                src={
                                    "http://cdn.dota2.com" +
                                    heroData[boi.highestPointHero.hero_id].img
                                }
                            ></img>
                            <div
                                className="card-body"
                                style={{ textAlign: "center" }}
                            >
                                <h3 style={{ fontWeight: "bold" }}>
                                    {
                                        heroData[boi.highestPointHero.hero_id]
                                            .localized_name
                                    }
                                </h3>
                                <h3 className={utilStyles.colorGreen}>
                                    {
                                        boi.boiPointMap[
                                            boi.highestPointHero.hero_id
                                        ]
                                    }
                                </h3>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>
                                            Games: {boi.highestPointHero.games}
                                        </h4>
                                    </div>
                                    <div className="col-6">
                                        <h4>
                                            Wins: {boi.highestPointHero.win}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card profilePageCards">
                            <img
                                className="card-img-top"
                                src={
                                    "http://cdn.dota2.com" +
                                    heroData[boi.lowestPointHero.hero_id].img
                                }
                            ></img>
                            <div
                                className="card-body"
                                style={{ textAlign: "center" }}
                            >
                                <h3 style={{ fontWeight: "bold" }}>
                                    {
                                        heroData[boi.lowestPointHero.hero_id]
                                            .localized_name
                                    }
                                </h3>
                                <h3 className={utilStyles.colorRed}>
                                    {
                                        boi.boiPointMap[
                                            boi.lowestPointHero.hero_id
                                        ]
                                    }
                                </h3>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>
                                            Games: {boi.lowestPointHero.games}
                                        </h4>
                                    </div>
                                    <div className="col-6">
                                        <h4>Wins: {boi.lowestPointHero.win}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <HeroFilter
                            boiPointMap={boi.boiPointMap}
                            heroData={heroData}
                        ></HeroFilter>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
