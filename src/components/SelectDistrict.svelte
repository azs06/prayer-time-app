<script lang="ts">
	let { districts = [], updateDistrict, selectedDistrict } = $props();

	let slectedDistrictState = $state(districts[0]);
	$effect(() => {
		if(selectedDistrict){
			slectedDistrictState = {...selectedDistrict}
		}
	})

	function handleSelect(event: InputEvent) {
		let data = districts.find((d) => d.name === event?.target?.value);
		if (typeof updateDistrict === 'function') {
			updateDistrict(data);
		}
	}
</script>

<div class="w-full max-w-md mx-auto">
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
