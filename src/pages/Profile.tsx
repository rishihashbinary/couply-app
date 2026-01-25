import {
  IonPage,
  IonContent,
  IonAvatar,
  IonText,
  IonButton,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';
import { logOutOutline, cafeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { ProfilesService } from '../services/Profiles';
import { useAuth } from '../hooks/useAuth';
import type { Profile } from '../models/Profile';
import { signOut } from '../services/Auth';
import { personCircleOutline } from 'ionicons/icons';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    ProfilesService.getById(user.id)
      .then(setProfile)
      .catch(console.error);
  }, [user]);

  if (!profile) return null;

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">

        {/* Avatar Section */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
         <IonAvatar style={{ margin: '0 auto', width: 96, height: 96 }}>
  {profile.avatarUrl ? (
    <img src={profile.avatarUrl} alt="Profile" />
  ) : (
    <IonIcon
      icon={personCircleOutline}
      style={{
        fontSize: '96px',
        color: '#bbb'
      }}
    />
  )}
</IonAvatar>
          <IonText>
            <h2 style={{ marginTop: '1rem' }}>{profile.name}</h2>
            <p style={{ color: '#666' }}>{profile.email}</p>
          </IonText>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: '#eee',
            margin: '2rem 0'
          }}
        />

        {/* Actions */}
        <IonItem button detail={false} lines="none">
          <IonIcon icon={cafeOutline} slot="start" />
          <IonLabel>Buy me a coffee</IonLabel>
        </IonItem>

        <IonItem
          button
          detail={false}
          lines="none"
          onClick={async () => {
            await signOut();
            window.location.replace('/login');
          }}
        >
          <IonIcon icon={logOutOutline} slot="start" />
          <IonLabel>Log out</IonLabel>
        </IonItem>

      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
