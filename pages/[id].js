import Layout from "../components/layout";
import { profileIds, fetchProfile } from "../lib/profiles";
import cn from "classnames";
import utilStyles from "../styles/utils.module.css";
import { fetchHeroes } from "../lib/heroes";

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
                                            <div className="col-4 centerItems"></div>
                                            <div className="col-2 centerItems">
                                                <h4
                                                    className={cn({
                                                        [utilStyles.colorGreen]:
                                                            boi.boiPointMap[
                                                                hero_id
                                                            ] > 0,
                                                        [utilStyles.colorRed]:
                                                            boi.boiPointMap[
                                                                hero_id
                                                            ] < 0,
                                                    })}
                                                >
                                                    {boi.boiPointMap[hero_id] >
                                                    0 ? (
                                                        <>+</>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {boi.boiPointMap[hero_id]}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
