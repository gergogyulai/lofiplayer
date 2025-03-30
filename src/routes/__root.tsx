import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import GlobalKeyboardShortcuts from "@/components/keyboard-events";
import { ThemeProvider } from "@/components/theme-provider";
import BottomRightMenu from "@/components/bottom-right-menu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <main className="min-h-screen bg-background font-sans antialiased">
          <GlobalKeyboardShortcuts />
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <Outlet />
              <BottomRightMenu />
            </div>
          </div>
        </main>
      </ThemeProvider>
    </React.Fragment>
  );
}
