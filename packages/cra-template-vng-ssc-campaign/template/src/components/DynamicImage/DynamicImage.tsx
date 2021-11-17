import React from 'react';
import { omit } from 'lodash';
import useProgressiveImg from './useProgressiveImg';

interface ExImages extends React.HTMLAttributes<HTMLImageElement> {
  images?: (string | undefined)[];
  width?: number | string | undefined;
  height?: number | string | undefined;
  className?: string;
}

interface Props {
  lowQuality?: string;
  mediumQuality?: string;
  highQuality?: string;
  width?: number | string | undefined;
  height?: number | string | undefined;
  images?: string[];
  className?: string;
}

const ExpensiveImage: React.FC<ExImages> = ({ images = [], width, height, className, ...otherProps }) => {
  const [currentSrc, { blur }] = useProgressiveImg(...images);
  return (
    <img
      width={width}
      height={height}
      style={{ filter: blur ? 'blur(1px)' : 'none' }}
      src={currentSrc}
      alt=""
      className={className}
      {...omit(otherProps, ['style', 'src', 'alt', 'className'])}
    />
  );
};

const DynamicImage: React.FC<Props> = ({
  lowQuality,
  mediumQuality,
  highQuality,
  width,
  height,
  images,
  className,
}) => {
  if (!images && !lowQuality && !mediumQuality && !highQuality) {
    return <img width={width} height={height} alt="" className={className} />;
  }
  return (
    <ExpensiveImage
      className={className}
      images={images || [lowQuality, mediumQuality, highQuality]}
      width={width}
      height={height}
    />
  );
};

export default DynamicImage;
