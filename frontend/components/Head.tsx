import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { MetaProps } from '../types/layout';

const Head = ({ customMeta }: { customMeta: MetaProps }): JSX.Element => {
    const router = useRouter();

    return (
        <NextHead>
            <title>{customMeta.title}</title>
            <meta content={customMeta.excerpt} name="description" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_WEBSITE_HOST_URL}${router.asPath}`} />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEBSITE_HOST_URL}${router.asPath}`} />
            <meta property="og:type" content={customMeta.type} />

            <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />

            <meta property="og:description" content={customMeta.excerpt} />
            <meta property="og:title" content={customMeta.title} />
            <meta property="og:image" content={customMeta.ogImage.url} />
            <meta name="twitter:card" content="summary_large_image" />

            <meta name="twitter:site" content={process.env.NEXT_PUBLIC_TWITTER_SITE} />

            <meta name="twitter:title" content={customMeta.title} />
            <meta name="twitter:description" content={customMeta.excerpt} />
            <meta name="twitter:image" content={customMeta.ogImage.url} />
            {customMeta.date && (
                <meta property="article:published_time" content={customMeta.date} />
            )}
        </NextHead>
    );
};

export default Head;