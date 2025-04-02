import React from "react";
import { ServiceCard } from "./ui";

export default function ServiceCards() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-9 pb-[80px] md:pb-[164px]">
      <ServiceCard description="Using intelligent algorithms, our system detects heart attack risks, providing accurate predictions and enabling preventive measures for better health outcomes." title="Regular Monitoring" />
      <ServiceCard description="Our advanced AI system identifies heart attack risks by analyzing vital signs, offering early detection and supporting proactive healthcare decisions effectively." title="Talk With Expert" imgSrc="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D" />
      <ServiceCard description="Our advanced AI system identifies heart attack risks by analyzing vital signs, offering early detection and supporting proactive healthcare decisions effectively." title="Medicine Suggestion" imgSrc="https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lZGljaW5lfGVufDB8fDB8fHww" />
      <ServiceCard description="With cutting-edge technology, we deliver precise heart attack predictions, empowering patients and doctors to act early and prevent emergencies." title="Use Of AI" imgSrc="https://plus.unsplash.com/premium_photo-1700482758020-6332a298ad09?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxhaXxlbnwwfHwwfHx8MA%3D%3D" />
      <ServiceCard description="Our heart health solution uses AI to detect subtle risk patterns, enabling early intervention and improving patient care through advanced insights." title="Good Nutrition" imgSrc="https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG51dHJpdGlvbnxlbnwwfHwwfHx8MA%3D%3D" />
      <ServiceCard description="AI-powered heart monitoring provides real-time analysis, detecting early warning signs and supporting preventive care for a healthier future." title="Heart-Beat Monitoring" imgSrc="https://static.vecteezy.com/system/resources/previews/022/979/495/large_2x/heart-rhythm-graph-checking-your-heartbeat-for-diagnosis-png.png" />
    </div>
  );
}
