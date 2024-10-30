import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { zodResolver } from 'mantine-form-zod-resolver';
import { useCreateAppointment } from '@/hooks/useAppointments';
import { CreateAppointmentFormSchema, CreateAppointmentSchema } from '@/types';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

const times = Array.from(
	{ length: 48 },
	(_, i) =>
		`${Math.floor(i / 2)
			.toString()
			.padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
);

function CreateAppointment() {
	const [opened, { open, close }] = useDisclosure(false);

	const form = useForm({
		initialValues: {
			patient: '',
			description: '',
			duration: '',
			dateStart: new Date(new Date().setHours(0, 0, 0, 0)),
			time: '',
		},
		validate: zodResolver(CreateAppointmentFormSchema),
	});

	const { mutate: createAppointment } = useCreateAppointment();

	const onSubmit = form.onSubmit(async (values) => {
		const dateStart = new Date(values.dateStart);
		dateStart.setHours(parseInt(values.time.split(':')[0]), parseInt(values.time.split(':')[1]));
		values.dateStart = dateStart;
		const data = CreateAppointmentSchema.safeParse(values);
		if (!data.success)
			return notifications.show({
				title: 'Error',
				message: 'Invalid data',
				color: 'red',
			});
		await createAppointment(data.data, {
			onSuccess: () => {
				form.reset();
				notifications.show({ title: 'Success', message: 'Appointment created', color: 'green' });
				close();
			},
			onError: (error) => {
				let message = 'Something went wrong';
				if (error instanceof AxiosError) message = error.response?.data.message;
				notifications.show({ title: 'Error', message, color: 'red' });
			},
		});
	});

	return (
		<>
			<Modal opened={opened} onClose={close} title="Create Appointment">
				<form onSubmit={onSubmit}>
					<TextInput label="Patient" {...form.getInputProps('patient')} />
					<TextInput label="Description" {...form.getInputProps('description')} />
					<Select label="Duration" data={['30', '60', '90', '120']} {...form.getInputProps('duration')} />
					<DatePickerInput label="Date" {...form.getInputProps('dateStart')} />
					<Select label="Time" data={times} {...form.getInputProps('time')} />
					<Button mt="lg" type="submit">
						Create
					</Button>
				</form>
			</Modal>

			<Button onClick={open} color="green">
				Create Appointment
			</Button>
		</>
	);
}

export default CreateAppointment;
