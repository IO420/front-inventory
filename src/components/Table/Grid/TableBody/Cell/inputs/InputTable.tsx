import { ActiveInput } from "../../TableBody";
import { Column, EditableRow } from "../../../interfaceTable";
import styles from "../../../table.module.css";

type Props<T extends EditableRow> = {
  col: Column<T>;
  row: T;
  isPercent: boolean;
  rowBackground: string;
  handleChange: (rowId: T[keyof T], key: keyof T, value: string) => void;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
  rowIndex: number;
  rowId: T[keyof T];
  columnColor: string;
  columnTextColor: string;
};

export default function InputTable<T extends EditableRow>({
  col,
  row,
  isPercent,
  rowBackground,
  handleChange,
  setActiveInput,
  rowIndex,
  rowId,
  columnColor,
  columnTextColor,
}: Props<T>) {
  return (
    <>
      <input
        style={{
          textAlign: col.align || "center",
          backgroundColor:
            columnColor !== "transparent" ? columnColor : rowBackground,
          color: columnTextColor,
          fontWeight: col.fontweight,
        }}
        className={styles.input}
        value={row[col.key] ?? ""}
        onFocus={() => {
          setActiveInput({
            rowIndex,
            key: col.key,
            value: row[col.key] ?? "",
            handleChange: (value: string) => {
              handleChange(rowId, col.key, value);
            },
            type: col.type,
            options: col.options,
          });
        }}
        onChange={(e) => {
          const raw = e.target.value;

          let clean: string;

          if (col.type === "number" || col.type === "money") {
            clean = raw.replace(/[^0-9.]/g, "");

            const numericValue = parseFloat(clean.replace(",", "."));
            const dots = (clean.match(/\./g) || []).length;

            const max =
              col.max !== undefined ? Math.max(0, col.max) : undefined;
            const min = col.min ?? 0;

            if (!isNaN(numericValue)) {
              if (max !== undefined && numericValue > max) {
                clean = max.toString();
              }

              if (numericValue < min) {
                clean = min.toString();
              }

              if (dots > 1) {
                return;
              }

              if (isPercent && clean !== "" && clean !== ".") {
                const value = Number(clean);

                if (!isNaN(value) && value > 100) {
                  clean = "100";
                }
              }
            }
          } else {
            clean = raw;
          }

          handleChange(rowId, col.key, clean);

          setActiveInput({
            rowIndex,
            key: col.key,
            value: clean,
            handleChange: (value: string) => {
              handleChange(rowId, col.key, value);
            },
            type: col.type,
            options: col.options,
          });
        }}
        onBlur={(e) => {
          if (col.type === "number" || col.type === "money") return;

          const valueText = e.target.value;

          if (valueText === "" || valueText === ".") {
            return;
          }

          const value = Number(valueText);

          if (isNaN(value)) {
            return;
          }

          const max = col.max !== undefined ? Math.max(0, col.max) : undefined;

          const min = col.min ?? 0;

          let finalValue = value;

          if (max !== undefined && finalValue > max) {
            finalValue = max;
          }

          if (finalValue < min) {
            finalValue = min;
          }

          handleChange(rowId, col.key, String(finalValue));

          setActiveInput({
            rowIndex,
            key: col.key,
            value: String(finalValue),
            handleChange: (value: string) => {
              handleChange(rowId, col.key, value);
            },
            type: col.type,
            options: col.options,
          });
        }}
      />

      {isPercent && <span className={styles.percent}>%</span>}
    </>
  );
}
//IO