import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";
import { fetchProfiles } from "../lib/profiles";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const boisData = await getBoiData();
    return {
        props: {
            allPostsData,
            boisData,
        },
    };
}

async function getBoiData() {
    return await fetchProfiles();
}

export default function Home({ allPostsData, boisData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>God mode carry player</p>
                <p>
                    <a href="https://www.dotabuff.com/players/71769375">
                        dotabuff
                    </a>
                </p>
            </section>

            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Bois</h2>

                <div className="container">
                    <div class="row">
                        {boisData.map(({ profile }) => (
                            <div className="col-4" key={profile.account_id}>
                                <img src={profile.avatarfull}></img>
                                {profile.personaname}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
