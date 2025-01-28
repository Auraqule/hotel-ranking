import type React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AddHotelPage from "./pages/AddHotelPage";
import AddChainPage from "./pages/AddChainPage";
import EditHotelPage from "./pages/EditHotelPage";
import HotelDetailPage from "./pages/HotelDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-hotel" element={<AddHotelPage />} />
          <Route path="/add-chain" element={<AddChainPage />} />
          <Route path="/edit-hotel/:id" element={<EditHotelPage />} />
          <Route path="/hotel-detail/:id" element={<HotelDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
