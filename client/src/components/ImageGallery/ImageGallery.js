import React from "react";
import "./image-gallery.scss";
import Image1 from "../../Assets/images/gallery/image1.jpg";
import Image2 from "../../Assets/images/gallery/image2.jpg";
import Image3 from "../../Assets/images/gallery/image3.jpg";
import Image4 from "../../Assets/images/gallery/image4.jpg";
import Image5 from "../../Assets/images/gallery/image5.jpg";
import Image6 from "../../Assets/images/gallery/image6.jpg";

function ImageGallery() {
  return (
    <section className="gallery">
      <div className="gallery__photos">
        <img src={Image2} className="gallery__item"></img>
        <img src={Image1} className="gallery__item--middle"></img>
        <img src={Image3} className="gallery__item"></img>
        <img src={Image5} className="gallery__item"></img>
        <img src={Image4} className="gallery__item--middle"></img>
        <img src={Image6} className="gallery__item"></img>
      </div>
    </section>
  );
}

export default ImageGallery;
