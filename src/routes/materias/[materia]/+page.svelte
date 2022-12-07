<script>
	import { page } from '$app/stores';
	import data from '$lib/data.json';
	import { str2slug } from '$lib/utils.js';

	// Get the name of the materia
	let materia;
	$: {
		const slug = $page.url.pathname.split('/').pop();
		materia = slug.split('-').join(' ');
		materia = materia.replace(/\w\S*/g, function (txt) {
			if (txt.length == 1 && txt != 'i') {
				return txt;
			} else if (
				txt == 'ii' ||
				txt == 'iii' ||
				txt == 'iv' ||
				txt == 'v' ||
				txt == 'vi' ||
				txt == 'vii' ||
				txt == 'viii' ||
				txt == 'ix' ||
				txt == 'x'
			) {
				return txt.toUpperCase();
			} else {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		});
	}
</script>

<svelte:head>
	<title>{materia} - Better UNSParciales</title>
</svelte:head>

<h2 class="text-center pt-10 pb-5">{materia}</h2>
