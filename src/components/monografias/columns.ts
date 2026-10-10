import { Column } from "../Table/Grid/interfaceTable";

export interface InfoData1 {
  name: string;
  location: string;
  quantity: number;
  brand: string;
}

export const tableM: Column<InfoData1>[] = [
  { key: "name", label: "Nombre del producto", align: "center", editable: false },
  {
    key: "location",
    label: "Ubicacion",
    align: "center",
    editable: false,
  },
  {
    key: "quantity",
    label: "Cantidad",
    align: "center",
    editable: false,
  },
  {
    key: "brand",
    label: "Marca",
    align: "center",
    editable: false,
  },
];