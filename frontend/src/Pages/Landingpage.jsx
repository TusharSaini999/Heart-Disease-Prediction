import React, { useState, useEffect } from "react";
import { Element } from 'react-scroll';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ListItems from "../components/ListItems";
import About from "../components/About";
import Services from "../components/Services";
import Checknow from "../components/Checknow";
import ServiceCards from "../components/ServiceCards";;
import VideoSection from "../components/VideoSection";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';



function Landingpage(){
  return (
    <>
      <Navbar />
      <div className="bg-[#F2F7FF]">
        <Hero />
        <ListItems />
      </div>
<Element name="about">
      <About />
      </Element>
      <div className="bg-[#F2F7FF]">
        <Element name="service">
        <Services />
        </Element>
        <ServiceCards />
      </div>
<Element name="measure">
      <Checknow />
      </Element>
      <Element name="mission">
      <VideoSection />
      </Element>
</>
    
  );
}

export default Landingpage;
