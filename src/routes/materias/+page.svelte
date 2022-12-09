<script>
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';

	let materiasUnique = [];
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});
	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();

	//TODO: Pagination
</script>

<h2 class="text-center pt-10 pb-5">Materias</h2>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each materiasUnique as materia}
		<ul>
			<li>
				<a
					class="transition-all no-underline flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
					href="/materias/{str2slug(materia)}"
				>
					<p>{materia}</p>
				</a>
			</li>
		</ul>
	{/each}
</div>
