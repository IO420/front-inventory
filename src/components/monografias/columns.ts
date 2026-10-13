import { Column } from "../Table/Grid/interfaceTable";

export interface Product {
  name: string;
  location: string;
  quantity: number;
  brand: string;
}

export const tableProduct: Column<Product>[] = [
  { key: "name", label: "Producto", align: "center", editable: false },
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
