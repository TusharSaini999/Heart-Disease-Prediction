
export default function ServiceCard({
  imgSrc,
  title,
  description = "Our AI analyzes heart data to predict risks early, allowing for timely intervention and improving patient care with advanced technology.",
}) {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out max-w-[347px] w-full">
      <img
        className="w-[200px] h-[200px] object-contain rounded-lg"
        src={imgSrc || "https://images.unsplash.com/photo-1543164904-8ff92670a192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhcnRiZWF0fGVufDB8fDB8fHww"}
        alt="Card"
      />

      <div className="text-center">
        <h4 className="text-2xl font-medium text-black">{title}</h4>
        <p className="mt-3 text-sm text-gray-600">{description}</p>
      </div>

      
    </div>
  );
}
