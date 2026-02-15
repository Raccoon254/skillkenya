
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const session = cookies.get('admin_session');
	
	return {
		isAuthenticated: session === 'authenticated'
	};
};
