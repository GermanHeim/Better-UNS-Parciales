import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export const load = ({ locals, params }) => {
	const getParciales = async (materia_actual) => {
		try {
			const parciales = serializeNonPOJOs(
				await locals.pb.collection('parciales').getFullList(undefined, {
					sort: '-created',
					filter: `materia = '${materia_actual}'`
				})
			);
			return parciales;
		} catch (err) {
			console.log(err);
		}
	};

	return {
		parciales: getParciales("Análisis Matemático I")
	};
};