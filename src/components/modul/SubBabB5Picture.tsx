"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5, sebut } from "./belas-a5-dasar";
import { opsiSekitar, type Arah } from "./urut-b5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Garis bilangan, kisi bilangan, dan deretan lingkaran polos. Anak mengisi,   */
/* menandai, dan mewarnai. Anak tidak memindahkan benda.                      */
/*  5 Isi Garis Bilangan (mengisi bilangan yang hilang)                        */
/*  6 Kisi Dua Puluh (mengisi kotak kosong dari bank angka)                    */
/*  7 Warnai Langkahnya (mewarnai lompatan maju atau mundur)                   */
/* ------------------------------------------------------------------------ */

const rangkai = (daftar: number[]) => daftar.map((n) => sebut(n)).join(", ");

/* --------- Permainan 5. Isi Garis Bilangan -------------------------------- */

const RONDE_GARIS: { arah: Arah; dari: number; sampai: number; kosong: number[] }[] = [
  { arah: "maju", dari: 10, sampai: 16, kosong: [12, 14] },
  { arah: "mundur", dari: 14, sampai: 18, kosong: [15, 17] },
  { arah: "maju", dari: 12, sampai: 19, kosong: [14, 16, 18] },
];

function RondeGaris({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GARIS[ronde];
  const akhir = ronde === RONDE_GARIS.length - 1;
  const banyak = d.sampai - d.dari;
  const x = (n: number) => 16 + ((n - d.dari) * 268) / banyak;
  const [isi, setIsi] = useState<number[]>([]);
  const [aktif, setAktif] = useState<number | null>(d.kosong[0]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi.length === d.kosong.length;
  const suara = panel.suara["b5-garis"] === true && akhir;
  const deret = Array.from({ length: banyak + 1 }, (_, i) => (d.arah === "maju" ? d.dari + i : d.sampai - i));
  useBicara(akhir ? suara : beres, `${rangkai(deret)}. Kita menghitung ${d.arah}, langkahnya sama, satu demi satu.`);

  const pilih = (v: number) => {
    if (aktif === null || beres) return;
    if (v !== aktif) {
      setKeliru(v);
      setKabar({
        teks:
          d.arah === "maju"
            ? "Menghitung maju: dari bilangan di sebelah kirinya, naik satu langkah ke kanan."
            : "Menghitung mundur: dari bilangan di sebelah kanannya, turun satu langkah ke kiri.",
        ok: false,
      });
      return;
    }
    const baru = [...isi, v];
    setIsi(baru);
    setKeliru(null);
    setKabar(null);
    const sisa = d.kosong.find((k) => !baru.includes(k)) ?? null;
    setAktif(sisa);
    if (sisa === null) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: bilangan paling kanan" : suara ? "Hebat!" : beres ? "Garis bilanganmu lengkap!" : "Isi bilangan yang hilang"}
        teks={`Ini garis bilangan dari ${sebut(d.dari)} sampai ${sebut(d.sampai)}. ${d.arah === "maju" ? "Kita menghitung maju ke kanan." : "Kita menghitung mundur ke kiri."} Ketuk tanda tanya, lalu pilih bilangan yang pas.${akhir ? " Di akhir, ucapkan bilangan yang paling kanan di garis." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {d.arah === "maju" ? `Hitung maju dari ${d.dari}` : `Hitung mundur dari ${d.sampai}`}
        </p>
        <svg viewBox="0 0 300 108" className="block h-auto w-full" role="group" aria-label={`Garis bilangan ${d.dari} sampai ${d.sampai}`}>
          {d.arah === "maju" ? (
            <g>
              <path d="M16 20 H276" stroke={BIRU_B5} strokeWidth="3.4" strokeLinecap="round" />
              <path d="M268 12 L278 20 L268 28" fill="none" stroke={BIRU_B5} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="150" y="14" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU_B5}>
                maju
              </text>
            </g>
          ) : (
            <g>
              <path d="M284 20 H24" stroke={MERAH_B5} strokeWidth="3.4" strokeLinecap="round" />
              <path d="M32 12 L22 20 L32 28" fill="none" stroke={MERAH_B5} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="150" y="14" textAnchor="middle" fontSize="12" fontWeight="900" fill={MERAH_B5}>
                mundur
              </text>
            </g>
          )}
          <path d="M6 62 H294 M288 56 L294 62 L288 68" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: banyak + 1 }, (_, i) => {
            const n = d.dari + i;
            const hilang = d.kosong.includes(n);
            const terisi = hilang && isi.includes(n);
            if (!hilang) {
              return (
                <g key={n}>
                  <path d={`M${x(n)} 54 V70`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
                  <text x={x(n)} y="92" textAnchor="middle" fontSize="15" fontWeight="900" fill={BIRU}>
                    {n}
                  </text>
                </g>
              );
            }
            const sini = aktif === n;
            return (
              <g
                key={`${n}-${keliru !== null && sini ? "x" : "o"}`}
                role="button"
                tabIndex={terisi ? -1 : 0}
                aria-label={terisi ? `Bilangan ${n}, sudah diisi` : `Bilangan yang hilang${sini ? ", sedang dipilih" : ""}`}
                onClick={() => {
                  if (!terisi && !beres) {
                    setAktif(n);
                    setKeliru(null);
                    setKabar(null);
                  }
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !terisi && !beres) {
                    e.preventDefault();
                    setAktif(n);
                  }
                }}
                className={sini && keliru !== null ? "igil-goyang" : ""}
                style={{ cursor: terisi ? "default" : "pointer", outline: "none" }}
              >
                <rect x={x(n) - 16} y="40" width="32" height="64" fill="transparent" />
                <path d={`M${x(n)} 54 V70`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
                <circle cx={x(n)} cy="88" r="13" fill={terisi ? "#BBF7D0" : sini ? "#FFE566" : "#FFFFFF"} stroke={BIRU} strokeWidth="2.8" strokeDasharray={terisi ? undefined : "4 3"} />
                <text x={x(n)} y="94" textAnchor="middle" fontSize="17" fontWeight="900" fill={BIRU}>
                  {terisi ? n : "?"}
                </text>
              </g>
            );
          })}
        </svg>
        {!beres && aktif !== null ? <PilihAngka opsi={opsiSekitar(aktif)} keliru={keliru} onPilih={pilih} /> : null}
        <p className="text-center text-base font-black text-[#1C01A5]">
          Terisi: {isi.length} dari {d.kosong.length}
        </p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {deret.join(", ")}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuGaris({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Garis Bilangan"
      warna="#BFDBFE"
      petunjuk="Di garis bilangan, makin ke kanan makin besar. Ketuk tanda tanya, lalu pilih bilangan yang hilang. Menghitung maju berjalan ke kanan, menghitung mundur berjalan ke kiri. Pada soal terakhir, ucapkan bilangan yang paling kanan di garis."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-garis"
      jumlahRonde={RONDE_GARIS.length}
      kunciAkhir={RONDE_GARIS[RONDE_GARIS.length - 1].sampai}
      belumSiap="Isi semua bilangan yang hilang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Kisi Dua Puluh ------------------------------------ */

const RONDE_KISI: { kosong: number[]; sorot?: number }[] = [
  { kosong: [3, 8, 12, 17] },
  { kosong: [1, 5, 9, 11, 14, 20] },
  { kosong: [2, 4, 7, 10, 13, 16, 18, 19], sorot: 13 },
];

function RondeKisi({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KISI[ronde];
  const akhir = ronde === RONDE_KISI.length - 1;
  const [isi, setIsi] = useState<number[]>([]);
  const [aktif, setAktif] = useState<number | null>(d.kosong[0]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = d.kosong.filter((k) => !isi.includes(k));
  const bank = sisa.slice().sort((a, b) => b - a);
  const beres = sisa.length === 0;
  const suara = panel.suara["b5-kisi"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    "Kisi bilangan sudah lengkap. Membaca dari kiri ke kanan, kita menghitung maju. Membaca dari kanan ke kiri, kita menghitung mundur."
  );

  const ada = (m: number) => m >= 1 && m <= 20 && (!d.kosong.includes(m) || isi.includes(m));
  const petunjuk = (n: number) => {
    const kolom = (n - 1) % 5;
    if (kolom > 0 && ada(n - 1)) return `Di sebelah kirinya ada ${n - 1}. Ke kanan, bilangan makin besar satu per satu.`;
    if (kolom < 4 && ada(n + 1)) return `Di sebelah kanannya ada ${n + 1}. Ke kiri, bilangan makin kecil satu per satu.`;
    return "Isi dulu kotak di sebelahnya, lalu hitung maju atau mundur dari sana.";
  };

  const pasang = (v: number) => {
    if (beres) return;
    if (aktif === null) {
      setKabar({ teks: "Ketuk dulu satu kotak yang masih tanda tanya.", ok: false });
      return;
    }
    if (v !== aktif) {
      setGoyang(aktif);
      setKabar({ teks: petunjuk(aktif), ok: false });
      return;
    }
    const baru = [...isi, v];
    setIsi(baru);
    setGoyang(null);
    setKabar(null);
    const lagi = d.kosong.find((k) => !baru.includes(k)) ?? null;
    setAktif(lagi);
    if (lagi === null) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: kotak yang bersinar" : suara ? "Hebat!" : beres ? "Kisimu lengkap!" : "Lengkapi kisi bilangan"}
        teks={`Ini kisi bilangan satu sampai dua puluh. Setiap baris berisi lima bilangan. Ketuk kotak yang masih tanda tanya, lalu ketuk bilangan yang pas dari bank angka.${akhir ? " Di akhir, ucapkan bilangan di kotak yang bersinar." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Kiri ke kanan: maju • Kanan ke kiri: mundur
        </p>
        <div className="mx-auto grid w-full max-w-[320px] grid-cols-5 overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white" role="group" aria-label="Kisi bilangan satu sampai dua puluh">
          {Array.from({ length: 20 }, (_, i) => {
            const n = i + 1;
            const hilang = d.kosong.includes(n);
            const terisi = hilang && isi.includes(n);
            const sini = aktif === n;
            const bersinar = d.sorot === n && beres;
            const tampil = bersinar && !suara ? "?" : hilang && !terisi ? "?" : n;
            return (
              <button
                key={`${n}-${goyang === n ? "x" : "o"}`}
                type="button"
                disabled={!hilang || terisi}
                aria-label={hilang && !terisi ? `Kotak ${sini ? "terpilih, " : ""}masih kosong` : `Kotak berisi ${bersinar && !suara ? "tanda tanya" : n}`}
                onClick={() => {
                  setAktif(n);
                  setKabar(null);
                }}
                className={`flex h-12 items-center justify-center border border-[#1C01A5]/40 text-2xl font-black text-[#1C01A5] disabled:opacity-100 ${
                  bersinar
                    ? "bg-[#FFE566] ring-4 ring-inset ring-[#F0AB00]"
                    : terisi
                      ? "bg-[#BBF7D0]"
                      : hilang
                        ? sini
                          ? "bg-[#FFE566] ring-4 ring-inset ring-[#F0AB00]"
                          : "bg-[#FFF7CC]"
                        : "bg-white"
                } ${goyang === n ? "igil-goyang" : ""}`}
              >
                {tampil}
              </button>
            );
          })}
        </div>
        {!beres ? (
          <div className="space-y-1">
            <p className="text-center text-sm font-black text-[#1C01A5]/80">Bank angka: ketuk bilangan yang pas</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {bank.map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-label={`Bilangan ${v}`}
                  onClick={() => pasang(v)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-1.5 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKisi({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kisi Dua Puluh"
      warna="#FDE68A"
      petunjuk="Lengkapi kisi bilangan satu sampai dua puluh. Ketuk kotak yang masih tanda tanya, lalu ketuk bilangan yang pas dari bank angka. Membaca ke kanan berarti maju, membaca ke kiri berarti mundur. Pada soal terakhir, ucapkan bilangan di kotak yang bersinar."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-kisi"
      jumlahRonde={RONDE_KISI.length}
      kunciAkhir={RONDE_KISI[RONDE_KISI.length - 1].sorot ?? 13}
      belumSiap="Lengkapi kisinya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKisi ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Warnai Langkahnya --------------------------------- */

const RONDE_WARNAI: { arah: Arah; mulai: number; langkah: number }[] = [
  { arah: "maju", mulai: 12, langkah: 4 },
  { arah: "mundur", mulai: 18, langkah: 5 },
  { arah: "mundur", mulai: 20, langkah: 6 },
];

const tujuanWarnai = (r: { arah: Arah; mulai: number; langkah: number }) => (r.arah === "maju" ? r.mulai + r.langkah : r.mulai - r.langkah);
const XW = (n: number) => 22 + (n - 10) * 25.6;

function RondeWarnai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_WARNAI[ronde];
  const akhir = ronde === RONDE_WARNAI.length - 1;
  const tujuan = tujuanWarnai(d);
  const benar = Array.from({ length: d.langkah }, (_, i) => (d.arah === "maju" ? d.mulai + 1 + i : d.mulai - 1 - i));
  const [warna, setWarna] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b5-warnai"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Mulai dari ${sebut(d.mulai)}, ${d.arah} ${sebut(d.langkah)} langkah, sampai di ${sebut(tujuan)}. Setiap langkah satu bilangan, langkahnya sama.`
  );

  const ketuk = (n: number) => {
    if (beres || n === d.mulai) return;
    setWarna((w) => (w.includes(n) ? w.filter((x) => x !== n) : [...w, n]));
    setKabar(null);
  };

  const periksa = () => {
    const sama = warna.length === benar.length && benar.every((n) => warna.includes(n));
    if (sama) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    const salahArah = warna.some((n) => (d.arah === "maju" ? n < d.mulai : n > d.mulai));
    if (salahArah) {
      setKabar({
        teks: d.arah === "maju" ? "Menghitung maju berjalan ke kanan, ke bilangan yang lebih besar. Hapus warna di sebelah kiri." : "Menghitung mundur berjalan ke kiri, ke bilangan yang lebih kecil. Hapus warna di sebelah kanan.",
        ok: false,
      });
    } else if (warna.length < d.langkah) {
      setKabar({ teks: `Baru ${sebut(warna.length)} lingkaran berwarna. Kamu perlu ${sebut(d.langkah)} langkah.`, ok: false });
    } else if (warna.length > d.langkah) {
      setKabar({ teks: `Ada ${sebut(warna.length)} lingkaran berwarna, terlalu banyak. Kamu hanya perlu ${sebut(d.langkah)} langkah.`, ok: false });
    } else {
      setKabar({ teks: "Lingkaran yang diwarnai harus berurutan, mulai dari lingkaran di sebelah titik mulai, satu per satu.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: tempat berhenti" : suara ? "Hebat!" : beres ? "Warnamu tepat!" : `${d.arah === "maju" ? "Maju" : "Mundur"} ${d.langkah} langkah`}
        teks={`Mulai dari bilangan ${sebut(d.mulai)}, lingkaran yang bertanda bintang. Hitung ${d.arah} ${sebut(d.langkah)} langkah. Warnai satu lingkaran untuk setiap langkah. Setelah itu tekan Periksa.${akhir ? " Di akhir, ucapkan bilangan tempat kamu berhenti." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Mulai di {d.mulai} • {d.arah} {d.langkah} langkah
        </p>
        <svg viewBox="0 0 300 96" className="block h-auto w-full" role="group" aria-label={`Deretan lingkaran bilangan 10 sampai 20. Mulai di ${d.mulai}.`}>
          <path d="M8 46 H292" stroke={BIRU} strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" opacity="0.5" />
          {beres
            ? benar.map((n, i) => {
                const dari = i === 0 ? d.mulai : benar[i - 1];
                const m = (XW(dari) + XW(n)) / 2;
                const atas = d.arah === "maju";
                return (
                  <g key={`panah-${n}`} className="igil-muncul">
                    <path d={`M${XW(dari)} ${atas ? 34 : 58} Q${m} ${atas ? 6 : 86} ${XW(n)} ${atas ? 34 : 58}`} fill="none" stroke={atas ? BIRU_B5 : MERAH_B5} strokeWidth="2.8" strokeLinecap="round" />
                  </g>
                );
              })
            : null}
          {Array.from({ length: 11 }, (_, i) => {
            const n = 10 + i;
            const mulai = n === d.mulai;
            const diwarnai = warna.includes(n);
            return (
              <g
                key={n}
                role="button"
                tabIndex={beres || mulai ? -1 : 0}
                aria-label={mulai ? `Bilangan ${n}, titik mulai` : `Bilangan ${n}, ${diwarnai ? "berwarna" : "belum berwarna"}`}
                aria-pressed={mulai ? undefined : diwarnai}
                onClick={() => ketuk(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(n);
                  }
                }}
                style={{ cursor: beres || mulai ? "default" : "pointer", outline: "none" }}
              >
                <rect x={XW(n) - 13} y="26" width="26" height="68" fill="transparent" />
                <circle cx={XW(n)} cy="46" r="11" fill={mulai ? "#FFE566" : diwarnai ? (d.arah === "maju" ? BIRU_B5 : MERAH_B5) : "#FFFFFF"} stroke={BIRU} strokeWidth={mulai ? 4 : 2.6} />
                {mulai ? (
                  <text x={XW(n)} y="52" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
                    ★
                  </text>
                ) : null}
                <text x={XW(n)} y="82" textAnchor="middle" fontSize="13" fontWeight="900" fill={mulai ? MERAH_B5 : BIRU}>
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xl font-black text-[#1C01A5]">
          Lingkaran berwarna: {warna.length} dari {d.langkah}
        </p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {d.mulai} → {akhir && !suara ? "?" : tujuan} ({d.arah} {d.langkah} langkah)
          </p>
        ) : (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuWarnai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Langkahnya"
      warna="#FBCFE8"
      petunjuk="Mulai dari lingkaran yang bertanda bintang. Menghitung maju berjalan ke kanan, menghitung mundur berjalan ke kiri. Warnai satu lingkaran untuk setiap langkah, lalu tekan Periksa. Pada soal terakhir, ucapkan bilangan tempat kamu berhenti."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-warnai"
      jumlahRonde={RONDE_WARNAI.length}
      kunciAkhir={tujuanWarnai(RONDE_WARNAI[RONDE_WARNAI.length - 1])}
      belumSiap="Warnai dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarnai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
