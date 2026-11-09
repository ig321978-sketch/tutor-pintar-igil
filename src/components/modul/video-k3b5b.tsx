"use client";

import React from "react";
import { Label } from "./gambar-nilai-k2b";
import { Lompat, Muncul, Papan, Sorot, type PropsAdegan } from "./video-cerita";
import { Besar, DaftarVideoCerita, Emo, HurufKotak, LidiSvg, ManikSvg, Orang, TabelSvg, TumpukanLidiSvg, buatAdegan, type VideoSiap } from "./video-k3b5-umum";
import { SUB_B35 } from "./naskah-k3b5";

/* ------------------------------------------------------------------------ */
/* Video cerita Kelas 3 Bab 5 Sub-Bab B: Menyajikan Data dalam Bentuk Tabel.   */
/* Tiga video, sembilan adegan. Diputar satu per satu saat siswa mengetuk      */
/* Putar. Naskah satu sumber: naskah-k3b5.ts (SUB_B35.videos). Tanpa API.       */
/* ------------------------------------------------------------------------ */

const papan = (v: number, a: number) => SUB_B35.videos[v].adegan[a].papan;
const naskah = (v: number, a: number) => SUB_B35.videos[v].adegan[a];

function B1_1({ k }: PropsAdegan) {
  const n = Math.min(4, k + 1);
  return (
    <>
      <Papan teks={papan(0, 0)[k]} />
      <Orang x={36} y={190} nama="halim" s={0.65} tampilNama={false} />
      <Muncul>
        {Array.from({ length: n }, (_, i) => (
          <LidiSvg key={i} x={100 + i * 28} y={70} tinggi={50} />
        ))}
      </Muncul>
      {k === 3 ? <Besar x={180} y={160} teks="4 data" ukuran={28} warna="#16A34A" /> : null}
    </>
  );
}

function B1_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 1)[k]} />
      {Array.from({ length: 4 }, (_, i) => (
        <LidiSvg key={i} x={100 + i * 22} y={70} tinggi={48} />
      ))}
      {k >= 1 ? (
        <Muncul>
          <LidiSvg x={130} y={70} tinggi={48} miring />
        </Muncul>
      ) : null}
      {k >= 2 ? <Besar x={150} y={150} teks="5" ukuran={44} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={70} y={170} w={160} teks="turus kelompok lima" ukuran={12} /> : null}
    </>
  );
}

function B1_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(0, 2)[k]} />
      <TumpukanLidiSvg x={40} y={70} n={k >= 1 ? 10 : 5} tinggi={36} />
      {k >= 2 ? <TumpukanLidiSvg x={160} y={70} n={13} tinggi={36} /> : null}
      {k === 1 ? <Besar x={100} y={150} teks="10" ukuran={32} /> : null}
      {k === 2 ? <Besar x={210} y={150} teks="13" ukuran={32} warna="#B45309" /> : null}
      {k === 3 ? (
        <Lompat>
          <Label x={60} y={160} w={180} teks="pencacahan lebih cepat" ukuran={12} />
        </Lompat>
      ) : null}
    </>
  );
}

function B2_1({ k }: PropsAdegan) {
  const warna = ["#EF4444", "#3B82F6", "#111827", "#EF4444", "#3B82F6", "#EF4444"];
  return (
    <>
      <Papan teks={papan(1, 0)[k]} />
      <Orang x={30} y={190} nama="kira" s={0.65} tampilNama={false} />
      {warna.map((w, i) => (
        <ManikSvg key={i} x={90 + i * 30} y={80} warna={w} />
      ))}
      {k >= 1 ? <Label x={80} y={110} w={160} teks="hitung tiap warna" ukuran={11} /> : null}
      {k >= 2 ? <TumpukanLidiSvg x={100} y={130} n={3} tinggi={24} /> : null}
      {k === 3 ? <Besar x={220} y={150} teks="3" ukuran={28} warna="#16A34A" /> : null}
    </>
  );
}

function B2_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 1)[k]} />
      <TabelSvg
        x={20}
        y={48}
        w={260}
        kepala={["Warna", "Turus", "Banyak"]}
        baris={
          k === 0
            ? [["merah", "", ""], ["biru", "", ""], ["hitam", "", ""]]
            : k === 1
              ? [["merah", "|||", ""], ["biru", "||", ""], ["hitam", "|", ""]]
              : [
                  ["merah", "|||", "3"],
                  ["biru", "||", "2"],
                  ["hitam", "|", "1"],
                ]
        }
      />
      {k === 3 ? (
        <Lompat>
          <Emo x={270} y={40} e="📋" s={28} />
        </Lompat>
      ) : null}
    </>
  );
}

function B2_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(1, 2)[k]} />
      <Besar x={90} y={90} teks="A1: 4" ukuran={24} />
      <Besar x={210} y={90} teks="A2: 7" ukuran={24} warna="#16A34A" />
      <Besar x={150} y={130} teks="A3: 2" ukuran={24} warna="#B45309" />
      {k >= 2 ? <Label x={50} y={155} w={200} teks="tabel menjawab tanpa hitung ulang" ukuran={11} /> : null}
      {k === 3 ? <Emo x={150} y={185} e="⚡" s={28} /> : null}
    </>
  );
}

function B3_1({ k }: PropsAdegan) {
  const huruf = ["S", "T", "A", "T", "I", "S", "T", "I", "K", "A"];
  return (
    <>
      <Papan teks={papan(2, 0)[k]} />
      {huruf.map((h, i) => (
        <HurufKotak key={i} x={28 + i * 27} y={80} huruf={h} aktif={k >= 2 && h === "T"} />
      ))}
      {k >= 2 ? <Besar x={150} y={140} teks="T = 3" ukuran={28} warna="#DC2626" /> : null}
      {k === 3 ? <Label x={60} y={168} w={180} teks="S = 2, K = 1" ukuran={12} /> : null}
    </>
  );
}

function B3_2({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 1)[k]} />
      <TabelSvg
        x={20}
        y={48}
        w={260}
        kepala={["Huruf", "Turus", "Banyak"]}
        baris={
          k === 0
            ? [["T", "", ""], ["S", "", ""], ["K", "", ""]]
            : k === 1
              ? [["T", "|||", ""], ["S", "||", ""], ["K", "|", ""]]
              : [
                  ["T", "|||", "3"],
                  ["S", "||", "2"],
                  ["K", "|", "1"],
                ]
        }
      />
      {k === 3 ? (
        <Lompat>
          <Label x={70} y={175} w={160} teks="tabel huruf siap" ukuran={12} />
        </Lompat>
      ) : null}
    </>
  );
}

function B3_3({ k }: PropsAdegan) {
  return (
    <>
      <Papan teks={papan(2, 2)[k]} />
      <TabelSvg
        x={30}
        y={48}
        w={240}
        kepala={["Nilai", "Turus", "Banyak"]}
        baris={[
          ["7", "|||", "3"],
          ["8", "||||", "4"],
          ["9", "卌", "5"],
        ]}
      />
      {k >= 2 ? <Sorot x={40} y={100} w={220} h={28} /> : null}
      {k === 3 ? <Besar x={150} y={178} teks="lebih dari 7?" ukuran={22} warna="#B45309" /> : null}
    </>
  );
}

const VIDEO: VideoSiap[] = [
  {
    naskah: SUB_B35.videos[0],
    poster: { a: 1, k: 2 },
    adegan: [buatAdegan(naskah(0, 0), B1_1), buatAdegan(naskah(0, 1), B1_2), buatAdegan(naskah(0, 2), B1_3)],
  },
  {
    naskah: SUB_B35.videos[1],
    poster: { a: 1, k: 2 },
    adegan: [buatAdegan(naskah(1, 0), B2_1), buatAdegan(naskah(1, 1), B2_2), buatAdegan(naskah(1, 2), B2_3)],
  },
  {
    naskah: SUB_B35.videos[2],
    poster: { a: 0, k: 2 },
    adegan: [buatAdegan(naskah(2, 0), B3_1), buatAdegan(naskah(2, 1), B3_2), buatAdegan(naskah(2, 2), B3_3)],
  },
];

export function VideoK3B5B({ speakGuru }: { speakGuru: (teks: string, selesai?: () => void) => void }) {
  return <DaftarVideoCerita videos={VIDEO} speakGuru={speakGuru} />;
}
