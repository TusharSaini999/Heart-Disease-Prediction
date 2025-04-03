import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ListItems from "../components/ListItems";
import About from "../components/About";
import Services from "../components/Services";
import Checknow from "../components/Checknow";
import ServiceCards from "../components/ServiceCards";;
import VideoSection from "../components/VideoSection";


function Landingpage(){
  return (
    <>
      <Navbar />
      <div className="bg-[#F2F7FF]">
        <Hero />
        <ListItems />
      </div>

      <About />

      <div className="bg-[#F2F7FF]">
        <Services />
        <ServiceCards />
      </div>

      <Checknow />
      <VideoSection />
</>
    
  );
}

export default Landingpage;
