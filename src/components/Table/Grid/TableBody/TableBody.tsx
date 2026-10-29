import Image from "next/image";
import { Column, EditableRow } from "../interfaceTable";
import styles from "../table.module.css";
import CellEditable from "./Cell/CellEditable";
import CellNotEditable from "./Cell/CellNotEditable";

export interface ActiveInput<T extends EditableRow> {
  rowIndex: number;
  key: keyof T;
  value: string;
  handleChange: (value: string) => void;
  type?: string;
  options?: string[];
}

type Props<T extends EditableRow> = {
  filteredData: T[];
  emptyMessage: string;
  columns: Column<T>[];
  gridColumns: string;
  idField: string;
  isCellEditable: (row: T, rowIndex: number, key: keyof T) => boolean;
  handleChange: (rowId: T[keyof T], key: keyof T, value: string) => void;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
};

function getTextColorForBackground(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#000000";
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

export default function TableBody<T extends EditableRow>({
  filteredData,
  emptyMessage,
  columns,
  gridColumns,
  idField,
  isCellEditable,
  handleChange,
  setActiveInput,
}: Props<T>) {
  return (
    <div className={styles.body}>
      {filteredData.length === 0 ? (
        <div className={styles.empty}>{emptyMessage}</div>
      ) : (
        filteredData.map((row, rowIndex) => {
          const rowColorColumn = columns.find((col) => col.rowColors);
          const rowBackground =
            rowColorColumn?.rowColors?.[String(row[rowColorColumn.key])] ||
            "white";

          const rowTextColor =
            rowBackground !== "white"
              ? getTextColorForBackground(rowBackground)
              : "#000000";

          return (
            <div
              key={rowIndex}
              className={styles.row}
              style={{
                gridTemplateColumns: gridColumns,
                backgroundColor: rowBackground,
              }}
            >
              {columns.map((col, colIndex) => {
                if (col.render) {
                  return (
                    <div
                      key={colIndex}
                      className={styles.render}
                      data-label={col.label}
                    >
                      {col.render(row[col.key as keyof T], row, rowIndex)}
                    </div>
                  );
                }

                if (col.image) {
                  return (
                    <div key={colIndex} className={`${styles.img}`}>
                      <Image
                        src={`${row[col.key] || "/book.png"}`}
                        alt="image"
                        fill
                        objectFit="contain"
                      ></Image>
                    </div>
                  );
                }

                const isPercent = String(col.key).includes("percent");

                const cellBackground =
                  col.cellColors?.[String(row[col.key])] || "transparent";

                const textColor =
                  col.textColors?.[String(row[col.key])] || rowTextColor;

                const columnColor = col.columnColor || "transparent";

                const columnTextColor = col.columnTextColor || textColor;

                const editable =
                  (col?.editable !== false && row?.editable !== false) ||
                  Number(row[idField]) < 0;

                const canEdit =
                  editable && isCellEditable(row, rowIndex, col.key);

                return canEdit ? (
                  <CellEditable
                    key={colIndex}
                    col={col}
                    row={row}
                    isPercent={isPercent}
                    cellBackground={cellBackground}
                    rowBackground={rowBackground}
                    textColor={textColor}
                    handleChange={handleChange}
                    setActiveInput={setActiveInput}
                    rowIndex={rowIndex}
                    rowId={row[idField as keyof T]}
                    columnColor={columnColor}
                    columnTextColor={columnTextColor}
                  />
                ) : (
                  <CellNotEditable
                    key={colIndex}
                    col={col}
                    row={row}
                    rowIndex={rowIndex}
                    isPercent={isPercent}
                    cellBackground={cellBackground}
                    rowBackground={rowBackground}
                    columnColor={columnColor}
                    columnTextColor={columnTextColor}
                    setActiveInput={setActiveInput}
                  />
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
//IOspa
