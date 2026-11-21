"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK5B1 } from "../eja-k5b1";
import {
  awalPiring,
  bilanganPasang,
  bilanganTata,
  hurufBesar,
  kalimatCek,
  kalimatDaftar,
  kalimatPasang,
  kalimatTata,
  kalimatTerima,
  kartuPasang,
  ketukPasang,
  mulaiLagiPiring,
  periksaCek,
  periksaDaftar,
  periksaTata,
  petunjukCek,
  petunjukDaftar,
  petunjukPasang,
  petunjukTata,
  pilihModePiring,
  sasaranCek,
  sasaranDaftar,
  ubahCek,
  ubahDaftar,
  ubahTata,
  type KeadaanPiring,
  type ModePiring,
} from "./logika";
import { MISI_PIRING_TEKS } from "./data-sim";
import { PapanPiring } from "./GambarPiring";

/**
 * Simulasi Kelas 5 Bab 2 Sub-Bab C: Tata Piring (Misi Piring). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Tata (atur isi tiap piring sampai klepon habis dibagi, catat semua faktor; alat menolak isi piring yang menyisakan klepon),
 * Pasang (ketuk dua kartu faktor yang hasil kalinya sama dengan bilangan; alat menolak pasangan yang keliru),
 * Cek (isi sisa pembagian; alat menolak bila belum diisi), dan Daftar (pilih semua faktor; alat menolak bila belum ada yang dipilih).
 * Klepon pada alat Tata digambar dari data (tataPiring).
 */
const MODE: { id: ModePiring; nama: string; ikon: string }[] = [
  { id: "tata", nama: "Tata", ikon: "\u{1F361}" },
  { id: "pasang", nama: "Pasang", ikon: "\u{1F517}" },
  { id: "cek", nama: "Cek", ikon: "\u{1F50D}" },
  { id: "daftar", nama: "Daftar", ikon: "\u{1F4DD}" },
];

export default function SimulasiTataPiring({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPiring) => void }) {
  const [k, setK] = useState<KeadaanPiring>(() => awalPiring());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanPiring, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada sasaran berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ejaK5B1(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK5B1(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#166534] bg-white px-3 text-sm font-black text-[#14532D] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#166534] bg-[#166534] text-white" : "border-[#166534] bg-white text-[#166534]"}`;
  const kartuPilih = (nyala: boolean, hijau = false) =>
    `min-h-[52px] w-full min-w-0 rounded-xl border-4 px-1 py-2 text-center text-xl font-black leading-tight text-[#1C01A5] ${hijau ? "border-[#15803D] bg-[#DCFCE7]" : nyala ? "border-[#B45309] bg-[#FEF3C7]" : "border-[#86EFAC] bg-white"}`;
  const kecil = "min-h-[44px] w-full rounded-lg border-2 border-[#166534] bg-white text-xl font-black text-[#14532D]";

  const ganti = (m: ModePiring) =>
    ubah(
      pilihModePiring(k, m),
      m === "tata"
        ? "Atur isi tiap piring, lalu tekan Periksa. Catat semua cara yang habis dibagi."
        : m === "pasang"
          ? "Ketuk dua kartu yang hasil kalinya sama dengan bilangan di papan."
          : m === "cek"
            ? "Atur sisa pembagian dengan tombol tambah dan kurang."
            : "Pilih semua kartu yang membagi bilangan di papan tanpa sisa.",
    );

  /* ------------------------------ Tata ------------------------------ */
  const nTata = bilanganTata(k);
  const periksaTataKu = () => {
    const r = periksaTata(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukTata(k));
    }
    if (r.k.tataBenar.length > k.tataBenar.length) return ubah(r.k, "Betul! Semua cara sudah tercatat, jadi semua faktor sudah ketemu. Ada klepon berikutnya.");
    ubah(r.k, kalimatTerima(k, r.baru));
  };
  /* ------------------------------ Pasang ------------------------------ */
  const nPasang = bilanganPasang(k);
  const kartuP = kartuPasang(nPasang);
  const ketukPasangKu = (i: number) => {
    const r = ketukPasang(k, i);
    if (r.hasil === "tolak") {
      ubah(r.k);
      return salah(petunjukPasang());
    }
    if (r.hasil === "cocok") return ubah(r.k, r.k.pasangBenar.length > k.pasangBenar.length ? "Betul! Semua faktor sudah berpasangan. Ada bilangan berikutnya." : "Betul! Hasil kali kedua kartu sama dengan bilangan di papan.");
    ubah(r.k);
  };
  /* ------------------------------ Cek ------------------------------ */
  const sc = sasaranCek(k);
  const periksaCekKu = () => {
    const r = periksaCek(k);
    if (r.ok) return ubah(r.k, "Betul! Sisanya tepat sesuai pembagian.");
    ubah(r.k);
    salah(petunjukCek(k));
  };
  /* ------------------------------ Daftar ------------------------------ */
  const sd = sasaranDaftar(k);
  const periksaDaftarKu = () => {
    const r = periksaDaftar(k);
    if (r.ok) return ubah(r.k, "Betul! Semua faktor sudah dipilih, termasuk satu dan bilangan itu sendiri.");
    ubah(r.k);
    salah(petunjukDaftar(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-tata-piring">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#166534] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Tata Piring</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_PIRING_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tata" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#166534] bg-white px-2 py-1 text-center text-sm font-black text-[#14532D]">Klepon di baki: {nTata}</p>
            <PapanPiring n={nTata} g={k.tataP} satuan="klepon" judul={`tiap piring ${k.tataP} klepon`} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Cara yang sudah tercatat: {k.tataTemu.length === 0 ? "belum ada" : k.tataTemu.join(", ")}</p>
            <div key={`ta${k.tataKe}`} className="mx-auto grid max-w-[300px] grid-cols-3 items-center gap-2 px-1" role="group" aria-label="Atur isi tiap piring">
              <span className="col-span-3 text-center text-[12px] font-black leading-tight text-[#1C01A5]">Isi tiap piring</span>
              <button type="button" aria-label="Kurangi isi piring" onClick={() => ubah(ubahTata(k, -1))} className={kecil}>
                −
              </button>
              <span className="block text-center text-2xl font-black text-[#1C01A5]">{k.tataP}</span>
              <button type="button" aria-label="Tambah isi piring" onClick={() => ubah(ubahTata(k, 1))} className={kecil}>
                +
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTataKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pasang" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#166534] bg-white px-2 py-1 text-center text-sm font-black text-[#14532D]">Bilangan di papan: {nPasang}</p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk dua kartu yang berpasangan</p>
            <div key={`pa${k.pasangKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Kartu faktor">
              {kartuP.map((c, i) => (
                <button key={c} type="button" onClick={() => ketukPasangKu(i)} aria-pressed={k.pasangPilih === i} aria-label={`Kartu ${c}`} disabled={k.pasangTemu.includes(i)} className={kartuPilih(k.pasangPilih === i, k.pasangTemu.includes(i))}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "cek" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#166534] bg-white px-2 py-1 text-center text-sm font-black text-[#14532D]">
              {sc.n} klepon, tiap piring {sc.x} klepon
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa klepon yang tersisa?</p>
            <div key={`ce${k.cekKe}`} className="mx-auto grid max-w-[300px] grid-cols-3 items-center gap-2 px-1" role="group" aria-label="Atur sisa pembagian">
              <span className="col-span-3 text-center text-[12px] font-black leading-tight text-[#1C01A5]">Sisa klepon</span>
              <button type="button" aria-label="Kurangi sisa" onClick={() => ubah(ubahCek(k, -1))} className={kecil}>
                −
              </button>
              <span className="block text-center text-2xl font-black text-[#1C01A5]">{k.cekSisa < 0 ? "?" : k.cekSisa}</span>
              <button type="button" aria-label="Tambah sisa" onClick={() => ubah(ubahCek(k, 1))} className={kecil}>
                +
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaCekKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "daftar" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#166534] bg-white px-2 py-1 text-center text-sm font-black text-[#14532D]">Bilangan di papan: {sd.n}</p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk semua kartu yang menjadi faktor</p>
            <div key={`da${k.daftarKe}`} className="mx-auto grid max-w-[420px] grid-cols-4 gap-2 px-2" role="group" aria-label="Pilih faktor">
              {sd.kartu.map((c, i) => (
                <button key={c} type="button" onClick={() => ubah(ubahDaftar(k, i))} aria-pressed={k.daftarPilih[i]} aria-label={`Kartu ${c}`} className={kartuPilih(k.daftarPilih[i])}>
                  {k.daftarPilih[i] ? "✔ " : ""}
                  {c}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaDaftarKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPiring(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "tata" ? kalimatTata(k) : k.mode === "pasang" ? kalimatPasang(k) : k.mode === "cek" ? kalimatCek(k) : kalimatDaftar(k)))}
      </p>
    </div>
  );
}
