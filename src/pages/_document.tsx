import { pretendard } from "@/pages/_app";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko" className={`${pretendard.variable}`}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
