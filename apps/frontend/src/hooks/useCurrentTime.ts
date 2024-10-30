import { useEffect, useState } from 'react';

export default function useCurrentTime() {
	const [currentTime, setCurrentTime] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	return currentTime;
}
