import { LoadingSpinner } from "../utils";

interface Props {
	label: string;
	value?: number | string;
	unit?: string;
	min?: number;
	max?: number;
}

const getClassName = (value?: number | string, min?: number, max?: number) => {
	const valueNum = parseFloat(value as string);
	let style = "flex items-center justify-center w-32 h-32 rounded-full ";
	if (value === undefined) {
		style += "bg-darkGreen";
	} else if (min !== undefined && max !== undefined) {
		if (valueNum < min || valueNum > max) {
			style += "bg-red-500";
		} else {
			style += "bg-darkGreen";
		}
	} else {
		style += "bg-darkGreen";
	}
	return style;
};

export default function CurrentReading({
	label,
	value,
	unit,
	min,
	max,
}: Props) {
	console.log(label, value, unit, min, max);
	return (
		<div className="flex flex-col items-center gap-2 w-fit text-4xl">
			<h3 className="text-darkGreen">{label}</h3>
			<div className={getClassName(value, min, max)}>
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
