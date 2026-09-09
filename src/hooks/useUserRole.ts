"use client";

import { useCallback, useEffect, useState } from "react";
import { adalahPeranAdmin, type PeranPengguna } from "@/lib/peran";

type ResponsSesi = {
  berhasil?: boolean;
  masuk?: boolean;
  peran?: string | null;
  adalahAdmin?: boolean;
};

export function useUserRole() {
  const [role, setRole] = useState<PeranPengguna | null>(null);
  const [masuk, setMasuk] = useState(false);
  const [memuat, setMemuat] = useState(true);

  const muat = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/saya", { cache: "no-store" });
      const json = (await res.json()) as ResponsSesi;
      if (json.masuk) {
        setMasuk(true);
        setRole(json.peran ?? null);
      } else {
        setMasuk(false);
        setRole(null);
      }
    } catch {
      setMasuk(false);
      setRole(null);
    } finally {
      setMemuat(false);
    }
  }, []);

  useEffect(() => {
    void muat();
  }, [muat]);

  const keluar = useCallback(async () => {
    try {
      await fetch("/api/auth/keluar", { method: "POST" });
    } catch {
      /* abaikan */
    }
    setMasuk(false);
    setRole(null);
  }, []);

  return {
    user: masuk ? { id: "sesi" } : null,
    role,
    adalahAdmin: adalahPeranAdmin(role),
    memuat,
    keluar,
  };
}
