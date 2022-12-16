import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals, params }) => {
	const getParciales = async (materia) => {
		try {
			const parciales = serializeNonPOJOs(
				await locals.pb.collection('parciales').getFullList(undefined, {
					sort: '-created',
					filter: `materia = "${materia}"`
				})
			);
			return parciales;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		parciales: getParciales(params.materia)
	};
};

export const actions = {
	subir: async ({ request, params, locals }) => {
        const body = await request.formData();
		body.append('materia', params.materia);
		try {
			await locals.pb.collection('parciales').create(body);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};