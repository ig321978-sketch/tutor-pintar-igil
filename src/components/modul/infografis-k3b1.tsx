"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { AngkaBerwarna, ModelDari, ModelTiga, PapanDari, TabelTempat, WARNA_TEMPAT } from "./diagram-k3b1";
import { kata, nilaiTempat, tiga, uraian } from "./data-k3b1";

/* ------------------------------------------------------------------------ */
/* Isi visual panel Infografis Bab 1 (Bilangan Cacah sampai 1.000). Gambar      */
/* saja: teks panel dan suara berasal dari naskah-k3b1.ts. Hanya diagram,       */
/* tanpa gambar benda. Tanpa API.                                               */
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

const Langkah = ({ daftar, warna }: { daftar: string[]; warna: string[] }) => (
  <>
    {daftar.map((t, i) => (
      <div key={t} className={`rounded-xl border-2 border-[#1C01A5] px-2 py-1 text-xs font-black text-[#1C01A5] ${i ? "mt-1" : ""}`} style={{ backgroundColor: warna[i % warna.length] }}>
        {t}
      </div>
    ))}
  </>
);

const Tanda = ({ children }: { children: React.ReactNode }) => <span className="text-xl font-black text-[#1C01A5]">{children}</span>;

/** Kotak kecil berisi satu model dan keterangan. */
const Sel = ({ n, ket, skala = 0.9 }: { n: number; ket: string; skala?: number }) => (
  <div className="flex flex-col items-center justify-end gap-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
    <ModelDari n={n} skala={skala} />
    <Cap>{ket}</Cap>
  </div>
);

/* ====================================================================== */
/* Sub-Bab A                                                                */
/* ====================================================================== */

export function visualInfografisK3B1A(): React.ReactNode[] {
  return [
    /* 1 Satuan, Puluhan, Ratusan */
    <KotakPoster key="1" warna="#FEF9C3">
      <div className="flex items-end justify-center gap-1.5">
        <Sel n={1} ket="1 satuan" />
        <Tanda>×10</Tanda>
        <Sel n={10} ket="1 puluhan" />
        <Tanda>×10</Tanda>
        <Sel n={100} ket="1 ratusan" skala={0.8} />
      </div>
    </KotakPoster>,
    /* 2 Seratus Satuan */
    <KotakPoster key="2" warna="#DCFCE7">
      <div className="flex items-center justify-center gap-2">
        <ModelTiga r={1} p={0} s={0} skala={1.4} />
        <div className="space-y-1 text-center">
          <Chip warna="#BBF7D0">10 puluhan</Chip>
          <Cap>= 10 × 10</Cap>
          <Chip>100 satuan</Chip>
        </div>
      </div>
    </KotakPoster>,
    /* 3 Papan Tiga Tempat */
    <KotakPoster key="3" warna="#DBEAFE">
      <div className="space-y-1.5">
        <PapanDari n={152} />
        <div className="flex justify-center">
          <Chip>1 ratusan, 5 puluhan, 2 satuan = 152</Chip>
        </div>
      </div>
    </KotakPoster>,
    /* 4 Kata Ratusan */
    <KotakPoster key="4" warna="#F0FDF4">
      <div className="grid grid-cols-3 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((r) => (
          <div key={r} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-0.5 text-center">
            <p className="text-sm font-black" style={{ color: WARNA_TEMPAT.ratusan.teks }}>{r * 100}</p>
            <p className="text-[10px] font-black leading-tight text-[#1C01A5]">{kata(r * 100)}</p>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 5 Kata Puluhan */
    <KotakPoster key="5" warna="#EFF6FF">
      <div className="grid grid-cols-4 gap-1">
        {[10, 11, 12, 15, 20, 30, 50, 90].map((p) => (
          <div key={p} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-0.5 text-center">
            <p className="text-sm font-black" style={{ color: WARNA_TEMPAT.puluhan.teks }}>{p}</p>
            <p className="text-[10px] font-black leading-tight text-[#1C01A5]">{kata(p)}</p>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 6 Membaca 160 */
    <KotakPoster key="6" warna="#FFF7ED">
      <div className="space-y-1.5">
        <PapanDari n={160} kecil />
        <div className="flex flex-wrap items-center justify-center gap-1">
          <Chip warna={WARNA_TEMPAT.ratusan.isi}>seratus</Chip>
          <Chip warna={WARNA_TEMPAT.puluhan.isi}>enam puluh</Chip>
          <Chip warna="#F3F4F6">(0 tidak dibaca)</Chip>
        </div>
        <Cap>160 = seratus enam puluh</Cap>
      </div>
    </KotakPoster>,
    /* 7 Angka Nol */
    <KotakPoster key="7" warna="#F5F3FF">
      <div className="space-y-1">
        {[703, 900, 160].map((n) => (
          <div key={n} className="flex items-center justify-between gap-2 rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1">
            <AngkaBerwarna n={n} ukuran="text-2xl" />
            <span className="text-right text-xs font-black text-[#1C01A5]">{kata(n)}</span>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 8 Menulis 572 */
    <KotakPoster key="8" warna="#FEF3C7">
      <div className="flex items-center justify-center gap-1.5">
        <Chip warna={WARNA_TEMPAT.ratusan.isi}>lima ratus → 5</Chip>
        <Chip warna={WARNA_TEMPAT.puluhan.isi}>tujuh puluh → 7</Chip>
        <Chip warna={WARNA_TEMPAT.satuan.isi}>dua → 2</Chip>
      </div>
      <div className="flex justify-center pt-1.5">
        <AngkaBerwarna n={572} ukuran="text-4xl" />
      </div>
    </KotakPoster>,
    /* 9 Bilangan di Sekitar Kita */
    <KotakPoster key="9" warna="#E0F2FE">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["🏫", "671", "meter ke sekolah"],
          ["🚩", "160", "cm tongkat"],
          ["📏", "127", "cm tinggi badan"],
          ["🚆", "220", "km/jam kereta"],
        ].map(([e, n, ket]) => (
          <div key={n} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1 text-center">
            <p className="text-lg leading-none">{e}</p>
            <p className="text-xl font-black text-[#1C01A5]">{n}</p>
            <Cap>{ket}</Cap>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 10 Cara Membaca dan Menulis */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Cari tempat tiap angka", "2. Baca ratusan, puluhan, satuan", "3. Lewati angka nol", "4. Menulis: isi tempat kosong dengan 0"]} warna={["#BBF7D0", "#BFDBFE", "#FDE68A", "#FECACA"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab B                                                                */
/* ====================================================================== */

const baris = (n: number) => {
  const d = tiga(n);
  return { n: String(n), r: String(d.r), p: String(d.p), s: String(d.s) };
};

export function visualInfografisK3B1B(): React.ReactNode[] {
  return [
    /* 1 Angka dan Tempatnya */
    <KotakPoster key="1" warna="#E0E7FF">
      <div className="space-y-1.5">
        <PapanDari n={127} />
        <div className="flex justify-center">
          <Chip>127 cm: tiga angka, tiga tempat</Chip>
        </div>
      </div>
    </KotakPoster>,
    /* 2 Tempat Menentukan Nilai */
    <KotakPoster key="2" warna="#FEF3C7">
      <div className="space-y-1">
        {[
          ["600", "ratusan", WARNA_TEMPAT.ratusan],
          ["60", "puluhan", WARNA_TEMPAT.puluhan],
          ["6", "satuan", WARNA_TEMPAT.satuan],
        ].map(([n, t, w]) => {
          const warna = w as (typeof WARNA_TEMPAT)["ratusan"];
          return (
            <div key={n as string} className="flex items-center justify-between rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1">
              <span className="text-xl font-black text-[#1C01A5]">{n as string}</span>
              <span className="rounded-full px-2 py-0.5 text-xs font-black" style={{ backgroundColor: warna.isi, color: warna.teks }}>
                angka 6 di {t as string} = {n as string}
              </span>
            </div>
          );
        })}
      </div>
    </KotakPoster>,
    /* 3 Nilai 251 */
    <KotakPoster key="3" warna="#DBEAFE">
      <TabelTempat
        kepala={["Bilangan", "Ratusan", "Puluhan", "Satuan"]}
        baris={[
          { n: "251", r: "2", p: "5", s: "1" },
          { n: "nilai", r: String(nilaiTempat(251, "ratusan")), p: String(nilaiTempat(251, "puluhan")), s: String(nilaiTempat(251, "satuan")) },
        ]}
      />
    </KotakPoster>,
    /* 4 Tiga Kaleng */
    <KotakPoster key="4" warna="#F0FDF4">
      <div className="grid grid-cols-3 gap-1.5">
        {[
          ["Ratusan", "2", "#BAE6FD", WARNA_TEMPAT.ratusan.teks],
          ["Puluhan", "1", "#DDD6FE", WARNA_TEMPAT.puluhan.teks],
          ["Satuan", "9", "#FEF08A", WARNA_TEMPAT.satuan.teks],
        ].map(([j, d, bg, tinta]) => (
          <div key={j} className="flex flex-col items-center gap-0.5">
            <div className="flex h-14 w-full items-center justify-center rounded-b-2xl rounded-t-md border-[3px] border-[#1C01A5] text-3xl font-black text-[#1C01A5]" style={{ backgroundColor: bg }}>
              {d}
            </div>
            <Cap warna={tinta}>{j}</Cap>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <Chip>kartu 2, 1, 9 → 219</Chip>
      </div>
    </KotakPoster>,
    /* 5 Menyusun Bilangan */
    <KotakPoster key="5" warna="#F5F3FF">
      <div className="flex items-center justify-center gap-2">
        <ModelDari n={251} skala={1.1} />
        <div className="space-y-1 text-center">
          <Chip warna={WARNA_TEMPAT.ratusan.isi}>2 ratusan</Chip>
          <Chip warna={WARNA_TEMPAT.puluhan.isi}>5 puluhan</Chip>
          <Chip warna={WARNA_TEMPAT.satuan.isi}>1 satuan</Chip>
        </div>
      </div>
      <div className="flex justify-center pt-1">
        <Chip>200 + 50 + 1 = 251</Chip>
      </div>
    </KotakPoster>,
    /* 6 Mengurai Bilangan */
    <KotakPoster key="6" warna="#FFF7ED">
      <div className="flex items-center justify-center gap-2">
        <ModelDari n={602} skala={1.1} />
        <div className="space-y-1 text-center">
          <Cap>602 diurai</Cap>
          <Chip>{uraian(602)}</Chip>
          <Cap>6 ratusan, 0 puluhan, 2 satuan</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 7 Angka Nol */
    <KotakPoster key="7" warna="#EFF6FF">
      <div className="space-y-1.5">
        <PapanDari n={805} kecil />
        <div className="flex justify-center">
          <Chip>805 = {uraian(805)}</Chip>
        </div>
        <Cap>nol menjaga tempat puluhan</Cap>
      </div>
    </KotakPoster>,
    /* 8 Tabel Nilai Tempat */
    <KotakPoster key="8" warna="#FEF9C3">
      <div className="space-y-1.5">
        <TabelTempat baris={[baris(987)]} kepala={["Bilangan", "Ratusan", "Puluhan", "Satuan"]} />
        <div className="grid grid-cols-2 gap-1">
          <p className="rounded-xl border-2 border-[#16A34A] bg-[#DCFCE7] px-1 py-0.5 text-center text-[11px] font-black text-[#14532D]">✔ isi: 9, 8, 7</p>
          <p className="rounded-xl border-2 border-[#DC2626] bg-[#FEE2E2] px-1 py-0.5 text-center text-[11px] font-black text-[#7F1D1D]">✘ bukan 900, 80, 7</p>
        </div>
      </div>
    </KotakPoster>,
    /* 9 Angka 8 di Mana? */
    <KotakPoster key="9" warna="#FCE7F3">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          [981, "puluhan"],
          [845, "ratusan"],
          [108, "satuan"],
          [800, "ratusan"],
        ].map(([n, t]) => (
          <div key={n as number} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1 text-center">
            <p className="text-xl font-black text-[#1C01A5]">{n as number}</p>
            <Cap>angka 8 di {t as string}</Cap>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 10 Cara Menentukan Nilai Tempat */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Tulis di papan tiga tempat", "2. Lihat tempat tiap angka", "3. Kali 100, 10, atau 1", "4. Jumlahkan untuk mengecek"]} warna={["#BAE6FD", "#FDE68A", "#BBF7D0", "#FECACA"]} />
    </KotakPoster>,
  ];
}
