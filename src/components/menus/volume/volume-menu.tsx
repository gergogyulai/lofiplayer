"use client";

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, SquareLibrary, VolumeX, Volume, Volume1, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider"
import useAudioStore from '@/stores/volume';
import { Button } from '@/components/ui/button';

export default function VolumeMenu() {
  const { volume, setVolume, muted, toggleMute } = useAudioStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} id="VolumeMenuButton">
          <VolumeIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={"top"}
        className='flex flex-col items-center h-72 gap-2.5 w-14 pb-2.5 mb-1'
      >
        <Slider
          value={[volume]}
          onValueChange={(e) => setVolume(e[0])}
          orientation='vertical'
          min={0}
          max={1}
          step={0.01}
          aria-label="Volume"
          className="slider"
          disabled={muted}
        />
        <Button size={"icon-sm"} onClick={() => toggleMute()} id="VolumeMenuButton">
          <VolumeIcon />
        </Button>
      </PopoverContent>
    </Popover>
  );
}


const VolumeIcon = () => {
  const { volume, muted } = useAudioStore();
  if (muted) {
    return (
      <div className="relative">
        <VolumeX className="absolute" />
        <VolumeX className="blur-md" />
      </div>
    );
  }

  if (volume > 0.75) {
    return (
      <div className="relative">
        <Volume2 className="absolute" />
        <Volume2 className="blur-md" />
      </div>
    );
  } else if (volume > 0.5) {
    return (
      <div className="relative">
        <Volume1 className="absolute" />
        <Volume1 className="blur-md" />
      </div>
    )
  } else if (volume > 0) {
    return (
      <div className="relative">
        <Volume className="absolute" />
        <Volume className="blur-md" />
      </div>
    );
  } else {
    return (
      <div className="relative">
        <VolumeX className="absolute" />
        <VolumeX className="blur-md" />
      </div>
    );
  }
};
