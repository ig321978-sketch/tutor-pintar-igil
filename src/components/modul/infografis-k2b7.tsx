"use client";

import React from "react";
import { KotakPoster, TabelPoster } from "./kit-k2b2";
import { BendaB7, Capung, Koleksi, Wadah } from "./dasar-k2b7";
import { BaganPasangan, GridSeratus, ModelBilangan, ModelDari, PapanBilangan, PapanNilai, StripAngka, TitikKelompok } from "./diagram-k2b7";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 7 (Ayo Membilang sampai dengan 100). Gambar  */
/* saja: teks panel dan suara berasal dari naskah-k2b7.ts. Tanpa API.          */
/* ------------------------------------------------------------------------ */

const Cap = ({ children, warna = "#1C01A5" }: { children: React.ReactNode; warna?: string }) => (
  <p className="text-center text-[11px] font-black leading-tight" style={{ color: warna }}>
    {children}
  </p>
);

const Chip = ({ children, warna = "#FFE566" }: { children: React.ReactNode; warna?: string }) => (
  <span className="inline-block rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
    {children}
  </span>
);

const Ubin = ({ children, ket, warna }: { children: React.ReactNode; ket?: React.ReactNode; warna?: string }) => (
  <KotakPoster warna={warna}>
    <div className="flex justify-center">{children}</div>
    {ket ? <Cap>{ket}</Cap> : null}
  </KotakPoster>
);

const Besar = ({ children }: { children: React.ReactNode }) => <span className="text-2xl font-black text-[#1C01A5]">{children}</span>;

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK2B7A(): React.ReactNode[] {
  return [
    /* 1 Sepuluh Satuan, Satu Puluhan */
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="flex items-center justify-center gap-2">
        <span className="flex w-[120px] flex-wrap justify-center">
          {Array.from({ length: 10 }, (_, i) => (
            <BendaB7 key={i} id="kue" ukuran={22} />
          ))}
        </span>
        <span className="text-3xl font-black text-[#1C01A5]">→</span>
        <Wadah benda="kue" ukuran={70} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>10 satuan = 1 puluhan</Chip>
      </div>
    </KotakPoster>,
    /* 2 Menghitung Puluhan */
    <KotakPoster key="2" warna="#E0F2FE">
      <StripAngka dari={10} sampai={100} langkah={10} />
      <div className="flex justify-center pt-1">
        <Chip warna="#BBF7D0">melompat sepuluh-sepuluh</Chip>
      </div>
    </KotakPoster>,
    /* 3 Seratus */
    <KotakPoster key="3" warna="#FFF7ED">
      <div className="flex justify-center">
        <Koleksi p={10} s={0} benda="kue" ukuran={64} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>10 puluhan = 100</Chip>
      </div>
    </KotakPoster>,
    /* 4 Puluhan dan Satuan */
    <KotakPoster key="4" warna="#FEF3C7">
      <div className="flex items-center justify-center gap-3">
        <Koleksi p={5} s={3} benda="rambutan" ukuran={52} />
        <ModelBilangan p={5} s={3} skala={0.7} />
      </div>
      <div className="flex justify-center gap-1.5 pt-1">
        <Chip warna="#BAE6FD">5 puluhan</Chip>
        <Chip warna="#FDE68A">3 satuan</Chip>
        <Chip warna="#BBF7D0">= 53</Chip>
      </div>
    </KotakPoster>,
    /* 5 Dua Cara Menentukan Banyak */
    <div key="5" className="grid grid-cols-2 gap-2">
      <Ubin ket="nilai tempat" warna="#DBEAFE">
        <PapanNilai p={5} s={3} kecil />
      </Ubin>
      <Ubin ket="pasangan bilangan: 50 dan 3" warna="#FCE7F3">
        <BaganPasangan total={53} a={50} b={3} />
      </Ubin>
    </div>,
    /* 6 Nama Bilangan */
    <TabelPoster key="6" kepala={["Bilangan", "Dibaca"]} kolom="1fr 2fr" baris={[["20", "dua puluh"], ["30", "tiga puluh"], ["40", "empat puluh"], ["50", "lima puluh"], ["60", "enam puluh"], ["70", "tujuh puluh"], ["80", "delapan puluh"], ["90", "sembilan puluh"], ["100", "seratus"]]} />,
    /* 7 Cara Memperkirakan */
    <KotakPoster key="7" warna="#F0FDF4">
      {["1. Bayangkan 10 benda dalam satu kelompok", "2. Tebak ada berapa kelompok", "3. Buktikan dengan menghitung"].map((t, i) => (
        <div key={t} className={`rounded-xl border-2 border-[#1C01A5] px-2 py-1 text-xs font-black text-[#1C01A5] ${i ? "mt-1" : ""}`} style={{ backgroundColor: ["#FFFFFF", "#FDE68A", "#BBF7D0"][i] }}>
          {t}
        </div>
      ))}
    </KotakPoster>,
    /* 8 Kelompokkan Setiap Sepuluh */
    <KotakPoster key="8" warna="#E0F2FE">
      <div className="flex justify-center">
        <TitikKelompok n={62} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>6 puluhan dan 2 satuan = 62</Chip>
      </div>
    </KotakPoster>,
    /* 9 Tabel Seratus */
    <KotakPoster key="9" warna="#EEF2FF">
      <GridSeratus dari={51} sampai={100} tersembunyi={[58, 65, 72]} />
      <Cap>turun satu baris: tambah 10</Cap>
    </KotakPoster>,
    /* 10 Tebakan yang Dekat */
    <KotakPoster key="10" warna="#FEF3C7">
      <div className="flex items-center justify-center gap-2">
        <div className="space-y-0.5 text-center">
          <Besar>50</Besar>
          <Cap>tebakan Kira</Cap>
          <Chip warna="#FECACA">beda 12</Chip>
        </div>
        <div className="space-y-0.5 text-center">
          <Besar>62</Besar>
          <Cap>banyak ikan</Cap>
          <Chip warna="#FFE566">sebenarnya</Chip>
        </div>
        <div className="space-y-0.5 text-center">
          <Besar>60</Besar>
          <Cap>tebakan Malosi</Cap>
          <Chip warna="#BBF7D0">beda 2</Chip>
        </div>
      </div>
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

export function visualInfografisK2B7B(): React.ReactNode[] {
  return [
    /* 1 Garis Bilangan */
    <KotakPoster key="1" warna="#DBEAFE">
      <StripAngka dari={54} sampai={62} tandai={58} penanda="🦋" />
      <div className="flex justify-center gap-2 pt-1">
        <Chip warna="#BAE6FD">kiri: lebih kecil</Chip>
        <Chip warna="#FDE68A">kanan: lebih besar</Chip>
      </div>
    </KotakPoster>,
    /* 2 Lebihnya dan Kurangnya */
    <div key="2" className="grid grid-cols-2 gap-2">
      <Ubin ket="2 lebihnya dari 58: maju ➡️ 60" warna="#DCFCE7">
        <StripAngka dari={57} sampai={61} tandai={60} penanda="🦋" />
      </Ubin>
      <Ubin ket="3 kurangnya dari 75: mundur ⬅️ 72" warna="#FEE2E2">
        <StripAngka dari={71} sampai={75} tandai={72} penanda={<Capung ukuran={22} />} />
      </Ubin>
    </div>,
    /* 3 Bandingkan Puluhan Dulu */
    <KotakPoster key="3" warna="#FEF3C7">
      <div className="flex items-end justify-center gap-4">
        <div className="space-y-1 text-center">
          <ModelDari n={56} skala={0.6} />
          <PapanBilangan n={56} kecil />
        </div>
        <span className="pb-6 text-3xl font-black text-[#1C01A5]">&lt;</span>
        <div className="space-y-1 text-center">
          <ModelDari n={65} skala={0.6} />
          <PapanBilangan n={65} kecil />
        </div>
      </div>
      <Cap>6 puluhan lebih banyak dari 5 puluhan</Cap>
    </KotakPoster>,
    /* 4 Puluhan Sama, Lihat Satuan */
    <KotakPoster key="4" warna="#FCE7F3">
      <div className="flex items-end justify-center gap-4">
        <div className="space-y-1 text-center">
          <PapanNilai p={5} s={4} kecil />
        </div>
        <span className="pb-3 text-3xl font-black text-[#1C01A5]">&lt;</span>
        <div className="space-y-1 text-center">
          <PapanNilai p={5} s={8} kecil />
        </div>
      </div>
      <Cap>puluhan sama, 8 satuan lebih banyak dari 4 satuan</Cap>
    </KotakPoster>,
    /* 5 Tiga Kata Perbandingan */
    <div key="5" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="lebih besar dari" warna="#FDE68A">
        <Besar>65 ? 56</Besar>
      </Ubin>
      <Ubin ket="lebih kecil dari" warna="#BAE6FD">
        <Besar>56 ? 65</Besar>
      </Ubin>
      <Ubin ket="sama dengan" warna="#BBF7D0">
        <Besar>54 ? 54</Besar>
      </Ubin>
    </div>,
    /* 6 Tiga Tanda Perbandingan */
    <div key="6" className="grid grid-cols-3 gap-1.5">
      <Ubin ket="lebih besar" warna="#FDE68A">
        <Besar>65 &gt; 56</Besar>
      </Ubin>
      <Ubin ket="lebih kecil" warna="#BAE6FD">
        <Besar>56 &lt; 65</Besar>
      </Ubin>
      <Ubin ket="sama dengan" warna="#BBF7D0">
        <Besar>54 = 54</Besar>
      </Ubin>
    </div>,
    /* 7 Mengurutkan Tiga Bilangan */
    <KotakPoster key="7" warna="#F0FDF4">
      <div className="flex items-end justify-center gap-3">
        {[57, 76, 83].map((n) => (
          <div key={n} className="space-y-0.5 text-center">
            <ModelDari n={n} skala={0.45} />
            <Besar>{n}</Besar>
          </div>
        ))}
      </div>
      <Cap>dari yang paling kecil: 57, 76, 83</Cap>
    </KotakPoster>,
    /* 8 Paling Besar, Paling Kecil */
    <div key="8" className="grid grid-cols-2 gap-2">
      <Ubin ket="paling kecil: puluhan paling sedikit" warna="#BAE6FD">
        <Besar>57</Besar>
      </Ubin>
      <Ubin ket="paling besar: puluhan paling banyak" warna="#FDE68A">
        <Besar>83</Besar>
      </Ubin>
    </div>,
    /* 9 Kartu Bilangan */
    <KotakPoster key="9" warna="#EEF2FF">
      <div className="flex items-center justify-center gap-2">
        {[3, 7].map((n) => (
          <span key={n} className="flex h-14 w-11 items-center justify-center rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl font-black text-[#1C01A5]">
            {n}
          </span>
        ))}
        <span className="text-2xl font-black text-[#1C01A5]">→</span>
        <div className="text-center">
          <Besar>73</Besar>
          <Cap>terbesar</Cap>
        </div>
        <div className="text-center">
          <Besar>37</Besar>
          <Cap>terkecil</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 10 Teka-Teki Kira */
    <KotakPoster key="10" warna="#FEF3C7">
      {["Tambah 4 puluhan dan 3 satuan menjadi 55", "55 = 5 puluhan dan 5 satuan", "Kurangi 4 puluhan dan 3 satuan", "Sisa 1 puluhan dan 2 satuan = 12"].map((t, i) => (
        <div key={t} className={`rounded-xl border-2 border-[#1C01A5] px-2 py-1 text-xs font-black text-[#1C01A5] ${i ? "mt-1" : ""}`} style={{ backgroundColor: ["#FFFFFF", "#FDE68A", "#FBCFE8", "#BBF7D0"][i] }}>
          {t}
        </div>
      ))}
    </KotakPoster>,
  ];
}
