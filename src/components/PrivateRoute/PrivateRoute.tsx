import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  const isAuthenticated = true; // TODO: remove this

  if (!isAuthenticated) {
    return <Navigate to={'/signin'} replace />;
  }

  return <Route {...props}/>;
};

export default PrivateRoute; 