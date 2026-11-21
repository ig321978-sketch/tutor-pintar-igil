"use client";

import React from "react";
import { HARGA, STOK_UANG, URUT_TEMPAT, angkaDi, barisKartu, dasarDari, namaSatuan, rb, teksUrai, type Cara, type Langkah, type LangkahDasar, type LUang, type Pecahan, type Rupa, type Tempat } from "./logika-cpa";
import { FS_RIBU, FS_RATUS, LEBAR_LEMBAR, R_KEPING, TINGGI_LEMBAR, isiDari, susunBagan, susunBalok, susunRak, susunUang } from "./tata";

/**
 * Gambar tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab D (menyusun dan menguraikan bilangan):
 * Concrete = rak kios kelapa, satu baris untuk tiap tempat angka berisi keranjang dan butir beremoji sebanyak angkanya (tata.ts), dan rak bagan untuk bilangan kelipatan seratus,
 * Pictorial = bagan tempat angka dengan balok cacah polos (satu balok untuk tiap angka) dan bagan bagian utuh polos, Abstract = kartu kata dan angka.
 * Dipakai bersama oleh tugas CPA (LangkahKelapa) dan Simulasi Kios Kelapa.
 */
const BIRU = "#1C01A5";
const JINGGA = "#C2410C";
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";

/** Emoji benda kios kelapa untuk tahap Concrete (maksimal U+1FA95, tanpa ZWJ). Satu emoji untuk satu benda. */
export const EMOJI_BENDA: Record<string, string> = {
  kelapa: "\u{1F965}",
  nanas: "\u{1F34D}",
  semangka: "\u{1F349}",
  kerang: "\u{1F41A}",
  apel: "\u{1F34E}",
};
/** Keranjang untuk ribuan, ratusan, dan puluhan (makin kecil makin sedikit isinya). */
export const EMOJI_KERANJANG = "\u{1F9FA}";
const NAMA_TEMPAT: Record<Tempat, string> = { ribuan: "ribuan", ratusan: "ratusan", puluhan: "puluhan", satuan: "satuan" };
const WARNA_BALOK: Record<Tempat, string> = { ribuan: "#2563EB", ratusan: "#16A34A", puluhan: "#F59E0B", satuan: "#7C3AED" };

export function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label} role="img">
      <text x={150} y={14} textAnchor="middle" fontSize={10} fontWeight={900} fill={BIRU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}

/* ------------------------------ Rak keranjang (Concrete) ------------------------------ */
/** Rak kios: empat baris (ribuan, ratusan, puluhan, satuan), tiap baris berisi sebanyak `isi` keranjang (satuan: butir benda). Baris `sorotKe` dibingkai merah. */
export function Rak({ isi, benda, judul, sorotKe = -1 }: { isi: number[]; benda: string; judul: string; sorotKe?: number }) {
  const butir = EMOJI_BENDA[benda] ?? EMOJI_BENDA.kelapa;
  const baris = susunRak(0, isi);
  return (
    <Gambar label={`Rak kios: ${judul}`} judul={judul}>
      <rect x={8} y={20} width={284} height={178} rx={6} fill="#FDE68A" stroke="#7C4A1E" strokeWidth={2.4} />
      {baris.map((b, i) => (
        <g key={b.tempat} data-tempat={b.tempat} data-jumlah={b.jumlah}>
          <rect x={12} y={b.y} width={276} height={b.tinggi} rx={3} fill={i === sorotKe ? "#FEE2E2" : "#FEF3C7"} stroke={i === sorotKe ? "#DC2626" : "#B7814A"} strokeWidth={i === sorotKe ? 3 : 1.2} />
          <text x={18} y={b.y + 16} fontSize={9} fontWeight={900} fill="#7C2D12">
            {NAMA_TEMPAT[b.tempat]}
          </text>
          <text x={18} y={b.y + 31} fontSize={11} fontWeight={900} fill="#9A3412">
            {rb(b.harga)}
          </text>
          {b.xs.map((x, j) => (
            <text key={j} x={x} y={b.y + b.tinggi / 2 + b.fs * 0.35} fontSize={b.fs} aria-hidden="true">
              {b.tempat === "satuan" ? butir : EMOJI_KERANJANG}
            </text>
          ))}
        </g>
      ))}
    </Gambar>
  );
}

/** Rak bagan untuk bilangan kelipatan seratus: baris utuh, baris bagian, dan baris bagian lain (disembunyikan "?" atau hanya angka klaim). */
function RakBagan({ utuh, bagian, klaim, benda, cara }: { utuh: number; bagian: number; klaim?: number; benda: string; cara: Cara }) {
  const tampilKlaim = cara === "suara" && klaim !== undefined;
  const baris = [susunBagan(utuh, "utuh", 24), susunBagan(bagian, "bagian", 74)];
  return (
    <Gambar label={`Rak bagan: ${benda}`} judul={`keranjang ${benda}: utuh = bagian + bagian`}>
      <rect x={8} y={20} width={284} height={178} rx={6} fill="#FDE68A" stroke="#7C4A1E" strokeWidth={2.4} />
      {baris.map((b, i) => (
        <g key={b.nama} data-baris={b.nama} data-ribu={b.ribu.length} data-ratus={b.ratus.length}>
          <rect x={12} y={b.y} width={276} height={46} rx={3} fill="#FEF3C7" stroke="#B7814A" strokeWidth={1.2} />
          <text x={18} y={b.y + 18} fontSize={9} fontWeight={900} fill="#7C2D12">
            {b.nama}
          </text>
          <text x={18} y={b.y + 35} fontSize={11} fontWeight={900} fill="#9A3412">
            {rb(i === 0 ? utuh : bagian)}
          </text>
          {b.ribu.map((x, j) => (
            <text key={`r${j}`} x={x} y={b.y + 23 + FS_RIBU * 0.35} fontSize={FS_RIBU} aria-hidden="true">
              {EMOJI_KERANJANG}
            </text>
          ))}
          {b.ratus.map((x, j) => (
            <text key={`t${j}`} x={x} y={b.y + 23 + FS_RATUS * 0.35} fontSize={FS_RATUS} aria-hidden="true">
              {EMOJI_KERANJANG}
            </text>
          ))}
        </g>
      ))}
      <rect x={12} y={124} width={276} height={46} rx={3} fill="#FFFFFF" stroke="#DC2626" strokeWidth={1.6} strokeDasharray="5 3" />
      <text x={18} y={142} fontSize={9} fontWeight={900} fill="#7C2D12">
        bagian 2
      </text>
      <text x={18} y={159} fontSize={11} fontWeight={900} fill="#DC2626">
        {tampilKlaim ? rb(klaim as number) : "?"}
      </text>
      {tampilKlaim ? null : (
        <text x={150} y={156} textAnchor="middle" fontSize={22} fontWeight={900} fill="#DC2626">
          ?
        </text>
      )}
    </Gambar>
  );
}

/* ------------------------------ Balok cacah polos (Pictorial) ------------------------------ */
/** Bagan tempat angka: empat kolom, tiap kolom satu balok untuk tiap angka (kubus besar, lempeng, batang, kubus kecil). `tampilAngka` false menyembunyikan angka (tanda tanya). */
export function BaganTempat({ n, judul, tampilAngka }: { n: number; judul: string; tampilAngka: boolean }) {
  const kolom = susunBalok(n);
  return (
    <Gambar label={`Bagan tempat angka: ${judul}`} judul={judul}>
      <rect x={6} y={22} width={288} height={170} rx={6} fill="#FFFBEB" stroke={JINGGA} strokeWidth={2.4} />
      {kolom.map((c, i) => (
        <g key={c.tempat} data-tempat={c.tempat} data-jumlah={c.jumlah}>
          {i > 0 ? <line x1={c.x0 - 2} y1={28} x2={c.x0 - 2} y2={186} stroke="#FDBA74" strokeWidth={1.4} /> : null}
          <text x={c.x0 + 32} y={40} textAnchor="middle" fontSize={9} fontWeight={900} fill={JINGGA}>
            {NAMA_TEMPAT[c.tempat]}
          </text>
          <text x={c.x0 + 32} y={53} textAnchor="middle" fontSize={9} fontWeight={900} fill="#9A3412">
            {rb(HARGA[c.tempat])}
          </text>
          <text x={c.x0 + 32} y={86} textAnchor="middle" fontSize={26} fontWeight={900} fill={BIRU}>
            {tampilAngka ? angkaDi(n, c.tempat) : "?"}
          </text>
          {c.balok.map((b, j) => (
            <rect key={j} data-balok={c.tempat} x={b.x} y={b.y} width={b.w} height={b.h} rx={1.5} fill={WARNA_BALOK[c.tempat]} stroke="#1E293B" strokeWidth={0.8} />
          ))}
        </g>
      ))}
    </Gambar>
  );
}

/** Bagan bagian utuh polos: satu kotak besar (utuh) dan dua kotak kecil (bagian), dihubungkan garis. */
export function BaganUtuh({ utuh, bagian, lain, judul }: { utuh: string; bagian: string; lain: string; judul: string }) {
  return (
    <Gambar label={`Bagan bagian utuh: ${judul}`} judul={judul}>
      <rect x={6} y={22} width={288} height={170} rx={6} fill="#FFFBEB" stroke={JINGGA} strokeWidth={2.4} />
      <line x1={150} y1={72} x2={80} y2={104} stroke={BIRU} strokeWidth={2} />
      <line x1={150} y1={72} x2={220} y2={104} stroke={BIRU} strokeWidth={2} />
      <rect x={90} y={28} width={120} height={44} rx={8} fill="#FFEDD5" stroke={JINGGA} strokeWidth={2.4} />
      <text x={150} y={41} textAnchor="middle" fontSize={9} fontWeight={900} fill={JINGGA}>
        utuh
      </text>
      <text x={150} y={64} textAnchor="middle" fontSize={utuh.length > 5 ? 18 : 22} fontWeight={900} fill={BIRU}>
        {utuh}
      </text>
      {[
        { x: 22, t: bagian },
        { x: 168, t: lain },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={104} width={110} height={52} rx={8} fill={b.t === "?" ? "#FFFFFF" : "#DBEAFE"} stroke={b.t === "?" ? "#DC2626" : BIRU} strokeWidth={2.4} strokeDasharray={b.t === "?" ? "5 3" : undefined} />
          <text x={b.x + 55} y={118} textAnchor="middle" fontSize={9} fontWeight={900} fill={JINGGA}>
            bagian
          </text>
          <text x={b.x + 55} y={146} textAnchor="middle" fontSize={b.t.length > 6 ? 16 : 20} fontWeight={900} fill={b.t === "?" ? "#DC2626" : BIRU}>
            {b.t}
          </text>
        </g>
      ))}
      <text x={150} y={178} textAnchor="middle" fontSize={11} fontWeight={900} fill="#9A3412">
        utuh = bagian + bagian
      </text>
    </Gambar>
  );
}

/* ------------------------------ Uang Pak Darwis (Concrete berwarna, Pictorial polos) ------------------------------ */
/** Warna uang tahap Concrete: lembar Rp 2.000 abu-abu biru, keping Rp 1.000 kuning emas, Rp 500 perak, Rp 100 perunggu. */
const WARNA_UANG: Record<Pecahan, { isi: string; garis: string }> = {
  2000: { isi: "#93A8C4", garis: "#334155" },
  1000: { isi: "#FACC15", garis: "#A16207" },
  500: { isi: "#E5E7EB", garis: "#6B7280" },
  100: { isi: "#D97706", garis: "#78350F" },
};
/**
 * Uang di kotak kios: empat baris (Rp 2.000, 1.000, 500, 100), tiap baris berisi sebanyak banyaknya lembar atau keping (satu gambar tiap lembar atau keping).
 * `berwarna` true (Concrete): lembar dan keping berwarna seperti uang sungguhan; false (Pictorial): diagram polos, hanya bentuk dengan garis biru (persegi panjang = lembar, lingkaran = keping).
 * Baris `tanya` kosong dengan tanda tanya. Tanpa emoji.
 */
export function Uang({ isi, tanya, judul, berwarna }: { isi: LUang["isi"]; tanya?: Pecahan; judul: string; berwarna: boolean }) {
  const baris = susunUang(isi, tanya);
  return (
    <Gambar label={`${berwarna ? "Uang di kotak kios" : "Diagram uang"}: ${judul}`} judul={judul}>
      <rect x={8} y={20} width={284} height={178} rx={6} fill={berwarna ? "#FDE68A" : "#F8FAFC"} stroke={berwarna ? "#7C4A1E" : JINGGA} strokeWidth={2.4} />
      {baris.map((b) => (
        <g key={b.pecahan} data-pecahan={b.pecahan} data-jumlah={b.jumlah} data-tanya={b.tanya ? "ya" : "tidak"}>
          <rect x={12} y={b.y} width={276} height={b.tinggi} rx={3} fill={berwarna ? "#FEF3C7" : "#FFFFFF"} stroke={berwarna ? "#B7814A" : "#94A3B8"} strokeWidth={1.2} />
          <text x={18} y={b.y + 16} fontSize={9} fontWeight={900} fill={berwarna ? "#7C2D12" : JINGGA}>
            {b.jenis}
          </text>
          <text x={18} y={b.y + 31} fontSize={11} fontWeight={900} fill={berwarna ? "#9A3412" : BIRU}>
            {rb(b.pecahan)}
          </text>
          {b.tanya ? (
            <>
              <rect x={74} y={b.y + 5} width={150} height={b.tinggi - 10} rx={4} fill="#FFFFFF" stroke="#DC2626" strokeWidth={1.6} strokeDasharray="5 3" />
              <text x={149} y={b.y + b.tinggi / 2 + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
                ?
              </text>
            </>
          ) : null}
          {b.xs.map((x, j) =>
            b.jenis === "lembar" ? (
              <rect key={j} data-uang={b.pecahan} x={x} y={b.y + (b.tinggi - TINGGI_LEMBAR) / 2} width={LEBAR_LEMBAR} height={TINGGI_LEMBAR} rx={2} fill={berwarna ? WARNA_UANG[b.pecahan].isi : "#FFFFFF"} stroke={berwarna ? WARNA_UANG[b.pecahan].garis : BIRU} strokeWidth={berwarna ? 1.4 : 1.8} />
            ) : (
              <circle key={j} data-uang={b.pecahan} cx={x + R_KEPING} cy={b.y + b.tinggi / 2} r={R_KEPING} fill={berwarna ? WARNA_UANG[b.pecahan].isi : "#FFFFFF"} stroke={berwarna ? WARNA_UANG[b.pecahan].garis : BIRU} strokeWidth={berwarna ? 1.4 : 1.8} />
            ),
          )}
        </g>
      ))}
    </Gambar>
  );
}

/** Gambar satu tugas uang menurut caranya: Klik = semua uang yang ada di kotak; Kanvas = uraian dengan satu pecahan belum terisi; Suara = uraian yang diperiksa. */
function GambarUang({ d, rupa, cara }: { d: LUang; rupa: Rupa; cara: Cara }) {
  const judul = `bayar Rp ${rb(d.n)}`;
  const berwarna = rupa === "benda";
  if (cara === "klik") return <Uang isi={STOK_UANG} judul={`${judul}: uang yang ada`} berwarna={berwarna} />;
  if (cara === "kanvas") return <Uang isi={d.isi} tanya={d.tanya} judul={`${judul}: satu pecahan kosong`} berwarna={berwarna} />;
  return <Uang isi={d.klaim ?? d.isi} judul={`${judul}: uraian ini`} berwarna={berwarna} />;
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#86B98F] bg-[#FFFBEB] px-3 py-2 text-left shadow-inner">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#166534]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#14532D]">
          {b}
        </span>
      ))}
    </div>
  );
}
export const PapanInfo = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-[#15803D] bg-[#FFFBEB] p-2 font-mono" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(220,38,38,0.16) 0 1px,transparent 1px 22px)" }}>
    {children}
  </div>
);

const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  urai: "pecah bilangan",
  susun: "susun bilangan",
  bagan: "bagan bagian utuh",
  lain: "lebih dari satu cara",
  uang: "uraikan uang",
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
  switch (d.tipe) {
    case "urai":
      return rupa === "benda" ? (
        <Rak isi={isiDari(d.n)} benda={d.benda} judul={`bilangan: ${rb(d.n)}`} sorotKe={cara === "kanvas" ? URUT_TEMPAT.indexOf(d.tempat) : -1} />
      ) : (
        <BaganTempat n={d.n} judul={`bilangan: ${rb(d.n)}`} tampilAngka />
      );
    case "susun":
      return rupa === "benda" ? (
        <Rak isi={isiDari(d.n)} benda={d.benda} judul={`bagian: ${teksUrai(d.n)}`} />
      ) : (
        <BaganTempat n={d.n} judul={`bagian: ${teksUrai(d.n)}`} tampilAngka={false} />
      );
    case "bagan":
      return rupa === "benda" ? (
        <RakBagan utuh={d.utuh} bagian={d.bagian} klaim={d.klaim} benda={d.benda} cara={cara} />
      ) : (
        <BaganUtuh utuh={rb(d.utuh)} bagian={rb(d.bagian)} lain={cara === "suara" && d.klaim !== undefined ? rb(d.klaim) : "?"} judul={`bagan: ${namaSatuan(d.satuan)}`} />
      );
    case "uang":
      return <GambarUang d={d} rupa={rupa} cara={cara} />;
    case "lain": {
      const judulLain = cara === "klik" ? `bilangan: ${rb(d.n)}` : cara === "kanvas" ? `${rb(d.n)} = ${rb(d.a)} + ?` : `${rb(d.n)} = ${rb(d.a)} + ${rb(d.klaim)}`;
      return rupa === "benda" ? (
        <Rak isi={isiDari(d.n)} benda={d.benda} judul={judulLain} />
      ) : (
        <BaganUtuh utuh={rb(d.n)} bagian={cara === "klik" ? "?" : rb(d.a)} lain={cara === "suara" ? rb(d.klaim) : "?"} judul={cara === "klik" ? "satu bilangan, dua bagian" : judulLain} />
      );
    }
  }
}
