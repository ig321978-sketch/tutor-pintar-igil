"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, PilihanAngka, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { Tally } from "./diagram-pictorial";
import { BalokHuruf, GarisAngkaKetuk, NeracaRangka, TitikUkur } from "./diagram-k2b6";
import { urutanTetap } from "./data-k2b6";

/* ------------------------------------------------------------------------ */
/* Mesin permainan bersama Matematika Kelas 2 Bab 6: mengurutkan, memilih satu */
/* dari beberapa, menjodohkan, memilih semua yang benar, soal bertahap, garis  */
/* angka, goresan, menaruh di tempat, dan memori. Dipakai Sub-Bab A dan B.     */
/* Tanpa API dan tanpa acak (aman untuk SSR).                                  */
/* ------------------------------------------------------------------------ */

const TOMBOL_ITEM =
  "flex min-w-[76px] flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)] active:translate-y-0.5";

/* ------------------------------ Mengurutkan dengan mengetuk ------------------------------ */

export type ItemUrut = { id: string; label: string; isi?: React.ReactNode };

/**
 * Ketuk benda satu per satu menurut urutan yang diminta. Yang benar masuk ke tempatnya,
 * yang salah memberi petunjuk. Bila `tumpuk`, benda menumpuk dari dasar keranjang ke atas.
 */
export function UrutKetuk({
  item,
  urutan,
  petunjuk,
  labelAwal,
  labelAkhir,
  tumpuk = false,
  onBeres,
  pesanBeres,
}: {
  item: ItemUrut[];
  urutan: string[];
  petunjuk: (i: ItemUrut) => string;
  labelAwal?: string;
  labelAkhir?: string;
  tumpuk?: boolean;
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [terpasang, setTerpasang] = useState<string[]>([]);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terpasang.length === urutan.length;
  const cari = (id: string) => item.find((i) => i.id === id)!;

  const ketuk = (id: string) => {
    if (beres || terpasang.includes(id)) return;
    if (urutan[terpasang.length] !== id) {
      setKeliru(id);
      setKabar({ teks: petunjuk(cari(id)), ok: false });
      return;
    }
    const baru = [...terpasang, id];
    setTerpasang(baru);
    setKeliru(null);
    if (baru.length === urutan.length) {
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
    } else {
      setKabar({ teks: `${cari(id).label}.`, ok: true });
    }
  };

  const sisa = item.filter((i) => !terpasang.includes(i.id));
  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <div className="flex min-h-[88px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-2" role="group" aria-label="Belum diurutkan">
          {sisa.map((it) => (
            <button key={`${it.id}-${keliru === it.id ? "x" : "o"}`} type="button" aria-label={it.label} onClick={() => ketuk(it.id)} className={`${TOMBOL_ITEM} ${keliru === it.id ? "igil-goyang" : ""}`}>
              {it.isi}
              <span className="text-[13px] font-black leading-tight text-[#1C01A5]">{it.label}</span>
            </button>
          ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua sudah berurutan</span> : null}
        </div>
        {tumpuk ? (
          <div className="mx-auto w-full max-w-[220px] space-y-1">
            <div className="flex min-h-[120px] flex-col-reverse items-center gap-1 rounded-b-3xl border-4 border-t-0 border-[#A8672D] bg-[#FBE3BC] px-2 pb-2 pt-2" role="group" aria-label="Keranjang belanja">
              {terpasang.map((id) => (
                <span key={id} className="igil-muncul flex w-full items-center justify-center gap-1 rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-0.5">
                  {cari(id).isi}
                  <span className="text-xs font-black text-[#1C01A5]">{cari(id).label}</span>
                </span>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">{labelAwal} ⬇ dasar keranjang, {labelAkhir} ⬆ paling atas</p>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${urutan.length}, minmax(0, 1fr))` }} role="group" aria-label="Urutan">
              {urutan.map((_, i) => {
                const id = terpasang[i];
                return (
                  <div key={i} className={`flex min-h-[78px] flex-col items-center justify-center gap-0.5 rounded-2xl border-4 px-1 py-1 text-center ${id ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/40 bg-white"}`}>
                    {id ? (
                      <>
                        {cari(id).isi}
                        <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{cari(id).label}</span>
                      </>
                    ) : (
                      <span className="text-2xl font-black text-[#1C01A5]/35">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
            {labelAwal || labelAkhir ? (
              <div className="flex justify-between text-xs font-black text-[#1C01A5]/75">
                <span>← {labelAwal}</span>
                <span>{labelAkhir} →</span>
              </div>
            ) : null}
          </div>
        )}
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Mengetuk satu yang tepat ------------------------------ */

export type ItemPilih = { id: string; label: string; isi: React.ReactNode };
export type SoalKetuk = { tanya: string; jawab: string; petunjuk: string; pesan: string; item?: ItemPilih[] };

/** Beberapa pertanyaan berurutan pada kumpulan benda yang sama. Ketuk benda yang tepat. */
export function KetukPilih({ item, soal, kolom = 3, onBeres, pesanBeres }: { item: ItemPilih[]; soal: SoalKetuk[]; kolom?: 2 | 3 | 4 | 5; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [benarId, setBenarId] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const kolomKelas = kolom === 2 ? "grid-cols-2" : kolom === 4 ? "grid-cols-4" : kolom === 5 ? "grid-cols-5" : "grid-cols-3";

  const ketuk = (id: string) => {
    if (beres) return;
    if (id !== s.jawab) {
      setKeliru(id);
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    setKeliru(null);
    setBenarId(id);
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? null : <CatatanPensil pendek={`${nomor + 1}. ${s.tanya}`} teks={s.tanya} />}
        <div className={`grid ${kolomKelas} gap-2`} role="group" aria-label="Pilihan">
          {(s.item ?? item).map((it) => (
            <button
              key={`${it.id}-${keliru === it.id ? "x" : "o"}`}
              type="button"
              aria-label={it.label}
              disabled={beres}
              onClick={() => ketuk(it.id)}
              className={`${TOMBOL_ITEM} !min-w-0 ${keliru === it.id ? "igil-goyang" : ""} ${benarId === it.id && !beres ? "!border-[#7FCB96] !bg-[#E8F7EE]" : ""}`}
            >
              {it.isi}
              <span className="text-[12px] font-black leading-tight text-[#1C01A5]">{it.label}</span>
            </button>
          ))}
        </div>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Menjodohkan ------------------------------ */

export type SisiPasang = { id: string; label: string; isi: React.ReactNode };

/** Ketuk satu di kiri, lalu pasangannya di kanan. Pasangan benar terkunci hijau. */
export function PasangKartu({
  kiri,
  kanan,
  kunci,
  petunjuk,
  onBeres,
  pesanBeres,
}: {
  kiri: SisiPasang[];
  kanan: SisiPasang[];
  kunci: Record<string, string>;
  petunjuk: (kiriId: string) => string;
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [cocok, setCocok] = useState<Record<string, string>>({});
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = kiri.every((k) => cocok[k.id]);
  const dipakai = Object.values(cocok);

  const pilihKanan = (idKanan: string) => {
    if (!dipilih || beres || dipakai.includes(idKanan)) return;
    if (kunci[dipilih] !== idKanan) {
      setKeliru(idKanan);
      setKabar({ teks: petunjuk(dipilih), ok: false });
      return;
    }
    const baru = { ...cocok, [dipilih]: idKanan };
    setCocok(baru);
    setDipilih(null);
    setKeliru(null);
    const k = kiri.find((x) => x.id === dipilih)!;
    const r = kanan.find((x) => x.id === idKanan)!;
    if (kiri.every((x) => baru[x.id])) {
      setKabar(null);
      letusan.picu();
      ucap(`${k.label} cocok dengan ${r.label}. ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: `${k.label} cocok dengan ${r.label}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk satu di kiri, lalu ketuk pasangannya di kanan.</p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-2">
          <div className="space-y-2" role="group" aria-label="Kiri">
            {kiri.map((k) => {
              const ok = !!cocok[k.id];
              return (
                <button
                  key={k.id}
                  type="button"
                  aria-label={k.label}
                  aria-pressed={dipilih === k.id}
                  disabled={ok}
                  onClick={() => setDipilih(dipilih === k.id ? null : k.id)}
                  className={`flex min-h-[78px] w-full flex-col items-center justify-center gap-0.5 rounded-2xl border-4 px-1 py-1 text-center ${ok ? "border-[#7FCB96] bg-[#E8F7EE]" : dipilih === k.id ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]/50" : "border-[#1C01A5] bg-white"}`}
                >
                  {k.isi}
                  <span className="text-[12px] font-black leading-tight text-[#1C01A5]">{k.label}</span>
                </button>
              );
            })}
          </div>
          <div className="space-y-2" role="group" aria-label="Kanan">
            {kanan.map((r) => {
              const ok = dipakai.includes(r.id);
              return (
                <button
                  key={`${r.id}-${keliru === r.id ? "x" : "o"}`}
                  type="button"
                  aria-label={r.label}
                  disabled={ok || !dipilih}
                  onClick={() => pilihKanan(r.id)}
                  className={`flex min-h-[78px] w-full flex-col items-center justify-center gap-0.5 rounded-2xl border-4 px-1 py-1 text-center disabled:opacity-100 ${ok ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"} ${keliru === r.id ? "igil-goyang" : ""} ${!dipilih && !ok ? "opacity-70" : ""}`}
                >
                  {r.isi}
                  <span className="text-[12px] font-black leading-tight text-[#1C01A5]">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Memilih semua yang benar ------------------------------ */

export type ItemSemua = { id: string; label: string; isi?: React.ReactNode; benar: boolean; penjelasan: string };

/** Ketuk semua kartu yang benar, lalu tekan Periksa. Kartu yang salah dijelaskan satu per satu. */
export function KetukSemua({ tanya, item, onBeres, pesanBeres }: { tanya: string; item: ItemSemua[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [pilih, setPilih] = useState<string[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const periksa = () => {
    const salahPilih = item.filter((i) => pilih.includes(i.id) && !i.benar);
    const terlewat = item.filter((i) => !pilih.includes(i.id) && i.benar);
    if (salahPilih.length === 0 && terlewat.length === 0) {
      setSelesai(true);
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
      return;
    }
    if (salahPilih.length > 0) setKabar({ teks: `Yang ini belum tepat. ${salahPilih[0].penjelasan}`, ok: false });
    else setKabar({ teks: "Masih ada yang benar dan belum kamu ketuk. Baca lagi, ya.", ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <CatatanPensil pendek={tanya} />
        <div className="grid gap-2" role="group" aria-label="Pilihan, boleh lebih dari satu">
          {item.map((i) => {
            const aktif = pilih.includes(i.id);
            return (
              <button
                key={i.id}
                type="button"
                aria-label={i.label}
                aria-pressed={aktif}
                disabled={selesai}
                onClick={() => setPilih(aktif ? pilih.filter((x) => x !== i.id) : [...pilih, i.id])}
                className={`flex items-center gap-2 rounded-2xl border-4 px-2 py-1.5 text-left text-base font-black leading-snug text-[#1C01A5] ${aktif ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"} ${selesai && i.benar ? "!border-[#7FCB96] !bg-[#E8F7EE]" : ""}`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-lg ${aktif ? "bg-[#FFE566]" : "bg-white"}`}>{aktif ? "✔" : ""}</span>
                {i.isi}
                <span className="min-w-0 flex-1">{i.label}</span>
              </button>
            );
          })}
        </div>
        {selesai ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <button type="button" onClick={periksa} disabled={pilih.length === 0} className={`${TOMBOL_BESAR} w-full`}>
            Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Soal bertahap ------------------------------ */

export type SoalBertahap = {
  visual?: React.ReactNode;
  tanya: string;
  opsi: string[];
  jawab: number;
  petunjuk: string;
  pesan: string;
  /** Bila benar, pilihan ditampilkan sebagai angka besar. */
  angka?: boolean;
};

/**
 * Beberapa soal berurutan, satu per layar kecil: gambar di atas, pertanyaan, lalu tiga pilihan.
 * Pilihan yang salah bergoyang dan memberi petunjuk. Soal benar membuka soal berikutnya.
 */
export function PilihBertahap({ soal, onBeres, pesanBeres }: { soal: SoalBertahap[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const pilih = (i: number) => {
    if (beres) return;
    if (i !== s.jawab) {
      setKeliru(i);
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    setKeliru(null);
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`} data-soal={Math.min(nomor + 1, soal.length)}>
        {beres ? null : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            {s.visual ? <div className="flex justify-center">{s.visual}</div> : null}
            <CatatanPensil pendek={s.tanya} />
            {s.angka ? (
              <PilihanAngka opsi={s.opsi.map(Number)} keliru={keliru === null ? null : Number(s.opsi[keliru])} onPilih={(n) => pilih(s.opsi.findIndex((o) => Number(o) === n))} />
            ) : (
              <PilihanTeks opsi={s.opsi} keliru={keliru} onPilih={pilih} />
            )}
          </>
        )}
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Garis angka ------------------------------ */

export type SoalGaris = { tanya: string; dari: number; sampai: number; jawab: number; petunjuk: string; pesan: string; visual?: React.ReactNode; langkah?: number };

/** Ketuk bulatan angka pada garis bilangan. Hasil salah memberi petunjuk. */
export function GarisAngkaGame({ soal, onBeres, pesanBeres }: { soal: SoalGaris[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const pilih = (n: number) => {
    if (beres) return;
    setDipilih(n);
    if (n !== s.jawab) {
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setDipilih(null);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : (
          <>
            {s.visual ? <div className="flex justify-center">{s.visual}</div> : null}
            <CatatanPensil pendek={`${nomor + 1}. ${s.tanya}`} teks={s.tanya} />
            <GarisAngkaKetuk dari={s.dari} sampai={s.sampai} langkah={s.langkah} dipilih={dipilih} onPilih={pilih} />
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Goresan tally ------------------------------ */

export type SoalTally = { tanya: string; n: number; petunjuk: string; pesan: string; visual?: React.ReactNode };

/** Tambah goresan satu per satu sampai sama dengan banyak yang diminta, lalu Periksa. */
export function BuatTally({ soal, onBeres, pesanBeres }: { soal: SoalTally[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [goresan, setGoresan] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const periksa = () => {
    if (goresan !== s.n) {
      setKabar({ teks: goresan > s.n ? `Goresanmu terlalu banyak. ${s.petunjuk}` : `Goresanmu belum cukup. ${s.petunjuk}`, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setGoresan(0);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : (
          <>
            {s.visual ? <div className="flex justify-center">{s.visual}</div> : null}
            <CatatanPensil pendek={`${nomor + 1}. ${s.tanya}`} teks={s.tanya} />
            <div className="flex min-h-[64px] items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              {goresan > 0 ? <Tally n={goresan} /> : <span className="text-base font-black text-[#1C01A5]/40">Belum ada goresan</span>}
            </div>
            <p className="text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
              {goresan}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" aria-label="Kurangi satu goresan" disabled={goresan <= 0} onClick={() => setGoresan(goresan - 1)} className={`${TOMBOL_PUTIH} !px-1`}>
                − Hapus
              </button>
              <button type="button" aria-label="Tambah satu goresan" disabled={goresan >= 20} onClick={() => setGoresan(goresan + 1)} className={`${TOMBOL_BESAR} !px-1`}>
                ＋ Goresan
              </button>
              <button type="button" aria-label="Periksa goresan" disabled={goresan === 0} onClick={periksa} className={`${TOMBOL_PUTIH} !px-1`}>
                Periksa
              </button>
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Menaruh di tempat ------------------------------ */

export type ItemTaruh = { id: string; label: string; isi: React.ReactNode; slot: string; petunjuk: string; ucapan: string };
export type SlotTaruh = { id: string; label: string; ikon?: string; warna: string };

/** Ketuk benda, lalu ketuk tempatnya. Setiap tempat menerima satu benda. */
export function LetakSlot({ item, slot, onBeres, pesanBeres }: { item: ItemTaruh[]; slot: SlotTaruh[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [tempat, setTempat] = useState<Record<string, string>>({});
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = item.filter((i) => !tempat[i.id]);
  const beres = sisa.length === 0;

  const taruh = (idSlot: string) => {
    if (!dipilih) return;
    const it = item.find((i) => i.id === dipilih);
    if (!it || tempat[it.id]) return;
    if (it.slot !== idSlot) {
      setGoyang(idSlot);
      setKabar({ teks: it.petunjuk, ok: false });
      return;
    }
    const baru = { ...tempat, [it.id]: idSlot };
    setTempat(baru);
    setDipilih(null);
    setGoyang(null);
    if (item.every((i) => baru[i.id])) {
      setKabar(null);
      letusan.picu();
      ucap(`${it.ucapan} ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: it.ucapan, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <div className="flex min-h-[88px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-2" role="group" aria-label="Belum ditaruh">
          {sisa.map((it) => (
            <button key={it.id} type="button" aria-label={it.label} aria-pressed={dipilih === it.id} onClick={() => setDipilih(dipilih === it.id ? null : it.id)} className={`${TOMBOL_ITEM} ${dipilih === it.id ? "ring-4 ring-[#F0AB00]" : ""}`}>
              {it.isi}
              <span className="text-[12px] font-black leading-tight text-[#1C01A5]">{it.label}</span>
            </button>
          ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua sudah ditaruh</span> : null}
        </div>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(slot.length, 2)}, minmax(0, 1fr))` }}>
          {slot.map((sl) => {
            const isi = item.find((i) => tempat[i.id] === sl.id);
            return (
              <button
                key={`${sl.id}-${goyang === sl.id ? "x" : "o"}`}
                type="button"
                aria-label={`Tempat ${sl.label}${isi ? `, berisi ${isi.label}` : ", kosong"}`}
                disabled={!!isi}
                onClick={() => taruh(sl.id)}
                className={`flex min-h-[92px] flex-col items-center justify-center gap-0.5 rounded-3xl border-4 border-[#1C01A5] px-1 py-1 disabled:opacity-100 ${goyang === sl.id ? "igil-goyang" : ""} ${dipilih && !isi ? "ring-2 ring-[#F0AB00]/60" : ""}`}
                style={{ backgroundColor: sl.warna }}
              >
                <span className="text-sm font-black leading-tight text-[#1C01A5]">
                  {sl.ikon ? <span aria-hidden="true">{sl.ikon} </span> : null}
                  {sl.label}
                </span>
                {isi ? (
                  <span className="igil-muncul flex flex-col items-center rounded-2xl border-2 border-[#1C01A5] bg-white px-2 py-0.5">
                    {isi.isi}
                    <span className="text-[11px] font-black text-[#1C01A5]">{isi.label}</span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Memori kartu ------------------------------ */

export type PasanganMemori = { id: string; a: React.ReactNode; labelA: string; b: React.ReactNode; labelB: string };

/** Balik dua kartu. Yang cocok tetap terbuka, yang tidak kembali tertutup. Semua pasangan harus ketemu. */
export function MemoriKartu({ pasangan, onBeres, pesanBeres }: { pasangan: PasanganMemori[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  type Kartu = { kunci: string; id: string; isi: React.ReactNode; label: string };
  const semua: Kartu[] = pasangan.flatMap((p) => [
    { kunci: `${p.id}-a`, id: p.id, isi: p.a, label: p.labelA },
    { kunci: `${p.id}-b`, id: p.id, isi: p.b, label: p.labelB },
  ]);
  const urut = urutanTetap(semua.length, 3, 0).map((i) => semua[i]);
  const [terbuka, setTerbuka] = useState<string[]>([]);
  const [cocok, setCocok] = useState<string[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [tahan, setTahan] = useState(false);
  const letusan = useLetusan();
  const beres = cocok.length === pasangan.length;

  const balik = (k: Kartu) => {
    if (tahan || beres || cocok.includes(k.id) || terbuka.includes(k.kunci)) return;
    const baru = [...terbuka, k.kunci];
    setTerbuka(baru);
    if (baru.length < 2) return;
    const [x, y] = baru.map((kk) => semua.find((s) => s.kunci === kk)!);
    if (x.id === y.id) {
      const sudah = [...cocok, x.id];
      setCocok(sudah);
      setTerbuka([]);
      if (sudah.length === pasangan.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${x.label} cocok dengan ${y.label}. ${pesanBeres}`);
        onBeres();
      } else {
        setKabar({ teks: `${x.label} cocok dengan ${y.label}.`, ok: true });
      }
      return;
    }
    setTahan(true);
    setKabar({ teks: `${x.label} belum cocok dengan ${y.label}. Coba lagi.`, ok: false });
    setTimeout(() => {
      setTerbuka([]);
      setTahan(false);
    }, 1100);
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-xs font-black text-[#1C01A5]/70">Balik dua kartu. Cari pasangan yang cocok.</p>
        <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Kartu memori">
          {urut.map((k) => {
            const terang = cocok.includes(k.id) || terbuka.includes(k.kunci);
            return (
              <button
                key={k.kunci}
                type="button"
                aria-label={terang ? k.label : "Kartu tertutup"}
                aria-pressed={terang}
                onClick={() => balik(k)}
                className={`flex min-h-[86px] flex-col items-center justify-center gap-0.5 rounded-2xl border-4 px-0.5 py-1 text-center ${cocok.includes(k.id) ? "border-[#7FCB96] bg-[#E8F7EE]" : terang ? "border-[#F0AB00] bg-white" : "border-[#1C01A5] bg-[#6D28D9]"}`}
              >
                {terang ? (
                  <>
                    {k.isi}
                    <span className="text-[10px] font-black leading-tight text-[#1C01A5]">{k.label}</span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-[#FFE566]" aria-hidden="true">
                    ?
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Seimbangkan bagan (diagram) ------------------------------ */

/**
 * Versi diagram dari menimbang dengan satuan: satu balok berhuruf di kiri, titik di kanan.
 * Tambah titik satu per satu sampai neraca seimbang. Tanpa gambar benda.
 */
export function SeimbangBagan({ huruf, target, onBeres, pesanBeres }: { huruf: string; target: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [n, setN] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const miring = n === target ? 0 : n < target ? -1 : 1;

  const ubah = (baru: number) => {
    if (selesai || baru < 0 || baru > Math.min(16, target + 4)) return;
    setN(baru);
    if (baru === target) {
      setSelesai(true);
      setKabar(null);
      letusan.picu();
      ucap(`Seimbang! Balok ${huruf} sama berat dengan ${baru} titik. ${pesanBeres}`);
      onBeres();
    } else if (baru > target) {
      setKabar({ teks: "Sisi titik sekarang lebih berat. Kurangi satu titik.", ok: false });
    } else if (baru > 0) {
      setKabar({ teks: `Sisi balok ${huruf} masih lebih berat. Tambah lagi.`, ok: true });
    } else {
      setKabar(null);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <CatatanPensil pendek={`Seimbangkan balok ${huruf} dengan titik`} />
        <NeracaRangka
          miring={miring}
          kiri={<BalokHuruf huruf={huruf} ukuran={44} />}
          kanan={n > 0 ? <TitikUkur n={n} ukuran={n > 8 ? 12 : 16} /> : null}
          label={`Neraca. Kiri: balok ${huruf}. Kanan: ${n} titik. ${miring === 0 ? "Seimbang." : miring === -1 ? "Sisi kiri turun." : "Sisi kanan turun."}`}
        />
        <div className="flex items-center justify-center gap-3" role="group" aria-label="Banyak titik">
          <button type="button" aria-label="Kurangi titik" disabled={selesai || n <= 0} onClick={() => ubah(n - 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
            −
          </button>
          <span className="flex h-14 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 text-4xl font-black text-[#1C01A5]" aria-live="polite">
            {n}
          </span>
          <button type="button" aria-label="Tambah titik" disabled={selesai || n >= Math.min(16, target + 4)} onClick={() => ubah(n + 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
            +
          </button>
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">titik</p>
        {selesai ? <Berhasil>{`Balok ${huruf} sama berat dengan ${n} titik. ${pesanBeres}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} bicara={false} />
    </>
  );
}