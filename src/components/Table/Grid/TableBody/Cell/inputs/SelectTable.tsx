"use client";

import { useEffect, useRef, useState } from "react";
import { Column, EditableRow } from "../../../interfaceTable";
import { ActiveInput } from "../../TableBody";
import styles from "./SelectTable.module.css";

type Props<T extends EditableRow> = {
  col: Column<T>;
  row: T;
  cellBackground: string;
  rowBackground: string;
  handleChange: (rowId: T[keyof T], key: keyof T, value: string) => void;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
  rowIndex: number;
  rowId: T[keyof T];
  columnTextColor: string;
};

export default function SelectTable<T extends EditableRow>({
  col,
  row,
  cellBackground,
  rowBackground,
  handleChange,
  setActiveInput,
  rowIndex,
  rowId,
  columnTextColor,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions =
    col.options?.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const selectValue = (value: string) => {
    handleChange(rowId, col.key, value);

    setActiveInput({
      rowIndex,
      key: col.key,
      value,
      handleChange: (v: string) => {
        handleChange(rowId, col.key, v);
      },
      type: col.type,
      options: col.options,
    });

    setOpen(false);
    setSearch("");
    setHighlightedIndex(0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.customSelect} ${open ? styles.open : ""}`}
      style={{
        backgroundColor:
          col.columnColor ||
          (cellBackground !== "transparent" ? cellBackground : rowBackground),
      }}
    >
      <div
        className={styles.selectHeader}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <input
            autoFocus
            value={search}
            placeholder="..."
            className={styles.inputSelect}
            onChange={(e) => {
              setSearch(e.target.value);
              setHighlightedIndex(0);
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                const selected = filteredOptions[highlightedIndex];

                if (!selected) return;

                selectValue(selected);
              }
            }}
          />
        ) : (
          <span
            style={{
              color: columnTextColor,
            }}
          >
            {row[col.key] || "..."}
          </span>
        )}

        <span className={`${styles.arrow} ${open ? styles.up : styles.down}`} />
      </div>

      {open && (
        <div className={styles.options} style={{ bottom: "auto" }}>
          {filteredOptions.length === 0 && (
            <div className={styles.option}>No hay opciones</div>
          )}

          {filteredOptions.map((opt, index) => (
            <div
              key={opt}
              className={`${styles.option} ${
                highlightedIndex === index ? styles.activeOption : ""
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectValue(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
//IO