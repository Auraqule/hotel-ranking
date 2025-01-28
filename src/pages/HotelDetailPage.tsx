import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import L from "leaflet";
import { useStore } from "../store/useStore";
import { Hotel } from "../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const extra = {
  description: "A comfortable and convenient place to stay.",
  chainName: "Cozy Hotels",
  rating: 4.5,
  img: `https://a0.muscache.com/im/pictures/a3f630c1-6a5c-41ff-962a-e67b6fba51fc.jpg?im_w=720&im_format=avif`,
};

export default function HotelDetail() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<(Hotel & { chainName: string }) | null>(
    null
  );
  const store = useStore();

  useEffect(() => {
    const foundHotel = store.hotels.find((hotel) => hotel.id === id);
    if (!foundHotel) return;
    const chainName = store.chains.find((c) => c.id === foundHotel.chainId);
    setHotel({ ...foundHotel, chainName: chainName?.name! });
  }, [id, store]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-2 lg:px-6 w-screen pt-[7vh]">
      <Link to="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
        </Button>
      </Link>
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="relative p-0">
          <img
            src={extra?.img || "/placeholder.svg"}
            alt={hotel?.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 left-4 px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md">
            {hotel?.chainName}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
            {hotel.name}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mb-4">
            {hotel.city}, {hotel.country}
          </CardDescription>
          <div className="flex items-center gap-2 text-lg text-gray-700 mb-6">
            <span>{extra.rating} ★</span>
          </div>
          <p className="text-gray-700 mb-8">{extra.description}</p>
          <div className="  rounded-lg overflow-hidden mb-8 w-full">
            <MapContainer
              center={[Number(hotel?.latitude), Number(hotel?.longitude)]}
              zoom={6}
              //   scrollWheelZoom={false}
              style={{ height: "50vh", width: "100vw" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[Number(hotel?.latitude), Number(hotel?.longitude)]}
              >
                <Popup>
                  Hotel. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Book Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
