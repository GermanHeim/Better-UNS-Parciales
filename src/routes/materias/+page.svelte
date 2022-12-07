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

	//TODO: Pagination, invert a tag in divs
</script>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each materiasUnique as materia}
		<ul>
			<li>
				<div
					class="flex h-24 bg-primary-600 cursor-pointer justify-center items-center text-center rounded-lg hover:bg-primary-500"
					on:click={() => goto(`/materias/${str2slug(materia)}`)}
				>
					<p>{materia}</p>
				</div>
			</li>
		</ul>
	{/each}
</div>
