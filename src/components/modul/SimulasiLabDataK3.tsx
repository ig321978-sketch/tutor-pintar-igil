"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Cek, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import GambarTurusK3B5 from "./turus-k3b5";
import { ejaK3B5 } from "./eja-k3b5";
import {
  CACAH_K3B5,
  DAFTAR_CACAH,
  MAKS_BENDA,
  awalDataK3B5,
  cacahLengkap,
  dataCacah,
  kalimatBanding,
  kalimatCacahLengkap,
  kalimatJangkauan,
  kalimatUjung,
  keadaanDataK3B5,
  langkahDataK3B5,
  namaAnakK3B5,
  ringkasCacah,
  terbesarK3B5,
  terkecilK3B5,
  ucapBanding,
  ucapCacah,
  ucapKumpul,
  urutanIndeks,
  type KeadaanDataK3B5,
} from "./lab-data-k3b5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B5 Sub-Bab A): Lab Data Kelompok. Satu alat, tiga tampilan.     */
/*  Kumpul     : banyak benda lima anak; urutkan, terkecil, terbesar, jangkauan. */
/*  Bandingkan : ketuk dua anak; selisihnya dihitung.                            */
/*  Cacah      : kartu nilai ulangan menjadi garis turus pada nilainya.          */
/* Logika: lab-data-k3b5.ts. Gambar hanya titik, garis turus, dan angka.         */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Ubah banyak benda Galih, lalu urutkan dari terkecil. Siapa yang pindah tempat?",
  "Nyalakan Terkecil dan Terbesar sebelum mengurutkan. Apakah anak pertama selalu yang terkecil?",
  "Atur data sampai jangkauannya 5. Coba juga buat semua anak sama banyak.",
  "Di Cacah, ketuk semua kartu nilai ulangan. Nilai mana yang paling sering muncul?",
];
type Tampilan = "kumpul" | "banding" | "cacah";

function Titik({ n, warna = "#1C01A5", sorot = 0 }: { n: number; warna?: string; sorot?: number }) {
  return (
    <span className="flex flex-wrap gap-1" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="inline-block h-3.5 w-3.5 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: i >= n - sorot ? "#FFE566" : warna }} />
      ))}
    </span>
  );
}

export default function SimulasiLabDataK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDataK3B5) => void }) {
  const [x, kirim] = useReducer(langkahDataK3B5, undefined, awalDataK3B5);
  const [lihat, setLihat] = useState<Tampilan>("kumpul");

  useEffect(() => {
    onKeadaan?.(keadaanDataK3B5(x));
  }, [onKeadaan, x]);

  const kecil = terkecilK3B5(x.anak);
  const besar = terbesarK3B5(x.anak);
  const urutan = x.tampil.urut === "asal" ? x.anak.map((_, i) => i) : urutanIndeks(x.anak, x.tampil.urut);
  const ucap = lihat === "kumpul" ? ucapKumpul(x) : lihat === "banding" ? ucapBanding(x) : ucapCacah(x);
  const ujung = kalimatUjung(x.anak);
  const banding = kalimatBanding(x);
  const dc = dataCacah(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Data Kelompok</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Lima anak membawa benda. Urutkan, cari terkecil dan terbesar, hitung jangkauan, dan cacah nilai.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "kumpul"} onKlik={() => setLihat("kumpul")}>
          📶 Kumpul
        </Pilihan>
        <Pilihan aktif={lihat === "banding"} onKlik={() => setLihat("banding")}>
          ⚖️ Bandingkan
        </Pilihan>
        <Pilihan aktif={lihat === "cacah"} onKlik={() => setLihat("cacah")}>
          ✏️ Cacah
        </Pilihan>
      </div>

      {lihat === "kumpul" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Urutan data">
            <Pilihan aktif={x.tampil.urut === "asal"} onKlik={() => kirim({ t: "URUT", arah: "asal" })}>
              Urutan duduk
            </Pilihan>
            <Pilihan aktif={x.tampil.urut === "kecil"} onKlik={() => kirim({ t: "URUT", arah: "kecil" })}>
              Dari terkecil
            </Pilihan>
            <Pilihan aktif={x.tampil.urut === "besar"} onKlik={() => kirim({ t: "URUT", arah: "besar" })}>
              Dari terbesar
            </Pilihan>
          </div>
          <ul className="space-y-1.5" aria-label="Banyak benda tiap anak">
            {urutan.map((i, ke) => {
              const n = x.anak[i];
              const tanda = x.tampil.ujung ? (n === kecil ? "terkecil" : n === besar ? "terbesar" : "") : "";
              return (
                <li
                  key={namaAnakK3B5(i)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-2 py-1 ${tanda === "terkecil" ? "border-sky-600 bg-sky-50" : tanda === "terbesar" ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5]/20 bg-white"}`}
                >
                  <span className="w-5 text-xs font-black text-[#1C01A5]/50">{ke + 1}.</span>
                  <span className="w-14 shrink-0 text-sm font-black text-[#1C01A5]">{namaAnakK3B5(i)}</span>
                  <span className="min-w-0 flex-1">
                    <Titik n={n} />
                  </span>
                  {tanda ? <span className="text-[10px] font-black uppercase text-[#1C01A5]">{tanda}</span> : null}
                  <button type="button" aria-label={`Kurangi 1 benda ${namaAnakK3B5(i)}`} onClick={() => kirim({ t: "UBAH", i, d: -1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-lg font-black leading-none text-[#1C01A5]">
                    −
                  </button>
                  <span className="w-6 shrink-0 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
                    {n}
                  </span>
                  <button type="button" aria-label={`Tambah 1 benda ${namaAnakK3B5(i)}`} onClick={() => kirim({ t: "UBAH", i, d: 1 })} className="h-8 w-8 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-lg font-black leading-none text-[#1C01A5]">
                    +
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-center text-sm font-black text-[#1C01A5]">Data: {urutan.map((i) => x.anak[i]).join(", ")}</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tampilan data">
            <Cek aktif={x.tampil.ujung} onKlik={() => kirim({ t: "TOGGLE", rep: "ujung" })}>
              Terkecil dan Terbesar
            </Cek>
            <Cek aktif={x.tampil.jangkauan} onKlik={() => kirim({ t: "TOGGLE", rep: "jangkauan" })}>
              Jangkauan
            </Cek>
          </div>
          <p className="text-xs font-bold text-[#1C01A5]/70">Banyak benda tiap anak 1 sampai {MAKS_BENDA}.</p>
        </div>
      ) : null}
      {lihat === "kumpul" && x.tampil.ujung ? (
        <>
          <KalimatBesar teks={ujung.terkecil} warna="bg-sky-50" />
          <KalimatBesar teks={ujung.terbesar} warna="bg-[#FFF7CC]" />
        </>
      ) : null}
      {lihat === "kumpul" && x.tampil.jangkauan ? <KalimatBesar teks={kalimatJangkauan(x.anak)} warna="bg-[#E8F7EE]" /> : null}

      {lihat === "banding" ? (
        <div className={`${KARTU} space-y-3`}>
          <p className="text-sm font-bold text-[#1C01A5]">Ketuk dua anak untuk membandingkan. Titik kuning adalah kelebihannya.</p>
          <div className="grid gap-1.5" role="group" aria-label="Pilih dua anak">
            {x.anak.map((n, i) => {
              const dipilih = x.pilih.includes(i);
              const lain = x.pilih.length === 2 && dipilih ? x.anak[x.pilih[0] === i ? x.pilih[1] : x.pilih[0]] : n;
              return (
                <button
                  key={namaAnakK3B5(i)}
                  type="button"
                  aria-pressed={dipilih}
                  aria-label={`${namaAnakK3B5(i)}, ${n} benda`}
                  onClick={() => kirim({ t: "PILIH", i })}
                  className={`flex items-center gap-2 rounded-xl border-2 px-2 py-1.5 text-left ${dipilih ? "border-indigo-950 bg-[#EDE9FE]" : "border-[#1C01A5]/25 bg-white"}`}
                >
                  <span className="w-14 shrink-0 text-sm font-black text-[#1C01A5]">{namaAnakK3B5(i)}</span>
                  <span className="min-w-0 flex-1">
                    <Titik n={n} sorot={dipilih && x.pilih.length === 2 ? Math.max(0, n - lain) : 0} />
                  </span>
                  <span className="w-6 text-center text-lg font-black text-[#1C01A5]">{n}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs font-bold text-[#1C01A5]/70">Ubah banyak benda di tampilan Kumpul.</p>
        </div>
      ) : null}
      {lihat === "banding" ? <KalimatBesar teks={banding ?? "Pilih dua anak dulu."} warna={banding ? "bg-[#E8F7EE]" : "bg-[#F5F3FF]"} /> : null}

      {lihat === "cacah" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data">
            {DAFTAR_CACAH.map((id) => (
              <Pilihan key={id} aktif={x.cacah === id} onKlik={() => kirim({ t: "CACAH", id })}>
                {CACAH_K3B5[id].nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-sm font-bold text-[#1C01A5]">Ketuk tiap kartu. Kartu itu menjadi satu garis turus pada nilainya.</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Kartu nilai">
            {dc.map((v, k) => (
              <button
                key={k}
                type="button"
                aria-label={`Kartu ${k + 1}, nilai ${v}`}
                aria-pressed={x.ketuk[k]}
                onClick={() => kirim({ t: "KARTU", k })}
                className={`h-10 w-10 rounded-lg border-2 text-base font-black ${x.ketuk[k] ? "border-[#1C01A5]/20 bg-[#F5F3FF] text-[#1C01A5]/30" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
              >
                {v}
              </button>
            ))}
          </div>
          <ul className="space-y-1" aria-label="Turus tiap nilai">
            {ringkasCacah(x).map((b) => (
              <li key={b.nilai} className="flex items-center gap-3 rounded-xl border-2 border-[#1C01A5]/20 px-2 py-1">
                <span className="w-16 shrink-0 text-sm font-black text-[#1C01A5]">Nilai {b.nilai}</span>
                <span className="min-w-0 flex-1">
                  <GambarTurusK3B5 n={b.banyak} label={`nilai ${b.nilai}: ${b.banyak} garis turus`} />
                </span>
                <span className="text-sm font-black text-[#1C01A5]">{b.banyak} kali</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-[#1C01A5]">
              Sudah {x.ketuk.filter(Boolean).length} dari {dc.length} kartu
            </span>
            <button type="button" onClick={() => kirim({ t: "ULANG_CACAH" })} className={TOMBOL_BIASA}>
              ↺ Cacah lagi
            </button>
          </div>
        </div>
      ) : null}
      {lihat === "cacah" && cacahLengkap(x) ? <KalimatBesar teks={kalimatCacahLengkap(dc)} warna="bg-[#E8F7EE]" /> : null}

      {x.pesan ? (
        <p role="status" className="rounded-2xl border-4 border-[#E98989] bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
          ⛔ {x.pesan}
        </p>
      ) : null}

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("kumpul");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
