import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// Advanced Store
interface AdvancedStoreState {
  debugMode: boolean;
  disableKeybinds: boolean;
}

interface AdvancedStoreActions {
  setDebugMode: (debugMode: boolean) => void;
  setDisableKeybinds: (disableKeybinds: boolean) => void;
}

type AdvancedStore = AdvancedStoreState & AdvancedStoreActions;

const initialAdvancedState: AdvancedStoreState = {
  debugMode: false,
  disableKeybinds: false,
};

const useAdvancedStore = create<AdvancedStore>()(
  persist(
    (set) => ({
      ...initialAdvancedState,
      setDebugMode: (debugMode: boolean) => set({ debugMode }),
      setDisableKeybinds: (disableKeybinds: boolean) => set({ disableKeybinds }),
    }),
    {
      name: 'advanced-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ debugMode: state.debugMode, disableKeybinds: state.disableKeybinds }),
    }
  )
);

export default useAdvancedStore;
