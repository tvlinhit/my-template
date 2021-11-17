import PageEnum from 'constants/PageEnum';
import CheckPermissionParents from 'features/CheckPermission/CheckPermissionParents';
import CheckPermissionTeacher from 'features/CheckPermission/CheckPermissionTeacher';
import FallBackLoading from 'features/Loading/FallBackLoading';
import React, { FC, lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAppLoading from 'store/appLoading';
import isMobile from 'utils/checkMobile';

// import page
const CheckMobileDevice = lazy(() => import('features/CheckPermission/CheckMobileDevice'));
const CheckPCDevice = lazy(() => import('features/CheckPermission/CheckPCDevice'));
const LandingMobilePage = lazy(() => import('features/Landing/mobilePage'));
const LandingPCPage = lazy(() => import('features/Landing/pcPage'));
// import page
const App: FC = () => {
  const { isLoading } = useAppLoading();
  return (
    <Suspense fallback={<FallBackLoading />}>
      <Routes>
        <Route path="/" element={<CheckMobileDevice />}>
          <Route path={PageEnum.LANDING_MOBILE_PAGE} element={<LandingMobilePage />} />
          {/* Route Giáo viên */}
          <Route path="/" element={<CheckPermissionTeacher />}></Route>
          {/* Route phụ huynh */}
          <Route path="/" element={<CheckPermissionParents />}></Route>
        </Route>
        <Route path="/" element={<CheckPCDevice />}>
          <Route path={PageEnum.LANDING_PC_PAGE} element={<LandingPCPage />} />
        </Route>
        <Route
          path="*"
          element={
            isMobile ? <Navigate to={PageEnum.LANDING_MOBILE_PAGE} /> : <Navigate to={PageEnum.LANDING_PC_PAGE} />
          }
        />
      </Routes>
      {isLoading && <FallBackLoading />}
    </Suspense>
  );
};

export default App;
