import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Settings Store
interface SettingsStoreState {
  // Appearance settings
  nightMode: boolean;
  backgroundNoise: 'default' | 'none' | 'low' | 'high';
  backgroundBlur: 'default' | 'low' | 'subtle' | 'high' | 'very-high';
  animatedBackground: boolean;
  
  // Advanced settings
  debugMode: boolean;
  disableKeybinds: boolean;
}

interface SettingsStoreActions {
  // Appearance actions
  setNightMode: (nightMode: boolean) => void;
  setBackgroundNoise: (backgroundNoise: 'default' | 'none' | 'low' | 'high') => void;
  setBackgroundBlur: (backgroundBlur: 'default' | 'low' | 'subtle' | 'high' | 'very-high') => void;
  setAnimatedBackground: (animatedBackground: boolean) => void;
  
  // Advanced actions
  setDebugMode: (debugMode: boolean) => void;
  setDisableKeybinds: (disableKeybinds: boolean) => void;
}

type SettingsStore = SettingsStoreState & SettingsStoreActions;

const initialSettingsState: SettingsStoreState = {
  // Appearance initial state
  nightMode: false,
  animatedBackground: false,
  backgroundNoise: 'default',
  backgroundBlur: 'default',
  
  // Advanced initial state
  debugMode: false,
  disableKeybinds: false,
};

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialSettingsState,
      // Appearance actions
      setNightMode: (nightMode: boolean) => set({ nightMode }),
      setAnimatedBackground: (animatedBackground: boolean) => set({ animatedBackground }),
      setBackgroundNoise: (backgroundNoise: 'default' | 'none' | 'low' | 'high') => set({ backgroundNoise }),
      setBackgroundBlur: (backgroundBlur: 'default' | 'low' | 'subtle' | 'high' | 'very-high') => set({ backgroundBlur }),
      
      // Advanced actions
      setDebugMode: (debugMode: boolean) => set({ debugMode }),
      setDisableKeybinds: (disableKeybinds: boolean) => set({ disableKeybinds }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Appearance state
        nightMode: state.nightMode,
        animatedBackground: state.animatedBackground,
        backgroundNoise: state.backgroundNoise,
        backgroundBlur: state.backgroundBlur,
        
        // Advanced state
        debugMode: state.debugMode,
        disableKeybinds: state.disableKeybinds
      }),
    }
  )
);

export { useSettingsStore };
