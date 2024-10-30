import { AppointmentType, CreateAppointmentType } from '@/types';
import { axiosBE } from '@/utils/axios';
import { formatDate } from '@/utils/date';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAppointments = () => {
	return useQuery<AppointmentType[]>({
		queryKey: ['appointments'],
		queryFn: () => axiosBE.get('/appointments').then((res) => res.data),
		initialData: [],
	});
};

export const useAppointmentsByDate = (date: Date | null) => {
	return useQuery<AppointmentType[]>({
		queryKey: ['appointments', date],
		queryFn: () => {
			if (!date) return [];
			const formattedDate = formatDate(date);
			return axiosBE.get<AppointmentType[]>(`/appointments/date?date=${formattedDate}`).then((res) => res.data);
		},
		enabled: !!date,
		initialData: [],
	});
};

export const useCancelAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => axiosBE.delete(`/appointments/${id}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments'] });
		},
	});
};

export const useCreateAppointment = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (appointment: CreateAppointmentType) => axiosBE.post('/appointments', appointment),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['appointments'] });
		},
	});
};
