<script>
	import { page } from '$app/stores';
</script>

{#if $page}
	<div class="w-full h-full flex justify-center items-center">
		<div class="text-center space-y-4">
			<h2>{$page.status}: {$page.error.message}</h2>
			<p>Lo sentimos. Algo salió mal.</p>
		</div>
	</div>
{/if}
