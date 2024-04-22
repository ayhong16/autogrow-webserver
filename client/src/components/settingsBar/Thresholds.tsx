import { Props } from "./Settings";

export default function Thresholds({
	currentProfile,
	setCurrentProfile,
}: Props) {
	return (
		<div className="flex flex-col items-center justify-between text-darkGreen h-full">
			<h3 className="text-2xl m-2">Thresholds</h3>
			<div className="grid grid-cols-3 gap-y-4 items-center justify-items-center">
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="phMin" className="text-right">
						pH Minimum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="phMin"
						name="phMin"
						min={0}
						max={14}
						value={
							currentProfile?.min_ph === 0 ? "0" : currentProfile?.min_ph || ""
						}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										min_ph: newValue,
									}));
								}
							}
						}}
					/>
				</div>
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="tempMin" className="text-right">
						Temperature Minimum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="tempMin"
						name="tempMin"
						min={0}
						max={100}
						value={
							currentProfile?.min_temp === 0
								? "0"
								: currentProfile?.min_temp || ""
						}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										min_temp: newValue,
									}));
								}
							}
						}}
					/>
				</div>
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="humdMin" className="text-right">
						Humidity Minimum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="humdMin"
						name="humdMin"
						min={0}
						max={100}
						value={
							currentProfile?.min_humd === 0
								? "0"
								: currentProfile?.min_humd || ""
						}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										min_humd: newValue,
									}));
								}
							}
						}}
					/>
				</div>
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="phMax" className="text-right">
						pH Maximum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="phMax"
						name="phMax"
						min={0}
						max={14}
						value={currentProfile?.max_ph || ""}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										max_ph: newValue,
									}));
								}
							}
						}}
					/>
				</div>
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="tempMax" className="text-right">
						Temperature Maximum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="tempMax"
						name="tempMax"
						min={0}
						max={100}
						value={currentProfile?.max_temp || ""}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										max_temp: newValue,
									}));
								}
							}
						}}
					/>
				</div>
				<div className="flex flex-row gap-2 justify-between">
					<label htmlFor="humdMax" className="text-right">
						Humidity Maximum
					</label>
					<input
						type="number"
						step={0.01}
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="humdMax"
						name="humdMax"
						min={0}
						max={100}
						value={currentProfile?.max_humd || ""}
						onChange={(e) => {
							{
								const newValue = parseFloat(e.target.value);
								if (!isNaN(newValue)) {
									setCurrentProfile((prev) => ({
										...prev!,
										max_humd: newValue,
									}));
								}
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
