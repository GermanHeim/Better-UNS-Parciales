import { error, redirect } from '@sveltejs/kit';

export const actions = {
	subir: async ({ request, locals }) => {
        const body = await request.formData();
		try {
			await locals.pb.collection('parciales').create(body);
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
		throw redirect(303, '/materias/' + body.get('materia'));
	}
};