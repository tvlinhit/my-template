import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PageEnum from 'constants/PageEnum';
import isMobile from 'utils/checkMobile';

const CheckPCDevice: React.FC = () => {
  return !isMobile ? <Outlet /> : <Navigate to={PageEnum.LANDING_MOBILE_PAGE} />;
};
export default CheckPCDevice;
