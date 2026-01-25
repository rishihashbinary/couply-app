import {
  IonPage,
  IonContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonIcon
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { ProfilesService } from '../services/Profiles';
// import { JournalService } from '../services/journal.service';
import type { Profile } from '../models/Profiles';

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
  const [loading, setLoading] = useState(true);

  const todayStr = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    if (!user) return;

    const init = async () => {
      const p = await ProfilesService.getById(user.id);
      setProfile(p);

    //   const entry = await JournalService.getToday(user.id);
    //   setSelectedMood(entry?.mood ?? null);

      setLoading(false);
    };

    init().catch(console.error);
  }, [user]);

  const onMoodSelect = async (mood: Mood) => {
    if (!user) return;

    setSelectedMood(mood);
    // await JournalService.saveTodayMood(user.id, mood);
  };

  if (loading) return null;

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">

        {/* Greeting */}
        <IonText>
          <p style={{ color: '#777', marginBottom: 4 }}>
            Good evening
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

        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', color: '#777' }}>
          <IonIcon icon={calendarOutline}></IonIcon>
          <span style={{ marginLeft: 8 }}>{todayStr}</span>
        </div>

        {/* Helper text */}
        <IonText>
          <p style={{ color: '#999', marginTop: 8 }}>
            There’s no right or wrong answer.
          </p>
        </IonText>

        {/* Mood Grid */}
        <IonGrid style={{ marginTop: '1.5rem' }}>
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
                      padding: '1.2rem',
                      borderRadius: 16,
                      border: `2px solid ${
                        isSelected ? color : '#e0e0e0'
                      }`,
                      background: isSelected
                        ? `${color}22`
                        : '#fff',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: 36 }}>{emoji}</div>
                    <IonText>
                      <p style={{ marginTop: 8 }}>{key}</p>
                    </IonText>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Today;
