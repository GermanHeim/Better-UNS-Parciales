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
</script>

<svelte:head>
	<title>{carrera_actual} - Better UNSParciales</title>
</svelte:head>

<!-- Titulo de la carrera -->
<h1>{carrera_actual}</h1>

<!-- Botones -->
{#each data as data}
	{#if data.carrera === carrera_actual}
		{#each data.materias as materia}
			<button
				class="btn bg-primary-500 btn-lg text-white"
				on:click={() => goto(`/materias/` + str2slug(materia))}>{materia}</button
			>
		{/each}
	{/if}
{/each}
