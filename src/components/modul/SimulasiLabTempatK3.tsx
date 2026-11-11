"use client";

import React, { useEffect, useReducer } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur } from "./komponen-lab";
import { AngkaBerwarna, ModelTiga, WARNA_TEMPAT } from "./diagram-k3b1";
import {
  REP_TEMPAT,
  awalTempat,
  digitDari,
  ejaK3,
  kalimatTempat,
  kataBilangan,
  kataRelasiTempat,
  keadaanTempat,
  langkahTempat,
  nilaiTempat,
  rapiTempat,
  relasiTempat,
  tempatBeda,
  uraiBilangan,
  type KeadaanTempat,
  type RepTempat,
  type StateTempat,
  type Tempat,
} from "./lab-tempat-k3b1";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B1 Sub-Bab A, B, C): Lab Papan Tempat. PhET: satu model (tiga      */
/* tempat), banyak perwakilan (blok, angka, kata, garis, nilai, banding).         */
/* Logika: lab-tempat-k3b1.ts. Tanpa skor, tanpa waktu.                           */
/* ------------------------------------------------------------------------ */

type Huruf = "A" | "B" | "C";

const NAMA_REP: Record<RepTempat, string> = { kata: "Kata (baca)", garis: "Garis bilangan", nilai: "Nilai tiap angka", banding: "Banding dua bilangan" };
const TEMPAT: { id: Tempat; nama: string; kunci: "ratusan" | "puluhan" | "satuan" }[] = [
  { id: "r", nama: "Ratusan", kunci: "ratusan" },
  { id: "p", nama: "Puluhan", kunci: "puluhan" },
  { id: "s", nama: "Satuan", kunci: "satuan" },
];

const CATATAN: Record<Huruf, string[]> = {
  A: [
    "Buat 703. Mengapa nol tetap ditulis walau tidak disebut?",
    "Tambah satuan sampai sepuluh, lalu tukar. Apa yang terjadi pada papan?",
    "Nyalakan Garis. 160 dan 671 ada di antara ratusan yang mana?",
  ],
  B: [
    "Nyalakan Nilai, lalu buat 600, 60, dan 6. Apa yang sama dan apa yang berbeda?",
    "Buat 251, lalu 215. Angkanya sama. Apa yang berbeda?",
    "Tukar 10 puluhan menjadi 1 ratusan. Apakah nilainya berubah?",
  ],
  C: [
    "Buat 421 dan 412. Tempat mana yang menentukan?",
    "Samakan ratusannya. Sekarang tempat mana yang menentukan?",
    "Buat dua bilangan yang persis sama. Apa tandanya?",
  ],
};

/** Garis bilangan 0 sampai 1000 dengan penanda di n dan selang ratusan yang memuatnya. */
function GarisRatusan({ n }: { n: number }) {
  const W = 330;
  const x = (v: number) => 12 + (v * (W - 24)) / 1000;
  const bawah = Math.min(Math.floor(n / 100) * 100, 900);
  return (
    <svg viewBox={`0 0 ${W} 74`} className="mx-auto block w-full max-w-md" role="img" aria-label={`Garis bilangan: ${n} berada di antara ${bawah} dan ${bawah + 100}`}>
      <rect x={x(bawah)} y="22" width={x(bawah + 100) - x(bawah)} height="14" rx="4" fill="#FFE566" opacity="0.8" />
      <line x1={x(0)} y1="29" x2={x(1000)} y2="29" stroke="#1C01A5" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 101 }, (_, i) => i * 10).map((v) => (
        <line key={v} x1={x(v)} x2={x(v)} y1={v % 100 === 0 ? 22 : 26} y2={v % 100 === 0 ? 36 : 32} stroke="#1C01A5" strokeWidth={v % 100 === 0 ? 2 : 1} opacity={v % 100 === 0 ? 1 : 0.45} />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 100).map((v) => (
        <text key={v} x={x(v)} y="52" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1C01A5">
          {v}
        </text>
      ))}
      <g>
        <circle cx={x(n)} cy="29" r="7" fill="#F0AB00" stroke="#1C01A5" strokeWidth="2.5" />
        <text x={x(n)} y="16" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1C01A5" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">
          {n}
        </text>
      </g>
      <text x={W / 2} y="70" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1C01A5">
        {`Di antara ${bawah} dan ${bawah + 100}`}
      </text>
    </svg>
  );
}

export default function SimulasiLabTempatK3({ mode, speakGuru, onKeadaan }: { mode: Huruf; speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTempat) => void }) {
  const [x, kirim] = useReducer(langkahTempat, undefined, awalTempat);
  const n = nilaiTempat(x);
  const rapi = rapiTempat(x);
  const m = nilaiTempat(x.m);
  const rep = REP_TEMPAT[mode];

  useEffect(() => {
    onKeadaan?.(keadaanTempat(x));
  }, [onKeadaan, x]);

  const nyala = (r: RepTempat) => x.tampil[r];
  const d = digitDari(n);
  const dm = digitDari(m);
  const beda = tempatBeda(n, m);
  const kunciBeda = { ratusan: "r", puluhan: "p", satuan: "s" } as const;

  const ucap = (): string => {
    if (!rapi) return "Papan belum rapi. Tukar dulu sepuluh satuan menjadi satu puluhan, atau sepuluh puluhan menjadi satu ratusan.";
    if (n === 0) return "Papan masih kosong. Tambahkan blok dulu.";
    let s = `${kataBilangan(n)}. ${ejaK3(`${x.r} ratusan, ${x.p} puluhan, ${x.s} satuan`)}.`;
    if (nyala("nilai")) s += ` ${ejaK3(`${n} = ${uraiBilangan(n)}`)}.`;
    if (nyala("banding")) {
      s += beda === "sama" ? ` ${kataBilangan(n)} sama dengan ${kataBilangan(m)}. Semua tempatnya sama.` : ` ${kataBilangan(n)} ${kataRelasiTempat(n, m)} ${kataBilangan(m)}. Tempat ${beda} yang pertama berbeda.`;
    }
    return s;
  };

  const kalimatBanding = () => {
    if (!rapi) return "Rapikan papan dulu supaya bisa dibandingkan.";
    if (beda === "sama") return "Semua tempat sama, jadi kedua bilangan sama besar.";
    const a = d[kunciBeda[beda]];
    const b = dm[kunciBeda[beda]];
    return `Mulai dari kiri. Tempat ${beda} yang pertama berbeda: ${a} dan ${b}. Karena ${a} ${a > b ? "lebih dari" : "kurang dari"} ${b}, maka ${n} ${kataRelasiTempat(n, m)} ${m}.`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Papan Tempat</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Atur blok di tiga tempat. Tukar sepuluh jadi satu. Nyalakan tampilan yang kamu mau.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bacaan papan" onClick={() => speakGuru(ucap())} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="grid gap-2">
          {TEMPAT.map((t) => (
            <Pengatur
              key={t.id}
              nama={t.nama}
              nilai={x[t.id]}
              warna={WARNA_TEMPAT[t.kunci].isi}
              kurangMati={false}
              tambahMati={false}
              kurangLabel={`Kurangi ${t.nama.toLowerCase()}`}
              tambahLabel={`Tambah ${t.nama.toLowerCase()}`}
              onKurang={() => kirim({ t: "UBAH", tempat: t.id, d: -1 })}
              onTambah={() => kirim({ t: "UBAH", tempat: t.id, d: 1 })}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Tukar sepuluh dengan satu">
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TUKAR_NAIK", dari: "s" })}>
            Tukar 10 satuan → 1 puluhan
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TUKAR_NAIK", dari: "p" })}>
            Tukar 10 puluhan → 1 ratusan
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TUKAR_TURUN", dari: "p" })}>
            Pecah 1 puluhan → 10 satuan
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "TUKAR_TURUN", dari: "r" })}>
            Pecah 1 ratusan → 10 puluhan
          </button>
        </div>

        <div className="flex min-h-24 items-center justify-center rounded-2xl bg-indigo-50/60 p-2" aria-live="polite">
          {n === 0 ? <p className="text-sm font-bold text-[#1C01A5]/60">Papan kosong. Tekan + untuk menambah blok.</p> : <ModelTiga r={x.r} p={x.p} s={x.s} skala={0.9} />}
        </div>

        {rapi ? (
          <div className="flex items-center justify-center gap-3">
            <AngkaBerwarna n={n} ukuran="text-5xl" />
          </div>
        ) : null}
        <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
          {x.pesan ? `⛔ ${x.pesan}` : !rapi ? `🔧 ${kalimatTempat(x)}` : "🔧 Papan rapi. Tiap tempat paling banyak 9."}
        </p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
          {rep.map((r) => (
            <Cek key={r} aktif={nyala(r)} onKlik={() => kirim({ t: "TOGGLE", rep: r })}>
              {NAMA_REP[r]}
            </Cek>
          ))}
        </div>

        {nyala("kata") ? (
          <div className="space-y-1.5">
            {rapi && n > 0 ? <KalimatBesar teks={`${n} dibaca ${kataBilangan(n)}`} /> : <KalimatBesar teks={rapi ? "Papan kosong" : "Papan belum rapi"} warna="bg-[#F5F3FF]" />}
            {rapi && n > 0 && (d.p === 0 || d.s === 0) ? (
              <p className="text-center text-xs font-bold text-[#1C01A5]/80">Angka nol tidak disebut saat dibaca, tetapi tetap ditulis supaya angka lain tidak bergeser.</p>
            ) : null}
          </div>
        ) : null}

        {nyala("nilai") ? (
          <div className="space-y-1.5 rounded-2xl bg-[#F5F3FF] p-2">
            {rapi ? (
              <>
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  {TEMPAT.map((t) => (
                    <div key={t.id} className="rounded-xl border-2 border-[#1C01A5]/30 px-1 py-1" style={{ backgroundColor: WARNA_TEMPAT[t.kunci].isi }}>
                      <p className="text-[10px] font-black uppercase" style={{ color: WARNA_TEMPAT[t.kunci].teks }}>
                        {t.nama}
                      </p>
                      <p className="text-sm font-black text-[#1C01A5]">
                        angka {x[t.id]} → nilai {x[t.id] * (t.id === "r" ? 100 : t.id === "p" ? 10 : 1)}
                      </p>
                    </div>
                  ))}
                </div>
                <KalimatBesar teks={`${n} = ${uraiBilangan(n)}`} />
              </>
            ) : (
              <p className="text-center text-sm font-bold text-[#1C01A5]">Rapikan papan dulu supaya nilai tiap angka jelas.</p>
            )}
          </div>
        ) : null}

        {nyala("garis") ? rapi ? <GarisRatusan n={n} /> : <p className="text-center text-sm font-bold text-[#1C01A5]">Rapikan papan dulu supaya letaknya di garis jelas.</p> : null}

        {nyala("banding") ? (
          <div className="space-y-2 rounded-2xl border-2 border-dashed border-[#F0AB00] bg-[#FFFDF2] p-2">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bilangan pembanding</p>
            <div className="grid gap-2">
              {TEMPAT.map((t) => (
                <Pengatur
                  key={t.id}
                  nama={`${t.nama} pembanding`}
                  nilai={x.m[t.id]}
                  warna={WARNA_TEMPAT[t.kunci].isi}
                  kurangMati={false}
                  tambahMati={false}
                  kurangLabel={`Kurangi ${t.nama.toLowerCase()} pembanding`}
                  tambahLabel={`Tambah ${t.nama.toLowerCase()} pembanding`}
                  onKurang={() => kirim({ t: "UBAH_M", tempat: t.id, d: -1 })}
                  onTambah={() => kirim({ t: "UBAH_M", tempat: t.id, d: 1 })}
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-3" role="img" aria-label={`${n} ${kataRelasiTempat(n, m)} ${m}`}>
              <AngkaBerwarna n={rapi ? n : 0} ukuran="text-4xl" />
              <span className="rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-3xl font-black text-[#1C01A5]">{relasiTempat(n, m)}</span>
              <AngkaBerwarna n={m} ukuran="text-4xl" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <ModelTiga r={x.r} p={Math.min(x.p, 9)} s={Math.min(x.s, 9)} skala={0.45} />
              <ModelTiga r={x.m.r} p={x.m.p} s={x.m.s} skala={0.45} />
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatBanding()}</p>
          </div>
        ) : null}

        <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "RESET" })}>
          🔁 Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() => speakGuru(`Coba ini. ${CATATAN[mode].map((c, i) => `${["Satu", "Dua", "Tiga"][i]}, ${ejaK3(c)}`).join(" ")}`)}
        langkah={CATATAN[mode]}
      />
    </div>
  );
}

export type { StateTempat };
