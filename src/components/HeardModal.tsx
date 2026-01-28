import {
	IonModal,
	IonButton,
	IonText
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import '../theme/heard-modal.css';
import { getRandomEmotionContent } from '../constants/EmotionMessages';

interface HeardModalProps {
	isOpen: boolean;
	emotion: string;
	emoji: string;
	onDismiss: () => void;
}

const HeardModal: React.FC<HeardModalProps> = ({
	isOpen,
	emotion,
	emoji,
	onDismiss
}) => {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const [secondsLeft, setSecondsLeft] = useState(10);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Pick message + start timer
	useEffect(() => {
		if (!isOpen) return;
		const content = getRandomEmotionContent(emotion.toLowerCase());
		if (content) {
			const { title, message } = content;
			setTitle(title);
			setMessage(message);
		}
		setSecondsLeft(10);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			setSecondsLeft(prev => {
				if (prev <= 1) {
					// Final tick → dismiss safely
					clearInterval(intervalRef.current!);
					intervalRef.current = null;
					onDismiss();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [isOpen, emotion, onDismiss]);



	return (
		<IonModal
			isOpen={isOpen}
			className="heard-modal"
			backdropDismiss={false}
		>
			<div className="heard-wrapper">
				<div className="emoji">{emoji}</div>

				<h2>{title}</h2>

				<IonText className="message">
					{message}
				</IonText>

				<IonButton
					fill="clear"
					size="small"
					onClick={onDismiss}
					className="mt-"
				>
					Close now
				</IonButton>
			</div>
			<div className="heard-footer countdown">
				<IonText>
					Closing in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}
				</IonText>
			</div>
		</IonModal>
	);
};

export default HeardModal;
