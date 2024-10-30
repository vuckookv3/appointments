import { Schema, model } from 'mongoose';

const AppointmentSchema = new Schema({
	patient: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dateStart: {
		type: Date,
		required: true,
	},
	dateEnd: {
		type: Date,
		required: true,
	},
});

const Appointment = model('Appointment', AppointmentSchema);
export default Appointment;
