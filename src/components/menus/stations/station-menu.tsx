import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { StationType } from "@/lib/stations";
import { stations } from "@/lib/stations";
import { ScrollArea } from "@/components/ui/scroll-area";
import StationCard from '@/components/menus/stations/station-card';
import { Button } from "@/components/ui/button";
import Fuse from 'fuse.js';
import { X } from 'lucide-react';
import usePlaybackStore from '@/stores/playback';


export default function StationsMenu({ isOpen, onOpenChange } : { isOpen: boolean, onOpenChange: (open: boolean) => void }){
  const [search, setSearch] = React.useState('');
  const [filteredStations, setFilteredStations] = React.useState(stations);
  const { resetState } = usePlaybackStore();

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      keys: ["name", "description"],
      includeScore: true,
      threshold: 0.4
    };

    return new Fuse(stations, fuseOptions);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      setSearch('');
      setFilteredStations(stations);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (search) {
      console.log(`Searching for ${search}`);
      const results = fuse.search(search);
      setFilteredStations(results.map(result => result.item));
    } else {
      setFilteredStations(stations);
    }
  }, [fuse, search]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Stations</SheetTitle>
          <SheetDescription className='text-white/50'>
            {"Wanna change it up a bit? You've come to the right place."}
          </SheetDescription>
        </SheetHeader>
        <div className='flex h-full min-h-full flex-col justify-between gap-4 pb-20 pt-4'>
        <div className="relative">
          <Input
            type='text'
            placeholder='Search for a station'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10"
          />
          {/* eslint-disable-next-line tailwindcss/enforces-shorthand */}
          {search && (
            <Button size="icon-sm" className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 p-1" onClick={() => {setSearch("")}}>
              <X/>
            </Button>
          )}
        </div>
          <ScrollArea className="">
            <div className='flex flex-col gap-2'>
              {filteredStations.map((station: StationType) => (
                <div key={station.id} onClick={resetState}>
                  <StationCard key={station.id} station={station} />
                </div>
              ))}
            </div>
          </ScrollArea>
          {/* <Button className='w-full shadow-white/10'>Add my own station</Button> */}
        </div>
      </SheetContent>
    </Sheet>
  )
}
