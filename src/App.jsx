import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import StructuredData from "./components/StructuredData.jsx";
import Home from "./pages/Home.jsx";
import ActualitesPage from "./pages/ActualitesPage.jsx";
import ActualiteDetail from "./pages/ActualiteDetail.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StructuredData />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actualites" element={<ActualitesPage />} />
          <Route path="/actualites/:id" element={<ActualiteDetail />} />
        </Routes>
        <Footer />
        <CartDrawer />
      </CartProvider>
    </AuthProvider>
  );
}
