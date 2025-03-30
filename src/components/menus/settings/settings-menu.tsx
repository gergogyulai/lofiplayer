"use client"

import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import Section from '@/components/menus/settings/section';
import KeyboardShortcut from '@/components/ui/keyboard-shortcut';
import { useSettingsStore } from '@/stores/settings';
import { ChevronDown, ChevronUp } from 'lucide-react';


export default function SettingsMenu({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const {
    nightMode,
    backgroundNoise,
    animatedBackground,
    setNightMode,
    setBackgroundNoise,
    setAnimatedBackground,
    debugMode,
    disableKeybinds,
    setDebugMode,
    setDisableKeybinds
  } = useSettingsStore();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Settings
          </SheetTitle>
          <SheetDescription>
            {"So you want to change some settings huh? You've come to the right place."}
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4 pt-2'>
          <Section
            title="Appearance"
            // description="Customize the look and feel of the app."
          >
            <div className='flex min-h-16 items-center justify-between gap-1'>
              <div>
                <h2 className='font-semibold'>Animated Background</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"Tired of the still background? Why not make it move a little?"}
                </p>
              </div>
              <Switch
                checked={animatedBackground}
                onCheckedChange={setAnimatedBackground}
              />
            </div>
            <div className='flex min-h-16 items-center justify-between'>
              <div>
                <h2 className='font-semibold'>Background Blur</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"Makes everything look more clean."}
                </p>
              </div>
              <Select
                // value={backgroundNoise}
                // onValueChange={setBackgroundNoise}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent position={"popper"}>
                  <SelectItem value="vhight">Very High</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="subtle">Subtle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex min-h-16 items-center justify-between'>
              <div>
                <h2 className='font-semibold'>Background Image Noise</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"It's a subtle effect that makes the background less boring."}
                </p>
              </div>
              <Select
                value={backgroundNoise}
                onValueChange={setBackgroundNoise}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent position={"popper"}>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex min-h-16 items-center justify-between'>
              <div>
                <h2 className='font-semibold'>Night Mode</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"Night version of the app. It's easier on the eyes. Works best with supported stations."}
                </p>
              </div>
              <Switch
                checked={nightMode}
                onCheckedChange={setNightMode}
              />
            </div>
          </Section>
          <Section
            title="Advanced"
            // description="Advanced settings for power users."
          >
            {/* <div className='flex min-h-16 items-center justify-between'>
              <div>
                <h2 className='font-semibold'>Debug Mode</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"Secret settings and info for the curious."}
                </p>
              </div>
              <Switch
                checked={debugMode}
                onCheckedChange={setDebugMode}
              />
            </div> */}
            <div className='flex min-h-16 items-center justify-between'>
              <div>
                <h2 className='font-semibold'>Disable keybinds</h2>
                <p className='line-clamp-2 text-sm opacity-70'>
                  {"Disable all keybinds. You can still use the player controls."}
                </p>
              </div>
              <Switch
                checked={disableKeybinds}
                onCheckedChange={setDisableKeybinds}
              />
            </div>
          </Section>
          {!disableKeybinds && (
            <Section
              title="Keyboard Shortcuts"
              >
              <div className="space-y-4 mt-2">
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Command menu</h2>
                  </div>
                  <KeyboardShortcut command>
                    K
                  </KeyboardShortcut>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Play/Pause</h2>
                  </div>
                  <KeyboardShortcut>
                    P
                  </KeyboardShortcut>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Mute/Unmute</h2>
                  </div>
                  <KeyboardShortcut>
                    M
                  </KeyboardShortcut>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Stations</h2>
                  </div>
                  <KeyboardShortcut>
                    S
                  </KeyboardShortcut>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Volume Up</h2>
                  </div>
                  <KeyboardShortcut>
                    <ChevronUp/>
                  </KeyboardShortcut>
                </div>
                <div className='flex items-center justify-between'>
                  <div>
                    <h2 className='font-semibold'>Volume Down</h2>
                  </div>
                  <KeyboardShortcut>
                    <ChevronDown/>
                  </KeyboardShortcut>
                </div>
              </div>
            </Section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
