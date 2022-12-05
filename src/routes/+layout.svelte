<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../theme.postcss';
	import '../app.postcss';
	import { writable } from 'svelte/store';

	import { page } from '$app/stores';
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

	// Reactive Properties
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
</script>

<Drawer open={storeDrawer} position="left">
	<h2 class="p-4">Navigation</h2>
	<hr />
	<Navigation />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 {classesSidebarLeft}">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="md:hidden">
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<!-- TODO: Change SVG to a nicer one -->
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<h1 class="text-xl"><strong>Better UNSParciales</strong></h1>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Left Sidebar Slot -->
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<AppRail class="h-0 w-0 md:h-full" selected={storeValue}>
		<svelte:fragment slot="default">
			<AppRailTile label="Inicio" title="Tile" value={1}>(icon)</AppRailTile>
			<AppRailTile label="Iniciar sesion" title="Tile" value={2}>(icon)</AppRailTile>
			<AppRailTile label="Registrarse" title="Tile" value={3}>(icon)</AppRailTile>
			<AppRailTile label="GitHub" title="Tile" value={4}>(icon)</AppRailTile>
			<AppRailTile label="Contacto" title="Tile" value={4}>(icon)</AppRailTile>
		</svelte:fragment>
	</AppRail>
	<!-- Page Route Content -->
	<slot />
</AppShell>
