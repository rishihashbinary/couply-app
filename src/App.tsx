import { Redirect, Route, useHistory } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import {
	IonApp,
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel,
	setupIonicReact,
	useIonRouter
} from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/global.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import AuthRoutes from './routes/AuthRoutes';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';
import AuthCallback from './pages/AuthCallback';
import { useEffect } from 'react';
import { PluginListenerHandle } from '@capacitor/core';
import { supabase } from './services/SupabaseClient';

setupIonicReact();

const App: React.FC = () => {

	const handleUrl = (url?: string) => {
		if (!url) return;

		console.log('🔗 Handling URL:', url);

		if (url.includes('auth/callback')) {
			console.log('✅ Redirecting to /today');
			window.location.replace('/today');
		}
	};




	useEffect(() => {
		console.log('✅ App mounted');

		CapacitorApp.getLaunchUrl().then((result) => {
			const url = result?.url;
			console.log('🚀 Launch URL:', url);
			if (url?.includes('auth/callback')) {
				// window.location.replace('/callback');
				console.log('CapacitorApp.getLaunchUrl() -> auth/callback', url);
			}
		});

		let sub: PluginListenerHandle | undefined;

		CapacitorApp.addListener('appUrlOpen', async (event) => {
			console.log('🔥 appUrlOpen:', JSON.stringify(event));
			console.log('🔥 appUrlOpen Event:', event);
			if (event.url.includes('auth/callback')) {
				console.log('CapacitorApp.addListener() -> auth/callback', event.url);
				// window.location.replace('/callback');
				console.log(`Exchanging code for session... ${event.url}`);
				const hash = event.url.split('#')[1];
				const params = new URLSearchParams(hash);
				console.log(`Access Token: ${params.get('access_token')}`);
				await supabase.auth.setSession({
					access_token: params.get('access_token')!,
					refresh_token: params.get('refresh_token')!
				});
				if (event.url.includes('code=')) {
					console.log('Exchanging code for session via Supabase...');
					await supabase.auth.exchangeCodeForSession(event.url);
				}
				window.location.replace('/callback');
			}
		}).then((listener) => {
			sub = listener;
		});

		return () => {
			sub?.remove();
		};
	}, []);

	const { user, loading } = useAuth();

	if (loading) return null;


	return (
		<IonApp>
			<IonReactRouter>
				<Route exact path="/callback" component={AuthCallback} />
				{!user ? <AuthRoutes /> : <AppRoutes />}
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
