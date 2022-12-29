import { redirect, error } from '@sveltejs/kit';

export const GET = ({ locals, params }) => {
    const token = params.token;
    try {
        locals.pb.collection('users').confirmVerification(token);
    } catch(err) {
        console.log('Error: ', err);
        throw error(500, 'Algo salió mal');
    }
    throw redirect(303, '/login');
};