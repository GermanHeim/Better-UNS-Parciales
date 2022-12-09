import { error, redirect } from '@sveltejs/kit';
import toast from 'svelte-french-toast';

export const actions = {
	login: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());
		try {
			await locals.pb.collection('users').authWithPassword(body.email, body.password);
			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, 'Algo salió mal al iniciar sesión');
		}
		throw redirect(303, '/');
	}
};