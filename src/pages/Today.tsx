import {
	IonPage,
	IonContent,
	IonText,
	IonGrid,
	IonRow,
	IonCol,
	IonCard,
	IonIcon,
	IonModal,
	IonDatetime,
	IonButton,
	IonInput,
	IonTextarea,
	IonToast
} from '@ionic/react';
import {
	calendarOutline,
	chevronDownOutline,
	heart
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProfilesService } from '../services/Profiles';
import type { Profile } from '../models/Profile';
import { JournalEntriesService } from '../services/JournalEntriesService';
import { Mood } from '../models/JournalEntry';
import EmotionCard from '../components/EmotionCard';
import HeardModal from '../components/HeardModal';
import MoodResponses from '../components/MoodResponses';

// import { JournalService } from '../services/journal.service';

const moods: { key: Mood; emoji: string; color: string }[] = [
	{ key: 'Happy', emoji: '😊', color: '#1b924d' },
	{ key: 'Peaceful', emoji: '😌', color: '#3498db' },
	{ key: 'Neutral', emoji: '😐', color: '#95a5a6' },
	{ key: 'Difficult', emoji: '😔', color: '#e57373' }
];

const Today: React.FC = () => {
	const { user } = useAuth();

	const [profile, setProfile] = useState<Profile | null>(null);
	const [selectedMood, setSelectedMood] = useState<Mood>();

	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toISOString()
	);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [loading, setLoading] = useState(true);
	const [loadingMood, setLoadingMood] = useState(false);

	const [notes, setNotes] = useState('');
	const [moodResponses, setMoodResponses] = useState<string[]>([]);
	const [showHeardModal, setShowHeardModal] = useState(false);

	const [saving, setSaving] = useState(false);
	const [toast, setToast] = useState<{
		show: boolean;
		message: string;
		color: 'success' | 'danger';
	}>({
		show: false,
		message: '',
		color: 'success'
	});

	// TEMP streak (replace with backend later)
	const [streak] = useState<number>(0);

	const maxDate = new Date().toISOString().split('T')[0];

	const formattedDate = new Date(selectedDate).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric'
	});

	const isPastDate = () => {
		const selected = new Date(selectedDate);
		const today = new Date();

		selected.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);

		return selected < today;
	};

	const onSave = async () => {
		const moodResponsesCombined = moodResponses.join('; ');
		const notesWithResponses = notes
			? `${notes}\n\nReflections: ${moodResponsesCombined}`
			: `Reflections: ${moodResponsesCombined}`;
		try {
			setSaving(true);
			await JournalEntriesService.upsertMood({
				userId: user.id,
				entryDate: selectedDate.split('T')[0],
				mood: selectedMood ?? 'Neutral',
				notes: notesWithResponses,
				moodSource: 'self' // TEMP fixed value
			});
			// setToast({
			// 	show: true,
			// 	message: 'Reflection saved.',
			// 	color: 'success'
			// });
			setShowHeardModal(true);
		} catch (error) {
			console.error(error);

			setToast({
				show: true,
				message: 'Could not save. Please try again.',
				color: 'danger'
			});
		} finally {
			setSaving(false);
		}

	};

	useEffect(() => {
		if (!user) return;

		const load = async () => {
			setLoadingMood(true);

			const p = await ProfilesService.getById(user.id);
			setProfile(p);

			// 🔹 Fetch mood for selected date
			// const entry = await JournalService.getByDate(
			//   user.id,
			//   selectedDate.split('T')[0]
			// );

			// TEMP until service exists
			// const entry = null;

			// setSelectedMood(entry?.mood ?? null);

			setLoadingMood(false);
			setLoading(false);
		};

		load().catch(console.error);
	}, [user, selectedDate]);

	const onMoodSelect = async (mood: Mood) => {
		if (!user) return;

		setSelectedMood(mood);


	};

	const getGreeting = () => {
		const hour = new Date().getHours();

		if (hour >= 5 && hour < 12) return 'Good morning';
		if (hour >= 12 && hour < 17) return 'Good afternoon';
		if (hour >= 17 && hour < 21) return 'Good evening';
		return 'Good night';
	};

	if (loading) return null;

	return (
		<IonPage>
			<IonContent fullscreen className={`ion-padding ${showHeardModal ? 'blurred' : ''}`}>
				<div className="today-background" />
				<div className="today-block frosted">
					{/* Greeting */}
					<IonText>
						<p style={{ color: '#777', marginBottom: 4 }}>
							{getGreeting()}
						</p>
						<h1 style={{ marginTop: 0 }}>
							{profile?.name ?? ''}
						</h1>
					</IonText>

					{/* Question */}
					<IonText>
						<h3 style={{ marginTop: '1.5rem' }}>
							How did the day feel?
						</h3>
					</IonText>

					{/* Streak Indicator */}
					{/* <IonText>
          <p
            style={{
              color: '#6c6c70',
              fontSize: 14,
              marginTop: 6
            }}
          >
            {streak > 0
              ? `🌱 ${streak}-day reflection streak`
              : 'Every day is a fresh start 🤍'}
          </p>
        </IonText> */}

					{/* Revisiting Memory */}
					{isPastDate() && (
						<IonText>
							<p
								style={{
									color: '#8e8e93',
									fontSize: 14,
									marginTop: 4
								}}
							>
								You’re revisiting a memory 🕊️
							</p>
						</IonText>
					)}

					{/* Clickable Date */}
					<div
						onClick={() => setShowDatePicker(true)}
						style={{
							display: 'flex',
							alignItems: 'center',
							color: '#777',
							marginTop: 6,
							cursor: 'pointer'
						}}
					>
						<IonIcon icon={calendarOutline} />
						<span style={{ marginLeft: 8 }}>{formattedDate}</span>
						<IonIcon
							icon={chevronDownOutline}
							style={{ marginLeft: 6, fontSize: 14 }}
						/>
					</div>
				</div>

				{/* Helper Text */}
				{/* <IonText>
          <p style={{ color: '#999', marginTop: 8 }}>
            There’s no right or wrong answer.
          </p>
        </IonText> */}

				{/* Mood Grid */}
				<IonGrid
					style={{
						// marginTop: '1.5rem',
						opacity: loadingMood ? 0.5 : 1,
						pointerEvents: loadingMood ? 'none' : 'auto'
					}}
					className='frosted today-block'
				>
					<IonRow class="ion-justify-content-center" >
						{moods.map(({ key, emoji, color }) => {
							const isSelected = selectedMood === key;
							// console.log('Rendering mood:', key, 'isSelected:', isSelected);
							return (
								<IonCol size="3" key={key}>

									<EmotionCard
										label={key}
										emoji={emoji}
										color={color}
										isSelected={isSelected}
										onMoodSelect={(key: string) => setSelectedMood(key as Mood)}
									/>
								</IonCol>
							);
						})}
					</IonRow>

					<IonText>
						<p style={{ marginTop: 8, color: moods.find(m => m.key === selectedMood)?.color, textAlign: 'center', fontWeight: 'bold' }}>{selectedMood}</p>
					</IonText>

				</IonGrid>

				{selectedMood && <div className='block frosted'>
					<MoodResponses
						mood={(selectedMood?.toLowerCase() as Mood) ?? null}
						onSelect={(responses: string[]) => {
							setMoodResponses(responses);
						}}
					/>
				</div>}

				<div className="today-block frosted">
					{/* Notes */}

					<IonTextarea
						disabled={!selectedMood}
						id="notes-input"
						label="What’s on your mind?"
						labelPlacement="floating"
						counter={true}
						maxlength={400}
						rows={4}
						counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
						value={notes}
						onChange={e => setNotes((e.target as HTMLIonTextareaElement).value ?? '')}
					// onIonChange={e => { console.log(e.detail.value); setNotes(e.detail.value!) }}
					></IonTextarea>

					<IonButton className={`save-button ${saving ? 'saving' : ''}`} disabled={!selectedMood} onClick={onSave} expand="block" style={{ marginTop: 10 }}> <IonIcon style={{ marginRight: 10 }} icon={heart} /> Save</IonButton>
				</div>
				{/* Date Picker Modal */}
				<IonModal
					isOpen={showDatePicker}
					onDidDismiss={() => setShowDatePicker(false)}
				>
					<IonContent className="ion-padding">
						<IonDatetime
							presentation="date"
							value={selectedDate}
							max={maxDate}
							onIonChange={(e) =>
								setSelectedDate(e.detail.value as string)
							}
						/>

						<IonButton
							expand="block"
							style={{ marginTop: 16, opacity: 1 }}
							onClick={() => setShowDatePicker(false)}
						>
							Done
						</IonButton>
					</IonContent>
				</IonModal>
				<IonToast
					isOpen={toast.show}
					message={toast.message}
					color={toast.color}
					duration={2000}
					position="top"
					onDidDismiss={() =>
						setToast((t) => ({ ...t, show: false }))
					}
				/>
				<HeardModal
					isOpen={showHeardModal}
					emotion={selectedMood ?? ''}
					emoji={moods.find(m => m.key === selectedMood)?.emoji || ''}
					onDismiss={() => setShowHeardModal(false)}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Today;
