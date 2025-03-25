import { pretendard } from "@/pages/_app";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko" className={`${pretendard.variable}`}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>산타보아</title>
        <meta
          name="description"
          content="국립공원 산 정보를 알려주는 산타보아입니다."
        />
        <meta
          name="keywords"
          content="산타보아, 국립공원, 산, 날씨, 지도, mountain"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="산타보아" />
        <meta property="og:site_name" content="SANTABOA" />
        <meta
          property="og:description"
          content="국립공원 산 정보를 알려주는 산타보아입니다."
        />
        <meta property="og:image" content="/ogImage.png" />
        <meta
          name="google-site-verification"
          content="llNbGRX6IDXM0PEjuLvk7eFRjAWorst3cG-qU0GOFT8"
        />
        <meta
          name="naver-site-verification"
          content="235ecb1454555f77eb04694e10f586b73083908d"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Website",
              name: "산타보아",
              description: "국립공원 산에 대한 모든 것",
              image: "https://santaboa.vercel.app/ogImage.png",
              url: "https://santaboa.vercel.app"
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
