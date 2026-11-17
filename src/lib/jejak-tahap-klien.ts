"use client";

import { jejakMasihAwal, uraiJejak, type JejakBab } from "@/lib/jejak-tahap";

/** Sama dengan pilihan anak di BelajarServer. */
const KUNCI_ANAK = "igil_anak_aktif";
const KUNCI = "igil_jejak_tahap_v1";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Gudang = Record<string, Record<string, JejakBab>>;

function bacaGudang(): Gudang {
  if (typeof window === "undefined") return {};
  try {
    const mentah = window.localStorage.getItem(KUNCI);
    if (!mentah) return {};
    const nilai = JSON.parse(mentah) as unknown;
    if (!nilai || typeof nilai !== "object" || Array.isArray(nilai)) return {};
    return nilai as Gudang;
  } catch {
    return {};
  }
}

function tulisGudang(g: Gudang): void {
  try {
    window.localStorage.setItem(KUNCI, JSON.stringify(g));
  } catch {
    /* penyimpanan penuh: posisi tetap di memori sampai siswa berpindah halaman */
  }
}

export function akunPerangkat(): string {
  if (typeof window === "undefined") return "tamu";
  try {
    const id = window.localStorage.getItem(KUNCI_ANAK);
    if (id && UUID.test(id)) return id;
  } catch {
    /* abaikan */
  }
  return "tamu";
}

export function bacaJejakLokal(akun: string, bab: string): JejakBab {
  const g = bacaGudang();
  return uraiJejak(g[akun]?.[bab]);
}

export function tulisJejakLokal(akun: string, bab: string, jejak: JejakBab): void {
  const g = bacaGudang();
  const ruang = { ...(g[akun] ?? {}), [bab]: jejak };
  tulisGudang({ ...g, [akun]: ruang });
}

function hapusJejakLokal(akun: string, bab: string): void {
  const g = bacaGudang();
  if (!g[akun]?.[bab]) return;
  const ruang = { ...g[akun] };
  delete ruang[bab];
  tulisGudang({ ...g, [akun]: ruang });
}

/** Jejak anak ini. Bila masih kosong, ambil jejak tamu di perangkat yang sama lalu lepas dari tamu. */
export function muatJejakLokal(akun: string, bab: string): JejakBab {
  let jejak = bacaJejakLokal(akun, bab);
  if (akun !== "tamu" && jejakMasihAwal(jejak)) {
    const tamu = bacaJejakLokal("tamu", bab);
    if (!jejakMasihAwal(tamu)) {
      jejak = tamu;
      tulisJejakLokal(akun, bab, jejak);
      hapusJejakLokal("tamu", bab);
    }
  }
  return jejak;
}

type Balasan = { status?: string; jejak?: unknown };

export async function ambilJejakServer(anak: string, bab: string): Promise<JejakBab | null> {
  if (anak === "tamu") return null;
  try {
    const res = await fetch(`/api/belajar/jejak?anak=${encodeURIComponent(anak)}&bab=${encodeURIComponent(bab)}`, {
      cache: "no-store",
    });
    const json = (await res.json()) as Balasan;
    if (json.status !== "ada" || !json.jejak) return null;
    return uraiJejak(json.jejak);
  } catch {
    return null;
  }
}

export async function kirimJejakServer(anak: string, bab: string, jejak: JejakBab): Promise<JejakBab | null> {
  if (anak === "tamu") return null;
  try {
    const res = await fetch("/api/belajar/jejak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        anak,
        bab,
        subAktif: jejak.subAktif,
        tahap: jejak.tahap,
        subSelesai: jejak.subSelesai,
        tab: jejak.tab,
      }),
    });
    const json = (await res.json()) as Balasan;
    if (json.status !== "ok" || !json.jejak) return null;
    return uraiJejak(json.jejak);
  } catch {
    return null;
  }
}
