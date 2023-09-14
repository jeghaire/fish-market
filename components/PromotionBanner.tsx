'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

type slidesType = {
  text: string
  ctaText: string
  ctaLink: string
  bgColor: string
}
const slides: slidesType[] = [
  {
    text: 'Meet The Dream Family, three tailored looks, one oh-so-soft fabric.',
    ctaText: 'Shop now',
    bgColor: '#baa790',
    ctaLink: 'collections/black-friday-special',
  },
  {
    text: 'New summer sets are here. Mix, match, and fly somewhere sunny.',
    ctaText: 'Shop now',
    bgColor: '#d4c6b8',
    ctaLink: 'collections/summer-sets',
  },
  {
    text: 'Get early access on launches and offers.',
    ctaText: 'Sign up for texts',
    bgColor: '#00000',
    ctaLink: '/subscribe#sms',
  },
  {
    text: 'The Vacation Shop Is Open: Discover elevated essentials for every destination this summer.',
    ctaText: 'Shop now',
    bgColor: '#9fa393',
    ctaLink: 'collections/vacation-picks',
  },
]

let count: number = 0
let slideInterval: number

export default function PromotionBanner() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const slideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    slideRef?.current?.addEventListener('animationend', removeAnimation)
    slideRef?.current?.addEventListener('mouseenter', pauseSlider)
    slideRef?.current?.addEventListener('mouseleave', startSlider)

    startSlider()

    return () => pauseSlider()
  }, [])

  const removeAnimation = () => {
    slideRef?.current?.classList.remove('animate-fade')
  }

  const startSlider = () => {
    slideInterval = window.setInterval(() => {
      count = (count + 1) % slides.length
      setCurrentIdx(count)
      slideRef?.current?.classList.add('animate-fade')
    }, 10000)
  }

  const pauseSlider = () => {
    window.clearInterval(slideInterval)
  }

  return (
    <div
      ref={slideRef}
      style={{
        backgroundColor: `${slides[currentIdx].bgColor.toLowerCase()}`,
      }}
      className="flex items-center justify-center p-3 px-2 text-center text-xs font-bold text-white"
    >
      <div>
        {slides[currentIdx].text}&nbsp;
        <Link
          href={slides[currentIdx].ctaLink}
          className="group relative inline-block capitalize underline"
        >
          <div className="flex">
            <p>{slides[currentIdx].ctaText}</p>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="my-auto ml-1 h-4 w-4 rotate-90 transform text-inherit duration-300 ease-in-out group-hover:translate-x-1"
            >
              <path d="M12 19V5M5 12l7-7 7 7"></path>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}
