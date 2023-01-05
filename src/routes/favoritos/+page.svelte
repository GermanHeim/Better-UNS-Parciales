<script>
	export let data;

	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';
	import { pocketbase_url } from '$lib/utils.js';
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	import toast from 'svelte-french-toast';

	let materias = [];
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			if (!materias.includes(materia)) {
				materias.push(materia);
			}
		});
	});

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiDownload from 'svelte-icons-pack/fi/FiDownload';
	import FiBookmark from 'svelte-icons-pack/fi/FiBookmark';

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [day, month, year].join('/');
	}

	const saveZip = (urls) => {
		if (!urls) return;

		const zip = new JSZip();
		const folder = zip.folder(`parcial-${str2slug(materia_actual)}`);

		urls.forEach((url) => {
			const blobPromise = fetch(url).then((r) => {
				if (r.status === 200) return r.blob();
				return Promise.reject(new Error(r.statusText));
			});
			const name = url.substring(url.lastIndexOf('/') + 1);
			folder.file(name, blobPromise);
		});

		zip
			.generateAsync({ type: 'blob' })
			.then((content) => saveAs(content, `parcial-${str2slug(materia_actual)}.zip`));
	};
</script>

<svelte:head>
	<title>Favoritos - Better UNS Parciales</title>
</svelte:head>

{#if data.favoritos != 0}
	<form action="?/desfavorito" method="POST" />
	<h2 class="text-center pt-7 pb-3"><strong>Favoritos</strong></h2>
	<div class="px-8 py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each data.favoritos as favorito, i}
			<div class="card card-body p-4 h-96 flex flex-col justify-between">
				<a href="/materias/{favorito.expand.parcial.materia}" class="flex flex-row justify-center"
					>{#each materias as materia}
						{#if str2slug(materia) == favorito.expand.parcial.materia} {materia} {/if}
					{/each}</a
				>
				{#if favorito.expand.parcial.numero != 0}
					{#if favorito.expand.parcial.tipo != 0}
						<h3 class="capitalize text-center pb-4">
							<strong>{favorito.expand.parcial.tipo} N° {favorito.expand.parcial.numero}</strong>
						</h3>
					{/if}
				{:else if favorito.expand.parcial.tipo != 0}
					<h3 class="capitalize text-center pb-4">
						<strong>{favorito.expand.parcial.tipo}</strong>
					</h3>
				{:else}
					<h3 class="capitalize text-center pb-4"><strong>Documento</strong></h3>
				{/if}
				<div class="grid grid-cols-2 bg-gray-800 rounded-lg p-6 bg-opacity-80">
					<div>
						{#if favorito.expand.parcial.profesor != 0}
							<p class="text-sm !text-gray-100">Profesor</p>
						{/if}
						{#if favorito.expand.parcial.tipo != 0}
							<p class="text-sm !text-gray-100">Tipo</p>
						{/if}
						{#if favorito.expand.parcial.fecha != 0}
							<p class="text-sm !text-gray-100">Fecha</p>
						{/if}
						{#if favorito.expand.parcial.archivos.length > 1}
							<p class="text-sm !text-gray-100">Archivos</p>
						{/if}
						{#if favorito.expand.parcial.descripcion != 0}
							<p class="text-sm !text-gray-100">Descripción</p>
						{/if}
					</div>
					<div class="justify-self-end text-right">
						<p class="capitalize !text-gray-100">
							{favorito.expand.parcial.profesor}
						</p>
						<p class="capitalize text-sm !text-gray-100">{favorito.expand.parcial.tipo}</p>
						{#if favorito.expand.parcial.fecha != 0}
							<p class="text-sm !text-gray-100">{formatDate(favorito.expand.parcial.fecha)}</p>
						{/if}
						{#if favorito.expand.parcial.archivos.length > 1}
							<p class="text-sm !text-gray-100">{favorito.expand.parcial.archivos.length}</p>
						{/if}
						{#if favorito.expand.parcial.fecha != 0}
							<p class="text-sm !text-white">{favorito.expand.parcial.descripcion}</p>
						{/if}
					</div>
				</div>
				<div class="flex flex-col ">
					{#if favorito.expand.parcial.archivos.length > 1}
						<button
							class="btn bg-primary-500 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							on:click={() => {
								saveZip(favorito.expand.parcial.archivos);
							}}
						>
							<Icon src={FiDownload} /> Descargar ZIP
						</button>
					{:else}
						<a
							class="btn bg-primary-500 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							href="{pocketbase_url}/api/files/parciales/{favorito.expand.parcial.id}/{favorito
								.expand.parcial.archivos}"
							target="_blank"
							rel="noreferrer"
							download
						>
							<Icon src={FiDownload} /> Descargar
						</a>
					{/if}
					<button
						class="btn bg-gray-600 btn-xl text-white w-full mt-5 flex flex-row gap-3"
						on:click={() => {
							let favoritoID = data.favoritos[i].id;
							let input = document.createElement('input');
							input.type = 'hidden';
							input.name = 'favoritoID';
							input.value = favoritoID;
							document.querySelector(`form`).appendChild(input);
							document.querySelector(`form`).submit();
							toast.success('Parcial eliminado de favoritos', {
								position: 'bottom-center'
							});
						}}
					>
						<Icon src={FiBookmark} className="filled" /> Quitar de favoritos
					</button>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="h-screen flex flex-col">
		<h2 class="text-center pt-7 pb-3"><strong>Favoritos</strong></h2>
		<div class="px-8 py-5 flex flex-col justify-center items-center pb-40 h-screen">
			<h3 class="pb-4 text-2xl">Todavía no guardaste ningún parcial como favorito 😢</h3>
		</div>
	</div>
{/if}

<style>
	:global(.filled) {
		fill: white;
	}
</style>
