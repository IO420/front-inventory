import { Column } from "./interfaceTable";
import styles from "./table.module.css";

type Props<T> = {
  columns: Column<T>[];
  fontSize?: string;
  gridColumns: string;
  authorizedState?: Record<number, boolean>;
  onToggleAuthorized?: (key: 1 | 3 | 5 | 7) => void;
  hasRecords:boolean;
};

export default function HeaderTable<T>({
  columns,
  fontSize,
  gridColumns,
  authorizedState,
  onToggleAuthorized,
  hasRecords,
}: Props<T>) {
  return (
    <div className={styles.header} style={{ gridTemplateColumns: gridColumns }}>
      {columns.map((col, index) => {
        const authKey = (index + 1) as 1 | 3 | 5 | 7;
        const isAuthColumn = col.key?.toString().includes("trim");

        return (
          <div
            key={index}
            className={styles.headerCell}
            style={{
              justifyContent: col.headerAlign || "center",
              alignItems: "center",
              fontSize,
            }}
          >
            {col.label}

            {hasRecords && isAuthColumn && authorizedState && (
              <span
                onClick={() => onToggleAuthorized?.(authKey)}
                className={
                  authorizedState[authKey]
                    ? styles.authorized
                    : styles.authorizedNo
                }
              >
                {authorizedState[authKey] ? "Disponible" : "NO Disponible"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
//IO
