"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { BIRU, EMAS, GarisAngka, HIJAU, KalimatBesar, MERAH, Pengatur, ejaHitung } from "./komponen-lab";
import { MAKS, batasOperan, catatanLoncat, hasilLoncat, kalimatLoncat, rapikan, rencana, ucapanLoncat, type Loncat, type Op, type Strategi } from "./lab-loncat-bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 6): Laboratorium Garis Bilangan Loncat, metode PhET.       */
/* Tambah, kurang, dan selisih sebagai lompatan; dua cara meloncat.           */
/* Logika di lab-loncat-bab6.ts. Tanpa jaringan.                              */
/* ------------------------------------------------------------------------ */

const NAMA_OP: Record<Op, string> = { tambah: "Tambah", kurang: "Kurang", selisih: "Selisih" };

const SEMUA_OP: Op[] = ["tambah", "kurang", "selisih"];

/** Pasangan bilangan awal tiap operasi, supaya sesuai cerita sub-bab yang memakainya. */
const AWAL_LONCAT: Record<Op, Loncat> = { tambah: { a: 8, b: 5 }, kurang: { a: 15, b: 3 }, selisih: { a: 7, b: 9 } };

function langkahCoba(op: Op, ops: Op[]): string[] {
  if (ops.length > 1) {
    return [
      "Pilih Tambah 8 dan 5. Bandingkan loncat satu-satu dengan lewat sepuluh. Mana yang lebih sedikit lompatannya?",
      "Pilih Kurang. Mulai dari 15, loncat mundur 6.",
      "Pilih Selisih. Atur dua bilangan, lalu lihat jaraknya.",
    ];
  }
  if (op === "selisih") {
    return [
      "Atur bilangan pertama 7 dan bilangan kedua 9. Berapa langkah dari 7 ke 9?",
      "Tukar angkanya: bilangan pertama 9 dan kedua 7. Apakah jaraknya berubah?",
      "Buat dua bilangan sama besar. Berapa selisihnya?",
    ];
  }
  if (op === "tambah") {
    return [
      "Atur Mulai dari 8 dan Loncat maju 5. Bandingkan loncat satu-satu dengan lewat sepuluh. Mana yang lebih sedikit lompatannya?",
      "Atur Mulai dari 12 dan Loncat maju 3. Apakah lompatannya melewati 10?",
    ];
  }
  return [
    "Atur Mulai dari 15 dan Loncat mundur 3. Berapa lompatan mundur satu-satu?",
    "Atur Mulai dari 15 dan Loncat mundur 6. Bandingkan loncat satu-satu dengan lewat sepuluh.",
  ];
}

export default function SimulasiLoncat({ speakGuru, ops = SEMUA_OP }: { speakGuru: (t: string) => void; ops?: Op[] }) {
  const [op, setOp] = useState<Op>(ops[0]);
  const [strategi, setStrategi] = useState<Strategi>("sepuluh");
  const [p, setP] = useState<Loncat>(AWAL_LONCAT[ops[0]]);
  const coba = langkahCoba(op, ops);
  const judul = ops.length > 1 ? "Laboratorium Garis Bilangan Loncat" : op === "selisih" ? "Selisih di Garis Bilangan" : op === "tambah" ? "Loncat Menjumlah" : "Loncat Mengurang";
  const reset = () => {
    setOp(ops[0]);
    setStrategi("sepuluh");
    setP(AWAL_LONCAT[ops[0]]);
  };

  const hops = rencana(p, op, strategi);
  const hasil = hasilLoncat(p, op);
  const warna = op === "tambah" ? BIRU : op === "kurang" ? MERAH : EMAS;
  const ganti = (o: Op) => {
    setOp(o);
    setP(rapikan(p, o));
  };
  const satu = rencana(p, op, "satuan").length;
  const sepuluh = rencana(p, op, "sepuluh").length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">{judul}</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">{ops.length > 1 ? "Pilih tambah, kurang, atau selisih. Lihat lompatannya di garis bilangan." : "Atur bilangannya. Lihat lompatannya di garis bilangan."}</p>
        </div>
        <TombolSuaraGuru label="Dengarkan lompatan ini" onClick={() => speakGuru(ejaHitung(ucapanLoncat(p, op, strategi)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        {ops.length > 1 ? (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih operasi">
            {ops.map((o) => (
              <Pilihan key={o} aktif={op === o} onKlik={() => ganti(o)}>
                {NAMA_OP[o]}
              </Pilihan>
            ))}
          </div>
        ) : null}
        <Pengatur
          nama={op === "selisih" ? "Bilangan pertama" : "Mulai dari"}
          nilai={p.a}
          onKurang={() => setP(rapikan({ ...p, a: p.a - 1 }, op))}
          onTambah={() => setP(rapikan({ ...p, a: p.a + 1 }, op))}
          kurangMati={p.a <= 0}
          tambahMati={p.a >= MAKS}
        />
        <Pengatur
          nama={op === "selisih" ? "Bilangan kedua" : op === "tambah" ? "Loncat maju" : "Loncat mundur"}
          nilai={p.b}
          warna="#DBEAFE"
          onKurang={() => setP(rapikan({ ...p, b: p.b - 1 }, op))}
          onTambah={() => setP(rapikan({ ...p, b: p.b + 1 }, op))}
          kurangMati={p.b <= 0}
          tambahMati={p.b >= batasOperan(p.a, op)}
        />
        {op !== "selisih" ? (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Cara meloncat">
            <Pilihan aktif={strategi === "satuan"} onKlik={() => setStrategi("satuan")}>
              Loncat satu-satu
            </Pilihan>
            <Pilihan aktif={strategi === "sepuluh"} onKlik={() => setStrategi("sepuluh")}>
              Loncat lewat sepuluh
            </Pilihan>
          </div>
        ) : null}
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset semua
          </button>
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan 0 sampai 20</p>
        <GarisAngka
          maks={MAKS}
          nama={`Garis bilangan 0 sampai 20: ${kalimatLoncat(p, op)}`}
          sorot={[10]}
          lompatan={hops.map((h) => ({ dari: h.dari, ke: h.ke, warna, label: h.label }))}
          penanda={op === "selisih" ? [{ n: p.a, warna: MERAH }, { n: p.b, warna: BIRU }] : [{ n: p.a, warna: MERAH }, ...(p.b > 0 ? [{ n: hasil, warna: HIJAU }] : [])]}
        />
        {op !== "selisih" ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Lingkaran emas besar menandai 10, jembatan di tengah garis.</p> : <p className="text-center text-xs font-bold text-[#1C01A5]/70">Titik merah dan biru menandai kedua bilangan. Panah emas adalah jaraknya.</p>}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Kalimat dan catatan lompatan</p>
        <KalimatBesar teks={kalimatLoncat(p, op)} warna="bg-[#FFE566]" />
        {hops.length > 0 ? <p className="text-center text-sm font-black text-[#1C01A5]">{catatanLoncat(hops)}</p> : <p className="text-center text-sm font-black text-[#1C01A5]/60">{op === "selisih" ? "Kedua bilangan sama besar, jadi selisihnya 0." : "Belum ada lompatan."}</p>}
        {op === "selisih" ? (
          <p className="text-center text-sm font-black text-[#14532D]">Selisih adalah jarak antara dua bilangan di garis bilangan: {hasil}.</p>
        ) : (
          <p className="text-center text-sm font-black text-[#14532D]">
            Loncat satu-satu: {satu} lompatan. Lewat sepuluh: {sepuluh} lompatan.
          </p>
        )}
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(ejaHitung(`Coba ini. ${coba.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${c}`).join(" ")}`))}
        langkah={coba}
      />
    </div>
  );
}