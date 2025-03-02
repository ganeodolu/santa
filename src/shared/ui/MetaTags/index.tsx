import Head from "next/head";

type MetaTagsProps = {
  title: string;
  description: string;
  ogImage: string;
}

const MetaTags = ({ title, description, ogImage } : MetaTagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default MetaTags;
