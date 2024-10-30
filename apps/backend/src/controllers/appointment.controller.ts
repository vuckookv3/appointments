import { Request, Response } from 'express';
import AppointmentService from '@/services/appointment.service';
import Controller from '@/lib/Controller';
import { AppointmentSchema, AppointmentType } from '@/types';
import { HttpException } from '@/utils/http-exception';
import { isObjectId } from '@/utils/isObjectId';

class AppointmentController extends Controller {
	private appointmentService: AppointmentService;
	public readonly path = '/appointments';

	constructor() {
		super();
		this.appointmentService = new AppointmentService();

		this.initialize();
	}

	protected initializeRoutes() {
		this.router.get('/', this.getAppointments);
		this.router.get('/date', this.getAppointmentsByDate);
		this.router.post('/', this.createAppointment);
		this.router.delete('/:id', this.cancelAppointment);
	}

	getAppointments = async (req: Request, res: Response) => {
		const appointments = await this.appointmentService.getAppointments();
		res.json(appointments);
	};

	getAppointmentsByDate = async (req: Request, res: Response) => {
		const date = req.query.date as string;
		const appointments = await this.appointmentService.getAppointmentsByDate(new Date(date));
		res.json(appointments);
	};

	createAppointment = async (req: Request, res: Response) => {
		const appointment = AppointmentSchema.safeParse(req.body);
		if (!appointment.success) {
			throw new HttpException(400, 'Invalid appointment data', appointment.error.errors);
		}
		const newAppointment = await this.appointmentService.createAppointment(appointment.data);
		res.status(201).json(newAppointment);
	};

	cancelAppointment = async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!isObjectId(id)) throw new HttpException(400, 'Invalid ID');
		const appointment = await this.appointmentService.cancelAppointment(id);
		res.json(appointment);
	};
}

export default AppointmentController;
