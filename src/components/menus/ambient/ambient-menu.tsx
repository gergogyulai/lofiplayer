"use client";

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, SquareLibrary, VolumeX, Volume, Volume1, Volume2, AudioLines, BookAudio } from "lucide-react";
import { Slider } from "@/components/ui/slider"
import useAudioStore from '@/stores/volume';
import { Button } from '@/components/ui/button';

export default function AmbientMenu() {
  const { volume, setVolume, muted, toggleMute } = useAudioStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} id="VolumeMenuButton">
          <AudioLines />
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

        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon-sm"} id="VolumeMenuButton">
              <BookAudio />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side={"left"}
            className='flex flex-col items-center h-14 gap-2.5 w-32 pb-2.5 mb-1'
          >
            random text
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
}
