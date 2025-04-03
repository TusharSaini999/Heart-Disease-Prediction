import React from "react";
import { FaAngleRight, FaWhatsapp } from "react-icons/fa";

export default function Checknow() {
  return (
    <div className="mx-auto mb-[130px] max-w-screen-xl px-3 pt-[80px] md:mb-[213px] md:pt-[148px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        Check Your HeartRate Now!
      </p>
      <div className="flex h-auto flex-col items-center justify-center rounded-[32px] bg-gradient-to-tl from-primary-start to-primary-end p-8 text-white md:h-[315px] md:p-4">
        <h3 className="font-poppins text-2xl font-semibold md:text-[32px]">
          Every Beat Counts - Stay One Step Ahead!
        </h3>
        <p className="mb-6 mt-[11px] max-w-[676px] md:text-center">
        Our AI-driven heart attack prediction system analyzes critical health data to detect early warning signs, empowering you and your healthcare team to take preventive action before a crisis occurs.
        </p>

        <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-lg font-medium text-primary-start shadow-[0px_8px_23px_0px_rgba(65,132,247,0.24)] transition hover:-rotate-3 md:px-7 md:py-4">
          <FaAngleRight className="size-6" />
          Get Started!
        </button>
      </div>
    </div>
  );
}
