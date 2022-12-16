<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../theme.postcss';
	import '../app.postcss';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	// Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiUserPlus from 'svelte-icons-pack/fi/FiUserPlus';
	import FiGithub from 'svelte-icons-pack/fi/FiGithub';
	import FiLogIn from 'svelte-icons-pack/fi/FiLogIn';
	import FiHome from 'svelte-icons-pack/fi/FiHome';
	import FiMenu from 'svelte-icons-pack/fi/FiMenu';
	import FiLogOut from 'svelte-icons-pack/fi/FiLogOut';
	import FiArchive from 'svelte-icons-pack/fi/FiArchive';
	import FiUploadCloud from 'svelte-icons-pack/fi/FiUploadCloud';
	import FiSearch from 'svelte-icons-pack/fi/FiSearch';

	// Skeleton Features
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { drawerStore } from '@skeletonlabs/skeleton';

	// Stylesheets
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	function drawerOpen() {
		drawerStore.open({});
	}
	function drawerClose() {
		drawerStore.close();
	}

	import { page } from '$app/stores';

	const storeValue = writable(1);
	export let data;
	import { Toaster } from 'svelte-french-toast';
	function setNavValue(c) {
		storeValue.set(c);
	}

	$: setNavValue($page.url.pathname.split('/')[1]);
	$: if ($page.url.pathname.split('/')[1] == '') {
		setNavValue('home');
	}
	$: if ($page.url.pathname.split('/')[1] == 'carrera') {
		setNavValue('home');
	}

	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import buscarModal from '$lib/buscarModal.svelte';

	function triggerSearch() {
		const c = { ref: buscarModal };
		const d = {
			type: 'component',
			component: c
		};
		modalStore.trigger(d);
	}

	// TODO: Add logic to search button in both mobile and desktop
</script>

<Toaster />
<Modal />
<Drawer class="backdrop-blur-sm" width="w-96">
	<h2 class="p-4"><strong>Navegación</strong></h2>
	<hr />
	<nav class="list-nav p-4">
		<ul>
			<li><a href="/" on:click={drawerClose}>Inicio</a></li>
			{#if !data.user}
				<li><a href="/login" on:click={drawerClose}>Iniciar Sesion</a></li>
				<li><a href="/sign-up" on:click={drawerClose}>Registrarse</a></li>
			{:else}
				<li><a href="/log-out" on:click={drawerClose}>Cerrar sesión</a></li>
			{/if}
			<li><a on:click={drawerClose} on:click={() => triggerSearch()}>Buscar</a></li>
			<li><a href="/materia" on:click={drawerClose}>Materias</a></li>
			<li><a href="/subir-un-parcial" on:click={drawerClose}>Subir un parcial</a></li>
			<li>
				<a href="https://github.com/GermanHeim/better-uns-parciales" on:click={drawerClose}
					>GitHub</a
				>
			</li>
		</ul>
	</nav>
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="md:hidden">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<Icon src={FiMenu} />
						</span>
					</button>
					<h1 class="text-xl"><strong>Better UNS Parciales</strong></h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="flex items-center"><LightSwitch /></div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<div class="w-0 md:h-full md:w-auto">
			<AppRail selected={storeValue}>
				<svelte:fragment slot="default">
					<AppRailTile label="Inicio" title="Inicio" value={'home'} on:click={() => goto(`/`)}
						><Icon src={FiHome} size="22" /></AppRailTile
					>
					{#if !data.user}
						<AppRailTile
							label="Iniciar sesion"
							title="Iniciar sesion"
							value={'login'}
							on:click={() => goto(`/login`)}><Icon src={FiLogIn} size="22" /></AppRailTile
						>
						<AppRailTile
							label="Registrarse"
							title="Tile"
							value={'sign-up'}
							on:click={() => goto(`/sign-up`)}><Icon src={FiUserPlus} size="22" /></AppRailTile
						>
					{:else}
						<AppRailTile
							label="Cerrar sesion"
							title="Cerrar sesion"
							on:click={() => goto(`/logout`)}
							><Icon src={FiLogOut} size="22" />
						</AppRailTile>
					{/if}
					<AppRailTile
						label="Buscar"
						title="Buscar"
						value={'buscar'}
						on:click={() => triggerSearch()}><Icon src={FiSearch} size="22" /></AppRailTile
					>
					<AppRailTile
						label="Materias"
						title="Materias"
						value={'materias'}
						on:click={() => goto(`/materias`)}><Icon src={FiArchive} size="22" /></AppRailTile
					>
					<AppRailTile
						label="Subir un parcial"
						title="Subir un parcial"
						value={'subir-un-parcial'}
						on:click={() => goto(`/subir-un-parcial`)}
						><Icon src={FiUploadCloud} size="22" />
					</AppRailTile>
				</svelte:fragment>
				<svelte:fragment slot="trail"
					><AppRailTile title="Lightswitch"><LightSwitch /></AppRailTile>
					<AppRailTile
						label="GitHub"
						title="GitHub"
						on:click={() => goto(`https://github.com/GermanHeim/better-unsparciales`)}
						><Icon src={FiGithub} size="22" /></AppRailTile
					>
				</svelte:fragment>
			</AppRail>
		</div>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
