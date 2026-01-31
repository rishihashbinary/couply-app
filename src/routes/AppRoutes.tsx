import {
	IonTabs,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonIcon,
	IonLabel
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';

import { today, calendar, pieChart, person, eyeOff, eyeOutline, bulb } from 'ionicons/icons';

import Today from '../pages/Today';
import Calendar from '../pages/Calendar';
import Analytics from '../pages/Analytics';
import Profile from '../pages/Profile';

const AppRoutes = () => (
	<IonTabs className=''>
		<IonRouterOutlet>
			<Route exact path="/today" component={Today} />
			<Route exact path="/calendar" component={Calendar} />
			<Route exact path="/analytics" component={Analytics} />
			<Route exact path="/profile" component={Profile} />
			<Redirect exact from="/" to="/today" />
		</IonRouterOutlet>

		<IonTabBar slot="bottom">
			<IonTabButton tab="today" href="/today">
				<IonIcon icon={today} />
				<IonLabel>Today</IonLabel>
			</IonTabButton>

			<IonTabButton tab="calendar" href="/calendar">
				<IonIcon icon={calendar} />
				<IonLabel>Calendar</IonLabel>
			</IonTabButton>

			<IonTabButton tab="analytics" href="/analytics">
				<IonIcon icon={bulb} />
				<IonLabel>Reflections</IonLabel>
			</IonTabButton>

			<IonTabButton tab="profile" href="/profile">
				<IonIcon icon={person} />
				<IonLabel>Profile</IonLabel>
			</IonTabButton>
		</IonTabBar>
	</IonTabs>
);

export default AppRoutes;
