import type React from "react";
import { useState, useMemo } from "react";
import { useStore } from "../store/useStore";
import HotelCard from "../components/HotelCard";
import { filterHotelsByChains, groupHotelsByChain } from "../utils";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import Select from "react-select";
import { useDetectUserLocation } from "../hooks/use-detect-location";

const HomePage: React.FC = () => {
  const { hotels, chains, selectedChains, setSelectedChains } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  useDetectUserLocation();

  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedChains(selectedValues);
  };

  const filteredHotels = useMemo(() => {
    return filterHotelsByChains(hotels, selectedChains).filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hotels, selectedChains, searchTerm]);

  const groupedHotels = useMemo(
    () => groupHotelsByChain(filteredHotels, chains),
    [filteredHotels, chains]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-screen pt-[10vh]">
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Discover Your Next Stay
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Browse a curated collection of luxurious hotels tailored to your
          preferences and location.
        </p>
      </header>

      <Card className="mb-8 shadow-lg rounded-2xl max-w-2xl mx-auto border border-gray-200">
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="search" className="space-y-6">
            <TabsList className="flex justify-center space-x-4 bg-transparent">
              <div className="bg-gray-100 rounded-full px-2 py-1 sm:px-4 sm:py-2 shadow-sm">
                <TabsTrigger
                  value="search"
                  className="text-sm text-gray-600 px-3 py-1 sm:px-4 sm:py-2"
                >
                  Search
                </TabsTrigger>
                <TabsTrigger
                  value="filter"
                  className="text-sm text-gray-600 px-3 py-1 sm:px-4 sm:py-2"
                >
                  Filters
                </TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="search">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                <Input
                  placeholder="Search by name, city, or country"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full max-w-md p-3 text-base sm:text-lg rounded-xl shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={() => setSearchTerm("")}
                  className="w-full sm:w-24 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Clear
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="filter">
              <Select
                options={chains.map((chain) => ({
                  value: chain.id,
                  label: chain.name,
                }))}
                placeholder="Select hotel chains"
                value={chains
                  .filter((chain) => selectedChains.includes(chain.id))
                  .map((chain) => ({ value: chain.id, label: chain.name }))}
                onChange={handleChange}
                isMulti
                className="w-full max-w-md mx-auto"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Separator className="mb-8" />

      {filteredHotels.length === 0 ? (
        <div className="text-center text-gray-500">
          No hotels found. Try adjusting your filters or search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(groupedHotels).map(([_, chainHotels]) =>
            chainHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} chains={chains} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
