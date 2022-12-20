import { error } from '@sveltejs/kit';

export const actions = {
	confirmarContraseña: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').confirmPasswordReset(body);
			return {
				success: true,
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal');
		}
	} 
};