"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React from "react";
import { BurungSVG } from "./gambar-soal-cerita-d3";
import { PanelPoster } from "./SubBabBBanding";
import { BatangModel, Rangkai, kurangTok } from "./soal-cerita-d3-umum";
import { LencanaSuara, PitaTahap, TombolSuaraGuru } from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab D, Tahap 3: Infografis. Poster untuk dibaca dan didengar.    */
/* Bukan permainan. Isi: mula-mula, pergi, sisa; kata kunci; lima langkah;    */
/* model batang; apa yang dicari; dua kali mengurangi; kalimat jawaban;       */
/* Ayo Berkarya (Buku Siswa Kelas 1 hlm. 106-108 dan 113).                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman soal cerita pengurangan. Ada delapan panel. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_D3 = [
  {
    ikon: "🔑",
    nama: "Kata kunci",
    ket: "Terbang, pergi, dimakan: kurang",
    suara:
      "Cari kata kunci di cerita. Kata terbang, pergi, diberikan, dimakan, diambil, dan hilang berarti jumlahnya berkurang. Pakai tanda kurang.",
  },
  {
    ikon: "🔍",
    nama: "Periksa",
    ket: "Sisa + pergi = mula-mula",
    suara: "Periksa jawabanmu. Sisa ditambah yang pergi harus sama dengan jumlah mula-mula. Enam ditambah dua sama dengan delapan.",
  },
];

const LANGKAH = [
  { ikon: "📖", nama: "Baca", ket: "Baca pelan-pelan sampai selesai" },
  { ikon: "⭕", nama: "Lingkari angka", ket: "Cari angka yang ada di cerita" },
  { ikon: "🔑", nama: "Kotaki kata kunci", ket: "Kata yang mengubah jumlah" },
  { ikon: "✍️", nama: "Tulis kalimat", ket: "Mula-mula − pergi = sisa" },
  { ikon: "✅", nama: "Periksa", ket: "Jawab dengan kalimat lengkap" },
];

const LANGKAH_KARYA = [
  { ikon: "🎨", nama: "Pilih topik", ket: "Burung, kue, bola, atau lainnya" },
  { ikon: "🔢", nama: "Tentukan mula-mula", ket: "Berapa banyak di awal?" },
  { ikon: "👋", nama: "Tentukan yang pergi", ket: "Berapa yang berkurang?" },
  { ikon: "📝", nama: "Tulis ceritanya", ket: "Dengan kata kunci pengurangan" },
  { ikon: "➖", nama: "Tulis kalimat matematika", ket: "Lalu cari jawabannya" },
  { ikon: "🤝", nama: "Tukar dengan teman", ket: "Teman menjawab soalmu" },
];

function Baris({ ikon, nama, ket, nomor }: { ikon: string; nama: string; ket: string; nomor: number }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xl" aria-hidden="true">
        {ikon}
      </span>
      <p className="min-w-0 text-sm font-black leading-tight text-[#1C01A5]">
        {nomor}. {nama}
        <span className="block text-[11px] font-black text-[#1C01A5]/75">{ket}</span>
      </p>
    </div>
  );
}

export function InfografisSoalCeritaD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Soal Cerita Pengurangan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="MULA-MULA, PERGI, SISA"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Setiap cerita pengurangan punya tiga bagian. Mula-mula adalah jumlah di awal. Pergi adalah yang berkurang. Sisa adalah yang masih tinggal. Mula-mula ada delapan burung. Dua burung terbang. Sisa enam burung. Delapan dikurangi dua sama dengan enam."
      >
        <div className="space-y-2 text-center">
          <div className="flex flex-wrap items-end justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            {Array.from({ length: 6 }, (_, i) => (
              <BurungSVG key={`h${i}`} kelas="h-9 w-9" />
            ))}
            {Array.from({ length: 2 }, (_, i) => (
              <span key={`t${i}`} className="opacity-40">
                <BurungSVG kelas="h-9 w-9" terbang />
              </span>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {[
              { n: "Mula-mula", v: 8, w: "#E0E7FF" },
              { n: "Pergi", v: 2, w: "#FEF3C7" },
              { n: "Sisa", v: 6, w: "#DCFCE7" },
            ].map((x) => (
              <div key={x.n} className="rounded-2xl border-4 border-[#1C01A5] px-1 py-1" style={{ backgroundColor: x.w }}>
                <p className="text-[11px] font-black text-[#1C01A5]/80">{x.n}</p>
                <p className="text-3xl font-black leading-none text-[#1C01A5]">{x.v}</p>
              </div>
            ))}
          </div>
          <Rangkai tok={kurangTok(8, 2, 6)} />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="KATA KUNCI"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Kata kunci memberi tahu kita harus mengurangi atau menambah. Kata terbang, pergi, diberikan, dimakan, diambil, dan hilang berarti jumlahnya berkurang. Pakai tanda kurang. Kata datang, bergabung, dan ditambah berarti jumlahnya bertambah. Pakai tanda tambah."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 rounded-2xl border-4 border-[#DC2626] bg-[#FEF2F2] px-1.5 py-2 text-center">
            <p className="text-3xl font-black leading-none text-[#1C01A5]">−</p>
            <p className="text-[11px] font-black text-[#991B1B]">berkurang</p>
            {["terbang", "pergi", "diberikan", "dimakan", "diambil", "hilang"].map((k) => (
              <p key={k} className="rounded-lg bg-white px-1 text-sm font-black leading-snug text-[#1C01A5]">
                {k}
              </p>
            ))}
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-1.5 py-2 text-center">
            <p className="text-3xl font-black leading-none text-[#1C01A5]">+</p>
            <p className="text-[11px] font-black text-[#14532D]">bertambah</p>
            {["datang", "bergabung", "ditambah"].map((k) => (
              <p key={k} className="rounded-lg bg-white px-1 text-sm font-black leading-snug text-[#1C01A5]">
                {k}
              </p>
            ))}
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="LIMA LANGKAH"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Ikuti lima langkah untuk menyelesaikan soal cerita. Satu, baca ceritanya pelan-pelan sampai selesai. Dua, lingkari angka yang ada di cerita. Tiga, kotaki kata kunci yang mengubah jumlah. Empat, tulis kalimat matematikanya, mula-mula dikurangi yang pergi sama dengan sisa. Lima, periksa dan jawab dengan kalimat lengkap."
      >
        <div className="space-y-1.5">
          {LANGKAH.map((c, i) => (
            <Baris key={c.nama} {...c} nomor={i + 1} />
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="MODEL BATANG"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Model batang membantu kita melihat cerita. Kotak merah adalah sisa. Kotak yang dicoret adalah yang pergi. Seluruh batang adalah jumlah mula-mula. Di sini mula-mula ada sepuluh. Tiga pergi. Sisanya tujuh. Sepuluh dikurangi tiga sama dengan tujuh."
      >
        <div className="space-y-2 text-center">
          <BatangModel mula={10} pergi={3} sisa={7} />
          <Rangkai tok={kurangTok(10, 3, 7)} />
          <p className="text-[11px] font-black leading-tight text-[#1C01A5]/80">Merah: sisa. Dicoret: pergi. Seluruh batang: mula-mula.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="APA YANG DICARI?"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kadang yang dicari adalah sisa. Delapan dikurangi dua sama dengan berapa? Hitung delapan kurang dua. Kadang yang dicari adalah yang pergi. Tujuh kurang berapa sama dengan lima? Hitung tujuh kurang lima sama dengan dua. Kadang yang dicari adalah mula-mula. Berapa dikurangi tiga sama dengan empat? Pakai kebalikan. Empat ditambah tiga sama dengan tujuh."
      >
        <div className="space-y-1.5">
          {[
            { judul: "Cari sisa", soal: [8, "−", 2, "=", "?"], cara: [8, "−", 2, "=", 6], nyala: [4] },
            { judul: "Cari yang pergi", soal: [7, "−", "?", "=", 5], cara: [7, "−", 5, "=", 2], nyala: [2] },
            { judul: "Cari mula-mula", soal: ["?", "−", 3, "=", 4], cara: [4, "+", 3, "=", 7], nyala: [0] },
          ].map((r) => (
            <div key={r.judul} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-1.5 text-center">
              <p className="text-xs font-black text-[#1C01A5]/75">{r.judul}</p>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <Rangkai tok={r.soal} nyala={r.nyala} kelas="text-lg" />
                <span className="text-lg font-black text-[#1C01A5]" aria-hidden="true">
                  →
                </span>
                <Rangkai tok={r.cara} kelas="text-lg" />
              </div>
            </div>
          ))}
          <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]/80">Kiri: soal. Kanan: cara mencarinya.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="KURANGI DUA KALI"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Malosi mempunyai sembilan kelereng. Malosi memberi Kira dua kelereng, lalu memberi Upe empat kelereng. Kita kurangi dua kali, dari kiri ke kanan. Sembilan dikurangi dua sama dengan tujuh. Tujuh dikurangi empat sama dengan tiga. Ada cara lain. Gabungkan dulu dua dan empat menjadi enam. Lalu sembilan dikurangi enam sama dengan tiga. Hasilnya sama."
      >
        <div className="space-y-2 text-center">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
            <Rangkai tok={[9, "−", 2, "−", 4, "=", 3]} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1 rounded-2xl border-4 border-[#DC2626] bg-[#FEF2F2] px-1 py-1.5">
              <p className="text-[11px] font-black text-[#991B1B]">Satu per satu</p>
              <Rangkai tok={kurangTok(9, 2, 7)} kelas="text-base" />
              <Rangkai tok={kurangTok(7, 4, 3)} kelas="text-base" />
            </div>
            <div className="space-y-1 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-1 py-1.5">
              <p className="text-[11px] font-black text-[#14532D]">Cara lain</p>
              <Rangkai tok={[2, "+", 4, "=", 6]} kelas="text-base" />
              <Rangkai tok={kurangTok(9, 6, 3)} kelas="text-base" />
            </div>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="KALIMAT JAWABAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Setelah menghitung, tulis jawabanmu dalam satu kalimat lengkap. Sebut bendanya dan satuannya. Sisa burung ada enam ekor. Siswa yang pergi ada dua orang. Bola di dalam kardus ada tujuh buah."
      >
        <div className="space-y-1.5">
          {[
            { k: "Sisa burung ada 6 ekor.", s: "ekor" },
            { k: "Siswa yang pergi ada 2 orang.", s: "orang" },
            { k: "Bola di dalam kardus ada 7 buah.", s: "buah" },
          ].map((x) => (
            <div key={x.k} className="flex items-center justify-between gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5">
              <p className="min-w-0 text-sm font-black leading-snug text-[#1C01A5]">{x.k}</p>
              <span className="shrink-0 rounded-full bg-[#FFE566] px-2 py-0.5 text-xs font-black text-[#1C01A5]">{x.s}</span>
            </div>
          ))}
          <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]/80">Jawaban selalu menyebut bendanya.</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="AYO BERKARYA"
        warna="#BE185D"
        speakGuru={speakGuru}
        suara="Ayo berkarya. Buat soal cerita pengurangan buatanmu sendiri. Satu, pilih topik. Dua, tentukan jumlah mula-mula. Tiga, tentukan jumlah yang pergi. Empat, tulis ceritanya dengan kata kunci pengurangan. Lima, tulis kalimat matematika dan cari jawabannya. Enam, tukar soalmu dengan temanmu."
      >
        <div className="space-y-1.5">
          {LANGKAH_KARYA.map((c, i) => (
            <Baris key={c.nama} {...c} nomor={i + 1} />
          ))}
        </div>
      </PanelPoster>

      <div className="space-y-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3">
        <p className="text-center text-sm font-black text-[#14532D]">💡 INGAT</p>
        <div className="grid grid-cols-2 gap-2">
          {INGAT_D3.map((g) => (
            <button
              key={g.nama}
              type="button"
              aria-label={`Dengarkan: ${g.nama}`}
              onClick={() => speakGuru(g.suara)}
              className="igil-tanpa-tepi flex flex-col items-center gap-0.5 rounded-2xl bg-[#F0FDF4] px-1 py-2 text-center"
            >
              <span className="text-3xl">{g.ikon}</span>
              <span className="text-base font-black leading-tight text-[#14532D]">{g.nama}</span>
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]/80">{g.ket}</span>
              <LencanaSuara kelas="h-7 w-7" />
            </button>
          ))}
        </div>
      </div>
    </BingkaiTahap>
  );
}
