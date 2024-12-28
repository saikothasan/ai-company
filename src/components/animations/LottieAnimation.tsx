import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  src,
  className = '',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  return (
    <Player
      src={src}
      className={className}
      loop={loop}
      autoplay={autoplay}
      style={{ width: '100%', height: '100%' }}
    />
  );
}