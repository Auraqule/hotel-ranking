import type React from "react";
import { useNavigate } from "react-router-dom";
import HotelForm from "../components/HotelForm";
import { useStore } from "../store/useStore";
import type { Hotel } from "../types";

const AddHotelPage: React.FC = () => {
  const navigate = useNavigate();
  const { addHotel } = useStore();

  const handleSubmit = (hotel: Hotel) => {
    addHotel({ ...hotel, id: Date.now().toString() });
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen pt-[7vh] px-2">
      <HotelForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddHotelPage;
