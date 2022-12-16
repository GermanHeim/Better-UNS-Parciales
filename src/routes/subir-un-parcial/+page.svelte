<script>
	import { enhance } from '$app/forms';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { str2slug } from '$lib/utils';
	import data from '$lib/data.json';
	import toast from 'svelte-french-toast'; // I need to check if I need this import, prob not. I don't remember layout
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiUploadCloud from 'svelte-icons-pack/fi/FiUploadCloud';
	let files;
	let loading = false;

	let materiasUnique = [];
	data.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});
	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();

	const submitParcial = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Parcial subido con exito'); // This doesn't work?
					await update();
					break;
				case 'error':
					toast.error('Ocurrio un error al subir el parcial');
					break;
				default:
					await update();
			}
			loading = false;
		};
	};

	$: if (files) {
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > 5000000) {
				loading = true;
			} else {
				loading = false;
			}
		}
	} else if (files && files.length > 5) {
		loading = true;
	} else {
		loading = false;
	}
</script>

<div class="overflow-hidden h-full">
	<div class="flex flex-col h-full  items-center w-full justify-center">
		<div class="w-full card card-body rounded-none p-4 md:w-auto md:rounded-md lg:rounded-xl">
			<div>
				<h1 class="text-center m-4"><strong>Subir un parcial</strong></h1>
				<p class="text-center m-4">
					Sube un parcial para que otros estudiantes puedan verlo y descargarlo.<br />Es
					completamente anonimo.
				</p>
			</div>

			<form
				action="?/subir"
				method="POST"
				enctype="multipart/form-data"
				class="items-center space-y-6 w-full pt-4"
				use:enhance={submitParcial}
			>
				<div class="justify-items-center grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<label for="materia" class="flex flex-col">
						Materia*
						<select class="form-input px-4 py-2 rounded-lg w-72" name="materia">
							{#each materiasUnique as materia}
								<option value={str2slug(materia)}>{materia}</option>
							{/each}
						</select>
					</label>
					<label for="tipo" class="flex flex-col">
						Tipo de evaluación
						<select class="form-input px-4 py-2 rounded-lg w-72" name="tipo">
							<option value="parcial">Parcial</option>
							<option value="final regular">Final regular</option>
							<option value="coloquio">Coloquio</option>
							<option value="recuperatorio">Recuperatorio</option>
							<option value="final libre">Final libre</option>
						</select>
					</label>
					<label for="numero" class="flex flex-col">
						Número
						<input
							type="number"
							name="numero"
							placeholder="Numero de parcial"
							class="form-input px-4 py-2 rounded-lg w-72"
						/>
					</label>
					<label for="profesor" class="flex flex-col">
						Profesor
						<input
							type="text"
							name="profesor"
							placeholder="Nombre del profesor"
							class="form-input px-4 py-2 rounded-lg w-72"
						/>
					</label>

					<label for="fecha" class="flex flex-col">
						Fecha <input
							type="date"
							name="fecha"
							class="form-input px-4 py-2 rounded-lg w-72"
						/></label
					>

					<label for="descripcion" class="flex flex-col">
						Descripcion <textarea
							placeholder="Agrega una descripcion del archivo. No es requerido."
							name="descripcion"
							class="form-input px-4 py-2 rounded-lg w-72"
						/></label
					>
				</div>
				<label for="archivos" class="flex flex-col">
					Archivos*
					<FileDropzone
						id="archivos"
						name="archivos"
						bind:files
						multiple
						accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/jpg, image/jpeg, image/png"
						height="h-44 md:h-28"
						title="Suelte archivos o haga clic para seleccionar"
						notes="Los archivos no deben exceder los 5 mb. Maximo 5 archivos. Tipos de archivos: PDF,
									DOCX, DOC, JPG, JPEG, PNG."
					/>
				</label>

				{#if files && files.length <= 5}
					{#each files as file}
						{#if file.size > 5242880}
							<div class="flex flex-row items-center justify-between">
								<p class="ml-2 !text-red-500">{file.name}</p>
								<p class="ml-2 !text-red-500">{(file.size / 1048576).toFixed(2)} MB</p>
							</div>
						{:else}
							<div class="flex flex-row items-center justify-between">
								<p class="ml-2">{file.name}</p>
								<p class="ml-2">{(file.size / 1048576).toFixed(2)} MB</p>
							</div>
						{/if}
					{/each}
				{/if}
				{#if files && files.length > 5}
					<div class="flex flex-row items-center justify-center">
						<p class="ml-2 !text-red-500">Solo se pueden subir 5 archivos</p>
					</div>
				{/if}

				<button
					type="submit"
					class="btn bg-primary-500 btn-xl text-white w-full mt-5 flex flex-row gap-3"
					disabled={loading}>Subir parcial <Icon src={FiUploadCloud} size="24" /></button
				>
			</form>
		</div>
	</div>
</div>
