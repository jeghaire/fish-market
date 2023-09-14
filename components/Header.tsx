'use client';

import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Wrapper from './Wrapper';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { selectBasketItems } from '@/store/features/basket/basketSlice';
import PromotionBanner from './PromotionBanner';
import SignInButton from './SignInButton';

const primaryNavigation = [
  ['Home', '/'],
  ['Categories', '/categories'],
  ['Blog', '/blog'],
  ['About', '/about'],
  ['Support', '/support']
];

const secondaryNavigation = [
  ["What's New", '/collections/new'],
  ['Bestsellers', '/collections/bestsellers'],
  ['Apparel', '/collections/apparels'],
  ['Denim', '/collections/denim'],
  ['Shoes, bags & Accessories', '/collections/shoes-bags-accessories'],
  ['Sale', '/']
];

export default function Header() {
  const pathname = usePathname();
  const items = useAppSelector(selectBasketItems);

  return (
    <header className="top-0 bg-white">
      {/* <PromotionBanner /> */}
      <div className="border-b">
        <Wrapper className="flex items-center py-4 md:py-0">
          <nav className="hidden items-center space-x-4 sm:flex sm:justify-start md:w-2/5">
            {primaryNavigation.map(([title, url]) => {
              const isActive = pathname === url;
              return (
                <Link
                  key={title}
                  href={url}
                  className={`py-4 text-[12px] font-medium text-black ${
                    isActive
                      ? 'border-b-2 border-black'
                      : 'hover:underline hover:decoration-from-font'
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </nav>
          <Link
            href={'/'}
            className="flex flex-1 justify-start md:justify-center"
          >
            <ShoppingCartIcon className="h-6 w-6 text-black" />
          </Link>
          <div className="relative flex items-center space-x-4 md:w-2/5 md:justify-end">
            <Link href="/search">
              <MagnifyingGlassIcon className="header__icon" />
            </Link>
            <Link href="/cart" className="relative">
              <div
                data-cart-size={items.length}
                className={
                  items.length > 0
                    ? 'before:absolute before:-right-2 before:-top-3 before:z-50 before:flex before:h-5 before:w-5 before:scale-75 before:items-center before:justify-center before:rounded-full before:bg-black  before:text-[7px] before:text-white before:content-[attr(data-cart-size)]'
                    : ''
                }
                // after:content-['_↗']
              >
                <ShoppingBagIcon className="header__icon" />
              </div>
            </Link>
            <SignInButton />
          </div>
        </Wrapper>
      </div>
      <div className="shadow-md">
        <Wrapper>
          <nav className="group mx-auto hidden w-fit items-center space-x-3 sm:flex sm:justify-center">
            {secondaryNavigation.map(([title, url]) => {
              const isActive = pathname === url;
              return (
                <Link
                  key={title}
                  href={url}
                  className={`px-1 py-4 text-[11px] ${
                    isActive
                      ? 'text-red-600 hover:text-black'
                      : 'text-black hover:!text-opacity-100 group-hover:text-opacity-75'
                  }`}
                >
                  {title}
                </Link>
              );
            })}
          </nav>
        </Wrapper>
      </div>
    </header>
  );
}
