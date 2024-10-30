import { useAppointmentsByDate, useCancelAppointment } from '@/hooks/useAppointments';
import { Button, Container, Loader, Table, Title } from '@mantine/core';
import { useState } from 'react';
import { DatePickerInput } from '@mantine/dates';
import CreateAppointment from '@/components/CreateAppointment';
import useCurrentTime from '@/hooks/useCurrentTime';

function Page() {
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(new Date().setHours(0, 0, 0, 0)));
	const { data, isLoading } = useAppointmentsByDate(selectedDate);
	const currentTime = useCurrentTime();

	const { mutateAsync: cancelAppointment } = useCancelAppointment();

	const handleCancel = async (id: string) => {
		await cancelAppointment(id);
	};

	if (isLoading) return <Loader />;

	return (
		<Container>
			<Title ta="center">Appointments</Title>
			<CreateAppointment />
			<DatePickerInput my="xl" label="Select a date" value={selectedDate} onChange={setSelectedDate} clearable />
			<Table mt="xl">
				<Table.Thead>
					<Table.Tr>
						<Table.Th>Patient</Table.Th>
						<Table.Th>Description</Table.Th>
						<Table.Th>Duration</Table.Th>
						<Table.Th>Date</Table.Th>
						<Table.Th>Actions</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data.map((appointment) => {
						const dateStart = new Date(appointment.dateStart);
						const dateEnd = new Date(appointment.dateEnd);

						let color = '';
						if (currentTime < dateStart) color = 'cyan';
						else if (currentTime > dateEnd) color = 'gray';
						else color = 'orange';

						return (
							<Table.Tr key={appointment._id} style={{ backgroundColor: color, color: 'black' }}>
								<Table.Td>{appointment.patient}</Table.Td>
								<Table.Td>{appointment.description}</Table.Td>
								<Table.Td>{appointment.duration}</Table.Td>
								<Table.Td>{new Date(appointment.dateStart).toLocaleString()}</Table.Td>
								<Table.Td>
									<Button color="red" onClick={() => handleCancel(appointment._id)}>
										Cancel
									</Button>
								</Table.Td>
							</Table.Tr>
						);
					})}
				</Table.Tbody>
			</Table>
		</Container>
	);
}

export default Page;
