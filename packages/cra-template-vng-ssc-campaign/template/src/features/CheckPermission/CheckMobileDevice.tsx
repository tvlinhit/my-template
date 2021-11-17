import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PageEnum from 'constants/PageEnum';
import isMobile from 'utils/checkMobile';

const CheckMobileDevice: React.FC = () => {
  return isMobile ? <Outlet /> : <Navigate to={PageEnum.LANDING_PC_PAGE} />;
};
export default CheckMobileDevice;
