"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product, tableProduct } from "@/components/product/columns";
import DataGrid from "@/components/Table/Grid/Table";
import styles from "./searchProduct.module.css";
import Image from "next/image";
import CreateProduct from "./createProduct";
import InventoryEntryCard from "./card";

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
  const [showCreateProduct, setShowCreateProduct] = useState(false);

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

  const handleTransferClick = async (row: Product) => {};

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <div className={styles.searchBarWrapper}>
          <div className={styles.inputContainer}>
            <Image
              src="/lupa.png"
              width={20}
              height={20}
              alt="Buscar"
              className={styles.searchIcon}
            />
            <input
              className={styles.input}
              name="ProductName"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ingresa tu búsqueda..."
              required
            />
          </div>

          <button type="submit" className={styles.searchButton}>
            Buscar
          </button>
        </div>
      </form>

      <section className={styles.containerTable}>
        <DataGrid
          columns={tableProduct(handleTransferClick)}
          data={initialProducts}
          setActiveInput={() => {}}
          idField="partida"
          fontSize="12px"
          pagination={true}
          rowsPerPage={15}
          width="100%"
          activeAddButton={true}
          onAddRow={() => setShowCreateProduct(true)}
        />
      </section>

      {showCreateProduct && (
        <InventoryEntryCard
          onClose={() => setShowCreateProduct(false)}
          onSubmit={()=>{}}
        />
      )}
    </>
  );
}
//IO
