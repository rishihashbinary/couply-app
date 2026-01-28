import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { signInWithGoogle } from '../services/Auth';
import { logoGoogle } from 'ionicons/icons';
import '../theme/login.css';

const Login: React.FC = () => (
	<IonPage>

		<IonContent className="ion-padding login-content">
			<div className='block frosted'><div className="login-message">
				When thoughts stay in your head, they feel heavy and loud.
				When you put them down here, they slow down.
			</div></div>
			<div className='block frosted'>
				<div className="login-title">Pause<br />Notice<br />Let it be</div>
				<IonButton className='login-button' color="light" expand="block" onClick={() => { console.log('Button clicked'); signInWithGoogle(); }}>
					<IonIcon slot="start" icon={logoGoogle}></IonIcon>
					Sign in with Google
				</IonButton>
			</div>

			<div className="login-background" />
		</IonContent>
	</IonPage>
);

export default Login;
