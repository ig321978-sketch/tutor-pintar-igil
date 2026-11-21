"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK4B5 } from "../eja-k4b5";
import {
  awalEtalase,
  daftarPilah,
  hurufBesar,
  kalimatPilah,
  kalimatPohon,
  kalimatSegitiga,
  kalimatSisi,
  mulaiLagiEtalase,
  nomorPohon,
  opsiPohon,
  periksaPilah,
  periksaPohon,
  periksaSegitiga,
  periksaSisi,
  petunjukPilah,
  petunjukPohon,
  petunjukSegitiga,
  petunjukSisi,
  pilihModeEtalase,
  pilihPohon,
  pilihSegitiga,
  targetSegitiga,
  targetSisi,
  ubahPilah,
  ubahSisi,
  type KeadaanEtalase,
  type ModeEtalase,
} from "./logika";
import { CIRI_SISI, MISI_ETALASE_TEKS, NAMA_SISI_SEGITIGA, NAMA_SUDUT_SEGITIGA } from "./data-sim";
import { ANAK, CIRI_TEKS } from "./logika-cpa";
import { namaDari } from "./logika-bangun";
import { Gambar, Keramik, PohonKeluarga } from "./GambarEtalase";

/**
 * Simulasi Kelas 4 Bab 5 Sub-Bab A: Etalase Keramik (Misi Etalase). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Pilah (golongkan keramik menurut banyak sisinya; alat menolak memeriksa selama masih ada keramik yang belum digolongkan), Sisi (tandai ciri segiempat),
 * Pohon (pilih nama bangun anak pada pohon keluarga bentuk), dan Segitiga (jenis menurut sisi dan menurut sudut). Semua bangun digambar dari koordinat titik sudut.
 */
const MODE: { id: ModeEtalase; nama: string; ikon: string }[] = [
  { id: "pilah", nama: "Pilah", ikon: "\u{1F537}" },
  { id: "sisi", nama: "Sisi", ikon: "\u{1F4D0}" },
  { id: "pohon", nama: "Pohon", ikon: "\u{1F333}" },
  { id: "segitiga", nama: "Segitiga", ikon: "\u{1F53A}" },
];

export default function SimulasiEtalaseKeramik({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanEtalase) => void }) {
  const [k, setK] = useState<KeadaanEtalase>(() => awalEtalase());
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
  const ubah = (baru: KeadaanEtalase, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada keramik berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ejaK4B5(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B5(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#C2410C] bg-white px-3 text-sm font-black text-[#9A3412] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-1 py-1 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;

  const ganti = (m: ModeEtalase) =>
    ubah(
      pilihModeEtalase(k, m),
      m === "pilah" ? "Golongkan tiap keramik menurut banyak sisinya." : m === "sisi" ? "Tandai ciri segiempat itu." : m === "pohon" ? "Pilih nama bangun anak pada pohon keluarga bentuk." : "Pilih jenis segitiga menurut sisi dan menurut sudutnya.",
    );

  /* ------------------------------ Pilah ------------------------------ */
  const periksaPilahKu = () => {
    const r = periksaPilah(k);
    if (r.ok) return ubah(r.k, "Betul! Setiap keramik masuk ke golongan menurut banyak sisinya.");
    ubah(r.k);
    salah(petunjukPilah(k));
  };
  /* ------------------------------ Sisi ------------------------------ */
  const bs = targetSisi(k);
  const periksaSisiKu = () => {
    const r = periksaSisi(k);
    if (r.ok) return ubah(r.k, `Betul! Bangun ini adalah ${namaDari(bs)}, dengan ciri ${CIRI_TEKS[namaDari(bs)]}.`);
    ubah(r.k);
    salah(petunjukSisi(k));
  };
  /* ------------------------------ Pohon ------------------------------ */
  const np = nomorPohon(k);
  const periksaPohonKu = () => {
    const r = periksaPohon(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(ANAK[np].induk)} yang diberi tambahan ciri ${ANAK[np].tambah} menjadi ${namaDari(ANAK[np].hasil)}.`);
    ubah(r.k);
    salah(petunjukPohon(k));
  };
  /* ------------------------------ Segitiga ------------------------------ */
  const bg = targetSegitiga(k);
  const periksaSegitigaKu = () => {
    const r = periksaSegitiga(k);
    if (r.ok) return ubah(r.k, `Betul! Segitiga ini ${NAMA_SISI_SEGITIGA[k.segSisi]} dan ${NAMA_SUDUT_SEGITIGA[k.segSudut]}.`);
    ubah(r.k);
    salah(petunjukSegitiga(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-etalase-keramik">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#9A3412]">Misi Etalase Keramik</p>
        <p className="text-xs font-bold text-[#9A3412]/80">{MISI_ETALASE_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pilah" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#C2410C] bg-white px-2 py-1 text-center text-sm font-black text-[#9A3412]">Ketuk keramik untuk memilih golongan menurut banyak sisinya</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-2" data-uji="rak-pilah">
              {daftarPilah(k).map((b, i) => (
                <button key={`${b}-${i}`} type="button" onClick={() => ubah(ubahPilah(k, i))} aria-label={`Keramik ke-${i + 1}, golongan ${k.pilahIsi[i] === 0 ? "belum dipilih" : `bersisi ${k.pilahIsi[i]}`}`} className={`flex flex-col items-center rounded-xl border-4 bg-white px-1 py-1 ${k.pilahIsi[i] === 0 ? "border-dashed border-[#B45309]" : "border-[#15803D]"}`}>
                  <svg viewBox="0 0 90 60" className="h-[60px] w-full" aria-hidden="true">
                    <Keramik kunci={b} x={6} y={4} w={78} h={52} rupa="benda" />
                  </svg>
                  <span className="text-sm font-black text-[#1C01A5]">{k.pilahIsi[i] === 0 ? "?" : `${k.pilahIsi[i]} sisi`}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPilahKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sisi" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Keramik berbentuk ${namaDari(bs)}`} judul="keramik di meja Bu Dewi" tinggi={150}>
              <Keramik kunci={bs} x={70} y={26} w={160} h={90} rupa="benda" />
              <text x={150} y={138} textAnchor="middle" fontSize={10} fontWeight={900} fill="#9A3412">
                periksa dengan penyiku dan penggaris
              </text>
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Tandai ciri yang dimiliki keramik ini</p>
            <div key={`ci${k.sisiKe}`} className="mx-auto grid max-w-[420px] grid-cols-1 gap-1.5" role="group" aria-label="Pilih ciri">
              {CIRI_SISI.map((c) => (
                <button key={c.id} type="button" onClick={() => ubah(ubahSisi(k, c.id))} aria-pressed={k.sisiPilih.includes(c.id)} className={pilihan(k.sisiPilih.includes(c.id))}>
                  {k.sisiPilih.includes(c.id) ? "✔ " : ""}
                  {c.nama}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSisiKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pohon" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Pohon keluarga bentuk: ${ANAK[np].induk} diberi tambahan ciri`} judul="pohon keluarga keramik" tinggi={130}>
              <PohonKeluarga i={np} rupa="benda" sembunyi="anak" />
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih nama bangun anak</p>
            <div key={`po${k.pohonKe}`} className="mx-auto grid max-w-[420px] grid-cols-1 gap-1.5" role="group" aria-label="Pilih nama bangun">
              {opsiPohon(k).map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihPohon(k, i))} aria-pressed={k.pohonPilih === i} className={pilihan(k.pohonPilih === i)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPohonKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "segitiga" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Keramik segitiga`} judul="keramik segitiga di etalase" tinggi={150}>
              <Keramik kunci={bg} x={90} y={24} w={120} h={92} rupa="benda" />
              <text x={150} y={138} textAnchor="middle" fontSize={10} fontWeight={900} fill="#9A3412">
                periksa sisi dan sudutnya
              </text>
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Menurut sisinya</p>
            <div key={`ss${k.segKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5 px-1" role="group" aria-label="Pilih jenis menurut sisi">
              {NAMA_SISI_SEGITIGA.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihSegitiga(k, "sisi", i))} aria-pressed={k.segSisi === i} className={pilihan(k.segSisi === i)}>
                  {n}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Menurut sudutnya</p>
            <div key={`sd${k.segKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5 px-1" role="group" aria-label="Pilih jenis menurut sudut">
              {NAMA_SUDUT_SEGITIGA.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihSegitiga(k, "sudut", i))} aria-pressed={k.segSudut === i} className={pilihan(k.segSudut === i)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSegitigaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiEtalase(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "pilah" ? kalimatPilah(k) : k.mode === "sisi" ? kalimatSisi(k) : k.mode === "pohon" ? kalimatPohon(k) : kalimatSegitiga(k)))}
      </p>
    </div>
  );
}
