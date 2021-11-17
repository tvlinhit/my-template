import React from 'react';
import DynamicImage from 'components/DynamicImage/index';
import CampaignLogo from 'assets/images/campaign-logo.png';
import CampaignLogo1 from 'assets/images/campaign-logo@2x.png';
import CampaignLogo2 from 'assets/images/campaign-logo@3x.png';
import QRCode from 'assets/images/qr-code.png';
import QRCode1 from 'assets/images/qr-code@2x.png';
import QRCode2 from 'assets/images/qr-code@3x.png';
import classnames from 'classnames';
import LandingStyle from './landing.module.scss';

const LandingPCPage: React.FC = () => {
  return (
    <div className={LandingStyle.container}>
      <DynamicImage width={'34.78%'} images={[CampaignLogo, CampaignLogo1, CampaignLogo2]} />
      <p className={LandingStyle['text-1']}>Chương trình chỉ hỗ trợ khi tham gia trên điện thoại di động.</p>
      <p className={classnames('text-bold', LandingStyle['text-2'])}>Mở Zalo, quét mã QR để tham gia ngay!</p>
      <DynamicImage className={LandingStyle['qr-code']} width={'13.68%'} images={[QRCode, QRCode1, QRCode2]} />
    </div>
  );
};
export default LandingPCPage;
