import {
	IonPage,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonText,
	IonCard,
	IonCardContent,
	IonButton
} from '@ionic/react';
import { useParams } from 'react-router';

const WeeklyAdvicePage: React.FC = () => {
	const { weekStart } = useParams<{ weekStart: string }>();

	// Later this will come from Supabase
	const advice = {
		mirror: "This week felt emotionally uneven. Midweek was heavy, but you didn’t stop showing up.",
		insight: "You feel lighter when you slow down instead of pushing through.",
		activity: "Take 5 quiet minutes today. Sit comfortably, breathe slowly, and remind yourself: I did enough."
	};

	console.log('WeeklyAdvicePage rendered for week starting', weekStart);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Weekly Reflection</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className="ion-padding">

				<IonText color="medium">
					Week starting {weekStart}
				</IonText>

				{/* Mirror */}
				<IonCard>
					<IonCardContent>
						<IonText>
							<strong>🪞 Looking back</strong><br />
							{advice.mirror}
						</IonText>
					</IonCardContent>
				</IonCard>

				{/* Insight */}
				<IonCard>
					<IonCardContent>
						<IonText>
							<strong>🌱 One thing to notice</strong><br />
							{advice.insight}
						</IonText>
					</IonCardContent>
				</IonCard>

				{/* Activity */}
				<IonCard>
					<IonCardContent>
						<IonText>
							<strong>🧘 Try this</strong><br />
							{advice.activity}
						</IonText>
					</IonCardContent>
				</IonCard>

				<IonButton expand="block" fill="outline">
					Save for later
				</IonButton>

			</IonContent>
		</IonPage>
	);
};

export default WeeklyAdvicePage;
