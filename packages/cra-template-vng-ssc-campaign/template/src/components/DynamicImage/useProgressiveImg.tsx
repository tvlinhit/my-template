import { useState, useEffect } from 'react';

const ratio = Math.round(window.devicePixelRatio);

function loadImage(src: string, onload?: () => void, onerror?: () => void) {
  // console.log("loadImage: ", src);
  const image = new Image();
  image.src = src;
  if (onload) {
    image.onload = onload;
  }
  if (onerror) {
    image.onerror = onerror;
  }
}

const useProgressiveImg = (low = '', medium = '', high = ''): [string, { blur: boolean }] => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  let currentIndex = 3;
  function loadImages() {
    let arr;
    if (ratio >= 3) {
      arr = [high, medium, low];
    } else {
      arr = [medium, low];
    }

    arr
      .filter((src) => !!src)
      .forEach((src, index) => {
        loadImage(src, () => {
          if (index < currentIndex) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            currentIndex = index;
            // console.log("loadedImage: ", src);
            setCurrentSrc(src);
          }
        });
      });
  }
  useEffect(loadImages, [low, medium, high]);
  return [currentSrc, { blur: currentSrc === low }];
};

export default useProgressiveImg;
