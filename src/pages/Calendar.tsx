import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Calendar: React.FC = () => {
  return (
	<IonPage>
	  <IonHeader>
		<IonToolbar>
		  <IonTitle>Calendar</IonTitle>
		</IonToolbar>
	  </IonHeader>

	  <IonContent className="ion-padding">
		Calendar Page
	  </IonContent>
	</IonPage>
  );
};

export default Calendar;