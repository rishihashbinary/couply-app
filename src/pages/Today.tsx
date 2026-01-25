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
  IonTextarea
} from '@ionic/react';
import {
  calendarOutline,
  chevronDownOutline
} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProfilesService } from '../services/Profiles';
import type { Profile } from '../models/Profile';
import { JournalEntriesService } from '../services/JournalEntriesService';

// import { JournalService } from '../services/journal.service';

type Mood = 'Happy' | 'Peaceful' | 'Neutral' | 'Difficult';

const moods: { key: Mood; emoji: string; color: string }[] = [
  { key: 'Happy', emoji: '😊', color: '#2ecc71' },
  { key: 'Peaceful', emoji: '😌', color: '#3498db' },
  { key: 'Neutral', emoji: '😐', color: '#95a5a6' },
  { key: 'Difficult', emoji: '😔', color: '#e57373' }
];

const Today: React.FC = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadingMood, setLoadingMood] = useState(false);

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
      const entry = null;

      setSelectedMood(entry?.mood ?? null);

      setLoadingMood(false);
      setLoading(false);
    };

    load().catch(console.error);
  }, [user, selectedDate]);

  const onMoodSelect = async (mood: Mood) => {
    if (!user) return;

    setSelectedMood(mood);

    await JournalEntriesService.upsertMood({
      userId: user.id,
      entryDate: selectedDate.split('T')[0],
      mood,
	  moodSource: 'self' // TEMP fixed value
    });
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
      <IonContent fullscreen className="ion-padding">

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

        {/* Helper Text */}
        {/* <IonText>
          <p style={{ color: '#999', marginTop: 8 }}>
            There’s no right or wrong answer.
          </p>
        </IonText> */}

        {/* Mood Grid */}
        <IonGrid
          style={{
            marginTop: '1.5rem',
            opacity: loadingMood ? 0.5 : 1,
            pointerEvents: loadingMood ? 'none' : 'auto'
          }}
        >
          <IonRow>
            {moods.map(({ key, emoji, color }) => {
              const isSelected = selectedMood === key;

              return (
                <IonCol size="6" key={key}>
                  <IonCard
                    button
                    onClick={() => onMoodSelect(key)}
                    style={{
                      textAlign: 'center',
                      padding: '1rem',
                      borderRadius: 16,
                    //   border: `2px solid ${
                    //     isSelected ? color : '#e0e0e0'
                    //   }`,
                      background: isSelected
                        ? `${color}22`
                        : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        fontSize: 36,
                        transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      {emoji}
                    </div>
                    <IonText>
                      <p style={{ marginTop: 8 }}>{key}</p>
                    </IonText>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>

		{/* Notes */}

		<IonTextarea
        id="notes-input"
        label="Notes"
        labelPlacement="floating"
        counter={true}
        maxlength={200}
		rows={4}
        counterFormatter={(inputLength, maxLength) => `${maxLength - inputLength} characters remaining`}
      ></IonTextarea>

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
              style={{ marginTop: 16 }}
              onClick={() => setShowDatePicker(false)}
            >
              Done
            </IonButton>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default Today;
