import Wrapper from '@/components/Wrapper';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // return <LoadingSkeleton />;

  return (
    <Wrapper className="flex min-h-screen items-center justify-center text-center">
      <section className="flex flex-col space-y-4">
        <h1 className="max-w-xl font-heading text-[24px] font-bold -tracking-[1px] text-[#112] lg:text-[32px] lg:leading-[42px]">
          We are working on that request.
          <br /> Hold on for just a sec.
        </h1>

        <p className="text-sm">Loading ...</p>
      </section>
    </Wrapper>
  );
}
