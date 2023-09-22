import React from 'react'
import Hero from './Hero'
import "./home.css"
import Categories from './Categories'
import Beds from './Beds'
import Bedroom from './Bedroom'
import Dining from './Dining'
import Coffee from './Coffee'
import Benefits from '../Benefits/Benefits'
import Review from '../Reviews/Review'
import Sofas from './Sofas'
import Discounted from './Discounted'
import Trending from './Trending'
const Home = () => {
  return <>
      <Hero />
      <Categories />
      <Discounted />
      <Trending/>
      <Sofas />
      <Beds />
      <Bedroom />
      <Dining />
      <Coffee />
      <Review />
      <Benefits />

  </>
}

export default Home