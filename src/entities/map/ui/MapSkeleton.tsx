const MapSkeleton = () => {
  return (
    <div className="relative h-[400px] w-full animate-pulse overflow-hidden rounded-lg bg-gray-100">
      {/* 지도 배경 스켈레톤 */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300" />

      {/* 줌 컨트롤 스켈레톤 */}
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded bg-gray-200" />
      </div>

      {/* 로딩 메시지 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
          <p className="text-gray-500">지도를 불러오는 중입니다...</p>
        </div>
      </div>
    </div>
  );
};

export default MapSkeleton;
