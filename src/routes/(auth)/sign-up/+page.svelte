<!-- TODO: Logica de confirmar contraseña -->

<div class="flex flex-col h-full items-center w-full justify-center">
	<div class="card card-body">
		<h1 class="text-center m-4"><strong>Registrarte</strong></h1>
		<p class="text-center m-4">
			o <a href="/login">inicia sesión</a> si ya tienes una cuenta
		</p>
		<form action="?/signup" method="POST" class="flex flex-col items-center space-y-6 w-full pt-4">
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

			<label for="passwordConfirm" class="flex flex-col">
				Confirmar contraseña
				<input
					type="password"
					name="passwordConfirm"
					class="form-input px-4 py-3 rounded-lg w-96"
					placeholder="****************"
					required
				/>
			</label>

			<button type="submit" class="btn bg-primary-500 btn-xl text-white w-full">Registrarse</button>
		</form>
	</div>
</div>
