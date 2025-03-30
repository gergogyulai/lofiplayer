import { create } from 'zustand';

interface PlaybackStoreState {
  playing: boolean;
  loading: boolean;
}

interface PlaybackStoreActions {
  setPlaying: (playing: boolean) => void;
  togglePlaying: () => void;
  setLoading: (loading: boolean) => void;
  resetState: () => void;
}

const initialState: PlaybackStoreState = {
  playing: false,
  loading: false,
};

const usePlaybackStore = create<PlaybackStoreState & PlaybackStoreActions>((set) => ({
  ...initialState,
  setPlaying: (playing) => set({ playing }),
  togglePlaying: () => set((state) => ({ playing: !state.playing })),
  setLoading: (loading) => set({ loading }),
  resetState: () => set(initialState),
}));

export default usePlaybackStore;
