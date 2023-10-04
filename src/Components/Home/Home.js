import React, { useEffect } from 'react'
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
import Feature from './Feature'



const Home = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  return <>
    <Hero />
    <Categories />
    <Discounted />
    <Trending />
    <Sofas />
    <Beds />
    <Feature />
    <Bedroom />
    <Dining />
    <Coffee />
    <Review />
    <Benefits />

  </>
}

export default Home