"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  ATAS_SETELAH,
  BAGI,
  BARIS_KALI,
  BANYAK_KOTAK,
  CEK_BAGI,
  CEK_KURSI,
  HARGA_KOTAK,
  JUDUL_INFO_1,
  JUDUL_INFO_2,
  JUMLAH_PENONTON,
  KALI_PISAH,
  KAS,
  KURSI_KOSONG,
  KURSI_STADION,
  PEMBAGI,
  PETUNJUK_INFO_1,
  PETUNJUK_INFO_2,
  SELESAI_INFO_1,
  SELESAI_INFO_2,
  SEL_SIMPAN,
  SUARA_BAGI,
  SUARA_BARIS,
  SUARA_CEK,
  SUARA_JUMLAH,
  SUARA_KOSONG,
  SUARA_PINJAM,
  SUARA_PISAH,
  SUARA_TOTAL_KALI,
  TIAP_TRIBUN,
  TOTAL_KOTAK,
  TRIBUN,
} from "./data-info";
import { angkaKolom, fmt, panjangBilangan } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir, berupa papan hitung panitia (papan tulis hijau dengan kolom berkapur).
 * Kartu 1 = jumlah bersusun penonton empat tribun (tiga sel simpanan dan jumlah) dan kurang bersusun kursi kosong (pinjaman bergulir dan selisih), semuanya berlabel kosong "?" yang diketuk.
 * Kartu 2 = kali 12 x 5.000 (pisah pengali, dua baris kali bersusun, jumlah), bagi 64.000 : 4 per kolom, dan cek dengan operasi kebalikan, berlabel kosong "?" yang diketuk (isi muncul dan dibacakan).
 * Komponen sendiri: gambar dan tata letak mengikuti isi materi (kolom, simpanan, pinjaman, pengali), tanpa PetaLabel dan InfoKartu.
 */
const GRID: React.CSSProperties = { gridTemplateColumns: "70px repeat(5, minmax(0, 1fr))" };
const URUT = [4, 3, 2, 1, 0];
const KOLOM_JUDUL: [string, string][] = [
  ["", "satuan"],
  ["", "puluhan"],
  ["", "ratusan"],
  ["", "ribuan"],
  ["puluh", "ribuan"],
];
const KAPUR = "#FEF9C3";
const GARIS = "#BBF7D0";
const CELAH = "gap-0.5";

function Kepala() {
  return (
    <div className={`grid items-end ${CELAH}`} style={GRID}>
      <span aria-hidden="true" />
      {URUT.map((k) => (
        <span key={k} className="text-center text-[10px] font-black leading-[11px] tracking-tight" style={{ color: KAPUR }}>
          {KOLOM_JUDUL[k][0] ? (
            <>
              {KOLOM_JUDUL[k][0]}
              <br />
            </>
          ) : null}
          {KOLOM_JUDUL[k][1]}
        </span>
      ))}
    </div>
  );
}

const sel = "flex min-h-[22px] items-center justify-center rounded border text-center text-sm font-black leading-none";
const teksBaris = "pl-1 pr-0.5 text-[11px] font-black leading-[12px]";
/** Baris bilangan: nama di kiri dan satu angka per kolom (tanpa nol di depan). */
function BarisAngka({ label, tanda, angka, tebal = false }: { label: string; tanda: string; angka: number; tebal?: boolean }) {
  return (
    <div className={`grid items-center ${CELAH}`} style={GRID} data-baris={label}>
      <span className={teksBaris} style={{ color: KAPUR }}>
        {tanda ? <span className="mr-0.5 text-sm">{tanda}</span> : null}
        {label}
      </span>
      {URUT.map((k) => (
        <span key={k} className={sel} style={{ borderColor: GARIS, color: tebal ? "#FDE047" : KAPUR, background: "rgba(255,255,255,0.06)" }} data-kolom={k}>
          {k < panjangBilangan(angka) ? angkaKolom(angka, k) : ""}
        </span>
      ))}
    </div>
  );
}

/** Tombol sel kosong "?" yang menampilkan isinya setelah diketuk. */
function Tanya({ buka, isi, onKetuk, nama }: { buka: boolean; isi: React.ReactNode; onKetuk: () => void; nama: string }) {
  return (
    <button
      type="button"
      onClick={onKetuk}
      aria-label={buka ? nama : `Sel kosong: ${nama}`}
      className={`min-h-[24px] w-full rounded border-2 text-center text-sm font-black ${buka ? "lm-muncul border-[#86EFAC] bg-[#14532D] text-[#FDE047]" : "border-dashed border-[#FDE047] bg-transparent text-[#FDE047]"}`}
    >
      {buka ? isi : "?"}
    </button>
  );
}
/** Baris dengan nama di kiri dan satu sel kosong selebar lima kolom; setelah dibuka baris diganti isinya. */
function BarisTanya({ label, buka, isi, onKetuk, nama, warna = KAPUR }: { label: string; buka: boolean; isi: React.ReactNode; onKetuk: () => void; nama: string; warna?: string }) {
  return (
    <div className={`grid items-center ${CELAH}`} style={GRID} data-baris={label}>
      <span className={teksBaris} style={{ color: warna }}>
        {label}
      </span>
      <div style={{ gridColumn: "2 / span 5" }}>
        <Tanya buka={buka} isi={isi} onKetuk={onKetuk} nama={nama} />
      </div>
    </div>
  );
}
const Garis = () => <div className="border-t-[3px] border-[#FEF9C3]" />;
/** Baris angka bebas (teks per kolom) dipakai kali bersusun: angka hasil digeser sesuai kolom. */
function BarisSel({ label, tanda, angka, warna = KAPUR }: { label: string; tanda: string; angka: number; warna?: string }) {
  return (
    <div className={`grid items-center ${CELAH} lm-muncul`} style={GRID} data-baris={label}>
      <span className={teksBaris} style={{ color: warna }}>
        {tanda ? <span className="mr-0.5 text-sm">{tanda}</span> : null}
        {label}
      </span>
      {URUT.map((k) => (
        <span key={k} className={sel} style={{ borderColor: GARIS, color: KAPUR, background: "rgba(255,255,255,0.06)" }} data-kolom={k}>
          {k < panjangBilangan(angka) ? angkaKolom(angka, k) : ""}
        </span>
      ))}
    </div>
  );
}

export default function InfoHitung({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [simpan, setSimpan] = useState<number[]>([]);
  const [jumlah, setJumlah] = useState(false);
  const [pinjam, setPinjam] = useState(false);
  const [kosong, setKosong] = useState(false);
  const [pisah, setPisah] = useState(false);
  const [baris, setBaris] = useState<number[]>([]);
  const [totalKali, setTotalKali] = useState(false);
  const [bagi, setBagi] = useState(false);
  const [cek, setCek] = useState(false);

  const jumlahTanya1 = SEL_SIMPAN.length + 3;
  const buka1 = simpan.length + (jumlah ? 1 : 0) + (pinjam ? 1 : 0) + (kosong ? 1 : 0);
  const selesai1 = buka1 === jumlahTanya1;
  const jumlahTanya2 = BARIS_KALI.length + 4;
  const buka2 = (pisah ? 1 : 0) + baris.length + (totalKali ? 1 : 0) + (bagi ? 1 : 0) + (cek ? 1 : 0);
  const selesai2 = buka2 === jumlahTanya2;
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status = kartu === 1 ? (selesai1 ? SELESAI_INFO_1 : `Sudah dibuka ${buka1} dari ${jumlahTanya1} tanda tanya.`) : selesai2 ? SELESAI_INFO_2 : `Sudah dibuka ${buka2} dari ${jumlahTanya2} tanda tanya.`;

  const ketukSimpan = (kolom: number, suara: string) => {
    speakGuru(suara);
    if (!simpan.includes(kolom)) setSimpan((s) => [...s, kolom]);
  };
  const bukaDan = (set: (b: boolean) => void, suara: string) => {
    speakGuru(suara);
    set(true);
  };
  const ketukBaris = (i: number) => {
    speakGuru(SUARA_BARIS[i]);
    if (!baris.includes(i)) setBaris((b) => [...b, i]);
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#166534] p-2 shadow-[0_5px_0_rgba(107,68,35,0.35)]" data-uji="papan-jumlah">
          <p className="mb-1 rounded-md bg-[#14532D] py-0.5 text-center text-sm font-black" style={{ color: KAPUR }}>
            {"\u{1F4CB}"} {JUDUL_INFO_1}
          </p>
          <div className="space-y-0.5">
            <Kepala />
            <div className={`grid items-center ${CELAH}`} style={GRID} data-baris="simpan">
              <span className={`${teksBaris} text-[#FDBA74]`}>simpan</span>
              {URUT.map((k) => {
                const s = SEL_SIMPAN.find((x) => x.kolom === k);
                return s ? (
                  <Tanya key={k} buka={simpan.includes(k)} isi={s.isi} onKetuk={() => ketukSimpan(s.kolom, s.suara)} nama={`simpanan di kolom ${k}`} />
                ) : (
                  <span key={k} aria-hidden="true" />
                );
              })}
            </div>
            {TRIBUN.map((t, i) => (
              <BarisAngka key={t.nama} label={t.nama} tanda={i === 0 ? "" : "+"} angka={t.penonton} />
            ))}
            <Garis />
            {jumlah ? <BarisAngka label="Jumlah" tanda="" angka={JUMLAH_PENONTON} tebal /> : <BarisTanya label="Jumlah" buka={false} isi="" onKetuk={() => bukaDan(setJumlah, SUARA_JUMLAH)} nama="jumlah penonton" />}
            <div className="border-t border-dashed border-[#BBF7D0]/60" />
            <div className={`grid items-center ${CELAH}`} style={GRID} data-baris="pinjam">
              <span className={`${teksBaris} text-[#FDBA74]`}>pinjam</span>
              {pinjam ? (
                URUT.map((k) => (
                  <span key={k} className={`${sel} lm-muncul`} style={{ borderColor: "#FDBA74", color: "#FDBA74" }} data-kolom={k}>
                    {ATAS_SETELAH[k]}
                  </span>
                ))
              ) : (
                <div style={{ gridColumn: "2 / span 5" }}>
                  <Tanya buka={false} isi="" onKetuk={() => bukaDan(setPinjam, SUARA_PINJAM)} nama="pinjaman bergulir" />
                </div>
              )}
            </div>
            <BarisAngka label="Kursi" tanda="" angka={KURSI_STADION} />
            <BarisAngka label="Penonton" tanda="−" angka={JUMLAH_PENONTON} />
            <Garis />
            {kosong ? <BarisAngka label="Kosong" tanda="" angka={KURSI_KOSONG} tebal /> : <BarisTanya label="Kosong" buka={false} isi="" onKetuk={() => bukaDan(setKosong, SUARA_KOSONG)} nama="kursi kosong" />}
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] border-[#92400E] bg-[#166534] p-2 shadow-[0_5px_0_rgba(107,68,35,0.35)]" data-uji="papan-kali">
          <p className="mb-1 rounded-md bg-[#14532D] py-0.5 text-center text-sm font-black" style={{ color: KAPUR }}>
            {"\u{1F4CB}"} {JUDUL_INFO_2}
          </p>
          <div className="space-y-0.5">
            <Tanya
              buka={pisah}
              isi={
                <span className="block px-1 text-[11px] font-black leading-tight">
                  {BANYAK_KOTAK} = {KALI_PISAH.bagian.map((b) => b.pengali).join(" + ")}; {KALI_PISAH.bagian.map((b) => `${b.pengali} × ${fmt(HARGA_KOTAK)} = ${fmt(b.hasil)}`).join(" dan ")}
                </span>
              }
              onKetuk={() => bukaDan(setPisah, SUARA_PISAH)}
              nama="pisah pengali"
            />
            <Kepala />
            <BarisAngka label="Harga" tanda="" angka={HARGA_KOTAK} />
            <BarisAngka label="Banyak" tanda="×" angka={BANYAK_KOTAK} />
            <Garis />
            {BARIS_KALI.map((b, i) =>
              baris.includes(i) ? (
                <BarisSel key={`${b.angka}-${b.geser}`} label={`× ${b.angka}${"0".repeat(b.geser)}`} tanda="" angka={b.hasil} warna="#FDBA74" />
              ) : (
                <BarisTanya key={`${b.angka}-${b.geser}`} label={`× ${b.angka}${"0".repeat(b.geser)}`} buka={false} isi="" onKetuk={() => ketukBaris(i)} nama={`baris kali ${b.angka}`} warna="#FDBA74" />
              ),
            )}
            <Garis />
            {totalKali ? <BarisAngka label="Jumlah" tanda="" angka={TOTAL_KOTAK} tebal /> : <BarisTanya label="Jumlah" buka={false} isi="" onKetuk={() => bukaDan(setTotalKali, SUARA_TOTAL_KALI)} nama="jumlah kali bersusun" />}
            <Tanya
              buka={bagi}
              isi={
                <span className="block px-1 text-[11px] font-black leading-tight">
                  {fmt(KAS)} : {PEMBAGI} = {fmt(TIAP_TRIBUN)} rupiah ({BAGI.langkah.filter((l) => l.angka > 0).map((l) => `${l.angka} : ${PEMBAGI} = ${l.q}`).join(", ")})
                </span>
              }
              onKetuk={() => bukaDan(setBagi, SUARA_BAGI)}
              nama="bagi per kolom"
            />
            <Tanya
              buka={cek}
              isi={
                <span className="block px-1 text-[11px] font-black leading-tight">
                  cek {fmt(TIAP_TRIBUN)} × {PEMBAGI} = {fmt(CEK_BAGI.kembali)}; {fmt(KURSI_KOSONG)} + {fmt(JUMLAH_PENONTON)} = {fmt(CEK_KURSI.kembali)}
                </span>
              }
              onKetuk={() => bukaDan(setCek, SUARA_CEK)}
              nama="cek dengan operasi kebalikan"
            />
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke kartu pertama">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}

export { InfoHitung };
