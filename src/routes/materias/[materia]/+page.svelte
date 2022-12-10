<script>
	import { page } from '$app/stores';
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';

	let materia_actual;
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			if (str2slug(materia) == $page.params.materia) {
				return (materia_actual = materia);
			}
		});
	});

	export let data;
	console.log(data);
	console.log(data.parciales);
</script>

<svelte:head>
	<title>{materia_actual} - Better UNS Parciales</title>
</svelte:head>

<h3 class="text-center pt-10 pb-5">{materia_actual}</h3>
<div>
	<p>hola</p>
</div>
