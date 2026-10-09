"use client";

import { useRouter } from "next/navigation";
import "./NotFound.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="notfound">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>
        Lo sentimos, la página que buscas no existe o ha sido movida. Verifica
        la URL o regresa a la página principal.
      </p>
      <button onClick={() => router.push("/")}>Regresar al inicio</button>
    </section>
  );
}
