import { HttpException } from '@/utils/http-exception';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const catchAllRoutes = (req: Request, _res: Response, _next: NextFunction) => {
	console.error('Route not found:', req.path);
	throw new HttpException(404, 'Route not found');
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	let message = 'Internal server error';
	let error = null;
	let statusCode = 500;
	if (err instanceof HttpException) {
		statusCode = err.status;
		message = err.message;
		error = err.error;
	} else if (err instanceof Error) {
		console.error(err);
		message = err.message;
	} else {
		console.error(err);
	}

	res.status(statusCode).json({ message, error });
};
