import { Router } from 'express';

abstract class Controller {
	public abstract readonly path: string;
	public router: Router;

	constructor() {
		this.router = Router();
	}

	public initialize(): void {
		this.initializeRoutes();
	}
	protected abstract initializeRoutes(): void;
}

export default Controller;
