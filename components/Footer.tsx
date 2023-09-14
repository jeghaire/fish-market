import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";

export default function Footer() {
  return (
    <footer className="bg-black pb-3 pt-14 text-white">
      <Wrapper className="flex flex-col justify-between gap-[50px] md:flex-row md:gap-0">
        {/* LEFT START */}
        <div className="flex flex-col gap-[50px] md:flex-row md:gap-[75px] lg:gap-[100px]">
          {/* MENU START */}
          <div className="flex shrink-0 flex-col gap-3">
            <Link href="/" className="text-sm font-medium uppercase">
              Find a store
            </Link>
            <Link href="/" className="text-sm font-medium uppercase">
              become a partner
            </Link>
            <Link href="/" className="text-sm font-medium uppercase">
              sign up for email
            </Link>
            <Link href="/" className="text-sm font-medium uppercase">
              send us feedback
            </Link>
            <Link href="/" className="text-sm font-medium uppercase">
              student discount
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex shrink-0 gap-[50px] md:gap-[75px] lg:gap-[100px]">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium uppercase">get help</div>
              <div className="text-sm text-white/[0.5] hover:text-white">
                Order Status
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white">
                Delivery
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white">
                Returns
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white">
                Payment Options
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white">
                Contact Us
              </div>
            </div>
            {/* MENU END */}

            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm font-medium uppercase">
                About Fish Market.
              </Link>
              <Link
                href="/"
                className="text-sm text-white/[0.5] hover:text-white"
              >
                News
              </Link>
              <Link
                href="/"
                className="text-sm text-white/[0.5] hover:text-white"
              >
                Careers
              </Link>
              <Link
                href="/"
                className="text-sm text-white/[0.5] hover:text-white"
              >
                Investors
              </Link>
              <Link
                href="/"
                className="text-sm text-white/[0.5] hover:text-white"
              >
                Sustainability
              </Link>
            </div>
            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex justify-center gap-4 md:justify-start">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.25] text-black hover:bg-white/[0.5]"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.25] text-black hover:bg-white/[0.5]"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.25] text-black hover:bg-white/[0.5]"
          >
            <FaYoutube size={20} />
          </Link>
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.25] text-black hover:bg-white/[0.5]"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
        {/* RIGHT END */}
      </Wrapper>
      <Wrapper className="mt-10 flex flex-col justify-between gap-[10px] md:flex-row md:gap-0">
        {/* LEFT START */}
        <div className="text-center text-[12px] text-white/[0.5] hover:text-white md:text-left">
          © 2023 Fish Market, Inc. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex flex-wrap justify-center gap-2 text-center md:gap-5 md:text-left">
          <Link
            href="/"
            className="text-[12px] text-white/[0.5] hover:text-white"
          >
            Guides
          </Link>
          <Link
            href="/"
            className="text-[12px] text-white/[0.5] hover:text-white"
          >
            Terms of Sale
          </Link>
          <Link
            href="/"
            className="text-[12px] text-white/[0.5] hover:text-white"
          >
            Terms of Use
          </Link>
          <Link
            href="/"
            className="text-[12px] text-white/[0.5] hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
        {/* RIGHT END */}
      </Wrapper>
    </footer>
  );
}
