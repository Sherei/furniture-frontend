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
const Home = ({ data }) => {
  return <>
    <div>
      <Hero />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Categories />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Discounted />
    </div>

    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Sofas />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Beds />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Bedroom />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Dining />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Coffee />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Review />
    </div>
    <div className='px-lg-3 px-xlg-3 px-sm-1 px-xsm-1'>
      <Benefits />
    </div>
  </>
}

export default Home