import Link from "next/link";

type Props = {
  href: string;
};

const HomeButton = ({ href }: Props) => {
  return (
    <Link
      className="mr-2 flex cursor-pointer items-center space-x-2 rounded-md bg-cyan-800 px-2 py-2 drop-shadow-md duration-300 hover:bg-cyan-600"
      href={href}
    >
      <svg
        className="fill-white"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </Link>
  );
};

export default HomeButton;
