import { fetchProducts } from '@/libs/utils';
import Wrapper from '@/components/Wrapper';
import Hero from '@/components/Hero';
import ProductList from '@/components/ProductList';
import BrandsMarquee from '@/components/BrandsMarquee';

export default async function Home() {
  const products: IProduct[] = await fetchProducts();

  return (
    <main>
      <Wrapper className="pt-10">
        <Hero />
        <section className="my-14">
          <h2 className="heading-1">New Products</h2>
          <ProductList products={products} />
        </section>
        <section className="my-14">
          <h2 className="heading-1">Featured / Trending</h2>
          <ProductList products={products} />
        </section>
      </Wrapper>
      <BrandsMarquee />
    </main>
  );
}
