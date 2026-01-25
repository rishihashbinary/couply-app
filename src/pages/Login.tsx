import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { signInWithGoogle } from '../services/Auth';
import { logoGoogle } from 'ionicons/icons';

const Login: React.FC = () => (
  <IonPage>
    <IonContent className="ion-padding">
      <IonButton color="light" expand="block" onClick={()=>{console.log('Button clicked'); signInWithGoogle();}}>
        <IonIcon slot="start" icon={logoGoogle}></IonIcon>
		Sign in with Google
      </IonButton>
    </IonContent>
  </IonPage>
);

export default Login;
