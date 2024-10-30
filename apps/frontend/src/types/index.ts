import { z } from 'zod';

export const CreateAppointmentFormSchema = z.object({
	patient: z.string().min(1),
	description: z.string().min(1),
	duration: z.coerce.number().min(30),
	dateStart: z.coerce.date(),
	time: z.string().min(1),
});

export const CreateAppointmentSchema = z.object({
	patient: z.string().min(1),
	description: z.string().min(1),
	duration: z.coerce.number().min(30),
	dateStart: z.coerce.date(),
});

export type CreateAppointmentType = z.infer<typeof CreateAppointmentSchema>;

export const AppointmentSchema = z.object({
	_id: z.string(),
	patient: z.string(),
	duration: z.number(),
	description: z.string(),
	dateStart: z.coerce.date(),
	dateEnd: z.coerce.date(),
});

export type AppointmentType = z.infer<typeof AppointmentSchema>;
