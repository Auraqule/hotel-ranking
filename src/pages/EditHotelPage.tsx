import type React from "react";
import { useParams, useNavigate } from "react-router-dom";
import HotelForm from "../components/HotelForm";
import { useStore } from "../store/useStore";
import type { Hotel } from "../types";

const EditHotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { hotels, updateHotel } = useStore();

  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const handleSubmit = (updatedHotel: Hotel) => {
    updateHotel(id!, updatedHotel);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Hotel</h1>
      <HotelForm hotel={hotel} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditHotelPage;
