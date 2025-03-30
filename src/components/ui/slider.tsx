"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, disabled, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      "data-[orientation='horizontal']:w-full data-[orientation='vertical']:h-6 data-[orientation='horizontal']:items-center",
      "data-[orientation='vertical']:h-full data-[orientation='horizontal']:w-6 data-[orientation='vertical']:justify-center",
      className
    )}
    disabled={disabled}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "relative grow overflow-hidden rounded-full backdrop-blur-2xl backdrop-brightness-90 bg-white/10",

        "data-[orientation='horizontal']:h-6 data-[orientation='horizontal']:w-full",
        "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-6"
      )}
    >
      <SliderPrimitive.Range
        className={cn(
          "absolute rounded-full bg-white",
          "data-[orientation='horizontal']:h-full",
          "data-[orientation='vertical']:w-full",
          disabled && "bg-white/30"
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn("block data-[orientation='horizontal']:w-3 data-[orientation='horizontal']:h-6 data-[orientation='vertical']:h-3 data-[orientation='vertical']:w-6 bg-red-transparent relative data-[orientation='horizontal']:-translate-x-1 cursor-pointer focus:ring-none focus:outline-none", disabled && "cursor-not-allowed")} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
