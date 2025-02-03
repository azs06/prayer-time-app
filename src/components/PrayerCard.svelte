<script lang="ts">
    import { Clock, Sun, Sunrise, Sunset, Moon } from 'lucide-svelte';
	import { format, parse } from 'date-fns';
	let date = new Date().toDateString();
	const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
	const formattedDate = format(parsedDate, 'EEEE, MMMM d, yyyy');
	const prayerTime = {
		date: '2025-02-03',
		sehri: '5:18 AM',
		fazr: '5:24 AM',
		juhoor: '12:16 PM',
		asr: '4:08 PM',
		magrib_iftar: '5:48 PM',
		isha: '7:04 PM',
		sunrise: '6:39 AM'
	};
	const timeSlots = [
		{ name: 'Sehri', time: prayerTime.sehri, icon: Moon },
		{ name: 'Fazr', time: prayerTime.fazr, icon: Sunrise },
		{ name: 'Sunrise', time: prayerTime.sunrise, icon: Sun },
		{ name: 'Juhoor', time: prayerTime.juhoor, icon: Sun },
		{ name: 'Asr', time: prayerTime.asr, icon: Sun },
		{ name: 'Magrib/Iftar', time: prayerTime.magrib_iftar, icon: Sunset },
		{ name: 'Isha', time: prayerTime.isha, icon: Moon }
	];
</script>

<div class="bg-white rounded-xl shadow-lg overflow-hidden">
	<div class="bg-indigo-600 px-6 py-4">
		<div class="flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-100" />
			<h2 class="text-xl font-semibold text-white">{formattedDate}</h2>
		</div>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {#each timeSlots as {name, time, icon: Icon} }
            <div class="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-indigo-50 transition-colors">
				<div class="flex items-center gap-3">
					<Icon class="w-5 h-5 text-indigo-600" />
					<span class="font-medium text-gray-700">{name}</span>
				</div>
				<span class="text-gray-900">{time}</span>
            </div>
        {/each}
	</div>
</div>
