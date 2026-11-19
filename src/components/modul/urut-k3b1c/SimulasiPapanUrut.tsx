"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { GarisSvg, KartuanSvg } from "./LangkahUrut";
import { MISI_URUTAN_TEKS } from "./data-sim";
import {
  SUARA_MODE,
  awalUrutan,
  gantiArahUrut,
  kalimatUrutan,
  ketukUrut,
  mulaiLagiUrutan,
  pasanganTanda,
  pasanganTempat,
  periksaGaris,
  periksaTanda,
  periksaTempat,
  pilihModeUrutan,
  pilihTanda,
  pilihTempat,
  tugasGaris,
  tugasUrut,
  ubahGaris,
  ulangUrut,
  type Hasil,
  type KeadaanUrutan,
  type ModeUrutan,
} from "./logika";
import { angkaTempat, urutanIndeks, type Tanda, type Tempat } from "./logika-cpa";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab C: Papan Urut (Misi Papan Urut). Empat alat tanpa skor: Tempat (pilih tempat pertama yang berbeda), Tanda (pilih tanda),
 * Garis (letakkan bilangan di antara dua ratusan pada garis bilangan), Urut (ketuk kartu menurut urutan naik atau turun).
 */
const MODE: { id: ModeUrutan; nama: string; ikon: string }[] = [
  { id: "tempat", nama: "Tempat", ikon: "\u{1F4AF}" },
  { id: "tanda", nama: "Tanda", ikon: "\u{1F40A}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F4CF}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F4F6}" },
];
const TEMPAT: { id: number; teks: string }[] = [
  { id: 0, teks: "ratusan" },
  { id: 1, teks: "puluhan" },
  { id: 2, teks: "satuan" },
  { id: 3, teks: "sama semua" },
];
const TANDA: { id: Tanda; teks: string }[] = [
  { id: "<", teks: "lebih kecil <" },
  { id: ">", teks: "lebih besar >" },
  { id: "=", teks: "sama dengan =" },
];

/** Papan tiga tempat satu bilangan: tiga kolom berisi angka ratusan, puluhan, satuan; kolom yang dipilih disorot. */
function PapanTiga({ nama, n, sorot }: { nama: string; n: number; sorot: number }) {
  return (
    <div className="rounded-xl border-4 border-[#92400E] bg-white p-1" role="group" aria-label={`Papan tiga tempat ${nama}`}>
      <p className="text-center text-xs font-black text-[#7C3AED]">{nama}</p>
      <div className="grid grid-cols-3 gap-0.5">
        {(["ratusan", "puluhan", "satuan"] as const).map((j, t) => (
          <div key={j} className={`rounded-md py-1 text-center ${sorot === t || sorot === 3 ? "bg-[#FEF08A]" : "bg-[#F8FAFC]"}`}>
            <p className="text-[9px] font-black text-[#92400E]">{j}</p>
            <p className="text-2xl font-black text-[#1C01A5]">{angkaTempat(n, t as Tempat)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SimulasiPapanUrut({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUrutan) => void }) {
  const [k, setK] = useState<KeadaanUrutan>(() => awalUrutan());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanUrutan, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#92400E] bg-white px-3 text-sm font-black text-[#92400E] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 text-sm font-black ${nyala ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#B45309] bg-[#FFFBEB] text-[#78350F]"}`;
  const ganti = (m: ModeUrutan) => ubah(pilihModeUrutan(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "tempat") ubah({ ...k, tempatPilih: -1 }, "Pilihan dibatalkan. Pilih tempat lagi.");
    else if (k.mode === "tanda") ubah({ ...k, tandaPilih: "" }, "Pilihan dibatalkan. Pilih tanda lagi.");
    else if (k.mode === "garis") ubah({ ...k, garisPilih: 0 }, "Pilihan dibatalkan. Atur ratusan lagi.");
    else ubah(ulangUrut(k), "Kartu dikosongkan. Ketuk lagi dari awal.");
  };

  const pt = pasanganTempat(k);
  const pn = pasanganTanda(k);
  const tg = tugasGaris(k);
  const tu = tugasUrut(k);
  const urutBenar = urutanIndeks(tu.angka, k.urutArah);

  return (
    <div className="space-y-3" data-uji="simulasi-papan-urut">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Papan Urut</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_URUTAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#B45309] bg-[#FEF3C7] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tempat" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Bandingkan dari kiri. Tempat mana yang pertama berbeda?</p>
            <div className="grid grid-cols-2 gap-2">
              <PapanTiga nama="Bilangan A" n={pt.a} sorot={k.tempatPilih} />
              <PapanTiga nama="Bilangan B" n={pt.b} sorot={k.tempatPilih} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Pilih tempat">
              {TEMPAT.map((x) => (
                <button key={x.id} type="button" aria-pressed={k.tempatPilih === x.id} className={pilihan(k.tempatPilih === x.id)} onClick={() => ubah(pilihTempat(k, x.id))}>
                  {x.teks}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaTempat(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "tanda" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Bilangan A dibanding bilangan B: pilih tandanya</p>
            <KartuanSvg angka={[pn.a, pn.b]} rupa="diagram" huruf />
            <p className="mt-1 text-center text-2xl font-black text-[#1C01A5]">
              {pn.a} <span className="text-[#DC2626]">{k.tandaPilih === "" ? "?" : k.tandaPilih}</span> {pn.b}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Pilih tanda">
              {TANDA.map((x) => (
                <button key={x.id} type="button" aria-pressed={k.tandaPilih === x.id} className={pilihan(k.tandaPilih === x.id)} onClick={() => ubah(pilihTanda(k, x.id))}>
                  {x.teks}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaTanda(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "garis" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Titik P ada di antara dua ratusan. Atur ratusan di sebelah kirinya</p>
            <GarisSvg awal={tg.awal} rupa="diagram" titik={[{ n: tg.n, huruf: "P", warna: "#DC2626" }]} />
            <p className="mt-1 text-center text-base font-black text-[#1C01A5]">Bilangan P = {tg.n}</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-black text-[#1C01A5]">Ratusan kiri:</span>
              <button type="button" className={tombol} aria-label="Kurangi ratusannya" onClick={() => ubah(ubahGaris(k, -1))}>
                -
              </button>
              <span className="w-14 text-center text-lg font-black text-[#1C01A5]">{k.garisPilih === 0 ? "?" : `${k.garisPilih}00`}</span>
              <button type="button" className={tombol} aria-label="Tambah ratusannya" onClick={() => ubah(ubahGaris(k, 1))}>
                +
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaGaris(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "urut" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Ketuk kartu dari yang paling {k.urutArah === "naik" ? "kecil" : "besar"}</p>
            <div className="mb-2 flex justify-center gap-2" role="group" aria-label="Pilih arah urutan">
              <button type="button" aria-pressed={k.urutArah === "naik"} className={saklar(k.urutArah === "naik")} onClick={() => ubah(gantiArahUrut(k, "naik"), "Urutan naik: mulai dari bilangan yang terkecil.")}>
                Urutan naik
              </button>
              <button type="button" aria-pressed={k.urutArah === "turun"} className={saklar(k.urutArah === "turun")} onClick={() => ubah(gantiArahUrut(k, "turun"), "Urutan turun: mulai dari bilangan yang terbesar.")}>
                Urutan turun
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Ketuk kartu">
              {tu.angka.map((n, i) => (
                <button
                  key={n}
                  type="button"
                  disabled={k.urutSudah.includes(i)}
                  onClick={() => terapkan(ketukUrut(k, i))}
                  className={`flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-2xl font-black ${k.urutSudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
                    {k.urutSudah.includes(i) ? k.urutSudah.indexOf(i) + 1 : "?"}
                  </span>
                  {n}
                </button>
              ))}
            </div>
            <p className="mt-1 text-center text-xs font-bold text-[#78350F]/80">
              {k.urutSudah.length}/{urutBenar.length} kartu sudah benar
            </p>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiUrutan(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatUrutan(k)}
      </p>
    </div>
  );
}
