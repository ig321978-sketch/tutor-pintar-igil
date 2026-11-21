"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK5B1 } from "../eja-k5b1";
import {
  KOLOM_PAPAN,
  awalTribun,
  hurufBesar,
  kalimatBetulIsi,
  kalimatBetulNol,
  kalimatBetulTitik,
  kalimatBetulUrai,
  kalimatIsi,
  kalimatNol,
  kalimatTitik,
  kalimatUrai,
  kata,
  kolomKosongKiri,
  kolomTakDisebut,
  lima,
  mulaiLagiTribun,
  opsiTitik,
  opsiUrai,
  pasangTitik,
  periksaIsi,
  periksaNol,
  periksaTitik,
  periksaUrai,
  petunjukCelahSalah,
  petunjukIsi,
  petunjukNol,
  petunjukTitik,
  petunjukUrai,
  pilihModeTribun,
  pilihTitik,
  pilihUrai,
  sasaranIsi,
  sasaranNol,
  sasaranTitik,
  sasaranUrai,
  ubahAngka,
  ubahNol,
  type KeadaanTribun,
  type ModeTribun,
} from "./logika";
import { MISI_TRIBUN_TEKS } from "./data-sim";
import { NAMA_KOLOM, lambang, namaKolom, angkaKolom } from "./logika-data";
import { PapanTempat, angkaPapan } from "./GambarTribun";

/**
 * Simulasi Kelas 5 Bab 1 Sub-Bab A: Tabel Tribun (Misi Tribun). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Isi (isi angka tiap kolom dari bilangan yang diumumkan), Nol (beri nol penjaga pada kolom yang tidak disebut; alat menolak bila masih ada kolom kosong),
 * Titik (pasang titik pemisah tiga angka dari kanan, lalu pilih bacaan; alat menolak titik di tempat lain), dan Urai (pilih banyak yang diwakili satu angka).
 * Semua papan digambar dari bilangan.
 */
const MODE: { id: ModeTribun; nama: string; ikon: string }[] = [
  { id: "isi", nama: "Isi", ikon: "\u{1F522}" },
  { id: "nol", nama: "Nol", ikon: "⭕" },
  { id: "titik", nama: "Titik", ikon: "\u{1F4CD}" },
  { id: "urai", nama: "Urai", ikon: "➕" },
];
/** Nama kolom papan dari kiri ke kanan, dua baris untuk "puluh ribuan". */
const KOLOM_KIRI: readonly string[] = [...NAMA_KOLOM].slice(0, KOLOM_PAPAN).reverse();

export default function SimulasiTabelTribun({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTribun) => void }) {
  const [k, setK] = useState<KeadaanTribun>(() => awalTribun());
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
  const ubah = (baru: KeadaanTribun, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada papan berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ejaK5B1(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK5B1(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1D4ED8] bg-white px-3 text-sm font-black text-[#1E3A8A] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#1D4ED8] bg-white text-[#1D4ED8]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-2 py-2 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#1D4ED8] bg-[#FEF9C3]" : "border-[#93C5FD] bg-white"}`;

  const ganti = (m: ModeTribun) =>
    ubah(
      pilihModeTribun(k, m),
      m === "isi" ? "Dengarkan bilangan yang diumumkan, lalu isi angka tiap kolom." : m === "nol" ? "Beri nol penjaga pada kolom yang tidak disebut." : m === "titik" ? "Pasang titik pemisah, lalu pilih bacaannya." : "Pilih banyak yang diwakili satu angka menurut kolomnya.",
    );

  /* ------------------------------ Isi ------------------------------ */
  const si = sasaranIsi(k);
  const periksaIsiKu = () => {
    const r = periksaIsi(k);
    if (r.ok) return ubah(r.k, kalimatBetulIsi(si));
    ubah(r.k);
    salah(petunjukIsi(k));
  };
  /* ------------------------------ Nol ------------------------------ */
  const sn = sasaranNol(k);
  const angkaNol = lima(sn.n);
  const tak = kolomTakDisebut(sn.n);
  const kosongKiri = kolomKosongKiri(sn.n);
  const periksaNolKu = () => {
    const r = periksaNol(k);
    if (r.ok) return ubah(r.k, kalimatBetulNol(sn));
    ubah(r.k);
    salah(petunjukNol(k));
  };
  /* ------------------------------ Titik ------------------------------ */
  const st = sasaranTitik(k);
  const ot = opsiTitik(k);
  const digitTitik = Array.from(String(st.n));
  const tekanCelah = (p: number) => {
    const r = pasangTitik(k, p);
    if (r.ok) return ubah(r.k, r.k.titikPos > 0 ? "Titik pemisah terpasang tiga angka dari kanan." : undefined);
    ubah(r.k);
    salah(petunjukCelahSalah);
  };
  const periksaTitikKu = () => {
    const r = periksaTitik(k);
    if (r.ok) return ubah(r.k, kalimatBetulTitik(st));
    ubah(r.k);
    salah(petunjukTitik(k));
  };
  /* ------------------------------ Urai ------------------------------ */
  const su = sasaranUrai(k);
  const ou = opsiUrai(k);
  const periksaUraiKu = () => {
    const r = periksaUrai(k);
    if (r.ok) return ubah(r.k, kalimatBetulUrai(su));
    ubah(r.k);
    salah(petunjukUrai(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-tabel-tribun">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#1D4ED8] bg-[#EFF6FF] p-2">
        <p className="text-sm font-black text-[#1E3A8A]">Misi Tabel Tribun</p>
        <p className="text-xs font-bold text-[#1E3A8A]/80">{MISI_TRIBUN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "isi" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#1D4ED8] bg-white px-2 py-1 text-center text-sm font-black text-[#1E3A8A]">
              Pengumuman: {kata(si.n)} {si.benda}
            </p>
            <div key={`is${k.isiKe}`} className="mx-auto grid max-w-[420px] grid-cols-5 gap-1 px-1" role="group" aria-label="Isi angka tiap kolom">
              {KOLOM_KIRI.map((nama, i) => (
                <div key={nama} className="rounded-xl border-2 border-[#93C5FD] bg-[#DBEAFE] px-0.5 pb-0.5">
                  <span className="flex h-7 items-center justify-center text-center text-[10px] font-black leading-[11px] text-[#1E3A8A]">
                    {nama === "puluh ribuan" ? (
                      <>
                        puluh
                        <br />
                        ribuan
                      </>
                    ) : (
                      nama
                    )}
                  </span>
                  <button type="button" aria-label={`Naikkan angka kolom ${nama}`} onClick={() => ubah(ubahAngka(k, i, 1))} className="block min-h-[40px] w-full rounded-md bg-white text-lg font-black text-[#1D4ED8]">
                    {"▲"}
                  </button>
                  <span className="my-0.5 flex h-10 items-center justify-center rounded-md border-2 border-[#B45309] bg-[#FEF9C3] text-2xl font-black text-[#14532D]" data-angka={k.isiAngka[i]}>
                    {k.isiAngka[i]}
                  </span>
                  <button type="button" aria-label={`Turunkan angka kolom ${nama}`} onClick={() => ubah(ubahAngka(k, i, -1))} className="block min-h-[40px] w-full rounded-md bg-white text-lg font-black text-[#1D4ED8]">
                    {"▼"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaIsiKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "nol" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#1D4ED8] bg-white px-2 py-1 text-center text-sm font-black text-[#1E3A8A]">
              Pengumuman: {kata(sn.n)} {sn.benda}
            </p>
            <div key={`nl${k.nolKe}`} className="mx-auto grid max-w-[420px] grid-cols-5 gap-1 px-1" role="group" aria-label="Beri nol penjaga">
              {KOLOM_KIRI.map((nama, i) => {
                const tidakDisebut = tak.includes(i);
                const dipakai = i >= kosongKiri;
                return (
                  <div key={nama} className="rounded-xl border-2 border-[#93C5FD] bg-[#DBEAFE] px-0.5 pb-1">
                    <span className="flex h-7 items-center justify-center text-center text-[10px] font-black leading-[11px] text-[#1E3A8A]">
                      {nama === "puluh ribuan" ? (
                        <>
                          puluh
                          <br />
                          ribuan
                        </>
                      ) : (
                        nama
                      )}
                    </span>
                    {tidakDisebut ? (
                      <button
                        type="button"
                        aria-label={`Kolom ${nama}: ${k.nolTaruh[i] ? "nol penjaga terpasang" : "kosong"}`}
                        aria-pressed={k.nolTaruh[i]}
                        onClick={() => ubah(ubahNol(k, i))}
                        className={`flex h-14 w-full items-center justify-center rounded-md border-[3px] text-3xl font-black ${k.nolTaruh[i] ? "border-[#B45309] bg-[#FACC15] text-[#451A03]" : "border-dashed border-[#1D4ED8] bg-white text-[#B45309]"}`}
                      >
                        {k.nolTaruh[i] ? "0" : "?"}
                      </button>
                    ) : (
                      <span className={`flex h-14 w-full items-center justify-center rounded-md border-2 text-3xl font-black ${dipakai ? "border-[#B45309] bg-[#FEF9C3] text-[#14532D]" : "border-dashed border-[#93C5FD] text-[#93C5FD]"}`} data-angka={dipakai ? angkaNol[i] : ""}>
                        {dipakai ? angkaNol[i] : "-"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaNolKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "titik" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#1D4ED8] bg-white px-2 py-1 text-center text-sm font-black text-[#1E3A8A]">
              Deret angka: {st.benda}, tanpa titik pemisah
            </p>
            <PapanTempat angka={angkaPapan(st.n)} header="sembunyi" titik={k.titikPos > 0} rupa="benda" satuan={st.satuan} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk celah di antara dua angka untuk memasang titik</p>
            <div
              key={`tk${k.titikKe}`}
              className="mx-auto grid max-w-[420px] items-center px-1"
              style={{ gridTemplateColumns: digitTitik.map((_, i) => (i < digitTitik.length - 1 ? "1fr 34px" : "1fr")).join(" ") }}
              role="group"
              aria-label="Celah pemasangan titik"
            >
              {digitTitik.map((d, i) => (
                <React.Fragment key={i}>
                  <span className="text-center text-2xl font-black text-[#14532D]">{d}</span>
                  {i < digitTitik.length - 1 ? (
                    <button
                      type="button"
                      aria-label={`Titik setelah angka ke-${i + 1}`}
                      aria-pressed={k.titikPos === i + 1}
                      onClick={() => tekanCelah(i + 1)}
                      className={`min-h-[44px] rounded-md text-xl font-black ${k.titikPos === i + 1 ? "bg-[#FEE2E2] text-[#B91C1C]" : "border-2 border-dashed border-[#93C5FD] bg-white text-[#93C5FD]"}`}
                    >
                      {k.titikPos === i + 1 ? "." : "·"}
                    </button>
                  ) : null}
                </React.Fragment>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Bagaimana bacaannya?</p>
            <div key={`tb${k.titikKe}`} className="mx-auto grid max-w-[420px] grid-cols-1 gap-2 px-2" role="group" aria-label="Pilih bacaan">
              {ot.map((b, i) => (
                <button key={b} type="button" onClick={() => ubah(pilihTitik(k, i))} aria-pressed={k.titikPilih === i} className={pilihan(k.titikPilih === i)}>
                  {b}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTitikKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urai" ? (
          <div className="space-y-2">
            <PapanTempat angka={angkaPapan(su.n)} header="tampil" sorot={[angkaPapan(su.n).length - 1 - su.k]} rupa="benda" satuan={su.satuan} />
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Angka {kata(angkaKolom(su.n, su.k))} di kolom {namaKolom(su.k)} mewakili berapa {su.satuan}?
            </p>
            <div key={`ur${k.uraiKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Pilih banyak yang diwakili">
              {ou.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihUrai(k, i))} aria-pressed={k.uraiPilih === i} className={pilihan(k.uraiPilih === i)}>
                  {lambang(n)}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUraiKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTribun(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "isi" ? kalimatIsi(k) : k.mode === "nol" ? kalimatNol(k) : k.mode === "titik" ? kalimatTitik(k) : kalimatUrai(k)))}
      </p>
    </div>
  );
}
