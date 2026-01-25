import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Analytics: React.FC = () => {
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle>Analytics</IonTitle>
		</IonToolbar>
	  </IonHeader>

	  <IonContent className="ion-padding">
		Analytics Page
	  </IonContent>
	</IonPage>
  );
};

export default Analytics;