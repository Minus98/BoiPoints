import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import cn from "classnames";
import Link from "next/link";

import { fetchBoiPoints, fetchProfiles } from "../lib/profiles";
import { fetchHeroes } from "../lib/heroes";
import { fetchHeroPoints } from "../lib/heroPoints";

export async function getStaticProps() {
    const boisData = await fetchProfiles();
    const heroData = await fetchHeroes();
    const heroPoints = await fetchHeroPoints();

    const boiPointsSumMap = {};

    let i = 0;

    for (i = 0; i < boisData.length; i++) {
        boiPointsSumMap[boisData[i].profile.account_id] = await fetchBoiPoints(
            boisData[i].profile.account_id
        );
    }

    return {
        revalidate: 900,
        props: {
            boisData,
            heroData,
            heroPoints,
            boiPointsSumMap,
        },
    };
}

export default function Home({
    boisData,
    heroData,
    heroPoints,
    boiPointsSumMap,
}) {
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
                                    <Link href={"/" + profile.account_id}>
                                        <a>
                                            <img
                                                className="card-img-top"
                                                src={profile.avatarfull}
                                            ></img>
                                        </a>
                                    </Link>
                                    <div
                                        className="card-body"
                                        style={{ textAlign: "center" }}
                                    >
                                        <Link href={"/" + profile.account_id}>
                                            <a className="card-title boi-title">
                                                {" "}
                                                {profile.personaname}
                                            </a>
                                        </Link>
                                        <h3
                                            className={cn({
                                                [utilStyles.colorGreen]:
                                                    boiPointsSumMap[
                                                        profile.account_id
                                                    ] > 0,
                                                [utilStyles.colorRed]:
                                                    boiPointsSumMap[
                                                        profile.account_id
                                                    ] < 0,
                                            })}
                                        >
                                            {
                                                boiPointsSumMap[
                                                    profile.account_id
                                                ]
                                            }
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
