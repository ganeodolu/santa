import type { MetaTags } from "@/shared/constants";
import {
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_TYPE,
  DEFAULT_URL
} from "@/shared/constants";
import Head from "next/head";

const MetaTags = ({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = DEFAULT_OG_TYPE,
  url = DEFAULT_URL
}: MetaTags) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      {<meta property="og:url" content={url} />}
    </Head>
  );
};

export default MetaTags;
