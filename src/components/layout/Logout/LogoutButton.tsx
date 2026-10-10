"use client";

// import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import style from "./logoutButton.module.css"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // const result = await Swal.fire({
    //   title: "¿Cerrar sesión?",
    //   text: "Tu sesión actual finalizará.",
    //   icon: "question",
    //   showCancelButton: true,
    //   confirmButtonText: "Sí, cerrar sesión",
    //   cancelButtonText: "Cancelar",
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    // });

    // if (!result.isConfirmed) return;

    // Eliminar cookies
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      router.replace("/");

    // await Swal.fire({
    //   title: "Sesión cerrada",
    //   text: "Has cerrado sesión correctamente.",
    //   icon: "success",
    //   timer: 1500,
    //   showConfirmButton: false,
    // });

  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={style.logoutButton}
    >
      Cerrar
    </button>
  );
}
//IO