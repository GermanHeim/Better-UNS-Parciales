<script>
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	let loading = false;

	const submitRequest = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					toast.success('Verificación enviada con éxito', {
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
			<h1 class="text-center m-4"><strong>Reenviar verificación</strong></h1>
			<p class="text-center m-4">Le reenviaremos un correo electrónico para verificar su cuenta</p>
			<form
				action="?/reenviarVerificacion"
				method="POST"
				class="items-center space-y-6 w-full pt-4"
				use:enhance={submitRequest}
			>
				<label for="email" class="flex flex-col">
					Email
					<input
						type="email"
						name="email"
						class="form-input px-4 py-3 rounded-lg w-auto"
						placeholder="johndoe@gmail.com"
						required
						disabled={loading}
					/>
				</label>

				<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full" disabled={loading}
					>Reenviar verificación</button
				>
			</form>
		</div>
	</div>
</div>
