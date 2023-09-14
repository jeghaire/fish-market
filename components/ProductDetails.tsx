"use client";

import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import toast from "react-hot-toast";

// Redux
import { addToBasket } from "@/store/features/basket/basketSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ProductDetails({ product }: { product: IProduct }) {
  const dispatch = useAppDispatch();

  const addProductToBasket = () => {
    dispatch(addToBasket(product));

    toast.success(`${product.title} added to basket`, {
      position: "bottom-center",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-[50px] md:px-10 lg:flex-row lg:gap-[100px]">
        {/* left column start */}
        <div className="mx-auto w-full max-w-[500px] flex-[1.5] md:w-auto lg:mx-0 lg:max-w-full">
          <ProductDetailsCarousel images={product.image} />
        </div>
        {/* left column end */}

        {/* right column start */}
        <div className="flex-[1] py-3">
          {/* PRODUCT TITLE */}
          <div className="mb-2 text-[34px] font-semibold leading-tight">
            {product.title}
          </div>

          {/* PRODUCT SUBTITLE */}
          <div className="mb-5 text-lg font-semibold">{product.title}</div>

          {/* PRODUCT PRICE */}
          <div className="flex items-center">
            <p className="mr-2 text-lg font-semibold">
              MRP : &#8377;{product.price}
            </p>
            {/* {product.original_price && ( */}
            <>
              <p className="text-base  font-medium line-through">
                &#8377;{product.price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {/* {getDiscountedPricePercentage(
                                    product.original_price,
                                    product.price
                                )} */}
                % off
              </p>
            </>
            {/* )} */}
          </div>

          <div className="text-md font-medium text-black/[0.5]">
            incl. of taxes
          </div>
          <div className="text-md mb-20 font-medium text-black/[0.5]">
            {`(Also includes all applicable duties)`}
          </div>

          {/* <div className="mb-10">
            <div className="mb-2 flex justify-between">
              <div className="text-md font-semibold">Select Size</div>
              <div className="text-md cursor-pointer font-medium text-black/[0.5]">
                Select Guide
              </div>
            </div>
            <div id="sizesGrid" className="grid grid-cols-3 gap-2">
              {product.size.data.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-md border py-3 text-center font-medium ${
                    item.enabled
                      ? "cursor-pointer hover:border-black"
                      : "cursor-not-allowed bg-black/[0.1] opacity-50"
                  } ${selectedSize === item.size ? "border-black" : ""}`}
                  onClick={() => {
                    setSelectedSize(item.size);
                    setShowError(false);
                  }}
                >
                  {item.size}
                </div>
              ))}
            </div>

            {showError && (
              <div className="mt-1 text-red-600">
                Size selection is required
              </div>
            )}
          </div> */}
          <button
            className="mb-3 w-full rounded-full bg-black py-4 text-lg font-medium text-white transition-transform hover:opacity-75 active:scale-95"
            // onClick={() => {
            //     if (!selectedSize) {
            //         setShowError(true);
            //         document
            //             .getElementById("sizesGrid")
            //             .scrollIntoView({
            //                 block: "center",
            //                 behavior: "smooth",
            //             });
            //     } else {
            //         dispatch(
            //             addToCart({
            //                 ...product?.data?.[0],
            //                 selectedSize,
            //                 oneQuantityPrice: product.price,
            //             })
            //         );
            //         notify();
            //     }
            // }}
            onClick={addProductToBasket}
          >
            Add to Cart
          </button>

          <div>
            <div className="mb-5 text-lg font-bold">Product Details</div>
            <div className="markdown text-md mb-5">
              {/* <ReactMarkdown>{product.description}</ReactMarkdown> */}
            </div>
          </div>
        </div>
        {/* right column end */}
      </div>

      {/* <RelatedProducts products={products} /> */}
    </>
  );
}
