<script>
	import data from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	let screenWidth = 0;
</script>

<svelte:window bind:innerWidth={screenWidth} />

<h2 class="text-center pt-8 pb-4 hidden md:block">
	<strong>Better UNS Parciales</strong>
</h2>

<ul class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each data as carrera}
		<li>
			{#if carrera.carrera.length > 35 && screenWidth < 768}
				<a
					class="!no-underline text-white transition-all flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
					href="/carrera/{str2slug(carrera.carrera)}"
					title={carrera.carrera}
				>
					<p class="!text-white">{carrera.carrera.substring(0, 35)}...</p>
				</a>
			{:else}
				<a
					class="!no-underline text-white transition-all flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
					href="/carrera/{str2slug(carrera.carrera)}"
				>
					<p class="!text-white">{carrera.carrera}</p>
				</a>
			{/if}
		</li>
	{/each}
</ul>
