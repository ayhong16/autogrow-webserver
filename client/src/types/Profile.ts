export type ProfileEntry = {
	id: number;
	name: string;
	start_time: string;
	end_time: string;
	ph_poll_interval: number;
	dht_poll_interval: number;
	min_ph: number;
	max_ph: number;
	min_temp: number;
	max_temp: number;
	min_humd: number;
	max_humd: number;
};