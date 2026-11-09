"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, CatatanPensil, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { Berhasil, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BentukSvg } from "./dasar-k2b3";
import { urutanKartuKata, type IdBentuk, type KalimatIsian, type KotakPeta, type Pernyataan, type SoalDetektifTeks } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Mesin permainan bersama Matematika Kelas 2 Bab 3: memilah, menarik garis,    */
/* mengisi tabel, detektif petunjuk, peta konsep, mengisi kalimat, menyusun    */
/* kata, dan benar-salah. Dipakai Sub-Bab A, B, dan C. Tanpa API, tanpa acak.  */
/* ------------------------------------------------------------------------ */

/** Urutan tampil tiga pilihan supaya kunci tidak selalu di tempat yang sama. */
export function putarTiga(n: number): number[] {
  const g = n % 3;
  return [0, 1, 2].map((i) => (i + g) % 3);
}

/* ------------------------------ Memilah ------------------------------ */

export type ItemSortir = { id: string; label: string; isi?: React.ReactNode; bin: string; petunjuk: string; ucapan: string };
export type BinSortir = { id: string; label: string; warna: string; ikon?: string };

/**
 * Pilah benda atau kalimat ke kotak yang tepat. Seret ke kotak, atau ketuk benda lalu ketuk kotak (papan ketik: Enter).
 * Benda yang salah kembali dan petunjuknya dibacakan.
 */
export function Sortir({ item, bin, onBeres, kolomBin = 2, kartuTeks = false, gaya = "kertas", pesanBeres }: { item: ItemSortir[]; bin: BinSortir[]; onBeres: () => void; kolomBin?: 2 | 3; kartuTeks?: boolean; gaya?: "kayu" | "kertas"; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [tempat, setTempat] = useState<Record<string, string>>({});
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [hitungGoyang, setHitungGoyang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = item.filter((i) => !tempat[i.id]);
  const beres = sisa.length === 0;

  const taruh = (idItem: string, idBin: string) => {
    const it = item.find((i) => i.id === idItem);
    if (!it || tempat[idItem]) return;
    if (it.bin !== idBin) {
      setGoyang(idBin);
      setHitungGoyang((n) => n + 1);
      setKabar({ teks: it.petunjuk, ok: false });
      return;
    }
    const baru = { ...tempat, [idItem]: idBin };
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
  const lepas = (id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z?.startsWith("sortir:")) taruh(id, z.slice(7));
  };

  return (
    <>
      <div className={`${gaya === "kayu" ? `${ALAS} relative p-3` : KERTAS_ANGKA} space-y-3`}>
        <div className="flex min-h-[92px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-2" role="group" aria-label="Belum dipilah">
          {sisa.map((it) => (
            <BendaSeret key={it.id} id={it.id} label={it.label} onKetuk={(id) => setDipilih(id === dipilih ? null : id)} onLepas={lepas} kelas={`rounded-2xl ${kartuTeks ? "w-full" : ""} ${dipilih === it.id ? "ring-4 ring-[#F0AB00]" : ""}`}>
              {kartuTeks ? (
                <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black leading-snug text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)]">{it.label}</div>
              ) : (
                <div className="flex w-[78px] flex-col items-center gap-0.5 rounded-2xl bg-white/70 px-1 py-1">
                  {it.isi}
                  <span className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{it.label}</span>
                </div>
              )}
            </BendaSeret>
          ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua sudah masuk kotak</span> : null}
        </div>
        <div className={`grid gap-2 ${kolomBin === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
          {bin.map((b) => {
            const isiBin = item.filter((i) => tempat[i.id] === b.id);
            return (
              <div
                key={`${b.id}-${goyang === b.id ? hitungGoyang : 0}`}
                data-zona={`sortir:${b.id}`}
                role="button"
                tabIndex={0}
                aria-label={`Kotak ${b.label}, berisi ${isiBin.length}`}
                onClick={() => dipilih && taruh(dipilih, b.id)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && dipilih) {
                    e.preventDefault();
                    taruh(dipilih, b.id);
                  }
                }}
                className={`min-h-[104px] rounded-3xl border-4 border-[#1C01A5] px-1.5 py-2 ${goyang === b.id ? "igil-goyang" : ""} ${dipilih ? "cursor-pointer ring-2 ring-[#F0AB00]/60" : ""}`}
                style={{ backgroundColor: b.warna }}
              >
                <p className="text-center text-sm font-black leading-tight text-[#1C01A5]">
                  {b.ikon ? <span aria-hidden="true">{b.ikon} </span> : null}
                  {b.label}
                </p>
                <div className="mt-1 flex flex-wrap justify-center gap-1">
                  {isiBin.map((i) => (
                    <span key={i.id} className="igil-muncul rounded-full border-2 border-[#1C01A5] bg-white px-2 py-0.5 text-[11px] font-black leading-tight text-[#1C01A5]">
                      {kartuTeks ? i.label.slice(0, 22) + (i.label.length > 22 ? "…" : "") : i.label}
                    </span>
                  ))}
                </div>
              </div>
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

/* ------------------------------ Menarik garis ------------------------------ */

const WARNA_GARIS = ["#2563EB", "#DB2777", "#16A34A", "#EA580C", "#7C3AED", "#0E7490"];
const TINGGI_BARIS = 72;

export type SisiGaris = { id: string; teks: string };

/** Ketuk bangun di kiri, lalu ketuk cirinya di kanan. Pasangan yang benar tergambar sebagai garis. */
export function PasangGaris({ kiri, kanan, kunci, petunjuk, onBeres, pesanBeres }: { kiri: IdBentuk[]; kanan: SisiGaris[]; kunci: Record<string, string>; petunjuk: (bentuk: IdBentuk) => string; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [terhubung, setTerhubung] = useState<Record<string, string>>({});
  const [dipilih, setDipilih] = useState<IdBentuk | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const n = kiri.length;
  const dipakai = Object.values(terhubung);

  const pilihKanan = (idKanan: string) => {
    if (dipakai.includes(idKanan)) return;
    if (dipilih === null) {
      setKabar({ teks: "Ketuk dulu bangunnya di kiri, lalu ketuk cirinya di kanan.", ok: false });
      return;
    }
    if (kunci[dipilih] !== idKanan) {
      setGoyang(idKanan);
      setKabar({ teks: petunjuk(dipilih), ok: false });
      return;
    }
    const baru = { ...terhubung, [dipilih]: idKanan };
    setTerhubung(baru);
    setDipilih(null);
    setGoyang(null);
    if (Object.keys(baru).length === n) {
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
    } else {
      setKabar({ teks: "Pasangan yang tepat.", ok: true });
    }
  };

  const beres = Object.keys(terhubung).length === n;
  const indeksKanan = (id: string) => kanan.findIndex((k) => k.id === id);

  return (
    <>
      <div className={`${KERTAS_ANGKA} relative`}>
        <div className="grid grid-cols-[84px_1fr_1.35fr]" style={{ gridTemplateRows: `repeat(${n}, ${TINGGI_BARIS}px)` }}>
          {kiri.map((b, i) => (
            <button
              key={b}
              type="button"
              aria-label={`Bangun ${BentukNama(b)}${terhubung[b] ? ", sudah terhubung" : ""}`}
              aria-pressed={dipilih === b}
              disabled={!!terhubung[b]}
              onClick={() => {
                setDipilih(b);
                setKabar(null);
              }}
              style={{ gridColumn: 1, gridRow: i + 1 }}
              className={`m-1 flex items-center justify-center rounded-2xl border-4 bg-white ${dipilih === b ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : terhubung[b] ? "border-[#7FCB96]" : "border-[#1C01A5]"}`}
            >
              <BentukSvg id={b} kelas="h-12 w-12" warna={WARNA_GARIS[i % WARNA_GARIS.length] + "55"} />
            </button>
          ))}
          <svg viewBox={`0 0 56 ${TINGGI_BARIS * n}`} preserveAspectRatio="none" className="pointer-events-none" style={{ gridColumn: 2, gridRow: `1 / span ${n}`, width: "100%", height: TINGGI_BARIS * n }} aria-hidden="true">
            {kiri.map((b, i) => {
              const k = terhubung[b];
              if (!k) return null;
              const ri = indeksKanan(k);
              return <line key={b} x1="0" y1={i * TINGGI_BARIS + TINGGI_BARIS / 2} x2="56" y2={ri * TINGGI_BARIS + TINGGI_BARIS / 2} stroke={WARNA_GARIS[i % WARNA_GARIS.length]} strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />;
            })}
          </svg>
          {kanan.map((c, i) => (
            <button
              key={`${c.id}-${goyang === c.id ? "x" : "o"}`}
              type="button"
              aria-label={`Ciri: ${c.teks}${dipakai.includes(c.id) ? ", sudah terhubung" : ""}`}
              disabled={dipakai.includes(c.id)}
              onClick={() => pilihKanan(c.id)}
              style={{ gridColumn: 3, gridRow: i + 1 }}
              className={`m-1 flex items-center rounded-2xl border-4 px-2 text-left text-sm font-black leading-snug text-[#1C01A5] ${dipakai.includes(c.id) ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"} ${goyang === c.id ? "igil-goyang" : ""}`}
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

function BentukNama(id: IdBentuk): string {
  return id.replace(/([A-Z])/g, " $1").toLowerCase();
}

/* ------------------------------ Mengisi tabel ------------------------------ */

export type BarisTabel = { label: string; jawab: string };

/** Ketuk baris tabel (atau biarkan baris pertama yang kosong), lalu ketuk kartu jawabannya. */
export function IsiTabel({ kepala, baris, kartu, petunjuk, onBeres, pesanBeres }: { kepala: [string, string]; baris: BarisTabel[]; kartu: string[]; petunjuk: (b: BarisTabel) => string; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [terisi, setTerisi] = useState<Record<number, string>>({});
  const [manual, setManual] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const pertama = baris.findIndex((_, i) => !terisi[i]);
  const aktif = manual !== null && !terisi[manual] ? manual : pertama;
  const beres = pertama === -1;

  const pilihKartu = (k: string) => {
    if (beres || aktif < 0) return;
    const b = baris[aktif];
    if (k !== b.jawab) {
      setKeliru(k);
      setKabar({ teks: petunjuk(b), ok: false });
      return;
    }
    const baru = { ...terisi, [aktif]: k };
    setTerisi(baru);
    setKeliru(null);
    setManual(null);
    if (baris.every((_, i) => baru[i])) {
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
    } else {
      setKabar({ teks: `${b.label}, ${k}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-2 bg-[#FFE566] px-2 py-1 text-xs font-black text-[#1C01A5]">
            <span>{kepala[0]}</span>
            <span>{kepala[1]}</span>
          </div>
          {baris.map((b, i) => (
            <button
              key={b.label}
              type="button"
              aria-label={`Baris ${b.label}${terisi[i] ? `, isi ${terisi[i]}` : ", kosong"}`}
              aria-pressed={aktif === i}
              disabled={!!terisi[i]}
              onClick={() => setManual(i)}
              className={`grid w-full grid-cols-2 items-center px-2 py-1.5 text-left text-base font-black text-[#1C01A5] ${aktif === i ? "bg-[#FFF7CC] ring-4 ring-inset ring-[#F0AB00]" : i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}
            >
              <span>{b.label}</span>
              <span className={`inline-flex min-h-9 items-center justify-center rounded-xl border-4 px-2 ${terisi[i] ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-dashed border-[#1C01A5]/50 bg-white"}`}>{terisi[i] ?? "?"}</span>
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {kartu.map((k) => (
              <button
                key={`${k}-${keliru === k ? "x" : "o"}`}
                type="button"
                aria-label={`Kartu ${k}`}
                disabled={(() => {
                  const perlu = baris.filter((b) => b.jawab === k).length;
                  return perlu > 0 && Object.values(terisi).filter((v) => v === k).length >= perlu;
                })()}
                onClick={() => pilihKartu(k)}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2.5 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-35 ${keliru === k ? "igil-goyang" : ""}`}
              >
                {k}
              </button>
            ))}
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Detektif petunjuk ------------------------------ */

/** Dua petunjuk tertulis (dibacakan) dan tiga nama. Pilih nama yang cocok dengan kedua petunjuk. */
export function DetektifTeks({ soal, onBeres, pesanBeres }: { soal: SoalDetektifTeks; onBeres: () => void; pesanBeres: (nama: string) => string }) {
  const ucap = useContext(SuaraCtx);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [benar, setBenar] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = putarTiga(soal.jawab + soal.opsi[0].length);

  const pilih = (i: number) => {
    if (benar) return;
    if (i !== soal.jawab) {
      setKeliru(i);
      setKabar({ teks: soal.salah, ok: false });
      return;
    }
    setBenar(true);
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(pesanBeres(soal.opsi[i]));
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {soal.petunjuk.map((p, i) => (
          <CatatanPensil key={p} pendek={`Petunjuk ${i + 1}: ${p}`} teks={`Petunjuk ${i + 1}. ${p}`} />
        ))}
        <PilihanTeks opsi={urut.map((k) => soal.opsi[k])} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => pilih(urut[j])} mati={benar} />
        {benar ? <Berhasil>{pesanBeres(soal.opsi[soal.jawab])}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Peta konsep ------------------------------ */

/** Peta konsep: kotak menyala diisi dengan memilih satu dari tiga kartu. */
export function PetaKonsepGame({ pusat, kotak, onBeres, pesanBeres }: { pusat: string; kotak: KotakPeta[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [isi, setIsi] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi >= kotak.length;
  const aktif = kotak[Math.min(isi, kotak.length - 1)];
  const urut = putarTiga(isi + 1);

  const pilih = (asli: number) => {
    if (beres) return;
    if (asli !== aktif.benar) {
      setKeliru(asli);
      setKabar({ teks: `Belum cocok untuk kotak ${aktif.label.toLowerCase()}. Baca kartunya pelan-pelan, lalu pilih lagi.`, ok: false });
      return;
    }
    setKeliru(null);
    const maju = isi + 1;
    setIsi(maju);
    if (maju >= kotak.length) {
      setKabar(null);
      letusan.picu();
      ucap(pesanBeres);
      onBeres();
    } else {
      setKabar({ teks: `${aktif.label}: ${aktif.opsi[asli]}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="mx-auto w-fit rounded-full border-4 border-[#1C01A5] bg-[#1C01A5] px-5 py-1.5 text-center text-lg font-black text-[#FFE566]">{pusat}</p>
        <div className="space-y-1.5 border-l-4 border-[#1C01A5]/40 pl-2">
          {kotak.map((k, i) => (
            <div
              key={k.label}
              className={`rounded-2xl border-4 px-2 py-1.5 ${i < isi ? "border-[#7FCB96] bg-[#E8F7EE]" : i === isi ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5]/30 bg-white"}`}
              aria-label={`${k.label}: ${i < isi ? k.opsi[k.benar] : i === isi ? "kotak menyala, isi dengan kartu" : "belum"}`}
            >
              <p className="text-[11px] font-black uppercase tracking-wide text-[#1C01A5]/70">{k.label}</p>
              <p className="text-sm font-black leading-snug text-[#1C01A5]">{i < isi ? k.opsi[k.benar] : "?"}</p>
            </div>
          ))}
        </div>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <PilihanTeks opsi={urut.map((k) => aktif.opsi[k])} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => pilih(urut[j])} />
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Mengisi kalimat ------------------------------ */

/** Tiga kalimat bolong. Pilih satu dari tiga kartu untuk tiap bagian kosong. */
export function IsiKalimatGame({ kalimat, onBeres, pesanBeres }: { kalimat: KalimatIsian[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [selesai, setSelesai] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = selesai >= kalimat.length;
  const aktif = kalimat[Math.min(selesai, kalimat.length - 1)];
  const urut = putarTiga(selesai + 2);

  const pilih = (asli: number) => {
    if (beres) return;
    if (asli !== aktif.benar) {
      setKeliru(asli);
      setKabar({ teks: `Belum tepat. Baca kalimatnya lagi: ${aktif.depan} bagian kosong ${aktif.belakang}`, ok: false });
      return;
    }
    setKeliru(null);
    const maju = selesai + 1;
    setSelesai(maju);
    const utuh = `${aktif.depan} ${aktif.opsi[asli]} ${aktif.belakang}`.replace(/\s+\./g, ".");
    if (maju >= kalimat.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${utuh} ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: utuh, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {kalimat.map((k, i) => (
          <p key={k.depan} className={`rounded-2xl border-4 px-3 py-2 text-base font-black leading-snug ${i === selesai && !beres ? "border-[#F0AB00] bg-[#FFF7CC]" : i < selesai ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/25 bg-white/60"} text-[#1C01A5]`}>
            {k.depan}{" "}
            <span className={`inline-block min-w-14 rounded-lg border-2 border-dashed px-2 text-center ${i < selesai ? "border-[#16A34A] bg-white text-[#14532D]" : "border-[#1C01A5]/60 bg-white"}`}>{i < selesai ? k.opsi[k.benar] : "…"}</span> {k.belakang}
          </p>
        ))}
        {beres ? <Berhasil>{pesanBeres}</Berhasil> : <PilihanTeks opsi={urut.map((k) => aktif.opsi[k])} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => pilih(urut[j])} />}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Menyusun kata ------------------------------ */

/** Susun kalimat dari kartu kata teracak dengan satu kartu pengecoh. Ketuk kartu berurutan, urungkan, lalu periksa. */
export function SusunKata({ kata, pengecoh, nomor, onBeres }: { kata: string[]; pengecoh: string; nomor: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const kartu = urutanKartuKata({ kata, pengecoh }, nomor);
  const [urut, setUrut] = useState<number[]>([]);
  const [benar, setBenar] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const kalimat = kata.join(" ") + ".";

  const periksa = () => {
    const susun = urut.map((i) => kartu[i].asli);
    if (susun.length === kata.length && susun.every((a, i) => a === i)) {
      setBenar(true);
      setKabar(null);
      letusan.picu();
      ucap(`${kalimat} Susunanmu tepat.`);
      onBeres();
      return;
    }
    if (susun.includes(-1)) setKabar({ teks: "Ada satu kartu yang tidak cocok untuk kalimat ini. Urungkan kartu itu, lalu coba lagi.", ok: false });
    else if (susun.length < kata.length) setKabar({ teks: "Kalimatnya belum lengkap. Ketuk kartu kata berikutnya.", ok: false });
    else setKabar({ teks: "Urutannya belum tepat. Ucapkan kalimatnya dalam hati, lalu susun lagi.", ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <div className="flex min-h-[72px] flex-wrap items-center gap-1.5 rounded-2xl border-4 border-dashed border-[#1C01A5]/50 bg-white px-2 py-2" aria-live="polite" aria-label="Kalimat yang kamu susun">
          {urut.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">Ketuk kartu kata di bawah</span> : null}
          {urut.map((i, pos) => (
            <span key={`${i}-${pos}`} className="igil-muncul rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-2.5 py-1 text-base font-black text-[#1C01A5]">
              {kartu[i].teks}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {kartu.map((k, i) => (
            <button
              key={k.teks + i}
              type="button"
              aria-label={`Kartu kata ${k.teks}`}
              disabled={urut.includes(i) || benar}
              onClick={() => {
                setKabar(null);
                setUrut([...urut, i]);
              }}
              className="rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-25"
            >
              {k.teks}
            </button>
          ))}
        </div>
        {benar ? (
          <Berhasil>{kalimat}</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setUrut(urut.slice(0, -1))} disabled={urut.length === 0} className={TOMBOL_PUTIH}>
              ↩ Urungkan
            </button>
            <button type="button" onClick={periksa} disabled={urut.length === 0} className={TOMBOL_BESAR}>
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

/* ------------------------------ Benar atau salah ------------------------------ */

/** Lima pernyataan. Tekan Benar atau Salah. Jawaban keliru dijelaskan dan boleh dicoba lagi. */
export function BenarSalahGame({ pernyataan, onBeres, pesanBeres }: { pernyataan: Pernyataan[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [terjawab, setTerjawab] = useState<boolean[]>(() => pernyataan.map(() => false));
  const [keliru, setKeliru] = useState<{ i: number; pilih: boolean } | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const jawab = (i: number, pilih: boolean) => {
    if (terjawab[i]) return;
    const p = pernyataan[i];
    if (pilih !== p.benar) {
      setKeliru({ i, pilih });
      setKabar({ teks: `Belum tepat. ${p.penjelasan}`, ok: false });
      return;
    }
    const baru = terjawab.slice();
    baru[i] = true;
    setTerjawab(baru);
    setKeliru(null);
    if (baru.every(Boolean)) {
      setKabar(null);
      letusan.picu();
      ucap(`${p.penjelasan} ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: p.penjelasan, ok: true });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {pernyataan.map((p, i) => (
          <div key={p.teks} className={`space-y-1.5 rounded-2xl border-4 px-2 py-2 ${terjawab[i] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/40 bg-white"}`}>
            <p className="text-sm font-black leading-snug text-[#1C01A5]">
              {i + 1}. {p.teks}
            </p>
            {terjawab[i] ? (
              <p className="text-sm font-black text-[#14532D]">{p.benar ? "✅ Benar" : "❌ Salah"}</p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map((pilih) => (
                  <button
                    key={`${pilih}-${keliru?.i === i && keliru.pilih === pilih ? "x" : "o"}`}
                    type="button"
                    aria-label={`${pilih ? "Benar" : "Salah"}, pernyataan ${i + 1}`}
                    onClick={() => jawab(i, pilih)}
                    className={`rounded-2xl border-4 border-[#1C01A5] py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${pilih ? "bg-[#BBF7D0]" : "bg-[#FECACA]"} ${keliru?.i === i && keliru.pilih === pilih ? "igil-goyang" : ""}`}
                  >
                    {pilih ? "✅ Benar" : "❌ Salah"}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {terjawab.every(Boolean) ? <Berhasil>{pesanBeres}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
