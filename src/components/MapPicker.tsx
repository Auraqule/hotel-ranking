import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Location } from "../hooks/use-detect-location";

interface MapPickerProps {
  latitude: number | null;
  longitude: number | null;
  location: Location | null;
  onLocationChange: (
    lat: number,
    lng: number,
    address: string,
    city: string,
    country: string
  ) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({
  latitude,
  longitude,
  location,
  onLocationChange,
}) => {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(latitude && longitude ? [latitude, longitude] : null);

  // Custom icon for the selected location
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  useEffect(() => {
    console.log("location", location);

    if (location?.lat && location.lon) {
      setSelectedPosition([Number(location?.lat), Number(location?.lon)]);
    }
  }, [location]);

  const handleMapClick = async (event: {
    latlng: { lat: number; lng: number };
  }) => {
    const { lat, lng } = event.latlng;

    setSelectedPosition([lat, lng]);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      console.log("data", data);

      const address = data.display_name || "Unknown Address";
      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.state ||
        "Unknown City";
      const country = data.address.country || "Unknown Country";

      onLocationChange(lat, lng, address, city, country);
    } catch (error) {
      console.error("Error fetching address details:", error);
      onLocationChange(
        lat,
        lng,
        `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
        "Unknown City",
        "Unknown Country"
      );
    }
  };

  const EventHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <MapContainer
      center={selectedPosition || [0, 0]}
      zoom={3}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedPosition && (
        <Marker position={selectedPosition} icon={customIcon}>
          <Popup>Selected Location</Popup>
        </Marker>
      )}
      <EventHandler />
    </MapContainer>
  );
};

export default MapPicker;
