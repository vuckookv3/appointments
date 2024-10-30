import { Appointment } from '@/models';
import { AppointmentType } from '@/types';
import { HttpException } from '@/utils/http-exception';

class AppointmentService {
	async getAppointments() {
		const now = new Date();
		const appointments = await Appointment.find({ dateStart: { $gte: now } })
			.sort({ dateStart: 1 })
			.exec();
		return appointments;
	}

	async getAppointmentsByDate(date: Date) {
		const dateStart = new Date(date.setHours(0, 0, 0, 0));
		const dateEnd = new Date(date.setHours(23, 59, 59, 999));
		const appointments = await Appointment.find({ dateStart: { $gte: dateStart }, dateEnd: { $lte: dateEnd } })
			.sort({ dateStart: 1 })
			.exec();
		return appointments;
	}

	async createAppointment(appointment: AppointmentType) {
		const data = await this.validateAppointment(appointment);

		const newAppointment = new Appointment(data);
		await newAppointment.save();
		return newAppointment;
	}

	private async validateAppointment(appointment: AppointmentType) {
		// const now = new Date();
		// if (appointment.dateStart < now) throw new HttpException(400, 'Appointment date must be in the future');

		// Check if the duration is a multiple of 30
		if (appointment.duration < 30 && appointment.duration % 30 !== 0) throw new HttpException(400, 'Appointment duration must be a multiple of 30');

		// Check if the appointment is on the same day
		const dateEnd = new Date(appointment.dateStart.getTime() + appointment.duration * 60000);
		if (appointment.dateStart.getDate() !== dateEnd.getDate()) throw new HttpException(400, 'Appointment must be on the same day');

		// Check if the appointment is available
		const existingAppointments = await Appointment.find({
			dateStart: { $lt: dateEnd },
			dateEnd: { $gt: appointment.dateStart },
		}).exec();
		if (existingAppointments.length > 0) throw new HttpException(400, 'Appointment slot already taken');

		const data: AppointmentType = {
			...appointment,
			dateEnd,
		};

		return data;
	}

	async cancelAppointment(id: string) {
		const appointment = await Appointment.findById(id);
		if (!appointment) throw new HttpException(404, 'Appointment not found');
		await appointment.deleteOne();
		return appointment;
	}
}

export default AppointmentService;
