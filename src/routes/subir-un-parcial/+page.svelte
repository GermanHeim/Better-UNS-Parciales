<script>
	import data from '$lib/data.json';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	let files;

	let materiasUnique = [];
	data.forEach((carrera) => {
		carrera.materias.forEach((materia) => {
			materiasUnique.push(materia);
		});
	});
	materiasUnique = [...new Set(materiasUnique)];
	materiasUnique.sort();

	// TODO: Add logics, better style, change file drop lang
</script>

<div class="overflow-hidden h-full">
	<div class="flex flex-col h-full  items-center w-full justify-center">
		<div class="card card-body">
			<div>
				<h1 class="text-center m-4"><strong>Subir un parcial</strong></h1>
				<p class="text-center m-4">
					Sube un parcial para que otros estudiantes puedan verlo y descargarlo.<br />Es
					completamente anonimo.
				</p>
			</div>

			<form action="?/subir-un-parcial" method="POST" class="items-center space-y-6 w-full pt-4">
				<div class="justify-items-center grid grid-cols-1 md:grid-cols-2 gap-4 ">
					<label for="materia" class="flex flex-col">
						Materia*
						<select class="form-input px-4 py-2 rounded-lg w-72" name="materia">
							{#each materiasUnique as materia}
								<option value={materia}>{materia}</option>
							{/each}
						</select>
					</label>
					<label for="tipo" class="flex flex-col">
						Tipo de evaluación*
						<select class="form-input px-4 py-2 rounded-lg w-72" name="tipo">
							<option value="parcial">Parcial</option>
							<option value="final regular">Final regular</option>
							<option value="coloquio">Coloquio</option>
							<option value="recuperatorio">Recuperatorio</option>
							<option value="final libre">Final libre</option>
						</select>
					</label>
					<label for="numero" class="flex flex-col">
						Número*
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
						bind:files
						multiple
						notes="Los archivos no deben exceder los 5mb.</br>Tipos de archivos: PDF, DOCX, DOC, JPG, JPEG, PNG."
					/>
				</label>

				<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full"
					>Subir parcial</button
				>
			</form>
		</div>
	</div>
</div>
