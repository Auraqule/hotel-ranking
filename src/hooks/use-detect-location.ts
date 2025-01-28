import axios from "axios";
import { useEffect, useState } from "react";

const LOC_BASE_URL = `http://ip-api.com/json`;

export type Location = {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
};

type LocationApiResponse = {
  data: Location;
};

export const useDetectUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    async function fetchUserCurrentLocation() {
      try {
        const response: LocationApiResponse = await axios.get(LOC_BASE_URL);
        if (response) {
          setLocation(response.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchUserCurrentLocation();
  }, []);

  return { location };
};
