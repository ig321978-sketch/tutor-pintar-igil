"use client";

import { createContext, useContext, type ReactNode } from "react";

type KonteksKuisMateri = {
  sudahBenar: (id: string) => boolean;
  tandaiBenar: (id: string) => void;
};

const KuisMateriContext = createContext<KonteksKuisMateri | null>(null);

export function KuisMateriProvider({
  selesai,
  onBenar,
  children,
}: {
  selesai: string[];
  onBenar: (id: string) => void;
  children: ReactNode;
}) {
  const sudah = new Set(selesai);
  return (
    <KuisMateriContext.Provider
      value={{
        sudahBenar: (id) => sudah.has(id),
        tandaiBenar: onBenar,
      }}
    >
      {children}
    </KuisMateriContext.Provider>
  );
}

export function useKuisMateri(): KonteksKuisMateri | null {
  return useContext(KuisMateriContext);
}
