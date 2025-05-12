import { Button } from "./ui";

export default function Hero() {
  return (
    <div className="pd:pb-[90px] mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-3 pb-10 pt-[80px] md:flex-row lg:gap-[72px] lg:px-0 lg:pt-[108px]">
      <div className="mt-10 flex flex-col items-start gap-6 md:mt-0">
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          Your's Heart Future, Foreseen By AI
        </h5>
        <h1 className="font-poppins text-5xl font-bold text-[#031432] md:text-4xl md:leading-[120%]">
          Predict Your Heart Health <br />
          Instantly With AI
        </h1>
        <p className="max-w-[452px] text-para">
          Enter Your Heart Details And Get An AI-Driven Heart Disease Risk Assessment In Seconds.
        </p>
        <Button title="Get Started Now" />
      </div>

      <div className="hidden md:block max-h-[506px] max-w-[678px]">
        <img
          className="custom-animate rounded-full h-[520px] w-full object-contain bg-transparent"
          src="https://th.bing.com/th/id/OIP.mTuVm7nFAWUVhxfYX5fMcwHaIu?rs=1&pid=ImgDetMain"
          alt="Hero"
        />
      </div>

    </div>
  );
}
