import React from "react";
import { Button } from "./ui";
import { FaArrowAltCircleRight, FaWhatsapp } from "react-icons/fa";

export default function About() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-5 px-3 pt-28 md:flex-row md:pb-[145px] lg:gap-20 lg:px-0 lg:pt-[220px]">
      <div className="max-h-[425px] max-w-[486px]">
        <img
          className="custom-animate rounded-full size-[25%] object-contain md:size-full"
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhbHRoY2FyZXxlbnwwfHwwfHx8MA%3D%3D"
          alt="About"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          About The AI
        </h5>
        <h1 className="max-w-[485px] font-poppins text-[32px] font-semibold leading-normal text-[#031432]">
         Empowering Lives with AI-Driven Heart Attack Detection
        </h1>
        <p className="mb-4 max-w-[485px] text-para">
        At HeartSense, we use advanced AI to predict heart attack risks with accuracy, helping individuals and healthcare providers make informed decisions. Our model analyzes health data to provide early warnings, enabling proactive care and potentially saving lives. Join us in revolutionizing heart health with cutting-edge technology.


        </p>
        <Button title="Predict Now" Icon={FaArrowAltCircleRight} />
      </div>
    </div>
  );
}
