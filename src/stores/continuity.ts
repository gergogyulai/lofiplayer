import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ContinuityStoreState {
  lastPlayedStationId: string;
  lastPlayedStationName: string;
  isLastPlayedStationCustom: boolean;
}

interface ContinuityStoreActions {
  setLastPlayedStation: (
    lastPlayedStationId: string,
    lastPlayedStationName: string,
    isLastPlayedStationCustom: boolean
  ) => void;
}

type ContinuityStore = ContinuityStoreState & ContinuityStoreActions;

const initialState: ContinuityStoreState = {
  lastPlayedStationId: 'default',
  lastPlayedStationName: 'Default',
  isLastPlayedStationCustom: false,
};

const useContinuityStore = create<ContinuityStore>()(
  persist(
    (set) => ({
      ...initialState,
      setLastPlayedStation: (lastPlayedStationId, lastPlayedStationName, isLastPlayedStationCustom) =>
        set({
          lastPlayedStationId,
          lastPlayedStationName,
          isLastPlayedStationCustom,
        }),
    }),
    {
      name: 'continuity-store', // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Optional: defaults to localStorage
      partialize: (state) => ({
        lastPlayedStationId: state.lastPlayedStationId,
        lastPlayedStationName: state.lastPlayedStationName,
        isLastPlayedStationCustom: state.isLastPlayedStationCustom,
      }), // Specify which part of the state to persist
    }
  )
);

export default useContinuityStore;
