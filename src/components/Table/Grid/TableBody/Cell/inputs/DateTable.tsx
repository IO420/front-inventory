import { Column, EditableRow } from "../../../interfaceTable";
import { ActiveInput } from "../../TableBody";
import styles from "./date.module.css";

type Props<T extends EditableRow> = {
  col: Column<T>;
  row: T;
  rowBackground: string;
  textColor: string;
  handleChange: (rowId: T[keyof T], key: keyof T, value: string) => void;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
  rowIndex: number;
  rowId: T[keyof T];
};

export default function DateTable<T extends EditableRow>({
  col,
  row,
  rowBackground,
  textColor,
  handleChange,
  setActiveInput,
  rowIndex,
  rowId
}: Props<T>) {
  return (
    <input
      type="date"
      className={styles.inputDate}
      value={String(row[col.key] ?? "")}
      style={{
        backgroundColor: rowBackground,
        color: textColor,
      }}
      onChange={(e) => {
        const value = e.target.value;

        handleChange(rowId, col.key, value);

        setActiveInput({
          rowIndex,
          key: col.key,
          value,
          handleChange: (value: string) =>
            handleChange(rowId, col.key, value),
          type: col.type,
        });
      }}
    />
  );
}
//IO