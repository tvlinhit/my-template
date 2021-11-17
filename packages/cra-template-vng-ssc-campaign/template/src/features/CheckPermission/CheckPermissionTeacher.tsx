import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PageEnum from 'constants/PageEnum';

const CheckPermissionTeacher: React.FC = () => {
  const isTeacher = true;
  return isTeacher ? <Outlet /> : <Navigate to={PageEnum.LANDING_PC_PAGE} />;
};
export default CheckPermissionTeacher;
