import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { PiPlusCircleBold } from "react-icons/pi";

export default function ListItems() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-around gap-6 px-3 md:gap-7">
      <Item title="24 hour service" />
      <Item title="AI Based Prediction" description="Using advanced algorithms, we detect subtle heart patterns to provide early warnings and help prevent life-threatening heart conditions reliably." Icon={FiCheckCircle} />
      <Item title="Accessible Anywhere" description="With cutting-edge technology, our solution offers accurate heart attack predictions, empowering doctors to take proactive healthcare measures promptly." Icon={PiPlusCircleBold} />
      
    </div>
  );
}

function Item({
  Icon = FaRegClock,
  title = "",
  description = "Our AI system predicts heart attack risks early by analyzing patient data, enabling timely intervention and improving health outcomes effectively.",
}) {
  return (
    <div className="flex w-max translate-y-[50%] items-center gap-3 rounded-[12px] bg-gradient-to-t from-[#65A8FB] to-[#1678F2] px-[18px] py-2 text-white md:max-w-[295px]">
      <div>
        <Icon className="size-[38px]" />
      </div>
      <div>
        <h3 className="font-poppins text-lg font-medium">{title}</h3>
        <p className="font-sora text-xs">{description}</p>
      </div>
    </div>
  );
}
