import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Appearance Store
interface AppearanceStoreState {
  nightMode: boolean;
  backgroundNoise: 'default' | 'low' | 'high';
  backgroundBlur: 'default' | 'low' | 'subtle' | 'high' | 'very-high';
  animatedBackground: boolean;
}

interface AppearanceStoreActions {
  setNightMode: (nightMode: boolean) => void;
  setBackgroundNoise: (backgroundNoise: 'default' | 'low' | 'high') => void;
  setAnimatedBackground: (animatedBackground: boolean) => void;
}

type AppearanceStore = AppearanceStoreState & AppearanceStoreActions;

const initialAppearanceState: AppearanceStoreState = {
  nightMode: false,
  animatedBackground: false,
  backgroundNoise: 'default',
  backgroundBlur: 'default',
};

const useAppearanceStore = create<AppearanceStore>()(
  persist(
    (set) => ({
      ...initialAppearanceState,
      setNightMode: (nightMode: boolean) => set({ nightMode }),
      setAnimatedBackground: (animatedBackground: boolean) => set({ animatedBackground }),
      setBackgroundNoise: (
        backgroundNoise: 'default' | 'low' | 'high') => set({ backgroundNoise }
      ),
      setBackgorundBlur: (
        backgroundBlur: 'default' | 'low' | 'subtle' | 'high' | 'very-high') => set({ backgroundBlur }
      ),
    }),
    {
      name: 'appearance-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => (
        {
          nightMode: state.nightMode,
          animatedBackground: state.animatedBackground,
          backgroundNoise: state.backgroundNoise,
          backgroundBlur: state.backgroundBlur
        }
      ),
    }
  )
);

export default useAppearanceStore;
