import { create } from 'zustand';

interface MenuStoreState {
  stationsOpen: boolean;
  settingsOpen: boolean;
  volumeOpen: boolean;
  commandMenuOpen: boolean;
  developerMenuOpen: boolean;
}

interface MenuStoreStateActions {
  openVolumeMenu: () => void;
  closeVolumeMenu: () => void;
  toggleVolumeMenu: () => void;
  setVolumeMenuOpen: (volumeOpen: boolean) => void;

  openStationsMenu: () => void;
  closeStationsMenu: () => void;
  toggleStationsMenu: () => void;
  setStationsMenu: (stationsOpen: boolean) => void;

  openSettingMenus: () => void;
  closeSettingsMenu: () => void;
  toggleSettingsMenu: () => void;
  setSettingsMenu: (settingsOpen: boolean) => void;

  openCommandMenu: () => void;
  closeCommandMenu: () => void;
  toggleCommandMenu: () => void;
  setCommandMenu: (commandMenuOpen: boolean) => void;

  openDeveloperMenu: () => void;
  closeDeveloperMenu: () => void;
  toggleDeveloperMenu: () => void;
  setDeveloperMenu: (developerMenuOpen: boolean) => void;
}

const initialMenuStoreState: MenuStoreState = {
  stationsOpen: false,
  settingsOpen: false,
  volumeOpen: false,
  commandMenuOpen: false,
  developerMenuOpen: false
};

const useMenuStore = create<MenuStoreState & MenuStoreStateActions>((set) => ({
  ...initialMenuStoreState,
  openStationsMenu: () => set({ stationsOpen: true }),
  closeStationsMenu: () => set({ stationsOpen: false }),
  toggleStationsMenu: () => set((state) => ({ stationsOpen: !state.stationsOpen })),
  setStationsMenu: (stationsOpen: boolean) => set({ stationsOpen }),

  openVolumeMenu: () => set({ volumeOpen: true }),
  closeVolumeMenu: () => set({ volumeOpen: false }),
  toggleVolumeMenu: () => set((state) => ({ volumeOpen: !state.volumeOpen })),
  setVolumeMenuOpen: (volumeOpen: boolean) => set({ volumeOpen }),

  openSettingMenus: () => set({ settingsOpen: true }),
  closeSettingsMenu: () => set({ settingsOpen: false }),
  toggleSettingsMenu: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
  setSettingsMenu: (settingsOpen: boolean) => set({ settingsOpen }),

  openCommandMenu: () => set({ commandMenuOpen: true }),
  closeCommandMenu: () => set({ commandMenuOpen: false }),
  toggleCommandMenu: () => set((state) => ({ commandMenuOpen: !state.commandMenuOpen })),
  setCommandMenu: (commandMenuOpen: boolean) => set({ commandMenuOpen }),

  openDeveloperMenu: () => set({ developerMenuOpen: true }),
  closeDeveloperMenu: () => set({ developerMenuOpen: false }),
  toggleDeveloperMenu: () => set((state) => ({ developerMenuOpen: !state.developerMenuOpen })),
  setDeveloperMenu: (developerMenuOpen: boolean) => set({ developerMenuOpen })
}));

export default useMenuStore;
