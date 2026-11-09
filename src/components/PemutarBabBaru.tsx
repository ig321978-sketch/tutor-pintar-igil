"use client";

import { useEffect, useState } from "react";
import IgilModulePlayer, { type BabBaru, type PaketBab } from "@/components/IgilModulePlayer";
import { MUAT_BAB_BARU } from "@/components/modul/registri-bab-baru";

const KOTAK = "mx-auto flex min-h-[60vh] max-w-md items-center justify-center p-6 text-center";
const ISI = "rounded-3xl border-4 border-amber-400 bg-white p-6 text-lg font-black text-indigo-950";

/** Memuat paket bab Kelas 3 sampai 6 secara malas, lalu menyerahkannya ke pemutar modul. */
export default function PemutarBabBaru({ bab }: { bab: BabBaru }) {
  const muat = MUAT_BAB_BARU[bab];
  const [hasil, setHasil] = useState<{ untuk: string; paket: PaketBab | null } | null>(null);

  useEffect(() => {
    if (!muat) return;
    let batal = false;
    muat()
      .then((m) => {
        if (!batal) setHasil({ untuk: bab, paket: m.default });
      })
      .catch(() => {
        if (!batal) setHasil({ untuk: bab, paket: null });
      });
    return () => {
      batal = true;
    };
  }, [bab, muat]);

  const siap = hasil !== null && hasil.untuk === bab;
  if (!muat || (siap && hasil.paket === null)) {
    return (
      <main className={KOTAK}>
        <p className={ISI}>Bab ini belum bisa dibuka. Coba muat ulang halaman, ya.</p>
      </main>
    );
  }
  if (!siap || hasil.paket === null) {
    return (
      <main className={KOTAK}>
        <p className={ISI}>Guru IGIL sedang menyiapkan babnya…</p>
      </main>
    );
  }
  return <IgilModulePlayer bab={bab} paket={hasil.paket} />;
}
