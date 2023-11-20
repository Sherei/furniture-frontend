import React, { useEffect } from 'react'
import Hero from './Hero'
import "./home.css"
import Categories from './Categories'
import Beds from './Beds'
import Mattress from './Mattress'
import FootStools from './Footstools'
import Benefits from '../Benefits/Benefits'
import Review from '../Reviews/Review'
import CornerSofas from './CornerSofas'
import Ottoman from "./Ottoman"
import Slider from '../Sentence/Slider'
import About from '../About/About'
import Blog from '../Blog/Blog'
import Three from './Three'



const Home = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);


  return <>
    <Hero />
    <Slider />
    <Categories />
    {/* <Discounted /> */}
    {/* <Trending /> */}
    <CornerSofas />
    <Three/>
    <Beds />
    <Ottoman />
    {/* <Feature /> */}
    <Mattress />
    <FootStools />
    <About />
    <Review />
    <Benefits />
    <Blog />

  </>
}

export default Home