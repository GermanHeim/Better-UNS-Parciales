import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const getFavoritos = async (locals) => {
	try {
		let favoritos = serializeNonPOJOs(
			await locals.pb.collection('favoritos').getFullList(undefined, {
				sort: '-created',
				expand: 'parcial'
			})
		);
		return favoritos;
	} catch (err) {
		console.log('Error:', err);
		throw error(500, 'Algo salió mal al recuperar los archivos favoritos');
	}
};

// TODO: See if this works, new has a record
