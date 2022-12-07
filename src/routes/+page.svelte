<script>
	import data from '$lib/data.json';
	import { goto } from '$app/navigation';
	import { str2slug } from '$lib/utils.js';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	{#each data as data}
		<ul>
			<li>
				<button
					class="btn bg-primary-500 btn-lg text-white"
					on:click={() => goto(`/carrera/` + str2slug(data.carrera))}>{data.carrera}</button
				>
			</li>
		</ul>
	{/each}
</div>
