<script>
	import { modalStore } from '@skeletonlabs/skeleton';
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiSearch from 'svelte-icons-pack/fi/FiSearch';

	// Materias
	let materiasUnique = [];
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});

	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();
	let originalMateriasUnique = [...materiasUnique];

	// Carreras
	let carreras = [];
	data_materias.forEach((carrera) => {
		carreras.push(carrera.carrera);
	});
	let originalCarreras = [...carreras];

	let searchTerm = '';
	let categorias = ['Carreras', 'Materias'];

	function filterList(list) {
		return list.filter((item) => {
			return item
				.toLowerCase()
				.normalize('NFKD')
				.replace(/[^\w\s-]/g, '')
				.includes(searchTerm.toLowerCase());
		});
	}

	function onSearch() {
		materiasUnique = filterList(originalMateriasUnique);
		carreras = filterList(originalCarreras);
		if (materiasUnique.length == 0 && carreras.length == 0) {
			categorias = [];
		} else {
			categorias = ['Carreras', 'Materias'];
		}

		if (searchTerm == '') {
			categorias = ['Carreras', 'Materias'];
			materiasUnique = [];
			data_materias.forEach((carrera) => {
				carrera.materias.forEach((materia) => {
					materiasUnique.push(materia);
				});
			});

			materiasUnique = [...new Set(materiasUnique)];
			materiasUnique.sort();

			// Carreras
			carreras = [];
			data_materias.forEach((carrera) => {
				carreras.push(carrera.carrera);
			});
		}
	}
</script>

<div>
	<header class="flex items-center space-x-4 p-4">
		<Icon src={FiSearch} size="26" />
		<input
			bind:value={searchTerm}
			type="search"
			placeholder="Buscar materias o carreras"
			on:input={onSearch}
		/>
		<button
			class="btn-icon btn-ghost-surface btn-icon-sm"
			on:click={() => {
				modalStore.close();
			}}>✕</button
		>
	</header>
	<hr />
	<div
		class="pr-1 rounded-container-token max-h-[60vh] md:max-h-[75vh] p-4 space-y-4 overflow-y-auto"
	>
		{#each categorias as categoria}
			<div class="space-y-4">
				<strong>{categoria}</strong>
				<nav class="grid grid-cols-1 lg:grid-cols-2 gap-4">
					{#if categoria == 'Carreras'}
						{#each carreras as carrera}
							<a
								class="btn btn-ghost-surface btn-base transition-all dark:hover:bg-zinc-600"
								href="/carrera/{str2slug(carrera)}"
								on:click={() => {
									modalStore.close();
								}}
							>
								{#if carrera.length > 32}
									{carrera.substring(0, 32)}...
								{:else}
									{carrera}
								{/if}
							</a>
						{/each}
					{:else if categoria == 'Materias'}
						{#each materiasUnique as materia}
							<a
								class="btn btn-ghost-surface btn-base transition-all dark:hover:bg-zinc-600"
								href="/materias/{str2slug(materia)}"
								on:click={() => {
									modalStore.close();
								}}
							>
								{#if materia.length > 32}
									{materia.substring(0, 32)}...
								{:else}
									{materia}
								{/if}
							</a>
						{/each}
					{/if}
				</nav>
			</div>
		{/each}
	</div>
</div>
