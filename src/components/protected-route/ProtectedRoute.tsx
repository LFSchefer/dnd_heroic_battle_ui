import { Navigate, Outlet } from 'react-router-dom';
import { useStoreState } from '../../store/hooks';

const ProtectedRoute = () => {

    const { isLogin } = useStoreState(state => state.user)

  if (!isLogin) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;