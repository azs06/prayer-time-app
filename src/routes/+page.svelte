<script lang="ts">
	import { schedule } from '../data/schedule';
	schedule.year = new Date().getFullYear();
	let selectedMonth = schedule.months[new Date().getMonth()];
	const setSelectedMonth = (month) => {
    selectedMonth = month;
  };
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
				Prayer Schedule {schedule.year}
			</h1>
			<div class="flex flex-wrap justify-center gap-2 mt-4">
				{#each schedule.months as month}
					<button
						class={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${
						selectedMonth.name === month.name
							? 'bg-indigo-600 text-white'
							: 'bg-white text-gray-700 hover:bg-indigo-50'
					}`}>{month.name}</button
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
            {#each selectedMonth.schedule  as time }
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3 font-medium text-gray-900">
                {time.date} {selectedMonth.name}
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
