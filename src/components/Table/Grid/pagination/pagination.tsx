"use client";

import styles from "./pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className={styles.dots}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => onPageChange(Number(page))}
          >
            {page}
          </button>
        ),
      )}

      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  );
}
//IO