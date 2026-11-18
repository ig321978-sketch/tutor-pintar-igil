"use client";

import Link from "next/link";
import type { KondisiTab } from "@/lib/akses-latihan-ujian";

/** Kartu pengganti tab Latihan atau Ujian yang belum boleh dibuka. Aturan: src/lib/akses-latihan-ujian.ts. */
export function KartuTerkunciLatihanUjian({
  tab,
  kondisi,
  bab,
  selesai,
  total,
  onKeMateri,
}: {
  tab: "Latihan" | "Ujian";
  kondisi: Exclude<KondisiTab, "terbuka">;
  bab: string;
  selesai: number;
  total: number;
  onKeMateri: () => void;
}) {
  const tombol =
    "inline-block rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-sm font-black text-[#FFE566] md:text-base";
  const kembali = encodeURIComponent(`/ruang-belajar/${bab}`);
  let judul = `${tab} terbuka setelah Materi selesai`;
  let isi = `Selesaikan semua Sub-Bab di tab Materi dulu, ya. Sub-Bab yang sudah tuntas: ${selesai} dari ${total}.`;
  let aksi = (
    <button type="button" onClick={onKeMateri} className={tombol}>
      KE MATERI ➡️
    </button>
  );
  if (kondisi === "memuat") {
    judul = `Memeriksa akunmu…`;
    isi = `Sebentar, ya. ${tab} dibuka setelah akunmu diperiksa.`;
    aksi = <></>;
  } else if (kondisi === "belum_masuk") {
    judul = `${tab} terbuka setelah kamu masuk`;
    isi = `Masuk dulu ke akunmu, lalu selesaikan semua Sub-Bab di tab Materi. Setelah itu ${tab} bab ini terbuka.`;
    aksi = (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href={`/login?next=${kembali}`} className={tombol}>
          MASUK 🔑
        </Link>
        <button type="button" onClick={onKeMateri} className={tombol}>
          KE MATERI ➡️
        </button>
      </div>
    );
  } else if (kondisi === "belum_ada_anak") {
    judul = `${tab} terbuka setelah profil anak dibuat`;
    isi = `Akunmu sudah masuk, tetapi belum ada profil anak. Daftarkan profil anak dulu, lalu selesaikan semua Sub-Bab di tab Materi.`;
    aksi = (
      <Link href="/daftar" className={tombol}>
        DAFTARKAN PROFIL ANAK
      </Link>
    );
  } else if (kondisi === "server_belum_siap") {
    judul = `${tab} belum bisa dibuka sekarang`;
    isi = `Layanan penilaian belum tersambung. Coba muat ulang halaman sebentar lagi, ya.`;
    aksi = (
      <button type="button" onClick={onKeMateri} className={tombol}>
        KE MATERI ➡️
      </button>
    );
  } else if (kondisi === "langganan_nonaktif") {
    judul = `${tab} terbuka setelah langganan aktif`;
    isi = `Langganan 30 hari seharga Rp 50.000 membuka Latihan, Ujian, dan Praktikum. Materi dan Simulasi tetap gratis.`;
    aksi = (
      <Link href="/langganan" className={tombol}>
        BUKA PEMBAYARAN
      </Link>
    );
  }
  return (
    <section
      data-testid="kartu-terkunci"
      data-kondisi={kondisi}
      className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-4 border-dashed border-[#FFE566] bg-[#FFFDF2] p-8 text-center"
    >
      <div className="igil-lompat text-6xl" aria-hidden="true">
        🔒
      </div>
      <h2 className="text-xl font-black text-[#1C01A5] md:text-2xl">{judul}</h2>
      <p className="mx-auto max-w-xl text-base leading-relaxed text-[#334155] md:text-lg">{isi}</p>
      {aksi}
    </section>
  );
}
