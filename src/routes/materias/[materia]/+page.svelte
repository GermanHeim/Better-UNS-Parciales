<script>
	import { page } from '$app/stores';
	import data_materias from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';
	import { pocketbase_url } from '$lib/utils.js';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiDownload from 'svelte-icons-pack/fi/FiDownload';

	let materia_actual;
	data_materias.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			if (str2slug(materia) == $page.params.materia) {
				return (materia_actual = materia);
			}
		});
	});

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [day, month, year].join('/');
	}

	export let data;

	const saveZip = (urls) => {
		if (!urls) return;

		const zip = new JSZip();
		const folder = zip.folder('parcial');

		urls.forEach((url) => {
			const blobPromise = fetch(url).then((r) => {
				if (r.status === 200) return r.blob();
				return Promise.reject(new Error(r.statusText));
			});
			const name = url.substring(url.lastIndexOf('/') + 1);
			folder.file(name, blobPromise);
		});

		zip.generateAsync({ type: 'blob' }).then((blob) => saveAs(blob, 'parcial.zip'));
	};

	import { modalStore } from '@skeletonlabs/skeleton';
	import subirParcialModal from '$lib/subirParcialModal.svelte';

	function modalComponentForm() {
		const c = { ref: subirParcialModal };
		const d = {
			type: 'component',
			title: 'Subir un archivo a ' + materia_actual,
			body: 'Complete el formulario para subir archivos a la materia.',
			component: c
		};
		modalStore.trigger(d);
	}
</script>

<svelte:head>
	<title>{materia_actual} - Better UNS Parciales</title>
	<meta property="og:title" content="{materia_actual} - Better UNS Parciales" />
</svelte:head>

<h3 class="text-center pt-10 pb-5"><strong>{materia_actual}</strong></h3>
{#if data.parciales.length != 0}
	<div class="px-8 py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each data.parciales as parcial}
			<div class="card card-body p-4">
				{#if parcial.numero != 0}
					{#if parcial.tipo != 0}
						<h3 class="capitalize text-center pb-4">
							<strong>{parcial.tipo} N° {parcial.numero}</strong>
						</h3>
					{/if}
				{:else if parcial.tipo != 0}
					<h3 class="capitalize text-center pb-4"><strong>{parcial.tipo}</strong></h3>
				{:else}
					<h3 class="capitalize text-center pb-4"><strong>Documento</strong></h3>
				{/if}
				<div class="grid grid-cols-2 gap-y-4">
					<div>
						{#if parcial.profesor != 0}
							<p class="text-sm text-gray-500">Profesor</p>
						{/if}
						{#if parcial.tipo != 0}
							<p class="text-sm text-gray-500">Tipo</p>
						{/if}
						{#if parcial.fecha != 0}
							<p class="text-sm text-gray-500">Fecha</p>
						{/if}
						{#if parcial.archivos.length > 1}
							<p class="text-sm text-gray-500">Archivos</p>
						{/if}
					</div>
					<div class="justify-self-end text-right">
						<p class="capitalize text-gray-500">
							{parcial.profesor}
						</p>
						<p class="capitalize text-sm text-gray-500">{parcial.tipo}</p>
						{#if parcial.fecha != 0}
							<p class="text-sm text-gray-500">{formatDate(parcial.fecha)}</p>
						{/if}
						{#if parcial.archivos.length > 1}
							<p class="text-sm text-gray-500">{parcial.archivos.length}</p>
						{/if}
					</div>
				</div>

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
						Descargar <Icon src={FiDownload} />
					</a>
				{/if}
			</div>
		{/each}
	</div>
{:else}
	<div class="px-8 py-5">
		<h3 class="text-center pb-4">
			Lo sentimos, todavia no contamos con archivos de esta materia 😢
		</h3>
		<p class="text-center">
			¿Queres ayudarnos a completar la base de datos? <br />
			Podes subir archivos
			<button
				class="text-primary-500 underline decoration-dotted"
				on:click={() => modalComponentForm()}>aca</button
			> o haciendo click en el + de abajo.
		</p>
	</div>
{/if}

<button
	class="fixed bottom-0 right-0 m-5 bg-primary-600 rounded-full w-12 h-12 flex items-center justify-center text-white transition-all hover:bg-primary-500"
	on:click={() => modalComponentForm()}
>
	<!-- TODO: Add modal logic to upload a file without needing to add the materia itself (gotten from url)-->
	+
</button>
