export class HttpException extends Error {
	status: number;
	error?: object;
	constructor(status: number, message: string, error?: object) {
		super(message);
		this.status = status;
		this.error = error;
	}
}
