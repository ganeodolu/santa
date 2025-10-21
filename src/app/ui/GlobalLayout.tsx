import { ReactNode } from 'react'

type Props = {
  children : ReactNode
}

const GlobalLayout = ({children} : Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}

export default GlobalLayout
