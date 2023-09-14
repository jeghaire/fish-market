'use client';

export default function GlobalError({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center">
        <h2 className="m-4 text-lg">Something went wrong!</h2>
        <button
          className="rounded-md border border-stone-300 px-3 py-1 text-sm"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
