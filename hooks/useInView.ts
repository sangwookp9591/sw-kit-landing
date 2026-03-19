"use client";
import { useEffect, useRef, useState } from "react";

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps -- options는 마운트 시 1회만 사용. 호출부에서 인라인 객체를 전달해도 무한 루프 방지.
  }, []);

  return { ref, isInView };
}
