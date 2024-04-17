import { LoadingSpinner } from "../utils";

interface Props {
  label: string;
  value?: number | string;
  unit?: string;
}

export default function SingleReading({ label, value, unit }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 w-fit text-4xl">
      <h3 className="text-[darkGreen]">{label}</h3>
      <div className="flex items-center justify-center w-32 h-32 rounded-full bg-[darkGreen]">
        {!value ? (
          LoadingSpinner
        ) : (
          <p className="text-white -translate-y-[4px]">
            {value}
            {unit}
          </p>
        )}
      </div>
    </div>
  );
}
