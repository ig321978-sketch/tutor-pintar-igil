"use client";

import { useMemo, useSyncExternalStore } from "react";
import { baca, type Tersimpan } from "@/lib/belajar/simpan";

const PEMISAH = "\u0001";
const kunci = (id: string) => `igil.belajar.${id}.v1`;

function langgan(panggil: () => void) {
  window.addEventListener("storage", panggil);
  return () => window.removeEventListener("storage", panggil);
}

/** Membaca catatan belajar dari penyimpanan perangkat tanpa selisih hidrasi: di server selalu kosong. */
export function useSimpanan(ids: string[]): Record<string, Tersimpan> {
  const gabung = ids.join(",");
  const mentah = useSyncExternalStore(
    langgan,
    () => {
      try {
        return gabung.split(",").map((id) => window.localStorage.getItem(kunci(id)) ?? "").join(PEMISAH);
      } catch {
        return "";
      }
    },
    () => "",
  );
  return useMemo(() => {
    const bagian = mentah.split(PEMISAH);
    const hasil: Record<string, Tersimpan> = {};
    gabung.split(",").forEach((id, i) => {
      hasil[id] = baca({ getItem: () => bagian[i] || null, setItem: () => {} }, id);
    });
    return hasil;
  }, [mentah, gabung]);
}

const tanpaLangganan = () => () => {};

/** Bernilai false di server dan saat hidrasi, lalu true di peramban. Dipakai agar halaman tidak menampilkan keadaan kosong yang keliru sesaat. */
export function useSiap(): boolean {
  return useSyncExternalStore(tanpaLangganan, () => true, () => false);
}
