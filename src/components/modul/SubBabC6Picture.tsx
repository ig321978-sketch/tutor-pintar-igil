"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, Ikatan, MERAH_B5, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { TabelKurang, opsiDigit } from "./kurang-c6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab C, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Garis bilangan, bagan pasangan bilangan, dan tabel nilai tempat. Anak      */
/* menandai, memilih, dan mengisi. Anak tidak memindahkan benda.              */
/*  5 Mundur di Garis Bilangan (menandai lompatan mundur)                     */
/*  6 Bagan Pasangan (memilih pasangan, lalu menghitung)                      */
/*  7 Isi Tabel Pengurangan (mengisi satuan, lalu puluhan)                    */
/* ------------------------------------------------------------------------ */

const tombolPilih = "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]";

/* --------- Permainan 5. Mundur di Garis Bilangan -------------------------- */

const RONDE_MUNDUR: { a: number; b: number }[] = [
  { a: 15, b: 3 },
  { a: 18, b: 5 },
  { a: 19, b: 5 },
];

function RondeMundur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_MUNDUR[ronde];
  const akhir = ronde === RONDE_MUNDUR.length - 1;
  const sisa = a - b;
  const dari = sisa - 1;
  const sampai = a + 1;
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const [lompat, setLompat] = useState<number[]>([]);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const posisi = a - lompat.length;
  const suara = panel.suara["c6-mundur"] === true && akhir;
  useBicara(akhir ? suara : beres, `Mulai dari ${sebut(a)}, melompat ${sebut(b)} kali ke kiri, mendarat di ${sebut(sisa)}. Jadi ${sebut(a)} dikurangi ${sebut(b)} sama dengan ${sebut(sisa)}.`);

  const ketuk = (n: number) => {
    if (tahap !== 0) return;
    if (n >= posisi) {
      setKabar({ teks: `Kamu sedang di ${sebut(posisi)}. Menghitung mundur berarti melompat ke kiri, ke bilangan yang lebih kecil.`, ok: false });
      return;
    }
    if (n !== posisi - 1) {
      setKabar({ teks: "Lompat satu langkah saja setiap kali. Ketuk bilangan yang tepat di sebelah kiri.", ok: false });
      return;
    }
    setKabar(null);
    const baru = [...lompat, n];
    setLompat(baru);
    if (baru.length === b) setTahap(1);
  };

  const pilih = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === sisa) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Lihat bilangan tempat lompatan terakhir mendarat. Itulah sisanya.", ok: false });
    }
  };

  const rangkaian = [a, ...lompat];

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Lompatanmu tepat!" : tahap === 1 ? "Mendarat di mana?" : `Lompat mundur ${b} kali`}
        teks={`Mulai dari ${sebut(a)}. Ketuk bilangan di sebelah kiri satu per satu untuk melompat mundur sebanyak ${sebut(b)} kali. Lalu pilih bilangan tempat kamu mendarat.${akhir ? " Di akhir, ucapkan sisanya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 100" className="block h-24 w-full" role="group" aria-label={`Garis bilangan ${dari} sampai ${sampai}, mulai dari ${a}`}>
          <path d="M294 66 H6 M12 60 L6 66 L12 72" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: banyak + 1 }, (_, i) => {
            const n = dari + i;
            const sorot = n === a || (lompat.length > 0 && n === posisi);
            return (
              <g
                key={n}
                role="button"
                tabIndex={tahap === 0 && n < posisi ? 0 : -1}
                aria-label={`Bilangan ${n}${n === a ? ", titik mulai" : ""}${lompat.includes(n) ? ", sudah dilompati" : ""}`}
                onClick={() => ketuk(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(n);
                  }
                }}
                style={{ cursor: tahap === 0 ? "pointer" : "default", outline: "none" }}
              >
                <rect x={x(n) - 13} y="20" width="26" height="76" fill="transparent" />
                <path d={`M${x(n)} ${sorot ? 58 : 60} V72`} stroke={BIRU} strokeWidth={sorot ? 3.4 : 2.2} strokeLinecap="round" />
                <text x={x(n)} y="90" textAnchor="middle" fontSize={sorot ? 13.5 : 11.5} fontWeight="900" fill={sorot ? MERAH_B5 : BIRU}>
                  {n}
                </text>
              </g>
            );
          })}
          {lompat.map((n, i) => {
            const awal = rangkaian[i];
            const tengah = (x(awal) + x(n)) / 2;
            return <path key={n} d={`M${x(awal)} 54 Q${tengah} 22 ${x(n)} 54`} fill="none" stroke={BIRU_B5} strokeWidth="3" strokeLinecap="round" />;
          })}
          <circle cx={x(posisi)} cy="14" r="10" fill="#FFE566" stroke={BIRU} strokeWidth="2.6" />
          <text x={x(posisi)} y="18.5" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
            {posisi === a || tahap === 0 ? "▼" : posisi}
          </text>
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Lompatan: {lompat.length} dari {b}
        </p>
        {tahap === 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {a} – {b} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(sisa)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} – ${b} = ?` : `${a} – ${b} = ${sisa}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuMundur({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_MUNDUR[RONDE_MUNDUR.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mundur di Garis Bilangan"
      warna="#FDE68A"
      petunjuk="Mulai dari bilangan pertama di garis bilangan. Ketuk bilangan di sebelah kiri satu per satu untuk melompat mundur sebanyak bilangan yang dikurangkan. Lalu pilih sisanya. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-mundur"
      jumlahRonde={RONDE_MUNDUR.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Lompat dan pilih sisanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeMundur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Bagan Pasangan ------------------------------------ */

type RondeIkatanKurang = { a: number; b: number; pilihan: string[] };

const RONDE_IKATAN: RondeIkatanKurang[] = [
  { a: 16, b: 3, pilihan: ["8 dan 8", "10 dan 6", "9 dan 7"] },
  { a: 18, b: 6, pilihan: ["10 dan 8", "9 dan 9", "12 dan 6"] },
  { a: 19, b: 4, pilihan: ["9 dan 10", "8 dan 11", "10 dan 9"] },
];

function RondeIkatanKurangPasangan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_IKATAN[ronde];
  const akhir = ronde === RONDE_IKATAN.length - 1;
  const satuan = d.a - 10;
  const sisaSatuan = satuan - d.b;
  const hasil = d.a - d.b;
  const benarPasangan = `10 dan ${satuan}`;
  const [tahap, setTahap] = useState(0);
  const [salahChip, setSalahChip] = useState<string | null>(null);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c6-ikatan"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(d.a)} dipisah menjadi sepuluh dan ${sebut(satuan)}. ${sebut(satuan)} dikurangi ${sebut(d.b)} sama dengan ${sebut(sisaSatuan)}. Sepuluh ditambah ${sebut(sisaSatuan)} sama dengan ${sebut(hasil)}.`
  );

  const pilihChip = (t: string) => {
    if (tahap !== 0) return;
    if (t === benarPasangan) {
      setSalahChip(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahChip(t);
      setKabar({ teks: `Belasan dipisah menjadi sepuluh dan satuannya. ${sebut(d.a)} adalah sepuluh dan ${sebut(satuan)}.`, ok: false });
    }
  };

  const nilaiBenar = (t: number) => (t === 1 ? sisaSatuan : hasil);

  const pilihAngka = (v: number) => {
    if (tahap < 1 || beres) return;
    if (v === nilaiBenar(tahap)) {
      setSalahAngka(null);
      setKabar(null);
      if (tahap === 2) {
        setBeres(true);
        letusan.picu();
        onBeres();
      } else {
        setTahap(2);
      }
    } else {
      setSalahAngka(v);
      setKabar({
        teks: tahap === 1 ? `Kurangkan satuannya: ${sebut(satuan)} dikurangi ${sebut(d.b)}.` : `Sepuluh ditambah ${sebut(sisaSatuan)}.`,
        ok: false,
      });
    }
  };

  const soalAngka = tahap === 1 ? `${satuan} – ${d.b} = ?` : `10 + ${sisaSatuan} = ?`;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Baganmu tepat!" : tahap === 0 ? "Pilih pasangan bilangan" : "Hitung langkah berikutnya"}
        teks={`Hitung ${d.a} dikurangi ${d.b} dengan pasangan bilangan. Pisahkan ${sebut(d.a)} menjadi sepuluh dan satuannya. Pilih pasangan yang tepat, kurangkan satuannya, lalu tambahkan sepuluh.${akhir ? " Di akhir, ucapkan sisanya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-3xl font-black text-[#1C01A5]">
          {d.a} – {d.b} = {beres && !(akhir && !suara) ? hasil : "?"}
        </p>
        <p className="text-center text-sm font-black text-[#1C01A5]/80">Pisahkan {d.a}</p>
        <Ikatan atas={d.a} kiri={tahap >= 1 ? 10 : null} kanan={tahap >= 1 ? satuan : null} kelas="h-28 w-32" />
        {tahap === 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {d.pilihan.map((t) => (
              <button key={`${t}-${salahChip === t ? "x" : "o"}`} type="button" aria-label={`Pilih pasangan ${t}`} onClick={() => pilihChip(t)} className={`${tombolPilih} ${salahChip === t ? "igil-goyang" : ""}`}>
                {t}
              </button>
            ))}
          </div>
        ) : null}
        {tahap >= 1 && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{soalAngka}</p>
            <PilihAngka opsi={opsiSekitar(nilaiBenar(tahap))} keliru={salahAngka} onPilih={pilihAngka} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.a} – ${d.b} = ?` : `${satuan} – ${d.b} = ${sisaSatuan} • 10 + ${sisaSatuan} = ${hasil}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuIkatanKurang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_IKATAN[RONDE_IKATAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bagan Pasangan"
      warna="#BBF7D0"
      petunjuk="Pisahkan belasan dengan bagan pasangan. Belasan dipisah menjadi sepuluh dan satuan. Pilih pasangan yang tepat, kurangkan satuannya, lalu tambahkan sepuluh. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-ikatan"
      jumlahRonde={RONDE_IKATAN.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Pilih pasangan dan hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIkatanKurangPasangan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Isi Tabel Pengurangan ----------------------------- */

const RONDE_TABEL: { a: number; b: number }[] = [
  { a: 16, b: 4 },
  { a: 17, b: 5 },
  { a: 18, b: 8 },
];

function RondeTabelKurang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_TABEL[ronde];
  const akhir = ronde === RONDE_TABEL.length - 1;
  const satuan = (a % 10) - b;
  const puluhan = Math.floor(a / 10);
  const hasil = a - b;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c6-tabel"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Satuannya ${sebut(a % 10)} dikurangi ${sebut(b)} sama dengan ${satuan === 0 ? "nol" : sebut(satuan)}. Puluhannya tetap ${sebut(puluhan)}. Jadi ${sebut(puluhan)} puluhan dan ${satuan === 0 ? "nol" : sebut(satuan)} satuan, yaitu ${sebut(hasil)}.`
  );

  const pilih = (v: number) => {
    if (beres) return;
    const benar = tahap === 0 ? satuan : puluhan;
    if (v === benar) {
      setSalah(null);
      setKabar(null);
      if (tahap === 0) {
        setTahap(1);
      } else {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({
        teks: tahap === 0 ? `Kurangkan satuan dengan satuan dulu: ${sebut(a % 10)} dikurangi ${sebut(b)}.` : "Bilangan yang dikurangkan tidak punya puluhan, jadi puluhan hasilnya tetap sama dengan puluhan bilangan pertama.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Tabelmu lengkap!" : tahap === 0 ? "Isi satuan dulu" : "Isi puluhan"}
        teks={`Tabel nilai tempat untuk ${sebut(a)} dikurangi ${sebut(b)}. Isi kotak satuan dulu, yaitu satuan dikurangi satuan. Lalu isi kotak puluhan.${satuan === 0 ? " Kalau satuannya habis, tulis nol." : ""}${akhir ? " Di akhir, ucapkan sisanya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-3xl font-black text-[#1C01A5]">
          {a} – {b} = {beres && !(akhir && !suara) ? hasil : "?"}
        </p>
        <TabelKurang a={a} b={b} puluhHasil={tahap === 1 && !beres ? "?" : tahap === 1 || beres ? puluhan : null} satuHasil={tahap === 0 ? "?" : satuan} />
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{tahap === 0 ? `Satuan: ${a % 10} – ${b} = ?` : `Puluhan: ${puluhan} – 0 = ?`}</p>
            <PilihAngka opsi={opsiDigit(tahap === 0 ? satuan : puluhan)} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${puluhan} puluhan dan ${satuan} satuan = ?` : `${puluhan} puluhan dan ${satuan} satuan = ${hasil}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTabelKurang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TABEL[RONDE_TABEL.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Tabel Pengurangan"
      warna="#C7D2FE"
      petunjuk="Isi tabel nilai tempat untuk pengurangan. Isi kotak satuan dulu dengan mengurangkan satuan dan satuan. Lalu isi kotak puluhan. Kalau satuannya habis, tulis nol. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Isi tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabelKurang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
