<script>
	import { goto } from '$app/navigation';
	import data from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';

	let materiasUnique = [];
	data.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});
	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();

	//TODO: Pagination, style
</script>

<div class="">
	{#each materiasUnique as materia}
		<ul>
			<li>
				<button
					class="btn bg-primary-500 btn-lg text-white"
					on:click={() => goto(`/materia/` + str2slug(materia))}>{materia}</button
				>
			</li>
		</ul>
	{/each}
</div>
