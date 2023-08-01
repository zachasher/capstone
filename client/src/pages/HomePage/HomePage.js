import React from "react";
import Header from "../../components/Header/Header";
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
