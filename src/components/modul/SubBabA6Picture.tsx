"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU, EMAS } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab A, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Titik polos, batang kotak, dan garis bilangan. Anak menandai, mewarnai,    */
/* dan memilih. Anak tidak memindahkan benda.                                 */
/*  5 Lingkari Lebihnya (menandai titik yang tidak punya pasangan)            */
/*  6 Samakan Batang (mewarnai kotak sampai dua batang sama panjang)          */
/*  7 Selisih di Garis Bilangan (menandai langkah, memilih kalimat)           */
/* ------------------------------------------------------------------------ */

const tombolPilih = "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]";

/* --------- Permainan 5. Lingkari Lebihnya --------------------------------- */

const RONDE_LINGKARI: { a: number; b: number }[] = [
  { a: 8, b: 7 },
  { a: 6, b: 8 },
  { a: 6, b: 9 },
];

function RondeLingkari({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_LINGKARI[ronde];
  const akhir = ronde === RONDE_LINGKARI.length - 1;
  const maks = Math.max(a, b);
  const jarak = Math.min(30, 270 / maks);
  const x = (i: number) => 18 + i * jarak + jarak / 2;
  const pasangan = Math.min(a, b);
  const d = Math.abs(a - b);
  const barisLebih: "a" | "b" = a > b ? "a" : "b";
  const [lingkar, setLingkar] = useState<number[]>([]);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = lingkar.length === d;
  const suara = panel.suara["a6-lingkari"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Titik ${barisLebih === "a" ? "merah" : "biru"} punya ${sebut(d)} titik tanpa pasangan. Itulah lebihnya. Selisih ${sebut(Math.max(a, b))} dan ${sebut(Math.min(a, b))} adalah ${sebut(d)}.`
  );

  const ketuk = (baris: "a" | "b", i: number) => {
    if (semua || beres) return;
    if (baris !== barisLebih || i < pasangan) {
      setKabar({ teks: "Titik ini sudah punya pasangan. Lingkari hanya titik yang tidak punya pasangan, yaitu yang tidak tersambung garis.", ok: false });
      return;
    }
    setKabar(null);
    setLingkar((l) => (l.includes(i) ? l.filter((v) => v !== i) : [...l, i]));
  };

  const pilih = (v: number) => {
    if (!semua || beres) return;
    if (v === d) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung titik yang kamu lingkari. Banyaknya itulah selisih.", ok: false });
    }
  };

  const titik = (baris: "a" | "b", i: number) => {
    const cy = baris === "a" ? 34 : 104;
    const ada = baris === "a" ? i < a : i < b;
    if (!ada) return null;
    const lebih = baris === barisLebih && i >= pasangan;
    const ring = lebih && lingkar.includes(i);
    return (
      <g
        key={`${baris}${i}`}
        role="button"
        tabIndex={semua ? -1 : 0}
        aria-label={`Titik ${baris === "a" ? "merah" : "biru"} ke-${i + 1}${lebih ? ", tidak punya pasangan" : ", punya pasangan"}${ring ? ", sudah dilingkari" : ""}`}
        onClick={() => ketuk(baris, i)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            ketuk(baris, i);
          }
        }}
        style={{ cursor: semua ? "default" : "pointer", outline: "none" }}
      >
        <rect x={x(i) - jarak / 2} y={cy - 20} width={jarak} height="40" fill="transparent" />
        <circle cx={x(i)} cy={cy} r="10" fill={baris === "a" ? MERAH_B5 : BIRU_B5} stroke={BIRU} strokeWidth="2.2" />
        {ring ? <circle cx={x(i)} cy={cy} r="16" fill="none" stroke={EMAS} strokeWidth="3.6" strokeDasharray="6 4" /> : null}
      </g>
    );
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Lingkaranmu tepat!" : semua ? "Berapa selisihnya?" : "Lingkari yang tanpa pasangan"}
        teks={`Titik merah ada di atas dan titik biru ada di bawah. Garis menyambung titik yang berpasangan. Ketuk titik yang tidak punya pasangan untuk melingkarinya. Banyak titik yang dilingkari adalah selisihnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 140" className="mx-auto block h-36 w-full max-w-[300px]" role="group" aria-label={`Dua baris titik: ${a} titik merah dan ${b} titik biru`}>
          {Array.from({ length: pasangan }, (_, i) => (
            <path key={i} d={`M${x(i)} 46 V92`} stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
          ))}
          {Array.from({ length: maks }, (_, i) => titik("a", i))}
          {Array.from({ length: maks }, (_, i) => titik("b", i))}
          <text x="150" y="136" textAnchor="middle" fontSize="12" fontWeight="900" fill="#B45309">
            dilingkari: {lingkar.length}
          </text>
        </svg>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa selisih titik merah dan titik biru?</p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisihnya: ?" : `${Math.max(a, b)} – ${Math.min(a, b)} = ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLingkari({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_LINGKARI[RONDE_LINGKARI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lingkari Lebihnya"
      warna="#BFDBFE"
      petunjuk="Garis menyambung titik merah dengan titik biru yang berpasangan. Ketuk titik yang tidak punya pasangan untuk melingkarinya. Lalu pilih berapa selisihnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-lingkari"
      jumlahRonde={RONDE_LINGKARI.length}
      kunciAkhir={Math.abs(terakhir.a - terakhir.b)}
      belumSiap="Lingkari titiknya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLingkari ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Samakan Batang ------------------------------------ */

const KAPASITAS = 12;
const RONDE_BATANG: { a: number; b: number }[] = [
  { a: 9, b: 6 },
  { a: 5, b: 9 },
  { a: 7, b: 12 },
];

function RondeBatang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_BATANG[ronde];
  const akhir = ronde === RONDE_BATANG.length - 1;
  const d = Math.abs(a - b);
  const barisPendek: "a" | "b" = a < b ? "a" : "b";
  const awal = Math.min(a, b);
  const panjang = Math.max(a, b);
  const sisi = 20;
  const mulai = 34;
  const [warna, setWarna] = useState(0);
  const [sama, setSama] = useState(false);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a6-batang"] === true && akhir;
  useBicara(akhir ? suara : beres, `Batang yang pendek diwarnai ${sebut(d)} kotak sampai sama panjang. Selisih panjang kedua batang adalah ${sebut(d)}. ${sebut(panjang)} dikurangi ${sebut(awal)} sama dengan ${sebut(d)}.`);

  const ketuk = (baris: "a" | "b", i: number) => {
    if (sama || beres) return;
    if (baris !== barisPendek || i < awal) {
      setKabar({ teks: "Warnai kotak kosong pada batang yang lebih pendek, di sebelah kanan kotak yang sudah berwarna.", ok: false });
      return;
    }
    setKabar(null);
    const ke = i - awal;
    setWarna(ke < warna ? ke : ke + 1);
  };

  const periksa = () => {
    if (sama || beres) return;
    if (awal + warna === panjang) {
      setSama(true);
      setKabar(null);
      return;
    }
    setKabar({
      teks: awal + warna < panjang ? "Batang yang pendek belum sama panjang. Warnai lagi kotaknya." : "Batang yang kamu warnai terlalu panjang. Kurangi kotaknya.",
      ok: false,
    });
  };

  const pilih = (v: number) => {
    if (!sama || beres) return;
    if (v === d) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung kotak emas yang kamu warnai. Banyaknya adalah selisih panjang kedua batang.", ok: false });
    }
  };

  const batang = (baris: "a" | "b", n: number, y: number, isi: string) => (
    <g>
      <text x="14" y={y + sisi * 0.72} textAnchor="middle" fontSize="14" fontWeight="900" fill={BIRU}>
        {baris === "a" ? "A" : "B"}
      </text>
      {Array.from({ length: KAPASITAS }, (_, i) => {
        const berisi = i < n;
        const emas = baris === barisPendek && i >= awal && i < awal + warna;
        const bisa = baris === barisPendek && i >= awal;
        return (
          <g
            key={i}
            role={bisa ? "button" : undefined}
            tabIndex={bisa && !sama ? 0 : -1}
            aria-label={bisa ? `Kotak ${i + 1} batang ${baris === "a" ? "A" : "B"}, ${emas ? "sudah diwarnai" : "kosong"}` : undefined}
            onClick={() => bisa && ketuk(baris, i)}
            onKeyDown={(e) => {
              if (bisa && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                ketuk(baris, i);
              }
            }}
            style={{ cursor: bisa && !sama ? "pointer" : "default", outline: "none" }}
          >
            <rect
              x={mulai + i * sisi}
              y={y}
              width={sisi}
              height={sisi}
              fill={emas ? "#FDE68A" : berisi ? isi : "#FFFFFF"}
              stroke={BIRU}
              strokeWidth={berisi || emas ? 1.8 : 1}
              strokeOpacity={berisi || emas ? 1 : 0.3}
              strokeDasharray={berisi || emas ? undefined : "3 3"}
            />
          </g>
        );
      })}
    </g>
  );

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Batangmu sama panjang!" : sama ? "Berapa selisihnya?" : "Warnai batang yang pendek"}
        teks={`Ada dua batang kotak, batang A dan batang B. Warnai kotak kosong pada batang yang lebih pendek sampai kedua batang sama panjang. Lalu tekan periksa. Banyak kotak emas adalah selisihnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 290 78" className="mx-auto block h-auto w-full max-w-[320px]" role="group" aria-label={`Batang A ${a} kotak dan batang B ${b} kotak`}>
          {batang("a", a, 6, "#FCA5A5")}
          {batang("b", b, 46, "#93C5FD")}
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          A: {a} kotak • B: {b} kotak • diwarnai: {warna}
        </p>
        {!sama && !beres ? (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa sama panjang
          </button>
        ) : null}
        {sama && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa selisih panjang batang A dan batang B?</p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisihnya: ?" : `${panjang} – ${awal} = ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBatang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BATANG[RONDE_BATANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Samakan Batang"
      warna="#FDE68A"
      petunjuk="Ada dua batang kotak. Ketuk kotak kosong pada batang yang lebih pendek untuk mewarnainya sampai kedua batang sama panjang. Tekan periksa, lalu pilih selisihnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-batang"
      jumlahRonde={RONDE_BATANG.length}
      kunciAkhir={Math.abs(terakhir.a - terakhir.b)}
      belumSiap="Samakan batangnya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBatang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Selisih di Garis Bilangan ------------------------- */

const RONDE_GARIS: { kecil: number; besar: number; dari: number; sampai: number }[] = [
  { kecil: 7, besar: 9, dari: 5, sampai: 11 },
  { kecil: 4, besar: 10, dari: 2, sampai: 12 },
  { kecil: 6, besar: 13, dari: 4, sampai: 14 },
];

function RondeGaris({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { kecil, besar, dari, sampai } = RONDE_GARIS[ronde];
  const akhir = ronde === RONDE_GARIS.length - 1;
  const d = besar - kecil;
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const [langkah, setLangkah] = useState(0);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a6-garis"] === true && akhir;
  const pilihan = [`${besar} – ${kecil}`, `${besar} + ${kecil}`, `${besar} – ${d}`];
  useBicara(akhir ? suara : beres, `Dari ${sebut(kecil)} ke ${sebut(besar)} ada ${sebut(d)} langkah. Selisihnya ${sebut(d)}. ${sebut(besar)} dikurangi ${sebut(kecil)} sama dengan ${sebut(d)}.`);

  const ketukLangkah = (n: number) => {
    if (tahap !== 0) return;
    if (n < kecil || n >= besar) {
      setKabar({ teks: `Tandai langkah dari ${sebut(kecil)} ke ${sebut(besar)} saja, yaitu di antara kedua bendera.`, ok: false });
      return;
    }
    const ke = n - kecil;
    if (ke > langkah) {
      setKabar({ teks: `Mulai dari bendera ${sebut(kecil)}. Tandai satu langkah demi satu langkah ke kanan.`, ok: false });
      return;
    }
    setKabar(null);
    const baru = ke < langkah ? ke : langkah + 1;
    setLangkah(baru);
    if (baru === d) setTahap(1);
  };

  const pilih = (teks: string) => {
    if (tahap !== 1 || beres) return;
    if (teks === pilihan[0]) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(teks);
      setKabar({ teks: "Selisih dicari dengan mengurangkan. Bilangan yang lebih besar dikurangi bilangan yang lebih kecil.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Kalimatmu tepat!" : tahap === 1 ? "Pilih kalimat pengurangan" : "Tandai langkahnya"}
        teks={`Ada dua bendera di garis bilangan, ${sebut(kecil)} dan ${sebut(besar)}. Ketuk setiap langkah dari bendera kecil ke bendera besar. Banyak langkah adalah selisihnya. Lalu pilih kalimat pengurangannya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 112" className="block h-28 w-full" role="group" aria-label={`Garis bilangan ${dari} sampai ${sampai}, bendera di ${kecil} dan ${besar}`}>
          <path d="M6 66 H294 M288 60 L294 66 L288 72" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: banyak + 1 }, (_, i) => {
            const n = dari + i;
            const sorot = n === kecil || n === besar;
            return (
              <g key={n}>
                <path d={`M${x(n)} ${sorot ? 58 : 60} V72`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
                <text x={x(n)} y="90" textAnchor="middle" fontSize={sorot ? 13.5 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
                  {n}
                </text>
              </g>
            );
          })}
          {Array.from({ length: banyak }, (_, i) => {
            const n = dari + i;
            const dalam = n >= kecil && n < besar;
            const tanda = dalam && n - kecil < langkah;
            const tengah = (x(n) + x(n + 1)) / 2;
            return (
              <g
                key={n}
                role="button"
                tabIndex={tahap === 0 && dalam ? 0 : -1}
                aria-label={`Langkah dari ${n} ke ${n + 1}${tanda ? ", sudah ditandai" : ""}`}
                onClick={() => ketukLangkah(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketukLangkah(n);
                  }
                }}
                style={{ cursor: tahap === 0 ? "pointer" : "default", outline: "none" }}
              >
                <rect x={x(n)} y="26" width={x(n + 1) - x(n)} height="42" fill="transparent" />
                {tanda ? <path d={`M${x(n)} 56 Q${tengah} 28 ${x(n + 1)} 56`} fill="none" stroke={BIRU_B5} strokeWidth="3" strokeLinecap="round" /> : null}
                {dalam && !tanda ? <path d={`M${x(n) + 4} 54 H${x(n + 1) - 4}`} stroke={EMAS} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6" /> : null}
              </g>
            );
          })}
          {[kecil, besar].map((n, i) => (
            <g key={n}>
              <circle cx={x(n)} cy="14" r="10" fill={i === 0 ? "#BFDBFE" : "#FFE566"} stroke={BIRU} strokeWidth="2.6" />
              <text x={x(n)} y="18.5" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {n}
              </text>
              <path d={`M${x(n)} 24 V56`} stroke={BIRU} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
            </g>
          ))}
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">Langkah yang ditandai: {langkah}</p>
        {tahap === 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Kalimat mana untuk mencari selisihnya?</p>
            <div className="grid grid-cols-3 gap-2">
              {pilihan.map((t) => (
                <button
                  key={`${t}-${salah === t ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih ${t}`}
                  onClick={() => pilih(t)}
                  className={`${tombolPilih} ${salah === t ? "igil-goyang" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${besar} – ${kecil} = ?` : `${besar} – ${kecil} = ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuGaris({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_GARIS[RONDE_GARIS.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Selisih di Garis Bilangan"
      warna="#C7D2FE"
      petunjuk="Ada dua bendera di garis bilangan. Ketuk setiap langkah dari bendera kecil ke bendera besar. Banyak langkah adalah selisihnya. Lalu pilih kalimat pengurangan yang tepat. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-garis"
      jumlahRonde={RONDE_GARIS.length}
      kunciAkhir={terakhir.besar - terakhir.kecil}
      belumSiap="Tandai langkahnya dan pilih kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGaris ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
