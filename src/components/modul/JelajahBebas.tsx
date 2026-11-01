"use client";

import { createContext, useContext, type ReactNode } from "react";

const KonteksJelajahBebas = createContext(false);

export function PenyediaJelajahBebas({
  nilai,
  children,
}: {
  nilai: boolean;
  children: ReactNode;
}) {
  return <KonteksJelajahBebas.Provider value={nilai}>{children}</KonteksJelajahBebas.Provider>;
}

export function useJelajahBebas() {
  return useContext(KonteksJelajahBebas);
}
