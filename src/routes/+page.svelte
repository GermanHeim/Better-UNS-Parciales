<script>
	// Import the data.json file and store it in a variable
	import data from '../data.json';
	import { goto } from '$app/navigation';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	{#each data as data}
		<ul>
			<li>
				<button
					class="btn bg-primary-500 btn-lg text-white"
					on:click={() => goto(`/carrera/${data.slug}`)}>{data.carrera}</button
				>
			</li>
		</ul>
	{/each}
</div>
