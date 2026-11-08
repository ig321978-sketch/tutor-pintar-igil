"use client";

import React from "react";
import { BIRU, BukuCerita, type Cerita } from "./CeritaBandingB";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";
import { BendaG, type JenisBenda } from "./data-8-dasar";
import { AlasTeks, Ket, Label } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab B: Diagram Gambar (Buku Siswa Kelas 1 hlm. 229-241).         */
/* Maskot: Igil si burung hantu. Tokoh buku: Upe, Tika, Malosi, Halim, Wei.   */
/* Semua gambar dibuat di klien (SVG), tanpa panggilan API.                   */
/* Naskah: naskah/mtk-1-bab8-sub-b-diagram-gambar.md                          */
/* ------------------------------------------------------------------------ */

const GARIS = { stroke: BIRU, strokeWidth: 2.4 };

const SAYUR: { j: JenisBenda; nama: string; n: number }[] = [
  { j: "jagung", nama: "Jagung", n: 3 },
  { j: "wortel", nama: "Wortel", n: 4 },
  { j: "brokoli", nama: "Brokoli", n: 3 },
  { j: "kol", nama: "Kol", n: 2 },
];

function Pil({ x, y, w, teks, ukuran = 10.5, isi = "#E9D8F3" }: { x: number; y: number; w: number; teks: string; ukuran?: number; isi?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="22" rx="8" fill={isi} stroke="#7C3AED" strokeWidth="1.8" />
      <Ket x={x + w / 2} y={y + 15} teks={teks} ukuran={ukuran} />
    </g>
  );
}

function Wajah({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="10.5" fill="#FDE047" stroke={BIRU} strokeWidth="1.8" />
      <circle cx={x - 3.6} cy={y - 2.4} r="1.3" fill={BIRU} />
      <circle cx={x + 3.6} cy={y - 2.4} r="1.3" fill={BIRU} />
      <path d={`M${x - 4.2} ${y + 2.6} Q${x} ${y + 7.4} ${x + 4.2} ${y + 2.6}`} fill="none" stroke={BIRU} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 229: Upe menanyakan sayur kesukaan, hasilnya masih tercampur di papan. */
function AdeganPapan() {
  const urut: JenisBenda[] = ["jagung", "brokoli", "kol", "wortel", "brokoli", "kol", "wortel", "jagung", "wortel", "jagung", "wortel", "brokoli"];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#ECFDF5" />
      <rect x="40" y="150" width="14" height="24" fill="#CA8A04" {...GARIS} />
      <rect x="160" y="150" width="14" height="24" fill="#CA8A04" {...GARIS} />
      <rect x="14" y="30" width="186" height="124" rx="8" fill="#FEF9C3" {...GARIS} />
      {urut.map((j, i) => (
        <BendaG key={i} jenis={j} x={36 + (i % 4) * 44} y={52 + Math.floor(i / 4) * 38} s={1.2} />
      ))}
      <path d="M0 176 H300" stroke="#86EFAC" strokeWidth="3" />
      <Tokoh x={252} y={178} rambut="#7A4A1E" baju="#FDE047" s={0.95} angkat />
      <AlasTeks y={182} h={25} />
      <Ket x={107} y={199} teks="Sayur apa yang paling disukai?" ukuran={11.5} />
      <Label x={20} y={0} w={190} teks="Sayur kesukaan" ukuran={13} />
    </>
  );
}

/** Buku hlm. 229: diagram gambar sayur kesukaan, kolom tegak. */
function AdeganTegak() {
  const x0 = 44;
  const y0 = 34;
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => <rect key={`${r}${c}`} x={x0 + c * 60} y={y0 + r * 30} width="60" height="30" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="1.8" />)
      )}
      {[4, 3, 2, 1].map((n, r) => (
        <Pil key={n} x={6} y={y0 + r * 30 + 4} w={30} teks={String(n)} ukuran={12} />
      ))}
      {SAYUR.map((s, c) => (
        <g key={s.nama}>
          {Array.from({ length: s.n }, (_, k) => (
            <BendaG key={k} jenis={s.j} x={x0 + c * 60 + 30} y={y0 + (3 - k) * 30 + 15} s={0.95} />
          ))}
          <Pil x={x0 + c * 60 + 2} y={158} w={56} teks={s.nama} ukuran={10.5} />
        </g>
      ))}
      <Ket x={150} y={22} teks="Diagram Sayur Kesukaan" ukuran={12.5} />
      <AlasTeks y={186} h={20} />
      <Ket x={150} y={200} teks="Satu gambar mewakili 1 anak" ukuran={11.5} />
    </>
  );
}

/** Buku hlm. 230: bentuk lain diagram gambar, baris mendatar. */
function AdeganMendatar() {
  const x0 = 80;
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      {SAYUR.map((s, r) => {
        const y = 30 + r * 32;
        return (
          <g key={s.nama}>
            <Pil x={6} y={y + 4} w={68} teks={s.nama} ukuran={10.5} />
            {Array.from({ length: 4 }, (_, c) => (
              <rect key={c} x={x0 + c * 54} y={y} width="54" height="30" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="1.8" />
            ))}
            {Array.from({ length: s.n }, (_, k) => (
              <BendaG key={k} jenis={s.j} x={x0 + k * 54 + 27} y={y + 15} s={0.9} />
            ))}
          </g>
        );
      })}
      {[1, 2, 3, 4].map((n, c) => (
        <Pil key={n} x={x0 + c * 54 + 10} y={160} w={34} teks={String(n)} ukuran={12} />
      ))}
      <AlasTeks y={186} h={20} />
      <Ket x={150} y={200} teks="Gambar berjajar ke samping" ukuran={11.5} />
      <Label x={20} y={0} w={200} teks="Diagram mendatar" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 232: Tika menanyakan mainan kesukaan, diagram dengan gambar wajah. */
function AdeganMainan() {
  const baris: { j: JenisBenda; n: number }[] = [
    { j: "kelereng-biru", n: 5 },
    { j: "mobil", n: 4 },
    { j: "boneka", n: 2 },
    { j: "gasing", n: 3 },
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#F5F3FF" />
      {baris.map((b, r) => {
        const y = 32 + r * 34;
        return (
          <g key={b.j}>
            <rect x="8" y={y} width="42" height="32" fill="#E9D8F3" stroke="#C4B5FD" strokeWidth="1.8" />
            <BendaG jenis={b.j} x={29} y={y + 16} s={0.95} />
            {Array.from({ length: 5 }, (_, c) => (
              <rect key={c} x={50 + c * 48} y={y} width="48" height="32" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="1.8" />
            ))}
            {Array.from({ length: b.n }, (_, k) => (
              <Wajah key={k} x={74 + k * 48} y={y + 16} />
            ))}
          </g>
        );
      })}
      <AlasTeks y={172} h={36} />
      <Ket x={150} y={187} teks="Gambar wajah mewakili 1 anak" ukuran={11.5} />
      <Ket x={150} y={202} teks="Semua ada 5 + 4 + 2 + 3 = 14 anak" ukuran={11.5} />
      <Label x={20} y={0} w={200} teks="Mainan kesukaan Tika" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 233: Malosi 5, Halim 3, Upe 4 karet gelang. */
function AdeganKaret() {
  const anak = [
    { nama: "Malosi", n: 5 },
    { nama: "Halim", n: 3 },
    { nama: "Upe", n: 4 },
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#FEF2F2" />
      {anak.map((a, c) => {
        const x = 18 + c * 92;
        return (
          <g key={a.nama}>
            {Array.from({ length: 5 }, (_, r) => (
              <rect key={r} x={x} y={32 + r * 22} width="84" height="22" fill="#FFFFFF" stroke="#FCA5A5" strokeWidth="1.8" />
            ))}
            {Array.from({ length: a.n }, (_, k) => (
              <BendaG key={k} jenis="karet" x={x + 42} y={32 + (4 - k) * 22 + 11} s={1.2} />
            ))}
            <Pil x={x + 6} y={146} w={72} teks={a.nama} ukuran={11} />
          </g>
        );
      })}
      <AlasTeks y={174} h={34} />
      <Ket x={150} y={188} teks="Malosi 2 karet gelang lebih banyak dari Halim" ukuran={10.5} />
      <Ket x={150} y={203} teks="Semuanya ada 5 + 3 + 4 = 12 karet gelang" ukuran={10.5} />
      <Label x={20} y={0} w={200} teks="Bermain karet gelang" ukuran={12.5} />
    </>
  );
}

/** Buku hlm. 240: Ayo Menabung, banyak menabung dalam seminggu. */
function AdeganTabung() {
  const baris = [
    { nama: "Halim", hari: "Senin dan Kamis", n: 2 },
    { nama: "Wei", hari: "Jumat", n: 1 },
    { nama: "Upe", hari: "Senin, Rabu, Jumat", n: 3 },
  ];
  return (
    <>
      <rect x="0" y="0" width="300" height="208" fill="#FEFCE8" />
      {baris.map((b, r) => {
        const y = 36 + r * 42;
        return (
          <g key={b.nama}>
            <rect x="8" y={y} width="150" height="36" rx="8" fill="#FFFFFF" {...GARIS} strokeWidth={2} />
            <text x="16" y={y + 15} fontSize="12" fontWeight="900" fill={BIRU}>
              {b.nama}
            </text>
            <text x="16" y={y + 29} fontSize="9.5" fontWeight="900" fill="#B45309">
              {b.hari}
            </text>
            {Array.from({ length: 3 }, (_, c) => (
              <circle key={c} cx={188 + c * 38} cy={y + 18} r="13" fill={c < b.n ? "#FBBF24" : "#FFFFFF"} stroke={BIRU} strokeWidth="2.2" strokeDasharray={c < b.n ? undefined : "3 3"} />
            ))}
          </g>
        );
      })}
      <AlasTeks y={168} h={40} />
      <Ket x={150} y={183} teks="Seminggu: Halim 2 kali, Wei 1 kali, Upe 3 kali" ukuran={10.5} />
      <Ket x={150} y={199} teks="Yang paling rajin menabung: Upe" ukuran={11.5} />
      <Label x={20} y={0} w={200} teks="Ayo menabung" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita diagram gambar">
      {id === "B8-S1" && <AdeganPapan />}
      {id === "B8-S2" && <AdeganTegak />}
      {id === "B8-S3" && <AdeganMendatar />}
      {id === "B8-S4" && <AdeganMainan />}
      {id === "B8-S5" && <AdeganKaret />}
      {id === "B8-S6" && <AdeganTabung />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 229-240): papan sayur, diagram tegak, diagram mendatar, mainan, karet gelang, dan menabung. */
export const CERITA_B8: Cerita[] = [
  {
    id: "B8-S1",
    sceneType: "papan-sayur-kesukaan",
    voiceNarration:
      "Upe menanyakan sayur kesukaan teman-temannya. Hasilnya seperti pada papan di sebelah Upe. Ada jagung, wortel, brokoli, dan kol, semuanya tercampur. Sulit menemukan sayur yang paling disukai kalau masih tercampur. Kita bisa membuat diagram gambar dari data itu. Sayur sangat dibutuhkan tubuh. Sayur mengandung vitamin dan mineral, dan menjaga tubuh tetap sehat. Ayo makan sayur setiap hari.",
  },
  {
    id: "B8-S2",
    sceneType: "diagram-gambar-tegak",
    voiceNarration:
      "Ini diagram gambar sayur kesukaan. Setiap gambar mewakili satu anak. Jagung ada tiga gambar, jadi tiga anak suka jagung. Wortel ada empat gambar, jadi empat anak suka wortel. Brokoli ada tiga gambar, dan kol ada dua gambar. Angka di sebelah kiri menunjukkan banyak gambar. Sayur apa yang paling disukai? Wortel, karena kolomnya paling tinggi.",
  },
  {
    id: "B8-S3",
    sceneType: "diagram-gambar-mendatar",
    voiceNarration:
      "Ini bentuk lain dari diagram gambar. Gambarnya berjajar ke samping, jadi disebut diagram mendatar. Jagung ada tiga, wortel empat, brokoli tiga, dan kol dua. Angka di bawah menunjukkan banyak gambar. Wortel paling disukai karena barisnya paling panjang. Diagram gambar memudahkan kita membaca data.",
  },
  {
    id: "B8-S4",
    sceneType: "mainan-kesukaan-tika",
    voiceNarration:
      "Tika menanyakan mainan kesukaan teman-temannya. Tika menunjukkan hasilnya pada diagram gambar. Gambar wajah tersenyum mewakili satu anak. Ada lima anak yang suka kelereng. Ada empat anak yang suka mobil-mobilan. Ada dua anak yang suka boneka. Ada tiga anak yang suka gasing. Semua ada empat belas anak.",
  },
  {
    id: "B8-S5",
    sceneType: "karet-gelang",
    voiceNarration:
      "Malosi, Halim, dan Upe bermain karet gelang. Setiap gambar karet gelang mewakili satu karet gelang. Malosi mempunyai lima karet gelang. Halim mempunyai tiga karet gelang. Upe mempunyai empat karet gelang. Malosi mempunyai dua karet gelang lebih banyak dari Halim. Upe mempunyai satu karet gelang lebih sedikit dari Malosi. Malosi paling banyak, Halim paling sedikit. Semuanya ada dua belas karet gelang.",
  },
  {
    id: "B8-S6",
    sceneType: "ayo-menabung",
    voiceNarration:
      "Ayo menabung. Halim menabung setiap hari Senin dan Kamis, jadi seminggu dua kali. Wei menabung setiap hari Jumat, jadi seminggu sekali. Upe menabung setiap hari Senin, Rabu, dan Jumat, jadi seminggu tiga kali. Kita bisa menyajikan data menabung dalam diagram gambar dengan mewarnai lingkaran. Siapa yang paling rajin menabung? Upe, tiga kali seminggu.",
  },
];

/** Peta pikiran enam simpul: dari bertanya sampai menceritakan hasil diagram. */
export const PETA_PIKIRAN_B8: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Tanya Temanmu",
    stepDesc:
      "Tentukan pertanyaan yang jelas, misalnya sayur apa yang kamu suka. Tanyakan kepada teman satu per satu, satu orang hanya memilih satu jawaban.",
    icon: "🙋",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Catat dengan Turus",
    stepDesc:
      "Catat jawaban setiap teman dengan turus. Satu goresan untuk satu jawaban, dan setiap lima goresan dicoret miring supaya mudah dihitung.",
    icon: "✏️",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Buat Tabel",
    stepDesc:
      "Hitung turus, lalu tulis hasilnya dalam tabel dengan judul, nama setiap pilihan, dan banyaknya. Jumlah semua harus sama dengan banyak teman yang ditanya.",
    icon: "📋",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Gambar Diagram",
    stepDesc:
      "Gambar atau warnai satu gambar untuk satu data. Mulai dari kotak pertama, rapat, tanpa celah. Tulis keterangan, misalnya satu gambar mewakili satu anak.",
    icon: "🎨",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Baca Diagram",
    stepDesc:
      "Hitung gambar pada setiap kolom atau baris. Yang paling tinggi atau paling panjang berarti paling banyak. Bandingkan dengan lebih banyak, lebih sedikit, dan sama banyak.",
    icon: "🔍",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Ceritakan Hasilnya",
    stepDesc:
      "Ceritakan hasil diagrammu dengan kalimat. Sebutkan yang paling banyak, yang paling sedikit, dan jumlah semuanya. Diagram gambar memudahkan kita membaca data.",
    icon: "🗣️",
  },
];

export function CeritaDataB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_B8} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
