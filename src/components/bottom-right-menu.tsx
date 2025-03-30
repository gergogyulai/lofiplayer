import React from 'react';
import { Button } from "@/components/ui/button";
import { SettingsDrawer, StationsMenu, VolumeMenu } from "@/components/menus";
import { Settings, SquareLibrary } from "lucide-react";
import useMenuStore from '@/stores/menus';

export default function BottomRightMenu() {
  const { stationsOpen, toggleStationsMenu, setStationsMenu } = useMenuStore();
  const { settingsOpen, toggleSettingsMenu, setSettingsMenu } = useMenuStore();

  return (
    <React.Fragment>
      <StationsMenu isOpen={stationsOpen} onOpenChange={setStationsMenu} />
      <SettingsDrawer isOpen={settingsOpen} onOpenChange={setSettingsMenu} />

      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        {/* <AmbientMenu/> */}
        <VolumeMenu/>
        <Button size={"icon"} onClick={() => toggleStationsMenu()} id="StationMenuButton">
          <div className="relative">
            <SquareLibrary className="absolute" />
            <SquareLibrary className="blur-md"/>
          </div>
        </Button>
        <Button size={"icon"} onClick={() => toggleSettingsMenu()} id="SettingsMenuButton">
          <div className="relative">
            <Settings className="absolute" />
            <Settings className="blur-md"/>
          </div>
        </Button>
      </div>
    </React.Fragment>
  );
}
