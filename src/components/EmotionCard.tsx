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
	console.log('Label in EmotionCard:', label, emoji, color, isSelected);
	return (
		<IonCard
			button
			onClick={() => onMoodSelect(label)}
			style={{
				textAlign: 'center',
				padding: '1rem',
				borderRadius: 16,
				background: isSelected ? `${color}22` : '#fff',
				transition: 'all 0.2s ease',
			}}
		>
			<div
				style={{
					fontSize: 36,
					transform: isSelected ? 'scale(1.1)' : 'scale(1)',
					transition: 'transform 0.2s ease',
				}}
			>
				{emoji}
			</div>
			<IonText>
				<p style={{ marginTop: 8 }}>{label}</p>
			</IonText>
		</IonCard>
	);
};

export default EmotionCard;