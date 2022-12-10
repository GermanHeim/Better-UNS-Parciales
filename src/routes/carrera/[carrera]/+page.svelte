<script>
	import { page } from '$app/stores';
	import { str2slug } from '$lib/utils.js';
	import data from '$lib/data.json';

	let carrera_actual = '';
	$: {
		const slug = $page.url.pathname.split('/').pop();
		const carrera = data.find((carrera) => str2slug(carrera.carrera) === slug);
		carrera_actual = carrera.carrera;
	}
</script>

<svelte:head>
	<title>{carrera_actual} - Better UNS Parciales</title>
</svelte:head>

<h2 class="text-center pt-10 pb-5"><strong>{carrera_actual}</strong></h2>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each data.find((carrera) => str2slug(carrera.carrera) === $page.params.carrera).materias as materia}
		<ul>
			<li>
				<a
					class="transition-all flex h-24 bg-primary-600 cursor-pointer justify-center items-center text-center rounded-lg hover:bg-primary-500"
					href="/materias/{str2slug(materia)}"
				>
					<p>{materia}</p>
				</a>
			</li>
		</ul>
	{/each}
</div>
