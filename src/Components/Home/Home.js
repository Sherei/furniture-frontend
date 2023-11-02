import React, { useEffect } from 'react'
import Hero from './Hero'
import "./home.css"
import Categories from './Categories'
import Beds from './Beds'
import Mattress from './Mattress'
import FootStools from './Footstools'
import Benefits from '../Benefits/Benefits'
import Review from '../Reviews/Review'
import Sofas from './Sofas'
import Ottoman from "./Ottoman"
import Slider from '../Sentence/Slider'



const Home = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  return <>
    <Hero />
    <Slider/>
    <Categories />
    {/* <Discounted /> */}
    {/* <Trending /> */}
    <Sofas />
    <Beds />
    <Ottoman/>
    {/* <Feature /> */}
    <Mattress />
    <FootStools />
    <Review />
    <Benefits />

  </>
}

export default Home