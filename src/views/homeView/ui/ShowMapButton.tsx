type Props = {
  onButtonClick: () => void;
};

const ShowMapButton = ({ onButtonClick }: Props) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
      <button
        className="w-[100px] cursor-pointer rounded-lg bg-cyan-800 py-2 font-bold text-white"
        onClick={onButtonClick}
      >
        지도보기
      </button>
    </div>
  );
};

export default ShowMapButton;
