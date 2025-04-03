
export default function Button({
  title = "Your Profile",
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-lr flex items-center gap-2 rounded-full px-7 py-4 text-lg font-semibold text-white transition hover:-rotate-3 ${className}`}
    >
      {title}
    </button>
  );
}
