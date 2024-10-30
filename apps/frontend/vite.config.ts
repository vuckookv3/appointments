import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generouted from '@generouted/react-router/plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), generouted(), tsconfigPaths()],
	server: {
		port: 3001,
		strictPort: true,
	},
	preview: {
		port: 3001,
		strictPort: true,
	},
});
