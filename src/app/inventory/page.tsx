import SectionProduct from "@/components/product/sectionProduct";
import { Suspense } from "react";

export default async function Inventory(props: {
  searchParams?: Promise<{ product?: string }>;
}) {
  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <SectionProduct searchParams={props.searchParams} />
    </Suspense>
  );
}
//IO
