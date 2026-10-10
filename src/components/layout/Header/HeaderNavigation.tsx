"use client";

import { Suspense } from "react";
import BarNavigation from "../BarNavigation/BarNavigation";

export default function HeaderNavigation({ role }: { role: number }) {

  return (
    <Suspense fallback={null}>
      {role === 1 && <BarNavigation />}
    </Suspense>
  );
}
//IO