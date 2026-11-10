import DashboardCard from "@/components/home/dashboard/DashboardCard";
import HeroBanner from "@/components/home/banner/HeroBanner";
import { quickAccessItems } from "@/components/home/quickAccess/item";
import QuickAccessCard from "@/components/home/quickAccess/QuickAccessCard";
import { InventoryIcon } from "@/components/home/quickAccess/icons";

export default async function Home(props: {
  searchParams?: Promise<{ product?: string }>;
}) {
  return (
    <section
      style={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <HeroBanner />

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "1rem",
        }}
      >
        <DashboardCard
          title="Total Productos"
          apiEndpoint="inventory/countInventory"
          variant="default"
          icon={<InventoryIcon />}
          actionLabel="Ir a catálogo"
          actionHref="/products"
        />

        <DashboardCard
          title="Stock bajo"
          apiEndpoint="inventory/low-stock"
          valueKey="total"
          variant="warning"
          icon={
            <svg
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
          actionLabel="Ver más detalles"
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <QuickAccessCard items={quickAccessItems} />
      </div>
    </section>
  );
}
//IO
