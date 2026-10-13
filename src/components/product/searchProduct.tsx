"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, tableProduct } from "@/components/product/columns";
import DataGrid from "@/components/Table/Grid/Table";
import styles from "./searchProduct.module.css";

interface SearchProductProps {
  initialProducts: Product[];
  searchQuery: string;
}

export default function SearchProduct({
  initialProducts,
  searchQuery,
}: SearchProductProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    router.push(`?product=${encodeURIComponent(trimmed)}`);
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>}

        <div className={styles.containerInput}>
          <input
            className={styles.input}
            name="ProductName"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar producto..."
            required
          />
        </div>

        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>
      
      <section className={styles.containerTable}>
        <DataGrid
          columns={tableProduct}
          data={initialProducts}
          setActiveInput={() => {}}
          idField="partida"
          fontSize="12px"
          pagination={true}
          rowsPerPage={15}
          width="100%"
        />
      </section>
    </>
  );
}
//IO