import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { urlFor } from '@/sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15'
});

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const reqData = await req.json();
    const items: IProduct[] = reqData.items;

    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [urlFor(item.image[0]).url()]
        },
        unit_amount: item.price * 100
      },
      quantity: 1
    }));

    // const headersList = headers();
    // const headersOrigin = headersList.get('origin');

    const headersOrigin = req.headers.get('origin');

    try {
      // Create Checkout Sessions from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'NG']
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'usd'
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5
                },
                maximum: {
                  unit: 'business_day',
                  value: 7
                }
              }
            }
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 1500,
                currency: 'usd'
              },
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1
                },
                maximum: {
                  unit: 'business_day',
                  value: 1
                }
              }
            }
          }
        ],
        line_items: transformedItems,
        payment_intent_data: {},
        mode: 'payment',
        success_url: `${headersOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${headersOrigin}/cart`,
        metadata: {
          images: JSON.stringify(items.map((item) => item.image[0].asset.url))
        }
      };
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      return NextResponse.json(checkoutSession, { status: 200 });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error';
      return NextResponse.json(
        { statusCode: 500, message: errorMessage },
        { status: 500 }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' }
    });
  }
}
