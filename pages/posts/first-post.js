import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>BoiPoints</title>
            </Head>
            <h1>BoiPoints</h1>
            <h1 className="title">
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h1>
            <div className="container">
                <div className="row">
                    <div className="col-4">Test</div>
                    <div className="col-4">Test</div>
                    <div className="col-4">Test</div>
                    <div className="col-4">Test</div>
                </div>
            </div>
        </Layout>
    );
}
