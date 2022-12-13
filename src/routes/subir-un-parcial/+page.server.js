import { error, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';

export const actions = {
	subir: async ({ request, locals }) => {
        const body = await request.formData();
        const archivos = body.get('files');
        body.append('archivos', archivos);
		try {
			await locals.pb.collection('parciales').create(serialize(body)); // This doesn't work, files get upload like objects for some reason
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};