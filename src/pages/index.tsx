import Home from "@/views/Home";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("parkName");

  useEffect(() => {
    if (!search) {
      router.push({
        query: { parkName: "bukhan" }
      });
    }
  }, [])
  
  return (
    <main
      className={`min-h-screen flex-col items-center justify-between p-24`}
    >
      <Home />
    </main>
  );
}
