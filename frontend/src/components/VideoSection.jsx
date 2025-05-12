import { FaRegClock } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { PiPlusCircleBold } from "react-icons/pi";

export default function VideoSection() {
  return (
    <div className="mx-auto max-w-screen-xl p-3 pb-28 md:pb-[164px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        Why HeartSense.AI?
      </p>

      {/* YouTube Video */}
      <div className="relative mt-10 w-full overflow-hidden rounded-3xl" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 h-full w-full rounded-3xl"
          src="https://www.youtube.com/embed/_wwlGM1P5sU?si=ayJO6ZXd-BnBB7pR" // Replace with your YouTube video ID
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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
        <Item title="It's Predict Timely" />
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
