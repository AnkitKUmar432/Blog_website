import React from 'react'
import Hero from '../Home/Hero'
import Treanding from '../Home/Treanding'
import Devotional from '../Home/Devotional'
import Creator from '../Home/Creator'
import IntroSection from '../Home/IntroSection'
import Explore from '../Home/Explore'

function Home() {
  return (
    <div>
      <Explore />

      <IntroSection />
      <Hero />
      <Treanding />
      <Devotional />
      <Creator />
    </div>
  )
}

export default Home