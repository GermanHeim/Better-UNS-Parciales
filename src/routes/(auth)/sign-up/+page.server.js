import { error, redirect } from '@sveltejs/kit';

export const actions = {
	signup: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').create(body);
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Algo salió mal al registrarse');
		}

		throw redirect(303, '/login');
	}
};