import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import cn from "classnames";
import Link from "next/link";

import { fetchBoiPoints, fetchProfiles } from "../lib/profiles";

export async function getStaticProps() {
    const boisData = await fetchProfiles();

    console.log(boisData);

    return {
        revalidate: 900,
        props: {
            boisData,
        },
    };
}

export default function Home({ boisData }) {
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
                        {boisData.map(
                            ({ profile, recentMatches, boiPointSum }) => (
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
                                            <Link
                                                href={"/" + profile.account_id}
                                            >
                                                <a className="card-title boi-title">
                                                    {" "}
                                                    {profile.personaname}
                                                </a>
                                            </Link>
                                            <h3
                                                className={cn({
                                                    [utilStyles.colorGreen]:
                                                        boiPointSum > 0,
                                                    [utilStyles.colorRed]:
                                                        boiPointSum < 0,
                                                })}
                                            >
                                                {boiPointSum}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
