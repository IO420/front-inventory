import { Column, EditableRow } from "../../interfaceTable";
import { ActiveInput } from "../TableBody";
import styles from "../../table.module.css";

type Props<T extends EditableRow> = {
  col: Column<T>;
  row: T;
  rowIndex: number;
  isPercent: boolean;
  cellBackground: string;
  rowBackground: string;
  columnColor: string;
  columnTextColor: string;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
};

export default function CellNotEditable<T extends EditableRow>({
  col,
  row,
  rowIndex,
  isPercent,
  cellBackground,
  rowBackground,
  columnColor,
  columnTextColor,
  setActiveInput,
}: Props<T>) {
  const value = row[col.key];

  //avoid void label in mode cell phone
  const isEmpty =
    value === null || value === undefined || String(value).trim() === "";

  const fieldType = String(col.label || col.key)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return (
    <div
      className={`${styles.cell} ${styles.notEditable} ${
        styles["type-" + fieldType] || ""
      } ${isEmpty ? styles.emptyCell : ""}`}
      style={{
        textAlign: col.align || "center",
        justifyContent: col.align || "center",
      }}
      data-label={col.label}
      data-field={fieldType}
    >
      <div
        title={String(row[col.key] ?? "")}
        onClick={() => {
          setActiveInput({
            rowIndex,
            key: col.key,
            value: row[col.key] ?? "",
            handleChange: () => {},
            type: col.type,
            options: col.options,
          });
        }}
        style={{
          textAlign: col.align || "center",
          color: columnTextColor,
          background:
            columnColor !== "transparent"
              ? columnColor
              : (cellBackground ?? rowBackground),
        }}
        className={`${styles.input} ${
          col.type === "string" ||
          col.type === "select" ||
          col.type === undefined
            ? styles.ellipsis
            : ""
        }`}
      >
        {(() => {
          const value = row[col.key];

          if (value === null || value === undefined || value === "") {
            return value;
          }

          if (col.type === "money") {
            return Number(value).toLocaleString("es-MX", {
              style: "currency",
              currency: "MXN",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }

          if (!isNaN(Number(value))) {
            return Number(value).toLocaleString("es-MX", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
          }

          return value;
        })()}
      </div>
      {isPercent && <span className={styles.percent}>%</span>}
    </div>
  );
}
//IO
