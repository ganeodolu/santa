import Link from "next/link";

type Props = {
  cctv: {
    place: string | null;
    url: string | null;
  };
};

const CCTVExternalLink = ({ cctv: { place, url } }: Props) => {
  if (url === null) return null;

  return (
    <section className="flex w-full items-center justify-between bg-white p-4 shadow-lg">
      <div className="text-lg font-semibold text-gray-700">실시간 CCTV</div>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded bg-cyan-800 px-4 py-2 font-bold text-white transition duration-300 hover:bg-cyan-600"
      >
        {place}
      </Link>
    </section>
  );
};

export default CCTVExternalLink;
