import { Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import AuthCallback from '../pages/AuthCallback';
import WeeklyAdvicePage from '../pages/WeeklyAdvicePage';

const AuthRoutes = () => (
	<>
		<Route exact path="/login" component={Login} />
		<Route path="/weekly-advice/:weekStart" component={WeeklyAdvicePage} exact />
		<Redirect to="/login" />
	</>
);

export default AuthRoutes;
