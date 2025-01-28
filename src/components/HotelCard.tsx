import type React from "react";
import { Link } from "react-router-dom";
import type { Hotel } from "../types";
import { useStore } from "../store/useStore";
import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "./ui/button";

import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HotelCardProps {
  hotel: Hotel;
  chains: { id: string; name: string }[];
}

const extra = {
  description: "A comfortable and convenient place to stay.",
  chainName: "Cozy Hotels",
  rating: 4.5,
  img: `https://a0.muscache.com/im/pictures/a3f630c1-6a5c-41ff-962a-e67b6fba51fc.jpg?im_w=720&im_format=avif`,
};

const HotelCard: React.FC<HotelCardProps> = ({ hotel, chains }) => {
  const { deleteHotel } = useStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <div className="relative">
        <img
          src={
            extra.img ||
            "https://a0.muscache.com/im/pictures/a3f630c1-6a5c-41ff-962a-e67b6fba51fc.jpg?im_w=720&im_format=avif"
          }
          alt={hotel.name}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-3 left-3 px-4 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-md">
          {chains.find((chain) => chain.id === hotel.chainId)?.name ||
            "Unknown Chain"}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
        <p className="text-gray-600">
          {hotel.city}, {hotel.country}
        </p>
        <p className="text-gray-600">{hotel.address}</p>
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-5 w-5 ${
                i < extra.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-500">{extra.rating} ★</span>
        </div>
      </div>
      <div className=" px-6 py-4 flex justify-between items-center">
        <Link to={`/hotel-detail/${hotel.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            View hotel
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 ring-1 ring-gray-400"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right">
            <DropdownMenuItem asChild>
              <Link
                to={`/edit-hotel/${hotel.id}`}
                className="w-full flex items-center"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => deleteHotel(hotel.id)}
              className="text-red-600 hover:bg-red-50 focus:bg-red-50"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HotelCard;
