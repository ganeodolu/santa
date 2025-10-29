import MetaTags from "@/shared/ui/MetaTags";
import HomeView from "@/views/homeView";

export default function IndexPage() {
  return (
    <>
      <MetaTags
        title={`산타보아 | 국립공원 가이드`}
        description={"전국에 있는 산악형 국립공원 18곳을 모두 알아보세요"}
        keywords={`국립공원, 산, 날씨, 위치, 지도, CCTV`}
      />
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
    </>
  );
}
