type Props = {
  onInputClick: () => void;
};

const HeaderWithoutBackward = ({ onInputClick }: Props) => {
  return (
    <header className="sticky top-0 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex items-center">
          <div className="relative flex-grow">
            <input
              type="search"
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="산 찾기"
              onClick={onInputClick}
            />
            <div className="absolute left-3 top-2">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderWithoutBackward;
