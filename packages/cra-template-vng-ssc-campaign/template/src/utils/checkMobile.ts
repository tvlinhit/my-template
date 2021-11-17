import { isMobile as checkIsMobile } from 'react-device-detect';

const isMobile = navigator?.userAgent?.toUpperCase()?.indexOf('ZALO') > -1 || checkIsMobile;
export default isMobile;
