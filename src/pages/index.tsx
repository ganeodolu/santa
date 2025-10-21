import GlobalLayout from "@/app/ui/GlobalLayout";
import HomeView from "@/views/homeView";
import { ReactNode } from "react";
import HomeViewLayout from './../views/homeView/ui/HomeViewLayout';

export default function IndexPage() {
  return (
    <HomeViewLayout>
      <HomeView />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "산타보아",
            alternativeName: "SANTABOA",
            description: "산타보아 | 국립공원 산에 대한 모든 것",
            image: "https://santaboa.vercel.app/ogImage.png",
            url: "https://santaboa.vercel.app"
          })
        }}
      />
    </HomeViewLayout>  
  );
}

IndexPage.getLayout = (page: ReactNode) => <GlobalLayout>{page}</GlobalLayout>
