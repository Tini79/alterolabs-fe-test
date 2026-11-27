type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={`block animate-pulse rounded bg-zinc-200 ${className}`}
    />
  );
}

export function TextSkeleton({ className = "h-4 w-full" }: SkeletonProps) {
  return <Skeleton className={className} />;
}

export function InputSkeleton({
  className = "h-10 w-full rounded-full",
}: SkeletonProps) {
  return <Skeleton className={className} />;
}

export function ButtonSkeleton({
  className = "h-10 w-24 rounded-full",
}: SkeletonProps) {
  return <Skeleton className={className} />;
}
