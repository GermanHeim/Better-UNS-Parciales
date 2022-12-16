<!-- TODO: Progresive forms -->

<div class="flex flex-col h-full items-center w-full justify-center">
	<div
		class="flex flex-col w-full h-full card card-body rounded-none p-10 md:p-4 md:h-auto md:w-auto md:rounded-md lg:rounded-xl"
	>
		<div class="m-auto">
			<h1 class="text-center m-4"><strong>Recuperar contraseña</strong></h1>
			<p class="text-center m-4">
				Le enviaremos un correo electrónico para restablecer su contraseña.
			</p>
			<form
				action="?/restablecerContraseña"
				method="POST"
				class="items-center space-y-6 w-full pt-4"
			>
				<label for="email" class="flex flex-col">
					Email
					<input
						type="email"
						name="email"
						class="form-input px-4 py-3 rounded-lg w-auto"
						placeholder="johndoe@gmail.com"
						required
					/>
				</label>

				<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full"
					>Recuperar contraseña</button
				>
			</form>
		</div>
	</div>
</div>
