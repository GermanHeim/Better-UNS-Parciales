import { error } from '@sveltejs/kit';
import { getFavoritos } from '$lib/favoritosServices';

export const load = ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'No autorizado');
	}

	return {
		favoritos: getFavoritos(locals)
	};
};

export const actions = {
	desfavorito: async ({ locals, request }) => {
		try {
			const body = await request.formData();
			await locals.pb.collection('favoritos').delete(body.get('favoritoID'));
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};