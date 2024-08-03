import Home from "@/views/Home";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function IndexPage() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams?.get("mountainName");
  console.log(search);

  // useEffect(() => {
  //   console.log(search)
  //   // if (!search) {
  //   //   router.push({
  //   //     query: { mountainName: "bukhan" }
  //   //   });
  //   // }
  // }, [])
  
  return (
    <main
      className={`min-h-screen flex-col items-center justify-between p-24`}
    >
      <Home />
    </main>
  );
}
