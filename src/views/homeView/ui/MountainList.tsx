import React from 'react'

type Props = {}

const MountainList = (props: Props) => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="-mx-2 flex flex-wrap">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="mb-4 w-1/2 px-2">
            <div className="overflow-hidden rounded-lg bg-white shadow-md">
              <img
                src={`https://picsum.photos/400/300?random=${index}`}
                alt={`콘텐츠 이미지 ${index + 1}`}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">
                  산이름 {index + 1}
                </h3>
                <p className="text-gray-600">
                  산정보
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MountainList
