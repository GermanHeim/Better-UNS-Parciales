import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
import { materia_actual } from "./+page.svelte"; // This goes to undefined, I need to use await?


export const load = ({ locals }) => {
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
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		parciales: getParciales("Fisica I") // Hardcoded for now, should be materia_actual :(
	};
};