import HomeView from "@/views/homeView";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gray-100">
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
    </div>
  );
}
