import { z } from 'zod';

export const AppointmentSchema = z.object({
	patient: z.string(),
	duration: z.number(),
	description: z.string(),
	dateStart: z.coerce.date(),
	dateEnd: z.coerce.date().optional(),
});

export type AppointmentType = z.infer<typeof AppointmentSchema>;
