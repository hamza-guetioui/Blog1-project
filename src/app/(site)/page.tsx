import Head from "next/head";
import HomePage from "@/views/Home";

export default function Home() {
  return (
    <>
      <Head>
        {/* Basic SEO */}
        <title>My Blog - Your Go-To Source for Knowledge</title>
        <meta
          name="description"
          content="Welcome to My Blog, where you can find insightful articles on various topics including technology, health, and lifestyle."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="author" content="Your Name or Company Name" />
        <meta
          name="keywords"
          content="blog, articles, technology, health, lifestyle, insights"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="My Blog - Your Go-To Source for Knowledge"
        />
        <meta
          property="og:description"
          content="Welcome to My Blog, where you can find insightful articles on various topics including technology, health, and lifestyle."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.myblog.com" />
        <meta property="og:site_name" content="My Blog" />
      </Head>

      <main>
        <HomePage />
      </main>
    </>
  );
}
