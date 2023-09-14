import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: IProduct[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  );
}
