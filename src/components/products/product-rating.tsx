export function ProductRating({ rating, reviews }: { rating: number, reviews?: { rating: number }[] }) {
  return (
    <>
      <span aria-hidden="true" className="text-sm text-yellow-500">
        &#9733;
      </span>
      <span>{rating.toFixed(1)}</span>
      {reviews ? <span>({reviews.length})</span> : null}
    </>
  )
}