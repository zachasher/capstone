import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HomeContent from "../../components/HomeContent/HomeContent";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

function HomePage() {
  return (
    <div>
      <Header />
      <HomeContent />
      <ImageGallery/>
    </div>
  );
}

export default HomePage;
