import Link from "next/link";

type Props = {
  href: string;
};

const ShowMapButton = ({ href }: Props) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
      <Link
        className="inline-block w-[100px] rounded-lg bg-cyan-800 py-2 text-center font-bold text-white"
        href={href}
      >
        지도보기
      </Link>
    </div>
  );
};

export default ShowMapButton;
