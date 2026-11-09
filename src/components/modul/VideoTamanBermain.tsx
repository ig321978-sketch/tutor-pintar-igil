"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { hentikanSuaraGuruModul, ucapkanGuruModul } from "@/lib/suara-guru-modul";
import { IkonMainan } from "./ikon-mainan";

/* ------------------------------------------------------------------------ */
/* Video animasi "Di Taman Bermain" untuk Tahap 1: Story, Matematika Kelas 1   */
/* Bab 1 (Membilang sampai 10), Sub-Bab A. Menggantikan slide cerita lama.     */
/*                                                                            */
/* Sumber: animasi HTML/SVG gratis di-taman-bermain.html, dipindahkan menjadi  */
/* komponen React. Semua berjalan di perangkat siswa: tanpa video berbayar,    */
/* tanpa panggilan API, tanpa berkas audio. Suara memakai Web Speech API       */
/* perangkat (id-ID) dengan guru pilihan siswa. Naskah: naskah/mtk-1-bab1-     */
/* video-taman-bermain.md                                                      */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const EMAS = "#F0AB00";

const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"];

/** Nama, warna baju, warna rambut, warna kulit. */
const ANAK: [string, string, string, string][] = [
  ["Malosi", "#e8590c", "#2b1b12", "#f2b27c"],
  ["Upe", "#1c7ed6", "#1a1a1a", "#e9a66b"],
  ["Kira", "#d6336c", "#4a2511", "#f5c19a"],
  ["Wei", "#2f9e44", "#111111", "#f6d3a8"],
  ["Halim", "#7048e8", "#3a1d0f", "#d9915b"],
  ["Tika", "#f59f00", "#222222", "#f3bb90"],
];

const POSISI_ANAK = [6, 22, 38, 54, 70, 86];
const JUMLAH_BAGIAN = 7;

type JenisBenda = "kursi" | "layangan" | "sepeda" | "bola" | "burung" | "keranjang";
type ItemTray = { jenis: JenisBenda; no: string; on: boolean };
type Tray = { ten: boolean; besar: boolean; items: ItemTray[]; lbl: { teks: string; on: boolean } | null; tampil: boolean };

const TRAY_KOSONG: Tray = { ten: false, besar: false, items: [], lbl: null, tampil: true };

const BATAL = Symbol("batal");

/** Gambar benda. Kursi, layang-layang, sepeda, dan bola memakai ikon mainan IGIL; burung dan keranjang digambar di sini. */
function Benda({ jenis }: { jenis: JenisBenda }) {
  if (jenis === "burung") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 24 L2 17 L4 30 Z" fill="#74C0FC" stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="22" cy="28" rx="15" ry="10.5" fill="#4DABF7" stroke={BIRU} strokeWidth="2.4" />
        <circle cx="35" cy="19" r="7.5" fill="#4DABF7" stroke={BIRU} strokeWidth="2.4" />
        <path d="M41.5 18 L47 20.4 L41.5 23 Z" fill={EMAS} stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="36.5" cy="17.4" r="1.6" fill={BIRU} />
        <path d="M13 27 Q22 18 29 29 Q21 34 13 27 Z" fill="#A5D8FF" stroke={BIRU} strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 38 V44 M26 38 V44" stroke={BIRU} strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  if (jenis === "keranjang") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 21 Q24 3 36 21" fill="none" stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" />
        <path d="M7 21 H41 L37 44 H11 Z" fill="#E8B26A" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M9 29 H39 M10 36.5 H38 M19 21 L17 44 M29 21 L31 44" fill="none" stroke={BIRU} strokeWidth="1.5" strokeLinecap="round" opacity="0.65" />
      </svg>
    );
  }
  return <IkonMainan jenis={jenis} kelas="block h-full w-full" />;
}

function Anak({ nama, baju, rambut, kulit }: { nama: string; baju: string; rambut: string; kulit: string }) {
  return (
    <>
      <svg viewBox="0 0 40 64" aria-hidden="true">
        <rect x="9" y="26" width="22" height="22" rx="8" fill={baju} />
        <rect x="12" y="46" width="6" height="14" rx="3" fill="#35305a" />
        <rect x="22" y="46" width="6" height="14" rx="3" fill="#35305a" />
        <circle cx="20" cy="15" r="11" fill={kulit} />
        <path d="M9 14a11 11 0 0 1 22 0c-5-5-17-5-22 0z" fill={rambut} />
        <circle cx="16" cy="16" r="1.4" fill="#222" />
        <circle cx="24" cy="16" r="1.4" fill="#222" />
        <path d="M16 21q4 3 8 0" stroke="#7a2d1b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      {nama}
    </>
  );
}

const CSS = `
.vtb-stage{position:relative;width:100%;aspect-ratio:16/9;border-radius:18px;overflow:hidden;container-type:inline-size;background:#8fd3ff}
.vtb-bg{position:absolute;inset:0;width:100%;height:100%}
.vtb-awan{animation:vtb-hanyut 40s linear infinite}
.vtb-awan.b{animation-duration:55s;animation-delay:-20s}
@keyframes vtb-hanyut{from{transform:translateX(-30px)}to{transform:translateX(190px)}}
.vtb-anak{position:absolute;bottom:7%;width:max(8.5cqw,34px);text-align:center;font-size:max(1.5cqw,8.5px);font-weight:800;line-height:1.1;color:#2d2a4a}
.vtb-anak svg{width:100%;display:block}
.vtb-anak.lompat{animation:vtb-lompat .7s ease-in-out infinite}
@keyframes vtb-lompat{50%{transform:translateY(-3cqw)}}
.vtb-tray{position:absolute;left:50%;top:9%;transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:1.2cqw 2cqw;width:80%;min-height:30%;transition:opacity .35s}
.vtb-it{display:flex;flex-direction:column;align-items:center;width:max(8cqw,32px);opacity:0;transform:scale(.3);transition:.4s cubic-bezier(.3,1.6,.5,1)}
.vtb-it.on{opacity:1;transform:none}
.vtb-it .gbr{width:100%;aspect-ratio:1/1}
.vtb-it b{font-size:max(3.2cqw,10px);background:#fff;color:#1C01A5;border:2px solid #1C01A5;border-radius:2cqw;padding:0 max(.8cqw,2px);margin-top:.4cqw;min-width:max(4.6cqw,16px);text-align:center;line-height:1.35}
.vtb-tray.ten{width:94%;column-gap:1cqw}
.vtb-tray.ten .vtb-it{width:max(5.6cqw,24px)}
.vtb-tray.besar .vtb-it{width:max(14cqw,56px)}
.vtb-lbl{width:100%;text-align:center;font-size:max(3.6cqw,12px);font-weight:800;color:#1C01A5;background:#fffbe9ee;border-radius:3cqw;padding:.3cqw 2cqw;opacity:0;transition:.4s}
.vtb-lbl.on{opacity:1}
.vtb-judul{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:1.5cqw;background:#ffe9a8e6;color:#1C01A5;font-size:max(2.8cqw,12px);font-weight:700;padding:0 4cqw;transition:opacity .6s}
.vtb-judul h2{margin:0;font-size:max(8cqw,24px);font-weight:900;line-height:1.1}
.vtb-judul.off{opacity:0;pointer-events:none}
@media (prefers-reduced-motion:reduce){.vtb-awan,.vtb-anak.lompat{animation:none}}
`;

const TOMBOL =
  "rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-4 py-2 text-xs font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)] md:text-sm";

/**
 * Video cerita "Di Taman Bermain": Malosi dan teman-teman menghitung kursi, layang-layang, sepeda dan burung,
 * bola, dan keranjang kosong. Berhitung dari nol sampai sepuluh.
 */
export function VideoTamanBermain() {
  const jalanRef = useRef(0);
  const jedaRef = useRef(false);
  const suaraRef = useRef(true);
  const pengatur = useRef<number[]>([]);
  const sudahMulaiRef = useRef(false);
  const selesaiRef = useRef(false);

  const [sudahMulai, setSudahMulai] = useState(false);
  const [jeda, setJeda] = useState(false);
  const [suara, setSuara] = useState(true);
  const [teks, setTeks] = useState("Tekan Mulai untuk memutar video cerita.");
  const [bagian, setBagian] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [tray, setTray] = useState<Tray>(TRAY_KOSONG);
  const [anakX, setAnakX] = useState<number[]>(() => ANAK.map(() => -12));
  const [anakSiap, setAnakSiap] = useState(true);
  const [lompat, setLompat] = useState(false);

  const tunggu = useCallback(async (ms: number, saya: number) => {
    let t = 0;
    while (t < ms) {
      await new Promise<void>((r) => window.setTimeout(r, 50));
      if (saya !== jalanRef.current) throw BATAL;
      if (!jedaRef.current) t += 50;
    }
  }, []);

  /** Ucapkan satu kalimat. Selesai saat suara selesai, atau setelah batas waktu bila suara tidak mau berjalan. */
  const ucap = useCallback((kalimat: string, saya: number) => {
    return new Promise<void>((res) => {
      const adaSuara = typeof window !== "undefined" && "speechSynthesis" in window;
      if (!suaraRef.current || !adaSuara) {
        res();
        return;
      }
      let beres = false;
      let berlalu = 0;
      const tutup = () => {
        if (beres) return;
        beres = true;
        window.clearInterval(detik);
        res();
      };
      const detik = window.setInterval(() => {
        if (saya !== jalanRef.current || !suaraRef.current) return tutup();
        if (!jedaRef.current) berlalu += 200;
        if (berlalu > kalimat.length * 150 + 6000) tutup();
      }, 200);
      ucapkanGuruModul(kalimat, { kelas: "1 SD", perangkatSaja: true, selesai: tutup });
    });
  }, []);

  /** Tampilkan teks lalu bacakan. Berlanjut setelah suara selesai dan waktu minimal terlewati. */
  const cerita = useCallback(
    async (kalimat: string, saya: number, minimal = 0, jarak = 500) => {
      setTeks(kalimat);
      const sp = ucap(kalimat, saya);
      const adaSuara = suaraRef.current && typeof window !== "undefined" && "speechSynthesis" in window;
      const dasar = adaSuara ? 0 : kalimat.length * 70 + 1200;
      await Promise.all([sp, tunggu(Math.max(minimal, dasar), saya)]);
      if (jarak) await tunggu(jarak, saya);
    },
    [tunggu, ucap]
  );

  const bersihkan = useCallback(
    async (saya: number) => {
      setTray((t) => ({ ...t, tampil: false }));
      await tunggu(350, saya);
      setTray({ ...TRAY_KOSONG, tampil: true });
    },
    [tunggu]
  );

  const nyalakan = useCallback((saya: number, ...nomor: number[]) => {
    const id = window.setTimeout(() => {
      if (saya !== jalanRef.current) return;
      setTray((t) => ({
        ...t,
        items: t.items.map((it, i) => (nomor.length === 0 || nomor.includes(i) ? { ...it, on: true } : it)),
        lbl: t.lbl ? { ...t.lbl, on: true } : null,
      }));
    }, 40);
    pengatur.current.push(id);
  }, []);

  const hitung = useCallback(
    async (saya: number, jenis: JenisBenda, n: number, nama: string, pembuka: string) => {
      await bersihkan(saya);
      setTray({ ten: n >= 9, besar: false, items: Array.from({ length: n }, () => ({ jenis, no: "", on: false })), lbl: null, tampil: true });
      await cerita(pembuka, saya, 1500);
      for (let i = 0; i < n; i += 1) {
        setTray((t) => ({ ...t, items: t.items.map((it, k) => (k === i ? { ...it, on: true, no: String(i + 1) } : it)) }));
        await cerita(KATA[i + 1], saya, 600, 150);
      }
      setTray((t) => ({ ...t, lbl: { teks: `${n} ${nama}`, on: false } }));
      nyalakan(saya);
      await cerita(`Ada ${KATA[n]} ${nama}.`, saya, 1500);
    },
    [bersihkan, cerita, nyalakan]
  );

  const mulai = useCallback(async () => {
    const saya = ++jalanRef.current;
    for (const id of pengatur.current) window.clearTimeout(id);
    pengatur.current = [];
    jedaRef.current = false;
    setJeda(false);
    setSudahMulai(true);
    setSelesai(false);
    setBagian(1);
    setTray(TRAY_KOSONG);
    setLompat(false);
    setAnakSiap(false);
    setAnakX(ANAK.map(() => -12));
    try {
      await tunggu(60, saya);
      setAnakSiap(true);
      ANAK.forEach((_, i) => {
        const id = window.setTimeout(() => {
          if (saya === jalanRef.current) setAnakX((x) => x.map((v, k) => (k === i ? POSISI_ANAK[i] : v)));
        }, i * 350);
        pengatur.current.push(id);
      });
      await cerita("Malosi dan teman-temannya bermain di taman.", saya, 4200);
      setLompat(true);
      await cerita("Mereka sangat senang, dan bermain dengan aman.", saya, 3500);
      setLompat(false);

      setBagian(2);
      await hitung(saya, "kursi", 5, "kursi", "Ayo kita hitung benda-benda di taman. Mulai dari kursi!");
      setBagian(3);
      await hitung(saya, "layangan", 7, "layang-layang", "Sekarang layang-layang di langit.");

      setBagian(4);
      await bersihkan(saya);
      setTray({
        ten: false,
        besar: false,
        items: [
          { jenis: "sepeda", no: "4", on: false },
          { jenis: "burung", no: "4", on: false },
        ],
        lbl: null,
        tampil: true,
      });
      nyalakan(saya);
      await cerita("Ada empat sepeda dan empat burung.", saya, 2500);
      setTray((t) => ({ ...t, lbl: { teks: "4 sepeda sama banyak dengan 4 burung", on: false } }));
      nyalakan(saya);
      await cerita("Jumlah sepeda sama banyak dengan jumlah burung!", saya, 2500);

      setBagian(5);
      await hitung(saya, "bola", 10, "bola", "Satu keranjang berisi bola. Ayo hitung!");

      setBagian(6);
      await bersihkan(saya);
      setTray({ ten: false, besar: true, items: [{ jenis: "keranjang", no: "0", on: false }], lbl: null, tampil: true });
      nyalakan(saya);
      await cerita("Keranjang yang satunya kosong. Tidak ada isinya. Itu dibaca nol.", saya, 3000);

      setBagian(7);
      await bersihkan(saya);
      setLompat(true);
      await cerita("Hebat! Kita sudah belajar membilang dari nol sampai sepuluh. Sampai jumpa!", saya, 3000, 0);
      setLompat(false);
      setBagian(JUMLAH_BAGIAN);
      setSelesai(true);
      setTeks("Selesai. Tekan Ulang untuk memutar lagi.");
    } catch (x) {
      if (x !== BATAL) throw x;
    }
  }, [bersihkan, cerita, hitung, nyalakan, tunggu]);

  const ulang = useCallback(() => {
    hentikanSuaraGuruModul();
    void mulai();
  }, [mulai]);

  const ubahJeda = useCallback(() => {
    const baru = !jedaRef.current;
    jedaRef.current = baru;
    setJeda(baru);
    if ("speechSynthesis" in window) {
      if (baru) window.speechSynthesis.pause();
      else window.speechSynthesis.resume();
    }
  }, []);

  const ubahSuara = useCallback(() => {
    const baru = !suaraRef.current;
    suaraRef.current = baru;
    setSuara(baru);
    if (!baru) hentikanSuaraGuruModul();
  }, []);

  // Berhenti saat siswa pindah tab atau sub-bab, dan jeda otomatis saat layar disembunyikan.
  useEffect(() => {
    const saatTersembunyi = () => {
      if (document.hidden && jalanRef.current > 0 && !jedaRef.current && sudahMulaiRef.current && !selesaiRef.current) {
        jedaRef.current = true;
        setJeda(true);
        if ("speechSynthesis" in window) window.speechSynthesis.pause();
      }
    };
    document.addEventListener("visibilitychange", saatTersembunyi);
    return () => {
      document.removeEventListener("visibilitychange", saatTersembunyi);
      jalanRef.current += 1;
      for (const id of pengatur.current) window.clearTimeout(id);
      pengatur.current = [];
      hentikanSuaraGuruModul();
    };
  }, []);

  useEffect(() => {
    sudahMulaiRef.current = sudahMulai;
    selesaiRef.current = selesai;
  }, [sudahMulai, selesai]);

  return (
    <div className="space-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white p-2 shadow-[0_5px_0_rgba(28,1,165,0.22)]">
      <style>{CSS}</style>
      <div className="flex items-center justify-between gap-2 px-1">
        <p className="min-w-0 text-base font-black leading-tight text-[#1C01A5] md:text-lg">🎬 Video: Di Taman Bermain</p>
        <p className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]" aria-live="off">
          Bagian {Math.max(bagian, 1)} dari {JUMLAH_BAGIAN}
        </p>
      </div>

      <div className="vtb-stage" role="img" aria-label="Animasi: Malosi dan teman-teman bermain di taman dan berhitung dari nol sampai sepuluh">
        <svg className="vtb-bg" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vtb-langit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6cc3ff" />
              <stop offset="1" stopColor="#d8f1ff" />
            </linearGradient>
          </defs>
          <rect width="160" height="90" fill="url(#vtb-langit)" />
          <circle cx="136" cy="16" r="8" fill="#ffd23f" />
          <g className="vtb-awan" fill="#fff">
            <ellipse cx="25" cy="14" rx="12" ry="4.5" />
            <ellipse cx="33" cy="11" rx="8" ry="4.5" />
          </g>
          <g className="vtb-awan b" fill="#fff">
            <ellipse cx="80" cy="24" rx="11" ry="3.8" />
            <ellipse cx="87" cy="21" rx="7" ry="4" />
          </g>
          <ellipse cx="30" cy="66" rx="70" ry="22" fill="#8fd16a" />
          <ellipse cx="130" cy="68" rx="60" ry="20" fill="#7cc65a" />
          <rect y="64" width="160" height="26" fill="#6dbb4b" />
          <rect x="8" y="42" width="4" height="26" fill="#8a5a2b" />
          <circle cx="10" cy="38" r="11" fill="#3f9c44" />
          <circle cx="17" cy="42" r="7" fill="#4aae4f" />
        </svg>

        <div className={`vtb-tray${tray.ten ? " ten" : ""}${tray.besar ? " besar" : ""}`} style={{ opacity: tray.tampil ? 1 : 0 }}>
          {tray.items.map((it, i) => (
            <div key={i} className={`vtb-it${it.on ? " on" : ""}`}>
              <span className="gbr">
                <Benda jenis={it.jenis} />
              </span>
              {it.no ? <b>{it.no}</b> : null}
            </div>
          ))}
          {tray.lbl ? <div className={`vtb-lbl${tray.lbl.on ? " on" : ""}`}>{tray.lbl.teks}</div> : null}
        </div>

        {ANAK.map(([nama, baju, rambut, kulit], i) => (
          <div
            key={nama}
            className={`vtb-anak${lompat ? " lompat" : ""}`}
            style={{ left: `${anakX[i]}%`, transition: anakSiap ? "left 1.6s ease-out" : "none", animationDelay: `${i * 0.12}s` }}
          >
            <Anak nama={nama} baju={baju} rambut={rambut} kulit={kulit} />
          </div>
        ))}

        <div className={`vtb-judul${sudahMulai ? " off" : ""}`}>
          <h2>Di Taman Bermain</h2>
          <div>Cerita berhitung bersama Malosi dan teman-teman</div>
          <button type="button" onClick={() => void mulai()} aria-label="Mulai putar video Di Taman Bermain" className="justify-self-center rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.35)] md:text-lg">
            ▶ Mulai
          </button>
        </div>
      </div>

      <p role="status" aria-live="polite" className="min-h-[3.2rem] rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-3 py-2 text-center text-base font-black leading-snug text-[#1C01A5] md:text-lg">
        {teks}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-1" aria-label="Kemajuan video" role="group">
          {Array.from({ length: JUMLAH_BAGIAN }, (_, i) => (
            <span key={i} className={`h-2.5 w-6 rounded-full border-2 border-[#1C01A5] ${i < bagian ? "bg-[#FFE566]" : "bg-white"}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={ubahJeda} disabled={!sudahMulai || selesai} aria-pressed={jeda} className={`${TOMBOL} disabled:opacity-40`}>
          {jeda ? "▶ Lanjut" : "⏸ Jeda"}
        </button>
        <button type="button" onClick={ulang} disabled={!sudahMulai} className={`${TOMBOL} disabled:opacity-40`}>
          ↻ Ulang
        </button>
        <button type="button" onClick={ubahSuara} aria-pressed={suara} className={TOMBOL}>
          {suara ? "🔊 Suara: hidup" : "🔇 Suara: mati"}
        </button>
      </div>
    </div>
  );
}
