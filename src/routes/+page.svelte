<script lang="ts">
	import PrayerCard from '../components/PrayerCard.svelte';
	import SelectDistrict from '../components/SelectDistrict.svelte';
	import { page } from '$app/state';

	const today = new Date();
	const year = today.getFullYear();

	let districts = $derived.by(() => {
		if (page.data.districts) return page.data.districts;
		return [];
	});

	let defaultDistrict = $state(() => {
		if (page.data.districts) {
			return page.data.districts.find((district) => {
				return district?.name == 'Dhaka';
			});
		}
		return {};
	});

	let selectedDistrict = $state.raw({
		...defaultDistrict()
	});

	let calendar = $derived.by(() => {
		if (page.data.prayerSchedule) return page.data.prayerSchedule;
		return [];
	});

	let selectedMonth = $state(() => {
		return calendar[new Date().getMonth()];
	});

	const adjustTime = (timeString, minutes) => {
		if (!timeString || !minutes) return '';
		const [time, amPm] = timeString.split(' ');
		let [hour, minute] = time.split(':').map(Number);

		// Convert PM times to 24-hour format
		if (amPm === 'PM' && hour !== 12) {
			hour += 12;
		}
		if (amPm === 'AM' && hour === 12) {
			hour = 0; // Midnight case
		}

		const date = new Date();
		date.setHours(hour);
		date.setMinutes(minute + minutes);

		return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	};

	let todaysPrayerTimes = $derived.by(() => {
		let prayerTime;
		const date = new Date().getDate();
		const currentMonth = calendar ? calendar[new Date().getMonth()] : undefined;
		if (currentMonth && currentMonth.schedules) {
			prayerTime = currentMonth.schedules.find((sch) => sch.date == date);
			if (selectedDistrict !== null) {
				const adjustments = selectedDistrict?.adjustments;
				if (adjustments) {
					const sehri = adjustTime(prayerTime.sehri, adjustments.suhoor);
					const magrib_iftar = adjustTime(prayerTime.magrib_iftar, adjustments.iftar);
					const asor = adjustTime(prayerTime.asor, adjustments.suhoor);
					const sunrise = adjustTime(prayerTime.sunrise, adjustments.suhoor);
					const isha = adjustTime(prayerTime.isha, adjustments.magrib_iftar);
					prayerTime = {
						...prayerTime,
						sehri,
						magrib_iftar,
						sunrise,
						asor,
						isha
					};
				}
			}
		}
		return prayerTime;
	});

	const setSelectedMonth = (month) => {
		selectedMonth = month;
	};

	const updateDistrict = (district) => {
		selectedDistrict = { ...district };
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-8">
			<SelectDistrict {districts} {updateDistrict} {selectedDistrict}></SelectDistrict>
		</div>
		<div class="text-center mb-8">
			<PrayerCard prayerTime={todaysPrayerTimes}></PrayerCard>
		</div>
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
				Prayer Schedule {year}
			</h1>
			<div class="flex flex-wrap justify-center gap-2 mt-4">
				{#each calendar as month}
					<button
						onclick={() => setSelectedMonth(month)}
						class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${
						selectedMonth()?.monthName === month.monthName
							? 'bg-indigo-600 text-white'
							: 'bg-white text-gray-700 hover:bg-indigo-50'
					}`}>{month.monthName}</button
					>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-xl shadow-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="bg-indigo-600 text-white">
							<th class="px-4 py-3 text-left">Date</th>
							<th class="px-4 py-3 text-left">Sehri</th>
							<th class="px-4 py-3 text-left">Fazr</th>
							<th class="px-4 py-3 text-left">Sunrise</th>
							<th class="px-4 py-3 text-left">Juhoor</th>
							<th class="px-4 py-3 text-left">Asr</th>
							<th class="px-4 py-3 text-left">Magrib/Iftar</th>
							<th class="px-4 py-3 text-left">Isha</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each selectedMonth()?.schedules as time}
							<tr
								class="hover:bg-gray-50 transition-colors {time.date == today.getDate()
									? 'bg-blue-500'
									: ''}"
							>
								<td class="px-4 py-3 font-medium text-gray-900">
									{time.date}
									{selectedMonth()?.monthName}
								</td>
								<td class="px-4 py-3 text-gray-700">{time.sehri}</td>
								<td class="px-4 py-3 text-gray-700">{time.fazr}</td>
								<td class="px-4 py-3 text-gray-700">{time.sunrise}</td>
								<td class="px-4 py-3 text-gray-700">{time.juhoor}</td>
								<td class="px-4 py-3 text-gray-700">{time.asr}</td>
								<td class="px-4 py-3 text-gray-700">{time.magrib_iftar}</td>
								<td class="px-4 py-3 text-gray-700">{time.isha}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="mt-6 text-center text-sm text-gray-600">
			All times are shown in local time. Please verify timings with your local mosque.
		</div>
	</div>
</div>
