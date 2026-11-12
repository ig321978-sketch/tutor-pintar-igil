"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import GambarTurusK3B5 from "./turus-k3b5";
import { ejaK3B5 } from "./eja-k3b5";
import {
  ACUAN_MAKS,
  ACUAN_MIN,
  DAFTAR_TABEL,
  MAKS_TURUS_K3B5,
  TABEL_K3B5,
  awalTabelK3B5,
  bacaTabel,
  barisTabel,
  frekuensiTabel,
  kalimatKelompok,
  keadaanTabelK3B5,
  langkahTabelK3B5,
  semuaDiketuk,
  tabelLengkap,
  turusBaris,
  ucapBacaK3B5,
  ucapIsiK3B5,
  ucapTurusK3B5,
  type IdTabel,
  type KeadaanTabelK3B5,
  type TanyaBaca,
} from "./lab-tabel-k3b5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B5 Sub-Bab B): Lab Tabel. Satu alat, tiga tampilan.              */
/*  Turus     : garis kelima dicoret miring; kelompok lima dihitung.             */
/*  Isi Tabel : tiap manik, huruf, atau nilai menjadi turus; kolom banyak diisi. */
/*  Baca      : terbanyak, tersedikit, lebih dari, kurang dari (dihitung).       */
/* Logika: lab-tabel-k3b5.ts. Gambar hanya titik warna, huruf, garis, angka.     */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Turus, tambah garis sampai 13. Apa yang terjadi pada garis kelima dan kesepuluh?",
  "Isi tabel manik. Coba isi kolom banyak berbeda dari turusnya. Apa kata lab?",
  "Lengkapi tabel STATISTIKA, lalu cari huruf terbanyak dan tersedikit.",
  "Pada tabel nilai, bandingkan lebih dari 7 dan kurang dari 7. Mengapa nilai 7 tidak ikut?",
];
type Tampilan = "turus" | "isi" | "baca";
const WARNA_MANIK: Record<string, string> = { Merah: "#EF4444", Biru: "#3B82F6", Hitam: "#111827" };
const NAMA_TANYA: Record<TanyaBaca, string> = { terbanyak: "Terbanyak", tersedikit: "Tersedikit", lebih: "Lebih dari", kurang: "Kurang dari" };
const NAMA_PILIH: Record<IdTabel, string> = { manik: "🔴 Manik", statistika: "🔤 STATISTIKA", matematika: "🔤 MATEMATIKA", nilai: "📋 Nilai ulangan" };

function Benda({ id, v }: { id: IdTabel; v: string }) {
  if (id === "manik") return <span className="inline-block h-6 w-6 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_MANIK[v] }} aria-hidden="true" />;
  return <span aria-hidden="true">{v}</span>;
}

export default function SimulasiLabTabelK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTabelK3B5) => void }) {
  const [x, kirim] = useReducer(langkahTabelK3B5, undefined, awalTabelK3B5);
  const [lihat, setLihat] = useState<Tampilan>("turus");

  useEffect(() => {
    onKeadaan?.(keadaanTabelK3B5(x));
  }, [onKeadaan, x]);

  const t = TABEL_K3B5[x.tabel];
  const baris = barisTabel(x.tabel);
  const tb = turusBaris(x);
  const f = frekuensiTabel(x.tabel);
  const lengkap = tabelLengkap(x);
  const hasil = lengkap && x.tanya ? bacaTabel(x.tabel, x.tanya, x.acuan) : null;
  const ucap = lihat === "turus" ? ucapTurusK3B5(x) : lihat === "isi" ? ucapIsiK3B5(x) : ucapBacaK3B5(x);
  const labelKat = (k: string) => (t.angka ? `Nilai ${k}` : x.tabel === "manik" ? `Manik ${k.toLowerCase()}` : `Huruf ${k}`);

  const pilihTabel = (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih data tabel">
      {DAFTAR_TABEL.map((id) => (
        <Pilihan key={id} aktif={x.tabel === id} onKlik={() => kirim({ t: "TABEL", id })}>
          {NAMA_PILIH[id]}
        </Pilihan>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Tabel</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Tulis turus kelompok lima, sajikan data dalam tabel tiga kolom, lalu baca tabelnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B5(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "turus"} onKlik={() => setLihat("turus")}>
          ✋ Turus
        </Pilihan>
        <Pilihan aktif={lihat === "isi"} onKlik={() => setLihat("isi")}>
          📋 Isi Tabel
        </Pilihan>
        <Pilihan aktif={lihat === "baca"} onKlik={() => setLihat("baca")}>
          👀 Baca
        </Pilihan>
      </div>

      {lihat === "turus" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex min-h-[64px] items-center justify-center rounded-xl bg-[#F5F3FF] p-2">
            <GambarTurusK3B5 n={x.turus} tinggi={52} label={`turus ${x.turus}`} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" aria-label="Hapus satu garis turus" onClick={() => kirim({ t: "TURUS", d: -1 })} className="h-10 rounded-full border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5]">
              − 1 garis
            </button>
            <span className="text-3xl font-black text-[#1C01A5]" aria-live="polite">
              {x.turus}
            </span>
            <button type="button" aria-label="Tambah satu garis turus" onClick={() => kirim({ t: "TURUS", d: 1 })} className="h-10 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-sm font-black text-[#1C01A5]">
              + 1 garis
            </button>
          </div>
          <p className="text-xs font-bold text-[#1C01A5]/70">Garis kelima selalu dicoret miring di atas empat garis tegak. Paling banyak {MAKS_TURUS_K3B5} garis.</p>
        </div>
      ) : null}
      {lihat === "turus" ? <KalimatBesar teks={kalimatKelompok(x.turus)} warna="bg-[#FFF7CC]" /> : null}

      {lihat === "isi" ? (
        <div className={`${KARTU} space-y-3`}>
          {pilihTabel}
          <p className="text-sm font-bold text-[#1C01A5]">Ketuk tiap {t.satuan} satu per satu. Lalu isi kolom banyak sama dengan turusnya.</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label={`Data ${t.nama}`}>
            {t.item.map((v, k) => (
              <button
                key={k}
                type="button"
                aria-label={`${t.satuan} ${k + 1}: ${v}`}
                aria-pressed={x.ketuk[k]}
                onClick={() => kirim({ t: "KETUK", k })}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border-2 text-base font-black ${x.ketuk[k] ? "border-[#1C01A5]/20 bg-[#F5F3FF] text-[#1C01A5]/30 opacity-40" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
              >
                <Benda id={x.tabel} v={v} />
              </button>
            ))}
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="border-2 border-[#1C01A5] px-2 py-1 text-left">{t.kepala}</th>
                <th className="border-2 border-[#1C01A5] px-2 py-1 text-left">Turus</th>
                <th className="border-2 border-[#1C01A5] px-2 py-1">Banyak</th>
              </tr>
            </thead>
            <tbody>
              {baris.map((k, r) => {
                const cocok = x.isi[r] === tb[r];
                return (
                  <tr key={k} className={cocok && tb[r] === f[r] ? "bg-[#E8F7EE]" : "bg-white"}>
                    <td className="border-2 border-[#1C01A5] px-2 py-1 font-black text-[#1C01A5]">
                      <span className="inline-flex items-center gap-1.5">
                        <Benda id={x.tabel} v={k} />
                        {x.tabel === "manik" ? k : null}
                      </span>
                    </td>
                    <td className="border-2 border-[#1C01A5] px-2 py-1">
                      <GambarTurusK3B5 n={tb[r]} tinggi={22} label={`${labelKat(k)}: ${tb[r]} garis turus`} />
                    </td>
                    <td className="border-2 border-[#1C01A5] px-1 py-1">
                      <span className="flex items-center justify-center gap-1">
                        <button type="button" aria-label={`Kurangi banyak ${labelKat(k)}`} onClick={() => kirim({ t: "ISI", r, d: -1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                          −
                        </button>
                        <span className="w-6 text-center text-lg font-black text-[#1C01A5]">{x.isi[r]}</span>
                        <button type="button" aria-label={`Tambah banyak ${labelKat(k)}`} onClick={() => kirim({ t: "ISI", r, d: 1 })} className="h-7 w-7 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                          +
                        </button>
                        <span aria-hidden="true">{cocok ? "✓" : "✗"}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-xs font-bold text-[#1C01A5]/70">✓ angka sama dengan turusnya. ✗ angka belum sama dengan turusnya.</p>
        </div>
      ) : null}
      {lihat === "isi" ? (
        <KalimatBesar
          teks={lengkap ? `Tabel ${t.nama} lengkap dan benar!` : semuaDiketuk(x) ? "Semua sudah menjadi turus. Isi kolom banyak." : `Sudah ${x.ketuk.filter(Boolean).length} dari ${t.item.length} dicacah.`}
          warna={lengkap ? "bg-[#E8F7EE]" : "bg-[#F5F3FF]"}
        />
      ) : null}

      {lihat === "baca" ? (
        <div className={`${KARTU} space-y-3`}>
          {pilihTabel}
          {lengkap ? (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#1C01A5] text-[#FFE566]">
                    <th className="border-2 border-[#1C01A5] px-2 py-1 text-left">{t.kepala}</th>
                    <th className="border-2 border-[#1C01A5] px-2 py-1 text-left">Turus</th>
                    <th className="border-2 border-[#1C01A5] px-2 py-1">Banyak</th>
                  </tr>
                </thead>
                <tbody>
                  {baris.map((k, r) => (
                    <tr key={k} className={hasil?.baris.includes(r) ? "bg-[#FFE566]" : "bg-white"}>
                      <td className="border-2 border-[#1C01A5] px-2 py-1 font-black text-[#1C01A5]">
                        <span className="inline-flex items-center gap-1.5">
                          <Benda id={x.tabel} v={k} />
                          {x.tabel === "manik" ? k : null}
                        </span>
                      </td>
                      <td className="border-2 border-[#1C01A5] px-2 py-1">
                        <GambarTurusK3B5 n={f[r]} tinggi={22} />
                      </td>
                      <td className="border-2 border-[#1C01A5] px-2 py-1 text-center text-lg font-black text-[#1C01A5]">{f[r]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Pertanyaan">
                {(Object.keys(NAMA_TANYA) as TanyaBaca[]).map((q) => (
                  <Pilihan key={q} aktif={x.tanya === q} onKlik={() => kirim({ t: "TANYA", tanya: q })}>
                    {NAMA_TANYA[q]}
                  </Pilihan>
                ))}
              </div>
              {t.angka && (x.tanya === "lebih" || x.tanya === "kurang") ? (
                <div className="flex items-center justify-center gap-3" role="group" aria-label="Nilai acuan">
                  <button type="button" aria-label="Kurangi nilai acuan" onClick={() => kirim({ t: "ACUAN", d: -1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white font-black text-[#1C01A5]">
                    −
                  </button>
                  <span className="text-lg font-black text-[#1C01A5]">
                    {NAMA_TANYA[x.tanya]} {x.acuan}
                  </span>
                  <button type="button" aria-label="Tambah nilai acuan" onClick={() => kirim({ t: "ACUAN", d: 1 })} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] font-black text-[#1C01A5]">
                    +
                  </button>
                  <span className="text-xs font-bold text-[#1C01A5]/70">
                    ({ACUAN_MIN} sampai {ACUAN_MAKS})
                  </span>
                </div>
              ) : null}
            </>
          ) : (
            <p className="rounded-xl bg-[#F5F3FF] p-2 text-sm font-black text-[#1C01A5]">Tabel {t.nama} belum lengkap. Lengkapi dulu di Isi Tabel: semua turus dan semua angka banyak.</p>
          )}
        </div>
      ) : null}
      {lihat === "baca" && hasil ? <KalimatBesar teks={hasil.kalimat} warna="bg-[#E8F7EE]" /> : null}

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
          setLihat("turus");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B5(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
