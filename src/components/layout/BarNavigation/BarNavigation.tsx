"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import "./BarNavigation.css";
import LogoutButton from "../Logout/LogoutButton";
// import ChangePasswordButton from "../../ChangePasswordButton";

export default function BarNavigation() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const periodo = searchParams.get("periodo");

  const withPeriodo = (path: string) =>
    periodo ? `${path}?periodo=${periodo}` : path;

  const isActive = (paths: string[]) => {
    return paths.some((path) => pathname.startsWith(path));
  };

  const toggleMenu = () => setOpenMenu(!openMenu);
  const toggleSubMenu = (index: number) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1000) {
      setOpenSubMenu(openSubMenu === index ? null : index);
    }
  };

  const closeAllMenus = () => {
    setOpenMenu(false);
    setOpenSubMenu(null);
  };

  return (
    <nav className="barNavigation">
      <div className={`menuToggle ${openMenu ? "" : ""}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={openMenu ? "active" : ""}>
        <li
          className={`subMenu
          ${isActive(["/datos"]) ? "active" : ""}
          `}
          onClick={toggleMenu}
        >
          <Link
            href={withPeriodo("/datos")}
            className="links"
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
            }}
          >
            <span>Datos</span>
          </Link>
        </li>
        {/* <li className="subMenu" onClick={toggleMenu}>
          <ChangePasswordButton />
        </li> */}
        {/* <li className="subMenu" onClick={toggleMenu}>
          <LogoutButton />
        </li> */}
      </ul>
    </nav>
  );
}
//IO
