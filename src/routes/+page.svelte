<script lang="ts">
	import PrayerCard from '../components/PrayerCard.svelte';
	import SelectDistrict from '../components/SelectDistrict.svelte';
	import { page } from '$app/state';
	import lang from '../lang/lang.json';

	const today = new Date();
	const year = today.getFullYear();

	let districts = $derived.by(() => {
		if (page.data.districts) return page.data.districts;
		return [];
	});

	let defaultDistrict = $derived.by(() => {
		if (page.data.districts) {
			return page.data.districts.find((district) => {
				return district?.name == 'Dhaka';
			});
		}
		return {};
	});

	let selectedDistrict = $state.raw({});

	let calendar = $derived.by(() => {
		if (page.data.prayerSchedule) return page.data.prayerSchedule;
		return [];
	});

	let selectedMonth = $state.raw(() => {
		return calendar[new Date().getMonth()];
	});

	const adjustTime = (timeString, minutes) => {
		if (!timeString) return timeString;
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

		return date.toLocaleTimeString('bn', { hour: 'numeric', minute: 'numeric', hour12: true });
	};

	const getTodaysPrayerTimes = () => {
		const today = new Date().getDate();
		const { adjustments } = selectedDistrict;
		const currentMonth = calendar[new Date().getMonth()]
		const { schedules } = currentMonth;

		const prayerTime = schedules?.find((schedule) => {
			return today == schedule.date;
		});
		if (prayerTime) {
			let adjustedPrayerTime = {};
			Object.keys(prayerTime).forEach((key) => {
				adjustedPrayerTime[key] = renderAdjustedTime(prayerTime[key], key);
			});
			return adjustedPrayerTime;
		}
		return;
	};

	$effect(() => {
		setSelectedMonth(calendar[new Date().getMonth()]);
		updateDistrict(defaultDistrict);
	});

	const setSelectedMonth = (month) => {
		selectedMonth = {
			...month
		};
	};

	const updateDistrict = (district) => {
		selectedDistrict = { ...district };
	};

	const isActiveDate = (monthDate, selectedMonth) => {
		const month = selectedMonth.monthName;
		const currentDate = today.toLocaleString('default', { month: 'long', day: 'numeric' });
		const activeDate = new Date(`${month} ${monthDate.date} ${today.getFullYear()}`).toLocaleString(
			'default',
			{ month: 'long', day: 'numeric' }
		);
		return currentDate == activeDate;
	};
	const renderAdjustedTime = (time, timeOf) => {
		const { adjustments } = selectedDistrict;
		switch (timeOf) {
			case 'sehri':
				return adjustTime(time, adjustments.suhoor);
			case 'fazr':
				return adjustTime(time, adjustments.suhoor);
			case 'sunrise':
				return adjustTime(time, adjustments.suhoor);
			case 'juhoor':
				return adjustTime(time, adjustments.suhoor);
			case 'asr':
				return adjustTime(time, adjustments.suhoor);
			case 'magrib_iftar':
				return adjustTime(time, adjustments.iftar);
			case 'isha':
				return adjustTime(time, adjustments.iftar);
			default:
				return time;
		}
	};

	const getTranslatedMonthName = (monthName) => {
		const lowerCaseMonthName = monthName.toLowerCase();
		return lang?.months[lowerCaseMonthName]?.bn;
	};
</script>

<div class="min-h-screen py-8 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-8">
			<SelectDistrict {districts} {updateDistrict} {selectedDistrict}></SelectDistrict>
		</div>
		<div class="text-center mb-8">
			<PrayerCard prayerTime={getTodaysPrayerTimes()}></PrayerCard>
		</div>
		<div class="text-center mb-8">
			<div class="flex flex-wrap justify-center gap-2 mt-4">
				{#each calendar as month}
					<button
						onclick={() => setSelectedMonth(month)}
						class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${
						selectedMonth?.monthName === month.monthName
							? 'bg-indigo-600 text-white'
							: 'bg-white text-gray-700 hover:bg-indigo-50'
					}`}>{getTranslatedMonthName(month.monthName)}</button
					>
				{/each}
			</div>
		</div>

		<div class="bg-white rounded-xl shadow-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="bg-indigo-600 text-white">
							<th class="px-4 py-3 text-left">{lang.date.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.sehri.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.fazr.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.sunrise.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.juhoor.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.asr.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.magrib_iftar.bn}</th>
							<th class="px-4 py-3 text-left">{lang.prayerTime.isha.bn}</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each selectedMonth?.schedules as time}
							<tr
								class="hover:bg-blue-600 hover:text-white hover:cursor-pointer transition-colors {isActiveDate(
									time,
									selectedMonth
								)
									? 'bg-blue-600 text-white active'
									: 'text-gray-900'}"
							>
								<td class="px-4 py-3 font-medium">
									{time.date}
									{getTranslatedMonthName(selectedMonth?.monthName)}
								</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.sehri, 'sehri')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.fazr, 'fazr')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.sunrise, 'sunrise')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.juhoor, 'juhoor')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.asr, 'asr')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.magrib_iftar, 'magrib_iftar')}</td>
								<td class="px-4 py-3">{renderAdjustedTime(time.isha, 'isha')}</td>
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
