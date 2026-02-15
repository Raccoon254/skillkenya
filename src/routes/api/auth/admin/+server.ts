import { json } from '@sveltejs/kit';
import { ADMIN_PASSWORD } from '$env/static/private';

export async function POST({ request, cookies }) {
	try {
		const { sequence } = await request.json();

		if (!sequence || !Array.isArray(sequence)) {
			return json({ success: false, message: 'Invalid sequence format' }, { status: 400 });
		}

		// Convert the sequence array to the password format
		// Expected format example: "shift+shift+shift+command"
		const submittedPassword = sequence.join('+');

		if (submittedPassword === ADMIN_PASSWORD) {
			// Set a session cookie
			cookies.set('admin_session', 'authenticated', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 // 1 day
			});

			return json({ success: true });
		} else {
			return json({ success: false, message: 'Incorrect password' }, { status: 401 });
		}
	} catch (err) {
		console.error('Admin auth error:', err);
		return json({ success: false, message: 'Server error' }, { status: 500 });
	}
}
