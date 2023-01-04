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