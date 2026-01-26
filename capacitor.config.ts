import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'app.couplia',
	appName: 'Couplia',
	webDir: 'dist',
	server: {
		androidScheme: 'https'
	}
};

export default config;
