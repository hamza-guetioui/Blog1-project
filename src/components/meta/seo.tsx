import React from "react";
import Head from "next/head";

import { ISeo } from "@/data/seo";
type Props = {
  children?: React.ReactNode;
  data: ISeo;
};

const SEO = ({ data, children }: Props) => {
  const { title, meta, openGraph } = data;
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      {meta.map((item) => {
        if (item.charSet !== undefined)
          return <meta key={item.charSet} charSet={item.charSet} />;
        return <meta key={item.name} name={item.name} content={item.content} />;
      })}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={openGraph.type} />
      <meta property="og:title" content={openGraph.title} />
      <meta property="og:description" content={openGraph.description} />
      <meta property="og:image" content={openGraph.image} />
      <meta property="og:url" content={openGraph.url} />
      <meta property="og:site_name" content={openGraph.siteName} />

      {/* Open Graph / Twitter */}
      {/* <meta
      property="twitter:title"
      content={openGraph.title}
    />
    <meta
      property="twitter:description"
      content={openGraph.description}
    />
    <meta property="twitter:image" content={openGraph.image} />
    <meta property="twitter:url" content={openGraph.url} />
    <meta property="twitter:card" content={openGraph.card} />
    <meta property="twitter:site" content={openGraph.site} /> */}
      {children}
    </Head>
  );
};

export default SEO;
