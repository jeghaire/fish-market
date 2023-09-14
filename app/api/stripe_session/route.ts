import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('session_id');
  if (id) {
    const session = await stripe.checkout.sessions.listLineItems(id);
    return NextResponse.json(session, { status: 200 });
  }
  NextResponse.json({});
}
