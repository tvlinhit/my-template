import React from 'react';
import useCountStore from 'store/data';

const LandingMobilePage: React.FC = () => {
  const { count } = useCountStore();
  return <div>Đay Langing page mobile: count {count} </div>;
};
export default LandingMobilePage;
