import ProductDetails from '@/components/ProductDetails';
import RelatedProducts from '@/components/RelatedProducts';
import Wrapper from '@/components/Wrapper';
import { fetchProduct, fetchProducts } from '@/libs/utils';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: {
    slug: string;
  };
}) {
  return {
    title: `Product page for ${params.slug}`
  };
}

export default async function Page({
  params: { slug }
}: {
  params: { slug: string };
}) {
  const product: IProduct = await fetchProduct(slug);
  const products: IProduct[] = await fetchProducts();

  try {
    return (
      <Wrapper className="my-20">
        <ProductDetails product={product} />
        <RelatedProducts products={products} />
      </Wrapper>
    );
  } catch (error) {
    notFound();
  }
}
