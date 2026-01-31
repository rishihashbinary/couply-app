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
import { WeeklyAdviceService } from '../services/WeeklyAdvice';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import moment from 'moment';

interface WeeklyAdviceCardProps {
	weekStart: string; // e.g. 2026-01-20
}

const WeeklyAdviceCard: React.FC<WeeklyAdviceCardProps> = ({ weekStart }) => {
	const history = useHistory();
	const { user } = useAuth();
	const [advice, setAdvice] = useState<any>(null);


	const fetchWeeklyAdvice = async () => {
		const advice = await WeeklyAdviceService.getLatest(
			user.id,
		);
		if (advice) { console.log('Weekly advice:', advice); setAdvice(advice); }
	};

	useEffect(() => {
		if (user?.id) {
			fetchWeeklyAdvice();
		}
	}, [user?.id]);

	return (
		<div
		>
			<IonCardHeader className='block frosted'>
				<IonCardTitle className="page-title" >
					<IonIcon icon={sparklesOutline} style={{ marginRight: 8 }} />
					Reflections as of {moment(advice?.createdAt).format('ll')}
				</IonCardTitle>
			</IonCardHeader>
			{advice && <>
				<div className='block frosted'>
					<h2 className="block-title">Mirror</h2>
					<IonText color="medium" className='block-content formatted-text'>
						{advice ? advice.mirrorText : 'Loading your personalized advice...'}
					</IonText>


				</div>
				<div className='block frosted'>
					<h2 className="block-title">Insights</h2>
					<IonText color="medium" className='block-content formatted-text'>
						{advice ? advice.insightText : 'Loading your personalized advice...'}
					</IonText>

					{/* <div style={{ marginTop: 12, display: 'flex', alignItems: 'center' }}>
					<IonText color="primary">Read your advice</IonText>
					<IonIcon
						icon={chevronForwardOutline}
						style={{ marginLeft: 6 }}
					/>
				</div> */}
				</div>
				<div className='block frosted'>
					<h2 className="block-title">Your next activity</h2>
					<IonText color="medium" className='block-content formatted-text'>
						{advice ? advice.activityText : 'Loading your personalized advice...'}
					</IonText>


				</div>
			</>}
			{!advice && <div className='block frosted block-content'>Your weekly advice is calculated every week, on Sunday, after your daily check-ins are complete. More details in notes will add to better results.</div>}
		</div>
	);
};

export default WeeklyAdviceCard;
