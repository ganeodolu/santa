import "@/styles/globals.css";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useState } from "react";
import Head from "next/head";

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

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1 * 60 * 60 * 1000, // 1시간
            gcTime: 3 * 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          }
        }
      })
  );

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
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Provider>
            <Component {...pageProps} />
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HydrationBoundary>
      </QueryClientProvider>
      <Analytics />
    </>
  );
}
