import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import GlobalKeyboardShortcuts from "@/components/keyboard-events";
import { ThemeProvider } from "@/components/theme-provider";
import BottomRightMenu from "@/components/bottom-right-menu";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-muted-foreground mb-4">The page you're looking for doesn't exist.</p>
          <a href="/" className="text-primary hover:underline">Go back home</a>
        </div>
      </div>
    );
  },
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
