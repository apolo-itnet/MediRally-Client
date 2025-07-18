import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import Loader from '../Shared/Loader/Loader';

const RoleRoutes = ({children, role}) => {

  const {userRole, loading} = useAuth();

  if (loading) return <Loader/>;

  if (userRole !== role) return <Navigate to="/dashboard" replace/>;

  return children;
};

export default RoleRoutes;
