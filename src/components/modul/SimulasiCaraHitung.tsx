"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, BaganPasangan, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import {
  AWAL_A,
  AWAL_B,
  AWAL_KURANG,
  MAKS,
  NYALA_AWAL_CARA,
  SEMUA_TAMPIL_CARA,
  batasOperan,
  catatanSusun,
  hasilCara,
  hasilKolom,
  kalimatCara,
  kalimatKeluarga,
  kalimatPeriksa,
  keluargaBilangan,
  pasangSelisih,
  rapikan,
  rencanaGaris,
  rencanaPas,
  ucapanCara,
  ucapanPeriksa,
  urai,
  type Cara,
  type CaraGaris,
  type Op,
  type TampilCara,
} from "./lab-cara-k2b2";
import type { KeadaanCara } from "./misi-k2bab2";

/* ------------------------------------------------------------------------ */
/* Laboratorium Cara Hitung (K2B2) — PhET. Satu model a,b,op menggerakkan     */
/* garis, pasangan, bersusun, dan (bertahap) selisih satu-satu serta periksa. */
/* Alatnya bertambah per sub-bab lewat prop tampil dan ops. Melapor onKeadaan.*/
/* Logika murni di lab-cara-k2b2.ts.                                           */
/* ------------------------------------------------------------------------ */

const LABEL: Record<TampilCara, string> = {
  garis: "Garis",
  pasangan: "Pasangan",
  susun: "Bersusun",
  selisih: "Selisih",
  periksa: "Periksa",
};

const NOMOR = ["Satu", "Dua", "Tiga", "Empat"];

function langkahCoba(tampil: TampilCara[], ops: Op[]): string[] {
  const ada = (k: TampilCara) => tampil.includes(k);
  if (!ops.includes("kurang")) {
    return [
      "Hitung 8 + 5 di ketiga tampilan. Apakah hasilnya sama?",
      "Buat 18 + 2. Apa yang terjadi di satuan, dan ke mana sepuluh satuan itu pindah?",
      "Matikan satu perwakilan. Apakah hitungannya berubah?",
    ];
  }
  const daftar = ["Hitung 18 − 12 di garis dan di bersusun. Apakah hasilnya sama?"];
  if (ada("selisih")) daftar.push("Nyalakan Selisih. Titik mana yang tidak berpasangan, dan berapa banyaknya?");
  daftar.push("Buat 12 − 8. Mengapa satuan harus diurai dulu?");
  if (ada("periksa")) daftar.push("Nyalakan Periksa. Hasil ditambah bilangan kedua kembali ke bilangan mana?");
  else daftar.push("Matikan satu perwakilan. Apakah hitungannya berubah?");
  return daftar;
}

/** Dua baris titik polos yang dipasangkan satu-satu. Titik baris panjang yang tidak berpasangan adalah selisih. */
function BarisSelisih({ a, b }: { a: number; b: number }) {
  const { berpasangan, sisa } = pasangSelisih({ a, b });
  const r = 4.6;
  const langkah = 12;
  const x = (i: number) => 26 + i * langkah;
  const yAtas = 18;
  const yBawah = 48;
  const W = x(MAKS - 1) + 10;
  return (
    <svg viewBox={`0 0 ${W} 66`} className="mx-auto block w-full max-w-[420px]" role="img" aria-label={`${a} titik di atas dan ${b} titik di bawah dipasangkan satu-satu. ${sisa} titik tidak berpasangan.`}>
      <text x="2" y={yAtas + 4} fontSize="13" fontWeight="900" fill={MERAH}>
        {a}
      </text>
      <text x="2" y={yBawah + 4} fontSize="13" fontWeight="900" fill={BIRU}>
        {b}
      </text>
      {Array.from({ length: berpasangan }, (_, i) => (
        <line key={`l${i}`} x1={x(i)} y1={yAtas + r} x2={x(i)} y2={yBawah - r} stroke={BIRU} strokeWidth="1.6" />
      ))}
      {Array.from({ length: a }, (_, i) => {
        const lepas = i >= berpasangan;
        return <circle key={`a${i}`} cx={x(i)} cy={yAtas} r={r} fill={lepas ? "#BBF7D0" : "#FEE2E2"} stroke={lepas ? HIJAU : MERAH} strokeWidth={lepas ? 2.6 : 1.6} />;
      })}
      {Array.from({ length: b }, (_, i) => (
        <circle key={`b${i}`} cx={x(i)} cy={yBawah} r={r} fill="#DBEAFE" stroke={BIRU} strokeWidth="1.6" />
      ))}
    </svg>
  );
}

export default function SimulasiCaraHitung({
  speakGuru,
  tampil = SEMUA_TAMPIL_CARA,
  ops = ["tambah", "kurang"],
  opAwal,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  /** Perwakilan yang tersedia. Bawaan: semuanya. */
  tampil?: TampilCara[];
  /** Operasi yang bisa dipilih. Satu operasi saja menyembunyikan tombol pilihan. */
  ops?: Op[];
  /** Operasi saat dibuka dan setelah Reset Semua. Bawaan: operasi pertama di ops. */
  opAwal?: Op;
  onKeadaan?: (k: KeadaanCara) => void;
}) {
  const awalOp: Op = opAwal && ops.includes(opAwal) ? opAwal : ops[0];
  const awalP = (o: Op): Cara => (o === "kurang" ? { ...AWAL_KURANG } : { a: AWAL_A, b: AWAL_B });
  const nyalaAwal = () => Object.fromEntries(SEMUA_TAMPIL_CARA.map((k) => [k, NYALA_AWAL_CARA.includes(k)])) as Record<TampilCara, boolean>;

  const [op, setOp] = useState<Op>(awalOp);
  const [p, setP] = useState<Cara>(() => awalP(awalOp));
  const [lihatMentah, setLihat] = useState<Record<TampilCara, boolean>>(nyalaAwal);
  const [caraGaris, setCaraGaris] = useState<CaraGaris>("mundur");

  const lihat = (k: TampilCara) => tampil.includes(k) && lihatMentah[k] && (k !== "selisih" || op === "kurang");
  const fGaris = lihat("garis");
  const fPasangan = lihat("pasangan");
  const fSusun = lihat("susun");
  const fSelisih = lihat("selisih");
  const fPeriksa = lihat("periksa");
  const fPas = fGaris && op === "kurang" && caraGaris === "pas";

  const hops = fPas ? rencanaPas(p) : rencanaGaris(p, op);
  const hasil = hasilCara(p, op);
  const cat = catatanSusun(p, op);
  const A = urai(p.a);
  const B = urai(p.b);
  const H = hasilKolom(p, op);
  const warna = op === "tambah" || fPas ? BIRU : MERAH;
  const kel = keluargaBilangan(p, op);
  const coba = langkahCoba(tampil, ops);

  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  useEffect(() => {
    lapor.current?.({ alat: "cara", op, a: p.a, b: p.b, garis: fGaris, pasangan: fPasangan, susun: fSusun, selisih: fSelisih, periksa: fPeriksa, pas: fPas });
  }, [op, p.a, p.b, fGaris, fPasangan, fSusun, fSelisih, fPeriksa, fPas]);

  const gantiOp = (o: Op) => {
    setOp(o);
    setP(rapikan(p, o));
  };

  const resetSemua = () => {
    setOp(awalOp);
    setP(awalP(awalOp));
    setLihat(nyalaAwal());
    setCaraGaris("mundur");
  };

  const toggel = tampil.filter((k) => k !== "selisih" || op === "kurang");
  const semuaOp = ops.length > 1;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{semuaOp ? "Laboratorium Cara Hitung" : "Laboratorium Cara Hitung · Penjumlahan"}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {tampil.length > 3 ? "Satu hitungan, banyak cara. Lihat semuanya berubah bersama." : "Satu hitungan, tiga cara. Lihat garis, pasangan, dan bersusun berubah bersama."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan hitungan ini" onClick={() => speakGuru(ejaHitung(ucapanCara(p, op)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        {semuaOp ? (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih operasi">
            <Pilihan aktif={op === "tambah"} onKlik={() => gantiOp("tambah")}>
              Tambah
            </Pilihan>
            <Pilihan aktif={op === "kurang"} onKlik={() => gantiOp("kurang")}>
              Kurang
            </Pilihan>
          </div>
        ) : null}
        <Pengatur
          nama="Bilangan pertama"
          nilai={p.a}
          onKurang={() => setP(rapikan({ a: p.a - 1, b: p.b }, op))}
          onTambah={() => setP(rapikan({ a: p.a + 1, b: p.b }, op))}
          kurangMati={p.a <= 0}
          tambahMati={p.a >= MAKS}
        />
        <Pengatur
          nama="Bilangan kedua"
          nilai={p.b}
          warna="#DBEAFE"
          onKurang={() => setP(rapikan({ a: p.a, b: p.b - 1 }, op))}
          onTambah={() => setP(rapikan({ a: p.a, b: p.b + 1 }, op))}
          kurangMati={p.b <= 0}
          tambahMati={p.b >= batasOperan(p.a, op)}
        />
        <KalimatBesar teks={kalimatCara(p, op)} warna="bg-[#FFE566]" />
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          {toggel.map((k) => (
            <Cek key={k} aktif={lihatMentah[k]} onKlik={() => setLihat((x) => ({ ...x, [k]: !x[k] }))}>
              {LABEL[k]}
            </Cek>
          ))}
          <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      {fGaris ? (
        <div className={`${KARTU} space-y-2`}>
          {op === "kurang" ? (
            <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Cara menghitung di garis">
              <Pilihan aktif={caraGaris === "mundur"} onKlik={() => setCaraGaris("mundur")}>
                Hitung mundur
              </Pilihan>
              <Pilihan aktif={caraGaris === "pas"} onKlik={() => setCaraGaris("pas")}>
                Tambah sampai pas
              </Pilihan>
            </div>
          ) : null}
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            {fPas ? `Dari ${p.b} maju sampai ${p.a}` : op === "tambah" ? "Menghitung maju" : "Menghitung mundur"} • {hops.length} lompatan
          </p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan ${kalimatCara(p, op)}`}
            sorot={[10, fPas ? p.b : p.a, fPas ? p.a : hasil]}
            penanda={
              fPas
                ? [
                    { n: p.b, warna: MERAH },
                    { n: p.a, warna: HIJAU },
                  ]
                : [
                    { n: p.a, warna: MERAH },
                    { n: hasil, warna: HIJAU },
                  ]
            }
            lompatan={hops.map((h) => ({ dari: h.dari, ke: h.ke, warna, label: h.label }))}
          />
          {fPas ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              {hops.length} lompatan maju, jadi selisih {p.a} dan {p.b} adalah {hasil}
            </p>
          ) : null}
        </div>
      ) : null}

      {fSelisih ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangkan satu-satu</p>
          <BarisSelisih a={p.a} b={p.b} />
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {p.b} titik berpasangan. Yang tidak berpasangan ada {p.a - p.b}, itulah selisihnya.
          </p>
        </div>
      ) : null}

      {fPasangan ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangan bilangan</p>
          {op === "tambah" ? <BaganPasangan total={hasil} a={p.a} b={p.b} tanda="+" /> : <BaganPasangan total={p.a} a={hasil} b={p.b} tanda="−" />}
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {op === "tambah" ? `${hasil} terdiri dari ${p.a} dan ${p.b}` : `${p.a} dipecah menjadi ${hasil} dan ${p.b}`}
          </p>
        </div>
      ) : null}

      {fSusun ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bersusun (nilai tempat)</p>
          <div className="mx-auto grid w-full max-w-[240px] grid-cols-2 overflow-hidden rounded-xl border-4 border-[#1C01A5]" role="table" aria-label="Bersusun nilai tempat">
            <p role="columnheader" className="bg-[#FEE2E2] py-1 text-center text-sm font-black text-[#7F1D1D]">
              Puluhan
            </p>
            <p role="columnheader" className="bg-[#DBEAFE] py-1 text-center text-sm font-black text-[#1E3A8A]">
              Satuan
            </p>
            <p role="cell" className="border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
              {A.puluhan || ""}
            </p>
            <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] py-1 text-center text-2xl font-black text-blue-700">
              {A.satuan}
            </p>
            <p role="cell" className="border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
              {op === "tambah" ? "+" : "−"}
              {B.puluhan || ""}
            </p>
            <p role="cell" className="border-l-4 border-t-2 border-[#1C01A5]/40 py-1 text-center text-2xl font-black text-blue-700">
              {B.satuan}
            </p>
            <p role="cell" className="border-t-4 border-[#1C01A5] bg-[#E8F7EE] py-1 text-center text-3xl font-black text-green-700">
              {H.puluhan || "0"}
            </p>
            <p role="cell" className="border-l-4 border-t-4 border-[#1C01A5] bg-[#E8F7EE] py-1 text-center text-3xl font-black text-green-700">
              {H.satuan}
            </p>
          </div>
          {cat.jenis === "simpan" ? (
            <p role="status" className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              +1 simpan di puluhan · {cat.teks}
            </p>
          ) : cat.jenis === "urai" ? (
            <p role="status" className="rounded-xl bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
              −1 urai dari puluhan · {cat.teks}
            </p>
          ) : (
            <p role="status" className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
              {cat.teks}
            </p>
          )}
        </div>
      ) : null}

      {fPeriksa ? (
        <div className={`${KARTU} space-y-2`}>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Periksa dengan {op === "kurang" ? "penjumlahan" : "pengurangan"}</p>
            <TombolSuaraGuru kecil label="Dengarkan pemeriksaan" onClick={() => speakGuru(ejaHitung(ucapanPeriksa(p, op)))} />
          </div>
          <KalimatBesar teks={kalimatPeriksa(p, op)} warna="bg-[#E8F7EE]" />
          <p className="text-center text-xs font-black text-[#1C01A5]/70">
            Keluarga bilangan {kel.x}, {kel.y}, dan {kel.total}:
          </p>
          <ul className="flex flex-wrap justify-center gap-1.5">
            {kalimatKeluarga(kel).map((s) => (
              <li key={s} className="rounded-full bg-[#F5F3FF] px-2.5 py-0.5 text-sm font-black text-[#1C01A5]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(ejaHitung(`Coba ini. ${coba.map((l, i) => `${NOMOR[i]}, ${l}`).join(" ")}`))}
        langkah={coba}
      />
    </div>
  );
}
