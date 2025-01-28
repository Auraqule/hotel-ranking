import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Hotel, HotelChain } from "../types";

interface HotelState {
  hotels: Hotel[];
  chains: HotelChain[];
  selectedChains: string[];
  addHotel: (hotel: Hotel) => void;
  updateHotel: (id: string, hotel: Partial<Hotel>) => void;
  deleteHotel: (id: string) => void;
  addChain: (chain: HotelChain) => void;
  updateChain: (id: string, chain: Partial<HotelChain>) => void;
  deleteChain: (id: string) => void;
  setSelectedChains: (chains: string[]) => void;
}

export const useStore = create<HotelState>()(
  persist(
    (set) => ({
      hotels: [],
      chains: [],
      selectedChains: [],
      addHotel: (hotel) =>
        set((state) => ({ hotels: [...state.hotels, hotel] })),
      updateHotel: (id, hotel) =>
        set((state) => ({
          hotels: state.hotels.map((h) =>
            h.id === id ? { ...h, ...hotel } : h
          ),
        })),
      deleteHotel: (id) =>
        set((state) => ({ hotels: state.hotels.filter((h) => h.id !== id) })),
      addChain: (chain) =>
        set((state) => ({ chains: [...state.chains, chain] })),
      updateChain: (id, chain) =>
        set((state) => ({
          chains: state.chains.map((c) =>
            c.id === id ? { ...c, ...chain } : c
          ),
        })),
      deleteChain: (id) =>
        set((state) => ({ chains: state.chains.filter((c) => c.id !== id) })),
      setSelectedChains: (chains) => set({ selectedChains: chains }),
    }),
    {
      name: "hotel-ranking-storage",
    }
  )
);
