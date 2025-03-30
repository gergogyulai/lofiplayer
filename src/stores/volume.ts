import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AudioStoreState {
  volume: number;
  muted: boolean;
}

interface AudioStoreActions {
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

type AudioStore = AudioStoreState & AudioStoreActions;

const initialState: AudioStoreState = {
  volume: 0.75,
  muted: false,
};

const useAudioStore = create<AudioStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setVolume: (volume: number) => set({ volume }),
      toggleMute: () => set((state) => ({ muted: !state.muted })),
    }),
    {
      name: 'audio-store', // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Optional: defaults to localStorage
      partialize: (state) => ({ volume: state.volume, muted: state.muted }), // Specify which part of the state to persist
    }
  )
);

export default useAudioStore;
