"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, Ikatan, MERAH_B5, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { TabelTambah } from "./tambah-b6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Garis bilangan, bagan pasangan bilangan, dan tabel nilai tempat. Anak      */
/* menandai, memilih, dan mengisi. Anak tidak memindahkan benda.              */
/*  5 Loncat Maju (menandai lompatan di garis bilangan)                       */
/*  6 Bagan Pasangan (memilih pasangan, lalu menghitung)                      */
/*  7 Isi Tabel Nilai Tempat (mengisi satuan, lalu puluhan)                   */
/* ------------------------------------------------------------------------ */

const tombolPilih = "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]";

/* --------- Permainan 5. Loncat Maju --------------------------------------- */

const RONDE_LOMPAT: { a: number; b: number }[] = [
  { a: 7, b: 6 },
  { a: 12, b: 3 },
  { a: 9, b: 7 },
];

function RondeLompat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_LOMPAT[ronde];
  const akhir = ronde === RONDE_LOMPAT.length - 1;
  const jumlah = a + b;
  const dari = a - 1;
  const sampai = jumlah + 1;
  const banyak = sampai - dari;
  const x = (n: number) => 16 + ((n - dari) * 268) / banyak;
  const [lompat, setLompat] = useState<number[]>([]);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const posisi = a + lompat.length;
  const suara = panel.suara["b6-lompat"] === true && akhir;
  useBicara(akhir ? suara : beres, `Mulai dari ${sebut(a)}, melompat ${sebut(b)} kali ke kanan, mendarat di ${sebut(jumlah)}. Jadi ${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(jumlah)}.`);

  const ketuk = (n: number) => {
    if (tahap !== 0) return;
    if (n <= posisi) {
      setKabar({ teks: `Kamu sudah di ${sebut(posisi)}. Menghitung maju berarti melompat ke kanan, ke bilangan yang lebih besar.`, ok: false });
      return;
    }
    if (n !== posisi + 1) {
      setKabar({ teks: "Lompat satu langkah saja setiap kali. Ketuk bilangan yang tepat di sebelah kanan.", ok: false });
      return;
    }
    setKabar(null);
    const baru = [...lompat, n];
    setLompat(baru);
    if (baru.length === b) setTahap(1);
  };

  const pilih = (v: number) => {
    if (tahap !== 1 || beres) return;
    if (v === jumlah) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Lihat bilangan tempat lompatan terakhir mendarat. Itulah jumlahnya.", ok: false });
    }
  };

  const rangkaian = [a, ...lompat];

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Lompatanmu tepat!" : tahap === 1 ? "Mendarat di mana?" : `Lompat maju ${b} kali`}
        teks={`Mulai dari ${sebut(a)}. Ketuk bilangan di sebelah kanan satu per satu untuk melompat maju sebanyak ${sebut(b)} kali. Lalu pilih bilangan tempat kamu mendarat.${akhir ? " Di akhir, ucapkan jumlahnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 100" className="block h-24 w-full" role="group" aria-label={`Garis bilangan ${dari} sampai ${sampai}, mulai dari ${a}`}>
          <path d="M6 66 H294 M288 60 L294 66 L288 72" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: banyak + 1 }, (_, i) => {
            const n = dari + i;
            const sorot = n === a || (lompat.length > 0 && n === posisi);
            return (
              <g
                key={n}
                role="button"
                tabIndex={tahap === 0 && n > posisi ? 0 : -1}
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
              {a} + {b} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(jumlah)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} + ${b} = ?` : `${a} + ${b} = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLompat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_LOMPAT[RONDE_LOMPAT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Loncat Maju"
      warna="#FDE68A"
      petunjuk="Mulai dari bilangan pertama di garis bilangan. Ketuk bilangan di sebelah kanan satu per satu untuk melompat maju sebanyak bilangan kedua. Lalu pilih jumlahnya. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-lompat"
      jumlahRonde={RONDE_LOMPAT.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Lompat dan pilih jumlahnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLompat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Bagan Pasangan ------------------------------------ */

type RondeIkatan = {
  tipe: "genap" | "puluh";
  a: number;
  b: number;
  /** Bilangan yang dipisah: b untuk genap, a untuk puluh. */
  atas: number;
  kiri: number;
  kanan: number;
  pilihan: string[];
};

const RONDE_IKATAN: RondeIkatan[] = [
  { tipe: "genap", a: 7, b: 6, atas: 6, kiri: 3, kanan: 3, pilihan: ["2 dan 4", "3 dan 3", "5 dan 1"] },
  { tipe: "puluh", a: 14, b: 3, atas: 14, kiri: 10, kanan: 4, pilihan: ["9 dan 5", "7 dan 7", "10 dan 4"] },
  { tipe: "genap", a: 8, b: 7, atas: 7, kiri: 2, kanan: 5, pilihan: ["2 dan 5", "3 dan 4", "1 dan 6"] },
];

function RondeIkatanPasangan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_IKATAN[ronde];
  const akhir = ronde === RONDE_IKATAN.length - 1;
  const jumlah = d.a + d.b;
  const benarPasangan = `${d.kiri} dan ${d.kanan}`;
  const [tahap, setTahap] = useState(0);
  const [salahChip, setSalahChip] = useState<string | null>(null);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b6-ikatan"] === true && akhir;
  // genap: tahap 1 = sepuluh ditambah sisa. puluh: tahap 1 = satuan ditambah, tahap 2 = sepuluh ditambah hasilnya.
  const totalTahap = d.tipe === "genap" ? 2 : 3;
  const satuan = d.kanan + d.b;
  useBicara(
    akhir ? suara : beres,
    d.tipe === "genap"
      ? `${sebut(d.b)} dipisah menjadi ${sebut(d.kiri)} dan ${sebut(d.kanan)}. ${sebut(d.a)} ditambah ${sebut(d.kiri)} sama dengan sepuluh. Sepuluh ditambah ${sebut(d.kanan)} sama dengan ${sebut(jumlah)}.`
      : `${sebut(d.a)} dipisah menjadi sepuluh dan ${sebut(d.kanan)}. ${sebut(d.kanan)} ditambah ${sebut(d.b)} sama dengan ${sebut(satuan)}. Sepuluh ditambah ${sebut(satuan)} sama dengan ${sebut(jumlah)}.`
  );

  const pilihChip = (t: string) => {
    if (tahap !== 0) return;
    if (t === benarPasangan) {
      setSalahChip(null);
      setKabar(null);
      setTahap(1);
    } else {
      setSalahChip(t);
      setKabar({
        teks:
          d.tipe === "genap"
            ? `Pilih pasangan yang membuat ${sebut(d.a)} menjadi sepuluh. ${sebut(d.a)} membutuhkan ${sebut(d.kiri)}.`
            : `Pisahkan ${sebut(d.a)} menjadi sepuluh dan satuannya. Belasan selalu sepuluh ditambah satuan.`,
        ok: false,
      });
    }
  };

  const nilaiBenar = (t: number) => (d.tipe === "genap" ? jumlah : t === 1 ? satuan : jumlah);

  const pilihAngka = (v: number) => {
    if (tahap < 1 || beres) return;
    if (v === nilaiBenar(tahap)) {
      setSalahAngka(null);
      setKabar(null);
      if (tahap + 1 >= totalTahap) {
        setBeres(true);
        letusan.picu();
        onBeres();
      } else {
        setTahap(tahap + 1);
      }
    } else {
      setSalahAngka(v);
      setKabar({ teks: d.tipe === "genap" ? `Sepuluh ditambah ${sebut(d.kanan)}.` : tahap === 1 ? `Tambahkan satuannya: ${sebut(d.kanan)} ditambah ${sebut(d.b)}.` : `Sepuluh ditambah ${sebut(satuan)}.`, ok: false });
    }
  };

  const soalAngka =
    d.tipe === "genap" ? `${d.a} + ${d.kiri} = 10, lalu 10 + ${d.kanan} = ?` : tahap === 1 ? `${d.kanan} + ${d.b} = ?` : `10 + ${satuan} = ?`;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Baganmu tepat!" : tahap === 0 ? "Pilih pasangan bilangan" : "Hitung langkah berikutnya"}
        teks={
          d.tipe === "genap"
            ? `Hitung ${d.a} ditambah ${d.b} dengan menggenapkan sepuluh. Pisahkan ${sebut(d.b)} menjadi dua bagian, supaya ${sebut(d.a)} ditambah bagian pertama menjadi sepuluh. Pilih pasangan yang tepat, lalu hitung.${akhir ? " Di akhir, ucapkan jumlahnya." : ""}`
            : `Hitung ${d.a} ditambah ${d.b} dengan pasangan bilangan. Pisahkan ${sebut(d.a)} menjadi sepuluh dan satuannya. Pilih pasangan yang tepat, tambahkan satuannya, lalu tambahkan sepuluh.${akhir ? " Di akhir, ucapkan jumlahnya." : ""}`
        }
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-3xl font-black text-[#1C01A5]">
          {d.a} + {d.b} = {beres && !(akhir && !suara) ? jumlah : "?"}
        </p>
        <p className="text-center text-sm font-black text-[#1C01A5]/80">{d.tipe === "genap" ? `Pisahkan ${d.b}` : `Pisahkan ${d.a}`}</p>
        <Ikatan atas={d.atas} kiri={tahap >= 1 ? d.kiri : null} kanan={tahap >= 1 ? d.kanan : null} kelas="h-28 w-32" />
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
            {akhir && !suara ? `${d.a} + ${d.b} = ?` : d.tipe === "genap" ? `${d.a} + ${d.kiri} = 10 • 10 + ${d.kanan} = ${jumlah}` : `${d.kanan} + ${d.b} = ${satuan} • 10 + ${satuan} = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuIkatan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_IKATAN[RONDE_IKATAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bagan Pasangan"
      warna="#BBF7D0"
      petunjuk="Pisahkan satu bilangan dengan bagan pasangan. Untuk satuan ditambah satuan, pisahkan bilangan kedua supaya bilangan pertama menjadi sepuluh. Untuk belasan, pisahkan menjadi sepuluh dan satuan. Pilih pasangan yang tepat, lalu hitung. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-ikatan"
      jumlahRonde={RONDE_IKATAN.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Pilih pasangan dan hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIkatanPasangan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Isi Tabel Nilai Tempat ---------------------------- */

const RONDE_TABEL: { a: number; b: number }[] = [
  { a: 13, b: 4 },
  { a: 15, b: 3 },
  { a: 14, b: 5 },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_TABEL[ronde];
  const akhir = ronde === RONDE_TABEL.length - 1;
  const satuan = (a % 10) + b;
  const puluhan = Math.floor(a / 10);
  const jumlah = a + b;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b6-tabel"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Satuannya ${sebut(a % 10)} ditambah ${sebut(b)} sama dengan ${sebut(satuan)}. Puluhannya tetap ${sebut(puluhan)}. Jadi ${sebut(puluhan)} puluhan dan ${sebut(satuan)} satuan, yaitu ${sebut(jumlah)}.`
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
        teks: tahap === 0 ? `Tambahkan satuan dengan satuan dulu: ${sebut(a % 10)} ditambah ${sebut(b)}.` : `Bilangan kedua tidak punya puluhan, jadi puluhan hasilnya tetap sama dengan puluhan bilangan pertama.`,
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Tabelmu lengkap!" : tahap === 0 ? "Isi satuan dulu" : "Isi puluhan"}
        teks={`Tabel nilai tempat untuk ${sebut(a)} ditambah ${sebut(b)}. Isi kotak satuan dulu, yaitu satuan ditambah satuan. Lalu isi kotak puluhan.${akhir ? " Di akhir, ucapkan jumlahnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-3xl font-black text-[#1C01A5]">
          {a} + {b} = {beres && !(akhir && !suara) ? jumlah : "?"}
        </p>
        <TabelTambah a={a} b={b} puluhHasil={tahap === 1 && !beres ? "?" : tahap === 1 || beres ? puluhan : null} satuHasil={tahap === 0 ? "?" : satuan} />
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{tahap === 0 ? `Satuan: ${a % 10} + ${b} = ?` : `Puluhan: ${puluhan} + 0 = ?`}</p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? satuan : puluhan)} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${puluhan} puluhan dan ${satuan} satuan = ?` : `${puluhan} puluhan dan ${satuan} satuan = ${jumlah}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TABEL[RONDE_TABEL.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Tabel Nilai Tempat"
      warna="#C7D2FE"
      petunjuk="Isi tabel nilai tempat untuk penjumlahan. Isi kotak satuan dulu dengan menjumlahkan satuan dan satuan. Lalu isi kotak puluhan. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Isi tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}