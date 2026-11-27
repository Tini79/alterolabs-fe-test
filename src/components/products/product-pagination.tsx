type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
};

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages] as const;
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ] as const;
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ] as const;
}

export function ProductPagination({
  currentPage,
  totalPages,
  disabled = false,
  onPageChange,
}: ProductPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageItems = getPageItems(currentPage, totalPages);
  const buttonClassName =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-pebble px-3 text-sm text-obsidian transition-colors hover:bg-porcelain hover:text-slate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-obsidian disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

  return (
    <nav
      aria-label="Product pages"
      className="mt-8 mx-auto flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        className={buttonClassName}
        disabled={disabled || currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="px-1 text-slate"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
            disabled={disabled}
            onClick={() => onPageChange(item)}
            className={`${buttonClassName} ${item === currentPage
                ? "border-obsidian bg-obsidian text-porcelain hover:bg-obsidian"
                : ""
              }`}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        className={buttonClassName}
        disabled={disabled || currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
