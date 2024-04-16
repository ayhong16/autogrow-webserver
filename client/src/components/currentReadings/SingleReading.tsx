export default function SingleReading({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 w-fit text-4xl m-8">
      <h3>{label}</h3>
      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-[#258239]">
        <p className="text-white -translate-y-[4px]">{value}</p>
      </div>
    </div>
  );
}
