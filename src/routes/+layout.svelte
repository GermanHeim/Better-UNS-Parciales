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

	// Skeleton Features
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { Drawer } from '@skeletonlabs/skeleton';

	// Local Features
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import { storeDrawer } from '$lib/Navigation/stores';

	// Stylesheets
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	function drawerOpen() {
		storeDrawer.set(true);
	}

	const storeValue = writable(1);
	export let data;

	// TODO: Fix the logic of the if statement for the signup button (currently doesnt work lol)
</script>

<Drawer open={storeDrawer} position="left">
	<h2 class="p-4"><strong>Navegación</strong></h2>
	<hr />
	<Navigation />
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
					<h1 class="text-xl"><strong>Better UNSParciales</strong></h1>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<div class="w-0 md:h-full md:w-auto">
			<AppRail selected={storeValue}>
				<svelte:fragment slot="default">
					<AppRailTile label="Inicio" title="Inicio" value={1} on:click={() => goto(`/`)}
						><Icon src={FiHome} size="22" /></AppRailTile
					>
					{#if !data.user}
						<AppRailTile
							label="Iniciar sesion"
							title="Iniciar sesion"
							value={2}
							on:click={() => goto(`/login`)}><Icon src={FiLogIn} size="22" /></AppRailTile
						>
						<AppRailTile
							label="Registrarse"
							title="Tile"
							value={3}
							on:click={() => goto(`/sign-up`)}><Icon src={FiUserPlus} size="22" /></AppRailTile
						>
					{:else}
						<AppRailTile label="Cerrar sesion" title="Cerrar sesion" value={6}
							><Icon src={FiLogOut} size="22" />
						</AppRailTile>
					{/if}
					<AppRailTile
						label="Materias"
						title="Materias"
						value={4}
						on:click={() => goto(`/materias`)}><Icon src={FiArchive} size="22" /></AppRailTile
					>
					<AppRailTile
						label="Subir un parcial"
						title="Subir un parcial"
						value={6}
						on:click={() => goto(`/subir-un-parcial`)}
						><Icon src={FiUploadCloud} size="22" />
					</AppRailTile>
				</svelte:fragment>
				<svelte:fragment slot="trail"
					><AppRailTile
						label="GitHub"
						title="Github"
						value={5}
						on:click={() => goto(`https://github.com/GermanHeim/better-unsparciales`)}
						><Icon src={FiGithub} size="22" /></AppRailTile
					></svelte:fragment
				>
			</AppRail>
		</div>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
