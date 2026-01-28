import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonText,
	IonIcon
} from '@ionic/react';
import { sparklesOutline, chevronForwardOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface WeeklyAdviceCardProps {
	weekStart: string; // e.g. 2026-01-20
}

const WeeklyAdviceCard: React.FC<WeeklyAdviceCardProps> = ({ weekStart }) => {
	const history = useHistory();

	return (
		<IonCard
			button
			onClick={() => { }}
			className="weekly-advice-card"
		>
			<IonCardHeader>
				<IonCardTitle>
					<IonIcon icon={sparklesOutline} style={{ marginRight: 8 }} />
					Your Weekly Pause
				</IonCardTitle>
			</IonCardHeader>

			<IonCardContent>
				<IonText color="medium">
					A gentle reflection from your past week — written just for you.
				</IonText>

				<div style={{ marginTop: 12, display: 'flex', alignItems: 'center' }}>
					<IonText color="primary">Read your advice</IonText>
					<IonIcon
						icon={chevronForwardOutline}
						style={{ marginLeft: 6 }}
					/>
				</div>
			</IonCardContent>
		</IonCard>
	);
};

export default WeeklyAdviceCard;
