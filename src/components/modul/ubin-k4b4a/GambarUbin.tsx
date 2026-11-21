"use client";

import React from "react";
import { ACUAN, barisKartu, besarTB, dasarDari, hitungO, hitungX, kecilTB, lebarBangun, pojokKisi, selBangun, sisiBangun, sisiBersama, selKisi, sentiDari, sisiUbin, teksRibu, type Cara, type Kisi, type Langkah, type LangkahDasar, type Rupa } from "./logika-cpa";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab A (pengukuran luas: ubin dalam kisi, baris kali kolom, tangga satuan):
 * Concrete = ubin berwarna beremoji tetes di lantai tepi kolam, Pictorial = petak dan tangga polos di kertas denah, Abstract = kartu kata dan angka.
 * Ubin tiap kisi dihitung dari logika murni (sisiUbin, selKisi, pojokKisi), jadi gambar sungguh sebanyak baris kali kolom, sama besar, rapat tanpa celah.
 * Dipakai bersama oleh tugas CPA (LangkahUbin) dan Simulasi Lantai Ubin.
 */
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
/** Emoji tetes air pada ubin Concrete (maksimal U+1FA95, tanpa ZWJ). */
export const EMOJI_UBIN = "\u{1F4A7}";

export const WARNA_UBIN = {
  benda: { latar: "#E0F2FE", garis: "#0369A1", isi: "#F0F9FF", aksen: "#38BDF8", angka: "#0C4A6E", ubin: ["#BAE6FD", "#E0F2FE"], kosong: "#F1F5F9" },
  diagram: { latar: "#F8FAFC", garis: "#334155", isi: "#FFFFFF", aksen: "#94A3B8", angka: "#1E293B", ubin: ["#FFFFFF", "#FFFFFF"], kosong: "#FFFFFF" },
} as const;
export const warnaUbin = (rupa: Rupa) => (rupa === "benda" ? WARNA_UBIN.benda : WARNA_UBIN.diagram);

export function Gambar({ label, judul, children, rupa = "benda", tinggi = 200 }: { label: string; judul: string; children: React.ReactNode; rupa?: Rupa; tinggi?: number }) {
  return (
    <svg viewBox={`0 0 300 ${tinggi}`} className={SVG} aria-label={label} role="img">
      <rect x={0} y={0} width={300} height={tinggi} rx={12} fill={warnaUbin(rupa).latar} />
      <text x={150} y={15} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/**
 * Kisi `b` baris dan `k` kolom ubin sama besar, rapat tanpa celah, rata di tengah daerah [x0, x0 + lebar]. `terpasang`: banyak ubin yang sudah dipasang (baris demi baris dari kiri-atas);
 * sisanya digambar putus-putus. Concrete = ubin berwarna dengan tetes air, Pictorial = petak polos.
 */
export function KisiUbin({ b, k, terpasang, rupa, y0 = 28, x0 = 20, lebar = 260, tinggi = 112, maks = 34, acuan }: { b: number; k: number; terpasang?: number; rupa: Rupa; y0?: number; x0?: number; lebar?: number; tinggi?: number; maks?: number; acuan?: { b: number; k: number } }) {
  const w = warnaUbin(rupa);
  const s = sisiUbin(b, k, lebar, tinggi, maks);
  const pos = pojokKisi(k, s, x0, lebar, y0);
  const ada = terpasang ?? b * k;
  return (
    <g data-kisi="1" data-baris={b} data-kolom={k} data-sisi={s}>
      {selKisi(b, k, ada).map((c) => {
        const x = pos.x + c.kolom * s;
        const y = pos.y + c.baris * s;
        return (
          <g key={c.i} data-ubin="1">
            <rect x={x} y={y} width={s} height={s} fill={acuan && c.baris < acuan.b && c.kolom < acuan.k ? "#FDE68A" : c.terpasang ? w.ubin[(c.baris + c.kolom) % 2] : w.kosong} stroke={w.garis} strokeWidth={c.terpasang ? 1.2 : 1} strokeDasharray={c.terpasang ? undefined : "3 2"} />
            {rupa === "benda" && s >= 25 && c.terpasang && !(acuan && c.baris < acuan.b && c.kolom < acuan.k) ? (
              <text x={x + s / 2} y={y + s / 2 + s * 0.2} textAnchor="middle" fontSize={Math.max(14, s * 0.55)} aria-hidden="true">
                {EMOJI_UBIN}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
/** Tinggi kisi yang digambar (dipakai untuk menaruh keterangan di bawahnya). */
export const tinggiKisi = (b: number, k: number, lebar = 260, tinggi = 112, maks = 34): number => b * sisiUbin(b, k, lebar, tinggi, maks);

const Ket = ({ y, teks, rupa, ukuran = 14 }: { y: number; teks: string; rupa: Rupa; ukuran?: number }) => (
  <text x={150} y={y} textAnchor="middle" fontSize={ukuran} fontWeight={900} fill={warnaUbin(rupa).garis}>
    {teks}
  </text>
);

/** Kisi berlabel baris dan kolom: "k kolom" di atas dan "b baris" di kiri (Rows and Columns). */
export function KisiBerlabel({ g, rupa, acuan }: { g: Kisi; rupa: Rupa; acuan?: { b: number; k: number } }) {
  const w = warnaUbin(rupa);
  const lebar = 200;
  const s = sisiUbin(g.b, g.k, lebar, 100, 34);
  const pos = pojokKisi(g.k, s, 50, lebar, 40);
  return (
    <g>
      <text x={pos.x + (g.k * s) / 2} y={34} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.angka} data-label="kolom">
        {g.k} kolom
      </text>
      <text x={pos.x - 6} y={pos.y + (g.b * s) / 2 + 4} textAnchor="end" fontSize={14} fontWeight={900} fill={w.angka} data-label="baris">
        {g.b} baris
      </text>
      <KisiUbin b={g.b} k={g.k} rupa={rupa} y0={40} x0={50} lebar={lebar} tinggi={100} acuan={acuan} />
    </g>
  );
}

/**
 * Lembar satuan tidak baku: `baris` x `kolom` sel berukuran cw x ch, rata di tengah daerah [x0, x0 + lebar]. Satuan besar bersel persegi, satuan kecil bersel separuh tinggi (dua kali lebih banyak),
 * jadi kedua susunan menutupi permukaan yang sama luasnya.
 */
export function KisiLembar({ baris, kolom, cw, ch, x0, lebar, y0, warna, garis }: { baris: number; kolom: number; cw: number; ch: number; x0: number; lebar: number; y0: number; warna: string; garis: string }) {
  const x = x0 + (lebar - kolom * cw) / 2;
  return (
    <g data-lembar="1" data-baris={baris} data-kolom={kolom} data-lebar-sel={cw} data-tinggi-sel={ch}>
      {Array.from({ length: baris * kolom }, (_, i) => (
        <rect key={i} x={x + (i % kolom) * cw} y={y0 + Math.floor(i / kolom) * ch} width={cw} height={ch} fill={warna} stroke={garis} strokeWidth={1} />
      ))}
    </g>
  );
}

/** Bangun dari persegi satuan: "X" digambar penuh, "o" putus-putus (belum digambar), "." kosong. Sungguh sebanyak huruf pada bangun. */
export function BangunUbin({ mask, x0, lebar, y0, tinggi, maks, rupa, sisi }: { mask: string[]; x0: number; lebar: number; y0: number; tinggi: number; maks: number; rupa: Rupa; sisi?: number }) {
  const w = warnaUbin(rupa);
  const s = sisi ?? sisiBangun(mask, lebar, tinggi, maks);
  const x = x0 + (lebar - lebarBangun(mask) * s) / 2;
  return (
    <g data-bangun="1" data-luas={hitungX(mask)} data-belum={hitungO(mask)} data-sisi={s}>
      {selBangun(mask).map((c) => (
        <rect key={`${c.baris}-${c.kolom}`} x={x + c.kolom * s} y={y0 + c.baris * s} width={s} height={s} fill={c.ada ? (rupa === "benda" ? "#BAE6FD" : "#FFFFFF") : "none"} stroke={w.garis} strokeWidth={c.ada ? 1.3 : 1.1} strokeDasharray={c.ada ? undefined : "3 2"} data-sel={c.ada ? "ada" : "belum"} />
      ))}
    </g>
  );
}
/** Tinggi bangun yang digambar. */
export const tinggiBangun = (mask: string[], lebar: number, tinggi: number, maks: number): number => mask.length * sisiBangun(mask, lebar, tinggi, maks);

/* ------------------------------ Tangga satuan ------------------------------ */
/**
 * Tangga satuan: anak tangga bawah untuk sentimeter persegi dan anak tangga atas untuk meter persegi. `arah` turun = dari m² ke cm² (m² diketahui), naik = dari cm² ke m² (cm² diketahui).
 * `isi` adalah isian sisi yang dicari (tanda tanya bila belum diisi).
 */
export function TanggaSatuan({ m, arah, rupa, isi = "?" }: { m: number; arah: "turun" | "naik"; rupa: Rupa; isi?: string }) {
  const w = warnaUbin(rupa);
  const besarIsi = arah === "turun" ? `${m} m²` : `${isi} m²`;
  const kecilIsi = arah === "naik" ? `${teksRibu(sentiDari(m))} cm²` : `${isi} cm²`;
  return (
    <g data-tangga={arah}>
      <rect x={30} y={96} width={110} height={40} rx={4} fill={w.ubin[0]} stroke={w.garis} strokeWidth={1.6} />
      <text x={85} y={122} textAnchor="middle" fontSize={14} fontWeight={900} fill={arah === "naik" ? w.angka : "#DC2626"} data-sel="kecil">
        {kecilIsi}
      </text>
      <text x={85} y={150} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.garis}>
        kecil: cm²
      </text>
      <rect x={140} y={56} width={110} height={80} rx={4} fill={w.ubin[1]} stroke={w.garis} strokeWidth={1.6} />
      <text x={195} y={101} textAnchor="middle" fontSize={15} fontWeight={900} fill={arah === "turun" ? w.angka : "#DC2626"} data-sel="besar">
        {besarIsi}
      </text>
      <text x={195} y={150} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.garis}>
        besar: m²
      </text>
      <line x1={arah === "turun" ? 150 : 130} y1={arah === "turun" ? 40 : 54} x2={arah === "turun" ? 130 : 150} y2={arah === "turun" ? 54 : 40} stroke={arah === "turun" ? "#DC2626" : "#15803D"} strokeWidth={2.4} />
      <text x={150} y={32} textAnchor="middle" fontSize={14} fontWeight={900} fill={arah === "turun" ? "#DC2626" : "#15803D"}>
        {arah === "turun" ? "turun tangga" : "naik tangga"}
      </text>
      <text x={150} y={176} textAnchor="middle" fontSize={14} fontWeight={900} fill={w.angka}>
        1 m² = 10.000 cm²
      </text>
    </g>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#67E8F9] bg-[#ECFEFF] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#0E7490]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#164E63]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#0E7490] bg-[#CFFAFE] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,144,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  satuan: "satuan dan susunan lantai",
  tidakbaku: "satuan tidak baku",
  bangun: "bangun dari persegi satuan",
  baris: "baris kali kolom",
  tangga: "tangga satuan",
};

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d = dasarDari(l);
  if (rupa === "lambang")
    return (
      <PapanInfo>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </PapanInfo>
    );
  const benda = rupa === "benda";
  switch (d.tipe) {
    case "satuan": {
      if (cara === "suara") {
        // Tidak baku: lembar besar dan lembar kecil menutup lantai yang sama; hasilnya berbeda.
        const sb = sisiUbin(d.g.b, d.g.k, 120, 90, 26);
        const sk = sb / 2;
        const xb = 20;
        const xk = 164;
        return (
          <Gambar rupa={rupa} label="Lantai yang sama ditutup lembar besar dan lembar kecil" judul={benda ? "lantai maket di tepi kolam" : "lantai maket"}>
            <KisiUbin b={d.g.b} k={d.g.k} rupa={rupa} x0={xb} lebar={120} tinggi={90} maks={sb} y0={44} />
            <KisiUbin b={d.g.b * 2} k={d.g.k * 2} rupa={rupa} x0={xk} lebar={120} tinggi={90} maks={sk} y0={44} />
            <text x={xb + 60} y={44 + d.g.b * sb + 18} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
              {d.g.b * d.g.k} lembar besar
            </text>
            <text x={xk + 60} y={44 + d.g.b * sb + 18} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
              {d.g.b * d.g.k * 4} lembar kecil
            </text>
            <Ket y={180} teks="ukuran lembar beda, hasil beda" rupa={rupa} />
          </Gambar>
        );
      }
      const tinggiG = tinggiKisi(d.g.b, d.g.k);
      return (
        <Gambar rupa={rupa} label={`Lantai ${d.g.b} baris ${d.g.k} kolom ubin`} judul={benda ? "lantai ubin tepi kolam" : "lantai berpetak"}>
          <KisiUbin b={d.g.b} k={d.g.k} rupa={rupa} />
          <Ket y={28 + tinggiG + 20} teks={cara === "klik" ? `sisi satu ubin: 1 ${d.g.u === "cm²" ? "cm" : "m"}` : `tiap baris berisi ${d.g.k} ubin`} rupa={rupa} />
          <Ket y={28 + tinggiG + 40} teks={cara === "klik" ? "luas satu ubin: ?" : "banyak baris: ?"} rupa={rupa} />
        </Gambar>
      );
    }
    case "tidakbaku": {
      const cw = Math.min(30, Math.floor(130 / d.k));
      const warnaK = benda ? "#BBF7D0" : "#FFFFFF";
      const garisK = benda ? "#15803D" : "#334155";
      const warnaB = benda ? "#FBCFE8" : "#F1F5F9";
      const garisB = benda ? "#BE185D" : "#334155";
      const tinggiG = d.r * cw;
      const yl = 52 + tinggiG + 18;
      const labelK = cara === "kanvas" ? `${kecilTB(d)} ${d.nama[0]}` : "? " + d.nama[0];
      const labelB = cara === "klik" ? `${besarTB(d)} ${d.nama[1]}` : "? " + d.nama[1];
      return (
        <Gambar rupa={rupa} label={`Permukaan yang sama ditutup ${d.nama[0]} dan ${d.nama[1]}`} judul={benda ? "permukaan meja ditutup lembar" : "permukaan ditutup lembar"}>
          <text x={79} y={44} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
            {d.nama[0]}
          </text>
          <text x={221} y={44} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
            {d.nama[1]}
          </text>
          <KisiLembar baris={2 * d.r} kolom={d.k} cw={cw} ch={cw / 2} x0={14} lebar={130} y0={52} warna={warnaK} garis={garisK} />
          <KisiLembar baris={d.r} kolom={d.k} cw={cw} ch={cw} x0={156} lebar={130} y0={52} warna={warnaB} garis={garisB} />
          <text x={79} y={yl} textAnchor="middle" fontSize={14} fontWeight={900} fill={cara === "kanvas" ? warnaUbin(rupa).angka : "#DC2626"} data-label="kecil">
            {labelK}
          </text>
          <text x={221} y={yl} textAnchor="middle" fontSize={14} fontWeight={900} fill={cara === "klik" ? warnaUbin(rupa).angka : "#DC2626"} data-label="besar">
            {labelB}
          </text>
          <Ket y={yl + 22} teks={`${d.nama[1]} = 2 ${d.nama[0]}`} rupa={rupa} />
        </Gambar>
      );
    }
    case "bangun": {
      if (cara === "kanvas") {
        const tg = tinggiBangun(d.b, 260, 90, 26);
        return (
          <Gambar rupa={rupa} label={`Bangun dengan luas ${hitungX(d.b) + hitungO(d.b)} ${d.u}, ${hitungO(d.b)} persegi satuan belum digambar`} judul={benda ? "bangun baru di tepi kolam" : "bangun baru"}>
            <BangunUbin mask={d.b} x0={20} lebar={260} y0={36} tinggi={90} maks={26} rupa={rupa} />
            <Ket y={36 + tg + 22} teks={`luas bangun: ${hitungX(d.b) + hitungO(d.b)} ${d.u}`} rupa={rupa} />
            <Ket y={36 + tg + 40} teks="putus-putus: belum digambar" rupa={rupa} />
          </Gambar>
        );
      }
      const sb = sisiBersama(d.a, d.b, 130, 90, 24);
      const tg = Math.max(d.a.length, d.b.length) * sb;
      return (
        <Gambar rupa={rupa} label="Dua bangun berbeda bentuk dari persegi satuan yang sama besar" judul={benda ? "dua bangun di tepi kolam" : "dua bangun"}>
          <BangunUbin mask={d.a} x0={14} lebar={130} y0={40} tinggi={90} maks={24} rupa={rupa} sisi={sb} />
          <BangunUbin mask={d.b} x0={156} lebar={130} y0={40} tinggi={90} maks={24} rupa={rupa} sisi={sb} />
          <text x={79} y={40 + tg + 18} textAnchor="middle" fontSize={14} fontWeight={900} fill={warnaUbin(rupa).angka}>
            {cara === "klik" ? `bangun A: ${hitungX(d.a)} ${d.u}` : "bangun A"}
          </text>
          <text x={221} y={40 + tg + 18} textAnchor="middle" fontSize={14} fontWeight={900} fill={cara === "klik" ? "#DC2626" : warnaUbin(rupa).angka}>
            {cara === "klik" ? "bangun B: ?" : "bangun B"}
          </text>
          <Ket y={40 + tg + 42} teks="persegi satuan sama besar" rupa={rupa} />
        </Gambar>
      );
    }
    case "baris": {
      const s = sisiUbin(d.g.b, d.g.k, 200, 100, 34);
      return (
        <Gambar rupa={rupa} label={`Lantai ${d.g.b} baris ${d.g.k} kolom ubin`} judul={benda ? "lantai ubin tepi kolam" : "lantai berpetak"}>
          <KisiBerlabel g={d.g} rupa={rupa} acuan={d.duga ? ACUAN : undefined} />
          <Ket y={40 + d.g.b * s + 22} teks={d.duga ? (d.benda ? `kuning = acuan, 1 ubin ≈ ${d.benda}` : `kuning = acuan: ${ACUAN.b * ACUAN.k} ${d.g.u}`) : `satu ubin = 1 ${d.g.u}`} rupa={rupa} />
          <Ket y={40 + d.g.b * s + 40} teks="luas lantai: ?" rupa={rupa} />
        </Gambar>
      );
    }
    case "tangga": {
      const arah = cara === "kanvas" ? "naik" : d.arah;
      return (
        <Gambar rupa={rupa} label={arah === "turun" ? `${d.m} meter persegi diubah ke sentimeter persegi` : `${teksRibu(sentiDari(d.m))} sentimeter persegi diubah ke meter persegi`} judul={benda ? "tangga satuan luas kolam" : "tangga satuan luas"}>
          <TanggaSatuan m={d.m} arah={arah} rupa={rupa} />
        </Gambar>
      );
    }
  }
}
