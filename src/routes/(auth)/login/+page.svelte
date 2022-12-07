<script>
	export let form;
	import { Alert } from '@skeletonlabs/skeleton';
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiAlertCircle from 'svelte-icons-pack/fi/FiAlertCircle';
</script>

<div class="overflow-hidden h-full">
	{#if form?.notVerified}
		<Alert visible="true" class="w-full top-0">
			<svelte:fragment slot="lead"><Icon src={FiAlertCircle} /></svelte:fragment>
			<svelte:fragment slot="title">Error</svelte:fragment>
			<span>Por favor, verifica tu cuenta antes de iniciar sesión</span>
		</Alert>
	{/if}
	<div class="flex flex-col h-full  items-center w-full justify-center">
		<div class="card card-body">
			<h1 class="text-center m-4"><strong>Iniciar sesión</strong></h1>
			<p class="text-center m-4">
				o <a href="/sign-up">registrarte</a> si no tienes una cuenta
			</p>
			<form action="?/login" method="POST" class="flex flex-col items-center space-y-6 w-full pt-4">
				<label for="email" class="flex flex-col">
					Email
					<input
						type="email"
						name="email"
						class="form-input px-4 py-3 rounded-lg w-96"
						placeholder="johndoe@gmail.com"
						required
					/>
				</label>

				<label for="password" class="flex flex-col">
					Contraseña
					<input
						type="password"
						name="password"
						placeholder="****************"
						class="form-input px-4 py-3 rounded-lg w-96"
						required
					/>
				</label>

				<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full"
					>Iniciar sesión</button
				>
			</form>
		</div>
	</div>
</div>
