import {
	IonPage,
	IonContent,
	IonSpinner,
	IonText
} from '@ionic/react';
import { useEffect } from 'react';
import { supabase } from '../services/SupabaseClient';
import { ProfilesService } from '../services/Profiles';
import type { Profile } from '../models/Profile';

const AuthCallback: React.FC = () => {

	console.log('AuthCallback mounted');

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				// 1. Get session (Supabase already handled Google OAuth)
				const { data, error } = await supabase.auth.getSession();

				console.log('Session Data', JSON.stringify(data));

				if (error || !data.session) {
					console.error('Session error or no session found');
					throw error ?? new Error('No session found');
				}

				const user = data.session.user;

				// console.log('Session User', user);

				// 2. Build domain Profile (camelCase, app-friendly)
				const profile: Profile = {
					id: user.id,
					name: user.user_metadata?.full_name ?? '',
					email: user.email ?? '',
					avatarUrl: user.user_metadata?.avatar_url
				};

				// console.log('Authenticated user:', profile);

				// 3. Persist via service (mapper used internally)
				await ProfilesService.upsert(profile);

				console.log('Profile upserted successfully');

				// 4. Redirect to app shell
				window.location.replace('/today');

			} catch (err) {
				console.error('Error during auth callback handling:', err);
				console.error('Auth callback failed', err);
				// Optional: redirect to login with error state
				window.location.replace('/login');
			}
		};

		handleAuthCallback();
	}, []);

	return (
		<IonPage>
			<IonContent
				fullscreen
				className="ion-padding ion-text-center"
			>
				<IonSpinner name="crescent" />
				<IonText className="ion-margin-top">
					<p>Setting things up…</p>
				</IonText>
			</IonContent>
		</IonPage>
	);
};

export default AuthCallback;
