"use client";
import { useState, useEffect, useRef } from "react";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Image from "next/image";

const slides = ["/img1.png", "/img2.png"];

let count: number = 0;
let slideInterval: number;

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    slideRef?.current?.addEventListener("animationend", removeAnimation);
    slideRef?.current?.addEventListener("mouseenter", pauseSlider);
    slideRef?.current?.addEventListener("mouseleave", startSlider);

    // startSlider();

    return () => pauseSlider();
  }, []);

  const removeAnimation = () => {
    slideRef?.current?.classList.remove("animate-fade");
  };

  const startSlider = () => {
    slideInterval = window.setInterval(() => {
      count = (count + 1) % slides.length;
      setCurrentIdx(count);
      slideRef?.current?.classList.add("animate-fade");
    }, 5000);
  };

  const pauseSlider = () => {
    window.clearInterval(slideInterval);
  };

  const handleNextSlide = () => {
    count = (count + 1) % slides.length;
    setCurrentIdx(count);
    slideRef?.current?.classList.add("animate-fade");
  };

  const handlePreviousSlide = () => {
    const slidesCount = slides.length;
    count = (currentIdx + slidesCount - 1) % slidesCount;
    setCurrentIdx(count);
    slideRef?.current?.classList.add("animate-fade");
  };

  const goToSlide = (index: number) => {
    pauseSlider();
    setCurrentIdx(index);
    slideRef?.current?.classList.add("animate-fade");
  };

  return (
    <>
      <div ref={slideRef} className="relative w-full">
        <Image
          priority
          src={slides[currentIdx]}
          width="0"
          height="0"
          sizes="100vw"
          alt="Hero Image"
          className="w-full object-contain"
        />
        <div className="absolute top-1/2 flex h-full w-full -translate-y-1/2 transform items-center justify-between">
          <button onClick={handlePreviousSlide} className="h-full">
            <BsChevronCompactLeft size={30} className="m-3 text-white" />
          </button>
          <button onClick={handleNextSlide} className="h-full">
            <BsChevronCompactRight size={30} className="m-3 text-white" />
          </button>
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        {slides.map((slide, idx) => {
          return (
            <button
              key={slide + idx}
              className={`mx-1.5 h-2 w-2 cursor-pointer rounded-full ${
                currentIdx == idx ? "bg-black" : "bg-[#d4d4d4]"
              }`}
              onClick={() => goToSlide(idx)}
            ></button>
          );
        })}
      </div>
    </>
  );
}
