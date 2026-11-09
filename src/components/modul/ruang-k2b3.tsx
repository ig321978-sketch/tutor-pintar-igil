"use client";

import React, { useContext, useMemo, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { Berhasil, PilihanTeks, TOMBOL_BESAR } from "./permainan-k2b2";
import { BendaRuangSvg, BentukSvg, ModelRuangSvg } from "./dasar-k2b3";
import {
  ALASAN_GELIND_C,
  KOLOM_TABEL_C,
  NAMA_BAYANGAN_C,
  NAMA_CETAKAN_C,
  NAMA_RUANG,
  URUTAN_CETAKAN_C,
  URUTAN_RUANG,
  bendaRuang,
  kunciTabelC,
  menggelinding,
  urutanTetap,
  type BayanganC,
  type JenisRuang,
  type RondeCetak,
} from "./data-k2b3";
import { putarTiga } from "./permainan-k2b3";

/* ------------------------------------------------------------------------ */
/* Permainan bangun ruang Matematika Kelas 2 Bab 3 Sub-Bab C: menggelindingkan, */
/* tas misteri, mencetak permukaan, bayangan, tabel permukaan, dan memberi      */
/* nama. Logika di data-k2b3.ts. Tanpa API.                                    */
/* ------------------------------------------------------------------------ */

const WAKTU = "text-center text-base font-black text-[#3B2410]";

/* ------------------------------ C1. Lereng gelinding ------------------------------ */

/** Lepaskan tiap benda di lerengnya, tandai yang menggelinding, lalu pilih alasannya. */
export function LerengGelinding({ benda, onBeres }: { benda: string[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [lepas, setLepas] = useState<string[]>([]);
  const [tandai, setTandai] = useState<string[]>([]);
  const [tahap, setTahap] = useState<"lepas" | "pilih" | "alasan" | "selesai">("lepas");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const gelinding = benda.filter((id) => menggelinding(bendaRuang(id).jenis));
  const urutAlasan = putarTiga(benda.length + gelinding.length);

  const lepaskan = (id: string) => {
    if (tahap !== "lepas" || lepas.includes(id)) return;
    const baru = [...lepas, id];
    setLepas(baru);
    const b = bendaRuang(id);
    ucap(menggelinding(b.jenis) ? `${b.nama} menggelinding.` : `${b.nama} diam di tempat.`);
    if (baru.length === benda.length) {
      setTahap("pilih");
      setKabar({ teks: "Semua sudah dicoba. Sekarang ketuk semua benda yang menggelinding, lalu tekan Periksa.", ok: true });
    }
  };

  const periksa = () => {
    const sama = tandai.length === gelinding.length && gelinding.every((g) => tandai.includes(g));
    if (!sama) {
      setKabar({ teks: tandai.some((t) => !gelinding.includes(t)) ? "Ada benda yang kamu pilih tetapi tidak menggelinding tadi. Lihat lagi hasil percobaannya." : "Masih ada benda yang menggelinding dan belum kamu pilih.", ok: false });
      return;
    }
    setTahap("alasan");
    setKabar(null);
    ucap("Betul. Sekarang, mengapa benda-benda itu menggelinding?");
  };

  const alasan = (asli: number) => {
    if (asli !== 0) {
      setKeliru(asli);
      setKabar({ teks: "Coba ingat benda yang menggelinding. Perhatikan permukaannya, datar atau lengkung?", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap("Betul! Benda yang permukaannya lengkung mudah menggelinding.");
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          {benda.map((id) => {
            const b = bendaRuang(id);
            const sudah = lepas.includes(id);
            const roll = menggelinding(b.jenis);
            const dipilih = tandai.includes(id);
            return (
              <button
                key={id}
                type="button"
                aria-label={`${b.nama}${sudah ? (roll ? ", menggelinding" : ", diam") : ", belum dicoba"}${dipilih ? ", dipilih" : ""}`}
                aria-pressed={tahap === "pilih" ? dipilih : undefined}
                onClick={() => {
                  if (tahap === "lepas") lepaskan(id);
                  else if (tahap === "pilih") {
                    setTandai(dipilih ? tandai.filter((x) => x !== id) : [...tandai, id]);
                    setKabar(null);
                  }
                }}
                className={`relative h-[128px] overflow-hidden rounded-2xl border-4 bg-[#FFF7E6] ${dipilih ? "border-[#16A34A] ring-4 ring-[#16A34A]/40" : "border-[#8A5322]"}`}
              >
                <span className="absolute left-1.5 top-1 z-10 text-[11px] font-black leading-tight text-[#3B2410]">{b.nama}</span>
                <span className="absolute bottom-[34px] left-1.5 right-1.5 h-2 origin-left rounded bg-[#8A5322]" style={{ transform: "rotate(14deg)" }} aria-hidden="true" />
                <span
                  className="absolute bottom-[42px] left-2"
                  style={{
                    transform: sudah && roll ? "translate(86px, 24px) rotate(630deg)" : "none",
                    transition: sudah && roll ? "transform 1.7s ease-in" : undefined,
                    animation: sudah && !roll ? "igil-goyang 0.8s ease-in-out 2" : undefined,
                  }}
                >
                  <BendaRuangSvg id={id} kelas="h-12 w-12" />
                </span>
                <span className="absolute left-1.5 top-[20px] z-10 text-left text-[11px] font-black leading-tight text-[#1C01A5]">
                  {sudah ? (roll ? "🌀 menggelinding" : "🧱 diam") : tahap === "lepas" ? "Ketuk untuk melepas" : ""}
                </span>
              </button>
            );
          })}
        </div>
        <p className={WAKTU}>
          {tahap === "lepas" ? `Sudah dicoba: ${lepas.length} dari ${benda.length}` : tahap === "pilih" ? `Dipilih: ${tandai.length}` : ""}
        </p>
        {tahap === "pilih" ? (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} disabled={tandai.length === 0} className={TOMBOL_BESAR}>
              ✅ Periksa
            </button>
          </div>
        ) : null}
        {tahap === "alasan" ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Mengapa benda itu menggelinding?</p>
            <PilihanTeks opsi={urutAlasan.map((k) => `Karena ${ALASAN_GELIND_C[k]}`)} keliru={keliru === null ? null : urutAlasan.indexOf(keliru)} onPilih={(j) => alasan(urutAlasan[j])} />
          </div>
        ) : null}
        {tahap === "selesai" ? <Berhasil>Permukaan lengkung mudah menggelinding</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C2. Tas misteri ------------------------------ */

const WAKIL_RUANG: Record<JenisRuang, string> = { kubus: "dadu", balok: "kardus", tabung: "kaleng", kerucut: "topi", bola: "bola" };

/** Benda tersembunyi di dalam tas. Raba untuk membuka petunjuk satu per satu, lalu tebak namanya. */
export function TasMisteri({ jenis, petunjuk, onBeres }: { jenis: JenisRuang; petunjuk: string[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [buka, setBuka] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = useMemo(() => urutanTetap(URUTAN_RUANG.length, 2, URUTAN_RUANG.indexOf(jenis) + 1), [jenis]);
  const bintang = Math.max(1, 4 - buka);

  const raba = () => {
    if (buka >= petunjuk.length || beres) return;
    const n = buka + 1;
    setBuka(n);
    setKabar(null);
    ucap(petunjuk[buka]);
  };
  const tebak = (j: JenisRuang, i: number) => {
    if (beres) return;
    if (buka === 0) {
      setKabar({ teks: "Raba dulu bendanya di dalam tas, baru menebak.", ok: false });
      return;
    }
    if (j !== jenis) {
      setKeliru(i);
      setKabar({ teks: buka < petunjuk.length ? "Belum tepat. Raba lagi untuk mendapat petunjuk berikutnya." : "Belum tepat. Baca ketiga petunjuknya sekali lagi, lalu pilih namanya.", ok: false });
      return;
    }
    setBeres(true);
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! Benda di dalam tas berbentuk ${NAMA_RUANG[jenis].toLowerCase()}. Kamu mendapat ${bintang} bintang.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="mx-auto flex h-36 w-36 items-center justify-center">
          {beres ? (
            <BendaRuangSvg id={WAKIL_RUANG[jenis]} kelas="h-32 w-32" />
          ) : (
            <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="Tas misteri berisi satu benda">
              <path d="M30 28 Q50 8 70 28 L84 88 Q50 98 16 88 Z" fill="#7C3AED" stroke={BIRU_TAS} strokeWidth="3" strokeLinejoin="round" />
              <path d="M30 28 Q50 40 70 28" fill="#5B21B6" stroke={BIRU_TAS} strokeWidth="3" />
              <path d="M36 30 Q50 20 64 30" fill="none" stroke="#FDE047" strokeWidth="3.4" strokeLinecap="round" />
              <text x="50" y="72" textAnchor="middle" fontSize="34" fontWeight="900" fill="#FDE047">
                ?
              </text>
            </svg>
          )}
        </div>
        <div className="space-y-1">
          {petunjuk.slice(0, buka).map((p, i) => (
            <p key={p} className="igil-muncul rounded-xl border-4 border-[#1C01A5] bg-white px-2 py-1.5 text-sm font-black leading-snug text-[#1C01A5]">
              ✋ Raba {i + 1}: {p}
            </p>
          ))}
        </div>
        {!beres ? (
          <div className="flex justify-center">
            <button type="button" onClick={raba} disabled={buka >= petunjuk.length} className={TOMBOL_BESAR}>
              ✋ Raba ({buka} dari {petunjuk.length})
            </button>
          </div>
        ) : null}
        {!beres ? (
          <div className="grid grid-cols-3 gap-2">
            {urut.map((idx, i) => (
              <button
                key={`${URUTAN_RUANG[idx]}-${keliru === i ? "x" : "o"}`}
                type="button"
                aria-label={`Tebak ${NAMA_RUANG[URUTAN_RUANG[idx]]}`}
                onClick={() => tebak(URUTAN_RUANG[idx], i)}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2.5 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === i ? "igil-goyang" : ""}`}
              >
                {NAMA_RUANG[URUTAN_RUANG[idx]]}
              </button>
            ))}
          </div>
        ) : (
          <Berhasil>
            {NAMA_RUANG[jenis]}! {"⭐".repeat(bintang)}
          </Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

const BIRU_TAS = "#1C01A5";

/* ------------------------------ C3. Cetak dan tebak ------------------------------ */

const BENTUK_CETAK = { persegi: "persegi", persegiPanjang: "persegiPanjang", lingkaran: "lingkaran" } as const;

/** Pilih permukaan benda untuk dicetak. Permukaan lengkung tidak menghasilkan cetakan rapi. Lalu namai cetakannya. */
export function CetakTebak({ ronde, onBeres }: { ronde: RondeCetak; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const b = bendaRuang(ronde.benda);
  const [hasil, setHasil] = useState<RondeCetak["jawab"] | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = useMemo(() => putarTiga(URUTAN_RUANG.indexOf(b.jenis) + 1), [b.jenis]);

  const cetak = (i: number) => {
    const p = ronde.permukaan[i];
    if (p.cetak === null) {
      setKabar({ teks: `${p.nama} berbentuk lengkung. Cetakannya tidak rapi dan tidak rata. Coba permukaan yang lain.`, ok: false });
      return;
    }
    setHasil(p.cetak);
    setKabar(null);
    ucap(`Cetakan dari ${p.nama} sudah muncul. Bangun datar apa hasil cetakannya?`);
  };
  const jawab = (asli: number) => {
    if (hasil === null || beres) return;
    const kunci = URUTAN_CETAKAN_C[asli] === ronde.jawab;
    if (!kunci) {
      setKeliru(asli);
      setKabar({ teks: "Lihat cetakannya sekali lagi. Perhatikan tepinya dan ukuran sisi-sisinya.", ok: false });
      return;
    }
    setBeres(true);
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! Cetakan ${b.nama.toLowerCase()} berbentuk ${NAMA_CETAKAN_C[ronde.jawab].toLowerCase()}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <BendaRuangSvg id={ronde.benda} kelas="h-28 w-28" />
            <p className="text-center text-sm font-black text-[#3B2410]">{b.nama}</p>
          </div>
          <div className="flex h-32 items-center justify-center rounded-lg border-[3px] border-[#6B7280] bg-white shadow-[3px_4px_0_rgba(0,0,0,0.15)]">
            {hasil ? (
              <span className="igil-muncul">
                <BentukSvg id={BENTUK_CETAK[hasil]} warna="#DDD6FE" kelas="h-24 w-24" putus />
              </span>
            ) : (
              <span className="px-2 text-center text-sm font-black text-[#1C01A5]/60">Kertas cetakan masih kosong</span>
            )}
          </div>
        </div>
        <div className="grid gap-1.5">
          {ronde.permukaan.map((p, i) => (
            <button key={p.nama} type="button" onClick={() => cetak(i)} disabled={beres} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5]">
              🖨️ Cetak {p.nama}
            </button>
          ))}
        </div>
        {hasil && !beres ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Bangun datar apa cetakannya?</p>
            <PilihanTeks opsi={urut.map((k) => NAMA_CETAKAN_C[URUTAN_CETAKAN_C[k]])} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => jawab(urut[j])} />
          </div>
        ) : null}
        {beres ? <Berhasil>{NAMA_CETAKAN_C[ronde.jawab]}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C5. Bayangan bangun ruang ------------------------------ */

const HINT_BAYANGAN: Record<string, string> = {
  "kubus-atas": "Dari atas, permukaan atas kubus tampak sebagai segi empat yang keempat sisinya sama panjang.",
  "kerucut-samping": "Dari samping, kerucut tampak runcing di atas dan lebar di bawah, seperti segitiga.",
  "tabung-atas": "Dari atas, alas tabung tampak bulat, seperti lingkaran.",
  "balok-samping": "Dari samping, balok tampak sebagai segi empat yang memanjang.",
};

/** Lihat bangun ruang dari atas atau samping, lalu pilih bayangan bangun datarnya. */
export function Bayangan({ soal, onBeres }: { soal: BayanganC; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const petunjuk = HINT_BAYANGAN[`${soal.jenis}-${soal.arah}`];

  const pilih = (i: number) => {
    if (beres) return;
    if (soal.opsi[i] !== soal.jawab) {
      setKeliru(i);
      setKabar({ teks: `Belum tepat. ${petunjuk}`, ok: false });
      return;
    }
    setBeres(true);
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! ${petunjuk}`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="relative mx-auto flex h-36 w-full max-w-[260px] items-center justify-center rounded-2xl bg-[#EEF2FF]">
          <ModelRuangSvg jenis={soal.jenis} kelas="h-28 w-28" />
          {soal.arah === "atas" ? (
            <span className="absolute left-1/2 top-0 -translate-x-1/2 text-center text-sm font-black leading-none text-[#1C01A5]">
              👁️<br />⬇
            </span>
          ) : (
            <span className="absolute left-1 top-1/2 -translate-y-1/2 text-center text-sm font-black leading-none text-[#1C01A5]">
              👁️<br />➡
            </span>
          )}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          {NAMA_RUANG[soal.jenis]} dilihat dari {soal.arah}. Bayangannya?
        </p>
        <div className="grid grid-cols-3 gap-2">
          {soal.opsi.map((o, i) => (
            <button
              key={`${o}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Bayangan ${NAMA_BAYANGAN_C[o]}`}
              disabled={beres}
              onClick={() => pilih(i)}
              className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 ${beres && o === soal.jawab ? "border-[#16A34A] bg-[#DCFCE7]" : ""} ${keliru === i ? "igil-goyang" : ""}`}
            >
              <BentukSvg id={o === "segitiga" ? "segitiga" : o === "lingkaran" ? "lingkaran" : o === "persegi" ? "persegi" : "persegiPanjang"} warna="#334155" kelas="h-16 w-16" />
              <span className="text-xs font-black text-[#1C01A5]">{NAMA_BAYANGAN_C[o]}</span>
            </button>
          ))}
        </div>
        {beres ? <Berhasil>Bayangannya {NAMA_BAYANGAN_C[soal.jawab]}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ C6. Tabel permukaan ------------------------------ */

/** Centang tiap kolom pada tiap baris bangun ruang, lalu tekan Periksa. */
export function TabelPermukaan({ onBeres }: { onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [centang, setCentang] = useState<boolean[][]>(() => URUTAN_RUANG.map(() => [false, false, false]));
  const [salah, setSalah] = useState<number[]>([]);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const periksa = () => {
    const bad = URUTAN_RUANG.map((j, i) => (kunciTabelC(j).every((v, k) => v === centang[i][k]) ? -1 : i)).filter((i) => i >= 0);
    setSalah(bad);
    if (bad.length === 0) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap("Betul! Kubus dan balok berpermukaan datar. Tabung, kerucut, dan bola berpermukaan lengkung dan bisa menggelinding.");
      onBeres();
      return;
    }
    const j = URUTAN_RUANG[bad[0]];
    const k = kunciTabelC(j);
    setKabar({ teks: `Periksa baris ${NAMA_RUANG[j]}. Permukaan ${NAMA_RUANG[j].toLowerCase()} ${k[0] ? "datar" : "lengkung"} dan ${k[2] ? "bisa menggelinding" : "tidak menggelinding"}.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-[1.35fr_1fr_1fr_1fr] bg-[#FFE566] px-1 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5]">
            <span className="text-left">Bangun ruang</span>
            {KOLOM_TABEL_C.map((k) => (
              <span key={k}>{k}</span>
            ))}
          </div>
          {URUTAN_RUANG.map((j, i) => (
            <div key={j} className={`grid grid-cols-[1.35fr_1fr_1fr_1fr] items-center px-1 py-1 ${salah.includes(i) ? "bg-[#FDECEC]" : i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <span className="flex items-center gap-1 text-sm font-black text-[#1C01A5]">
                <ModelRuangSvg jenis={j} kelas="h-9 w-9 shrink-0" />
                {NAMA_RUANG[j]}
              </span>
              {KOLOM_TABEL_C.map((k, c) => (
                <button
                  key={k}
                  type="button"
                  role="checkbox"
                  aria-checked={centang[i][c]}
                  aria-label={`${NAMA_RUANG[j]}: ${k}`}
                  disabled={beres}
                  onClick={() => {
                    const baru = centang.map((r) => r.slice());
                    baru[i][c] = !baru[i][c];
                    setCentang(baru);
                    setSalah([]);
                    setKabar(null);
                  }}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${centang[i][c] ? "bg-[#FFE566]" : "bg-white"}`}
                >
                  {centang[i][c] ? "✔" : ""}
                </button>
              ))}
            </div>
          ))}
        </div>
        {beres ? (
          <Berhasil>Tabel permukaan sudah tepat</Berhasil>
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

/* ------------------------------ C7. Beri nama bangun ruang ------------------------------ */

const PETUNJUK_MODEL: Record<JenisRuang, string> = {
  kubus: "Model ini punya permukaan datar. Semua permukaannya segi empat yang sama ukurannya.",
  balok: "Model ini punya permukaan datar. Permukaannya segi empat dengan ukuran yang berbeda-beda.",
  tabung: "Model ini punya permukaan lengkung dan dua alas lingkaran. Ia bisa menggelinding.",
  kerucut: "Model ini punya satu ujung yang runcing dan alas lingkaran.",
  bola: "Model ini seluruh permukaannya lengkung dan tidak punya ujung.",
};

/** Seret label nama ke model yang sesuai, atau ketuk label lalu ketuk model. */
export function BeriNama({ urut, warna, onBeres }: { urut: JenisRuang[]; warna: string[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [terpasang, setTerpasang] = useState<Record<number, JenisRuang>>({});
  const [dipilih, setDipilih] = useState<JenisRuang | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const dipakai = Object.values(terpasang);
  const beres = Object.keys(terpasang).length === urut.length;
  const labelUrut = useMemo(() => urutanTetap(URUTAN_RUANG.length, 2, urut.length).map((i) => URUTAN_RUANG[i]), [urut.length]);

  const taruh = (j: JenisRuang, i: number) => {
    if (terpasang[i] !== undefined || dipakai.includes(j)) return;
    if (urut[i] !== j) {
      setGoyang(i);
      setKabar({ teks: `Belum cocok. ${PETUNJUK_MODEL[urut[i]]}`, ok: false });
      return;
    }
    const baru = { ...terpasang, [i]: j };
    setTerpasang(baru);
    setDipilih(null);
    setGoyang(null);
    if (Object.keys(baru).length === urut.length) {
      setKabar(null);
      letusan.picu();
      ucap("Hebat! Semua bangun ruang sudah punya nama: kubus, balok, tabung, kerucut, dan bola.");
      onBeres();
    } else {
      setKabar({ teks: `Itu ${NAMA_RUANG[j].toLowerCase()}. Tepat.`, ok: true });
    }
  };
  const lepas = (id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z?.startsWith("model:")) taruh(id as JenisRuang, Number(z.slice(6)));
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="grid grid-cols-3 gap-2">
          {urut.map((j, i) => (
            <div
              key={`${i}-${goyang === i ? "x" : "o"}`}
              data-zona={`model:${i}`}
              role="button"
              tabIndex={0}
              aria-label={`Model ${i + 1}${terpasang[i] ? `, bernama ${NAMA_RUANG[terpasang[i]]}` : ", belum bernama"}`}
              onClick={() => dipilih && taruh(dipilih, i)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && dipilih) {
                  e.preventDefault();
                  taruh(dipilih, i);
                }
              }}
              className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 px-1 py-1.5 ${terpasang[i] ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"} ${goyang === i ? "igil-goyang" : ""}`}
            >
              <ModelRuangSvg jenis={j} warna={warna[i]} kelas="h-16 w-16" />
              <span className="min-h-5 text-xs font-black text-[#14532D]">{terpasang[i] ? NAMA_RUANG[terpasang[i]] : "?"}</span>
            </div>
          ))}
        </div>
        <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-2" role="group" aria-label="Label nama">
          {labelUrut
            .filter((j) => !dipakai.includes(j))
            .map((j) => (
              <BendaSeret key={j} id={j} label={`Label ${NAMA_RUANG[j]}`} onKetuk={(id) => setDipilih(dipilih === id ? null : (id as JenisRuang))} onLepas={lepas} kelas={`rounded-full ${dipilih === j ? "ring-4 ring-[#F0AB00]" : ""}`}>
                <span className="block rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-4 py-1 text-base font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)]">{NAMA_RUANG[j]}</span>
              </BendaSeret>
            ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua model sudah bernama</span> : null}
        </div>
        {beres ? <Berhasil>Semua bangun ruang sudah bernama</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
