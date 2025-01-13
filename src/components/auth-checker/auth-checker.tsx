import React from 'react';
import Login from '../../pages/login/login';

interface AuthRouteProps {
  component: JSX.Element;
  isAuthenticated: boolean;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ component, isAuthenticated }) =>
  isAuthenticated ? component : <Login />;

export default AuthRoute;


