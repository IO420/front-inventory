"use client";
import { useState } from "react";
import styles from "./page.module.css";
import DataGrid from "@/components/Table/Grid/Table";
import { tableM } from "@/components/monografias/columns";

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
  }

  return (
    <section className={styles.togleContainer}>
      <h1 className={styles.text}>Encuentra tus Monografias</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>}

        <div className={styles.containerInput}>
          <input
            className={styles.input}
            name="ProductName"
            type="text"
            required
          />
        </div>

        <button type="submit" className={styles.searchButton}>
          Buscar
        </button>
      </form>

      <section className={styles.containerTable}>
        <DataGrid
          columns={tableM}
          data={[
            {
              name: "Monofett",
              location: "nodeServerAppPaths",
              quantity: 2,
              brand: "Linefont",
            },
                        {
              name: "oeu",
              location: "oeu",
              quantity: 20,
              brand: "oeu",
            },
          ]}
          setActiveInput={() => {}}
          idField="partida"
          fontSize="12px"
          pagination={true}
          rowsPerPage={15}
          width="100%"
        />
      </section>
    </section>
  );
}
//IO
