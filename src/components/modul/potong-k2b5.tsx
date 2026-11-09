"use client";

import React, { useContext, useId, useMemo, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { Berhasil, PilihanAngka, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BIRU, BendaPotongG, BendaPotongSvg, FiguraBayangSvg, FiguraSvg, GelasSvg, WARNA_BAGIAN, jalur } from "./dasar-k2b5";
import {
  BENDA_POTONG,
  BENTUK_P,
  bagiBanyak,
  hubunganBagian,
  itemSetengah,
  kepingSisa,
  kotakBatas,
  lipat,
  lipatDuaSah,
  namaItemSetengah,
  opsiB5,
  periksaTarik,
  potonganAdil,
  rasioWarna,
  simpulBentuk,
  garisMembagi,
  urutanTetap,
  type FiguraBayang,
  type Garis,
  type IdBentukP,
  type ItemSetengah,
  type JenisPotong,
  type PilihanLipat,
  type PilihanLipatDua,
  type RondeLipat,
  type RondeLipatDua,
  type RondePotong,
  type RondeTuang,
  type RondeWarnaiBagian,
  type Titik,
} from "./data-k2b5";

/* ------------------------------------------------------------------------ */
/* Permainan pecahan benda utuh (Sub-Bab A dan C): potongan yang adil, melipat, */
/* menuang, mencari setengah, mewarnai bagian, menarik garis, centang dan       */
/* silang, membelah bertahap, dan menyusun potongan. Logika di data-k2b5.ts.    */
/* Tanpa API.                                                                  */
/* ------------------------------------------------------------------------ */

const WAKTU = "text-center text-base font-black text-[#3B2410]";
const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Jumlah pojok sejati. Lebih dari delapan berarti bentuk lengkung. */
function pojok(p: readonly Titik[]): number {
  let n = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[(i + p.length - 1) % p.length];
    const b = p[i];
    const c = p[(i + 1) % p.length];
    if (Math.abs((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])) > 0.5) n += 1;
  }
  return n;
}
function namaBagian(p: readonly Titik[]): string {
  const n = pojok(p);
  if (n > 8) return "setengah lingkaran";
  if (n === 3) return "segitiga";
  if (n === 4) {
    const k = kotakBatas(p);
    return Math.abs(k.x1 - k.x0 - (k.y1 - k.y0)) < 1.5 ? "persegi" : "persegi panjang";
  }
  return `segi ${n}`;
}

/* ------------------------------ A1 dan C1. Potongan yang adil ------------------------------ */

export function PilihPotongan({ ronde, onBeres }: { ronde: RondePotong; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = BENDA_POTONG[ronde.benda];
  const kata = ronde.bagian === 2 ? "dua" : "empat";
  const kandidat = useMemo(() => {
    const poly = BENTUK_P[d.bentuk].titik;
    return ronde.kandidat.map((k) => ({ ...k, keping: bagiBanyak(poly, k.garis), adil: potonganAdil(ronde.benda, k.garis, ronde.bagian) }));
  }, [ronde, d.bentuk]);
  const [dipilih, setDipilih] = useState<string[]>([]);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const idKlip = useId().replace(/:/g, "");

  const periksa = () => {
    const nomor = (id: string) => kandidat.findIndex((k) => k.id === id) + 1;
    const keliru = kandidat.find((k) => dipilih.includes(k.id) && !k.adil);
    if (keliru) {
      setKabar({ teks: keliru.keping.length !== ronde.bagian ? `Potongan ${nomor(keliru.id)} menghasilkan ${sebut(keliru.keping.length)} bagian, bukan ${kata}.` : `Potongan ${nomor(keliru.id)} menghasilkan ${kata} bagian yang tidak sama besar, jadi tidak adil.`, ok: false });
      return;
    }
    if (kandidat.some((k) => k.adil && !dipilih.includes(k.id))) {
      setKabar({ teks: `Masih ada potongan yang membagi menjadi ${kata} bagian sama besar dan belum kamu pilih.`, ok: false });
      return;
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! Potongan yang adil membagi ${d.nama.toLowerCase()} menjadi ${kata} bagian sama besar.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>
          {d.nama}: potongan mana yang adil? ({dipilih.length} dipilih)
        </p>
        <div className="grid grid-cols-2 gap-2">
          {kandidat.map((k, i) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={dipilih.includes(k.id)}
              aria-label={`Potongan ${i + 1} ${d.nama}${dipilih.includes(k.id) ? ", dipilih" : ""}`}
              disabled={beres}
              onClick={() => {
                setDipilih(dipilih.includes(k.id) ? dipilih.filter((x) => x !== k.id) : [...dipilih, k.id]);
                setKabar(null);
              }}
              className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 bg-white/85 px-1 py-1.5 ${dipilih.includes(k.id) ? "border-[#16A34A] ring-4 ring-[#16A34A]/40" : "border-[#8A5322]"} ${beres && k.adil ? "bg-[#DCFCE7]" : ""}`}
            >
              <BendaPotongSvg jenis={ronde.benda} ada={k.keping} jarak={0.07} kelas="h-24 w-24" label={`Potongan ${i + 1}`} />
              <span className="text-xs font-black text-[#1C01A5]">
                {dipilih.includes(k.id) ? "✔ " : ""}Potongan {i + 1}
              </span>
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>
            {d.nama} dibagi {kata} sama besar
          </Berhasil>
        ) : (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} disabled={dipilih.length === 0} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        )}
        <span className="hidden">{idKlip}</span>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A2. Lipat kertas ------------------------------ */

/** Gambar kertas, lipatan, dan bagian yang dilipat menutupi bagian lain. */
function PratinjauLipat({ poly, a, b, warna, pakai }: { poly: readonly Titik[]; a: Titik; b: Titik; warna: string; pakai: boolean }) {
  const h = lipat(poly, a, b);
  return (
    <g>
      <path d={jalur(poly)} fill="#FFFFFF" stroke="#6B7280" strokeWidth="2" strokeDasharray="4 3" />
      {pakai && h.tetap.length ? <path d={jalur(h.tetap)} fill={warna} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" /> : null}
      {pakai && h.balik.length ? <path d={jalur(h.balik)} fill={h.pas ? "#FFFFFF" : "#EF4444"} fillOpacity={h.pas ? 0.45 : 0.4} stroke={h.pas ? "#16A34A" : "#DC2626"} strokeWidth="3" strokeDasharray="5 3" strokeLinejoin="round" /> : null}
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BIRU} strokeWidth="2.4" strokeDasharray="1 4" strokeLinecap="round" />
    </g>
  );
}

export function LipatKertas({ ronde, onBeres }: { ronde: RondeLipat; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const poly = BENTUK_P[ronde.bentuk].titik;
  const [dicoba, setDicoba] = useState<string | null>(null);
  const [ditemukan, setDitemukan] = useState<string[]>([]);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const aktif = ronde.pilihan.find((p) => p.id === dicoba) ?? null;

  const coba = (p: PilihanLipat) => {
    setDicoba(p.id);
    const h = lipat(poly, p.garis[0], p.garis[1]);
    if (!h.pas) {
      setKabar({ teks: h.luasKiri === 0 || h.luasKanan === 0 ? "Garis itu tidak membagi kertas." : "Ada bagian yang menonjol keluar, jadi kedua sisi tidak menutup pas. Bagiannya tidak sama besar.", ok: false });
      return;
    }
    if (ditemukan.includes(p.id)) {
      setKabar({ teks: "Cara itu sudah kamu temukan. Coba cara yang lain.", ok: false });
      return;
    }
    const baru = [...ditemukan, p.id];
    setDitemukan(baru);
    const bentuk = namaBagian(h.tetap);
    if (baru.length >= ronde.perluCara) {
      setKabar(null);
      setBeres(true);
      letusan.picu();
      ucap(`Lipatan pas! Hasilnya ${bentuk}. Kamu sudah menemukan ${sebut(baru.length)} cara melipat ${ronde.nama}.`);
      onBeres();
    } else {
      setKabar({ teks: `Lipatan pas, hasilnya ${bentuk}. Baru ${sebut(baru.length)} cara. Temukan cara lainnya.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>
          Cara yang pas: {ditemukan.length} dari {ronde.perluCara}
        </p>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[240px] rounded-2xl bg-[#F8FAFC]" role="img" aria-label={`${ronde.nama}${aktif ? `, lipatan: ${aktif.label}` : ""}`}>
          <PratinjauLipat poly={poly} a={aktif ? aktif.garis[0] : [0, 0]} b={aktif ? aktif.garis[1] : [0, 0]} warna={ronde.warna} pakai={aktif !== null} />
          {aktif === null ? <path d={jalur(poly)} fill={ronde.warna} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" /> : null}
        </svg>
        <div className="grid gap-1.5">
          {ronde.pilihan.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={dicoba === p.id}
              disabled={beres}
              onClick={() => coba(p)}
              className={`rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] ${ditemukan.includes(p.id) ? "border-[#16A34A] bg-[#DCFCE7]" : dicoba === p.id ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"}`}
            >
              {ditemukan.includes(p.id) ? "✔ " : "📏 "}
              {p.label}
            </button>
          ))}
        </div>
        {beres ? <Berhasil>{sebut(ditemukan.length)} cara melipat dengan pas</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C2. Lipat dua kali ------------------------------ */

export function LipatDuaKali({ ronde, onBeres }: { ronde: RondeLipatDua; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const poly = BENTUK_P[ronde.bentuk].titik;
  const [p1, setP1] = useState<PilihanLipatDua | null>(null);
  const [p2, setP2] = useState<PilihanLipat | null>(null);
  const [buka, setBuka] = useState(false);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const l1 = p1 ? lipat(poly, p1.pertama.garis[0], p1.pertama.garis[1]) : null;
  const hasil = p1 && p2 ? lipatDuaSah(ronde, p1, p2) : null;
  const sah = hasil?.sah === true;
  const urut = useMemo(() => (p1 ? urutanTetap(p1.kedua.length, 2, p1.pertama.id.length) : [0, 1, 2]), [p1]);

  const pilihPertama = (l: PilihanLipatDua) => {
    setP1(l);
    setP2(null);
    setBuka(false);
    setKabar(null);
    ucap(`${l.pertama.label}. Kertas menjadi setengah. Sekarang lipat sekali lagi.`);
  };
  const pilihKedua = (k: PilihanLipat) => {
    if (!p1) return;
    setP2(k);
    const h = lipatDuaSah(ronde, p1, k);
    setBuka(false);
    if (!h.pas2) setKabar({ teks: "Lipatan kedua tidak menutup pas. Ada bagian yang menonjol, jadi bagiannya tidak akan sama besar.", ok: false });
    else setKabar({ teks: "Lipatan kedua pas. Sekarang buka kertasnya.", ok: true });
  };
  const tunjuk = (i: number) => {
    if (beres || !hasil || !sah) return;
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Bagus! Kertas terbagi menjadi empat bagian sama besar. Satu bagian bernilai seperempat. Bagian ke-${sebut(i + 1)} adalah seperempat.`);
    onBeres();
  };
  const ulangi = () => {
    setP1(null);
    setP2(null);
    setBuka(false);
    setKabar(null);
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[240px] rounded-2xl bg-[#F8FAFC]" role="img" aria-label={`${ronde.nama}${buka ? ", dibuka" : ""}`}>
          {buka && hasil ? (
            hasil.keping.map((k, i) => (
              <path key={i} d={jalur(k)} fill={WARNA_BAGIAN[i % WARNA_BAGIAN.length]} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" role="button" tabIndex={0} aria-label={`Bagian ${i + 1}`} onClick={() => tunjuk(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tunjuk(i))} style={{ cursor: "pointer" }} />
            ))
          ) : p1 && l1 ? (
            <g>
              <PratinjauLipat poly={poly} a={p1.pertama.garis[0]} b={p1.pertama.garis[1]} warna={ronde.warna} pakai />
              {p2 ? <line x1={p2.garis[0][0]} y1={p2.garis[0][1]} x2={p2.garis[1][0]} y2={p2.garis[1][1]} stroke="#E53E3E" strokeWidth="2.6" strokeDasharray="4 3" /> : null}
            </g>
          ) : (
            <path d={jalur(poly)} fill={ronde.warna} stroke={BIRU} strokeWidth="2.6" strokeLinejoin="round" />
          )}
        </svg>
        {!p1 ? (
          <div className="grid gap-1.5">
            <p className="text-center text-base font-black text-[#3B2410]">Lipatan pertama</p>
            {ronde.langkah.map((l) => (
              <button key={l.pertama.id} type="button" onClick={() => pilihPertama(l)} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5]">
                📏 {l.pertama.label}
              </button>
            ))}
          </div>
        ) : !buka ? (
          <div className="grid gap-1.5">
            <p className="text-center text-base font-black text-[#3B2410]">Lipatan kedua: {p1.pertama.label.toLowerCase()}, lalu</p>
            {urut.map((i) => {
              const k = p1.kedua[i];
              return (
                <button key={k.id} type="button" aria-pressed={p2?.id === k.id} onClick={() => pilihKedua(k)} className={`rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] ${p2?.id === k.id ? (sah ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#E98989] bg-[#FDECEC]") : "border-[#1C01A5] bg-white"}`}>
                  📏 {k.label}
                </button>
              );
            })}
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button type="button" onClick={() => setBuka(true)} disabled={!sah} className={TOMBOL_BESAR}>
                📂 Buka kertas
              </button>
              <button type="button" onClick={ulangi} className={TOMBOL_PUTIH}>
                🗑 Ulangi
              </button>
            </div>
          </div>
        ) : null}
        {buka && !beres ? <p className="text-center text-base font-black text-[#1C01A5]">Ketuk satu bagian untuk menunjukkan seperempat.</p> : null}
        {beres ? <Berhasil>Empat bagian sama besar: seperempat</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A3. Tuang setengah ------------------------------ */

export function TuangSetengah({ ronde, onBeres }: { ronde: RondeTuang; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [kiri, setKiri] = useState(ronde.total);
  const kanan = ronde.total - kiri;
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const periksa = () => {
    if (kiri === kanan) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Kedua ${ronde.wadah} sama tinggi. Setiap ${ronde.wadah} berisi setengah dari ${ronde.nama}.`);
      onBeres();
      return;
    }
    setKabar({ teks: kiri > kanan ? `${Kapital(ronde.wadah)} kiri masih lebih tinggi. Tuang lagi ke ${ronde.wadah} kanan.` : `${Kapital(ronde.wadah)} kanan sudah lebih tinggi. Tuang balik sedikit ke ${ronde.wadah} kiri.`, ok: false });
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>Tuang {ronde.nama} sampai kedua {ronde.wadah} sama</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-2xl bg-white/80 p-1">
            <GelasSvg wadah={ronde.wadah === "botol" ? "botol" : "gelas"} level={kiri / ronde.total} warna={ronde.warna} kelas="h-36 w-28" label={`${ronde.wadah} kiri`} />
            <span className="text-sm font-black text-[#1C01A5]">Kiri</span>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-white/80 p-1">
            <GelasSvg wadah={ronde.wadah === "botol" ? "botol" : "gelas"} level={kanan / ronde.total} warna={ronde.warna} kelas="h-36 w-28" label={`${ronde.wadah} kanan`} />
            <span className="text-sm font-black text-[#1C01A5]">Kanan</span>
          </div>
        </div>
        {beres ? (
          <Berhasil>Setiap {ronde.wadah} berisi setengah</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => { setKiri(kiri - 1); setKabar(null); }} disabled={kiri <= 0} className={TOMBOL_PUTIH}>
              ➡ Tuang
            </button>
            <button type="button" onClick={() => { setKiri(kiri + 1); setKabar(null); }} disabled={kanan <= 0} className={TOMBOL_PUTIH}>
              ⬅ Tuang balik
            </button>
            <button type="button" onClick={periksa} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A4. Cari setengah ------------------------------ */

function GambarItemSetengah({ it }: { it: ItemSetengah }) {
  if (it.jenis === "gelas") return <GelasSvg level={it.level} warna={it.warna} kelas="h-20 w-20" label={namaItemSetengah(it)} />;
  const k = kepingSisa(it.benda, it.sisa, it.variasi);
  return <BendaPotongSvg jenis={it.benda} ada={k.ada} hilang={k.hilang} kelas="h-20 w-20" label={namaItemSetengah(it)} />;
}

export function CariSetengah({ item, onBeres }: { item: ItemSetengah[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const periksa = () => {
    const salah = item.findIndex((it, i) => dipilih.includes(i) && !itemSetengah(it));
    if (salah >= 0) {
      setKabar({ teks: `${Kapital(namaItemSetengah(item[salah]))}. Itu bukan setengah. Periksa lagi bagian yang tersisa.`, ok: false });
      return;
    }
    if (item.some((it, i) => itemSetengah(it) && !dipilih.includes(i))) {
      setKabar({ teks: "Masih ada benda yang tinggal tepat setengah dan belum kamu pilih.", ok: false });
      return;
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap("Betul! Semua benda yang tinggal tepat setengah sudah kamu temukan.");
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>Ketuk benda yang tinggal setengah ({dipilih.length} dipilih)</p>
        <div className="grid grid-cols-4 gap-1.5">
          {item.map((it, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={dipilih.includes(i)}
              aria-label={`${namaItemSetengah(it)}${dipilih.includes(i) ? ", dipilih" : ""}`}
              disabled={beres}
              onClick={() => {
                setDipilih(dipilih.includes(i) ? dipilih.filter((x) => x !== i) : [...dipilih, i]);
                setKabar(null);
              }}
              className={`flex flex-col items-center rounded-2xl border-4 bg-white/85 px-0.5 py-1 ${dipilih.includes(i) ? "border-[#16A34A] ring-4 ring-[#16A34A]/40" : "border-[#8A5322]"}`}
            >
              <GambarItemSetengah it={it} />
              <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{it.jenis === "gelas" ? it.nama : BENDA_POTONG[it.benda].nama}</span>
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>Semua yang tinggal setengah sudah ketemu</Berhasil>
        ) : (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} disabled={dipilih.length === 0} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A5 dan C5. Warnai bagian ------------------------------ */

export function WarnaiBagian({ ronde, warna, onBeres }: { ronde: RondeWarnaiBagian; warna: string; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const kepingSemua = ronde.figura.map((f) => bagiBanyak(BENTUK_P[f.bentuk].titik, f.garis).length);
  const [diwarnai, setDiwarnai] = useState<boolean[][]>(() => kepingSemua.map((n) => Array.from({ length: n }, () => false)));
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const nama = ronde.target === 0.5 ? "setengah" : "seperempat";

  const periksa = () => {
    for (let i = 0; i < ronde.figura.length; i += 1) {
      const r = rasioWarna(ronde.figura[i], diwarnai[i]);
      if (Math.abs(r - ronde.target) > 0.011) {
        const n = kepingSemua[i];
        const perlu = Math.round(n * ronde.target);
        setKabar({ teks: `Gambar ke-${sebut(i + 1)} ${r > ronde.target ? "terlalu banyak" : "belum cukup"} diwarnai. Gambar itu dibagi ${sebut(n)} bagian sama besar, jadi warnai ${sebut(perlu)} bagian.`, ok: false });
        return;
      }
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! Semua gambar sudah diwarnai ${nama}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="grid grid-cols-3 gap-2">
          {ronde.figura.map((f, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border-4 border-[#1C01A5]/40 bg-white p-1">
              <FiguraSvg
                bentuk={f.bentuk}
                garis={f.garis}
                diwarnai={diwarnai[i]}
                warna={warna}
                kelas="h-24 w-24"
                label={`Gambar ${i + 1}: ${BENTUK_P[f.bentuk].nama}`}
                onKetuk={
                  beres
                    ? undefined
                    : (j) => {
                        const baru = diwarnai.map((r) => r.slice());
                        baru[i][j] = !baru[i][j];
                        setDiwarnai(baru);
                        setKabar(null);
                      }
                }
              />
              <span className="text-[11px] font-black text-[#1C01A5]">{BENTUK_P[f.bentuk].nama}</span>
            </div>
          ))}
        </div>
        {beres ? (
          <Berhasil>Semua gambar sudah diwarnai {nama}</Berhasil>
        ) : (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A6 dan C6. Tarik garis ------------------------------ */

export function TarikGaris({ bentuk, target, onBeres }: { bentuk: IdBentukP; target: 2 | 4; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const poly = BENTUK_P[bentuk].titik;
  const simpul = useMemo(() => simpulBentuk(bentuk), [bentuk]);
  const maks = target === 2 ? 1 : 2;
  const nama = target === 2 ? "setengah" : "seperempat";
  const [garis, setGaris] = useState<[number, number][]>([]);
  const [awal, setAwal] = useState<number | null>(null);
  const [tahap, setTahap] = useState<"tarik" | "warna" | "selesai">("tarik");
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const garisNyata: Garis[] = garis.map(([i, j]) => [simpul[i], simpul[j]]);
  const keping = useMemo(() => bagiBanyak(poly, garisNyata), [poly, garisNyata]);
  const sudahSah = tahap !== "tarik";

  const ketuk = (i: number) => {
    if (tahap !== "tarik") return;
    if (awal === null) {
      setAwal(i);
      setKabar(null);
      return;
    }
    if (awal === i) {
      setAwal(null);
      return;
    }
    const a = Math.min(awal, i);
    const b = Math.max(awal, i);
    setAwal(null);
    const ada = garis.findIndex((g) => g[0] === a && g[1] === b);
    if (ada >= 0) {
      setGaris(garis.filter((_, k) => k !== ada));
      setKabar(null);
      return;
    }
    if (garis.length >= maks) {
      setKabar({ teks: `Cukup ${sebut(maks)} garis. Ketuk garis yang sama lagi untuk menghapusnya, atau tekan Ulangi.`, ok: false });
      return;
    }
    if (!garisMembagi(poly, [simpul[a], simpul[b]])) {
      setKabar({ teks: "Kedua titik itu segaris dengan satu sisi, jadi tidak membagi bangun. Pilih dua titik di sisi yang berbeda.", ok: false });
      return;
    }
    setGaris([...garis, [a, b]]);
    setKabar(null);
  };

  const periksa = () => {
    const h = periksaTarik(bentuk, garisNyata, target);
    if (!h.sah) {
      setKabar({ teks: `${h.alasan}${target === 2 ? " Coba garis lain lewat titik tengah bangun." : " Coba dua garis yang berpotongan di titik tengah dan sama besar bagiannya."}`, ok: false });
      return;
    }
    setTahap("warna");
    setKabar({ teks: `Garismu tepat! Bangun terbagi menjadi ${sebut(target)} bagian sama besar. Sekarang warnai satu bagian, itulah ${nama}.`, ok: true });
  };
  const warnai = (i: number) => {
    if (tahap !== "warna") return;
    setTahap("selesai");
    setKabar(null);
    letusan.picu();
    ucap(`Hebat! Bagian ke-${sebut(i + 1)} diwarnai, itu ${nama} dari ${BENTUK_P[bentuk].nama}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-lg font-black text-[#1C01A5]">
          {BENTUK_P[bentuk].nama}: bagi menjadi {sebut(target)} sama besar
        </p>
        <svg viewBox="-6 -6 112 112" className="mx-auto block h-auto w-full max-w-[280px]" role="group" aria-label={`${BENTUK_P[bentuk].nama} dengan titik-titik di tepi`}>
          {keping.map((k, i) => (
            <path
              key={i}
              d={jalur(k)}
              fill={tahap === "selesai" ? "#F59E0B" : sudahSah ? WARNA_BAGIAN[i % WARNA_BAGIAN.length] : "#FFFFFF"}
              stroke={BIRU}
              strokeWidth="2.6"
              strokeLinejoin="round"
              role={tahap === "warna" ? "button" : undefined}
              tabIndex={tahap === "warna" ? 0 : undefined}
              aria-label={tahap === "warna" ? `Bagian ${i + 1}` : undefined}
              onClick={tahap === "warna" ? () => warnai(i) : undefined}
              onKeyDown={tahap === "warna" ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), warnai(i)) : undefined}
              style={tahap === "warna" ? { cursor: "pointer" } : undefined}
              opacity={tahap === "selesai" ? 0.55 : 1}
            />
          ))}
          {garisNyata.map(([a, b], i) => (
            <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={BIRU} strokeWidth="3.2" strokeLinecap="round" />
          ))}
          {tahap === "tarik"
            ? simpul.map((p, i) => (
                <g key={i} role="button" tabIndex={0} aria-label={`Titik ${i + 1}${awal === i ? ", terpilih" : ""}`} onClick={() => ketuk(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk(i))} style={{ cursor: "pointer" }}>
                  <circle cx={p[0]} cy={p[1]} r="7" fill="transparent" />
                  <circle cx={p[0]} cy={p[1]} r={awal === i ? 4.6 : 3.2} fill={awal === i ? "#F0AB00" : "#FFFFFF"} stroke={BIRU} strokeWidth="2" />
                </g>
              ))
            : null}
        </svg>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Garis: {garis.length} dari {maks} • Bagian: {keping.length}
        </p>
        {tahap === "tarik" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setGaris(garis.slice(0, -1))} disabled={garis.length === 0} className={TOMBOL_PUTIH}>
              ↩ Hapus garis
            </button>
            <button type="button" onClick={() => { setGaris([]); setAwal(null); setKabar(null); }} disabled={garis.length === 0} className={TOMBOL_PUTIH}>
              🗑 Ulangi
            </button>
            <button type="button" onClick={periksa} disabled={garis.length === 0} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        ) : null}
        {tahap === "warna" ? <p className="text-center text-base font-black text-[#1C01A5]">Ketuk satu bagian untuk mewarnainya.</p> : null}
        {tahap === "selesai" ? <Berhasil>Satu bagian diwarnai: {nama}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C7. Centang atau silang ------------------------------ */

export function CentangSilang({ figura, target, onBeres }: { figura: FiguraBayang[]; target: "setengah" | "seperempat"; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [terjawab, setTerjawab] = useState<boolean[]>(() => figura.map(() => false));
  const [keliru, setKeliru] = useState<{ i: number; pilih: boolean } | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const jawab = (i: number, centang: boolean) => {
    if (terjawab[i]) return;
    const benar = hubunganBagian(figura[i]) === target;
    if (centang !== benar) {
      setKeliru({ i, pilih: centang });
      const h = hubunganBagian(figura[i]);
      setKabar({ teks: benar ? `Gambar ${figura[i].id} sebenarnya ${target}. Bagian berwarna sama besar dengan bagian lain menurut jumlah bagiannya.` : h === "setengah" ? `Gambar ${figura[i].id} menunjukkan setengah, bukan ${target}.` : h === "seperempat" ? `Gambar ${figura[i].id} menunjukkan seperempat, bukan ${target}.` : `Gambar ${figura[i].id} bukan ${target}. Bagian berwarna tidak sama dengan satu dari ${target === "setengah" ? "dua" : "empat"} bagian sama besar.`, ok: false });
      return;
    }
    const baru = terjawab.slice();
    baru[i] = true;
    setTerjawab(baru);
    setKeliru(null);
    if (baru.every(Boolean)) {
      setKabar(null);
      letusan.picu();
      ucap(`Semua gambar sudah kamu nilai dengan tepat. Gambar yang seperempat diberi centang.`);
      onBeres();
    } else {
      setKabar({ teks: benar ? `Gambar ${figura[i].id} menunjukkan ${target}.` : `Gambar ${figura[i].id} bukan ${target}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="grid grid-cols-2 gap-2">
          {figura.map((f, i) => (
            <div key={f.id} className={`space-y-1 rounded-2xl border-4 p-1.5 ${terjawab[i] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/40 bg-white"}`}>
              <div className="flex items-center justify-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-xs font-black text-[#1C01A5]">{f.id}</span>
                <FiguraBayangSvg f={f} kelas="h-16 w-16" />
              </div>
              {terjawab[i] ? (
                <p className="text-center text-sm font-black text-[#14532D]">{hubunganBagian(f) === target ? "✔ Seperempat" : "✘ Bukan"}</p>
              ) : (
                <div className="grid grid-cols-2 gap-1.5">
                  {[true, false].map((c) => (
                    <button
                      key={`${c}-${keliru?.i === i && keliru.pilih === c ? "x" : "o"}`}
                      type="button"
                      aria-label={`${c ? "Centang" : "Silang"} gambar ${f.id}`}
                      onClick={() => jawab(i, c)}
                      className={`rounded-xl border-4 border-[#1C01A5] py-1 text-xl font-black text-[#1C01A5] ${c ? "bg-[#BBF7D0]" : "bg-[#FECACA]"} ${keliru?.i === i && keliru.pilih === c ? "igil-goyang" : ""}`}
                    >
                      {c ? "✔" : "✘"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {terjawab.every(Boolean) ? <Berhasil>Semua gambar sudah dinilai dengan tepat</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C3. Belah apel bertahap ------------------------------ */

const V: Garis = [[50, 0], [50, 100]];
const H: Garis = [[0, 50], [100, 50]];

export function BelahApel({ benda, onBeres }: { benda: JenisPotong; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = BENDA_POTONG[benda];
  const poly = BENTUK_P[d.bentuk].titik;
  const [langkah, setLangkah] = useState<0 | 1 | 2>(0);
  const [kenal, setKenal] = useState<0 | 1 | 2>(0);
  const [tahap, setTahap] = useState<"belah" | "tanya1" | "tanya2" | "tanya3" | "selesai">("belah");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [selesaiAkhir, setSelesaiAkhir] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const idKlip = useId().replace(/:/g, "");
  const keping = langkah === 0 ? [poly as Titik[]] : langkah === 1 ? bagiBanyak(poly, [V]) : bagiBanyak(poly, [V, H]);
  const nama = d.nama.toLowerCase();
  const opsiNama = ["utuh", "setengah", "seperempat"];
  const urut = urutanTetap(3, 2, langkah + 1);

  const belah = () => {
    if (langkah === 0) {
      setLangkah(1);
      setTahap("tanya1");
      setKabar(null);
      ucap(`${Kapital(nama)} dibelah menjadi dua bagian sama besar. Satu bagian itu disebut apa?`);
    } else if (langkah === 1 && kenal >= 1) {
      setLangkah(2);
      setTahap("tanya2");
      setKabar(null);
      ucap(`Setiap setengah dibelah lagi menjadi dua bagian sama besar. Sekarang ada empat bagian. Satu bagian itu disebut apa?`);
    }
  };
  const jawabNama = (asli: number) => {
    const kunci = langkah === 1 ? 1 : 2;
    if (asli !== kunci) {
      setKeliru(asli);
      setKabar({ teks: kunci === 1 ? "Satu benda dibagi menjadi dua bagian sama besar. Satu bagiannya disebut setengah." : "Satu benda dibagi menjadi empat bagian sama besar. Satu bagiannya disebut seperempat.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar({ teks: `Betul, satu bagian itu ${opsiNama[kunci]}.`, ok: true });
    if (kunci === 1) {
      setKenal(1);
      setTahap("belah");
    } else {
      setKenal(2);
      setTahap("tanya3");
    }
  };
  const jawabAngka = (n: number) => {
    if (tahap === "tanya3") {
      if (n !== 2) {
        setKeliru(n);
        setKabar({ teks: "Satu setengah terdiri dari dua seperempat. Lihat dua bagian kecil yang menempel.", ok: false });
        return;
      }
      setKeliru(null);
      setTahap("selesai");
      setKabar({ teks: "Betul, dua seperempat sama dengan satu setengah. Sekarang, berapa seperempat sama dengan satu utuh?", ok: true });
      return;
    }
    if (n !== 4) {
      setKeliru(n);
      setKabar({ teks: "Hitung semua bagian pada benda utuh. Ada empat bagian seperempat.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(`Hebat! Empat seperempat sama dengan satu ${nama} utuh, dan dua seperempat sama dengan satu setengah.`);
    onBeres();
    setSelesaiAkhir(true);
  };
  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <svg viewBox="0 0 100 100" className="mx-auto block h-40 w-40" role="img" aria-label={`${d.nama}: ${langkah === 0 ? "utuh" : langkah === 1 ? "dua bagian setengah" : "empat bagian seperempat"}`}>
          <BendaPotongG jenis={benda} ada={keping} jarak={langkah === 0 ? 0 : 0.12} idKlip={idKlip} />
        </svg>
        {tahap === "belah" ? (
          <div className="flex justify-center">
            <button type="button" onClick={belah} className={TOMBOL_BESAR}>
              🔪 {langkah === 0 ? "Belah menjadi dua" : "Belah tiap setengah menjadi dua"}
            </button>
          </div>
        ) : null}
        {tahap === "tanya1" || tahap === "tanya2" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Satu bagian itu disebut apa?</p>
            <PilihanTeks opsi={urut.map((k) => Kapital(opsiNama[k]))} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => jawabNama(urut[j])} />
          </div>
        ) : null}
        {tahap === "tanya3" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa seperempat sama dengan satu setengah?</p>
            <PilihanAngka opsi={opsiB5(2, [1, 4])} keliru={keliru} onPilih={jawabAngka} />
          </div>
        ) : null}
        {tahap === "selesai" && !selesaiAkhir ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa seperempat sama dengan satu utuh?</p>
            <PilihanAngka opsi={opsiB5(4, [2, 6])} keliru={keliru} onPilih={jawabAngka} />
          </div>
        ) : null}
        {selesaiAkhir ? <Berhasil>1 utuh = 2 setengah = 4 seperempat</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C4. Susun kembali potongan ------------------------------ */

function KepingKecil({ benda, keping, idKlip }: { benda: JenisPotong; keping: Titik[]; idKlip: string }) {
  const k = kotakBatas(keping);
  return (
    <svg viewBox={`${k.x0 - 2} ${k.y0 - 2} ${k.x1 - k.x0 + 4} ${k.y1 - k.y0 + 4}`} className="h-14 w-14" role="img" aria-label={`Potongan seperempat ${BENDA_POTONG[benda].nama.toLowerCase()}`}>
      <BendaPotongG jenis={benda} ada={[keping]} idKlip={idKlip} />
    </svg>
  );
}

export function SusunPotongan({ benda, target, kata, onBeres }: { benda: JenisPotong; target: 1 | 2 | 4; kata: string; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = BENDA_POTONG[benda];
  const poly = BENTUK_P[d.bentuk].titik;
  const empat = useMemo(() => bagiBanyak(poly, [V, H]), [poly]);
  const [terpasang, setTerpasang] = useState(0);
  const [tahap, setTahap] = useState<"susun" | "tanya" | "selesai">("susun");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const idKlip = useId().replace(/:/g, "");
  const meja = 4 - terpasang;

  const taruh = () => {
    if (tahap !== "susun" || meja <= 0) return;
    setTerpasang(terpasang + 1);
    setKabar(null);
    ucap(sebut(terpasang + 1));
  };
  const kembalikan = () => {
    if (tahap !== "susun" || terpasang <= 0) return;
    setTerpasang(terpasang - 1);
    setKabar(null);
  };
  const lepas = (_: string, x: number, y: number) => {
    if (zonaDi(x, y) === "piring") taruh();
  };
  const periksa = () => {
    if (terpasang === target) {
      setTahap("tanya");
      setKabar({ teks: `Susunanmu tepat: ${kata}. Sekarang jawab pertanyaannya.`, ok: true });
      return;
    }
    setKabar({ teks: terpasang < target ? `Baru ${sebut(terpasang)} potong. Tugasnya ${kata}, jadi tambah potongan lagi.` : `Sudah ${sebut(terpasang)} potong, terlalu banyak untuk ${kata}. Kembalikan beberapa potongan.`, ok: false });
  };
  const jawab = (n: number) => {
    if (n !== target) {
      setKeliru(n);
      setKabar({ teks: `Hitung potongan di piring satu per satu. Ada ${sebut(target)} potong seperempat.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`Betul! ${sebut(target)} potong seperempat sama dengan ${kata}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>Susun: {kata}</p>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#8A5322]/50 bg-white/70 px-2 py-2" role="group" aria-label="Meja potongan">
          {Array.from({ length: meja }, (_, i) => (
            <BendaSeret key={`m${terpasang}-${i}`} id={`potong-${i}`} label={`Potongan seperempat ke-${i + 1}`} onKetuk={() => taruh()} onLepas={lepas} kelas="rounded-xl p-1">
              <KepingKecil benda={benda} keping={empat[(terpasang + i) % 4]} idKlip={`${idKlip}m${i}`} />
            </BendaSeret>
          ))}
          {meja === 0 ? <span className="text-sm font-black text-[#14532D]">Semua potongan sudah di piring</span> : null}
        </div>
        <div data-zona="piring" className="mx-auto w-fit rounded-full border-4 border-[#CBD5E1] bg-white p-2 shadow-[0_4px_0_rgba(0,0,0,0.12)]" role="group" aria-label={`Piring berisi ${terpasang} potongan`}>
          <svg viewBox="0 0 100 100" className="block h-40 w-40">
            <BendaPotongG jenis={benda} ada={empat.slice(0, terpasang)} hilang={empat.slice(terpasang)} idKlip={`${idKlip}p`} />
          </svg>
        </div>
        {tahap === "susun" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={kembalikan} disabled={terpasang === 0} className={TOMBOL_PUTIH}>
              ↩ Kembalikan
            </button>
            <button type="button" onClick={periksa} disabled={terpasang === 0} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        ) : null}
        {tahap === "tanya" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa potong seperempat di piring?</p>
            <PilihanAngka opsi={opsiB5(target, [1, 6])} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {tahap === "selesai" ? <Berhasil>{sebut(target)} seperempat = {kata}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}