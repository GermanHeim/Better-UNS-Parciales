<script>
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	import { Paginator } from '@skeletonlabs/skeleton';

	let materiasUnique = [];
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});
	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();

	let page = {
		offset: 0,
		limit: 50,
		size: materiasUnique.length,
		amounts: [25, 50, 100, materiasUnique.length]
	};

	$: materiasSliced = materiasUnique.slice(
		page.offset * page.limit,
		page.offset * page.limit + page.limit
	);
</script>

<h2 class="text-center pt-10 pb-5">Materias</h2>

<ul class="px-8 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each materiasSliced as materia}
		<li>
			<a
				class="transition-all !no-underline flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
				href="/materias/{str2slug(materia)}"
			>
				<p class="!text-white">{materia}</p>
			</a>
		</li>
	{/each}
</ul>

<div class="col-span-2 card p-4 space-y-4 rounded-none">
	<Paginator bind:settings={page} />
</div>
