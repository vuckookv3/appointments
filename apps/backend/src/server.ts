import http from 'http';
import app from '@/app';
import ENV from '@/config';

const server = http.createServer(app);

server.listen(ENV.PORT, () => {
	console.log(`Server is running on ${ENV.PORT}`);
});

export default server;
