import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const AdminRoute = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user, loadUser } = authContext;

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [loadUser, user]);

  // 로딩 중이고 5초 이내일 경우에만 스피너 표시
  if (loading) {
    return <Spinner />;
  }
  
  if (!isAuthenticated || !localStorage.token) {
    return <Navigate to='/login' />;
  }

  // 사용자 정보가 없거나 관리자가 아닌 경우
  if (!user || (user && user.role !== 'admin')) {
    return <Navigate to='/beds' />;
  }
  
  return children;
};

export default AdminRoute;