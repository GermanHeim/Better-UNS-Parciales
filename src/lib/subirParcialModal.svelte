<script>
	export let parent;
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiUploadCloud from 'svelte-icons-pack/fi/FiUploadCloud';
	let files;

	import { modalStore } from '@skeletonlabs/skeleton';

	function onFormSubmit() {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}
</script>

<div>
	<form class="h-full border border-surface-500 p-4 rounded-container-token">
		<form
			action="?/subir"
			method="POST"
			enctype="multipart/form-data"
			class="items-center space-y-2 w-full"
		>
			<div class="justify-items-center grid grid-cols-2 gap-2">
				<label for="tipo" class="flex flex-col">
					Tipo*
					<select class="form-input px-4 py-2 rounded-lg w-24 md:w-64" name="tipo">
						<option hidden selected disabled>Selecciona una opción</option>
						<option value="parcial">Parcial</option>
						<option value="final regular">Final regular</option>
						<option value="coloquio">Coloquio</option>
						<option value="recuperatorio">Recuperatorio</option>
						<option value="final libre">Final libre</option>
						<option value="resumen">Resumen</option>
						<option value="documento">Documento</option>
					</select>
				</label>
				<label for="numero" class="flex flex-col">
					Número
					<input
						type="number"
						name="numero"
						placeholder="Número de parcial"
						class="form-input px-4 py-2 rounded-lg w-24 md:w-64"
					/>
				</label>
				<label for="profesor" class="flex flex-col">
					Profesor
					<input
						type="text"
						name="profesor"
						placeholder="Nombre del profesor"
						class="form-input px-4 py-2 rounded-lg w-24 md:w-64"
					/>
				</label>

				<label for="fecha" class="flex flex-col">
					Fecha <input
						type="date"
						name="fecha"
						class="form-input px-4 py-2 rounded-lg w-24 md:w-64"
					/></label
				>
			</div>
			<label for="descripcion" class="flex flex-col">
				Descripcion <textarea
					placeholder="Agrega una descripcion del archivo. No es requerido."
					name="descripcion"
					maxlength="128"
					class="form-input px-4 py-2 rounded-lg w-full"
				/></label
			>
			<label for="archivos" class="flex flex-col">
				Archivos*
				<FileDropzone
					id="archivos"
					name="archivos"
					bind:files
					multiple
					accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, image/jpg, image/jpeg, image/png"
					height="h-28 md:h-28"
					title="Suelte archivos o haga clic para seleccionar"
					notes="Los archivos no deben exceder los 5 mb."
				/>
			</label>
			<div class="flex flex-row gap-4 justify-end">
				<button
					class="btn bg-zinc-300 dark:bg-zinc-600 mt-5 flex flex-row w-24 md:w-auto"
					on:click={parent.onClose}
					type="button">Cancelar</button
				>
				<button
					class="btn bg-primary-500 text-white mt-5 flex flex-row gap-3 w-26 md:w-auto"
					on:click={onFormSubmit}><Icon src={FiUploadCloud} size="24" /> Subir parcial</button
				>
			</div>

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
					<p class="ml-2 !text-red-500">Solo se puede subir hasta 5 archivos</p>
				</div>
			{/if}
		</form>
	</form>
</div>
