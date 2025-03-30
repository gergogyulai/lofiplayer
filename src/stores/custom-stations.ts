import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type StationType = {
  id: string;
  name: string;
  description?: string;
  streamUrl: string;
  bg: string;
  animated?: boolean;
  animatedBg?: string;
  cover: string;
  status: 'online' | 'offline';
  custom: boolean;
};

interface StationStoreState {
  stations: StationType[];
}

interface StationStoreActions {
  addStation: (station: StationType) => void;
  updateStation: (id: string, updatedStation: Partial<StationType>) => void;
  removeStation: (id: string) => void;
}

type StationStore = StationStoreState & StationStoreActions;

const initialState: StationStoreState = {
  stations: [],
};

const useStationStore = create<StationStore>()(
  persist(
    (set) => ({
      ...initialState,
      addStation: (station: StationType) => set((state) => ({
        stations: [...state.stations, station],
      })),
      updateStation: (id: string, updatedStation: Partial<StationType>) => set((state) => ({
        stations: state.stations.map((station) =>
          station.id === id ? { ...station, ...updatedStation } : station
        ),
      })),
      removeStation: (id: string) => set((state) => ({
        stations: state.stations.filter((station) => station.id !== id),
      })),
    }),
    {
      name: 'station-store', // Name of the item in storage
      storage: createJSONStorage(() => localStorage), // Optional: defaults to localStorage
      partialize: (state) => ({ stations: state.stations }), // Specify which part of the state to persist
    }
  )
);

export default useStationStore;
