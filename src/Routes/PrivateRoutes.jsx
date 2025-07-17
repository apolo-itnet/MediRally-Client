import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loader from '../Shared/Loader/Loader';

const PrivateRoutes = ({children}) => {
  const {user, loading} = useAuth();
  const location  = useLocation();


  if (loading) return <Loader/>;

  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  return children;
};

export default PrivateRoutes;