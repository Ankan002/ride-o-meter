import React from 'react';
import Head from "next/head";

interface Props {
    title: string;
}

const CustomHead = (props: Props) => {
    const { title } = props;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content="An app that can calculate cab fares with practical prices." />
            <link rel="icon" href="/o-logo.svg" />
        </Head>
    );
};

export default CustomHead;
