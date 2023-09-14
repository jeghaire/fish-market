export const fetchLineItems = async (sessionId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe_session?session_id=${sessionId}`
  );
  if (!res.ok) return;
  const { data: products } = await res.json();
  return products;
};
