import { Props } from "../Settings";

export default function Interval({ currentProfile, setCurrentProfile }: Props) {
	return (
		<div className="flex flex-col items-center justify-between text-darkGreen h-full">
			<h3 className="text-2xl m-2">Sampling Rates</h3>
			<div className="grid grid-cols-2 gap-y-4 gap-x-2">
				<label htmlFor="phInterval" className="text-right">
					pH Interval
				</label>
				<div className="flex flex-row gap-1">
					<input
						type="number"
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="phInterval"
						name="phInterval"
						min="5"
						max={Number.MAX_VALUE}
						value={currentProfile?.ph_poll_interval ?? "loading..."}
						onChange={(e) => {
							setCurrentProfile((prev) => ({
								...prev!,
								ph_poll_interval: parseInt(e.target.value),
							}));
						}}
					/>
					<p>seconds</p>
				</div>
				<label htmlFor="dhtInterval" className="text-right">
					DHT Interval
				</label>
				<div className="flex flex-row gap-1">
					<input
						type="number"
						className="border-2 border-darkGreen rounded-md bg-transparent w-20"
						id="dhtInterval"
						name="dhtInterval"
						min="5"
						max={Number.MAX_VALUE}
						value={currentProfile?.dht_poll_interval ?? "loading..."}
						onChange={(e) => {
							setCurrentProfile((prev) => ({
								...prev!,
								dht_poll_interval: parseInt(e.target.value),
							}));
						}}
					/>
					<p>seconds</p>
				</div>
			</div>
		</div>
	);
}
