import Image from "next/image";
import { Column } from "../Table/Grid/interfaceTable";

export interface Product {
  id_product: number;
  name: string;
  location: string;
  quantity: number;
  brand: string;
  sale: string;
}

export const tableProduct = (
  onTransferClick: (row: Product) => void,
): Column<Product>[] => [
  { key: "name", label: "Producto", align: "start", editable: false },
  {
    key: "location",
    label: "Ubicacion",
    align: "center",
    editable: false,
    width: "100px",
  },
  {
    key: "quantity",
    label: "Cantidad",
    align: "center",
    editable: false,
    width: "100px",
  },
  {
    key: "brand",
    label: "Marca",
    align: "center",
    editable: false,
    width: "20%",
  },
  {
    key: "sale",
    label: "Venta",
    align: "center",
    editable: true,
    render: (_, row) => {
      const disabled = !row.id_product;

      return (
        <button
          onClick={() => onTransferClick(row)}
          disabled={disabled}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            width:"29px",
            height:"29px",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <Image
          style={{filter:"invert(1)"}}
            src={"/shopcar.png"}
            width={20}
            height={20}
            alt="shopcar"
          ></Image>
        </button>
      );
    },
  },
];
