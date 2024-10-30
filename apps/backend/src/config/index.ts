import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

const ENV = cleanEnv(process.env, {
	NODE_ENV: str({
		choices: ['development', 'production'],
		default: 'development',
	}),
	PORT: port({ default: 3000 }),
	MONGODB_URL: str({ default: 'mongodb://localhost:27017/deversity' }),
});

export default ENV;
