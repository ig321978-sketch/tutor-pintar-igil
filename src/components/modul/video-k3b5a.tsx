"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Besar, ChipNilai, DaftarVideoCerita, DeretNilai, Emo, Orang, buatAdegan, type VideoSiap } from "./video-k3b5-umum";
import { SUB_A35 } from "./naskah-k3b5";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 5 Sub-Bab A: Mengurutkan dan Membandingkan Data.   */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk      */
/* Putar. Naskah satu sumber: naskah-k3b5.ts (SUB_A35.videos). Tanpa API.       */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_A35.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_A35.videos[v].adegan[a];

function A1_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Orang x={50} y={190} nama="halim" s={0.7} tampilNama={false} />
      <Orang x={150} y={190} nama="kira" s={0.7} tampilNama={false} />
      <Orang x={250} y={190} nama="malosi" s={0.7} tampilNama={false} />
      {k >= 1 ? (
        <Muncul>
          <Label x={30} y={50} w={80} teks="Calon A" ukuran={11} />
          <Label x={110} y={50} w={80} teks="Calon B" ukuran={11} />
          <Label x={190} y={50} w={80} teks="Calon C" ukuran={11} />
        </Muncul>
      ) : null}
      {k >= 2 ? <Emo x={150} y={110} e="🗳️" s={40} /> : null}
      {k === 3 ? (
        <Lompat>
          <Besar x={150} y={150} teks="suara terbanyak" ukuran={22} warna="#16A34A" />
        </Lompat>
      ) : null}
    </>
  );
}

function A1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {k === 0 ? <Besar x={150} y={110} teks="?" ukuran={80} warna="#B45309" /> : null}
      {k >= 1 ? (
        <Muncul>
          <ChipNilai x={70} y={90} n={8} />
          <ChipNilai x={150} y={90} n={12} aktif />
          <ChipNilai x={230} y={90} n={5} />
          <Label x={40} y={120} w={60} teks="A" ukuran={12} />
          <Label x={120} y={120} w={60} teks="B" ukuran={12} />
          <Label x={200} y={120} w={60} teks="C" ukuran={12} />
        </Muncul>
      ) : null}
      {k === 2 ? <Label x={60} y={160} w={180} teks="urutkan dan bandingkan" ukuran={12} /> : null}
      {k === 3 ? (
        <Lompat>
          <Besar x={150} y={168} teks="B paling banyak" ukuran={24} warna="#16A34A" />
        </Lompat>
      ) : null}
    </>
  );
}

function A1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <Besar x={150} y={90} teks="5  8  12" ukuran={36} />
      {k >= 1 ? <Sorot x={58} y={60} w={40} h={48} /> : null}
      {k >= 1 ? <Label x={40} y={130} w={100} teks="terkecil" ukuran={12} /> : null}
      {k >= 2 ? <Sorot x={200} y={60} w={50} h={48} /> : null}
      {k >= 2 ? <Label x={170} y={130} w={100} teks="terbesar" ukuran={12} /> : null}
      {k === 3 ? <Emo x={150} y={170} e="📊" s={36} /> : null}
    </>
  );
}

function A2_1({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Orang x={40} y={190} nama="halim" s={0.65} tampilNama={false} />
      {k >= 0 ? (
        <rect x="90" y="50" width="180" height="100" rx="12" fill="#FFFFFF" stroke="#1C01A5" strokeWidth="3" />
      ) : null}
      {k >= 1 ? (
        <Muncul>
          <text x="180" y="78" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1C01A5">
            Nama: Alen
          </text>
          <text x="180" y="104" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1C01A5">
            Anggota keluarga: 5
          </text>
        </Muncul>
      ) : null}
      {k >= 2 ? <Label x={100} y={160} w={160} teks="ringkasan data kelompok" ukuran={11} /> : null}
      {k === 3 ? (
        <Lompat>
          <Emo x={260} y={100} e="✅" s={28} />
        </Lompat>
      ) : null}
    </>
  );
}

function A2_2({ k }: PropsAdegan) {
  const nama = ["Alen", "Meutia", "Galih", "Alfa"];
  const n = [3, 7, 5, 7];
  const urut = k >= 1 ? [0, 2, 1, 3] : [0, 1, 2, 3];
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      {urut.map((i, pos) => (
        <g key={nama[i]} transform={`translate(${40 + pos * 60}, 70)`}>
          <rect x="0" y="0" width="52" height="70" rx="10" fill="#EEF2FF" stroke="#1C01A5" strokeWidth="2.2" />
          <text x="26" y="22" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1C01A5">
            {nama[i]}
          </text>
          <text x="26" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill="#B45309">
            {n[i]}
          </text>
        </g>
      ))}
      {k === 2 ? <Label x={70} y={160} w={160} teks="paling sedikit 3, paling banyak 7" ukuran={11} /> : null}
      {k === 3 ? <Besar x={150} y={178} teks="Meutia = Alfa" ukuran={22} warna="#16A34A" /> : null}
    </>
  );
}

function A2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Besar x={150} y={88} teks="7 − 3 = 4" ukuran={40} />
      {k === 0 ? <Label x={70} y={120} w={160} teks="selisih = jangkauan" ukuran={12} /> : null}
      {k >= 1 ? <Label x={50} y={130} w={200} teks="terbesar dikurangi terkecil" ukuran={12} /> : null}
      {k >= 2 ? <Emo x={150} y={168} e="📏" s={36} /> : null}
      {k === 3 ? (
        <Lompat>
          <Besar x={150} y={178} teks="jangkauan = 4" ukuran={24} warna="#16A34A" />
        </Lompat>
      ) : null}
    </>
  );
}

function A3_1({ k }: PropsAdegan) {
  const data = [9, 9, 7, 8, 6, 10, 5, 9, 8, 7];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      <Orang x={30} y={190} nama="kira" s={0.65} tampilNama={false} />
      {k >= 1 ? <DeretNilai x={70} y={70} data={data} /> : null}
      {k >= 2 ? <Label x={80} y={140} w={160} teks="20 data nilai ulangan" ukuran={11} /> : null}
      {k === 3 ? <Besar x={180} y={178} teks="urutkan dulu" ukuran={22} warna="#B45309" /> : null}
    </>
  );
}

function A3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <Besar x={150} y={70} teks="5 6 7 8 9 10" ukuran={28} />
      {k >= 1 ? (
        <>
          <Sorot x={48} y={48} w={28} h={36} />
          <Sorot x={220} y={48} w={40} h={36} />
        </>
      ) : null}
      {k >= 2 ? <Besar x={150} y={120} teks="10 − 5 = 5" ukuran={32} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={70} y={160} w={160} teks="hitung banyak tiap nilai" ukuran={12} /> : null}
    </>
  );
}

function A3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      {k === 0 ? <Besar x={150} y={100} teks="nilai 9 → ?" ukuran={32} /> : null}
      {k === 1 ? (
        <Lompat>
          <Besar x={150} y={100} teks="5 siswa" ukuran={40} warna="#16A34A" />
        </Lompat>
      ) : null}
      {k === 2 ? <Besar x={150} y={100} teks="nilai 10 → ?" ukuran={32} /> : null}
      {k === 3 ? (
        <>
          <Besar x={150} y={90} teks="2 siswa" ukuran={36} warna="#16A34A" />
          <Label x={70} y={140} w={160} teks="siap disajikan dalam tabel" ukuran={12} />
        </>
      ) : null}
    </>
  );
}

const VIDEO: VideoSiap[] = [
  {
    naskah: SUB_A35.videos[0],
    poster: { a: 0, k: 2 },
    adegan: [buatAdegan(naskah(0, 0), A1_1), buatAdegan(naskah(0, 1), A1_2), buatAdegan(naskah(0, 2), A1_3)],
  },
  {
    naskah: SUB_A35.videos[1],
    poster: { a: 1, k: 1 },
    adegan: [buatAdegan(naskah(1, 0), A2_1), buatAdegan(naskah(1, 1), A2_2), buatAdegan(naskah(1, 2), A2_3)],
  },
  {
    naskah: SUB_A35.videos[2],
    poster: { a: 1, k: 2 },
    adegan: [buatAdegan(naskah(2, 0), A3_1), buatAdegan(naskah(2, 1), A3_2), buatAdegan(naskah(2, 2), A3_3)],
  },
];

export function VideoK3B5A({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
