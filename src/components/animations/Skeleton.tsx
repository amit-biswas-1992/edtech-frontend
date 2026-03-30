'use client';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClass = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variantClass = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }[variant];

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : variant === 'circular' ? width || '40px' : '100px'),
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${baseClass} ${variantClass} ${className}`}
          style={style}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 p-4 space-y-3">
      <Skeleton variant="rectangular" height="160px" />
      <Skeleton variant="text" width="70%" height="1.2em" />
      <Skeleton variant="text" width="90%" height="0.9em" />
      <Skeleton variant="text" width="40%" height="0.9em" />
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="py-16 px-6 space-y-6">
      <div className="max-w-3xl mx-auto space-y-3">
        <Skeleton variant="text" width="200px" height="0.8em" className="mx-auto" />
        <Skeleton variant="text" width="400px" height="1.8em" className="mx-auto" />
        <Skeleton variant="text" width="500px" height="1em" className="mx-auto" />
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
