<script>
	import data from '$lib/data.json';
	import { goto } from '$app/navigation';
	import { str2slug } from '$lib/utils.js';

	//TODO: invert a tag in divs
</script>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each data as carrera}
		<ul>
			<li>
				<div
					class="flex h-24 bg-primary-600 cursor-pointer justify-center items-center text-center rounded-lg hover:bg-primary-500"
					on:click={() => goto(`/carrera/${str2slug(carrera.carrera)}`)}
				>
					<p>{carrera.carrera}</p>
				</div>
			</li>
		</ul>
	{/each}
</div>
