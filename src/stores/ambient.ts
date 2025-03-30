import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AmbientAudioStoreState {
  enabled: boolean;
  volume: number;
}

interface AudioStoreActions {

  setAmbientVolume: (volume: number) => void;
  toggleAmbientAudio: () => void;
}

type AmbientStore = AmbientAudioStoreState & AudioStoreActions;

const initialState: AmbientAudioStoreState = {
  enabled: false,
  volume: 0.25,
};

const useAudioStore = create<AmbientStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAmbientVolume: (volume: number) => set({ volume }),
      toggleAmbientAudio: () => set((state) => ({ enabled: !state.enabled })),
    }),
    {
      name: 'audio-store', // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Optional: defaults to localStorage
      partialize: (state) => ({ volume: state.volume, muted: state.enabled }), // Specify which part of the state to persist
    }
  )
);

export default useAudioStore;
