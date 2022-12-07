<script>
	// Get the page slug
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import data from '$lib/carreras.json';
</script>

<!-- Titulo de la carrera -->
{#each data as carrera}
	{#if $page.url.pathname == `/carrera/${carrera.slug}`}
		<h1>{carrera.carrera}</h1>
	{/if}
{/each}

<!-- Botones -->
{#each data as carrera}
	{#if $page.url.pathname == `/carrera/${carrera.slug}`}
		{#each carrera.materias as materia}
			<button class="btn bg-primary-500 btn-lg text-white" on:click={() => goto(`/materias/`)}
				>{materia}</button
			>
		{/each}
	{/if}
{/each}
