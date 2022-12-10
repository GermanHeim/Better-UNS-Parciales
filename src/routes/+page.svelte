<script>
	import data from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';

	//TODO: Fix no-underline not applying (materias y carreras)
</script>

<h2 class="text-center pt-10 pb-5 hidden md:block">
	<strong>Better UNS Parciales</strong>
</h2>

<div class="px-8 py-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
	{#each data as carrera}
		<ul>
			<li>
				<a
					class="transition-all no-underline flex h-24 bg-primary-600 justify-center items-center text-center rounded-lg hover:bg-primary-500"
					href="/carrera/{str2slug(carrera.carrera)}"
				>
					<p class="no-underline">{carrera.carrera}</p>
				</a>
			</li>
		</ul>
	{/each}
</div>
