import {
	IonChip,
	IonLabel,
	IonGrid,
	IonRow,
	IonCol,
	IonText
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Mood } from '../models/JournalEntry';


type Props = {
	mood: Mood | null;
	onSelect: (responses: string[]) => void;
};

const MOOD_PRE_RESPONSES: Record<any, string[]> = {
	happy: [
		'Today felt lighter than usual',
		'Something small brought me joy',
		'I felt good being myself today',
		'I smiled more than I expected',
		'I want to remember how today felt'
	],
	peaceful: [
		'I felt calm and settled today',
		'My mind felt quieter than usual',
		'I moved through the day at my own pace',
		'There was a sense of ease today',
		'I felt present in small moments'
	],
	neutral: [
		'Today felt ordinary, and that’s okay',
		'Nothing stood out strongly today',
		'I went through the day on autopilot',
		'It was a steady, uneventful day',
		'I feel neither high nor low'
	],
	difficult: [
		'Today felt heavier than usual',
		'I felt a bit low today',
		'My energy was down',
		'I felt emotionally tired',
		'I needed more comfort than I had'
	]
};

// Utility: shuffle array
const shuffleArray = (arr: string[]) =>
	[...arr].sort(() => Math.random() - 0.5);

const MoodResponses = ({ mood, onSelect }: Props) => {
	const [options, setOptions] = useState<string[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	useEffect(() => {
		if (!mood) return;

		const shuffled = shuffleArray(MOOD_PRE_RESPONSES[mood]).slice(0, 4);
		setOptions(shuffled);
		setSelected([]);
	}, [mood]);

	const toggleSelection = (text: string) => {
		const updated = selected.includes(text)
			? selected.filter(item => item !== text)
			: [...selected, text];

		setSelected(updated);
		onSelect(updated);
	};

	if (!mood) return null;

	return (
		<>
			<IonText color="light" className="ion-margin-top">
				<p>Tap what feels true right now</p>
			</IonText>

			<IonGrid>
				<IonRow>
					{options.map((text, idx) => (
						<IonCol size="12" key={idx}>
							<IonChip
								onClick={() => toggleSelection(text)}
								color={selected.includes(text) ? 'dark' : 'light'}
								outline={!selected.includes(text)}
								style={{ backgroundColor: selected.includes(text) ? 'var(--ion-color-primary)' : 'transparent' }}
							>
								<div>{text}</div>
							</IonChip>
						</IonCol>
					))}
				</IonRow>
			</IonGrid>
		</>
	);
};

export default MoodResponses;
