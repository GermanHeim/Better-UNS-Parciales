<script>
	import { page } from '$app/stores';
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	import { pocketbase_url } from '$lib/utils.js';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';
	import toast from 'svelte-french-toast';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiDownload from 'svelte-icons-pack/fi/FiDownload';
	import FiBookmark from 'svelte-icons-pack/fi/FiBookmark';

	let materia_actual;
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			if (str2slug(materia) == $page.params.materia) {
				return (materia_actual = materia);
			}
		});
	});

	function formatDate(date) {
		var dateArr = date.split('-');
		var day = parseInt(dateArr[2]);
		var month = parseInt(dateArr[1]) - 1;
		var year = parseInt(dateArr[0]);
		var d = new Date(year, month, day);
		day = '' + d.getDate();
		month = '' + (d.getMonth() + 1);
		if (day.length < 2) day = '0' + day;
		if (month.length < 2) month = '0' + month;

		return [day, month, year].join('/');
	}

	export let data;

	$: isFavorito = (parcialID) => {
		if (data.favoritos) {
			for (let i = 0; i < data.favoritos.length; i++) {
				if (data.favoritos[i].parcial == parcialID) {
					return true;
				}
			}
		}
	};

	const saveZip = (urls) => {
		if (!urls) return;
		urls = urls.map(
			(url) => `${pocketbase_url}/api/files/parciales/${data.parciales[0].id}/${url}`
		);

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

	import { modalStore } from '@skeletonlabs/skeleton';
	import subirParcialModal from '$lib/subirParcialModal.svelte';

	function modalComponentForm() {
		const c = { ref: subirParcialModal };
		const d = {
			type: 'component',
			title: 'Subir un archivo a ' + materia_actual,
			component: c
		};
		modalStore.trigger(d);
	}

	function getFavoritoID(parcialID) {
		for (let i = 0; i < data.favoritos.length; i++) {
			if (data.favoritos[i].parcial == parcialID) {
				return data.favoritos[i].id;
			}
		}
	}
</script>

<svelte:head>
	<title>{materia_actual} - Better UNS Parciales</title>
	<meta property="og:title" content="{materia_actual} - Better UNS Parciales" />
</svelte:head>

{#if data.parciales.length != 0}
	<form action="?/favorito" method="POST" />
	<h2 class="text-center pt-7 pb-3"><strong>{materia_actual}</strong></h2>
	<div class="px-8 py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
		{#each data.parciales as parcial, i}
			<div class="card card-body p-4 flex flex-col justify-between">
				{#if parcial.numero}
					{#if parcial.tipo}
						<h3 class="capitalize text-center pb-4">
							<strong>{parcial.tipo} N° {parcial.numero}</strong>
						</h3>
					{/if}
				{:else if parcial.tipo}
					<h3 class="capitalize text-center pb-4"><strong>{parcial.tipo}</strong></h3>
				{:else}
					<h3 class="capitalize text-center pb-4"><strong>Documento</strong></h3>
				{/if}
				<div class="bg-gray-800 rounded-lg p-6 bg-opacity-80">
					<div>
						{#if parcial.profesor}
							<div
								class="flex flex-row justify-between border-b border-gray-400 dark:border-gray-700 space-x-7"
							>
								<p class="text-sm !text-gray-100">Profesor</p>
								<p class="capitalize !text-gray-100 text-end">
									{parcial.profesor}
								</p>
							</div>
						{/if}
						{#if parcial.tipo}
							<div
								class="flex flex-row justify-between border-b  border-gray-400 dark:border-gray-700 space-x-7"
							>
								<p class="text-sm !text-gray-100">Tipo</p>
								<p class="capitalize !text-gray-100 text-end">
									{parcial.tipo}
								</p>
							</div>
						{/if}
						{#if parcial.fecha}
							<div
								class="flex flex-row justify-between border-b  border-gray-400 dark:border-gray-700 space-x-7"
							>
								<p class="text-sm !text-gray-100">Fecha</p>
								<p class="capitalize !text-gray-100 text-end">
									{formatDate(parcial.fecha)}
								</p>
							</div>
						{/if}
						{#if parcial.archivos.length > 1}
							<div
								class="flex flex-row justify-between border-b  border-gray-400 dark:border-gray-700 space-x-7"
							>
								<p class="text-sm !text-gray-100">Archivos</p>
								<p class="text-sm !text-gray-100 text-end">{parcial.archivos.length}</p>
							</div>
						{/if}
						{#if parcial.descripcion}
							<div
								class="flex flex-row justify-between border-b  border-gray-400 dark:border-gray-700 space-x-7"
							>
								<p class="text-sm !text-gray-100">Descripción</p>
								<p class="!text-gray-100 text-end">
									{parcial.descripcion}
								</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="flex flex-col">
					{#if parcial.archivos.length > 1}
						<button
							class="btn bg-primary-500 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							on:click={() => {
								saveZip(parcial.archivos);
							}}
						>
							<Icon src={FiDownload} /> Descargar ZIP
						</button>
					{:else}
						<a
							class="btn bg-primary-500 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							href="{pocketbase_url}/api/files/parciales/{parcial.id}/{parcial.archivos}"
							target="_blank"
							rel="noreferrer"
							download
						>
							<Icon src={FiDownload} /> Descargar
						</a>
					{/if}

					{#if isFavorito(data.parciales[i].id) && data.user}
						<button
							class="btn bg-gray-600 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							on:click={() => {
								if (data.user) {
									let favoritoID = getFavoritoID(data.parciales[i].id);
									let input = document.createElement('input');
									input.type = 'hidden';
									input.name = 'favoritoID';
									input.value = favoritoID;
									document.querySelector(`form`).appendChild(input);
									document.querySelector(`form`).submit();
									toast.success('Parcial eliminado de favoritos', {
										position: 'bottom-center'
									});
								} else {
									toast.error('Ocurrio un error al eliminar el parcial de favoritos', {
										position: 'bottom-center'
									});
								}
							}}
						>
							<Icon src={FiBookmark} className="filled" /> Quitar de favoritos
						</button>
					{:else}
						<button
							class="btn bg-gray-600 btn-xl text-white w-full mt-5 flex flex-row gap-3"
							on:click={() => {
								if (data.user) {
									let parcialID = data.parciales[i].id;
									let input = document.createElement('input');
									input.type = 'hidden';
									input.name = 'parcialID';
									input.value = parcialID;
									document.querySelector(`form`).appendChild(input);
									document.querySelector(`form`).submit();
									toast.success('Guardado en favoritos', {
										position: 'bottom-center'
									});
								} else {
									toast.error('Necesitas iniciar sesión para guardar archivos', {
										position: 'bottom-center'
									});
								}
							}}
						>
							<Icon src={FiBookmark} /> Añadir a favoritos
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="h-screen flex flex-col">
		<h2 class="text-center pt-7 pb-3"><strong>{materia_actual}</strong></h2>
		<div class="px-8 py-5 flex flex-col justify-center items-center pb-40 h-screen">
			<h4 class="pb-4 text-xl text-center">
				Lo sentimos, todavia no contamos con archivos de esta materia 😢
			</h4>
			<p class="text-center !text-xl">
				¿Queres ayudarnos a completar la base de datos? <br />
				Podes subir archivos
				<button
					class="text-primary-500 underline decoration-dotted"
					on:click={() => modalComponentForm()}>acá</button
				> o haciendo click en el + de abajo.
			</p>
		</div>
	</div>
{/if}

<button
	class="fixed bottom-0 right-0 m-5 bg-primary-600 rounded-full w-12 h-12 flex items-center justify-center text-white transition-all hover:bg-primary-500"
	on:click={() => modalComponentForm()}
>
	+
</button>

<style>
	:global(.filled) {
		fill: white;
	}
</style>
