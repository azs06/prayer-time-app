<script>
	let { children } = $props();
	import '../css/app.css';
	const arabicYear = () => {
		const options = { year: 'numeric' };
		const locales = ['ar-u-ca-islamic', 'ar-u-nu-latn'];
		return Number(new Intl.DateTimeFormat(locales, options).format(Date.now()).slice(0, 4))
			.toLocaleString('bn')
			.replace(',', '');
	};
</script>

<div class="min-h-full">
	<header class="bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				নামাজের সময়সূচী
				{new Date().toLocaleDateString('bn').slice(-4)} (হিজরি
				{arabicYear()})
			</h1>
		</div>
	</header>
	<main>
		<div class="mx-auto px-4 py-6 sm:px-6 lg:px-8">
			{@render children()}
		</div>
	</main>
</div>
