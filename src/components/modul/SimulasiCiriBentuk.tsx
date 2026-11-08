"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { Pengatur } from "./komponen-lab";
import { BENTUK, SKALA_MAKS, SKALA_MIN, SUSUNAN, bentukDari, ciriBentuk, poseAwal, putar90, ubahSkala, ucapanCiri, type IdBentuk, type Pose } from "./lab-ciri-bab4";

/* ------------------------------------------------------------------------ */
/* Simulasi 2 (Bab 4): Laboratorium Ciri Bentuk, metode PhET.                 */
/* Putar dan besarkan bentuk: ciri tetap. Susun bagian: lahir bentuk baru.    */
/* Logika di lab-ciri-bab4.ts. Tanpa jaringan.                                */
/* ------------------------------------------------------------------------ */

type Sisi = { d: string; lengkung: boolean; label: [number, number] };
type Rupa = { sisi: Sisi[]; sudut: [number, number][]; isi: string };

const RUPA: Record<IdBentuk, Rupa> = {
  persegi: {
    isi: "M70 50 H130 V110 H70 Z",
    sisi: [
      { d: "M70 50 H130", lengkung: false, label: [100, 41] },
      { d: "M130 50 V110", lengkung: false, label: [140, 80] },
      { d: "M130 110 H70", lengkung: false, label: [100, 124] },
      { d: "M70 110 V50", lengkung: false, label: [60, 80] },
    ],
    sudut: [
      [70, 50],
      [130, 50],
      [130, 110],
      [70, 110],
    ],
  },
  "persegi-panjang": {
    isi: "M50 55 H150 V105 H50 Z",
    sisi: [
      { d: "M50 55 H150", lengkung: false, label: [100, 46] },
      { d: "M150 55 V105", lengkung: false, label: [161, 80] },
      { d: "M150 105 H50", lengkung: false, label: [100, 119] },
      { d: "M50 105 V55", lengkung: false, label: [39, 80] },
    ],
    sudut: [
      [50, 55],
      [150, 55],
      [150, 105],
      [50, 105],
    ],
  },
  segitiga: {
    isi: "M100 38 L150 115 L50 115 Z",
    sisi: [
      { d: "M100 38 L150 115", lengkung: false, label: [135, 71] },
      { d: "M150 115 H50", lengkung: false, label: [100, 130] },
      { d: "M50 115 L100 38", lengkung: false, label: [65, 71] },
    ],
    sudut: [
      [100, 38],
      [150, 115],
      [50, 115],
    ],
  },
  lingkaran: {
    isi: "M100 46 A34 34 0 1 1 99.9 46 Z",
    sisi: [{ d: "M100 46 A34 34 0 1 1 99.9 46", lengkung: true, label: [100, 36] }],
    sudut: [],
  },
  "setengah-lingkaran": {
    isi: "M52 105 A48 48 0 0 1 148 105 Z",
    sisi: [
      { d: "M52 105 H148", lengkung: false, label: [100, 120] },
      { d: "M148 105 A48 48 0 0 0 52 105", lengkung: true, label: [100, 48] },
    ],
    sudut: [
      [52, 105],
      [148, 105],
    ],
  },
};

const WARNA_SISI = ["#EF4444", "#2563EB", "#16A34A", "#F59E0B"];

export default function SimulasiCiriBentuk({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [id, setId] = useState<IdBentuk>("persegi");
  const [pose, setPose] = useState<Pose>(poseAwal);
  const [tampil, setTampil] = useState({ sisi: true, sudut: true });
  const [susun, setSusun] = useState(0);
  const [gabung, setGabung] = useState(false);

  const b = bentukDari(id);
  const rupa = RUPA[id];
  const c = ciriBentuk(id);
  const skala = 0.55 + pose.skala * 0.25;
  const s = SUSUNAN[susun];

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Ciri Bentuk</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Putar dan besarkan bentuknya. Lihat apa yang tetap sama.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bentuk ini" onClick={() => speakGuru(ucapanCiri(id, pose))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bentuk">
          {BENTUK.map((x) => (
            <Pilihan key={x.id} aktif={id === x.id} onKlik={() => setId(x.id)}>
              {x.nama}
            </Pilihan>
          ))}
        </div>
        <svg viewBox="0 0 200 150" className="mx-auto block w-full max-w-[340px] rounded-2xl bg-[#F5F3FF]" role="img" aria-label={`${b.nama}, diputar ${pose.putar} derajat, ukuran ${pose.skala}`}>
          <g transform={`translate(100 78) rotate(${pose.putar}) scale(${skala}) translate(-100 -78)`} style={{ transition: "transform 0.4s" }}>
            <path d={rupa.isi} fill="#FDE68A" stroke="#1C01A5" strokeWidth={tampil.sisi ? 1 : 4} strokeLinejoin="round" />
            {tampil.sisi
              ? rupa.sisi.map((x, i) => (
                  <g key={i}>
                    <path d={x.d} fill="none" stroke={x.lengkung ? "#7C3AED" : WARNA_SISI[i % WARNA_SISI.length]} strokeWidth={5 / skala} strokeLinecap="round" />
                    <g transform={`rotate(${-pose.putar} ${x.label[0]} ${x.label[1]})`}>
                      <text x={x.label[0]} y={x.label[1] + 4} textAnchor="middle" fontSize={14 / skala} fontWeight="900" fill={x.lengkung ? "#7C3AED" : WARNA_SISI[i % WARNA_SISI.length]}>
                        {x.lengkung ? "lengkung" : i + 1}
                      </text>
                    </g>
                  </g>
                ))
              : null}
            {tampil.sudut
              ? rupa.sudut.map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={6 / skala} fill="#FFE566" stroke="#1C01A5" strokeWidth={2 / skala} />
                ))
              : null}
          </g>
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Cek aktif={tampil.sisi} onKlik={() => setTampil((x) => ({ ...x, sisi: !x.sisi }))}>
            Tampilkan sisi
          </Cek>
          <Cek aktif={tampil.sudut} onKlik={() => setTampil((x) => ({ ...x, sudut: !x.sudut }))}>
            Tampilkan sudut
          </Cek>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setPose(putar90(pose))}>
            🔄 Putar 90°
          </button>
        </div>
        <Pengatur nama="Ukuran" nilai={pose.skala} onKurang={() => setPose(ubahSkala(pose, -1))} onTambah={() => setPose(ubahSkala(pose, 1))} kurangMati={pose.skala <= SKALA_MIN} tambahMati={pose.skala >= SKALA_MAKS} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Ciri {b.nama.toLowerCase()}</p>
        <div className="grid grid-cols-3 gap-1.5 text-center">
          <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sisi lurus<br /><span className="text-2xl">{c.sisiLurus}</span></p>
          <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sisi lengkung<br /><span className="text-2xl">{c.sisiLengkung}</span></p>
          <p className="rounded-xl bg-[#F5F3FF] px-1 py-1.5 text-sm font-black text-[#1C01A5]">Sudut<br /><span className="text-2xl">{c.sudut}</span></p>
        </div>
        <p className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">Diputar atau dibesarkan, ciri bentuk tetap sama.</p>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Menyusun bentuk</p>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih susunan">
          {SUSUNAN.map((x, i) => (
            <Pilihan
              key={x.id}
              aktif={susun === i}
              onKlik={() => {
                setSusun(i);
                setGabung(false);
              }}
            >
              {x.judul}
            </Pilihan>
          ))}
        </div>
        <svg viewBox="0 0 120 80" className="mx-auto block w-full max-w-[320px] rounded-2xl bg-[#F5F3FF]" role="img" aria-label={gabung ? `Hasil susunan: ${bentukDari(s.hasil).nama}` : `Bagian susunan: ${s.judul}`}>
          {s.bagian.map((p, i) => (
            <path key={i} d={p.d} fill={p.warna} stroke="#1C01A5" strokeWidth="1.4" strokeLinejoin="round" style={{ transform: gabung ? "translate(0px, 0px)" : `translate(${p.dx}px, ${p.dy}px)`, transition: "transform 0.5s" }} />
          ))}
        </svg>
        <div className="flex justify-center">
          <Cek aktif={gabung} onKlik={() => setGabung((x) => !x)}>
            Gabungkan bagian
          </Cek>
        </div>
        <p role="status" className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">
          {gabung ? `${s.kalimat} Hasilnya: ${bentukDari(s.hasil).nama.toLowerCase()}.` : `Ada ${s.bagian.length} bagian. Gabungkan untuk melihat bentuk barunya.`}
        </p>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, pilih persegi lalu tekan putar sembilan puluh derajat. Apakah jumlah sisinya berubah? Dua, besarkan ukurannya. Apakah jumlah sudutnya berubah? Tiga, pilih dua segitiga, lalu tekan gabungkan bagian. Bentuk apa yang lahir?"
          )
        }
        langkah={[
          "Pilih persegi, lalu tekan Putar 90°. Apakah jumlah sisinya berubah?",
          "Besarkan ukurannya. Apakah jumlah sudutnya berubah?",
          "Pilih 2 segitiga, lalu tekan Gabungkan bagian. Bentuk apa yang lahir?",
        ]}
      />
    </div>
  );
}
