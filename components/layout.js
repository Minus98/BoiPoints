import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import cn from "classnames";

const name = "BoiPoints";
export const siteTitle = "BoiPoints";

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <>
                    {home ? (
                        <img
                            src="/images/dota2.png"
                            className={`${styles.headerHomeImage}`}
                            alt={name}
                        />
                    ) : (
                        <Link href="/">
                            <a>
                                <img
                                    src="/images/dota2.png"
                                    className={`${styles.headerHomeImage}`}
                                    alt={name}
                                />
                            </a>
                        </Link>
                    )}
                    <h1
                        className={
                            (utilStyles.heading2Xl, utilStyles.colorWhite)
                        }
                    >
                        {name}
                    </h1>
                </>
            </header>
            <main>{children}</main>
        </div>
    );
}
