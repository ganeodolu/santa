import AppProviders from "@/app/provider";
import GlobalLayout from "@/app/ui/GlobalLayout";
import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import MetaTags from "@/shared/ui/MetaTags";

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
  const getLayout =
    Component.getLayout ?? ((page) => <GlobalLayout>{page}</GlobalLayout>);

  return (
    <>
      <MetaTags
        title="산타보아"
        description="국립공원 산에 대한 모든 것! 18개 산악형 국립공원의 지도, 날씨, 일출, 일몰, CCTV 정보를 알려드립니다."
        keywords="산타보아, 국립공원, 산, 날씨, 위치, 지도, CCTV"
      />
      <Head>
        <meta property="og:site_name" content="SANTABOA" />
        <meta name="robots" content="index, follow" />
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
