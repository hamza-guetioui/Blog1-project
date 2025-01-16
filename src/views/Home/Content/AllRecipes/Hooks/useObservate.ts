import { useEffect, useRef, useState } from "react";

export const useObservate = (initialLimit: number) => {
  const [limit, setLimit] = useState<number>(initialLimit);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the element is intersecting the viewport
          if (entry.isIntersecting) {
            setLimit((prevLimit) => prevLimit + 1);
          }
        });
      },
      {
        root: null,
        rootMargin: "10px", // Adjust if needed
        threshold: 0.5, // Half of the element is visible in the viewport
      }
    );

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
  }, []);

  return {
    limit,
    observerRef,
  };
};
