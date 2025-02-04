<script lang="ts">
	import { Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-svelte';
	const defaultPrayerTimes = {
		date: '',
		sehri: '',
		fazr: '',
		juhoor: '',
		asr: '',
		magrib_iftar: '',
		isha: '',
		sunrise: ''
	};

	let { prayerTime = defaultPrayerTimes } = $props();

	const timeSlots = $derived.by(() => {
		return [
			{ name: 'Sehri', time: prayerTime.sehri, icon: Moon },
			{ name: 'Fazr', time: prayerTime.fazr, icon: Sunrise },
			{ name: 'Sunrise', time: prayerTime.sunrise, icon: Sun },
			{ name: 'Juhoor', time: prayerTime.juhoor, icon: Sun },
			{ name: 'Asr', time: prayerTime.asr, icon: Sun },
			{ name: 'Magrib/Iftar', time: prayerTime.magrib_iftar, icon: Sunset },
			{ name: 'Isha', time: prayerTime.isha, icon: Moon }
		];
	});
</script>

<div class="bg-white rounded-xl shadow-lg overflow-hidden">
	<div class="bg-indigo-600 px-6 py-4">
		<div class="flex items-center gap-2">
			<Clock className="w-6 h-6 text-indigo-100" />
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
		{#each timeSlots as { name, time, icon: Icon }}
			<div
				class="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-indigo-50 transition-colors"
			>
				<div class="flex items-center gap-3">
					<Icon class="w-5 h-5 text-indigo-600" />
					<span class="font-medium text-gray-700">{name}</span>
				</div>
				<span class="text-gray-900">{time}</span>
			</div>
		{/each}
	</div>
</div>
