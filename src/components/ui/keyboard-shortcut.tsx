import React from "react"
import { cn } from "@/lib/utils"
import { Command } from "lucide-react";

interface KeyboardShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  command?: boolean;
}

const KeyboardShortcut = ({
  command,
  className,
  ...props
}: KeyboardShortcutProps) => {
  return (
    <div className={`flex backdrop-blur-2xl backdrop-brightness-90 w-fit bg-white/10 items-center space-x-2 ${command ? "py-1 px-3" : "min-h-8 min-w-8 text-center"} rounded-full select-none`}>
      {command && (
        <>
          <Command className="w-4 h-4" />
          <span>+</span>
        </>
      )}
      <span
        className={cn(
          "text-sm tracking-widest m-auto",
          className
        )}
        {...props}
      />
    </div>
  )
}
KeyboardShortcut.displayName = "KeyboardShortcut"

export default KeyboardShortcut
