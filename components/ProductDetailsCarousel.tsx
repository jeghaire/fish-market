"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ images }: any) => {
  return (
    <div className="sticky top-[50px] mx-auto w-full max-w-[1360px] text-[20px] text-white">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {/* {images.map((image: Image) => {
          <img src={urlFor(image).url()} alt="" />;
        })} */}
        <img src="/nike.jpg" />
        <img src="/nike.jpg" />
        <img src="/nike.jpg" />
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
