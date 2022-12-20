import { error } from '@sveltejs/kit';

export const actions = {
	reenviarVerificacion: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestVerification(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal');
		}
	}
};