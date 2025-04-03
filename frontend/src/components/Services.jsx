import React from "react";
import { Button } from "./ui";
import { FaWhatsapp } from "react-icons/fa";

export default function Services() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col-reverse items-center justify-center gap-5 px-3 pb-28 pt-28 md:flex-row md:pb-[180px] lg:gap-6 lg:px-0 lg:pt-[140px]">
      <div className="flex flex-col items-start gap-4">
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          Services
        </h5>
        <h1 className="max-w-[485px] font-poppins text-[32px] font-semibold leading-normal text-[#031432]">
        Early Detection, Lifelong Protection
        </h1>
        <p className="mb-4 max-w-[485px] text-para">
        We are dedicated to safeguarding your heart health with advanced AI technology. Our heart attack detection system provides real-time risk assessment, accurate predictions, personalized insights, and 24/7 monitoring. Empowering you with early detection for a healthier tomorrow.
        </p>
        <Button title="Get Started" Icon={FaWhatsapp} />
      </div>

      <div className="max-h-[560px] max-w-[522px]">
        <img
          className="custom-animate rounded-full size-[25%] object-contain md:size-full"
          src="https://t3.ftcdn.net/jpg/01/05/61/54/360_F_105615424_2WUJEDjqWOJdhUDDmajQ9DGCZZ1nJjPC.jpg"
          alt="About"
        />
      </div>
    </div>
  );
}
