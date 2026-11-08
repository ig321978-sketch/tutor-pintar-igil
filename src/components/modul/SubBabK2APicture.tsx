"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BIRU_K2, BingkaiSepuluh, MERAH_K2, sebut } from "./dasar-k2";
import { RONDE_BINGKAI_K2, RONDE_GARIS_K2, RONDE_JALUR_K2, opsiSekitar } from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab A, Tahap 5 Picture: diagram saja. Tidak ada gambar    */
/* benda. Bingkai sepuluh, titik bernomor, dan jalur bilangan polos. Anak     */
/* mewarnai, menarik garis, dan melengkapi. Anak tidak memindahkan benda.     */
/*  5 Warnai Lima Bingkai Sepuluh (mewarnai)                                  */
/*  6 Tarik Garis Berurutan (menghubungkan titik bernomor)                    */
/*  7 Jalur Bilangan Maju dan Mundur (melengkapi bilangan yang hilang)        */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Warnai Lima Bingkai Sepuluh ----------------------- */

function RondeBingkai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_BINGKAI_K2[ronde];
  const akhir = ronde === RONDE_BINGKAI_K2.length - 1;
  const [sel, setSel] = useState<boolean[][]>(() => Array.from({ length: 5 }, () => Array.from({ length: 10 }, () => false)));
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const jumlah = sel.flat().filter(Boolean).length;
  const suara = panel.suara["k2a-bingkai"] === true && akhir;
  const p = Math.floor(n / 10);
  const s = n % 10;
  useBicara(akhir ? suara : beres, `Kamu mewarnai ${sebut(n)} bulatan. Ada ${sebut(p)} bingkai penuh, isinya ${sebut(p * 10)}, dan ${sebut(s)} bulatan di bingkai berikutnya. ${sebut(p * 10)} ditambah ${sebut(s)} sama dengan ${sebut(n)}.`);

  const ketuk = (b: number, i: number) => {
    if (beres) return;
    setSel(sel.map((baris, k) => (k === b ? baris.map((x, j) => (j === i ? !x : x)) : baris)));
    setKabar(null);
  };

  const periksa = () => {
    const terhitung = sel.map((baris) => baris.filter(Boolean).length);
    const penuh = terhitung.filter((x) => x === 10).length;
    const sebagian = terhitung.filter((x) => x > 0 && x < 10);
    if (jumlah < n) {
      setKabar({ teks: `Baru ${sebut(jumlah)} bulatan merah. Kurang ${sebut(n - jumlah)} lagi.`, ok: false });
    } else if (jumlah > n) {
      setKabar({ teks: `Ada ${sebut(jumlah)} bulatan merah, terlalu banyak. Kelebihan ${sebut(jumlah - n)}. Ketuk lagi untuk menghapus warnanya.`, ok: false });
    } else if (penuh !== p || sebagian.length !== (s > 0 ? 1 : 0)) {
      setKabar({ teks: "Banyaknya sudah pas, tetapi rapikan dulu. Isi satu bingkai sampai penuh sepuluh, baru bingkai berikutnya.", ok: false });
    } else {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlahnya" : "Warnamu tepat!") : `Warnai ${n} bulatan`}
        teks={`Ini lima bingkai sepuluh. Setiap bingkai punya sepuluh kotak. Warnai ${sebut(n)} bulatan dengan warna merah. Isi satu bingkai sampai penuh, baru bingkai berikutnya. Ketuk kotak untuk mewarnai, ketuk lagi untuk menghapus. Setelah itu tekan Periksa.${akhir ? " Terakhir, ucapkan banyak bulatan yang kamu warnai." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">Warnai {n} bulatan merah</p>
        <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2" role="group" aria-label={`Lima bingkai sepuluh, ${jumlah} bulatan berwarna`}>
          {sel.map((baris, b) => {
            const terisi = baris.filter(Boolean).length;
            const warna = beres && terisi < 10 && terisi > 0 ? BIRU_K2 : MERAH_K2;
            return (
              <div key={b} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/25 bg-white px-1.5 py-1">
                <span className="w-5 text-center text-xs font-black text-[#1C01A5]">{b + 1}</span>
                <BingkaiSepuluh isi={baris} warna={warna} onSel={beres ? undefined : (i) => ketuk(b, i)} kelas="h-11 w-24" label={`Bingkai ${b + 1}, ${terisi} terwarnai`} />
                <span className="w-6 text-center text-lg font-black text-[#1C01A5]">{terisi}</span>
              </div>
            );
          })}
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]">Bulatan berwarna: {beres ? n : jumlah}</p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">{akhir && !suara ? `? = ${p * 10} + ${s}` : `${n} = ${p * 10} + ${s}`}</p>
        ) : (
          <button type="button" onClick={periksa} className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]">
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBingkaiK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Lima Bingkai"
      warna="#FBCFE8"
      petunjuk="Warnai bulatan merah sebanyak yang diminta. Isi satu bingkai sampai penuh sepuluh, baru bingkai berikutnya. Ketuk kotak untuk mewarnai, ketuk lagi untuk menghapus. Lalu tekan Periksa. Pada soal terakhir, ucapkan banyak bulatan yang kamu warnai."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-bingkai"
      jumlahRonde={RONDE_BINGKAI_K2.length}
      kunciAkhir={RONDE_BINGKAI_K2[RONDE_BINGKAI_K2.length - 1]}
      belumSiap="Warnai dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBingkai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tarik Garis Berurutan ----------------------------- */

const KOLOM_GARIS = 4;
const SEL_W = 72;
const SEL_H = 50;

/** Letak titik ke-i dari N titik: dipencar tetap (bukan acak) supaya anak harus mencari bilangan berikutnya. */
export function letakTitikGaris(i: number, banyak: number): { x: number; y: number } {
  const baris = Math.ceil(banyak / KOLOM_GARIS);
  const sel = baris * KOLOM_GARIS;
  const idx = (i * 7 + 3) % sel;
  const kol = idx % KOLOM_GARIS;
  const bar = Math.floor(idx / KOLOM_GARIS);
  const geserX = (((i * 13) % 7) - 3) * 3;
  const geserY = (((i * 11) % 5) - 2) * 3;
  return { x: 22 + kol * SEL_W + geserX + 10, y: 24 + bar * SEL_H + geserY };
}

function RondeGaris({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GARIS_K2[ronde];
  const banyak = d.sampai - d.dari + 1;
  const [langkah, setLangkah] = useState(0);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= banyak;
  const baris = Math.ceil(banyak / KOLOM_GARIS);
  const tinggi = baris * SEL_H + 24;
  useBicara(beres, `Hebat! Kamu menarik garis dari ${sebut(d.dari)} sampai ${sebut(d.sampai)} secara berurutan. Ada ${sebut(banyak)} bilangan, dan setiap bilangan lebih besar satu dari bilangan sebelumnya.`);

  const ketuk = (i: number) => {
    if (beres) return;
    if (i === langkah) {
      const baru = langkah + 1;
      setLangkah(baru);
      setKabar(null);
      setGoyang(null);
      if (baru >= banyak) {
        letusan.picu();
        onBeres();
      }
    } else if (i > langkah) {
      setGoyang(i);
      setKabar({ teks: `Belum waktunya. Cari bilangan ${sebut(d.dari + langkah)} dulu. Bilangan berikutnya lebih besar satu dari bilangan sebelumnya.`, ok: false });
    } else {
      setGoyang(i);
      setKabar({ teks: "Titik ini sudah tersambung. Cari bilangan berikutnya.", ok: false });
    }
  };

  const titik = Array.from({ length: banyak }, (_, i) => ({ n: d.dari + i, ...letakTitikGaris(i, banyak) }));

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Garismu selesai!" : `Mulai dari ${d.dari}`}
        teks={`Tarik garis dari bilangan ${sebut(d.dari)} sampai ${sebut(d.sampai)} secara berurutan. Ketuk bilangan ${sebut(d.dari)} dulu, lalu bilangan berikutnya, satu demi satu. Hati-hati, bilangannya tersebar.`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Tarik garis dari {d.dari} sampai {d.sampai} • berikutnya: {beres ? "selesai" : d.dari + langkah}
        </p>
        <svg viewBox={`0 0 ${KOLOM_GARIS * SEL_W + 28} ${tinggi}`} className="mx-auto block h-auto w-full max-w-[380px] rounded-2xl bg-[#F8FAFF]" role="group" aria-label={`Titik bernomor ${d.dari} sampai ${d.sampai}`}>
          {titik.slice(0, Math.max(0, langkah - 1)).map((t, i) => (
            <line key={`g${t.n}`} x1={t.x} y1={t.y} x2={titik[i + 1].x} y2={titik[i + 1].y} stroke={BIRU_K2} strokeWidth="4" strokeLinecap="round" />
          ))}
          {titik.map((t, i) => {
            const tersambung = i < langkah;
            return (
              <g
                key={t.n}
                role="button"
                tabIndex={0}
                aria-label={`Titik ${t.n}${tersambung ? ", sudah tersambung" : ""}`}
                className={`cursor-pointer ${goyang === i ? "igil-goyang" : ""}`}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
              >
                <circle cx={t.x} cy={t.y} r="17" fill={tersambung ? "#FFE566" : "#FFFFFF"} stroke={i === langkah ? MERAH_K2 : BIRU} strokeWidth={i === langkah ? 3.4 : 2.4} />
                <text x={t.x} y={t.y + 5.4} textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
                  {t.n}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xl font-black text-[#1C01A5]">
          Tersambung: {Math.min(langkah, banyak)} dari {banyak}
        </p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {d.dari}, {d.dari + 1}, {d.dari + 2}, … , {d.sampai}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuGarisK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tarik Garis Berurutan"
      warna="#BAE6FD"
      petunjuk="Tarik garis dari bilangan pertama sampai bilangan terakhir secara berurutan. Ketuk bilangan yang pertama dulu, lalu bilangan berikutnya, satu demi satu. Bilangannya tersebar, jadi cari dengan teliti."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-garis"
      jumlahRonde={RONDE_GARIS_K2.length}
      belumSiap="Sambungkan semua titik dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Jalur Bilangan Maju dan Mundur -------------------- */

const KOLOM_JALUR = 4;

/** Daftar bilangan pada jalur menurut arah. */
export function daftarJalur(awal: number, akhir: number): number[] {
  const langkah = akhir >= awal ? 1 : -1;
  return Array.from({ length: Math.abs(akhir - awal) + 1 }, (_, i) => awal + i * langkah);
}

function RondeJalur({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JALUR_K2[ronde];
  const daftar = daftarJalur(d.awal, d.akhir);
  const [isi, setIsi] = useState<Record<number, boolean>>({});
  const [aktif, setAktif] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = d.sembunyi.filter((n) => !isi[n]);
  const beres = sisa.length === 0;
  useBicara(beres, `Hebat! Jalurnya lengkap. Kita menghitung ${d.arah} dari ${sebut(d.awal)} sampai ${sebut(d.akhir)}. ${d.arah === "maju" ? "Setiap langkah, bilangan bertambah satu." : "Setiap langkah, bilangan berkurang satu."}`);

  const pilih = (angka: number) => {
    if (aktif === null) {
      setKabar({ teks: "Ketuk dulu kotak kosongnya, lalu pilih angkanya.", ok: false });
      return;
    }
    if (angka === aktif) {
      const baru = { ...isi, [aktif]: true };
      setIsi(baru);
      setAktif(null);
      setSalah(null);
      setKabar(null);
      if (d.sembunyi.every((n) => baru[n])) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(angka);
      const sebelum = d.arah === "maju" ? aktif - 1 : aktif + 1;
      setKabar({ teks: `Lihat bilangan di sebelah kiri kotak. Setelah ${sebut(sebelum)}, ${d.arah === "maju" ? "hitung maju satu" : "hitung mundur satu"}.`, ok: false });
    }
  };

  const baris = Math.ceil(daftar.length / KOLOM_JALUR);

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Jalurmu lengkap!" : `Hitung ${d.arah} ${d.awal} ke ${d.akhir}`}
        teks={`Kita menghitung ${d.arah} dari ${sebut(d.awal)} sampai ${sebut(d.akhir)}. Ketuk kotak yang kosong, lalu pilih bilangan yang tepat. ${d.arah === "maju" ? "Maju artinya bilangan makin besar." : "Mundur artinya bilangan makin kecil."} Baca bilangannya dengan suara nyaring.`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {d.arah === "maju" ? "➡️ Menghitung maju" : "⬅️ Menghitung mundur"}: {d.awal} → {d.akhir}
        </p>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${KOLOM_JALUR}, minmax(0, 1fr))` }} role="group" aria-label={`Jalur bilangan ${d.arah} dari ${d.awal} sampai ${d.akhir}`}>
          {Array.from({ length: baris * KOLOM_JALUR }, (_, i) => {
            const n = daftar[i];
            if (n === undefined) return <span key={i} />;
            const tersembunyi = d.sembunyi.includes(n) && !isi[n];
            const terpilih = aktif === n;
            const mulai = i === 0;
            const akhirJalur = i === daftar.length - 1;
            return (
              <div key={n} className="relative">
                {mulai || akhirJalur ? (
                  <span className="absolute -top-2 left-0 right-0 z-10 text-center text-[9px] font-black uppercase text-[#B45309]">{mulai ? "Mulai" : "Selesai"}</span>
                ) : null}
                {tersembunyi ? (
                  <button
                    type="button"
                    aria-label={`Kotak kosong ke-${i + 1}${terpilih ? ", terpilih" : ""}`}
                    onClick={() => setAktif(n)}
                    className={`igil-tanpa-tepi flex h-14 w-full items-center justify-center rounded-xl border-4 border-dashed text-3xl font-black text-[#1C01A5] ${terpilih ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"}`}
                  >
                    ?
                  </button>
                ) : (
                  <span className={`flex h-14 w-full items-center justify-center rounded-xl border-4 border-[#1C01A5] text-3xl font-black text-[#1C01A5] ${isi[n] ? "igil-muncul bg-[#BBF7D0]" : i % 2 ? "bg-[#FDE68A]" : "bg-[#99F6E4]"}`} aria-label={`Bilangan ${n}`}>
                    {n}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {beres ? null : (
          <div className="space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">{aktif === null ? "Ketuk kotak kosong dulu" : "Bilangan apa yang cocok di kotak itu?"}</p>
            <div className="grid grid-cols-3 gap-2">
              {opsiSekitar(aktif ?? sisa[0], [d.arah === "maju" ? d.awal : d.akhir, d.arah === "maju" ? d.akhir : d.awal]).map((n) => (
                <button
                  key={`${n}-${salah === n ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih angka ${n}`}
                  onClick={() => pilih(n)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salah === n ? "igil-goyang" : ""}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
        {beres ? <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">{daftar.join(", ")}</p> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuJalurK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Jalur Bilangan"
      warna="#FDE68A"
      petunjuk="Lengkapi jalur bilangan. Ketuk kotak yang kosong, lalu pilih bilangan yang tepat. Ada jalur maju dan jalur mundur. Maju artinya bilangan makin besar, mundur artinya bilangan makin kecil."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-jalur"
      jumlahRonde={RONDE_JALUR_K2.length}
      belumSiap="Lengkapi semua kotak kosong dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJalur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
