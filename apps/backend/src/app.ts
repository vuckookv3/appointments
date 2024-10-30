import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorHandler, catchAllRoutes } from '@/middlewares/errorHandler';
import controllers from '@/controllers';
import connectDB from '@/db';

const app = express();

connectDB();

app.set('trust proxy', true);
app.use(express.json());

app.use(cors());

for (const controller of controllers) {
	app.use(controller.path, controller.router);
}

app.use(catchAllRoutes);
app.use(errorHandler);

export default app;
