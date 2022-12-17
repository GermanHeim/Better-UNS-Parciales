<script>
	import { page } from '$app/stores';
	import { str2slug } from '$lib/utils.js';
	import data_materias from '$lib/data.json';

	let carrera_actual = '';
	let materias = '';
	const slug = $page.url.pathname.split('/').pop();
	const carrera = data_materias.find((carrera) => str2slug(carrera.carrera) === slug);
	carrera_actual = carrera.carrera;
	materias = carrera.materias;

	export let data;
	let materias_con_archivos = [];
	let materias_sin_archivos = [];
	for (let i = 0; i < data.parciales.length; i++) {
		if (materias.includes(data.parciales[i].materia)) {
			materias_sin_archivos.push(data.parciales[i].materia);
		} else {
			materias_con_archivos.push(data.parciales[i].materia);
		}
	}

	console.log(materias_con_archivos);
</script>

<svelte:head>
	<title>{carrera_actual} - Better UNS Parciales</title>
	<meta property="og:title" content="{carrera_actual} - Better UNS Parciales" />
</svelte:head>

<h2 class="text-center pt-10 pb-5"><strong>{carrera_actual}</strong></h2>

<ul class="px-8 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each materias as materia}
		{#if materias_con_archivos.includes(str2slug(materia))}
			<a
				class="transition-all !no-underline flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
				href="/materias/{str2slug(materia)}"
			>
				<p class="!text-white">{materia}</p>
			</a>
		{:else}
			<a
				class="transition-all !no-underline flex h-24 bg-zinc-300 dark:bg-zinc-800 justify-center items-center text-center rounded-lg hover:dark:bg-zinc-700"
				href="/materias/{str2slug(materia)}"
			>
				<p class="!text-zinc-600 dark:!text-zinc-400">{materia}</p>
			</a>
		{/if}
	{/each}
</ul>
