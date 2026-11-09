"use client";

import React from "react";
import { KotakPoster } from "./kit-k2b2";
import { AngkaBerwarna, ModelDari, ModelTiga, PapanDari, TabelTempat, WARNA_TEMPAT } from "./diagram-k3b1";
import { TitikKotak } from "./diagram-k3b1f";
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

/* ====================================================================== */
/* Sub-Bab C                                                                */
/* ====================================================================== */

/** Dua model berdampingan dengan tanda perbandingan di tengah. */
const Banding = ({ a, b, tanda, skala = 0.62 }: { a: number; b: number; tanda: string; skala?: number }) => (
  <div className="flex items-center justify-center gap-1.5">
    <div className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
      <ModelDari n={a} skala={skala} />
      <Cap>{a}</Cap>
    </div>
    <span className="text-3xl font-black text-[#1C01A5]">{tanda}</span>
    <div className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white px-1.5 py-1">
      <ModelDari n={b} skala={skala} />
      <Cap>{b}</Cap>
    </div>
  </div>
);

export function visualInfografisK3B1C(): React.ReactNode[] {
  return [
    /* 1 Lebih, Kurang, Sama */
    <KotakPoster key="1" warna="#FEF3C7">
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {[
          ["339 < 421", "kurang dari"],
          ["583 > 529", "lebih dari"],
          ["804 = 804", "sama dengan"],
        ].map(([a, ket]) => (
          <div key={a} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1.5">
            <p className="text-base font-black text-[#1C01A5]">{a}</p>
            <Cap>{ket}</Cap>
          </div>
        ))}
      </div>
    </KotakPoster>,
    /* 2 Ratusan Dulu */
    <KotakPoster key="2" warna="#DCFCE7">
      <Banding a={339} b={421} tanda="<" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.ratusan.isi}>3 ratusan kurang dari 4 ratusan</Chip>
      </div>
    </KotakPoster>,
    /* 3 Lalu Puluhan */
    <KotakPoster key="3" warna="#DBEAFE">
      <Banding a={583} b={529} tanda=">" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.puluhan.isi}>ratusan sama, 8 puluhan lebih dari 2</Chip>
      </div>
    </KotakPoster>,
    /* 4 Terakhir Satuan */
    <KotakPoster key="4" warna="#FEE2E2">
      <Banding a={769} b={761} tanda=">" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.satuan.isi}>ratusan dan puluhan sama, 9 lebih dari 1</Chip>
      </div>
    </KotakPoster>,
    /* 5 Tiga Tanda */
    <KotakPoster key="5" warna="#F5F3FF">
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {[
          ["<", "kurang dari"],
          [">", "lebih dari"],
          ["=", "sama dengan"],
        ].map(([t, ket]) => (
          <div key={t} className="rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1">
            <p className="text-4xl font-black leading-none text-[#1C01A5]">{t}</p>
            <Cap>{ket}</Cap>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <Chip>mulut terbuka ke yang lebih besar</Chip>
      </div>
    </KotakPoster>,
    /* 6 Bilangan yang Sama */
    <KotakPoster key="6" warna="#ECFCCB">
      <Banding a={804} b={804} tanda="=" />
    </KotakPoster>,
    /* 7 Tiga Bilangan */
    <KotakPoster key="7" warna="#FFF7ED">
      <div className="grid grid-cols-3 gap-1">
        {[639, 709, 720].map((n) => (
          <div key={n} className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1">
            <ModelDari n={n} skala={0.45} />
            <Cap>{n}</Cap>
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-1">
        <Chip>639 &lt; 709 &lt; 720</Chip>
      </div>
    </KotakPoster>,
    /* 8 Urutan Naik */
    <KotakPoster key="8" warna="#E0F2FE">
      <div className="flex items-center justify-center gap-1.5">
        {[639, 709, 720].map((n, i) => (
          <React.Fragment key={n}>
            {i ? <span className="text-xl font-black text-[#1C01A5]">→</span> : null}
            <Chip warna="#BBF7D0">{n}</Chip>
          </React.Fragment>
        ))}
      </div>
      <Cap>dari terkecil ke terbesar</Cap>
    </KotakPoster>,
    /* 9 Urutan Turun */
    <KotakPoster key="9" warna="#FCE7F3">
      <div className="flex items-center justify-center gap-1.5">
        {[720, 709, 639].map((n, i) => (
          <React.Fragment key={n}>
            {i ? <span className="text-xl font-black text-[#1C01A5]">→</span> : null}
            <Chip warna="#BFDBFE">{n}</Chip>
          </React.Fragment>
        ))}
      </div>
      <Cap>dari terbesar ke terkecil</Cap>
    </KotakPoster>,
    /* 10 Cara Membandingkan */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Tulis di papan nilai tempat", "2. Bandingkan ratusan dulu", "3. Bila sama: puluhan, lalu satuan", "4. Tulis hasilnya dengan tanda"]} warna={["#BAE6FD", "#BBF7D0", "#FDE68A", "#FECACA"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab D                                                                */
/* ====================================================================== */

/** Penjumlahan bersusun kecil: kolom puluhan dan satuan, simpanan di atas, hasil di bawah. */
const SusunMini = ({ a, b, tampilHasil = true, sorot }: { a: number; b: number; tampilHasil?: boolean; sorot?: "p" | "s" }) => {
  const sa = a % 10;
  const sb = b % 10;
  const simpan = sa + sb >= 10;
  const hasil = a + b;
  const sel = (isi: React.ReactNode, kuat = false, warna?: string) => (
    <span className={`flex h-9 w-14 items-center justify-center rounded-lg text-2xl font-black ${kuat ? "ring-4 ring-[#F0AB00]" : ""}`} style={{ color: warna ?? "#1C01A5" }}>
      {isi}
    </span>
  );
  return (
    <div className="mx-auto w-fit rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1">
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-1 text-center">
        <span />
        <span className="text-[10px] font-black" style={{ color: WARNA_TEMPAT.puluhan.teks }}>Puluhan</span>
        <span className="text-[10px] font-black" style={{ color: WARNA_TEMPAT.satuan.teks }}>Satuan</span>
        <span />
        {sel(simpan ? "1" : "", false, "#DC2626")}
        {sel("")}
        <span className="text-2xl font-black text-[#1C01A5]" />
        {sel(Math.floor(a / 10), sorot === "p")}
        {sel(sa, sorot === "s")}
        <span className="text-2xl font-black text-[#1C01A5]">+</span>
        {sel(Math.floor(b / 10), sorot === "p")}
        {sel(sb, sorot === "s")}
      </div>
      <div className="my-0.5 h-0.5 bg-[#1C01A5]" />
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-1 text-center">
        <span className="w-4" />
        {sel(tampilHasil ? Math.floor(hasil / 10) : "?", false, "#16A34A")}
        {sel(tampilHasil ? hasil % 10 : "?", false, "#16A34A")}
      </div>
    </div>
  );
};

export function visualInfografisK3B1D(): React.ReactNode[] {
  return [
    /* 1 Susun Lurus */
    <KotakPoster key="1" warna="#FCE7F3">
      <SusunMini a={23} b={16} tampilHasil={false} />
      <div className="flex justify-center pt-1">
        <Chip>puluhan lurus puluhan, satuan lurus satuan</Chip>
      </div>
    </KotakPoster>,
    /* 2 Satuan Lebih Dulu */
    <KotakPoster key="2" warna="#FEE2E2">
      <SusunMini a={23} b={16} tampilHasil={false} sorot="s" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.satuan.isi}>3 + 6 = 9</Chip>
      </div>
    </KotakPoster>,
    /* 3 Puluhan Berikutnya */
    <KotakPoster key="3" warna="#DBEAFE">
      <SusunMini a={23} b={16} sorot="p" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.puluhan.isi}>2 + 1 = 3, hasilnya 39</Chip>
      </div>
    </KotakPoster>,
    /* 4 Menyimpan */
    <KotakPoster key="4" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <p className="text-lg font-black text-[#1C01A5]">8 + 6 = 14</p>
        <Chip>14 = 1 puluhan + 4 satuan</Chip>
        <Cap>tulis 4 di satuan, simpan 1 puluhan</Cap>
      </div>
    </KotakPoster>,
    /* 5 Contoh 23 + 16 */
    <KotakPoster key="5" warna="#DCFCE7">
      <SusunMini a={23} b={16} />
    </KotakPoster>,
    /* 6 Contoh 48 + 16 */
    <KotakPoster key="6" warna="#E0E7FF">
      <SusunMini a={48} b={16} />
    </KotakPoster>,
    /* 7 Susun Panjang */
    <KotakPoster key="7" warna="#FFF7ED">
      <div className="space-y-1 text-center text-sm font-black text-[#1C01A5]">
        <p>54 = 50 + 4</p>
        <p>29 = 20 + 9</p>
        <p>(50 + 20) + (4 + 9)</p>
        <p>= 70 + 13 = 83</p>
      </div>
    </KotakPoster>,
    /* 8 Tiga Bilangan */
    <KotakPoster key="8" warna="#F5F3FF">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">23 + 30 = 53</Chip>
        <p className="text-sm font-black text-[#1C01A5]">lalu 53 + 12 = 65</p>
      </div>
    </KotakPoster>,
    /* 9 Soal Cerita */
    <KotakPoster key="9" warna="#ECFCCB">
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#1C01A5]">25 buku + 36 pensil</p>
        <Chip>25 + 36 = 61 barang</Chip>
      </div>
    </KotakPoster>,
    /* 10 Cara Memeriksa */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Susun lurus", "2. Jumlahkan satuan, simpan bila perlu", "3. Jumlahkan puluhan", "4. Periksa dengan cara lain"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab E                                                                */
/* ====================================================================== */

/** Pengurangan bersusun kecil: kolom puluhan dan satuan, angka pinjaman merah di atas, hasil hijau di bawah. */
const KurangMini = ({ a, b, tampilHasil = true, sorot, tampilPinjam = true }: { a: number; b: number; tampilHasil?: boolean; sorot?: "p" | "s"; tampilPinjam?: boolean }) => {
  const sa = a % 10;
  const sb = b % 10;
  const ambil = sa < sb && tampilPinjam;
  const hasil = a - b;
  const sel = (isi: React.ReactNode, kuat = false, warna?: string, redup = false) => (
    <span className={`flex h-9 w-14 items-center justify-center rounded-lg text-2xl font-black ${kuat ? "ring-4 ring-[#F0AB00]" : ""}`} style={{ color: warna ?? "#1C01A5", opacity: redup ? 0.45 : 1 }}>
      {isi}
    </span>
  );
  return (
    <div className="mx-auto w-fit rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1">
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-1 text-center">
        <span />
        <span className="text-[10px] font-black" style={{ color: WARNA_TEMPAT.puluhan.teks }}>Puluhan</span>
        <span className="text-[10px] font-black" style={{ color: WARNA_TEMPAT.satuan.teks }}>Satuan</span>
        <span />
        <span />
        {sel(ambil ? Math.floor(a / 10) - 1 : "", false, "#DC2626")}
        {sel(ambil ? sa + 10 : "", false, "#DC2626")}
        <span />
        {sel(Math.floor(a / 10), sorot === "p", undefined, ambil)}
        {sel(sa, sorot === "s", undefined, ambil)}
        <span className="text-2xl font-black text-[#1C01A5]">−</span>
        {sel(Math.floor(b / 10), sorot === "p")}
        {sel(sb, sorot === "s")}
      </div>
      <div className="my-0.5 h-0.5 bg-[#1C01A5]" />
      <div className="grid grid-cols-[auto_auto_auto] items-center gap-x-1 text-center">
        <span className="w-4" />
        {sel(tampilHasil ? Math.floor(hasil / 10) : "?", false, "#16A34A")}
        {sel(tampilHasil ? hasil % 10 : "?", false, "#16A34A")}
      </div>
    </div>
  );
};

export function visualInfografisK3B1E(): React.ReactNode[] {
  return [
    /* 1 Susun Lurus */
    <KotakPoster key="1" warna="#E0F2FE">
      <KurangMini a={25} b={12} tampilHasil={false} />
      <div className="flex justify-center pt-1">
        <Chip>puluhan lurus puluhan, satuan lurus satuan</Chip>
      </div>
    </KotakPoster>,
    /* 2 Satuan Lebih Dulu */
    <KotakPoster key="2" warna="#FEE2E2">
      <KurangMini a={25} b={12} tampilHasil={false} sorot="s" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.satuan.isi}>5 − 2 = 3</Chip>
      </div>
    </KotakPoster>,
    /* 3 Puluhan Berikutnya */
    <KotakPoster key="3" warna="#DBEAFE">
      <KurangMini a={25} b={12} sorot="p" />
      <div className="flex justify-center pt-1">
        <Chip warna={WARNA_TEMPAT.puluhan.isi}>2 − 1 = 1, hasilnya 13</Chip>
      </div>
    </KotakPoster>,
    /* 4 Mengambil */
    <KotakPoster key="4" warna="#FEF9C3">
      <div className="space-y-1 text-center">
        <p className="text-lg font-black text-[#1C01A5]">5 kurang dari 9</p>
        <Chip>ambil 1 puluhan: 4 puluhan menjadi 3</Chip>
        <Cap>1 puluhan = 10 satuan, jadi 10 + 5 = 15</Cap>
        <p className="text-lg font-black text-[#DC2626]">15 − 9 = 6</p>
      </div>
    </KotakPoster>,
    /* 5 Contoh 25 − 12 */
    <KotakPoster key="5" warna="#DCFCE7">
      <KurangMini a={25} b={12} />
    </KotakPoster>,
    /* 6 Contoh 45 − 19 */
    <KotakPoster key="6" warna="#E0E7FF">
      <KurangMini a={45} b={19} />
    </KotakPoster>,
    /* 7 Susun Panjang */
    <KotakPoster key="7" warna="#FFF7ED">
      <div className="space-y-1 text-center text-sm font-black text-[#1C01A5]">
        <p>45 = 30 + 15</p>
        <p>19 = 10 + 9</p>
        <p>(30 − 10) + (15 − 9)</p>
        <p>= 20 + 6 = 26</p>
      </div>
    </KotakPoster>,
    /* 8 Memeriksa */
    <KotakPoster key="8" warna="#F5F3FF">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">45 − 19 = 26</Chip>
        <p className="text-sm font-black text-[#1C01A5]">periksa: 26 + 19 = 45</p>
      </div>
    </KotakPoster>,
    /* 9 Soal Cerita */
    <KotakPoster key="9" warna="#ECFCCB">
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#1C01A5]">45 buku tulis, dibeli 19</p>
        <Chip>45 − 19 = 26 buku tersisa</Chip>
      </div>
    </KotakPoster>,
    /* 10 Cara Mengurangkan */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Susun lurus", "2. Kurangkan satuan, ambil 1 puluhan bila perlu", "3. Kurangkan puluhan", "4. Periksa dengan penjumlahan"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}

/* ====================================================================== */
/* Sub-Bab F                                                                */
/* ====================================================================== */

/** Garis bilangan kecil: loncatan sama besar dari nol. Hanya diagram. */
const GarisLoncat = ({ n, k }: { n: number; k: number }) => {
  const lebar = 280;
  const awal = 20;
  const langkah = (lebar - 2 * awal) / k;
  return (
    <svg viewBox={`0 0 ${lebar} 70`} className="mx-auto block w-full max-w-[300px]" role="img" aria-label={`${k} loncatan sebesar ${n} dari 0 mendarat di ${k * n}`}>
      <line x1={awal - 8} x2={lebar - awal + 8} y1="48" y2="48" stroke="#1C01A5" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: k + 1 }, (_, i) => (
        <g key={i}>
          <line x1={awal + i * langkah} x2={awal + i * langkah} y1="42" y2="54" stroke="#1C01A5" strokeWidth="3" />
          <text x={awal + i * langkah} y="68" textAnchor="middle" fontSize="12" fontWeight="900" fill="#1C01A5">
            {i * n}
          </text>
        </g>
      ))}
      {Array.from({ length: k }, (_, i) => (
        <path key={i} d={`M ${awal + i * langkah} 44 Q ${awal + (i + 0.5) * langkah} 6 ${awal + (i + 1) * langkah} 44`} fill="none" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
      ))}
    </svg>
  );
};

export function visualInfografisK3B1F(): React.ReactNode[] {
  return [
    /* 1 Kelompok Sama Banyak */
    <KotakPoster key="1" warna="#FEF3C7">
      <div className="flex justify-center">
        <TitikKotak k={3} n={4} />
      </div>
      <Cap>3 kotak, tiap kotak berisi 4 titik</Cap>
    </KotakPoster>,
    /* 2 Lima Kali Dua */
    <KotakPoster key="2" warna="#FEE2E2">
      <div className="flex justify-center">
        <TitikKotak k={5} n={2} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>2 + 2 + 2 + 2 + 2 = 10</Chip>
      </div>
    </KotakPoster>,
    /* 3 Penjumlahan Berulang */
    <KotakPoster key="3" warna="#DBEAFE">
      <div className="space-y-1 text-center">
        <Chip warna="#BAE6FD">5 + 5 + 5 + 5</Chip>
        <p className="text-lg font-black text-[#1C01A5]">= 4 × 5</p>
        <Cap>penjumlahan berulang ditulis dengan kali</Cap>
      </div>
    </KotakPoster>,
    /* 4 Empat Kali Lima */
    <KotakPoster key="4" warna="#DCFCE7">
      <div className="flex justify-center">
        <TitikKotak k={4} n={5} ukuran={9} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip warna="#BBF7D0">4 × 5 = 20</Chip>
      </div>
    </KotakPoster>,
    /* 5 Banyak Kelompok dan Isi */
    <KotakPoster key="5" warna="#FFFBEB">
      <div className="flex items-end justify-center gap-3 text-center">
        <div>
          <p className="text-5xl font-black text-[#1D4ED8]">4</p>
          <Cap warna="#1D4ED8">banyak kelompok</Cap>
        </div>
        <Tanda>×</Tanda>
        <div>
          <p className="text-5xl font-black text-[#DC2626]">5</p>
          <Cap warna="#DC2626">isi tiap kelompok</Cap>
        </div>
      </div>
    </KotakPoster>,
    /* 6 Garis Bilangan */
    <KotakPoster key="6" warna="#E0E7FF">
      <GarisLoncat n={5} k={4} />
      <Cap>4 loncatan sebesar 5 mendarat di 20</Cap>
    </KotakPoster>,
    /* 7 Tukar Tempat */
    <KotakPoster key="7" warna="#F5F3FF">
      <div className="space-y-1 text-center">
        <Chip warna="#BFDBFE">5 × 6 = 30</Chip>
        <p className="text-lg font-black text-[#1C01A5]">=</p>
        <Chip warna="#FECACA">6 × 5 = 30</Chip>
        <Cap>bilangan boleh ditukar tempatnya</Cap>
      </div>
    </KotakPoster>,
    /* 8 Lima Kali Empat */
    <KotakPoster key="8" warna="#E0F2FE">
      <div className="flex justify-center">
        <TitikKotak k={5} n={4} ukuran={8} />
      </div>
      <div className="flex justify-center pt-1">
        <Chip>5 × 4 = 20</Chip>
      </div>
    </KotakPoster>,
    /* 9 Soal Cerita */
    <KotakPoster key="9" warna="#ECFCCB">
      <div className="space-y-1 text-center">
        <p className="text-sm font-black text-[#1C01A5]">6 kelas, tiap kelas 2 papan tulis</p>
        <Chip>6 × 2 = 12 papan tulis</Chip>
      </div>
    </KotakPoster>,
    /* 10 Cara Mengalikan */
    <KotakPoster key="10" warna="#FFFBEB">
      <Langkah daftar={["1. Cari banyak kelompok", "2. Cari isi tiap kelompok", "3. Tulis perkalian atau penjumlahan berulang", "4. Hitung hasilnya"]} warna={["#BAE6FD", "#FECACA", "#BFDBFE", "#FDE68A"]} />
    </KotakPoster>,
  ];
}
