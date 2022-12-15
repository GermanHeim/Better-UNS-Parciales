import { error, redirect } from '@sveltejs/kit';

export const actions = {
	subir: async ({ request, locals }) => {
        const body = await request.formData();
		try {
			await locals.pb.collection('parciales').create(body); // This doesn't work, files get upload like objects for some reason
		} catch (err) {
			console.log(body);

			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};