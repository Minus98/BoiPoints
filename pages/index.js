import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import cn from "classnames";

import { fetchProfiles } from "../lib/profiles";
import { fetchHeroes } from "../lib/heroes";
import { fetchHeroPoints } from "../lib/heroPoints";

export async function getStaticProps() {
    const boisData = await fetchProfiles();
    const heroData = await fetchHeroes();
    const heroPoints = await fetchHeroPoints();
    return {
        props: {
            boisData,
            heroData,
            heroPoints,
        },
    };
}

function getBoiPointSum(matches, heropoints) {
    let boiPoints = 0;

    var i;
    for (i = 0; i < matches.length; i++) {
        boiPoints += heropoints[matches[i].hero_id];
    }

    return boiPoints;
}

export default function Home({ boisData, heroData, heroPoints }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <div className="container">
                    <div className="row">
                        {boisData.map(({ profile, recentMatches }) => (
                            <div
                                className="col-3"
                                style={{ marginBottom: "20px" }}
                                key={profile.account_id}
                            >
                                <div className="card">
                                    <img
                                        className="card-img-top"
                                        src={profile.avatarfull}
                                    ></img>
                                    <div
                                        className="card-body"
                                        style={{ textAlign: "center" }}
                                    >
                                        <a
                                            className="card-title boi-title"
                                            href={
                                                "https://www.dotabuff.com/players/" +
                                                profile.account_id
                                            }
                                        >
                                            {" "}
                                            {profile.personaname}
                                        </a>
                                        <h3
                                            className={cn({
                                                [utilStyles.colorGreen]:
                                                    getBoiPointSum(
                                                        recentMatches,
                                                        heroPoints
                                                    ) > 0,
                                                [utilStyles.colorRed]:
                                                    getBoiPointSum(
                                                        recentMatches,
                                                        heroPoints
                                                    ) < 0,
                                            })}
                                        >
                                            {getBoiPointSum(
                                                recentMatches,
                                                heroPoints
                                            )}
                                        </h3>
                                        {/*
                                        <ul
                                            style={{
                                                listStyleType: "none",
                                                paddingLeft: 0,
                                            }}
                                        >
                                            
                                            {recentMatches.map(
                                                ({ match_id, hero_id }) => (
                                                    <li key={match_id}>
                                                        <div className="row">
                                                            <img
                                                                style={{
                                                                    maxWidth:
                                                                        "120px",
                                                                    margin:
                                                                        "0px",
                                                                }}
                                                                src={
                                                                    "http://cdn.dota2.com" +
                                                                    heroData[
                                                                        hero_id
                                                                    ].img
                                                                }
                                                            ></img>{" "}
                                                            {
                                                                heroPoints[
                                                                    hero_id
                                                                ]
                                                            }{" "}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                                        */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
