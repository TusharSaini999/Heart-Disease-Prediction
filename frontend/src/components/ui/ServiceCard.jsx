import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";

export default function ServiceCard({
  imgSrc,
  title,
  description = "Our AI analyzes heart data to predict risks early, allowing for timely intervention and improving patient care with advanced technology.",
}) {
  return (
    <div className="flex max-w-[347px] flex-col items-center gap-6 rounded-3xl bg-white p-8 shadow-[0_24px_32px_-3px_rgba(3,9,50,0.04)] transition hover:rotate-3 hover:scale-105">
      <img
        className="size-[200px] object-contain"
        src={imgSrc || "https://images.unsplash.com/photo-1543164904-8ff92670a192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhcnRiZWF0fGVufDB8fDB8fHww"}
        alt="Card"
      />

      <div>
        <h4 className="font-poppins text-2xl font-medium text-black">
          {title}
        </h4>
        <p className="mt-3 text-sm text-para">{description}</p>
      </div>

      <Button title="Unleash The Power Of AI" className="w-full" Icon={FaWhatsapp} />
    </div>
  );
}
