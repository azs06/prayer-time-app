<script lang="ts">
	let { districts = [], updateDistrict, selectedDistrict } = $props();

	let slectedDistrictState = $state(
		selectedDistrict || (districts?.length > 0 ? districts[0] : null)
	); // Default to first district

	function handleSelect(event: InputEvent) {
		selectedDistrict = districts.find((d) => d.name === event?.target?.value);
		if (typeof updateDistrict === 'function') {
			updateDistrict(selectedDistrict);
		}
	}
</script>

<div class="w-full max-w-md mx-auto">
	<label for="district" class="block text-lg font-medium text-gray-700">Select District:</label>
	<select
		id="district"
		onchange={handleSelect}
		class="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
	>
		{#each districts as district}
			<option value={district.name} selected={district.name === slectedDistrictState?.name}>
				{district.name} ({district.bengali_name})
			</option>
		{/each}
	</select>
</div>
