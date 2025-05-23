import React, { useState, useEffect } from "react";
import { Element } from 'react-scroll';
import Hero from "../components/Hero";
import ListItems from "../components/ListItems";
import About from "../components/About";
import Services from "../components/Services";
import Checknow from "../components/Checknow";
import ServiceCards from "../components/ServiceCards";;
import VideoSection from "../components/VideoSection";



function Landingpage() {
  return (
    <>
      <div className="bg-[#F2F7FF]">
        <Element name="home">
          <Hero />
        </Element>
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
