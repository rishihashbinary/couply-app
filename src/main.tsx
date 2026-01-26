import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('🔥 main.tsx loaded');

// CapacitorApp.getLaunchUrl().then((launchData) => {
// 	if (launchData && launchData.url) {
// 		const { url } = launchData;
// 		console.log('🚀 LAUNCH URL (EARLY):', url);

// 		if (url.includes('auth/callback')) {
// 			localStorage.setItem('__deep_link__', url);
// 		}
// 	}
// });

// CapacitorApp.addListener('appUrlOpen', (event) => {
// 	console.log('🔥 appUrlOpen (EARLY):', event.url);
// 	localStorage.setItem('__deep_link__', event.url);
// });

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);