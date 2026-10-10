import { Column } from "./interfaceTable";
import styles from "./table.module.css";

type Props<T> = {
    columns: Column<T>[];
    gridColumns: string;
    filter?: boolean;

    filters: Record<string, string>;

    setFilters: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;

    setActiveInput: (input: any) => void;
};

export default function FilterTable<T>({
    columns,
    gridColumns,
    filter = false,
    filters,
    setFilters,
    setActiveInput,
}: Props<T>) {

    if (!filter) return null;

    return (
        <div
            className={styles.filter}
            style={{
                gridTemplateColumns: gridColumns
            }}
        >
            {columns.map((col, index) => (
                <div key={index} className={styles.filterCell}>
                    <input
                        className={styles.filterInput}
                        placeholder="Filtrar..."
                        value={filters[String(col.key)] || ''}

                        onFocus={() => {
                            setActiveInput({
                                type: 'filter',
                                key: col.key,
                                value: filters[String(col.key)] || '',
                                handleChange: (value: string) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        [col.key]: value
                                    }))
                                }
                            })
                        }}

                        onChange={(e) => {
                            const value = e.target.value

                            setFilters(prev => ({
                                ...prev,
                                [col.key]: value
                            }))

                            setActiveInput({
                                type: 'filter',
                                key: col.key,
                                value,
                                handleChange: (value: string) => {
                                    setFilters(prev => ({
                                        ...prev,
                                        [col.key]: value
                                    }))
                                }
                            })
                        }}
                    />
                </div>
            ))}
        </div>
    );
}
//IO