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

		const getFavoritos = async () => {
			if (locals.user) {
				try {
					const favoritos = serializeNonPOJOs(
						await locals.pb.collection('favoritos').getFullList(undefined, {
							sort: '-created',
						})
					);
					return favoritos;
				} catch (err) {
					console.log('Error: ', err);
					throw error(err.status, err.message);
				}
			}
		};

	return {
		parciales: getParciales(params.materia),
		favoritos: getFavoritos(locals.user)
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
	},

	favorito: async ({ locals, request }) => {
		try {
			const body = await request.formData();
			const favoritoID = body.get('favoritoID');
			if (favoritoID) {
				await locals.pb.collection('favoritos').delete(favoritoID);
				return;
			}
			const parcial = await locals.pb.collection('parciales').getOne(body.get('parcialID'));
			let data_fav = { user: locals.user.id, parcial: parcial.id };
			await locals.pb.collection('favoritos').create(data_fav);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
};