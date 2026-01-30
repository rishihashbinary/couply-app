import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonDatetime,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import '../theme/calendar.css';
import { JournalEntry, Mood } from '../models/JournalEntry';
import { JournalEntriesService } from '../services/JournalEntriesService';
import { useAuth } from '../hooks/useAuth';

const Calendar: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<string>();
	const [entriesByDate, setEntriesByDate] = useState<any>([]);
	const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
	const [showModal, setShowModal] = useState(false);

	const { user } = useAuth();

	console.log('User', user);

	useEffect(() => {
		if (user) {
			fetchMonthEntries();
		}
	}, [user]);

	const fetchMonthEntries = async () => {
		const entries = await JournalEntriesService.getMonthlyEntries(
			user.id,
			(new Date().getMonth() + 1) + '',
			new Date().getFullYear() + ''
		);
		const map: Record<string, Mood> = {};
		entries.forEach((e: JournalEntry) => {
			map[e.entryDate] = e.mood;
		});





		const highlightedDates = entries.map((e) => { return { date: e.entryDate, mood: e.mood, backgroundColor: `var(--mood-${e.mood.toLowerCase()})`, textColor: `white` } });
		console.log('Entries map', highlightedDates);
		setEntriesByDate(highlightedDates);
	};

	const onDateSelect = async (date: string) => {
		setSelectedDate(date);

		// const { data } = await supabase
		//   .from('journal_entries')
		//   .select('*')
		//   .eq('entry_date', date)
		//   .single();

		// setActiveEntry(
		//   data || {
		//     entry_date: date,
		//   }
		// );

		setShowModal(true);
	};

	return (
		<IonPage>

			<IonContent className="ion-padding calendar-page">
				<div className="calendar-background" />
				<p className="page-title block frosted">Your emotional journey</p>

				<div className="calendar-wrapper block frosted">
					<IonDatetime
						highlightedDates={entriesByDate}
						presentation="date"
						value={selectedDate}
						showDefaultButtons={false}
						onIonChange={(e) => setSelectedDate(e.detail.value as string)}
						className="mood-calendar"
					/>
				</div>

				{/* Legend */}
				<div className="legend block frosted">
					<Legend color="happy" label="Happy" />
					<Legend color="peaceful" label="Peaceful" />
					<Legend color="neutral" label="Neutral" />
					<Legend color="difficult" label="Difficult" />
				</div>

				{/* Inject mood map for CSS */}
				{/* <style>
					{Object.entries(entriesByDate)
						.map(
							([date, mood]) => {
								console.log('CSS Mood: ', date, mood); return `
              ion-datetime .calendar-day[data-date="${date}"]::after {
                background: var(--mood-${mood});
              }
            `}
						)
						.join('')}
				</style> */}
			</IonContent>
		</IonPage>
	);
};

const Legend = ({
	color,
	label,
}: {
	color: string;
	label: string;
}) => (
	<div className="legend-item">
		<span className={`dot ${color}`} />
		<span>{label}</span>
	</div>
);

export default Calendar;
