import { supabase } from './SupabaseClient';

export const signInWithGoogle = async () => {
	console.log('Signing in with Google');
	await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${window.location.origin}/callback`
			// redirectTo: `app.couplia://auth/callback`
		}
	});
};

export const signOut = async () => {
	await supabase.auth.signOut();
};
