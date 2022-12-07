<script>
	import { goto } from '$app/navigation';
	import data_materias from '$lib/materias.json';

	//TODO: Pagination
</script>

<!-- Generate a button for each materia inside data_materias and, on click, goto data_materias's slug that is stored inside the json -->
{#each data_materias as materias}
	<button class="btn btn-primary" on:click={() => goto(materias.slug)}>
		{materias.materia}
	</button>
{/each}
