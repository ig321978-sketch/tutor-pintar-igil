"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import { ModelBilangan, PapanNilai } from "./diagram-k2b7";
import {
  HIMPUNAN_URUT,
  MAKS_BANDING,
  MIN_BANDING,
  alasanBanding,
  awalBanding,
  himpunanDari,
  hapusTerakhirUrut,
  kalimatBanding,
  laporanBanding,
  nyalakanBanding,
  pilihArahUrut,
  pilihHimpunan,
  pilihUrut,
  puluhanBanding,
  resetBanding,
  satuanBanding,
  tandaBanding,
  ubahBanding,
  ubahModeBanding,
  ulangUrut,
  urutSelesaiAktif,
  type SisiBanding,
  type TampilBanding,
} from "./lab-banding-k2b7";
import type { KeadaanLabBanding } from "./misi-k2bab7";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B7 Sub-Bab B): Lab Banding dan Urut — lab 2D di kanvas.            */
/* Mode Banding: dua bilangan, batang, papan nilai tempat, Aturan (puluhan dulu,     */
/* satuan bila puluhan sama), dan Tanda. Mode Urut: ketuk bilangan satu per satu dari  */
/* yang paling kecil atau paling besar. Urutan yang keliru tetap tampil dengan alasan  */
/* sampai diulang. Logika: lab-banding-k2b7.ts.                                       */
/* ------------------------------------------------------------------------ */

const NAMA_TAMPIL: Record<TampilBanding, string> = { batang: "Batang", papan: "Papan nilai tempat", aturan: "Aturan", tanda: "Tanda" };
const TOMBOL_KECIL =
  "h-9 min-w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white px-1.5 text-xs font-black leading-none text-[#1C01A5] disabled:opacity-30";

function Penggeser({ nama, nilai, onUbah }: { nama: string; nilai: number; onUbah: (d: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-1" role="group" aria-label={`Atur ${nama}`}>
      <button type="button" className={TOMBOL_KECIL} disabled={nilai <= MIN_BANDING} aria-label={`${nama} kurang sepuluh`} onClick={() => onUbah(-10)}>
        −10
      </button>
      <button type="button" className={TOMBOL_KECIL} disabled={nilai <= MIN_BANDING} aria-label={`${nama} kurang satu`} onClick={() => onUbah(-1)}>
        −1
      </button>
      <span className="w-12 text-center text-3xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`${nama} adalah ${nilai}`}>
        {nilai}
      </span>
      <button type="button" className={`${TOMBOL_KECIL} bg-[#FFE566]`} disabled={nilai >= MAKS_BANDING} aria-label={`${nama} tambah satu`} onClick={() => onUbah(1)}>
        +1
      </button>
      <button type="button" className={`${TOMBOL_KECIL} bg-[#FFE566]`} disabled={nilai >= MAKS_BANDING} aria-label={`${nama} tambah sepuluh`} onClick={() => onUbah(10)}>
        +10
      </button>
    </div>
  );
}

function SisiKartu({ judul, sisi, n, batang, papan, onUbah }: { judul: string; sisi: SisiBanding; n: number; batang: boolean; papan: boolean; onUbah: (s: SisiBanding, d: number) => void }) {
  return (
    <div className="space-y-2 rounded-2xl border-4 border-[#1C01A5]/40 bg-indigo-50/50 p-2">
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{judul}</p>
      <Penggeser nama={judul} nilai={n} onUbah={(d) => onUbah(sisi, d)} />
      {batang ? (
        <div className="flex min-h-[40px] justify-center overflow-x-auto" aria-label={`Batang ${judul}`}>
          <ModelBilangan p={puluhanBanding(n)} s={satuanBanding(n)} skala={n >= 100 ? 0.5 : 0.7} />
        </div>
      ) : null}
      {papan ? <PapanNilai p={puluhanBanding(n)} s={satuanBanding(n)} kecil /> : null}
    </div>
  );
}

export default function SimulasiLabBanding({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabBanding) => void }) {
  const [l, setL] = useState(awalBanding);

  const lap = useMemo(() => laporanBanding(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const h = himpunanDari(l.himpunan);
  const alasan = alasanBanding(l.a, l.b);
  const teks = l.mode === "banding" ? kalimatBanding(l) : l.gagal ?? (urutSelesaiAktif(l) ? l.catatan : `Urutkan ${h.angka.join(", ")} dari yang paling ${l.arah === "kecil" ? "kecil" : "besar"}.`);
  const ubah = (s: SisiBanding, d: number) => setL((x) => ubahBanding(x, s, d));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Banding dan Urut</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Bandingkan dua bilangan, lalu urutkan beberapa bilangan. Lihat puluhannya dulu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih mode">
        <Pilihan aktif={l.mode === "banding"} onKlik={() => setL((x) => ubahModeBanding(x, "banding"))}>
          ⚖️ Banding
        </Pilihan>
        <Pilihan aktif={l.mode === "urut"} onKlik={() => setL((x) => ubahModeBanding(x, "urut"))}>
          📶 Urutkan
        </Pilihan>
      </div>

      {l.mode === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="grid gap-2 sm:grid-cols-2">
            <SisiKartu judul="Bilangan A" sisi="a" n={l.a} batang={l.batang} papan={l.papan} onUbah={ubah} />
            <SisiKartu judul="Bilangan B" sisi="b" n={l.b} batang={l.batang} papan={l.papan} onUbah={ubah} />
          </div>

          {l.tanda ? (
            <p className="igil-muncul text-center text-4xl font-black text-[#1C01A5]" aria-label={`${l.a} ${tandaBanding(l.a, l.b) === ">" ? "lebih besar dari" : tandaBanding(l.a, l.b) === "<" ? "lebih kecil dari" : "sama dengan"} ${l.b}`}>
              {l.a} <span className="rounded-lg bg-[#FFE566] px-2">{tandaBanding(l.a, l.b)}</span> {l.b}
            </p>
          ) : null}

          {l.aturan ? (
            <div className="space-y-1 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] p-2">
              <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Aturan: puluhan dulu</p>
              <div className="flex items-center justify-center gap-3 text-sm font-black text-[#1C01A5]">
                <span className={alasan.penentu === "puluhan" ? "rounded-lg bg-[#FFE566] px-2 py-0.5" : "px-2 py-0.5"}>
                  Puluhan: {puluhanBanding(l.a)} dan {puluhanBanding(l.b)}
                </span>
                <span className={alasan.penentu === "satuan" ? "rounded-lg bg-[#FFE566] px-2 py-0.5" : "px-2 py-0.5 opacity-60"}>
                  Satuan: {satuanBanding(l.a)} dan {satuanBanding(l.b)}
                </span>
              </div>
              <p className="text-center text-sm font-black text-[#1C01A5]">{alasan.kalimat}</p>
            </div>
          ) : null}
          <KalimatBesar teks={`${l.a === l.b ? `${l.a} sama dengan ${l.b}.` : alasan.hasil === "lebih" ? `${l.a} lebih besar dari ${l.b}.` : `${l.a} lebih kecil dari ${l.b}.`}`} />
          {l.catatan ? (
            <p role="status" className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              {l.catatan}
            </p>
          ) : null}
        </div>
      ) : (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih himpunan bilangan">
            <span className="text-xs font-black text-[#1C01A5]">Himpunan:</span>
            {HIMPUNAN_URUT.map((x) => (
              <Pilihan key={x.id} aktif={l.himpunan === x.id} onKlik={() => setL((s) => pilihHimpunan(s, x.id))}>
                {x.nama}
              </Pilihan>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih arah urutan">
            <span className="text-xs font-black text-[#1C01A5]">Urutan:</span>
            <Pilihan aktif={l.arah === "kecil"} onKlik={() => setL((s) => pilihArahUrut(s, "kecil"))}>
              Dari paling kecil
            </Pilihan>
            <Pilihan aktif={l.arah === "besar"} onKlik={() => setL((s) => pilihArahUrut(s, "besar"))}>
              Dari paling besar
            </Pilihan>
          </div>

          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ketuk bilangan, satu per satu</p>
          <div className="flex flex-wrap items-end justify-center gap-2" role="group" aria-label="Bilangan yang akan diurutkan">
            {h.angka.map((n) => {
              const dipakai = l.isi.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Bilangan ${n}${dipakai ? ", sudah ditaruh" : ""}`}
                  onClick={() => setL((s) => pilihUrut(s, n))}
                  className={`flex flex-col items-center gap-1 rounded-2xl border-4 px-3 py-1.5 text-2xl font-black text-[#1C01A5] ${
                    dipakai ? "border-[#1C01A5]/25 bg-[#F5F3FF] opacity-40" : "border-[#1C01A5] bg-[#FFE566] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5"
                  }`}
                >
                  {n}
                  {l.batang ? <ModelBilangan p={puluhanBanding(n)} s={satuanBanding(n)} skala={0.42} /> : null}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <p className="text-center text-xs font-black text-[#1C01A5]/70">{l.arah === "kecil" ? "paling kecil" : "paling besar"} → {l.arah === "kecil" ? "paling besar" : "paling kecil"}</p>
            <div className="flex items-center justify-center gap-1.5" role="group" aria-label="Urutanmu">
              {h.angka.map((_, i) => (
                <span
                  key={i}
                  className={`flex h-14 min-w-14 items-center justify-center rounded-2xl border-4 px-2 text-2xl font-black text-[#1C01A5] ${
                    l.isi[i] !== undefined ? (l.gagal !== null ? "border-[#E98989] bg-[#FDECEC]" : urutSelesaiAktif(l) ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#F0AB00] bg-[#FFF7CC]") : "border-dashed border-[#1C01A5]/40 bg-white"
                  }`}
                >
                  {l.isi[i] ?? ""}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" className={TOMBOL_BIASA} onClick={() => setL((s) => hapusTerakhirUrut(s))}>
              ⌫ Hapus terakhir
            </button>
            <button type="button" className={TOMBOL_BIASA} onClick={() => setL((s) => ulangUrut(s))}>
              🔁 Ulang urutan
            </button>
          </div>

          {l.gagal ? (
            <p role="status" className="igil-muncul rounded-xl border-4 border-[#E98989] bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              {l.gagal}
            </p>
          ) : urutSelesaiAktif(l) ? (
            <p role="status" className="igil-muncul rounded-xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
              ✅ {l.catatan}
            </p>
          ) : l.catatan ? (
            <p role="status" className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
              {l.catatan}
            </p>
          ) : null}
        </div>
      )}

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          {(["batang", "papan", "aturan", "tanda"] as TampilBanding[]).map((k) => (
            <Cek key={k} aktif={l[k]} onKlik={() => setL((s) => nyalakanBanding(s, k, !s[k]))}>
              {NAMA_TAMPIL[k]}
            </Cek>
          ))}
        </div>
        <p className="text-xs font-bold text-[#1C01A5]/70">Aturan dan Tanda bekerja di mode Banding. Batang juga tampil di bawah bilangan saat mengurutkan.</p>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetBanding())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, nyalakan aturan dan bandingkan lima puluh enam dengan enam puluh lima. Siapa yang menentukan? Dua, bandingkan lima puluh empat dengan lima puluh delapan. Apa yang sekarang menentukan? Tiga, bandingkan lima puluh sembilan dengan enam puluh satu. Satuan sembilan lebih besar dari satu, tetapi mana yang lebih besar? Empat, pindah ke urutkan dan susun lima puluh tujuh, tujuh puluh enam, delapan puluh tiga dari yang paling kecil."
          )
        }
        langkah={[
          "Nyalakan Aturan dan bandingkan 56 dengan 65. Siapa yang menentukan?",
          "Bandingkan 54 dengan 58. Sekarang apa yang menentukan?",
          "Bandingkan 59 dengan 61. Satuan 9 lebih besar dari 1, tetapi mana yang lebih besar?",
          "Pindah ke Urutkan dan susun 57, 76, 83 dari yang paling kecil.",
        ]}
      />
    </div>
  );
}
