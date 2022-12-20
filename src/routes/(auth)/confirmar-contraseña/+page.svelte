<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	let loading = false;

	const submitRequest = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Contraseña reestablecida con éxito', {
						position: 'bottom-center'
					});
					await update();
					break;
				case 'error':
					toast.error(result.error.message, {
						position: 'bottom-center'
					});
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
</script>

<div class="flex flex-col h-full items-center w-full justify-center">
	<div
		class="flex flex-col w-full h-full card card-body rounded-none p-10 md:p-4 md:h-auto md:w-auto md:rounded-md lg:rounded-xl"
	>
		<div class="m-auto">
			<h2 class="text-center m-4"><strong>Confirmar cambio de contraseña</strong></h2>
			<p class="text-center m-4">
				Vas a necesitar el codigo de verificación que te enviamos por email
			</p>
			<form
				action="?/confirmarContraseña"
				method="POST"
				class="items-center space-y-6 w-full pt-4"
				use:enhance={submitRequest}
			>
				<label for="token" class="flex flex-col">
					Código de verificación
					<input
						type="text"
						name="token"
						class="form-input px-4 py-3 rounded-lg w-auto md:w-full"
						placeholder="123-456-789"
						required
						disabled={loading}
					/>
				</label>

				<label for="password" class="flex flex-col">
					Contraseña
					<input
						type="password"
						name="password"
						placeholder="****************"
						class="form-input px-4 py-3 rounded-lg w-auto md:w-full"
						required
						disabled={loading}
					/>
				</label>

				<label for="passwordConfirm" class="flex flex-col">
					Confirmar contraseña
					<input
						type="password"
						name="passwordConfirm"
						placeholder="****************"
						class="form-input px-4 py-3 rounded-lg w-auto md:w-full"
						required
						disabled={loading}
					/>
				</label>

				<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full" disabled={loading}
					>Reestablecer contraseña</button
				>
			</form>
		</div>
	</div>
</div>
