export const prerender = true;
export const load = async ({ fetch }) => {
	const CALENDAR_API_URL = import.meta.env.VITE_API_URL + 'permanent-prayer-times';

	const response = await fetch(CALENDAR_API_URL);
	const data = await response.json();

	if (!response.ok) {
		throw new Error('Failed to load data');
	}

	return {
		prayerSchedule: data
	};
};
