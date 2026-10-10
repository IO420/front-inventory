import { Column, EditableRow } from "../../interfaceTable";
import { ActiveInput } from "../TableBody";
import styles from "../../table.module.css";
import SelectTable from "./inputs/SelectTable";
import InputTable from "./inputs/InputTable";
import DateTable from "./inputs/DateTable";

type Props<T extends EditableRow> = {
  col: Column<T>;
  row: T;
  isPercent: boolean;
  cellBackground: string;
  rowBackground: string;
  textColor: string;
  handleChange: (rowId: T[keyof T], key: keyof T, value: string) => void;
  setActiveInput: React.Dispatch<React.SetStateAction<ActiveInput<T>>>;
  rowIndex: number;
  rowId: T[keyof T];
  columnColor: string;
  columnTextColor: string;
};

export default function CellEditable<T extends EditableRow>({
  col,
  row,
  isPercent,
  cellBackground,
  rowBackground,
  textColor,
  handleChange,
  setActiveInput,
  rowIndex,
  rowId,
  columnColor,
  columnTextColor,
}: Props<T>) {
  return (
    <div className={styles.cell} style={{ position: "relative" }}>
      {col.type === "select" ? (
        <SelectTable
          col={col}
          row={row}
          cellBackground={cellBackground}
          rowBackground={rowBackground}
          handleChange={handleChange}
          setActiveInput={setActiveInput}
          rowId={rowId}
          rowIndex={rowIndex}
          columnTextColor={columnTextColor}
        />
      ) : col.type === "date" ? (
        <DateTable
          col={col}
          row={row}
          rowBackground={rowBackground}
          textColor={textColor}
          handleChange={handleChange}
          setActiveInput={setActiveInput}
          rowId={rowId}
          rowIndex={rowIndex}
        />
      ) : (
        <InputTable
          col={col}
          row={row}
          isPercent={isPercent}
          rowBackground={rowBackground}
          handleChange={handleChange}
          setActiveInput={setActiveInput}
          rowIndex={rowIndex}
          rowId={rowId}
          columnColor={columnColor}
          columnTextColor={columnTextColor}
        />
      )}
    </div>
  );
}
//IO