import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity";
import Currency from "react-currency-formatter";
import { AppRoutes } from "@/libs/routing";

const ProductCard = ({ title, image, price, slug }: IProduct) => {
  return (
    <Link
      href={AppRoutes.Product(slug.current)}
      className="mb-2 bg-white md:m-0"
    >
      <div className="relative h-[280px] w-full overflow-hidden md:h-[320px]">
        <Image
          draggable={false}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={title}
          className="w-full object-cover"
          src={urlFor(image[0]).url()}
        />
      </div>
      <div className="py-2 text-black/[0.9]">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-base font-semibold">
            <Currency quantity={price} currency="USD" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
