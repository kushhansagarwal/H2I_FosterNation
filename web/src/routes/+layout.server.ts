import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ request }: RequestEvent) {
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		request as unknown as SessionManager
	); // Boolean: true or false

	let user: {
		family_name: string;
		given_name: string;
		picture: string | null;
		email: string;
		id: string;
	};

	if (isAuthenticated) {
		user = await kindeAuthClient.getUser(request as unknown as SessionManager);
	} else {
		// Need to implement, e.g: redirect user to sign in, etc..
		user = {
			family_name: '',
			given_name: '',
			picture: null,
			email: '',
			id: ''
		};
	}

	return {
		isAuthenticated,
		user
	};
}
