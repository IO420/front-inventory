export interface Column<T> {
  key: keyof T;
  label: string;
  width?: string;
  headerAlign?: "start" | "center" | "end";
  align?: "start" | "center" | "end";
  editable: boolean;
  authorized?: boolean;
  type?: "string" | "number" | "select" | "date" | "money";
  options?: string[];
  rowColors?: Record<string, string>;
  cellColors?: Record<string, string>;
  textColors?: Record<string, string>;
  columnColor?: string;
  columnTextColor?: string;
  fontweight?: string;

  min?: number;
  max?: number;

  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;

  image?: boolean;
}

export interface DataGridProps<T> {
  columns: Column<T>[];
  flex?: string;
  width?: string;
  fontSize?: string;
  data: T[];
  onChange?: (
    data: T[],
    change?: {
      rowIndex: number;
      key: keyof T;
      value: string;
    },
  ) => void;
  onSave?: (data: T[]) => void;
  emptyMessage?: string;
  setActiveInput: (input: any) => void;
  filter?: boolean;

  idField: string;
  extraIds?: string[];

  lockSavedData?: boolean;

  activeAddButton?: boolean;
  activeEditButton?: boolean;
  textAddButton?: string;
  onAddRow?: () => void;
  rightEditButton?: boolean;

  hideButton?: boolean;
  hidePredicate?: (row: T) => boolean;
  alwaysVisiblePredicate?: (row: T) => boolean;
  hideRows?: boolean;
  setHideRows?: React.Dispatch<React.SetStateAction<boolean>>;

  pagination?: boolean;
  rowsPerPage?: number;

  onToggleAuthorized?: (trim: 1 | 3 | 5 | 7) => void;
  authorizedState?: {
    1: boolean;
    3: boolean;
    5: boolean;
    7: boolean;
  };
  total?: number;
  // hasDrafts?: boolean;
  // initialChanges?: Partial<T>[];
}

export type EditableRow = {
  [key: string]: any;
};
//IO
