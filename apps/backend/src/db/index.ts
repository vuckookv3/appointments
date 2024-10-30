import mongoose from 'mongoose';
import ENV from '@/config';

const connectDB = async () => {
	await mongoose
		.connect(ENV.MONGODB_URL)
		.then(() => {
			console.log('Connected to DB!');
		})
		.catch((err) => {
			console.error('Failed to connect to DB:', err);
		});
};

export default connectDB;
