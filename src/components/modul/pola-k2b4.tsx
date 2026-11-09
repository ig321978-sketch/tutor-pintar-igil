"use client";

import React, { useContext, useMemo, useRef, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BIRU, BangunG, UnsurSvg } from "./dasar-k2b4";
import {
  HEX_WARNA, NAMA_BENTUK_POLA, PALET_WARNA, adalahPola, barisanRonde, namaUnsur, periksaBarisan, periksaWarnai, pilihanUnsur, satuanCocok,
  sebutSatuan, susunPola, urutanTetap, type BarisanPola, type RondeBarisan, type RondeCari, type RondeIsi, type RondeLanjut, type RondeWarnai,
} from "./data-k2b4";

/* ------------------------------------------------------------------------ */
/* Permainan Sub-Bab B (Pola): lanjutkan pola (manik, gerakan, suara, bentuk),   */
/* atur barisan sahabat, pola atau bukan, warnai pola, isi kotak, cari satuan.  */
/* Bunyi tepuk dibuat di perangkat dengan WebAudio. Tanpa API, tanpa acak.      */
/* ------------------------------------------------------------------------ */

const WAKTU = "text-center text-base font-black text-[#3B2410]";

/* ------------------------------ Bunyi di perangkat ------------------------------ */

let konteks: AudioContext | null = null;

/** Bunyi pendek: keras (nada tinggi, nyaring), pelan (nada rendah, lirih). Diam tidak berbunyi. */
export function bunyiUnsur(token: string): void {
  if (token === "diam" || typeof window === "undefined") return;
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    konteks = konteks ?? new AC();
    const o = konteks.createOscillator();
    const g = konteks.createGain();
    const t = konteks.currentTime;
    o.type = "triangle";
    o.frequency.value = token === "keras" ? 660 : 330;
    g.gain.setValueAtTime(token === "keras" ? 0.3 : 0.1, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    o.connect(g);
    g.connect(konteks.destination);
    o.start(t);
    o.stop(t + 0.3);
  } catch {
    /* tanpa bunyi bila perangkat tidak mendukung */
  }
}

/* ------------------------------ B1, B3, B4, B6. Lanjutkan pola ------------------------------ */

const BAJU_GERAK = ["#3B82F6", "#EC4899", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#0EA5E9", "#84CC16", "#F97316", "#14B8A6", "#A855F7", "#E11D48"];

export function LanjutPola({ ronde, mode, onBeres }: { ronde: RondeLanjut; mode: "concrete" | "picture"; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const penuh = useMemo(() => barisanRonde(ronde), [ronde]);
  const opsi = useMemo(() => pilihanUnsur(ronde), [ronde]);
  const [isi, setIsi] = useState(0);
  const [salah, setSalah] = useState(0);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const [main, setMain] = useState<number | null>(null);
  const penunda = useRef<number[]>([]);
  const letusan = useLetusan();
  const total = ronde.tampil + ronde.lanjut;
  const nama = (t: string) => namaUnsur(ronde.jenis, t);

  const pilih = (t: string) => {
    if (beres) return;
    if (ronde.jenis === "suara") bunyiUnsur(t);
    const harus = penuh[ronde.tampil + isi];
    if (t !== harus) {
      setSalah(salah + 1);
      setKeliru(t);
      setKabar({ teks: `Belum tepat. Lihat kelompok yang berulang dari awal, lalu lanjutkan urutannya.${salah >= 1 ? ` Satuan polanya: ${sebutSatuan(ronde.satuan.map(nama))}.` : ""}`, ok: false });
      return;
    }
    setKeliru(null);
    const baru = isi + 1;
    setIsi(baru);
    if (baru >= ronde.lanjut) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Polanya berlanjut: ${penuh.slice(ronde.tampil).map(nama).join(", ")}. Satuan polanya ${ronde.satuan.map(nama).join(", ")}.`);
      onBeres();
    } else setKabar({ teks: `Betul, berikutnya ${nama(t)}.`, ok: true });
  };

  const dengarkan = () => {
    penunda.current.forEach((p) => window.clearTimeout(p));
    penunda.current = [];
    const urut = penuh.slice(0, ronde.tampil + isi);
    urut.forEach((t, i) => {
      penunda.current.push(window.setTimeout(() => { setMain(i); bunyiUnsur(t); }, i * 420));
    });
    penunda.current.push(window.setTimeout(() => setMain(null), urut.length * 420));
  };

  const ukuran = ronde.jenis === "gerakan" ? "h-14 w-11" : "h-10 w-10";
  return (
    <>
      <div className={`${mode === "concrete" ? `${ALAS} relative p-3` : KERTAS_ANGKA} space-y-2`}>
        <p className={WAKTU}>
          {beres ? "Pola sudah lengkap" : `Pilih ${mode === "concrete" ? "yang" : "bentuk yang"} berikutnya (${isi} dari ${ronde.lanjut})`}
        </p>
        <div className="relative rounded-2xl bg-white/85 px-1.5 py-2">
          <div className="relative flex flex-wrap items-center justify-center gap-y-1" role="group" aria-label="Barisan pola">
            {Array.from({ length: total }, (_, i) => {
              const terisi = i < ronde.tampil + isi;
              const awalSatuan = salah >= 1 && i < ronde.satuan.length;
              return (
                <span key={i} className={`relative mx-0.5 flex items-center justify-center rounded-lg ${ukuran} ${terisi ? "" : "border-2 border-dashed border-[#1C01A5]/50 bg-[#FFFBEB]"} ${awalSatuan && terisi ? "ring-2 ring-[#F0AB00]" : ""} ${main === i ? "scale-110" : ""}`} aria-label={terisi ? `Unsur ${i + 1}: ${nama(penuh[i])}` : `Tempat kosong ke-${i + 1 - ronde.tampil}`}>
                  {ronde.jenis === "warna" ? <span className="absolute -inset-x-1 top-1/2 -z-0 h-1 -translate-y-1/2 bg-[#8A5322]/60" aria-hidden="true" /> : null}
                  {terisi ? <UnsurSvg jenis={ronde.jenis} token={penuh[i]} kelas="h-full w-full" label={nama(penuh[i])} baju={ronde.jenis === "gerakan" ? BAJU_GERAK[i % BAJU_GERAK.length] : undefined} /> : <span className="text-lg font-black text-[#1C01A5]/40">?</span>}
                </span>
              );
            })}
          </div>
        </div>
        {ronde.jenis === "suara" ? (
          <div className="flex justify-center">
            <button type="button" onClick={dengarkan} className={TOMBOL_PUTIH}>
              🔊 Dengarkan
            </button>
          </div>
        ) : null}
        {beres ? (
          <Berhasil>Satuan pola: {ronde.satuan.map(nama).join(", ")}</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilihan berikutnya">
            {opsi.map((t) => (
              <button
                key={`${t}-${keliru === t ? "x" : "o"}`}
                type="button"
                aria-label={`Pilih: ${nama(t)}`}
                onClick={() => pilih(t)}
                className={`flex flex-col items-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-1 shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === t ? "igil-goyang" : ""}`}
              >
                <UnsurSvg jenis={ronde.jenis} token={t} kelas={ronde.jenis === "gerakan" ? "h-14 w-11" : "h-11 w-11"} label={nama(t)} baju="#3B82F6" />
                {mode === "concrete" ? <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{nama(t)}</span> : null}
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

/* ------------------------------ B2. Atur barisan sahabat ------------------------------ */

const BAJU_SAHABAT: Record<string, string> = { Upe: "#FBBF24", Lili: "#F472B6", Halim: "#A78BFA", Kira: "#EC4899", Malosi: "#34D399", Tika: "#60A5FA" };
const RAMBUT: Record<string, string> = { Upe: "#92400E", Lili: "#1F2937", Halim: "#374151", Kira: "#1F2937", Malosi: "#111827", Tika: "#7A4A1E" };

function SahabatSvg({ nama, topi, kelas = "h-16 w-14" }: { nama: string; topi?: string; kelas?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={kelas} role="img" aria-label={nama}>
      <rect x="18" y="44" width="24" height="30" rx="9" fill={BAJU_SAHABAT[nama] ?? "#93C5FD"} stroke={BIRU} strokeWidth="2.4" />
      <path d="M24 74 V86 M36 74 V86" stroke={BIRU} strokeWidth="5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="15" fill="#F3C9A0" stroke={BIRU} strokeWidth="2.4" />
      <path d="M15 28 Q30 6 45 28 Q30 20 15 28 Z" fill={RAMBUT[nama] ?? "#1F2937"} />
      <circle cx="25" cy="32" r="2" fill={BIRU} />
      <circle cx="35" cy="32" r="2" fill={BIRU} />
      <path d="M26 38 Q30 41 34 38" fill="none" stroke={BIRU} strokeWidth="1.6" strokeLinecap="round" />
      {topi ? <path d="M13 22 Q30 -4 47 22 Z" fill={HEX_WARNA[topi] ?? topi} stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" /> : null}
    </svg>
  );
}

export function AturBarisan({ ronde, onBeres }: { ronde: RondeBarisan; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = ronde.sahabat.length;
  const [urutan, setUrutan] = useState<(string | null)[]>(() => Array.from({ length: n }, () => null));
  const [dipilih, setDipilih] = useState<string | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const topi = ronde.atribut === "warna topi";
  const sifat = (nm: string) => ronde.sahabat.find((s) => s.nama === nm)!.sifat;
  const tersisa = ronde.sahabat.filter((s) => !urutan.includes(s.nama));

  const ketukTempat = (i: number) => {
    if (beres) return;
    if (urutan[i]) {
      const baru = urutan.slice();
      baru[i] = null;
      setUrutan(baru);
      setKabar(null);
      return;
    }
    if (!dipilih) {
      setKabar({ teks: "Ketuk salah satu sahabat dulu, lalu ketuk tempat di barisan.", ok: false });
      return;
    }
    const baru = urutan.slice();
    baru[i] = dipilih;
    setUrutan(baru);
    setDipilih(null);
    setKabar(null);
  };
  const periksa = () => {
    const h = periksaBarisan(ronde, urutan);
    if (h.sah) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Barisan membentuk pola ${ronde.pola.slice(0, 3).join(", ")}, dan seterusnya.`);
      onBeres();
      return;
    }
    if (h.salah < 0) setKabar({ teks: "Tempatkan keenam sahabat di barisan dulu.", ok: false });
    else setKabar({ teks: `Tempat ke-${h.salah + 1} seharusnya ${ronde.pola[h.salah]}, tetapi ${urutan[h.salah]} ${ronde.atribut} ${sifat(urutan[h.salah]!)}. Tukar dengan sahabat lain.`, ok: false });
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
          Pola yang diminta ({ronde.atribut}): {ronde.pola.join(", ")}
        </p>
        <div className="flex flex-wrap justify-center gap-1" role="group" aria-label="Barisan">
          {urutan.map((nm, i) => (
            <button key={i} type="button" onClick={() => ketukTempat(i)} aria-label={nm ? `Tempat ke-${i + 1}: ${nm}, ketuk untuk mengambil` : `Tempat ke-${i + 1} kosong`} className={`flex w-[15%] min-w-[44px] flex-col items-center rounded-xl border-4 bg-white/85 py-1 ${nm ? "border-[#1C01A5]" : dipilih ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-dashed border-[#1C01A5]/45"}`}>
              {nm ? <SahabatSvg nama={nm} topi={topi ? sifat(nm) : undefined} kelas="h-12 w-10" /> : <span className="flex h-12 items-center text-lg font-black text-[#1C01A5]/40">{i + 1}</span>}
              <span className="text-[10px] font-black leading-tight text-[#1C01A5]">{nm ?? ""}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 rounded-2xl border-4 border-dashed border-[#8A5322]/50 bg-white/70 p-2" role="group" aria-label="Sahabat yang belum berbaris">
          {tersisa.map((s) => (
            <button key={s.nama} type="button" aria-pressed={dipilih === s.nama} aria-label={`Sahabat ${s.nama}, ${topi ? "topi" : ""} ${s.sifat}`} onClick={() => setDipilih(dipilih === s.nama ? null : s.nama)} className={`flex flex-col items-center rounded-xl border-4 bg-white px-1.5 py-1 ${dipilih === s.nama ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`}>
              <SahabatSvg nama={s.nama} topi={topi ? s.sifat : undefined} kelas="h-14 w-12" />
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{s.nama}</span>
              <span className="text-[10px] font-bold leading-tight text-[#1C01A5]/70">{topi ? `topi ${s.sifat}` : s.sifat}</span>
            </button>
          ))}
          {tersisa.length === 0 ? <span className="text-sm font-black text-[#14532D]">Semua sahabat sudah berbaris</span> : null}
        </div>
        {beres ? (
          <Berhasil>Barisan membentuk pola</Berhasil>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => { setUrutan(Array.from({ length: n }, () => null)); setDipilih(null); setKabar(null); }} className={TOMBOL_PUTIH}>
              🗑 Ulangi
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

/* ------------------------------ B5. Pola atau bukan ------------------------------ */

function alasanBukan(seq: readonly string[]): string {
  if (new Set(seq).size === 1) return "Semua bentuknya sama, tidak ada kelompok yang berganti, jadi bukan pola.";
  return "Kelompoknya tidak berulang dengan teratur, jadi bukan pola.";
}

export function PolaAtauBukan({ barisan, onBeres }: { barisan: BarisanPola[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [terjawab, setTerjawab] = useState<boolean[]>(() => barisan.map(() => false));
  const [keliru, setKeliru] = useState<{ i: number; p: boolean } | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const jawab = (i: number, centang: boolean) => {
    if (terjawab[i]) return;
    const b = barisan[i];
    const benar = adalahPola(b.seq);
    if (centang !== benar) {
      setKeliru({ i, p: centang });
      setKabar({ teks: benar ? `Barisan ${String.fromCharCode(97 + i)} sebenarnya pola. Cari kelompok yang berulang dari awal.` : `Barisan ${String.fromCharCode(97 + i)} bukan pola. ${alasanBukan(b.seq)}`, ok: false });
      return;
    }
    const baru = terjawab.slice();
    baru[i] = true;
    setTerjawab(baru);
    setKeliru(null);
    if (baru.every(Boolean)) {
      setKabar(null);
      letusan.picu();
      ucap("Semua barisan sudah kamu nilai dengan tepat. Pola harus berulang dan teratur.");
      onBeres();
    } else setKabar({ teks: benar ? `Barisan ${String.fromCharCode(97 + i)} adalah pola.` : `Barisan ${String.fromCharCode(97 + i)} bukan pola.`, ok: true });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        {barisan.map((b, i) => (
          <div key={i} className={`flex items-center gap-1.5 rounded-2xl border-4 p-1.5 ${terjawab[i] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/40 bg-white"}`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-xs font-black text-[#1C01A5]">{String.fromCharCode(97 + i)}</span>
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-0.5" role="img" aria-label={`Barisan ${String.fromCharCode(97 + i)}: ${b.seq.map((t) => NAMA_BENTUK_POLA[t]).join(", ")}`}>
              {b.seq.map((t, j) => (
                <svg key={j} viewBox="0 0 100 100" className="h-7 w-7" aria-hidden="true">
                  <BangunG id={t} />
                </svg>
              ))}
            </div>
            {terjawab[i] ? (
              <span className="shrink-0 text-xs font-black text-[#14532D]">{adalahPola(b.seq) ? "✔ Pola" : "✘ Bukan"}</span>
            ) : (
              <div className="flex shrink-0 gap-1">
                {[true, false].map((c) => (
                  <button
                    key={`${c}-${keliru?.i === i && keliru.p === c ? "x" : "o"}`}
                    type="button"
                    aria-label={`${c ? "Centang" : "Silang"} barisan ${String.fromCharCode(97 + i)}`}
                    onClick={() => jawab(i, c)}
                    className={`h-9 w-9 rounded-xl border-4 border-[#1C01A5] text-lg font-black text-[#1C01A5] ${c ? "bg-[#BBF7D0]" : "bg-[#FECACA]"} ${keliru?.i === i && keliru.p === c ? "igil-goyang" : ""}`}
                  >
                    {c ? "✔" : "✘"}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {terjawab.every(Boolean) ? <Berhasil>Semua barisan sudah dinilai dengan tepat</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B7. Warnai pola ------------------------------ */

export function WarnaiPola({ ronde, onBeres }: { ronde: RondeWarnai; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const kunci = useMemo(() => (ronde.bebas ? [] : susunPola(ronde.satuan, ronde.total)), [ronde]);
  const [warna, setWarna] = useState<(string | null)[]>(() => Array.from({ length: ronde.total }, (_, i) => (i < ronde.tampil ? kunci[i] : null)));
  const [pilih, setPilih] = useState<string>(ronde.bebas ? PALET_WARNA[0] : (ronde.satuan[0] ?? PALET_WARNA[0]));
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const palet = ronde.bebas ? PALET_WARNA.slice(0, 5) : [...new Set([...ronde.satuan, PALET_WARNA.find((w) => !ronde.satuan.includes(w)) as string])];

  const ketuk = (i: number) => {
    if (beres || i < ronde.tampil) return;
    const baru = warna.slice();
    baru[i] = baru[i] === pilih ? null : pilih;
    setWarna(baru);
    setKabar(null);
  };
  const periksa = () => {
    const h = periksaWarnai(ronde, warna);
    if (h.sah) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(ronde.bebas ? "Hebat! Polamu berulang dan teratur." : `Betul! Warnanya berlanjut sesuai pola: ${ronde.satuan.join(", ")}.`);
      onBeres();
    } else setKabar({ teks: `Belum tepat: ${h.pesan}.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className={WAKTU}>{ronde.bebas ? "Buat polamu sendiri: warnai delapan bangun" : "Warnai bangun yang kosong untuk melanjutkan pola"}</p>
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-white/90 p-2" role="group" aria-label="Barisan bangun">
          {warna.map((w, i) => (
            <button key={i} type="button" disabled={beres || i < ronde.tampil} aria-label={`Bangun ke-${i + 1}${w ? `, ${w}` : ", belum berwarna"}${i < ronde.tampil ? ", terkunci" : ""}`} onClick={() => ketuk(i)} className="h-10 w-10 rounded-lg disabled:cursor-default">
              <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
                <BangunG id={ronde.bentuk} warna={w ? HEX_WARNA[w] : "#FFFFFF"} />
              </svg>
            </button>
          ))}
        </div>
        {!beres ? (
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Pilihan warna">
            {palet.map((w) => (
              <button key={w} type="button" aria-pressed={pilih === w} aria-label={`Warna ${w}`} onClick={() => setPilih(w)} className={`flex items-center gap-1 rounded-full border-4 px-2 py-1 text-xs font-black text-[#1C01A5] ${pilih === w ? "border-[#F0AB00] bg-[#FFF7CC] ring-2 ring-[#F0AB00]" : "border-[#1C01A5] bg-white"}`}>
                <span className="inline-block h-4 w-4 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: HEX_WARNA[w] }} />
                {w}
              </button>
            ))}
          </div>
        ) : null}
        {beres ? (
          <Berhasil>{ronde.bebas ? `Polamu: ${[...warna].slice(0, 6).join(", ")}, dan seterusnya` : `Satuan pola: ${ronde.satuan.join(", ")}`}</Berhasil>
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

/* ------------------------------ B8. Isi kotak pola ------------------------------ */

export function IsiKotakPola({ ronde, onBeres }: { ronde: RondeIsi; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const penuh = useMemo(() => susunPola(ronde.satuan, ronde.panjang), [ronde]);
  const [isi, setIsi] = useState(0);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi >= ronde.kosong.length;
  const kartu = useMemo(() => {
    const dasar = [...new Set([...ronde.satuan, ronde.pengecoh])];
    return urutanTetap(dasar.length, 2, ronde.satuan.length).map((i) => dasar[i]);
  }, [ronde]);
  const huruf = ronde.satuan.every((t) => t.length === 1);

  const pilih = (t: string) => {
    if (beres) return;
    const harus = penuh[ronde.kosong[isi]];
    if (t !== harus) {
      setKeliru(t);
      setKabar({ teks: `Belum tepat. Baca kelompok yang berulang dari awal, lalu cari yang cocok untuk kotak ke-${ronde.kosong[isi] + 1}.`, ok: false });
      return;
    }
    setKeliru(null);
    const baru = isi + 1;
    setIsi(baru);
    if (baru >= ronde.kosong.length) {
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Pola lengkapnya: ${penuh.join(", ")}.`);
      onBeres();
    } else setKabar({ teks: `Betul, kotak itu berisi ${t}.`, ok: true });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-2" role="group" aria-label="Barisan pola">
          {penuh.map((t, i) => {
            const k = ronde.kosong.indexOf(i);
            const terisi = k < 0 || k < isi;
            return (
              <span key={i} aria-label={terisi ? `Kotak ${i + 1}: ${t}` : `Kotak ${i + 1} kosong`} className={`flex min-h-10 items-center justify-center rounded-lg border-4 px-1.5 font-black text-[#1C01A5] ${huruf ? "min-w-10 text-xl" : "min-w-12 text-xs"} ${terisi ? (k >= 0 ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFF7CC]") : "border-dashed border-[#1C01A5]/60 bg-white"}`}>
                {terisi ? t : "?"}
              </span>
            );
          })}
        </div>
        {beres ? (
          <Berhasil>Satuan pola: {ronde.satuan.join(", ")}</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Kartu pilihan">
            {kartu.map((t) => (
              <button key={`${t}-${keliru === t ? "x" : "o"}`} type="button" aria-label={`Kartu ${t}`} onClick={() => pilih(t)} className={`min-w-14 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === t ? "igil-goyang" : ""}`}>
                {t}
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

/* ------------------------------ B9. Cari satuan pola ------------------------------ */

export function CariSatuan({ ronde, onBeres }: { ronde: RondeCari; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const seq = useMemo(() => susunPola(ronde.satuan, ronde.panjang), [ronde]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const jawab = (i: number) => {
    const o = ronde.opsi[i];
    if (satuanCocok(ronde, o)) {
      setKeliru(null);
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Satuan polanya ${o.join(" ")}. Kelompok itu berulang dari awal sampai akhir.`);
      onBeres();
      return;
    }
    setKeliru(i);
    setKabar({ teks: `Kelompok ${o.join(" ")} bila diulang menjadi ${susunPola(o, ronde.panjang).join(" ")}. Itu belum sama dengan barisan di atas.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-white p-2" role="img" aria-label={`Barisan: ${seq.join(" ")}`}>
          {seq.map((t, i) => (
            <span key={i} className="flex h-10 w-10 items-center justify-center rounded-lg border-4 border-[#1C01A5] bg-[#FFF7CC] text-xl font-black text-[#1C01A5]">
              {t}
            </span>
          ))}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">Kelompok mana yang berulang dari awal?</p>
        {beres ? <Berhasil>Satuan pola: {ronde.satuan.join(" ")}</Berhasil> : <PilihanTeks opsi={ronde.opsi.map((o) => o.join(" "))} keliru={keliru} onPilih={jawab} />}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

