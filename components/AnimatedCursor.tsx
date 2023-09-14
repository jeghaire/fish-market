"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

function useEventListener(
  eventName: string,
  handler: (event: Event) => void,
  element: Document | HTMLElement = document
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current?.(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

interface AnimatedCursorProps {
  color?: string;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  outerScale?: number;
  innerScale?: number;
}

export default function AnimatedCursor({
  color = "220, 90, 90",
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}: AnimatedCursorProps) {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef<number>(0);
  const endY = useRef<number>(0);

  const onMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    setCoords({ x: clientX, y: clientY });
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = clientY + "px";
      cursorInnerRef.current.style.left = clientX + "px";
    }
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = coords.y + "px";
          cursorOuterRef.current.style.left = coords.x + "px";
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [] // eslint-disable-line
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animateOuterCursor]);

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mousedown", onMouseDown, document);
  useEventListener("mouseup", onMouseUp, document);
  useEventListener("mouseenter", onMouseEnter, document);
  useEventListener("mouseleave", onMouseLeave, document);

  useEffect(() => {
    if (isActive && cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.transform = `scale(${innerScale})`;
      cursorOuterRef.current.style.transform = `scale(${outerScale})`;
    } else if (cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.transform = "scale(1)";
      cursorOuterRef.current.style.transform = "scale(1)";
    }
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (isActiveClickable && cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`;
      cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
    }
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (isVisible && cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.opacity = "1";
      cursorOuterRef.current.style.opacity = "1";
    } else if (cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.opacity = "0";
      cursorOuterRef.current.style.opacity = "0";
    }
  }, [isVisible]);

  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );
    clickables.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.cursor = "none";

        el.addEventListener("mouseover", () => {
          setIsActive(true);
        });
        el.addEventListener("click", () => {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.addEventListener("mousedown", () => {
          setIsActiveClickable(true);
        });
        el.addEventListener("mouseup", () => {
          setIsActive(true);
        });
        el.addEventListener("mouseout", () => {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      }
    });

    return () => {
      clickables.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.removeEventListener("mouseover", () => {
            setIsActive(true);
          });
          el.removeEventListener("click", () => {
            setIsActive(true);
            setIsActiveClickable(false);
          });
          el.removeEventListener("mousedown", () => {
            setIsActiveClickable(true);
          });
          el.removeEventListener("mouseup", () => {
            setIsActive(true);
          });
          el.removeEventListener("mouseout", () => {
            setIsActive(false);
            setIsActiveClickable(false);
          });
        }
      });
    };
  }, [isActive]);

  const styles = {
    cursor: {
      zIndex: 999,
      position: "fixed" as "fixed",
      opacity: 1,
      pointerEvents: "none" as "none",
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
    cursorInner: {
      position: "fixed" as "fixed",
      borderRadius: "50%",
      width: innerSize,
      height: innerSize,
      pointerEvents: "none" as "none",
      backgroundColor: `rgba(${color}, 1)`,
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    },
    cursorOuter: {
      position: "fixed" as "fixed",
      borderRadius: "50%",
      pointerEvents: "none" as "none",
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  );
}
