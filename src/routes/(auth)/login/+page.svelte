<script>
	export let form;
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';
	let loading = false;

	$: if (form?.notVerified) {
		toast.error('Por favor, verifica tu cuenta antes de iniciar sesión', {
			position: 'bottom-center'
		});
	}

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					break;
				case 'invalid':
					toast.error('Credenciales inválidas', {
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

<div class="overflow-hidden h-full">
	<div class="flex flex-col h-full  items-center w-full justify-center">
		<div
			class="flex flex-col w-full h-full card card-body rounded-none p-10 md:p-4 md:h-auto md:w-auto md:rounded-md lg:rounded-xl"
		>
			<div class="m-auto">
				<h1 class="text-center m-4"><strong>Iniciar sesión</strong></h1>
				<p class="text-center m-4">
					o <a href="/sign-up">registrarte</a> si no tienes una cuenta
				</p>
				<form
					action="?/login"
					method="POST"
					class="flex flex-col items-center space-y-6 w-full pt-4"
					use:enhance={submitLogin}
				>
					<label for="email" class="flex flex-col">
						Email
						<input
							type="email"
							name="email"
							class="form-input px-4 py-3 rounded-lg w-auto md:w-96"
							placeholder="johndoe@gmail.com"
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
							class="form-input px-4 py-3 rounded-lg w-auto md:w-96"
							required
							disabled={loading}
						/>
					</label>

					<button
						type="submit"
						class="btn bg-primary-500 btn-xl text-white w-full"
						disabled={loading}>Iniciar sesión</button
					>
					{#if form?.notVerified}
						<a href="/reenviar-verificacion">Reenviar correo de verificación</a>
					{/if}
					<a href="/restablecer-contraseña">Olvidaste tu contraseña?</a>
				</form>
			</div>
		</div>
	</div>
</div>