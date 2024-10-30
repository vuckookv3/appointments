import AppointmentController from './appointment.controller';
import Controller from '@/lib/Controller';

const controllers: readonly Controller[] = [new AppointmentController()] as const;

export default controllers;
