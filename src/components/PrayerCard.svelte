<script lang="ts">
	import { Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-svelte';
	import lang from "../lang/lang.json"
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
			{ name: lang.prayerTime.sehri.bn, time: prayerTime.sehri, icon: Moon },
			{ name: lang.prayerTime.fazr.bn, time: prayerTime.fazr, icon: Sunrise },
			{ name: lang.prayerTime.sunrise.bn, time: prayerTime.sunrise, icon: Sun },
			{ name: lang.prayerTime.juhoor.bn, time: prayerTime.juhoor, icon: Sun },
			{ name: lang.prayerTime.asr.bn, time: prayerTime.asr, icon: Sun },
			{ name: lang.prayerTime.magrib_iftar.bn, time: prayerTime.magrib_iftar, icon: Sunset },
			{ name: lang.prayerTime.isha.bn, time: prayerTime.isha, icon: Moon }
		];
	});
</script>

<div class="bg-white rounded-xl shadow-lg overflow-hidden">
	<div class="bg-indigo-600 px-6 py-4">
		<div class="flex items-center gap-2 text-white font-bold">
			<Clock className="w-6 h-6" /> {lang.cardHeading.bn}
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
