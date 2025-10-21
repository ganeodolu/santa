import AppProviders from "@/app/provider";
import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal"
    }
  ],
  variable: "--font-pretendard",
  preload: true,
  display: "swap"
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
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
      </Head>
      <AppProviders dehydratedState={pageProps.dehydratedState}>
        {getLayout(<Component {...pageProps} />)}
      </AppProviders>
    </>
  );
}
