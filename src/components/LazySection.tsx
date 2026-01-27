import React, { Suspense } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="min-h-[200px] animate-pulse bg-gray-100" />,
  rootMargin = '50px',
  threshold = 0.1
}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    rootMargin,
    threshold,
    triggerOnce: true
  });

  return (
    <div ref={targetRef}>
      {hasIntersected ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazySection;
