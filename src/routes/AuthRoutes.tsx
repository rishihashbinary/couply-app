import { Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import AuthCallback from '../pages/AuthCallback';

const AuthRoutes = () => (
  <>
    <Route exact path="/login" component={Login} />
    <Redirect to="/login" />
  </>
);

export default AuthRoutes;
