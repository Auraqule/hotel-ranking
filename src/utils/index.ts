import type { Hotel, HotelChain } from "../types";

export const groupHotelsByChain = (
  hotels: Hotel[],
  chains: HotelChain[]
): Record<string, Hotel[]> => {
  const grouped: Record<string, Hotel[]> = {};
  chains.forEach((chain) => {
    grouped[chain.id] = hotels.filter((hotel) => hotel.chainId === chain.id);
  });
  grouped["independent"] = hotels.filter((hotel) => !hotel.chainId);
  return grouped;
};

export const filterHotelsByChains = (
  hotels: Hotel[],
  selectedChains: string[]
): Hotel[] => {
  if (selectedChains.length === 0) return hotels;
  return hotels.filter((hotel) =>
    selectedChains.includes(hotel.chainId || "independent")
  );
};
