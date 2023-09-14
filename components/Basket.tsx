"use client"

import { selectBasketItems } from "@/store/features/basket/basketSlice"
import { useAppSelector } from "@/store/hooks"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Basket() {
  const items = useAppSelector(selectBasketItems)

  if (items.length === 0) return null

  return (
    <Link
      href="/cart"
      className="fixed bottom-10 right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300"
    >
      {items.length > 0 && (
        <span className="absolute -right-1 -top-1 z-50 flex h-5 w-5 items-center justify-center rounded-full border-stone-700 bg-stone-700 text-[3px] text-white">
          {items.length}
        </span>
      )}
      <ShoppingBagIcon className="header__icon" />
    </Link>
  )
}
