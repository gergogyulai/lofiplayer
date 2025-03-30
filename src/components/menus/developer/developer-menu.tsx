"use client"

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

export default function DeveloperMenu({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Debug Menu</SheetTitle>
          <SheetDescription className='text-white/50'>
            {"Looking under the hood, huh? Here are some tools to help you out."}
          </SheetDescription>
        </SheetHeader>
        <div className='flex h-full min-h-full flex-col justify-between gap-4 pb-20 pt-4'>
        </div>
      </SheetContent>
    </Sheet>
  )
}
