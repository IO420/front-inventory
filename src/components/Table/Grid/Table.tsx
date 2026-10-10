"use client";

import { useEffect, useState } from "react";
import { DataGridProps, EditableRow } from "./interfaceTable";
import styles from "./table.module.css";
import HeaderTable from "./HeaderTable";
import FilterTable from "./FilterTable";
import TableBody from "./TableBody/TableBody";
import Image from "next/image";
import Pagination from "./pagination/pagination";

export default function DataGrid<T extends EditableRow>({
  columns,
  flex,
  width,
  fontSize,
  data,
  onChange,
  onSave,
  emptyMessage = "No hay registros",
  setActiveInput,
  filter = false,
  idField,
  extraIds,
  lockSavedData = false,
  activeAddButton = false,
  activeEditButton = false,
  textAddButton,
  onAddRow,
  hideButton,
  hidePredicate,
  alwaysVisiblePredicate,
  hideRows = false,
  setHideRows,
  pagination = false,
  rowsPerPage = 10,
  authorizedState,
  onToggleAuthorized,
  rightEditButton = false,
  total,
  // hasDrafts = false,
  // initialChanges
}: DataGridProps<T>) {
  const [originalData, setOriginalData] = useState<T[]>(data);
  const [newData, setNewData] = useState<T[]>(data);
  const [changes, setChanges] = useState<Partial<T>[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [editMode, setEditMode] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (changes.length === 0) {
      setNewData(data);
      setOriginalData(data);
    }

    if (lockSavedData) {
      const locked = new Set<number>();

      data.forEach((row) => {
        if (Number(row[idField]) > 0) {
          locked.add(Number(row[idField]));
        }
      });
    }
  }, [data, changes.length]);

  const handleChange = (rowId: T[keyof T], key: keyof T, value: string) => {
    const updated = [...newData];

    const rowIndex = updated.findIndex((row) => row[idField] === rowId);

    if (rowIndex === -1) return;

    updated[rowIndex] = {
      ...updated[rowIndex],
      [key]: value,
    };

    setNewData(updated);

    const currentRow = updated[rowIndex];

    const originalRow = originalData.find(
      (row) => row[idField] === currentRow[idField],
    );

    if (currentRow[key] !== originalRow?.[key]) {
      setChanges((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item[idField] === currentRow[idField],
        );

        const payload: Partial<T> = {
          [idField]: currentRow[idField],
        } as Partial<T>;

        extraIds?.forEach((field) => {
          payload[field as keyof T] = currentRow[field];
        });

        if (String(key).includes("percent")) {
          const montoKey =
            String(key) === "percent"
              ? "monto"
              : `trim${String(key).replace("percent", "")}`;

          payload[montoKey as keyof T] = currentRow[montoKey as keyof T];
        } else {
          payload[key] = currentRow[key];
        }

        if (existingIndex !== -1) {
          const copy = [...prev];

          copy[existingIndex] = {
            ...copy[existingIndex],
            ...payload,
          };

          return copy;
        }

        return [...prev, payload];
      });
    }

    onChange?.(updated, {
      rowIndex,
      key,
      value,
    });
  };

  const filteredData = newData.filter((row) => {
    if (row.editable === false) return true;

    return columns.every((col) => {
      const filterValue = filters[String(col.key)];

      if (!filterValue) return true;

      const cellValue = String(row[col.key] ?? "").toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    });
  });

  const gridColumns = columns
    .map((col) => col.width || "minmax(30px, 1fr)")
    .join(" ");

  const editAll = () => {
    setEditMode(!editMode);
  };

  const visibleData = filteredData.filter((row) => {
    if (!hideRows) return true;

    if (alwaysVisiblePredicate?.(row)) {
      return true;
    }

    return !hidePredicate?.(row);
  });

  const isCellEditable = (row: T, rowIndex: number, key: keyof T) => {
    if (editMode) {
      return true;
    }

    if (!lockSavedData) {
      return true;
    }

    const isNewRow = Number(row[idField]) < 0;

    if (isNewRow) {
      return true;
    }

    const originalRow = originalData.find((r) => r[idField] === row[idField]);

    const originalValue = originalRow?.[key];

    return (
      originalValue === null ||
      originalValue === undefined ||
      originalValue === ""
    );
  };

  const totalPages = Math.ceil(visibleData.length / rowsPerPage);

  const paginatedData = pagination
    ? visibleData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage,
    )
    : visibleData;

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, hideRows]);

  const hasRecords = visibleData.length > 0;

  return (
    <div
      className={styles.container}
      style={{
        flex: flex,
        width: width,
      }}
    >
      <div
        className={styles.containerButton}
        style={rightEditButton ? { right: "0px" } : {}}
      >
        {activeAddButton && (
          <button
            className={styles.addButton}
            onClick={onAddRow}
            disabled={changes.length > 0}
          >
            {textAddButton}
          </button>
        )}

        {hasRecords && activeEditButton && !editMode && (
          <button className={styles.editButton} onClick={editAll}>
            <Image src={"/edit.png"} height={19} width={20} alt="editar" className={styles.icon} />
          </button>
        )}

        {hasRecords && (changes.length > 0 || editMode) && (
          <button
            className={styles.saveButton}
            onClick={() => {
              onSave?.(changes as T[]);

              setOriginalData(newData);
              setChanges([]);
              setEditMode(false);
            }}
          >
            <Image src={"/save.png"} height={20} width={20} alt="editar" className={styles.icon} />
          </button>
        )}
        {total !== undefined && (
          <span className={styles.suma}>
            Suma: $
            {Number(total).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        )}
      </div>

      {hasRecords && hideButton && (
        <button
          className={styles.hideButton}
          onClick={() => setHideRows?.((prev) => !prev)}
        >
          <Image
            width={20}
            height={20}
            alt="eye"
            src={hideRows ? "/form-icons/eye-slash.svg" : "/form-icons/eye.svg"}
          />
        </button>
      )}

      <HeaderTable
        columns={columns}
        fontSize={fontSize}
        gridColumns={gridColumns}
        authorizedState={authorizedState}
        onToggleAuthorized={onToggleAuthorized}
        hasRecords={hasRecords}
      />

      <FilterTable
        columns={columns}
        gridColumns={gridColumns}
        filter={filter}
        filters={filters}
        setFilters={setFilters}
        setActiveInput={setActiveInput}
      />

      <TableBody
        filteredData={paginatedData}
        emptyMessage={emptyMessage}
        columns={columns}
        gridColumns={gridColumns}
        idField={idField}
        isCellEditable={isCellEditable}
        handleChange={handleChange}
        setActiveInput={setActiveInput}
      />

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
//IO spak
