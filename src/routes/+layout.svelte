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
	import FiBookmark from 'svelte-icons-pack/fi/FiBookmark';

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
	import subirParcialModal from '$lib/subirParcialModal.svelte';

	function triggerSearch() {
		const c = { ref: buscarModal };
		const d = {
			type: 'component',
			component: c
		};
		modalStore.trigger(d);
	}

	function modalComponentForm() {
		const e = { ref: subirParcialModal };
		const g = {
			type: 'component',
			title: 'Subir un archivo a ' + materia_actual,
			component: e
		};
		modalStore.trigger(g);
	}

	let materia_actual;
</script>

<Toaster />
<Modal />
<Drawer class="backdrop-blur-sm" width="w-4/5">
	<div class="absolute top-0 right-[20%] p-4">
		<button class="btn btn-sm" on:click={drawerClose}>
			<span>x</span>
		</button>
	</div>

	<h2 class="p-4"><strong>Navegación</strong></h2>
	<hr />
	<nav class="flex flex-col list-nav p-4">
		<ul>
			<li><a href="/" on:click={drawerClose}>Inicio</a></li>
			{#if !data.user}
				<li><a href="/login" on:click={drawerClose}>Iniciar Sesion</a></li>
				<li><a href="/sign-up" on:click={drawerClose}>Registrarse</a></li>
			{:else}
				<li><a href="/log-out" on:click={drawerClose}>Cerrar sesión</a></li>
				<li><a href="/favoritos" on:click={drawerClose}>Favoritos</a></li>
			{/if}
			<li><a href="/materia" on:click={drawerClose}>Materias</a></li>
			<li><a href="/subir-un-parcial" on:click={drawerClose}>Subir un parcial</a></li>
			<li>
				<a href="https://github.com/GermanHeim/better-uns-parciales" on:click={drawerClose}
					>GitHub</a
				>
			</li>
			<li class="absolute bottom-0 left-3 p-4">
				<LightSwitch />
			</li>
		</ul>
	</nav></Drawer
>

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
					<h1 class="text-lg"><strong>Better UNS Parciales</strong></h1>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn btn-sm bg-zinc-700" on:click={() => triggerSearch()}>
					<span>
						<Icon src={FiSearch} />
					</span>
					<span>Buscar</span>
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<div class="w-0 md:h-full md:w-auto">
			<AppRail selected={storeValue}>
				<svelte:fragment slot="default">
					<AppRailTile
						label="Inicio"
						title="Inicio"
						value={'home'}
						tag="a"
						class="!text-white !no-underline !text-center"
						href="/"><Icon src={FiHome} size="22" /></AppRailTile
					>
					{#if !data.user}
						<AppRailTile
							label="Iniciar sesion"
							title="Iniciar sesion"
							value={'login'}
							tag="a"
							class="!text-white !no-underline !text-center"
							href="/login"
							}><Icon src={FiLogIn} size="22" /></AppRailTile
						>
						<AppRailTile
							label="Registrarse"
							title="Tile"
							value={'sign-up'}
							tag="a"
							class="!text-white !no-underline !text-center"
							href="/sign-up"
							}><Icon src={FiUserPlus} size="22" /></AppRailTile
						>
					{:else}
						<AppRailTile
							label="Cerrar sesion"
							title="Cerrar sesion"
							tag="a"
							class="!text-white !no-underline !text-center"
							href="/logout"
							><Icon src={FiLogOut} size="22" />
						</AppRailTile>
						<AppRailTile
							label="Favoritos"
							title="Favoritos"
							value={'favoritos'}
							tag="a"
							class="!text-white !no-underline !text-center"
							href="/favoritos"
							><Icon src={FiBookmark} size="22" />
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
						tag="a"
						class="!text-white !no-underline !text-center"
						href="/materias"><Icon src={FiArchive} size="22" /></AppRailTile
					>
					{#if $page.url.pathname.includes('materias/')}
						<AppRailTile
							label="Subir un parcial"
							title="Subir un parcial"
							value={'subir-un-parcial'}
							on:click={() => modalComponentForm()}
							><Icon src={FiUploadCloud} size="22" />
						</AppRailTile>
					{:else}
						<AppRailTile
							label="Subir un parcial"
							title="Subir un parcial"
							value={'subir-un-parcial'}
							tag="a"
							class="!text-white !no-underline !text-center"
							href="/subir-un-parcial"
							><Icon src={FiUploadCloud} size="22" />
						</AppRailTile>
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="trail"
					><AppRailTile title="Lightswitch"><LightSwitch /></AppRailTile>
					<AppRailTile
						label="GitHub"
						title="GitHub"
						tag="a"
						class="!text-white !no-underline !text-center"
						href="https://github.com/GermanHeim/Better-UNS-Parciales"
						><Icon src={FiGithub} size="22" /></AppRailTile
					>
				</svelte:fragment>
			</AppRail>
		</div>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
