import { Navigate, Outlet } from 'react-router';
import { useStoreState } from '../../store/hooks';

const ProtectedRoute = () => {

    // const { isLogin } = useStoreState(state => state.user)

  if (!sessionStorage.getItem('access_token')) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;