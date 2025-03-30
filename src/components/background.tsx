"use client"

import React from 'react';
import { useSettingsStore } from '@/stores/settings';

interface BackgroundBaseProps {
  bgPath: string;
  children: React.ReactNode;
}

interface BackgroundProps extends BackgroundBaseProps {
  animatedBgPath?: string;
}

const BackgroundImageNoise: React.FC = () => {
  const { backgroundNoise } = useSettingsStore();

  const noiseStyles: { [key: string]: string } = {
    default: "opacity-[4%]",
    high: "opacity-[6%]",
    low: "opacity-[2%]",
    none: "hidden"
  };

  const noiseStyle = noiseStyles[backgroundNoise] || noiseStyles.none;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-10 ${noiseStyle}`}
      style={{
        backgroundImage: `url(/assets/grain.png)`,
        backgroundRepeat: 'repeat'
      }}
    />
  );
}

interface AnimatedBackgroundProps {
  animatedBgPath: string;
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ animatedBgPath, children }) => {
  return (
    <div
      // style={{ position: 'relative', width: '100vh', height: '100vh' }}
      // className="relative w-full min-h-screen"
      className='relative z-0 flex h-screen w-full items-center justify-center object-cover'
    >
      <video
        src={animatedBgPath}
        className=" absolute left-0 top-0 z-0 flex h-screen w-full items-center justify-center object-cover blur-2xl saturate-150"
        loop
        muted
        autoPlay
      />
      {children}
    </div>
  );
}

const StillBackground: React.FC<BackgroundBaseProps> = ({ bgPath, children }) => {
  return (
    <div
      className="relative z-0 flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgPath})` }}
    >
      {children}
    </div>
  );
}

const Background: React.FC<BackgroundProps> = ({ animatedBgPath, bgPath, children }) => {
  const { animatedBackground } = useSettingsStore();

  return animatedBackground && animatedBgPath ? (
    <AnimatedBackground animatedBgPath={animatedBgPath}>
      <>
        {children}
        <BackgroundImageNoise />
      </>
    </AnimatedBackground>
  ) : (
    <StillBackground bgPath={bgPath}>
      <>
        {children}
        <BackgroundImageNoise />
      </>
    </StillBackground>
  );
};

export default Background;
