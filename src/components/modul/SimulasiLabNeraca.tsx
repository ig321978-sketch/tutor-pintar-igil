"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import { NeracaRangka } from "./diagram-k2b6";
import { BendaLab, DuaTangan, pikselBenda } from "./gambar-lab-k2b6";
import {
  NAMA_BENDA_NERACA,
  NAMA_CARA_NERACA,
  URUT_BENDA_NERACA,
  URUT_CARA_NERACA,
  ambil,
  awalNeraca,
  kalimatCatatan,
  kalimatEkstrem,
  kalimatNeraca,
  kalimatUkuran,
  kosongkan,
  laporanNeraca,
  miringNeraca,
  nyalakanUkuran,
  pilihCara,
  taruh,
  tentukanEkstrem,
  tukarSisi,
  type BendaNeraca,
  type CaraNeraca,
} from "./lab-neraca-k2b6";
import type { KeadaanLabNeraca } from "./misi-k2bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B6 Sub-Bab A): Lab Neraca — model PhET + lab 2D.                */
/* Dua benda di dua piringan, tiga cara menimbang (jungkat-jungkit, gantungan   */
/* baju, dua tangan). Ukuran asli benda bisa dinyalakan: besar belum tentu      */
/* berat. Catatan timbangan membantu menyimpulkan paling berat dan paling       */
/* ringan. Tanpa skor, tanpa waktu. Logika: lab-neraca-k2b6.ts.                 */
/* ------------------------------------------------------------------------ */

type Sisi = "kiri" | "kanan";

export default function SimulasiLabNeraca({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabNeraca) => void }) {
  const [l, setL] = useState(awalNeraca);
  const [terpilih, setTerpilih] = useState<BendaNeraca | null>(null);
  const [sedangSeret, setSedangSeret] = useState<BendaNeraca | null>(null);

  const lap = useMemo(() => laporanNeraca(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const miring = miringNeraca(l.kiri, l.kanan);
  const teks = kalimatNeraca(l);
  const tambahan = kalimatUkuran(l);
  const ekstrem = useMemo(() => tentukanEkstrem(l.catatan), [l.catatan]);

  const letakkan = (sisi: Sisi, benda: BendaNeraca) => {
    setL((x) => taruh(x, sisi, benda));
    setTerpilih(null);
    setSedangSeret(null);
  };

  /** Ketuk piringan: menaruh benda terpilih, atau mengangkat benda yang ada di piringan itu. */
  const ketukPiringan = (sisi: Sisi) => {
    if (terpilih) letakkan(sisi, terpilih);
    else if (l[sisi]) setL((x) => ambil(x, sisi));
  };

  const isiSisi = (sisi: Sisi) => {
    const b = l[sisi];
    return b ? <BendaLab id={b} ukuran={pikselBenda(b, l.ukuran)} /> : null;
  };

  const label = `Neraca cara ${NAMA_CARA_NERACA[l.cara]}: kiri ${l.kiri ? NAMA_BENDA_NERACA[l.kiri] : "kosong"}, kanan ${l.kanan ? NAMA_BENDA_NERACA[l.kanan] : "kosong"}. ${
    miring === 0 ? (l.kiri && l.kanan ? "Seimbang." : "Kosong.") : miring === -1 ? "Sisi kiri turun." : "Sisi kanan turun."
  }`;

  const tombolPiringan = (sisi: Sisi) => {
    const b = l[sisi];
    return (
      <button
        type="button"
        onClick={() => ketukPiringan(sisi)}
        onDragOver={(e) => {
          if (sedangSeret) e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (sedangSeret) letakkan(sisi, sedangSeret);
        }}
        aria-label={
          terpilih
            ? `Taruh ${NAMA_BENDA_NERACA[terpilih]} di piringan ${sisi}`
            : b
              ? `Angkat ${NAMA_BENDA_NERACA[b]} dari piringan ${sisi}`
              : `Piringan ${sisi} kosong. Pilih benda dulu`
        }
        className={`min-h-14 rounded-2xl border-4 border-dashed px-2 py-1.5 text-sm font-black text-[#1C01A5] ${
          terpilih ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5]/40 bg-[#F5F3FF]"
        }`}
      >
        <span className="block text-[11px] uppercase tracking-wide text-[#1C01A5]/70">Piringan {sisi}</span>
        {terpilih ? `Taruh ${NAMA_BENDA_NERACA[terpilih]} di sini` : b ? `${NAMA_BENDA_NERACA[b]} (ketuk untuk mengangkat)` : "kosong"}
      </button>
    );
  };

  const resetSemua = () => {
    setL(awalNeraca());
    setTerpilih(null);
    setSedangSeret(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Neraca</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Pilih benda, lalu ketuk piringan kiri atau kanan. Sisi yang turun berisi benda yang lebih berat.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(`${teks} ${tambahan}`))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Cara menimbang">
          <span className="text-xs font-black text-[#1C01A5]">Cara:</span>
          {URUT_CARA_NERACA.map((c: CaraNeraca) => (
            <Pilihan key={c} aktif={l.cara === c} onKlik={() => setL((x) => pilihCara(x, c))} label={`Cara menimbang ${NAMA_CARA_NERACA[c]}`}>
              {NAMA_CARA_NERACA[c]}
            </Pilihan>
          ))}
        </div>

        {l.cara === "tangan" ? (
          <DuaTangan miring={miring} kiri={isiSisi("kiri")} kanan={isiSisi("kanan")} label={label} />
        ) : (
          <NeracaRangka miring={miring} kiri={isiSisi("kiri")} kanan={isiSisi("kanan")} label={label} varian={l.cara === "gantung" ? "gantung" : "neraca"} />
        )}

        <div className="grid grid-cols-2 gap-2">
          {tombolPiringan("kiri")}
          {tombolPiringan("kanan")}
        </div>
        <KalimatBesar teks={teks} />
        {tambahan ? <KalimatBesar teks={tambahan} warna="bg-[#E0E7FF]" /> : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Nampan benda • ketuk atau seret ke piringan</p>
        <div className="flex flex-wrap items-end justify-center gap-1.5" role="group" aria-label="Pilih benda untuk ditimbang">
          {URUT_BENDA_NERACA.map((b) => (
            <button
              key={b}
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", b);
                setSedangSeret(b);
              }}
              onDragEnd={() => setSedangSeret(null)}
              onClick={() => setTerpilih(terpilih === b ? null : b)}
              aria-pressed={terpilih === b}
              aria-label={`Benda ${NAMA_BENDA_NERACA[b]}`}
              className={`flex min-h-16 min-w-16 flex-col items-center justify-end gap-0.5 rounded-xl border-4 px-1.5 py-1 ${
                terpilih === b ? "border-[#F0AB00] bg-[#FFF7CC]" : l.kiri === b || l.kanan === b ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/25 bg-white"
              }`}
            >
              <BendaLab id={b} ukuran={pikselBenda(b, l.ukuran)} />
              <span className="text-[11px] font-black text-[#1C01A5]">{NAMA_BENDA_NERACA[b]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Tampilan dan alat">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={l.ukuran} onKlik={() => setL((x) => nyalakanUkuran(x, !x.ukuran))}>
            Ukuran asli
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setL((x) => kosongkan(x))}>
            🧺 Kosongkan piringan
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setL((x) => tukarSisi(x))}>
            🔁 Tukar sisi
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Catatan timbangan • {l.catatan.length} pasangan</p>
          {l.catatan.length === 0 ? (
            <p className="text-sm font-bold text-[#1C01A5]/50">Belum ada. Timbang dua benda berbeda untuk mencatat.</p>
          ) : (
            <ol className="space-y-1">
              {l.catatan.slice(-8).map((c) => (
                <li key={`${c.a}-${c.b}`} className="rounded-xl bg-[#F5F3FF] px-2 py-1 text-sm font-black text-[#1C01A5]">
                  {kalimatCatatan(c)}
                </li>
              ))}
            </ol>
          )}
          {ekstrem ? <p className="igil-muncul rounded-xl bg-[#E8F7EE] px-2 py-1 text-sm font-black text-[#14532D]">✅ {kalimatEkstrem(ekstrem)}</p> : null}
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, taruh semangka dan apel. Sisi mana yang turun? Apa artinya? Dua, taruh balon dan batu, lalu nyalakan ukuran asli. Mana yang lebih besar? Mana yang lebih berat? Tiga, taruh apel dan jeruk. Apa yang terjadi pada neraca? Empat, timbang benda yang sama dengan tiga cara. Apakah hasilnya berbeda?"
          )
        }
        langkah={[
          "Taruh semangka dan apel. Sisi mana yang turun? Apa artinya?",
          "Taruh balon dan batu, lalu nyalakan Ukuran asli. Mana yang lebih besar? Mana yang lebih berat?",
          "Taruh apel dan jeruk. Apa yang terjadi pada neraca?",
          "Timbang dua benda yang sama dengan tiga cara. Apakah hasilnya berbeda?",
        ]}
      />
    </div>
  );
}
