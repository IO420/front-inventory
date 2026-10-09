"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
  }

  return (
    <section>
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
    </section>
  );
}
//IO
