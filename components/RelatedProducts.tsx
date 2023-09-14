'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }: { products: IProduct[] }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1023, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1
    }
  };

  return (
    <div className="mb-[100px] mt-[50px] md:mb-0 md:mt-[100px]">
      <div className="heading-2 mb-5">You Might Also Like</div>
      <Carousel
        responsive={responsive}
        containerClass="-mx-[10px]"
        itemClass="px-[10px]"
      >
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
        {products?.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
