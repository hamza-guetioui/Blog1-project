"use client";
import { useEffect, useRef, useState } from "react";

export const useObservate = (initialLimit: number) => {
  const [limit, setLimit] = useState<number>(initialLimit);
  const observerRef = useRef(null);

  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setLimit((prevLimit) => prevLimit + 1);
      }
    });
  };
  useEffect(() => {
    const createObserver = () => {
      return new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "10px",
        threshold: 0.5,
      });
    };
    const observer = createObserver();

    // Start observing the element
    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Cleanup on component unmount
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [observerRef, setLimit]);

  return {
    limit,
    observerRef,
  };
};
