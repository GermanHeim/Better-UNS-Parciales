<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { str2slug } from '$lib/utils.js';
	import data from '$lib/data.json';

	let carrera_actual = '';
	$: {
		const slug = $page.url.pathname.split('/').pop();
		const carrera = data.find((carrera) => str2slug(carrera.carrera) === slug);
		carrera_actual = carrera.carrera;
	}

	//TODO: Invert a tags in div
</script>

<svelte:head>
	<title>{carrera_actual} - Better UNSParciales</title>
</svelte:head>

<h1 class="text-center pt-10 pb-5">{carrera_actual}</h1>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each data.find((carrera) => str2slug(carrera.carrera) === $page.params.carrera).materias as materia}
		<ul>
			<li>
				<!-- Create a div with an a tag with the respective href -->
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
