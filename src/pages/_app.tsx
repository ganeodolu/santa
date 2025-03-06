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
import Head from "next/head";
import { useState } from "react";

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
        <meta property="og:title" content="산타보아" />
        <meta property="og:site_name" content="SANTABOA" />
        <meta
          property="og:description"
          content="국립공원 산 정보를 알려주는 산타보아입니다."
        />
        <meta property="og:image" content="/ogImage.png" />
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
