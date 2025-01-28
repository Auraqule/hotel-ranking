import type React from "react";
import { useStore } from "../store/useStore";
import { filterHotelsByChains, groupHotelsByChain } from "../utils";
import HotelCard from "./HotelCard";
import { motion } from "framer-motion";

export const HotelList: React.FC = () => {
  const { hotels, chains, selectedChains } = useStore();
  const filteredHotels = filterHotelsByChains(hotels, selectedChains);
  const groupedHotels = groupHotelsByChain(filteredHotels, chains);

  return (
    <div className="space-y-8">
      {Object.entries(groupedHotels).map(([chainId, chainHotels]) => (
        <motion.div
          key={chainId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            {chainId === "independent"
              ? "Independent Hotels"
              : chains.find((c) => c.id === chainId)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chainHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} chains={chains} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
