import Wrapper from "@/components/Wrapper";

export default function NotFound() {
  return (
    <Wrapper className="flex min-h-screen items-center justify-center text-center">
      <section className="flex flex-col space-y-4">
        <h1 className="max-w-xl font-heading text-[24px] font-bold -tracking-[1px] text-[#112] lg:text-[32px] lg:leading-[42px]">
          Seems we might have let that one slip - let&apos;s try wearing
          another!
        </h1>

        <p className="text-sm">
          Try finding a shoe in the search bar at the top of this page.
        </p>
      </section>
    </Wrapper>
  );
}
