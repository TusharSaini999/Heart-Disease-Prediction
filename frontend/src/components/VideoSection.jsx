import { FaRegClock } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";
import { PiPlusCircleBold } from "react-icons/pi";

export default function VideoSection() {
  return (
    <div className="mx-auto max-w-screen-xl p-3 pb-28 md:pb-[164px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        Why HeartSense.AI?
      </p>

      <div className="relative mt-10 flex items-center justify-center">
        <img className="w-full h-fit rounded-3xl" src="https://plus.unsplash.com/premium_photo-1681966826227-d008a1cfe9c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Video" />
        <button className="absolute flex size-[60px] items-center justify-center rounded-full bg-primary-start md:size-[100px]">
          <IoPlayOutline className="ml-2 size-10 text-white md:size-16" />
        </button>
      </div>

      <div>
        <h4 className="mb-3 mt-4 text-center font-poppins text-[32px] font-semibold text-[#031432]">
        Innovation That Cares for Every Heartbeat
        </h4>
        <p className="mx-auto max-w-[843px] text-center text-para">
        Our advanced AI-powered heart attack detection system analyzes health data in real-time, providing accurate predictions and early warnings. With intelligent monitoring, we empower individuals and healthcare professionals to take proactive steps for better heart health.
        </p>
      </div>

      <div className="mt-[60px] flex flex-col items-center justify-center gap-6 md:flex-row">
        <Item title="It's Ptedict Timely" />
        <Item title="Urgent 24 hour service" Icon={FiCheckCircle} />
        <Item title="High quality care" Icon={PiPlusCircleBold} />
      </div>
    </div>
  );
}

function Item({ Icon = FaRegClock, title = "" }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] bg-gradient-to-t from-[#65A8FB] to-[#1678F2] px-7 py-4 text-white transition hover:-rotate-3 md:max-w-[320px]">
      <div>
        <Icon className="size-[38px]" />
      </div>

      <h3 className="font-poppins text-lg font-medium">{title}</h3>
    </div>
  );
}
