import { QuickAccessItem } from "./QuickAccessCard";
import { 
  POSIcon, 
  InventoryIcon, 
  TagIcon, 
  BookIcon, 
  ReportsIcon, 
  NewProductIcon
} from "./icons";

export const quickAccessItems: QuickAccessItem[] = [
  // {
  //   id: "pos",
  //   title: "Punto de Venta",
  //   subtitle: "(Iniciar venta)",
  //   icon: <POSIcon />,
  //   href: "/dashboard/pos",
  //   variant: "blue",
  // },
  {
    id: "inventory",
    title: "Gestionar Inventario",
    icon: <InventoryIcon />,
    href: "/inventory",
    variant: "green",
  },
    {
    id: "products",
    title: "Crear Productos",
    icon: <NewProductIcon />,
    href: "/inventory",
    variant: "pink",
  },
  // {
  //   id: "labels",
  //   title: "Crear Etiquetas",
  //   icon: <TagIcon />,
  //   href: "/dashboard/labels",
  //   variant: "purple",
  // },
  // {
  //   id: "monographs",
  //   title: "Monografías",
  //   icon: <BookIcon />,
  //   href: "/dashboard/monographs",
  //   variant: "orange",
  // },
  // {
  //   id: "reports",
  //   title: "Ver Reportes",
  //   icon: <ReportsIcon />,
  //   href: "/dashboard/reports",
  //   variant: "cyan",
  // },
];