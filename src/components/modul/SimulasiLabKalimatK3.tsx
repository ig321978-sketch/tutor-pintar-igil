"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { ejaK3 } from "./lab-tempat-k3b1";
import {
  MAKS_KAL,
  NAMA_MUNGKIN,
  awalKal,
  awalMungkin,
  baganKal,
  ceritaBalik,
  ceritaStatus,
  kalimatBalik,
  kalimatKal,
  kalimatMungkin,
  kalimatPeriksaKal,
  keadaanKal,
  keadaanMungkin,
  langkahKal,
  langkahMungkin,
  nilaiKiri,
  pasMungkin,
  statusKal,
  ucapKal,
  ucapMungkin,
  type BagianKal,
  type BagianMungkin,
  type KeadaanKal,
  type KeadaanMungkin,
  type LangkahKal,
  type ModeKal,
  type StatusKal,
} from "./lab-kalimat-k3b2";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B2): Lab Neraca Kalimat. Satu alat, dua tampilan.             */
/*  Neraca       : kalimat dengan satu kotak titik-titik. Neraca miring bila   */
/*                 kedua sisi belum sama nilainya. Bagan dan Kebalikan.        */
/*  Kemungkinan  : hanya jumlah (atau bilangan awal) yang diketahui, jadi      */
/*                 jawabannya banyak. Anak mencatat pasangan yang berbeda.     */
/* Logika: lab-kalimat-k3b2.ts. Warna: kiri biru, kanan emas, jawaban hijau.   */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const BIRU = "#1D4ED8";
const HIJAU = "#15803D";

const CATATAN: Record<ModeKal, string[]> = {
  A: [
    "Buat 8 + … = 19. Isi kotak sedikit demi sedikit. Kapan neraca seimbang?",
    "Pindahkan titik-titik ke depan: … + 16 = 54. Apakah caranya berubah?",
    "Tekan Tukar tempat pada penjumlahan seimbang. Mengapa neraca tetap seimbang?",
    "Di Papan Kemungkinan, buat jumlah 100. Berapa pasangan yang bisa kamu catat?",
  ],
  B: [
    "Buat 80 − … = 45, lalu pindahkan titik-titik ke depan. Mengapa caranya berbeda?",
    "Seimbangkan 80 − … = 45, lalu ganti ke Tambah. Satu bagan, dua kalimat.",
    "Tekan Tukar tempat pada pengurangan. Apa kata lab?",
    "Di Papan Kemungkinan, buat 100 telur. Berapa pasangan terjual dan sisa yang bisa kamu catat?",
  ],
};

const LANGKAH: LangkahKal[] = [-10, -1, 1, 10];

/** Pengatur bilangan: tombol −10, −1, +1, dan +10. */
function Atur({ nama, nilai, warna, onUbah, mati = false }: { nama: string; nilai: number; warna: string; onUbah: (d: LangkahKal) => void; mati?: boolean }) {
  return (
    <div className="flex items-center gap-1 rounded-2xl border-2 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: warna }}>
      <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">{nama}</span>
      {LANGKAH.map((d, i) => (
        <React.Fragment key={d}>
          {i === 2 ? (
            <span className="w-9 shrink-0 text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
              {nilai}
            </span>
          ) : null}
          <button
            type="button"
            disabled={mati}
            aria-label={`${d > 0 ? "Tambah" : "Kurangi"} ${Math.abs(d)} pada ${nama}`}
            onClick={() => onUbah(d)}
            className={`h-9 shrink-0 rounded-full border-4 border-[#1C01A5] px-1.5 text-sm font-black leading-none text-[#1C01A5] disabled:opacity-30 ${d > 0 ? "bg-[#FFE566]" : "bg-white"}`}
          >
            {d > 0 ? `+${d}` : `−${Math.abs(d)}`}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

const MIRING: Record<StatusKal, number> = { seimbang: 0, kurang: 9, lebih: -9, takbisa: 0 };

/** Neraca: palang miring ke sisi yang lebih berat. Isi piringan adalah nilai tiap sisi. */
function Neraca({ kiri, kanan, status }: { kiri: number | null; kanan: number; status: StatusKal }) {
  const sudut = MIRING[status];
  const warnaPalang = status === "seimbang" ? HIJAU : status === "takbisa" ? "#9CA3AF" : UNGU;
  const naik = Math.sin((sudut * Math.PI) / 180) * 64;
  return (
    <svg viewBox="0 0 240 150" className="mx-auto block h-40 w-full max-w-sm" role="img" aria-label={`Neraca. Sisi kiri ${kiri === null ? "belum bisa dihitung" : kiri}, sisi kanan ${kanan}. ${status === "seimbang" ? "Seimbang." : status === "kurang" ? "Sisi kiri kurang." : status === "lebih" ? "Sisi kiri kelebihan." : ""}`}>
      <polygon points="120,138 100,146 140,146" fill={UNGU} />
      <line x1="120" y1="40" x2="120" y2="138" stroke={UNGU} strokeWidth="5" strokeLinecap="round" />
      <g style={{ transform: `rotate(${sudut}deg)`, transformOrigin: "120px 40px", transition: "transform 0.4s" }}>
        <line x1="56" y1="40" x2="184" y2="40" stroke={warnaPalang} strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="120" cy="40" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
      {[
        { x: 56, y: 40 + naik, nilai: kiri === null ? "?" : String(kiri), warna: "#DBEAFE", garis: BIRU },
        { x: 184, y: 40 - naik, nilai: String(kanan), warna: "#FEF3C7", garis: "#B45309" },
      ].map((p) => (
        <g key={p.x} style={{ transition: "all 0.4s" }}>
          <line x1={p.x} y1={p.y} x2={p.x - 22} y2={p.y + 38} stroke={UNGU} strokeWidth="2" />
          <line x1={p.x} y1={p.y} x2={p.x + 22} y2={p.y + 38} stroke={UNGU} strokeWidth="2" />
          <rect x={p.x - 30} y={p.y + 38} width="60" height="30" rx="8" fill={p.warna} stroke={p.garis} strokeWidth="3" />
          <text x={p.x} y={p.y + 59} textAnchor="middle" fontSize="20" fontWeight="900" fill={UNGU}>
            {p.nilai}
          </text>
        </g>
      ))}
      <text x="120" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill={warnaPalang}>
        {status === "seimbang" ? "=" : status === "kurang" ? "<" : status === "lebih" ? ">" : "?"}
      </text>
    </svg>
  );
}

/** Bagan bagian dan keseluruhan. Kotak yang belum diketahui bertanda tanya sampai diisi. */
function Bagan({ x }: { x: Parameters<typeof baganKal>[0] & { isi: number } }) {
  const b = baganKal(x);
  const tampil = (nilai: number | null) => (nilai === null ? (x.isi > 0 ? String(x.isi) : "?") : String(nilai));
  const kotak = (nama: string, nilai: number | null, kunci: string) => (
    <div key={kunci} className={`flex-1 rounded-xl border-4 px-2 py-1 text-center ${nilai === null ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-[#EDE9FE]"}`}>
      <p className="text-[10px] font-black leading-tight text-[#1C01A5]/80">{nama}</p>
      <p className="text-2xl font-black text-[#1C01A5]">{tampil(nilai)}</p>
    </div>
  );
  return (
    <div className="space-y-1" aria-label="Bagan bagian dan keseluruhan">
      <div className="flex">{kotak(b.atas.nama, b.atas.nilai, "atas")}</div>
      <div className="flex gap-1">{b.bawah.map((k, i) => kotak(k.nama, k.nilai, `b${i}`))}</div>
    </div>
  );
}

export default function SimulasiLabKalimatK3({
  mode,
  speakGuru,
  onKeadaan,
}: {
  mode: ModeKal;
  speakGuru: (t: string) => void;
  onKeadaan?: (k: KeadaanKal | KeadaanMungkin) => void;
}) {
  const [x, kirim] = useReducer(langkahKal, mode, awalKal);
  const [m, kirimM] = useReducer(langkahMungkin, mode, awalMungkin);
  const [lihat, setLihat] = useState<"neraca" | "mungkin">("neraca");

  useEffect(() => {
    onKeadaan?.(lihat === "neraca" ? keadaanKal(x) : keadaanMungkin(m));
  }, [onKeadaan, lihat, x, m]);

  const status = statusKal(x);
  const kiri = nilaiKiri(x);
  const sebut = (t: string) => ejaK3(t.replace(/…/g, "titik-titik"));
  const ubah = (bagian: BagianKal) => (d: LangkahKal) => kirim({ t: "UBAH", bagian, d });
  const ubahM = (bagian: BagianMungkin) => (d: LangkahKal) => kirimM({ t: "UBAH", bagian, d });
  const nm = NAMA_MUNGKIN[mode];
  const gayaPesan = (pesan: string) => (pesan ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Neraca Kalimat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            Tanda sama dengan itu seperti neraca. Isi kotak titik-titik sampai kedua sisi sama nilainya.
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(sebut(lihat === "neraca" ? ucapKal(x) : ucapMungkin(m)))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "neraca"} onKlik={() => setLihat("neraca")}>
          ⚖️ Neraca
        </Pilihan>
        <Pilihan aktif={lihat === "mungkin"} onKlik={() => setLihat("mungkin")}>
          🔀 Papan Kemungkinan
        </Pilihan>
      </div>

      {lihat === "neraca" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <KalimatBesar teks={kalimatKal(x, x.isi > 0 || status === "seimbang" ? x.isi : "…")} warna={status === "seimbang" ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"} />
            <Neraca kiri={kiri} kanan={x.hasil} status={status} />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gayaPesan(x.pesan)}`}>
              {x.pesan ? `⛔ ${x.pesan}` : `🔧 ${ceritaStatus(x)}`}
            </p>
          </div>

          <div className={`${KARTU} space-y-2`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Atur kalimat</p>
            {mode === "B" ? (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih operasi">
                <Pilihan aktif={x.op === "kurang"} onKlik={() => kirim({ t: "OP", op: "kurang" })}>
                  − Kurang
                </Pilihan>
                <Pilihan aktif={x.op === "tambah"} onKlik={() => kirim({ t: "OP", op: "tambah" })}>
                  + Tambah
                </Pilihan>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Letak titik-titik">
              <Pilihan aktif={x.letak === "tengah"} onKlik={() => kirim({ t: "LETAK", letak: "tengah" })}>
                Titik-titik di tengah
              </Pilihan>
              <Pilihan aktif={x.letak === "depan"} onKlik={() => kirim({ t: "LETAK", letak: "depan" })}>
                Titik-titik di depan
              </Pilihan>
            </div>
            <Atur nama={x.op === "kurang" && x.letak === "tengah" ? "Bilangan awal" : "Bilangan yang diketahui"} nilai={x.tahu} warna="#BFDBFE" onUbah={ubah("tahu")} />
            <Atur nama={x.op === "kurang" ? "Sisa (kanan)" : "Jumlah (kanan)"} nilai={x.hasil} warna="#FEF3C7" onUbah={ubah("hasil")} />
            <Atur nama="Isi kotak titik-titik" nilai={x.isi} warna="#BBF7D0" onUbah={ubah("isi")} />
            <p className="text-xs font-bold text-[#1C01A5]/70">Bilangan paling besar {MAKS_KAL}. Hasil pengurangan tidak di bawah nol.</p>
          </div>

          <div className={`${KARTU} space-y-3`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
              <Cek aktif={x.tampil.bagan} onKlik={() => kirim({ t: "TOGGLE", rep: "bagan" })}>
                Bagan
              </Cek>
              <Cek aktif={x.tampil.kebalikan} onKlik={() => kirim({ t: "TOGGLE", rep: "kebalikan" })}>
                Kebalikan
              </Cek>
            </div>
            {x.tampil.bagan ? <Bagan x={x} /> : null}
            {x.tampil.kebalikan ? (
              <div className="space-y-1" aria-label="Operasi kebalikan">
                <p className="text-center text-xs font-bold text-[#1C01A5]/80">{ceritaBalik(x)}</p>
                <KalimatBesar teks={kalimatBalik(x)} warna="bg-[#E8F7EE]" />
              </div>
            ) : null}
            {x.periksa ? (
              <div className="space-y-1" aria-label="Hasil periksa">
                <KalimatBesar teks={kalimatPeriksaKal(x)} warna="bg-[#E8F7EE]" />
                <p className="text-center text-xs font-bold text-[#15803D]">✔ Sisi kiri sama nilainya dengan sisi kanan, yaitu {x.hasil}.</p>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "PERIKSA" })}>
                ✅ Periksa
              </button>
              <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TUKAR" })}>
                🔃 Tukar tempat
              </button>
              <button
                type="button"
                className={TOMBOL_BIASA}
                onClick={() => {
                  kirim({ t: "RESET" });
                  kirimM({ t: "RESET" });
                  setLihat("neraca");
                }}
              >
                🔁 Reset Semua
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${KARTU} space-y-3`}>
            <p className="text-center text-sm font-bold text-[#1C01A5]">
              {mode === "A"
                ? "Hanya jumlahnya yang diketahui. Cari pasangan bilangan yang jumlahnya tepat sama."
                : "Hanya bilangan awalnya yang diketahui. Cari pasangan terjual dan sisa yang jumlahnya tepat sama dengan bilangan awal."}
            </p>
            <Atur nama={nm.total} nilai={m.total} warna="#FEF3C7" onUbah={ubahM("total")} />
            <Atur nama={nm.a} nilai={m.a} warna="#BFDBFE" onUbah={ubahM("a")} />
            <Atur nama={nm.b} nilai={m.b} warna="#BBF7D0" onUbah={ubahM("b")} />
            <KalimatBesar teks={pasMungkin(m) ? kalimatMungkin(mode, m.total, [m.a, m.b]) : `${m.a} + ${m.b} = ${m.a + m.b}`} warna={pasMungkin(m) ? "bg-[#E8F7EE]" : "bg-[#FFF7CC]"} />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gayaPesan(m.pesan)}`}>
              {m.pesan ? `⛔ ${m.pesan}` : pasMungkin(m) ? "🔧 Cocok! Tekan Catat pasangan." : `🔧 Jumlah kedua bagian harus tepat ${m.total}.`}
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={TOMBOL_UTAMA} onClick={() => kirimM({ t: "CATAT" })}>
                📝 Catat pasangan
              </button>
              <button type="button" className={TOMBOL_BIASA} onClick={() => kirimM({ t: "RESET" })}>
                🔁 Kosongkan
              </button>
            </div>
          </div>
          <div className={`${KARTU} space-y-2`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Catatan untuk {m.total}: {m.catat.length} pasangan</p>
            {m.catat.length === 0 ? (
              <p className="text-sm font-bold text-[#1C01A5]/50">Belum ada pasangan dicatat.</p>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {m.catat.map(([p, q]) => (
                  <li key={`${p}-${q}`} className="rounded-full bg-[#E8F7EE] px-2.5 py-0.5 text-sm font-black text-[#14532D]">
                    {kalimatMungkin(mode, m.total, [p, q])}
                  </li>
                ))}
              </ul>
            )}
            {m.catat.length >= 2 ? <p className="text-xs font-bold text-[#15803D]">Jawabannya banyak, bukan hanya satu. Semuanya benar bila jumlahnya tepat {m.total}.</p> : null}
          </div>
        </>
      )}

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN[mode].map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${sebut(c)}`).join(" ")}`)} langkah={CATATAN[mode]} />
    </div>
  );
}
