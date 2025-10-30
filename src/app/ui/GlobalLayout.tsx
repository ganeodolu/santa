import { ReactNode } from 'react'

type Props = {
  children : ReactNode
}

const GlobalLayout = ({children} : Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-[500px] min-w-[344px] bg-white shadow-md">
        {children}
      </main>
    </div>
  );
}

export default GlobalLayout
