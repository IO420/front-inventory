"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import styles from "./searchSelect.module.css";

export interface SearchOption {
  id: string;
  label: string;
  description?: string;
}

interface SearchSelectProps {
  label: string;
  placeholder?: string;
  value: SearchOption | null;
  onChange: (option: SearchOption | null) => void;
  onSearch: (query: string) => Promise<SearchOption[]>;
  minChars?: number;
  disabled?: boolean;
}

export default function SearchSelect({
  label,
  placeholder = "Buscar...",
  value,
  onChange,
  onSearch,
  minChars = 2,
  disabled = false,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const searchTerm = query.trim();

    if (!open || searchTerm.length < minChars) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;
    const currentRequestId = ++requestIdRef.current;

    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      setActiveIndex(-1);

      try {
        const options = await onSearch(searchTerm);

        if (
          cancelled ||
          currentRequestId !== requestIdRef.current
        ) {
          return;
        }

        setResults(options);
      } catch {
        if (
          cancelled ||
          currentRequestId !== requestIdRef.current
        ) {
          return;
        }

        setResults([]);
        setError("No se pudo realizar la búsqueda. Intenta nuevamente.");
      } finally {
        if (
          !cancelled &&
          currentRequestId === requestIdRef.current
        ) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query, open, minChars, onSearch]);

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery);
    setOpen(true);
    setActiveIndex(-1);

    if (value) {
      onChange(null);
    }
  }

  function handleSelect(option: SearchOption) {
    onChange(option);
    setQuery("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    setError("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);

      if (results.length > 0) {
        setActiveIndex((current) =>
          current < results.length - 1 ? current + 1 : 0
        );
      }

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (results.length > 0) {
        setActiveIndex((current) =>
          current > 0 ? current - 1 : results.length - 1
        );
      }

      return;
    }

    if (
      event.key === "Enter" &&
      open &&
      activeIndex >= 0 &&
      results[activeIndex]
    ) {
      event.preventDefault();
      handleSelect(results[activeIndex]);
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <label className={styles.label}>{label}</label>

      {value ? (
        <div className={styles.selected}>
          <div className={styles.selectedContent}>
            <strong>{value.label}</strong>

            {value.description && (
              <span>{value.description}</span>
            )}
          </div>

          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              onChange(null);
              setQuery("");
              setResults([]);
              setOpen(false);
            }}
            disabled={disabled}
            aria-label="Quitar selección"
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <div className={styles.inputWrapper}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10.8"
                cy="10.8"
                r="6.8"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="m16 16 4.2 4.2"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>

            <input
              type="text"
              value={query}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              role="combobox"
              aria-expanded={open}
              aria-autocomplete="list"
              onFocus={() => setOpen(true)}
              onChange={(event) =>
                handleQueryChange(event.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            {loading && (
              <span className={styles.spinner} aria-label="Buscando" />
            )}
          </div>

          {open && (
            <div className={styles.dropdown}>
              {query.trim().length < minChars ? (
                <p className={styles.message}>
                  Escribe al menos {minChars} caracteres para buscar.
                </p>
              ) : loading ? (
                <p className={styles.message}>Buscando resultados...</p>
              ) : error ? (
                <p className={styles.error}>{error}</p>
              ) : results.length === 0 ? (
                <p className={styles.message}>
                  No se encontraron resultados.
                </p>
              ) : (
                <ul className={styles.results} role="listbox">
                  {results.map((option, index) => (
                    <li key={option.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`${styles.option} ${
                          index === activeIndex ? styles.optionActive : ""
                        }`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => handleSelect(option)}
                      >
                        <span className={styles.optionMark}>
                          {option.label.charAt(0).toUpperCase()}
                        </span>

                        <span className={styles.optionContent}>
                          <strong>{option.label}</strong>

                          {option.description && (
                            <small>{option.description}</small>
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
//IO