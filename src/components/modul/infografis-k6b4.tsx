"use client";
import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { BatangSkala, KartuDadu, KartuKoin, KantongBola, RodaPutarRingkas } from "./skala-peluang";

const Cap = ({ children }: { children: React.ReactNode }) => (
  <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{children}</p>
);

const Chip = ({ children, warna = "#FFE566" }: { children: React.ReactNode; warna?: string }) => (
  <span
    className="inline-block rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-[11px] font-black text-[#1C01A5]"
    style={{ backgroundColor: warna }}
  >
    {children}
  </span>
);

export function visualInfografisK6B4A(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#E2E8F0">
      <p className="text-center text-lg font-black">Tidak mungkin</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip warna="#FECACA">peluang 0</Chip>
        <Chip warna="#E2E8F0">ujung kiri</Chip>
      </div>
      <Cap>tidak pernah terjadi · contoh: dadu angka 7</Cap>
    </KotakPoster>,
    <KotakPoster key="2" warna="#BAE6FD">
      <p className="text-center text-lg font-black">Kurang mungkin</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip warna="#BAE6FD">jarang</Chip>
        <Chip>dekat 0</Chip>
      </div>
      <Cap>bisa, tapi jarang · contoh: angka 6 sekali</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#FDE68A">
      <p className="text-center text-lg font-black">Mungkin</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip warna="#FDE68A">bisa ya/tidak</Chip>
        <Chip>tengah</Chip>
      </div>
      <Cap>pakai bukti · contoh: hujan sore</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#FDBA74">
      <p className="text-center text-lg font-black">Sangat mungkin</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip warna="#FDBA74">sering</Chip>
        <Chip>dekat pasti</Chip>
      </div>
      <Cap>hampir rutin · belum 100%</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#86EFAC">
      <p className="text-center text-lg font-black">Pasti</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip warna="#86EFAC">selalu</Chip>
        <Chip>ujung kanan</Chip>
      </div>
      <Cap>selalu terjadi · peluang penuh</Cap>
    </KotakPoster>,
    <KotakPoster key="6" warna="#DBEAFE">
      <p className="mb-1 text-center text-sm font-black">5 tangga spektrum</p>
      <BatangSkala kecil />
      <Cap>tidak mungkin → … → pasti</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7">
      <p className="mb-1 text-center text-sm font-black">Koin 2 sisi</p>
      <KartuKoin sisi="dua" />
      <Cap>1/2 = 1/2 · sama mungkin</Cap>
    </KotakPoster>,
    <KotakPoster key="8" warna="#E0E7FF">
      <p className="mb-1 text-center text-sm font-black">Dadu 1–6</p>
      <KartuDadu sisi={[1, 2, 3, 4, 5, 6]} />
      <Cap>satu angka = 1 dari 6</Cap>
    </KotakPoster>,
    <KotakPoster key="9" warna="#FCE7F3">
      <p className="mb-1 text-center text-sm font-black">Roda putar</p>
      <RodaPutarRingkas
        sektor={[
          { label: "Merah", kelas: "#f87171", bagian: 3 },
          { label: "Biru", kelas: "#60a5fa", bagian: 1 },
          { label: "Hijau", kelas: "#4ade80", bagian: 1 },
        ]}
      />
      <Cap>area lebar ≈ peluang besar</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3">
      <p className="text-center text-lg font-black">Siap Sub-Bab B</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip>bandingkan</Chip>
        <Chip warna="#BBF7D0">rasio</Chip>
      </div>
      <Cap>favorable ÷ total · adil?</Cap>
    </KotakPoster>,
  ];
}

export function visualInfografisK6B4B(): React.ReactNode[] {
  return [
    <KotakPoster key="1" warna="#BBF7D0">
      <p className="text-center text-lg font-black">Favorable</p>
      <Chip warna="#BBF7D0">pembilang</Chip>
      <Cap>hasil yang diinginkan</Cap>
    </KotakPoster>,
    <KotakPoster key="2" warna="#DBEAFE">
      <p className="text-center text-lg font-black">Total</p>
      <Chip warna="#DBEAFE">penyebut</Chip>
      <Cap>semua hasil mungkin</Cap>
    </KotakPoster>,
    <KotakPoster key="3" warna="#FEF3C7">
      <p className="text-center text-3xl font-black">a / n</p>
      <Cap>favorable ÷ total</Cap>
    </KotakPoster>,
    <KotakPoster key="4" warna="#FCE7F3">
      <p className="text-center text-lg font-black">Bandingkan</p>
      <div className="mt-1 flex justify-center gap-1">
        <Chip>A</Chip>
        <span className="text-sm font-black text-[#1C01A5]">vs</span>
        <Chip warna="#FCE7F3">B</Chip>
      </div>
      <Cap>pecahan mana lebih besar?</Cap>
    </KotakPoster>,
    <KotakPoster key="5" warna="#E0E7FF">
      <p className="text-center text-lg font-black">Adil</p>
      <Cap>peluang tiap pemain sama</Cap>
    </KotakPoster>,
    <KotakPoster key="6" warna="#FECACA">
      <p className="text-center text-lg font-black">Kurang adil</p>
      <Cap>peluang beda · cek rasio</Cap>
    </KotakPoster>,
    <KotakPoster key="7" warna="#FEF3C7">
      <p className="mb-1 text-center text-sm font-black">Koin gambar</p>
      <KartuKoin sisi="gambar" />
      <Cap>1/2 &gt; 1/6 dadu</Cap>
    </KotakPoster>,
    <KotakPoster key="8" warna="#E0E7FF">
      <p className="mb-1 text-center text-sm font-black">Dadu angka 6</p>
      <KartuDadu sisi={[6]} />
      <Cap>1 dari 6 · lebih kecil</Cap>
    </KotakPoster>,
    <KotakPoster key="9" warna="#FFEDD5">
      <p className="mb-1 text-center text-sm font-black">Mantap 4/7</p>
      <KantongBola
        isi={[
          { warna: "biru", jumlah: 4, kelas: "bg-sky-400" },
          { warna: "lain", jumlah: 3, kelas: "bg-rose-300" },
        ]}
      />
      <Cap>4/7 &gt; 3/7 · belum pasti</Cap>
    </KotakPoster>,
    <KotakPoster key="10" warna="#FEF9C3">
      <p className="text-center text-lg font-black">besar ≠ pasti</p>
      <Cap>rasio besar tetap bisa gagal</Cap>
    </KotakPoster>,
  ];
}
