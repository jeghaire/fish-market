'use client';
import { useEffect, useMemo, useState } from 'react';
import Currency from 'react-currency-formatter';
import Button from '@/components/Button';
import CheckoutProduct from '@/components/CheckoutProduct';
import { useAppSelector } from '@/store/hooks';
import {
  selectBasketItems,
  selectBasketTotal
} from '@/store/features/basket/basketSlice';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { getStripe, fetchPostJSON } from '@/libs/utils';
import Stripe from 'stripe';
import Wrapper from '@/components/Wrapper';
import Image from 'next/image';

export default async function Page() {
  const items = useAppSelector(selectBasketItems);
  const basketTotal = useAppSelector(selectBasketTotal);
  const router = useRouter();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState(
    {} as { [key: string]: IProduct[] }
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item);
      return results;
    }, {} as { [key: string]: IProduct[] });

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const createCheckoutSession = async () => {
    setLoading(true);

    const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON(
      '/api/checkout_sessions',
      {
        items: items
      }
    );

    // Internal Server Error
    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to checkout
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id
    });

    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);

    setLoading(false);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <main className="mx-auto max-w-5xl pb-24">
        <div className="px-5">
          {items.length > 0 && (
            <>
              <h1 className="my-4 text-3xl font-semibold lg:text-4xl">
                Review your bag.
              </h1>
              <p className="my-4">Free delivery and free returns.</p>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="mx-5 md:mx-8">
            {Object.entries(groupedItemsInBasket).map(([key, items]) => {
              return <CheckoutProduct key={key} items={items} id={key} />;
            })}

            <div className="my-12 ml-auto mt-6 max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity={basketTotal} currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{' '}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter zip code
                        <ChevronDownIcon className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>

                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity={basketTotal} currency="USD" />
                  </h4>
                </div>
              </div>

              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  How would you like to check out?
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Apple Card</span>
                      <span>
                        $283.16/mo. at 0% APR<sup className="-top-1">◊</sup>
                      </span>
                    </h4>
                    <Button title="Check Out with Apple Card Monthly Installments" />
                    <p className="mt-2 max-w-[240px] text-[13px]">
                      $0.00 due today, which includes applicable full-price
                      items, down payments, shipping, and taxes.
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      Pay in full
                      <span>
                        <Currency quantity={basketTotal} currency="USD" />
                      </span>
                    </h4>

                    <Button
                      noIcon
                      loading={loading}
                      title="Check Out"
                      width="w-full"
                      onClick={createCheckoutSession}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* For empty cart*/}
        <Wrapper className="mx-auto flex w-fit flex-col items-center text-center">
          {items.length < 1 && (
            <>
              <section className="mt-12 flex flex-col">
                <h1 className="max-w-xl font-heading text-[24px] font-bold -tracking-[1px] text-[#112] lg:text-[32px] lg:leading-[42px]">
                  Your bag is empty.
                </h1>

                <p className="text-sm md:mt-1">
                  Seems you&apos;ve not added anything yet. Keep shopping
                </p>
              </section>
              <Image
                priority
                src="/empty-cart.jpg"
                alt=""
                width={300}
                height={300}
                className="w-[300px]"
              />
              <Button
                className="mt-3 text-sm"
                title="Continue Shopping"
                onClick={() => router.push('/')}
              />
            </>
          )}
        </Wrapper>
      </main>
    </div>
  );
}
