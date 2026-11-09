"use client";

import React, { useContext, useMemo, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { Berhasil, PilihanAngka, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BIRU, ItemSvg } from "./dasar-k2b5";
import { NAMA_ITEM, opsiB5, pemisahSah, urutanTetap, jumlahKiriPemisah, type JenisItem, type LarikTitik, type PasanganTeks, type PemisahLarik } from "./data-k2b5";

/* ------------------------------------------------------------------------ */
/* Permainan pecahan kumpulan benda (Sub-Bab B): membagi ke dua wadah atau      */
/* neraca, memasangkan berdua, menggandakan setengah, melingkari setengah,      */
/* garis pembagi larik titik, memasangkan satu-satu, dan memasangkan kata dan   */
/* lambang. Tanpa API dan tanpa acak.                                           */
/* ------------------------------------------------------------------------ */

const WAKTU = "text-center text-base font-black text-[#3B2410]";
const warnaItem = (jenis: JenisItem, i: number) => NAMA_ITEM[jenis].warna[i % NAMA_ITEM[jenis].warna.length];

/* ------------------------------ B1 dan B2. Bagi ke dua wadah ------------------------------ */

type Wadah = "kiri" | "kanan";

/** Bagi sekumpulan benda ke dua mangkuk (B1) atau dua piringan neraca (B2). Ketuk benda lalu wadah, atau seret. */
export function BagiDua({ n, item, mode, nama, onBeres }: { n: number; item: JenisItem; mode: "mangkuk" | "neraca"; nama: [string, string]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [meja, setMeja] = useState<number[]>(() => Array.from({ length: n }, (_, i) => i));
  const [isi, setIsi] = useState<Record<Wadah, number[]>>({ kiri: [], kanan: [] });
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<"bagi" | "tanya" | "selesai">("bagi");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const setengah = n / 2;

  const taruh = (id: number, ke: Wadah) => {
    if (tahap !== "bagi" || !meja.includes(id)) return;
    const baruMeja = meja.filter((x) => x !== id);
    const baru = { ...isi, [ke]: [...isi[ke], id] } as Record<Wadah, number[]>;
    setMeja(baruMeja);
    setIsi(baru);
    setDipilih(null);
    ucap(sebut(baru[ke].length));
    if (baruMeja.length === 0) {
      if (baru.kiri.length === baru.kanan.length) {
        setTahap("tanya");
        setKabar({ teks: `${nama[0]} dan ${nama[1]} sama-sama mendapat ${sebut(baru.kiri.length)}. Berapa setengah dari ${sebut(n)}?`, ok: true });
      } else {
        setKabar({ teks: `${nama[0]} mendapat ${sebut(baru.kiri.length)} dan ${nama[1]} mendapat ${sebut(baru.kanan.length)}. Belum sama banyak. Ketuk benda di wadah untuk mengembalikannya, lalu bagi lagi.`, ok: false });
      }
    } else setKabar(null);
  };
  const kembalikan = (id: number, dari: Wadah) => {
    if (tahap !== "bagi") return;
    setIsi({ ...isi, [dari]: isi[dari].filter((x) => x !== id) } as Record<Wadah, number[]>);
    setMeja([...meja, id].sort((a, b) => a - b));
    setKabar(null);
  };
  const lepas = (id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z === `bagi:${n}:kiri`) taruh(Number(id), "kiri");
    else if (z === `bagi:${n}:kanan`) taruh(Number(id), "kanan");
  };
  const jawab = (a: number) => {
    if (a !== setengah) {
      setKeliru(a);
      setKabar({ teks: `Hitung benda di satu wadah. Masing-masing berisi ${sebut(setengah)}.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`Betul! Setengah dari ${sebut(n)} adalah ${sebut(setengah)}.`);
    onBeres();
  };

  const selisih = isi.kiri.length - isi.kanan.length;
  const zona = (ke: Wadah, label: string) => (
    <div
      data-zona={`bagi:${n}:${ke}`}
      role="button"
      tabIndex={0}
      aria-label={`${mode === "neraca" ? "Piringan" : "Mangkuk"} ${label}, berisi ${isi[ke].length}`}
      onClick={() => dipilih !== null && taruh(dipilih, ke)}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && dipilih !== null) {
          e.preventDefault();
          taruh(dipilih, ke);
        }
      }}
      className={`min-h-[104px] rounded-3xl border-4 border-[#1C01A5] px-1.5 py-1.5 ${mode === "neraca" ? "rounded-b-[2.5rem] bg-[#E0F2FE]" : "rounded-b-[3rem] bg-[#FEF3C7]"} ${dipilih !== null ? "cursor-pointer ring-2 ring-[#F0AB00]/60" : ""}`}
      style={mode === "neraca" ? { marginTop: selisih > 0 && ke === "kiri" ? 14 : selisih < 0 && ke === "kanan" ? 14 : selisih === 0 ? 7 : 0, transition: "margin .4s ease-out" } : undefined}
    >
      <p className="flex items-center justify-between gap-1 text-[13px] font-black text-[#1C01A5]">
        <span className="min-w-0 truncate">{label}</span>
        <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{isi[ke].length}</span>
      </p>
      <div className="mt-1 flex flex-wrap justify-center gap-0.5">
        {isi[ke].map((id) => (
          <button key={id} type="button" aria-label={`${NAMA_ITEM[item].tunggal} di ${label}, ketuk untuk mengembalikan`} onClick={() => kembalikan(id, ke)} className="igil-muncul igil-tanpa-tepi rounded-full">
            <ItemSvg jenis={item} warna={warnaItem(item, id)} kelas="h-8 w-8" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="flex min-h-[84px] flex-wrap items-center justify-center gap-1.5 rounded-3xl border-4 border-dashed border-[#8A5322]/50 bg-white/70 px-2 py-2" role="group" aria-label="Meja">
          {meja.map((id) => (
            <BendaSeret key={id} id={String(id)} label={`${NAMA_ITEM[item].tunggal} ke-${id + 1} di meja`} onKetuk={() => setDipilih(dipilih === id ? null : id)} onLepas={lepas} kelas={`rounded-full ${dipilih === id ? "ring-4 ring-[#F0AB00]" : ""}`}>
              <ItemSvg jenis={item} warna={warnaItem(item, id)} kelas="h-10 w-10" />
            </BendaSeret>
          ))}
          {meja.length === 0 ? <span className="text-sm font-black text-[#14532D]">Semua sudah dibagi</span> : <span className="sr-only">Sisa di meja: {meja.length}</span>}
        </div>
        {mode === "neraca" ? <div className="mx-auto h-2.5 w-[84%] rounded bg-[#8A5322]" style={{ transform: `rotate(${Math.max(-12, Math.min(12, -selisih * 3))}deg)`, transition: "transform .4s ease-out" }} aria-hidden="true" /> : null}
        <div className="grid grid-cols-2 gap-2">
          {zona("kiri", nama[0])}
          {zona("kanan", nama[1])}
        </div>
        {tahap === "tanya" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Setengah dari {n} adalah …</p>
            <PilihanAngka opsi={opsiB5(setengah, [1, 8])} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {tahap === "selesai" ? (
          <Berhasil>
            Setengah dari {n} adalah {setengah}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B3. Pasang berdua ------------------------------ */

const WARNA_PASANG = ["#2563EB", "#DB2777", "#16A34A", "#EA580C", "#7C3AED", "#0E7490"];

export function PasangBerdua({ n, item, onBeres }: { n: number; item: JenisItem; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [pasangan, setPasangan] = useState<[number, number][]>([]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<"pasang" | "tanya" | "selesai">("pasang");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const ganjil = n % 2 === 1;
  const dipasang = pasangan.flat();
  const indeksPasangan = (i: number) => pasangan.findIndex((p) => p[0] === i || p[1] === i);
  const opsiGanjil = useMemo(() => urutanTetap(2, 3, n), [n]);
  const pilihanGanjil = ["Bisa dibagi dua sama banyak", "Tidak bisa, tersisa satu"];

  const ketuk = (i: number) => {
    if (tahap !== "pasang") return;
    const p = indeksPasangan(i);
    if (p >= 0) {
      setPasangan(pasangan.filter((_, k) => k !== p));
      setTerpilih(null);
      setKabar(null);
      return;
    }
    if (terpilih === null) {
      setTerpilih(i);
      return;
    }
    if (terpilih === i) {
      setTerpilih(null);
      return;
    }
    const baru: [number, number][] = [...pasangan, [terpilih, i]];
    setPasangan(baru);
    setTerpilih(null);
    ucap(`Pasangan ke-${sebut(baru.length)}.`);
    if (n - baru.length * 2 <= 1) {
      setTahap("tanya");
      setKabar({ teks: ganjil ? `Semua berpasangan, tetapi tersisa satu ${NAMA_ITEM[item].tunggal}. Apakah bisa dibagi dua sama banyak?` : `Semua sudah berpasangan. Ada berapa pasang?`, ok: true });
    } else setKabar(null);
  };
  const jawabAngka = (a: number) => {
    if (a !== n / 2) {
      setKeliru(a);
      setKabar({ teks: "Hitung lingkaran pasangan satu per satu. Setiap pasangan terdiri dari dua benda.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`Betul! ${sebut(n / 2)} pasang. Setengah dari ${sebut(n)} adalah ${sebut(n / 2)}.`);
    onBeres();
  };
  const jawabGanjil = (i: number) => {
    if (i !== 1) {
      setKeliru(i);
      setKabar({ teks: `Ada satu ${NAMA_ITEM[item].tunggal} yang tidak punya pasangan. Kalau benda tidak boleh dipecah, jumlahnya tidak bisa dibagi dua sama banyak.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`Betul! ${sebut(n)} ${NAMA_ITEM[item].jamak} menyisakan satu, jadi tidak bisa dibagi dua sama banyak.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>Pasangkan {n} {NAMA_ITEM[item].jamak} berdua-berdua</p>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: n }, (_, i) => {
            const p = indeksPasangan(i);
            return (
              <button
                key={i}
                type="button"
                aria-pressed={terpilih === i}
                aria-label={`${NAMA_ITEM[item].tunggal} ke-${i + 1}${p >= 0 ? `, berpasangan nomor ${p + 1}` : ""}`}
                onClick={() => ketuk(i)}
                className={`relative flex items-center justify-center rounded-2xl border-4 bg-white/85 py-1.5 ${terpilih === i ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-transparent"}`}
                style={p >= 0 ? { borderColor: WARNA_PASANG[p % WARNA_PASANG.length], backgroundColor: `${WARNA_PASANG[p % WARNA_PASANG.length]}22` } : undefined}
              >
                <ItemSvg jenis={item} warna={warnaItem(item, i)} kelas="h-12 w-12" />
                {p >= 0 ? <span className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black text-white" style={{ backgroundColor: WARNA_PASANG[p % WARNA_PASANG.length] }}>{p + 1}</span> : null}
              </button>
            );
          })}
        </div>
        <p className={WAKTU}>
          Pasangan: {pasangan.length} • Belum berpasangan: {n - dipasang.length}
        </p>
        {tahap === "pasang" && pasangan.length > 0 ? (
          <div className="flex justify-center">
            <button type="button" onClick={() => setPasangan(pasangan.slice(0, -1))} className={TOMBOL_PUTIH}>
              ↩ Urungkan pasangan
            </button>
          </div>
        ) : null}
        {tahap === "tanya" && !ganjil ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Ada berapa pasang? Itu setengah dari {n}.</p>
            <PilihanAngka opsi={opsiB5(n / 2, [1, 8])} keliru={keliru} onPilih={jawabAngka} />
          </div>
        ) : null}
        {tahap === "tanya" && ganjil ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <PilihanTeks opsi={opsiGanjil.map((k) => pilihanGanjil[k])} keliru={keliru === null ? null : opsiGanjil.indexOf(keliru)} onPilih={(j) => jawabGanjil(opsiGanjil[j])} />
          </div>
        ) : null}
        {tahap === "selesai" ? <Berhasil>{ganjil ? `${n}: tersisa satu` : `${n / 2} pasang: setengah dari ${n}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B4. Kembalikan jadi utuh ------------------------------ */

export function KembalikanUtuh({ item, setengah, onBeres }: { item: JenisItem; setengah: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [tambah, setTambah] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const utuh = setengah * 2;

  const jawab = (a: number) => {
    if (a !== utuh) {
      setKeliru(a);
      setKabar({ teks: `Gabungkan kedua kelompok. ${sebut(setengah)} ditambah ${sebut(setengah)} sama dengan berapa?`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setBeres(true);
    letusan.picu();
    ucap(`Betul! Setengahnya ${sebut(setengah)}, jadi seluruhnya ${sebut(utuh)}.`);
    onBeres();
  };

  const kelompok = (warnaDasar: number) => (
    <div className="flex flex-wrap items-center justify-center gap-0.5 rounded-2xl border-4 border-[#1C01A5]/40 bg-white/85 p-1.5">
      {Array.from({ length: setengah }, (_, i) => (
        <ItemSvg key={i} jenis={item} warna={warnaItem(item, i + warnaDasar)} kelas="h-9 w-9" />
      ))}
    </div>
  );

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className={WAKTU}>
          Setengahnya {setengah} {NAMA_ITEM[item].jamak}. Berapa seluruhnya?
        </p>
        <div className="grid grid-cols-2 gap-2">
          {kelompok(0)}
          {tambah ? <div className="igil-muncul">{kelompok(0)}</div> : <div className="flex items-center justify-center rounded-2xl border-4 border-dashed border-[#8A5322]/50 p-2 text-center text-sm font-black text-[#3B2410]/60">kelompok kedua</div>}
        </div>
        {!tambah ? (
          <div className="flex justify-center">
            <button type="button" onClick={() => { setTambah(true); ucap("Kelompok kedua sama banyak sudah ditambahkan."); }} className={TOMBOL_BESAR}>
              ➕ Tambah kelompok yang sama banyak
            </button>
          </div>
        ) : null}
        {tambah && !beres ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa seluruh benda?</p>
            <PilihanAngka opsi={opsiB5(utuh, [2, 12])} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? <Berhasil>Setengahnya {setengah}, seluruhnya {utuh}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B5. Lingkari setengah ------------------------------ */

export function LingkariSetengah({ n, onBeres }: { n: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<boolean[]>(() => Array.from({ length: n }, () => false));
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = dipilih.filter(Boolean).length;
  const kolom = n <= 8 ? 4 : n === 10 ? 5 : 6;

  const periksa = () => {
    if (jumlah === n / 2) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! ${sebut(jumlah)} titik dilingkari dan ${sebut(n - jumlah)} titik tidak. Sama banyak, jadi setengah dari ${sebut(n)} adalah ${sebut(jumlah)}.`);
      onBeres();
      return;
    }
    setKabar({ teks: jumlah < n / 2 ? `Baru ${sebut(jumlah)} titik dilingkari. Titik yang tidak dilingkari lebih banyak, jadi belum setengah.` : `Sudah ${sebut(jumlah)} titik dilingkari. Titik yang dilingkari lebih banyak daripada yang tidak, jadi lebih dari setengah.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Lingkari setengah dari {n} titik (dipilih: {jumlah})
        </p>
        <div className="mx-auto grid max-w-[300px] gap-2" style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))` }}>
          {dipilih.map((p, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={p}
              aria-label={`Titik ${i + 1}${p ? ", dilingkari" : ""}`}
              disabled={beres}
              onClick={() => {
                const baru = dipilih.slice();
                baru[i] = !baru[i];
                setDipilih(baru);
                setKabar(null);
              }}
              className="flex aspect-square items-center justify-center rounded-full"
            >
              <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
                <circle cx="20" cy="20" r="9" fill="#F59E0B" stroke={BIRU} strokeWidth="2.4" />
                {p ? <circle cx="20" cy="20" r="16" fill="none" stroke="#16A34A" strokeWidth="3.6" /> : null}
              </svg>
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>
            Setengah dari {n} adalah {jumlah}
          </Berhasil>
        ) : (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} disabled={jumlah === 0} className={TOMBOL_BESAR}>
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

/* ------------------------------ B6. Garis pembagi titik ------------------------------ */

export function GarisPembagi({ larik, onBeres }: { larik: LarikTitik; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const sah = pemisahSah(larik);
  const [pilih, setPilih] = useState<PemisahLarik | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const lebar = 100;
  const jx = larik.kolom > 1 ? (lebar - 36) / (larik.kolom - 1) : 0;
  const jy = larik.baris > 1 ? 56 / (larik.baris - 1) : 0;
  const x = (c: number) => 18 + c * jx;
  const y = (r: number) => 22 + r * jy;
  const total = larik.baris * larik.kolom;

  const sisi = (c: number, r: number): "a" | "b" => (pilih === null ? "a" : pilih.arah === "tegak" ? (c < pilih.posisi ? "a" : "b") : r < pilih.posisi ? "a" : "b");
  const hitungA = pilih ? jumlahKiriPemisah(larik, pilih) : total;

  const periksa = () => {
    if (pilih === null) {
      setKabar({ teks: "Ketuk celah di antara titik untuk memasang garis pemisah dulu.", ok: false });
      return;
    }
    if (sah.some((s) => s.arah === pilih.arah && s.posisi === pilih.posisi)) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Kedua sisi masing-masing berisi ${sebut(hitungA)} titik, sama banyak.`);
      onBeres();
      return;
    }
    setKabar({ teks: `Satu sisi berisi ${sebut(hitungA)} titik dan sisi lain ${sebut(total - hitungA)} titik. Belum sama banyak, jadi bukan setengah.${sah.length === 0 ? " Mungkin memang tidak ada garis yang bisa." : ""}`, ok: false });
  };
  const tidakAda = () => {
    if (sah.length === 0) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! ${sebut(total)} titik tidak bisa dibagi dua kelompok sama banyak oleh satu garis lurus di antara baris atau kolom.`);
      onBeres();
      return;
    }
    setKabar({ teks: "Sebenarnya ada garis yang membagi sama banyak. Coba pasang garis di celah yang lain.", ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-base font-black text-[#1C01A5]">
          {total} titik. Pasang garis supaya kedua sisi sama banyak.
        </p>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[300px]" role="group" aria-label={`Larik ${larik.baris} baris ${larik.kolom} kolom`}>
          {Array.from({ length: larik.baris }, (_, r) =>
            Array.from({ length: larik.kolom }, (_, c) => (
              <circle key={`${r}-${c}`} cx={x(c)} cy={y(r)} r="5.6" fill={sisi(c, r) === "a" ? "#F59E0B" : "#60A5FA"} stroke={BIRU} strokeWidth="1.8" />
            )),
          )}
          {Array.from({ length: larik.kolom - 1 }, (_, i) => {
            const c = i + 1;
            const gx = (x(i) + x(c)) / 2;
            const aktif = pilih?.arah === "tegak" && pilih.posisi === c;
            return (
              <g key={`v${c}`} role="button" tabIndex={0} aria-label={`Garis tegak setelah kolom ${c}${aktif ? ", dipasang" : ""}`} onClick={() => !beres && (setPilih({ arah: "tegak", posisi: c }), setKabar(null))} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !beres && (e.preventDefault(), setPilih({ arah: "tegak", posisi: c }), setKabar(null))} style={{ cursor: "pointer" }}>
                <rect x={gx - 5} y="6" width="10" height="88" fill="transparent" />
                <line x1={gx} y1="8" x2={gx} y2="92" stroke={aktif ? "#E53E3E" : "#94A3B8"} strokeWidth={aktif ? 3.4 : 1.4} strokeDasharray={aktif ? undefined : "3 3"} strokeLinecap="round" />
              </g>
            );
          })}
          {Array.from({ length: larik.baris - 1 }, (_, i) => {
            const r = i + 1;
            const gy = (y(i) + y(r)) / 2;
            const aktif = pilih?.arah === "datar" && pilih.posisi === r;
            return (
              <g key={`h${r}`} role="button" tabIndex={0} aria-label={`Garis datar setelah baris ${r}${aktif ? ", dipasang" : ""}`} onClick={() => !beres && (setPilih({ arah: "datar", posisi: r }), setKabar(null))} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !beres && (e.preventDefault(), setPilih({ arah: "datar", posisi: r }), setKabar(null))} style={{ cursor: "pointer" }}>
                <rect x="6" y={gy - 5} width="88" height="10" fill="transparent" />
                <line x1="8" y1={gy} x2="92" y2={gy} stroke={aktif ? "#E53E3E" : "#94A3B8"} strokeWidth={aktif ? 3.4 : 1.4} strokeDasharray={aktif ? undefined : "3 3"} strokeLinecap="round" />
              </g>
            );
          })}
        </svg>
        <p className="text-center text-base font-black text-[#1C01A5]">{pilih ? `Sisi kuning: ${hitungA} titik • Sisi biru: ${total - hitungA} titik` : "Belum ada garis"}</p>
        {beres ? (
          <Berhasil>{sah.length === 0 ? `${total} titik tidak bisa dibagi dua sama banyak` : `Setengah dari ${total} adalah ${hitungA}`}</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={periksa} disabled={pilih === null} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
            <button type="button" onClick={tidakAda} className={TOMBOL_PUTIH}>
              🚫 Tidak ada garis yang bisa
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B7. Satu-satu antar kelompok ------------------------------ */

export function PasangSatuSatu({ kiri, kanan, onBeres }: { kiri: number; kanan: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [tautan, setTautan] = useState<[number, number][]>([]);
  const [awal, setAwal] = useState<{ sisi: "k" | "n"; i: number } | null>(null);
  const [tahap, setTahap] = useState<"hubung" | "tanya" | "selesai">("hubung");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sama = kiri === kanan;
  const maks = Math.min(kiri, kanan);
  const opsi = useMemo(() => urutanTetap(2, 3, kiri + kanan), [kiri, kanan]);
  const pilihan = ["Setengah", "Bukan setengah"];

  const dihubungKiri = (i: number) => tautan.findIndex((t) => t[0] === i);
  const dihubungKanan = (j: number) => tautan.findIndex((t) => t[1] === j);
  const ketuk = (sisi: "k" | "n", i: number) => {
    if (tahap !== "hubung") return;
    const ada = sisi === "k" ? dihubungKiri(i) : dihubungKanan(i);
    if (ada >= 0) {
      setTautan(tautan.filter((_, k) => k !== ada));
      setAwal(null);
      setKabar(null);
      return;
    }
    if (awal === null || awal.sisi === sisi) {
      setAwal({ sisi, i });
      return;
    }
    const pasang: [number, number] = sisi === "n" ? [awal.i, i] : [i, awal.i];
    setTautan([...tautan, pasang]);
    setAwal(null);
  };
  const periksaPasangan = () => {
    if (tautan.length < maks) {
      setKabar({ teks: `Masih ada titik yang bisa dihubungkan. Baru ${sebut(tautan.length)} garis, sedangkan bisa ${sebut(maks)} garis.`, ok: false });
      return;
    }
    setTahap("tanya");
    setKabar({ teks: sama ? "Semua titik mendapat pasangan, tidak ada sisa. Apakah ini setengah?" : `Ada ${sebut(Math.abs(kiri - kanan))} titik tanpa pasangan. Apakah ini setengah?`, ok: true });
  };
  const jawab = (i: number) => {
    const benar = (i === 0) === sama;
    if (!benar) {
      setKeliru(i);
      setKabar({ teks: sama ? "Kedua kelompok sama banyak dan tidak ada titik tersisa, jadi ini setengah." : "Ada titik yang tidak punya pasangan, jadi kedua kelompok tidak sama banyak. Itu bukan setengah.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(sama ? `Betul! ${sebut(kiri)} dan ${sebut(kanan)} sama banyak, jadi setiap kelompok adalah setengah dari ${sebut(kiri + kanan)}.` : `Betul! ${sebut(kiri)} dan ${sebut(kanan)} tidak sama banyak, jadi bukan setengah.`);
    onBeres();
  };

  const yKiri = (i: number) => 18 + i * (64 / Math.max(1, Math.max(kiri, kanan) - 1));
  const yKanan = (j: number) => 18 + j * (64 / Math.max(1, Math.max(kiri, kanan) - 1));

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-base font-black text-[#1C01A5]">Hubungkan satu titik kiri dengan satu titik kanan</p>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[300px]" role="group" aria-label={`Kelompok kiri ${kiri} titik dan kelompok kanan ${kanan} titik`}>
          {tautan.map(([i, j], k) => (
            <line key={k} x1="26" y1={yKiri(i)} x2="74" y2={yKanan(j)} stroke="#1C01A5" strokeWidth="2.4" strokeLinecap="round" />
          ))}
          {Array.from({ length: kiri }, (_, i) => (
            <g key={`k${i}`} role="button" tabIndex={0} aria-label={`Titik kiri ${i + 1}${dihubungKiri(i) >= 0 ? ", terhubung" : ""}`} onClick={() => ketuk("k", i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk("k", i))} style={{ cursor: "pointer" }}>
              <circle cx="26" cy={yKiri(i)} r="9" fill="transparent" />
              <circle cx="26" cy={yKiri(i)} r="5.6" fill="#F59E0B" stroke={awal?.sisi === "k" && awal.i === i ? "#E53E3E" : BIRU} strokeWidth={awal?.sisi === "k" && awal.i === i ? 3.4 : 1.8} />
              {tahap !== "hubung" && dihubungKiri(i) < 0 ? <circle cx="26" cy={yKiri(i)} r="9" fill="none" stroke="#E53E3E" strokeWidth="2.2" strokeDasharray="3 2" /> : null}
            </g>
          ))}
          {Array.from({ length: kanan }, (_, j) => (
            <g key={`n${j}`} role="button" tabIndex={0} aria-label={`Titik kanan ${j + 1}${dihubungKanan(j) >= 0 ? ", terhubung" : ""}`} onClick={() => ketuk("n", j)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk("n", j))} style={{ cursor: "pointer" }}>
              <circle cx="74" cy={yKanan(j)} r="9" fill="transparent" />
              <circle cx="74" cy={yKanan(j)} r="5.6" fill="#60A5FA" stroke={awal?.sisi === "n" && awal.i === j ? "#E53E3E" : BIRU} strokeWidth={awal?.sisi === "n" && awal.i === j ? 3.4 : 1.8} />
              {tahap !== "hubung" && dihubungKanan(j) < 0 ? <circle cx="74" cy={yKanan(j)} r="9" fill="none" stroke="#E53E3E" strokeWidth="2.2" strokeDasharray="3 2" /> : null}
            </g>
          ))}
        </svg>
        <p className={WAKTU}>
          Kiri: {kiri} titik • Kanan: {kanan} titik • Garis: {tautan.length}
        </p>
        {tahap === "hubung" ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setTautan([])} disabled={tautan.length === 0} className={TOMBOL_PUTIH}>
              🗑 Ulangi
            </button>
            <button type="button" onClick={periksaPasangan} className={TOMBOL_BESAR}>
              ✅ Periksa pasangan
            </button>
          </div>
        ) : null}
        {tahap === "tanya" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <PilihanTeks opsi={opsi.map((k) => pilihan[k])} keliru={keliru === null ? null : opsi.indexOf(keliru)} onPilih={(j) => jawab(opsi[j])} />
          </div>
        ) : null}
        {tahap === "selesai" ? <Berhasil>{sama ? `${kiri} dan ${kanan}: setengah` : `${kiri} dan ${kanan}: bukan setengah`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C8. Pasangkan kata dan lambang ------------------------------ */

const WARNA_GARIS = ["#2563EB", "#DB2777", "#16A34A"];
const BARIS = 64;

export function PasangTeks({ pasang, onBeres, pesanBeres }: { pasang: PasanganTeks; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [terhubung, setTerhubung] = useState<Record<string, string>>({});
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const n = pasang.kiri.length;
  const dipakai = Object.values(terhubung);

  const pilihKanan = (id: string) => {
    if (dipakai.includes(id)) return;
    if (dipilih === null) {
      setKabar({ teks: "Ketuk kartu di kiri dulu, lalu ketuk kartu yang cocok di kanan.", ok: false });
      return;
    }
    if (dipilih !== id) {
      setGoyang(id);
      setKabar({ teks: "Belum cocok. Baca kedua kartu itu pelan-pelan, lalu coba kartu lain.", ok: false });
      return;
    }
    const baru = { ...terhubung, [dipilih]: id };
    setTerhubung(baru);
    setDipilih(null);
    setGoyang(null);
    if (Object.keys(baru).length === n) {
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
    } else setKabar({ teks: "Pasangan yang tepat.", ok: true });
  };
  const beres = Object.keys(terhubung).length === n;
  const indeksKanan = (id: string) => pasang.kanan.findIndex((k) => k.id === id);

  return (
    <>
      <div className={`${KERTAS_ANGKA} relative`}>
        <div className="grid grid-cols-[1fr_44px_1.3fr]" style={{ gridTemplateRows: `repeat(${n}, ${BARIS}px)` }}>
          {pasang.kiri.map((k, i) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={dipilih === k.id}
              disabled={!!terhubung[k.id]}
              aria-label={`Kartu kiri: ${k.teks}${terhubung[k.id] ? ", sudah terhubung" : ""}`}
              onClick={() => { setDipilih(k.id); setKabar(null); }}
              style={{ gridColumn: 1, gridRow: i + 1 }}
              className={`m-1 flex items-center justify-center rounded-2xl border-4 px-1 text-center font-black leading-tight text-[#1C01A5] ${k.teks.length <= 3 ? "text-3xl" : "text-base"} ${dipilih === k.id ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : terhubung[k.id] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"}`}
            >
              {k.teks}
            </button>
          ))}
          <svg viewBox={`0 0 44 ${BARIS * n}`} preserveAspectRatio="none" className="pointer-events-none" style={{ gridColumn: 2, gridRow: `1 / span ${n}`, width: "100%", height: BARIS * n }} aria-hidden="true">
            {pasang.kiri.map((k, i) => {
              const t = terhubung[k.id];
              if (!t) return null;
              return <line key={k.id} x1="0" y1={i * BARIS + BARIS / 2} x2="44" y2={indeksKanan(t) * BARIS + BARIS / 2} stroke={WARNA_GARIS[i % 3]} strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />;
            })}
          </svg>
          {pasang.kanan.map((c, i) => (
            <button
              key={`${c.id}-${goyang === c.id ? "x" : "o"}`}
              type="button"
              disabled={dipakai.includes(c.id)}
              aria-label={`Kartu kanan: ${c.teks}${dipakai.includes(c.id) ? ", sudah terhubung" : ""}`}
              onClick={() => pilihKanan(c.id)}
              style={{ gridColumn: 3, gridRow: i + 1 }}
              className={`m-1 flex items-center justify-center rounded-2xl border-4 px-2 text-center font-black leading-snug text-[#1C01A5] ${c.teks.length <= 3 ? "text-3xl" : "text-sm"} ${dipakai.includes(c.id) ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"} ${goyang === c.id ? "igil-goyang" : ""}`}
            >
              {c.teks}
            </button>
          ))}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Terhubung: {Object.keys(terhubung).length} dari {n}
        </p>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
