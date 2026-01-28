import React from 'react';
import { IonCard, IonText } from '@ionic/react';

interface EmotionCardProps {
	label: string;
	emoji: string;
	color: string;
	isSelected: boolean;
	onMoodSelect: (key: string) => void;
}

const EmotionCard: React.FC<EmotionCardProps> = ({ label, emoji, color, isSelected, onMoodSelect }) => {
	// console.log('Label in EmotionCard:', label, emoji, color, isSelected);
	return (
		<IonCard
			button
			onClick={() => onMoodSelect(label)}
			style={{
				textAlign: 'center',
				padding: '0.3rem',
				background: isSelected ? `${color}` : '#fff',
				transition: 'all 0.2s ease',
				boxShadow: 'none',
				border: isSelected ? '1px solid #ffffff8a' : '1px solid #83818158',
			}}
			className='emoji-circle'
		>
			<div
				style={{
					fontSize: 24,
					transform: isSelected ? 'scale(1.1)' : 'scale(1)',
					transition: 'transform 0.2s ease',
					alignItems: 'center',
					justifyContent: 'center',
					display: 'flex',
					marginBottom: '2px'
				}}
			>
				{emoji}
			</div>
			{/* <IonText>
				<p style={{ marginTop: 8, color: isSelected ? '#fff' : '#000' }}>{label}</p>
			</IonText> */}
		</IonCard>
	);
};

export default EmotionCard;