<script>
	import { storeDrawer } from '$lib/Navigation/stores';
	function drawerClose() {
		storeDrawer.set(false);
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Inicio</a></li>
		<li><a href="/login" on:click={drawerClose}>Iniciar Sesion</a></li>
		<li><a href="/sign-up" on:click={drawerClose}>Registrarse</a></li>
		<li>
			<a href="https://github.com/GermanHeim/better-unsparciales" on:click={drawerClose}>GitHub</a>
		</li>
		<li><a href="/contacto" on:click={drawerClose}>Contacto</a></li>
	</ul>
</nav>
