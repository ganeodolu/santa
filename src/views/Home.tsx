import Header from '@/entities/header'
import Map from '@/entities/map/ui'
import React from 'react'

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <Header />
      <section>
        <Map />
      </section>
    </div>
  )
}

export default Home
