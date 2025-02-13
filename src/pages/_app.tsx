import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>산타보아</title>
        <meta
          name="description"
          content="국립공원 산 정보를 알려주는 산타보아입니다."
        />
        <meta property="og:title" content="산타보아" />
        <meta property="og:site_name" content="Santaboa" />
        <meta
          property="og:description"
          content="국립공원 산 정보를 알려주는 산타보아입니다."
        />
        <meta
          property="og:image"
          content="/images/ogImage.png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Analytics />
    </>
  );
}
