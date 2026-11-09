"use client";

import React from "react";
import { BAWAH, BIRU, BukuCerita, EMAS, HIJAU, KUNING, Latar, MERAH_MUDA, type Cerita } from "./CeritaBandingB";
import { IgilWajahIsi, Lencana } from "./gambar-cara-b2";
import { Tokoh } from "./gambar-maju-mundur-c";
import type { LangkahPeta } from "./PetaPikiranB";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai  */
/* dengan 50 (Buku Siswa Kelas II hlm. 3-16). Tokoh buku: Malosi, Kira, Lili, */
/* Halim, Tika, Upe, dan maskot Igil. Semua gambar dibuat di klien (SVG),     */
/* tanpa panggilan API. Naskah: naskah/mtk-2-bab1-sub-a-*.md                  */
/* ------------------------------------------------------------------------ */

const COKELAT = "#A8672D";
const WARNA_BARIS = ["#22C55E", "#A855F7", "#3B82F6"];

/** Label putih berbingkai. */
function Label({ x, y, w, teks, ukuran = 14 }: { x: number; y: number; w: number; teks: string; ukuran?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="11" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      <text x={x + w / 2} y={y + 18.5} textAnchor="middle" fontSize={ukuran} fontWeight="900" fill={BIRU}>
        {teks}
      </text>
    </g>
  );
}

/** Tas kecil di dalam adegan. */
export function TasG({ x, y, w = 18, h = 20, warna }: { x: number; y: number; w?: number; h?: number; warna: string }) {
  return (
    <g>
      <path d={`M${x + w * 0.3} ${y + h * 0.18} Q${x + w / 2} ${y - h * 0.12} ${x + w * 0.7} ${y + h * 0.18}`} fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
      <rect x={x} y={y + h * 0.15} width={w} height={h * 0.85} rx="5" fill={warna} stroke={BIRU} strokeWidth="1.8" />
      <rect x={x + w * 0.22} y={y + h * 0.58} width={w * 0.56} height={h * 0.28} rx="2" fill="#FFFFFF" fillOpacity="0.4" stroke={BIRU} strokeWidth="1" />
    </g>
  );
}

/** Rak loker tiga baris sepuluh kolom. Bilangan berjalan berkelok seperti di buku: baris bawah kiri ke kanan. */
export function LokerRak({ x, y, isi, nomor = false, nomorSampai, sorot = [] }: { x: number; y: number; isi: number; nomor?: boolean; nomorSampai?: number; sorot?: number[] }) {
  const lebar = 27;
  const tinggi = 26;
  return (
    <g>
      <rect x={x} y={y} width={lebar * 10 + 10} height={tinggi * 3 + 10} rx="7" fill="#E9B872" stroke={COKELAT} strokeWidth="3" />
      {Array.from({ length: 30 }, (_, i) => {
        const n = i + 1;
        const r = Math.floor(i / 10);
        const c = i % 10;
        const kol = r % 2 === 0 ? c : 9 - c;
        const cx = x + 5 + kol * lebar;
        const cy = y + 5 + (2 - r) * tinggi;
        const ada = n <= isi;
        return (
          <g key={n}>
            <rect x={cx + 1} y={cy + 1} width={lebar - 2} height={tinggi - 2} rx="3" fill="#FFF3DB" stroke="#C9A06A" strokeWidth="1" />
            {ada ? <TasG x={cx + (lebar - 18) / 2} y={cy + 3} warna={WARNA_BARIS[r]} /> : null}
            {ada && (nomorSampai === undefined ? nomor : n <= nomorSampai) ? (
              <g>
                <circle cx={cx + lebar / 2} cy={cy + 15} r="6.6" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.2" />
                <text x={cx + lebar / 2} y={cy + 18.4} textAnchor="middle" fontSize="8.4" fontWeight="900" fill={BIRU}>
                  {n}
                </text>
              </g>
            ) : null}
            {ada && sorot.includes(n) ? <rect x={cx + 1} y={cy + 1} width={lebar - 2} height={tinggi - 2} rx="3" fill="none" stroke={EMAS} strokeWidth="2.6" /> : null}
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------ Adegan cerita --------------------------- */

/** Buku hlm. 3: loker baru di kelas Malosi, masih kosong. */
function AdeganLokerBaru() {
  return (
    <>
      <Latar />
      <LokerRak x={10} y={40} isi={0} />
      <Tokoh x={52} y={198} rambut="#1F2937" baju={HIJAU} s={0.9} angkat />
      <Tokoh x={250} y={198} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.86} />
      <Lencana x={150} y={150} teks="?" r={19} />
      <Label x={78} y={6} w={144} teks="Loker baru!" />
    </>
  );
}

/** Tas dimasukkan satu per satu, bergantian. */
function AdeganBergantian() {
  return (
    <>
      <Latar />
      <LokerRak x={10} y={40} isi={14} />
      <Tokoh x={60} y={198} rambut="#7A4A1E" baju={KUNING} s={0.9} angkat />
      <g className="igil-lompat" style={BAWAH}>
        <TasG x={118} y={150} w={26} h={30} warna={WARNA_BARIS[2]} />
      </g>
      <Tokoh x={250} y={198} rambut="#1F2937" baju={HIJAU} s={0.86} />
      <Label x={62} y={6} w={176} teks="Satu per satu" />
    </>
  );
}

/** Buku hlm. 4: tas dihitung satu per satu, 26 tas. */
function AdeganDuaPuluhEnam() {
  return (
    <>
      <Latar />
      <LokerRak x={10} y={36} isi={26} nomor />
      <Lencana x={150} y={160} teks="26" r={21} />
      <Tokoh x={44} y={200} rambut="#1F2937" baju={HIJAU} s={0.8} angkat />
      <Tokoh x={256} y={200} rambut="#7A4A1E" baju={EMAS} s={0.8} angkat />
      <Label x={64} y={4} w={172} teks="Ada 26 tas" />
    </>
  );
}

/** Buku hlm. 5: mengelompokkan setiap sepuluh benda. */
function AdeganKelompokSepuluh() {
  const kotak = (x: number, y: number, judul: string, isi: React.ReactNode) => (
    <g>
      <rect x={x} y={y} width="86" height="70" rx="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="3" />
      {isi}
      <text x={x + 43} y={y + 64} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
        {judul}
      </text>
    </g>
  );
  const w = ["#EF4444", "#3B82F6", "#22C55E", "#EAB308", "#A855F7"];
  return (
    <>
      <Latar />
      {kotak(
        10,
        40,
        "ikat pensil",
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={20 + i * 6.2} y="48" width="5" height="26" rx="1.5" fill={w[i % 5]} stroke={BIRU} strokeWidth="1" />
          ))}
          <rect x="18" y="58" width="66" height="5" rx="2" fill={EMAS} stroke={BIRU} strokeWidth="1" />
        </g>
      )}
      {kotak(
        107,
        40,
        "wadah telur",
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx={24 + (i % 5) * 13.5} cy={56 + Math.floor(i / 5) * 14} rx="5.4" ry="6.4" fill="#FFF3D6" stroke={BIRU} strokeWidth="1.2" />
          ))}
        </g>
      )}
      {kotak(
        204,
        40,
        "ikat lidi",
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M${24 + i * 5.6} 48 V76`} stroke="#A8672D" strokeWidth="2.4" strokeLinecap="round" />
          ))}
          <rect x="18" y="58" width="68" height="5" rx="2" fill="#16A34A" stroke={BIRU} strokeWidth="1" />
        </g>
      )}
      {kotak(
        10,
        120,
        "susun balok",
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={20 + (i % 5) * 13} y={128 + Math.floor(i / 5) * 16} width="11" height="13" rx="2" fill={w[i % 5]} stroke={BIRU} strokeWidth="1.2" />
          ))}
        </g>
      )}
      {kotak(
        107,
        120,
        "bingkai kancing",
        <g>
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i}>
              <circle cx={24 + (i % 5) * 13.5} cy={136 + Math.floor(i / 5) * 15} r="5.4" fill={w[(i + 1) % 5]} stroke={BIRU} strokeWidth="1.2" />
              <circle cx={24 + (i % 5) * 13.5} cy={136 + Math.floor(i / 5) * 15} r="1.2" fill={BIRU} />
            </g>
          ))}
        </g>
      )}
      {kotak(
        204,
        120,
        "kantong kacang",
        <g>
          <path d="M34 130 H74 L80 168 H28 Z" fill="#FDE9C4" stroke={COKELAT} strokeWidth="2" />
          {Array.from({ length: 10 }, (_, i) => (
            <ellipse key={i} cx={40 + (i % 4) * 8 + (Math.floor(i / 4) % 2) * 4} cy={142 + Math.floor(i / 4) * 8} rx="3" ry="2.2" fill="#B45309" />
          ))}
        </g>
      )}
      <Lencana x={150} y={20} teks="10" r={16} />
    </>
  );
}

/** Buku hlm. 9: tas dikelompokkan, 10 + 10 + 6. */
function AdeganSepuluhSepuluhEnam() {
  return (
    <>
      <Latar />
      <LokerRak x={10} y={30} isi={26} sorot={[]} />
      <rect x="10" y="118" width="280" height="4" fill="none" />
      <Label x={14} y={116} w={126} teks="10 + 10 = 20" ukuran={13} />
      <Label x={160} y={116} w={126} teks="20 + 6 = 26" ukuran={13} />
      <Lencana x={150} y={176} teks="26" r={20} />
      <Tokoh x={36} y={202} rambut="#7A4A1E" baju={MERAH_MUDA} s={0.76} angkat />
      <Tokoh x={264} y={202} rambut="#1F2937" baju={HIJAU} s={0.76} angkat />
    </>
  );
}

/** Buku hlm. 10: menghitung maju 20 sampai 30 dan mundur 30 sampai 20. */
function AdeganJalur() {
  const sel = (n: number, x: number, y: number, warna: string) => (
    <g key={n}>
      <rect x={x} y={y} width="40" height="34" rx="7" fill={warna} stroke={BIRU} strokeWidth="2.6" />
      <text x={x + 20} y={y + 24} textAnchor="middle" fontSize="19" fontWeight="900" fill={BIRU}>
        {n}
      </text>
    </g>
  );
  return (
    <>
      <Latar />
      {Array.from({ length: 6 }, (_, i) => sel(20 + i, 22 + i * 44, 44, i % 2 ? "#FDE68A" : "#99F6E4"))}
      {Array.from({ length: 5 }, (_, i) => sel(30 - i, 66 + (4 - i) * 44, 100, i % 2 ? "#FDE68A" : "#99F6E4"))}
      <text x="150" y="38" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        maju: 20 → 30
      </text>
      <text x="150" y="152" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
        mundur: 30 → 20
      </text>
      <g className="igil-lompat" style={BAWAH}>
        <svg x="232" y="150" width="58" height="42" viewBox="0 0 120 80">
          <IgilWajahIsi />
        </svg>
      </g>
      <Tokoh x={40} y={200} rambut="#1F2937" baju={KUNING} s={0.78} angkat />
      <Label x={84} y={164} w={136} teks="Baca nyaring!" ukuran={13} />
    </>
  );
}

function Adegan({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 300 208" className="block h-auto w-full" role="img" aria-label="Gambar cerita menghitung bilangan sampai lima puluh">
      {id === "K2A-S1" && <AdeganLokerBaru />}
      {id === "K2A-S2" && <AdeganBergantian />}
      {id === "K2A-S3" && <AdeganDuaPuluhEnam />}
      {id === "K2A-S4" && <AdeganKelompokSepuluh />}
      {id === "K2A-S5" && <AdeganSepuluhSepuluhEnam />}
      {id === "K2A-S6" && <AdeganJalur />}
    </svg>
  );
}

/** Enam adegan, mengikuti halaman buku (hlm. 3-10). Naskah dibacakan Suara Guru, tidak ditulis di layar. */
export const CERITA_K2A: Cerita[] = [
  {
    id: "K2A-S1",
    sceneType: "loker-baru",
    voiceNarration:
      "Loker baru di kelas Malosi! Hari pertama masuk sekolah telah tiba. Malosi dan teman-temannya sangat senang. Sekarang ada loker baru di kelas Malosi. Loker baru ini dipakai untuk menyimpan tas supaya kelas rapi. Ibu guru meminta setiap anak memasukkan tasnya ke loker. Rak loker ini masih kosong. Menurut kamu, berapa banyak anak di kelas Malosi? Bagaimana cara kamu mendapatkan jawabannya?",
  },
  {
    id: "K2A-S2",
    sceneType: "tas-bergantian",
    voiceNarration:
      "Anak-anak menyimpan tas secara bergantian. Satu anak, satu tas, satu loker. Tidak ada yang berebut. Malosi mendapat giliran yang terakhir. Karena setiap anak membawa satu tas, banyak tas sama dengan banyak anak. Jadi kalau kita tahu banyak tas di loker, kita tahu banyak anak di kelas. Nah, bagaimana cara menghitung banyak tas dengan benar? Kita hitung satu per satu.",
  },
  {
    id: "K2A-S3",
    sceneType: "dua-puluh-enam",
    voiceNarration:
      "Semua anak sudah meletakkan tas di dalam loker. Sekarang kita hitung tas satu per satu, dan setiap tas hanya dihitung satu kali. Baris bawah dari satu sampai sepuluh. Baris tengah dari sebelas sampai dua puluh. Baris atas dari dua puluh satu sampai dua puluh enam. Ada dua puluh enam tas di dalam loker. Dua puluh enam ditulis 26. Karena banyak tas sama dengan banyak anak, ada dua puluh enam anak di kelas Malosi. Apakah jawabanmu sama?",
  },
  {
    id: "K2A-S4",
    sceneType: "kelompok-sepuluh",
    voiceNarration:
      "Untuk menghitung benda yang banyak, kita boleh mengelompokkan setiap sepuluh benda. Satu ikat berisi sepuluh pensil. Satu wadah berisi sepuluh telur. Satu ikat berisi sepuluh lidi. Satu susun berisi sepuluh balok. Satu bingkai berisi sepuluh kancing. Satu kantong berisi sepuluh kacang. Mengelompokkan setiap sepuluh benda membuat kita lebih mudah dan lebih cepat menghitung. Satu kelompok sepuluh disebut satu puluhan. Dua kelompok, dua puluh. Tiga kelompok, tiga puluh. Empat kelompok, empat puluh. Lima kelompok, lima puluh.",
  },
  {
    id: "K2A-S5",
    sceneType: "sepuluh-sepuluh-enam",
    voiceNarration:
      "Sekarang kita hitung tas dengan cara mengelompokkan setiap sepuluh tas. Ada sepuluh tas pada baris pertama. Ada sepuluh tas pada baris kedua. Sepuluh ditambah sepuluh sama dengan dua puluh. Ada enam tas pada baris ketiga. Dua puluh ditambah enam sama dengan dua puluh enam. Hasilnya sama dengan hitungan satu per satu, yaitu dua puluh enam tas. Menghitung dengan kelompok sepuluh lebih cepat dan tidak mudah salah.",
  },
  {
    id: "K2A-S6",
    sceneType: "jalur-bilangan",
    voiceNarration:
      "Kita juga bisa menghitung maju dan menghitung mundur. Menghitung maju dari dua puluh sampai tiga puluh: dua puluh, dua puluh satu, dua puluh dua, dan seterusnya sampai tiga puluh. Menghitung mundur dari tiga puluh sampai dua puluh: tiga puluh, dua puluh sembilan, dua puluh delapan, dan seterusnya sampai dua puluh. Perhatikan nama bilangannya: dua puluh dan satuannya. Ayo bacalah dengan suara nyaring, lalu hitung maju dan mundur bersama Igil.",
  },
];

/** Peta pikiran enam simpul: dari menghitung satu per satu sampai menebak dan membuktikan. */
export const PETA_PIKIRAN_K2A: LangkahPeta[] = [
  {
    stepNumber: 1,
    stepTitle: "1. Hitung Satu per Satu",
    stepDesc:
      "Sentuh setiap benda satu kali sambil menyebut bilangannya. Tandai benda yang sudah dihitung supaya tidak terhitung dua kali dan tidak ada yang terlewat. Bilangan terakhir yang disebut adalah banyak benda seluruhnya. Itulah korespondensi satu-satu, dasar dari semua berhitung.",
    icon: "🔢",
    flowFrom: "Hitung benda",
    flowTo: "Kelompokkan sepuluh",
  },
  {
    stepNumber: 2,
    stepTitle: "2. Kelompokkan Sepuluh",
    stepDesc:
      "Benda yang banyak lebih mudah dihitung kalau dikelompokkan setiap sepuluh: satu ikat pensil, satu wadah telur, satu susun balok, satu bingkai sepuluh. Satu kelompok sepuluh disebut satu puluhan. Metode kotak sepuluh seperti ini dipakai di banyak negara, misalnya di Singapura, supaya anak melihat sepuluh sekaligus tanpa menghitung satu-satu.",
    icon: "📦",
    flowFrom: "Kelompokkan sepuluh",
    flowTo: "Puluhan dan sisanya",
  },
  {
    stepNumber: 3,
    stepTitle: "3. Puluhan dan Sisanya",
    stepDesc:
      "Hitung dulu kelompok sepuluh: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Lalu tambahkan benda yang tersisa. Dua kelompok sepuluh dan enam benda lagi adalah 20 + 6 = 26. Menghitung loncat sepuluh lalu menambah satu-satu disebut hitung meloncat, dan sangat membantu saat bilangannya sudah besar.",
    icon: "➕",
    flowFrom: "Puluhan dan sisanya",
    flowTo: "Baca dan tulis",
  },
  {
    stepNumber: 4,
    stepTitle: "4. Baca dan Tulis",
    stepDesc:
      "Bilangan 21 sampai 50 ditulis dengan dua angka. Angka di kiri menunjukkan banyak puluhan, angka di kanan menunjukkan banyak satuan. Cara membacanya: nama puluhan lalu nama satuan, misalnya 26 dibaca dua puluh enam, 31 dibaca tiga puluh satu, 47 dibaca empat puluh tujuh. Kelipatan sepuluh dibaca tanpa satuan: dua puluh, tiga puluh, empat puluh, lima puluh.",
    icon: "🗣️",
    flowFrom: "Baca dan tulis",
    flowTo: "Maju dan mundur",
  },
  {
    stepNumber: 5,
    stepTitle: "5. Maju dan Mundur",
    stepDesc:
      "Menghitung maju berarti bilangan makin besar, satu demi satu. Menghitung mundur berarti bilangan makin kecil. Di jalur bilangan, bilangan setelah dan sebelum sebuah bilangan selalu berbeda satu. Setelah 29 datang 30, dan sebelum 30 ada 29. Melengkapi urutan bilangan yang hilang melatih kita mengingat bilangan dengan tepat.",
    icon: "🛤️",
    flowFrom: "Maju dan mundur",
    flowTo: "Tebak dan buktikan",
  },
  {
    stepNumber: 6,
    stepTitle: "6. Tebak dan Buktikan",
    stepDesc:
      "Sebelum menghitung, kira-kira dulu banyak bendanya. Pakai patokan sepuluh: apakah benda ini sebanyak satu, dua, atau tiga kelompok sepuluh? Lalu hitung untuk membuktikan, dan bandingkan tebakan dengan hasil hitungan. Memperkirakan melatih perasaan bilangan, dan menghitung memastikan jawaban yang tepat.",
    icon: "🔍",
    flowFrom: "Tebak dan buktikan",
    flowTo: "Bilangan sampai 50",
  },
];

export function CeritaHitungK2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <BukuCerita cerita={CERITA_K2A} speakGuru={speakGuru} adegan={(c) => <Adegan id={c.id} />} />;
}
