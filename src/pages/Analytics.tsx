import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import WeeklyAdviceCard from '../components/WeeklyAdviceCard';
import '../theme/analytics.css';

const Analytics: React.FC = () => {
	const isSunday = 1;//new Date().getDay() === 0; // Sunday = 0
	return (
		<IonPage>
			{/* <IonHeader>
				<IonToolbar>
					<IonTitle>Analytics</IonTitle>
				</IonToolbar>
			</IonHeader> */}

			<IonContent className="ion-padding analytics-content">
				<div className="analytics-background" />
				{isSunday && <WeeklyAdviceCard weekStart="2026-01-20" />}
			</IonContent>

		</IonPage>
	);
};

export default Analytics;