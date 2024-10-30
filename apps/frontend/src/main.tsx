import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Routes } from '@generouted/react-router';
import Providers from '@/providers';

// import './index.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Providers>
			<Routes />
		</Providers>
	</StrictMode>,
);
