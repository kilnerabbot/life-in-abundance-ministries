"use client";

import { useEffect, useState } from "react";

/**
 * The footer is a server component, so `new Date()` there would freeze at
 * build time — a site left undeployed over New Year would show a stale
 * copyright. Renders the build-time year first (correct almost always, so no
 * layout shift) then corrects it on the client if the year has rolled over.
 */
export default function CurrentYear({ buildYear }: { buildYear: number }) {
  const [year, setYear] = useState(buildYear);

  useEffect(() => {
    const actual = new Date().getFullYear();
    if (actual !== buildYear) setYear(actual);
  }, [buildYear]);

  return <>{year}</>;
}
