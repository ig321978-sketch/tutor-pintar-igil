"use client";

import React, { useContext, useMemo, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { Berhasil, Pencacah, PilihanAngka, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BIRU, BendaDatarSvg, BentukSvg, PotongSvg } from "./dasar-k2b3";
import {
  BENTUK,
  GABUNGAN_B,
  bendaDatar,
  cocokAturan,
  cocokTarget,
  hitungJenis,
  hitungSlot,
  jalurBentuk,
  jalurTitik,
  kalimatKeping,
  luasPoligon,
  namaSegi,
  opsiB3,
  pasDiCetakan,
  periksaKaret,
  pusatPoligon,
  sisiBenda,
  sisiSejati,
  titikBentuk,
  urutanTetap,
  uraiBangun,
  type AturanWarna,
  type BendaCetakPutar,
  type BentukWarna,
  type BangunDenganGaris,
  type IdBentuk,
  type RondeGaris,
  type RondeGunting,
  type RondeKomposit,
  type RondeRakit,
  type Ruas,
  type Titik,
} from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Permainan geometri Matematika Kelas 2 Bab 3: papan paku, menandai sisi,      */
/* mewarnai, cetak dan putar, menggunting, menyusun keping, membongkar,        */
/* menempel segitiga, menarik garis pengurai, memilih hasil susunan, dan       */
/* menghitung keping. Logika di data-k2b3.ts. Tanpa API.                       */
/* ------------------------------------------------------------------------ */

const WARNA_KEPING = ["#FCA5A5", "#93C5FD", "#86EFAC", "#FDE68A", "#C4B5FD", "#FDBA74", "#A5F3FC", "#F9A8D4"];

const NAMA_ATURAN: Record<AturanWarna, string> = { segiEmpat: "segi empat", lingkaran: "lingkaran", segiLima: "segi lima", segiBanyak: "segi banyak" };

/* ------------------------------ A2. Papan paku ------------------------------ */

const PAKU = (n: number) => 12 + n * 19;

/** Papan paku 5 x 5. Ketuk paku satu per satu untuk merentangkan karet, lalu ketuk paku pertama untuk menutup. */
export function PapanPaku({ sisiTarget, onBeres }: { sisiTarget: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [paku, setPaku] = useState<Titik[]>([]);
  const [tutup, setTutup] = useState(false);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const ketuk = (i: number, j: number) => {
    if (beres || tutup) return;
    const idx = paku.findIndex((p) => p[0] === i && p[1] === j);
    if (idx === 0) {
      if (paku.length < 3) {
        setKabar({ teks: "Rentangkan karet ke paling sedikit tiga paku dulu, baru tutup di paku pertama.", ok: false });
        return;
      }
      const h = periksaKaret(paku);
      setTutup(true);
      if (!h.sah) {
        setKabar({ teks: `${h.alasan} Tekan Ulangi, lalu coba rentangkan karet lagi tanpa bersilang.`, ok: false });
      } else if (h.sisi !== sisiTarget) {
        setKabar({ teks: `Karetmu membentuk ${namaSegi(h.sisi)} dengan ${sebut(h.sisi)} sisi. Kita butuh ${sebut(sisiTarget)} sisi. Tekan Ulangi dan coba lagi.`, ok: false });
      } else {
        setBeres(true);
        setKabar(null);
        letusan.picu();
        ucap(`Hebat! Karetmu membentuk ${namaSegi(h.sisi)}. Banyak sisinya ${sebut(h.sisi)}.`);
        onBeres();
      }
      return;
    }
    if (idx > 0) {
      setKabar({ teks: "Paku itu sudah dipakai. Ketuk paku lain, atau ketuk paku pertama untuk menutup bentuknya.", ok: false });
      return;
    }
    setKabar(null);
    setPaku([...paku, [i, j]]);
  };

  const titikSvg = paku.map(([i, j]) => [PAKU(i), PAKU(j)] as Titik);
  const sahTutup = tutup && periksaKaret(paku).sah;
  const sisiLive = tutup ? sisiSejati(paku) : Math.max(0, paku.length - 1);

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[320px] rounded-2xl bg-[#C98B47]" role="group" aria-label="Papan paku lima kali lima">
          <rect x="2" y="2" width="96" height="96" rx="8" fill="#D6A15C" stroke="#8A5322" strokeWidth="2" />
          {titikSvg.length >= 2 ? (
            <path d={`M${titikSvg.map((p) => p.join(" ")).join(" L")}${tutup ? " Z" : ""}`} fill={sahTutup ? "#FDE04788" : "none"} stroke="#E53E3E" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
          ) : null}
          {Array.from({ length: 5 }, (_, j) =>
            Array.from({ length: 5 }, (_, i) => {
              const nomor = paku.findIndex((p) => p[0] === i && p[1] === j);
              return (
                <g
                  key={`${i}-${j}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Paku kolom ${i + 1} baris ${j + 1}${nomor >= 0 ? `, paku ke-${nomor + 1}` : ""}`}
                  onClick={() => ketuk(i, j)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      ketuk(i, j);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <circle cx={PAKU(i)} cy={PAKU(j)} r="8" fill="transparent" />
                  <circle cx={PAKU(i)} cy={PAKU(j)} r="3" fill={nomor === 0 ? "#F0AB00" : nomor > 0 ? "#E53E3E" : "#6B7280"} stroke="#1F2937" strokeWidth="1" />
                  {nomor >= 0 ? (
                    <text x={PAKU(i) + 4.5} y={PAKU(j) - 3} fontSize="6" fontWeight="900" fill={BIRU}>
                      {nomor + 1}
                    </text>
                  ) : null}
                </g>
              );
            }),
          )}
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border-2 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Paku dipakai: {paku.length}</span>
          <span className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">Sisi karet: {sisiLive}</span>
        </div>
        {beres ? (
          <Berhasil>
            {namaSegi(sisiTarget)}: {sisiTarget} sisi
          </Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setPaku(paku.slice(0, -1))} disabled={paku.length === 0 || tutup} className={TOMBOL_PUTIH}>
              ↩ Urungkan paku
            </button>
            <button
              type="button"
              onClick={() => {
                setPaku([]);
                setTutup(false);
                setKabar(null);
              }}
              disabled={paku.length === 0}
              className={TOMBOL_PUTIH}
            >
              🗑 Ulangi
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A3. Cetak dan putar ------------------------------ */

/** Cetak tepi benda di kertas, putar benda di atas cetakan, lalu putuskan: lingkaran atau bukan. */
export function CetakPutar({ benda, onBeres }: { benda: BendaCetakPutar; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [dicetak, setDicetak] = useState(false);
  const [sudut, setSudut] = useState(0);
  const [putaran, setPutaran] = useState(0);
  const [beres, setBeres] = useState(false);
  const [keliru, setKeliru] = useState<boolean | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const pas = pasDiCetakan(benda, sudut);

  const jawab = (lingkaran: boolean) => {
    if (beres) return;
    if (putaran < 3) {
      setKabar({ teks: "Putar bendanya beberapa kali dulu, lalu lihat apakah selalu pas di cetakan.", ok: false });
      return;
    }
    if (lingkaran !== benda.lingkaran) {
      setKeliru(lingkaran);
      setKabar({ teks: benda.lingkaran ? "Lihat lagi. Setiap kali diputar, benda ini tetap menutup cetakannya. Coba putar sekali lagi." : "Lihat lagi. Saat diputar, benda ini kadang tidak menutup cetakannya. Coba putar sekali lagi.", ok: false });
      return;
    }
    setBeres(true);
    setKeliru(null);
    setKabar(null);
    letusan.picu();
    ucap(benda.lingkaran ? `${benda.nama} selalu pas ke arah mana pun. Itu lingkaran.` : `${benda.nama} tidak selalu pas saat diputar. Itu bukan lingkaran.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <div className="mx-auto w-full max-w-[260px] rounded-lg border-[3px] border-[#6B7280] bg-white p-2 shadow-[3px_4px_0_rgba(0,0,0,0.15)]">
          <svg viewBox="0 0 100 100" className="block h-auto w-full" role="img" aria-label={`${benda.nama} di atas kertas${dicetak ? ", cetakan tampak" : ""}`}>
            {dicetak ? <path d={jalurBentuk(benda.bentuk)} fill="none" stroke="#6B7280" strokeWidth="2.6" strokeDasharray="5 4" /> : null}
            <g style={{ transform: `rotate(${sudut}deg)`, transformOrigin: "50px 50px", transition: "transform .45s ease-in-out" }}>
              <path d={jalurBentuk(benda.bentuk)} fill={benda.warna} fillOpacity={dicetak ? 0.85 : 1} stroke={BIRU} strokeWidth="3.2" strokeLinejoin="round" />
              <circle cx="50" cy="50" r="2" fill={BIRU} />
              <path d="M50 50 V30" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <p className="text-center text-base font-black text-[#3B2410]">
          {benda.nama} • putaran: {putaran}
        </p>
        {dicetak ? (
          <p className={`mx-auto w-fit rounded-full border-4 px-4 py-0.5 text-center text-base font-black ${pas ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"}`}>{pas ? "✔ Pas di cetakan" : "✘ Tidak pas"}</p>
        ) : null}
        {!dicetak ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setDicetak(true);
                setKabar(null);
                ucap(`Tepi ${benda.nama.toLowerCase()} sudah tercetak di kertas. Sekarang putar bendanya.`);
              }}
              className={TOMBOL_BESAR}
            >
              🖨️ Cetak tepinya
            </button>
          </div>
        ) : beres ? (
          <Berhasil>{benda.lingkaran ? "Selalu pas: lingkaran" : "Tidak selalu pas: bukan lingkaran"}</Berhasil>
        ) : (
          <>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setSudut((s) => s + 45);
                  setPutaran((n) => n + 1);
                  setKabar(null);
                }}
                className={TOMBOL_BESAR}
              >
                ↻ Putar sedikit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map((lingkaran) => (
                <button
                  key={`${lingkaran}-${keliru === lingkaran ? "x" : "o"}`}
                  type="button"
                  aria-label={lingkaran ? "Lingkaran" : "Bukan lingkaran"}
                  onClick={() => jawab(lingkaran)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2.5 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === lingkaran ? "igil-goyang" : ""}`}
                >
                  {lingkaran ? "⭕ Lingkaran" : "🚫 Bukan lingkaran"}
                </button>
              ))}
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A4. Cari bentuk di sekitar ------------------------------ */

/** Ketuk semua benda yang sisinya sebanyak yang diminta. Benda yang salah memberi petunjuk. */
export function CariBenda({ sisi, benda, onBeres }: { sisi: number; benda: string[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const sasaran = benda.filter((b) => sisiBenda(b) === sisi);
  const [ketemu, setKetemu] = useState<string[]>([]);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = ketemu.length === sasaran.length;

  const ketuk = (id: string) => {
    if (ketemu.includes(id) || beres) return;
    const b = bendaDatar(id);
    const n = sisiBenda(id);
    if (n === sisi) {
      const baru = [...ketemu, id];
      setKetemu(baru);
      setGoyang(null);
      if (baru.length === sasaran.length) {
        setKabar(null);
        letusan.picu();
        ucap(`Semua ketemu! ${sasaran.map((s) => bendaDatar(s).nama).join(", ")} punya ${sebut(sisi)} sisi.`);
        onBeres();
      } else {
        setKabar({ teks: `${b.nama} punya ${sebut(sisi)} sisi. Tepat.`, ok: true });
      }
      return;
    }
    setGoyang(id);
    setKabar({ teks: n === 0 ? `${b.nama} tepinya melengkung dan tidak punya sisi lurus. Cari benda yang punya ${sebut(sisi)} sisi.` : `${b.nama} punya ${sebut(n)} sisi, bukan ${sebut(sisi)}. Hitung sisinya lagi.`, ok: false });
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-lg font-black text-[#3B2410]">
          🔎 Cari benda dengan {sisi} sisi ({ketemu.length} dari {sasaran.length})
        </p>
        <div className="grid grid-cols-4 gap-2">
          {benda.map((id) => {
            const sudah = ketemu.includes(id);
            return (
              <button
                key={`${id}-${goyang === id ? "x" : "o"}`}
                type="button"
                aria-label={`${bendaDatar(id).nama}${sudah ? ", sudah ketemu" : ""}`}
                onClick={() => ketuk(id)}
                className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 px-0.5 py-1.5 ${sudah ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#8A5322] bg-white/85"} ${goyang === id ? "igil-goyang" : ""}`}
              >
                <BendaDatarSvg id={id} kelas="h-14 w-14" />
                <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{sudah ? "✔ " : ""}{bendaDatar(id).nama}</span>
              </button>
            );
          })}
        </div>
        {beres ? <Berhasil>Semua benda dengan {sisi} sisi sudah ketemu</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A5. Tandai setiap sisi ------------------------------ */

/** Ketuk tiap sisi satu kali. Sisi berwarna dan bernomor. Lalu pilih banyak sisi dan nama bentuk. */
export function TandaiSisi({ bentuk, onBeres }: { bentuk: IdBentuk; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const titik = titikBentuk(bentuk);
  const n = titik.length;
  const [tanda, setTanda] = useState<number[]>([]);
  const [tahap, setTahap] = useState<"tandai" | "angka" | "nama" | "selesai">("tandai");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const namaOpsi = useMemo(() => {
    const dasar = [namaSegi(n), namaSegi(n + 1), namaSegi(Math.max(3, n - 1))];
    const g = (n + 1) % 3;
    return [...dasar.slice(g), ...dasar.slice(0, g)];
  }, [n]);

  const ketukSisi = (i: number) => {
    if (tahap !== "tandai") return;
    if (tanda.includes(i)) {
      setKabar({ teks: "Sisi itu sudah ditandai. Cari sisi yang belum berwarna.", ok: false });
      return;
    }
    const baru = [...tanda, i];
    setTanda(baru);
    setKabar(null);
    ucap(sebut(baru.length));
    if (baru.length === n) setTahap("angka");
  };

  const jawabAngka = (x: number) => {
    if (x !== n) {
      setKeliru(x);
      setKabar({ teks: `Hitung angka pada sisi yang terakhir ditandai. Banyak sisinya ${sebut(n)}.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("nama");
    ucap(`Ada ${sebut(n)} sisi. Sekarang pilih namanya.`);
  };
  const jawabNama = (i: number) => {
    if (namaOpsi[i] !== namaSegi(n)) {
      setKeliru(i);
      setKabar({ teks: `Namanya mengikuti banyak sisi. ${Kapital(sebut(n))} sisi berarti ${namaSegi(n)}.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`Betul! ${Kapital(sebut(n))} sisi, namanya ${namaSegi(n)}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[260px]" role="group" aria-label={`Bentuk dengan ${n} sisi. Ketuk tiap sisi.`}>
          <path d={jalurTitik(titik)} fill="#FEF9C3" />
          {titik.map((p, i) => {
            const q = titik[(i + 1) % n];
            const nomor = tanda.indexOf(i);
            const mx = (p[0] + q[0]) / 2;
            const my = (p[1] + q[1]) / 2;
            const cx = titik.reduce((s, t) => s + t[0], 0) / n;
            const cy = titik.reduce((s, t) => s + t[1], 0) / n;
            const arah = Math.hypot(mx - cx, my - cy) || 1;
            const bx = mx + ((mx - cx) / arah) * 8;
            const by = my + ((my - cy) / arah) * 8;
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`Sisi ${i + 1}${nomor >= 0 ? `, ditandai nomor ${nomor + 1}` : ""}`}
                onClick={() => ketukSisi(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketukSisi(i);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="transparent" strokeWidth="14" strokeLinecap="round" />
                <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={nomor >= 0 ? WARNA_KEPING[nomor % WARNA_KEPING.length].replace(/^#/, "#") : BIRU} strokeWidth={nomor >= 0 ? 6 : 3} strokeLinecap="round" style={nomor >= 0 ? { filter: "saturate(2.2) brightness(0.8)" } : undefined} />
                {nomor >= 0 ? (
                  <g>
                    <circle cx={bx} cy={by} r="6" fill="#FFE566" stroke={BIRU} strokeWidth="1.8" />
                    <text x={bx} y={by + 3} textAnchor="middle" fontSize="8" fontWeight="900" fill={BIRU}>
                      {nomor + 1}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
        <p className="text-center text-base font-black text-[#1C01A5]">Sisi yang sudah ditandai: {tanda.length}</p>
        {tahap === "angka" ? (
          <div className="space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Ada berapa sisinya?</p>
            <PilihanAngka opsi={opsiB3(n, [3, 8])} keliru={keliru} onPilih={jawabAngka} />
          </div>
        ) : null}
        {tahap === "nama" ? (
          <div className="space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Apa namanya?</p>
            <PilihanTeks opsi={namaOpsi.map(Kapital)} keliru={keliru} onPilih={jawabNama} />
          </div>
        ) : null}
        {tahap === "selesai" ? (
          <Berhasil>
            {n} sisi: {namaSegi(n)}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------ A7. Warnai bentuk ------------------------------ */

/** Ketuk bentuk untuk mewarnai, ketuk lagi untuk menghapus warna. Tekan Periksa. */
export function WarnaiBentuk({ aturan, warna, namaWarna, bentuk, onBeres }: { aturan: AturanWarna; warna: string; namaWarna: string; bentuk: BentukWarna[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [diwarnai, setDiwarnai] = useState<boolean[]>(() => bentuk.map(() => false));
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const nama = NAMA_ATURAN[aturan];

  const periksa = () => {
    const salah = bentuk.findIndex((b, i) => diwarnai[i] && !cocokAturan(b, aturan));
    if (salah >= 0) {
      const b = bentuk[salah];
      const pesan =
        aturan === "lingkaran" && b.id === "oval"
          ? "Bentuk lonjong bukan lingkaran. Lingkaran selalu pas bila diputar, bentuk lonjong tidak."
          : aturan === "segiBanyak" && BENTUK[b.id].golongan === "lengkung"
            ? `${Kapital(BENTUK[b.id].nama)} tepinya melengkung, jadi bukan segi banyak. Hapus warnanya.`
            : `${Kapital(BENTUK[b.id].nama)} bukan ${nama}. Hitung sisinya lagi, lalu hapus warnanya.`;
      setKabar({ teks: pesan, ok: false });
      return;
    }
    const kurang = bentuk.some((b, i) => !diwarnai[i] && cocokAturan(b, aturan));
    if (kurang) {
      setKabar({ teks: `Masih ada ${nama} yang belum diwarnai. Periksa semua bentuk lagi.`, ok: false });
      return;
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! Semua ${nama} sudah berwarna ${namaWarna}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="grid grid-cols-4 gap-2">
          {bentuk.map((b, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${BENTUK[b.id].nama}${diwarnai[i] ? `, berwarna ${namaWarna}` : ", belum berwarna"}`}
              aria-pressed={diwarnai[i]}
              disabled={beres}
              onClick={() => {
                const baru = diwarnai.slice();
                baru[i] = !baru[i];
                setDiwarnai(baru);
                setKabar(null);
              }}
              className="flex aspect-square items-center justify-center rounded-2xl border-4 border-[#1C01A5]/50 bg-white"
            >
              <BentukSvg id={b.id} kelas="h-14 w-14" warna={diwarnai[i] ? warna : "#FFFFFF"} putar={b.putar} skala={b.skala} />
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>
            Semua {nama} berwarna {namaWarna}
          </Berhasil>
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

/* ------------------------------ B1. Gunting kertas ------------------------------ */

/** Pusat massa sederhana. */
const pusat = (t: readonly Titik[]) => pusatPoligon(t);

/** Gambar keping hasil uraian, terpisah sedikit dari pusat bangun supaya celah guntingan tampak. */
function KepingTerurai({ titik, keping, urai = 0.1, label = true }: { titik: readonly Titik[]; keping: { simpul: number[]; sisi: number }[]; urai?: number; label?: boolean }) {
  const [gx, gy] = pusat(titik);
  return (
    <>
      {keping.map((k, i) => {
        const pts = k.simpul.map((s) => titik[s]);
        const [cx, cy] = pusat(pts);
        const dx = keping.length > 1 ? (cx - gx) * urai : 0;
        const dy = keping.length > 1 ? (cy - gy) * urai : 0;
        return (
          <g key={i} style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform .4s ease-out" }}>
            <path d={jalurTitik(pts)} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
            {label && keping.length > 1 ? (
              <text x={cx} y={cy + 2.5} textAnchor="middle" fontSize="6" fontWeight="900" fill={BIRU} stroke="#FFFFFF" strokeWidth="2.2" paintOrder="stroke" strokeLinejoin="round">
                {k.sisi === 3 ? "segitiga" : k.sisi === 4 ? "segi empat" : `${k.sisi} sisi`}
              </text>
            ) : null}
          </g>
        );
      })}
    </>
  );
}

/** Tunjukkan garis putus-putus yang bisa digunting. Ketuk garis (atau tombolnya) untuk menggunting atau menyatukan lagi. */
export function Gunting({ ronde, onBeres }: { ronde: RondeGunting; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const hasil = useMemo(
    () =>
      uraiBangun(
        ronde.titik,
        ronde.batas,
        dipilih.map((i) => ronde.garis[i].ruas),
      ),
    [ronde, dipilih],
  );
  const hitung = hitungJenis(hasil.keping);

  const ketuk = (i: number) => {
    if (beres) return;
    const baru = dipilih.includes(i) ? dipilih.filter((x) => x !== i) : [...dipilih, i];
    const u = uraiBangun(
      ronde.titik,
      ronde.batas,
      baru.map((x) => ronde.garis[x].ruas),
    );
    if (!u.sah) {
      setKabar({ teks: `${u.alasan} Dua guntingan itu tidak boleh dipakai bersamaan.`, ok: false });
      return;
    }
    setDipilih(baru);
    setKabar(null);
    if (baru.length > 0 && cocokTarget(hitungJenis(u.keping), ronde.target)) {
      setBeres(true);
      letusan.picu();
      ucap(`Berhasil! ${ronde.nama} diurai menjadi ${ronde.teksTarget}.`);
      onBeres();
    }
  };
  const batas = ronde.titik.slice(0, ronde.batas);

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-lg font-black text-[#3B2410]">Target: {ronde.teksTarget}</p>
        <svg viewBox="-4 -4 108 108" className="mx-auto block h-auto w-full max-w-[300px] rounded-2xl bg-[#F8FAFC]" role="group" aria-label={`${ronde.nama} dari kertas`}>
          <KepingTerurai titik={ronde.titik} keping={hasil.keping} />
          {ronde.garis.map((g, i) =>
            dipilih.includes(i) ? null : (
              <g key={i} role="button" tabIndex={0} aria-label={`Gunting ${g.nama}`} onClick={() => ketuk(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk(i))} style={{ cursor: "pointer" }}>
                <line x1={ronde.titik[g.ruas[0]][0]} y1={ronde.titik[g.ruas[0]][1]} x2={ronde.titik[g.ruas[1]][0]} y2={ronde.titik[g.ruas[1]][1]} stroke="transparent" strokeWidth="12" />
                <line x1={ronde.titik[g.ruas[0]][0]} y1={ronde.titik[g.ruas[0]][1]} x2={ronde.titik[g.ruas[1]][0]} y2={ronde.titik[g.ruas[1]][1]} stroke="#475569" strokeWidth="1.8" strokeDasharray="4 3" />
                <text x={ronde.titik[g.ruas[0]][0] + (ronde.titik[g.ruas[1]][0] - ronde.titik[g.ruas[0]][0]) * 0.2} y={ronde.titik[g.ruas[0]][1] + (ronde.titik[g.ruas[1]][1] - ronde.titik[g.ruas[0]][1]) * 0.2 + 3} fontSize="9" textAnchor="middle" aria-hidden="true">
                  ✂
                </text>
              </g>
            ),
          )}
          <path d={jalurTitik(batas)} fill="none" stroke={BIRU} strokeWidth="1.2" strokeDasharray="1 3" opacity={dipilih.length === 0 ? 0.6 : 0} />
        </svg>
        <p className="text-center text-base font-black text-[#3B2410]">Keping sekarang: {kalimatKeping(hitung)}</p>
        <div className="grid gap-1.5">
          {ronde.garis.map((g, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={dipilih.includes(i)}
              disabled={beres}
              onClick={() => ketuk(i)}
              className={`rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] ${dipilih.includes(i) ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}
            >
              {dipilih.includes(i) ? "✂ Sudah digunting:" : "✂ Gunting:"} {g.nama}
            </button>
          ))}
        </div>
        {beres ? <Berhasil>{ronde.nama} menjadi {ronde.teksTarget}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B2. Susun keping di papan ------------------------------ */

/** Seret keping dari nampan ke bayangan yang sejenis, atau ketuk keping lalu ketuk bayangannya. */
export function SusunKeping({ ronde, onBeres }: { ronde: RondeRakit; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = ronde.slot.length;
  const [terpasang, setTerpasang] = useState<Record<number, number>>({});
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = useMemo(() => urutanTetap(n, 2, 1), [n]);
  const dipakai = Object.values(terpasang);
  const beres = Object.keys(terpasang).length === n;

  const coba = (p: number, s: number) => {
    if (terpasang[s] !== undefined || dipakai.includes(p)) return;
    const k = ronde.slot[p];
    const t = ronde.slot[s];
    if (k.jenis !== t.jenis) {
      setGoyang(s);
      const a = sisiSejati(k.titik);
      const b = sisiSejati(t.titik);
      setKabar({ teks: a !== b ? `Keping ini punya ${sebut(a)} sisi, tempat itu punya ${sebut(b)} sisi. Cari tempat yang bentuknya sama.` : "Bentuknya sama-sama begitu, tetapi ukurannya berbeda. Coba tempat yang lain.", ok: false });
      return;
    }
    const baru = { ...terpasang, [s]: p };
    setTerpasang(baru);
    setDipilih(null);
    setGoyang(null);
    if (Object.keys(baru).length === n) {
      setKabar(null);
      letusan.picu();
      ucap(`Berhasil! Keping-kepingmu membentuk ${ronde.siluet}.`);
      onBeres();
    } else {
      setKabar({ teks: `Keping ${t.nama} sudah pas.`, ok: true });
    }
  };
  const lepas = (id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z?.startsWith("slot:")) coba(Number(id.replace("keping-", "")), Number(z.slice(5)));
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-lg font-black text-[#3B2410]">Susun menjadi: {ronde.siluet}</p>
        <svg viewBox="0 0 100 100" className="mx-auto block h-auto w-full max-w-[280px] rounded-2xl bg-[#E2E8F0]" role="group" aria-label={`Papan bayangan ${ronde.nama}`}>
          {ronde.slot.map((s, i) => {
            const p = terpasang[i];
            return (
              <g
                key={`${i}-${goyang === i ? "x" : "o"}`}
                data-zona={`slot:${i}`}
                role="button"
                tabIndex={0}
                aria-label={p !== undefined ? `Tempat ${s.nama}, terisi` : `Tempat ${s.nama}, kosong`}
                onClick={() => dipilih !== null && coba(dipilih, i)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && dipilih !== null) {
                    e.preventDefault();
                    coba(dipilih, i);
                  }
                }}
                className={goyang === i ? "igil-goyang" : undefined}
                style={{ cursor: dipilih !== null ? "pointer" : "default" }}
              >
                <path d={jalurTitik(s.titik)} fill={p !== undefined ? ronde.warna[p] : "#94A3B8"} fillOpacity={p !== undefined ? 1 : 0.55} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" strokeDasharray={p !== undefined ? undefined : "4 3"} />
              </g>
            );
          })}
        </svg>
        <div className="flex min-h-[84px] flex-wrap items-center justify-center gap-3 rounded-3xl border-4 border-dashed border-[#8A5322]/50 bg-white/60 px-2 py-2" role="group" aria-label="Nampan keping">
          {urut
            .filter((p) => !dipakai.includes(p))
            .map((p) => (
              <BendaSeret key={p} id={`keping-${p}`} label={`Keping ${ronde.slot[p].nama}`} onKetuk={() => setDipilih(dipilih === p ? null : p)} onLepas={lepas} kelas={`rounded-xl p-1 ${dipilih === p ? "ring-4 ring-[#F0AB00]" : ""}`}>
                <PotongSvg titik={ronde.slot[p].titik} warna={ronde.warna[p]} kelas="h-16 w-16" label={`Keping ${ronde.slot[p].nama}`} />
              </BendaSeret>
            ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua keping sudah terpasang</span> : null}
        </div>
        {beres ? <Berhasil>Jadi {ronde.siluet}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B3. Bongkar bangunan mainan ------------------------------ */

/** Ketuk tiap keping supaya terlepas, lalu hitung banyak segitiga dan segi empat. */
export function Bongkar({ ronde, onBeres }: { ronde: RondeRakit; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const kunci = hitungSlot(ronde);
  const [lepas, setLepas] = useState<boolean[]>(() => ronde.slot.map(() => false));
  const [segitiga, setSegitiga] = useState(0);
  const [segiEmpat, setSegiEmpat] = useState(0);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const semua = lepas.every(Boolean);
  const [gx, gy] = pusat(ronde.slot.flatMap((s) => s.titik));

  const periksa = () => {
    if (segitiga !== kunci.segitiga) {
      setKabar({ teks: "Hitung lagi keping yang punya tiga sisi. Itu segitiga.", ok: false });
      return;
    }
    if (segiEmpat !== kunci.segiEmpat) {
      setKabar({ teks: "Hitung lagi keping yang punya empat sisi. Itu segi empat.", ok: false });
      return;
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! ${ronde.siluet} terdiri dari ${kalimatKeping(kunci)}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-lg font-black text-[#3B2410]">Ketuk tiap keping {ronde.siluet}</p>
        <svg viewBox="-12 -12 124 124" className="mx-auto block h-auto w-full max-w-[300px] rounded-2xl bg-[#F8FAFC]" role="group" aria-label={`Bangunan ${ronde.siluet}`}>
          {ronde.slot.map((s, i) => {
            const [cx, cy] = pusat(s.titik);
            const dx = lepas[i] ? (cx - gx) * 0.45 : 0;
            const dy = lepas[i] ? (cy - gy) * 0.45 : 0;
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`Keping ${s.nama}${lepas[i] ? ", sudah terlepas" : ""}`}
                onClick={() => {
                  if (lepas[i]) return;
                  const baru = lepas.slice();
                  baru[i] = true;
                  setLepas(baru);
                  ucap(sisiSejati(s.titik) === 3 ? "Satu segitiga." : "Satu segi empat.");
                }}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !lepas[i]) {
                    e.preventDefault();
                    const baru = lepas.slice();
                    baru[i] = true;
                    setLepas(baru);
                  }
                }}
                style={{ transform: `translate(${dx}px, ${dy}px)`, transition: "transform .5s ease-out", cursor: lepas[i] ? "default" : "pointer" }}
              >
                <path d={jalurTitik(s.titik)} fill={ronde.warna[i]} stroke={BIRU} strokeWidth="2.2" strokeLinejoin="round" />
                {lepas[i] ? (
                  <text x={cx} y={cy + 3} textAnchor="middle" fontSize="7" fontWeight="900" fill={BIRU}>
                    {sisiSejati(s.titik) === 3 ? "segitiga" : "segi empat"}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        {!semua ? <p className="text-center text-base font-black text-[#3B2410]">Terlepas: {lepas.filter(Boolean).length} dari {lepas.length}</p> : null}
        {semua && !beres ? (
          <div className="space-y-2 rounded-2xl bg-white/80 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Ada berapa segitiga?</p>
            <Pencacah nilai={segitiga} min={0} max={6} onUbah={setSegitiga} label="segitiga" />
            <p className="text-center text-base font-black text-[#1C01A5]">Ada berapa segi empat?</p>
            <Pencacah nilai={segiEmpat} min={0} max={6} onUbah={setSegiEmpat} label="segi empat" />
            <div className="flex justify-center">
              <button type="button" onClick={periksa} className={TOMBOL_BESAR}>
                ✅ Periksa
              </button>
            </div>
          </div>
        ) : null}
        {beres ? <Berhasil>{kalimatKeping(kunci)}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ B4. Dua segitiga, tiga bentuk ------------------------------ */

const SEGITIGA_DASAR: Titik[] = [[0, 0], [40, 0], [0, 40]];

/** Tempelkan dua segitiga siku-siku yang sama dengan tiga cara dan namai tiap hasilnya. */
export function DuaSegitiga({ onBeres }: { onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [lihat, setLihat] = useState<number | null>(null);
  const [ditemukan, setDitemukan] = useState<boolean[]>(() => GABUNGAN_B.map(() => false));
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const g = lihat !== null ? GABUNGAN_B[lihat] : null;
  const semua = ditemukan.every(Boolean);
  const urut = useMemo(() => (lihat === null ? [0, 1, 2] : [0, 1, 2].map((i) => (i + lihat + 1) % 3)), [lihat]);

  const jawab = (i: number) => {
    if (!g || lihat === null) return;
    if (i !== g.jawab) {
      setKeliru(i);
      setKabar({ teks: g.jawab === 0 ? "Lihat sisi-sisinya. Semua sisinya sama panjang dan ada empat pojok siku-siku." : g.jawab === 1 ? "Bentuk luarnya hanya punya tiga pojok. Itu segitiga yang lebih besar." : "Bentuknya punya empat pojok, tetapi sisinya miring. Itu segi empat miring.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    const baru = ditemukan.slice();
    baru[lihat] = true;
    setDitemukan(baru);
    if (baru.every(Boolean)) {
      letusan.picu();
      ucap("Hebat! Dua segitiga yang sama bisa menjadi persegi, segitiga yang lebih besar, atau segi empat miring.");
      onBeres();
    } else {
      setKabar({ teks: `Dua segitiga ditempel menjadi ${g.nama}.`, ok: true });
    }
  };

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <svg viewBox="-20 -50 80 100" className="mx-auto block h-44 w-full rounded-2xl bg-[#F8FAFC]" role="img" aria-label="Dua segitiga siku-siku yang sama">
          {g ? <path d={jalurTitik(g.luar)} fill="none" stroke={EMAS_TUA} strokeWidth="1.4" strokeDasharray="3 2" /> : null}
          <path d={jalurTitik(SEGITIGA_DASAR)} fill="#F9A8D4" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" />
          {g ? <path key={g.id} d={jalurTitik(g.keping2)} fill="#93C5FD" stroke={BIRU} strokeWidth="1.6" strokeLinejoin="round" className="igil-muncul" /> : null}
        </svg>
        <div className="grid gap-1.5">
          {GABUNGAN_B.map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={lihat === i}
              onClick={() => {
                setLihat(i);
                setKeliru(null);
                setKabar(null);
                ucap(x.petunjuk);
              }}
              className={`rounded-2xl border-4 px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] ${ditemukan[i] ? "border-[#16A34A] bg-[#DCFCE7]" : lihat === i ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"}`}
            >
              {ditemukan[i] ? `✔ ${Kapital(x.nama)}` : `🔗 ${x.tombol}`}
            </button>
          ))}
        </div>
        {g && !ditemukan[lihat!] ? (
          <div className="space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Bentuk apa yang terjadi?</p>
            <PilihanTeks opsi={urut.map((k) => Kapital(g.opsi[k]))} keliru={keliru === null ? null : urut.indexOf(keliru)} onPilih={(j) => jawab(urut[j])} />
          </div>
        ) : null}
        <p className="text-center text-base font-black text-[#3B2410]">Bentuk ditemukan: {ditemukan.filter(Boolean).length} dari {ditemukan.length}</p>
        {semua ? <Berhasil>Dua segitiga yang sama, tiga bentuk berbeda</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

const EMAS_TUA = "#F0AB00";

/* ------------------------------ B5. Garis pengurai ------------------------------ */

/** Ketuk dua titik untuk menarik garis. Garis yang bersilangan ditolak. Layar menghitung keping hasil. */
export function GarisPengurai({ ronde, onBeres }: { ronde: RondeGaris; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [garis, setGaris] = useState<Ruas[]>([]);
  const [awal, setAwal] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const hasil = useMemo(() => uraiBangun(ronde.titik, ronde.batas, garis), [ronde, garis]);
  const hitung = hitungJenis(hasil.keping);

  const ketuk = (i: number) => {
    if (beres) return;
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
    const adaIdx = garis.findIndex((g) => g[0] === a && g[1] === b);
    if (adaIdx >= 0) {
      setGaris(garis.filter((_, k) => k !== adaIdx));
      setKabar(null);
      return;
    }
    if (b < ronde.batas && (b - a === 1 || (a === 0 && b === ronde.batas - 1))) {
      setKabar({ teks: "Itu sudah sisi bangun. Pilih dua titik yang tidak bersebelahan.", ok: false });
      return;
    }
    const u = uraiBangun(ronde.titik, ronde.batas, [...garis, [a, b]]);
    if (!u.sah) {
      setKabar({ teks: `${u.alasan} Garis itu tidak dipasang.`, ok: false });
      return;
    }
    setGaris([...garis, [a, b]]);
    setKabar(null);
  };

  const periksa = () => {
    if (cocokTarget(hitung, ronde.target)) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! ${ronde.nama} terurai menjadi ${ronde.teksTarget}.`);
      onBeres();
      return;
    }
    setKabar({ teks: `Sekarang hasilnya ${kalimatKeping(hitung)}. Kita butuh ${ronde.teksTarget}. Tambah, hapus, atau ubah garisnya.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-lg font-black text-[#1C01A5]">Target: {ronde.teksTarget}</p>
        <svg viewBox="-6 -6 112 112" className="mx-auto block h-auto w-full max-w-[300px]" role="group" aria-label={`${ronde.nama} dengan titik-titik`}>
          <KepingTerurai titik={ronde.titik} keping={hasil.keping} urai={0} label={false} />
          {garis.map((g) => (
            <line key={`${g[0]}-${g[1]}`} x1={ronde.titik[g[0]][0]} y1={ronde.titik[g[0]][1]} x2={ronde.titik[g[1]][0]} y2={ronde.titik[g[1]][1]} stroke="#1C01A5" strokeWidth="2.6" strokeLinecap="round" />
          ))}
          {ronde.titik.map((p, i) => (
            <g key={i} role="button" tabIndex={0} aria-label={`Titik ${i + 1}${awal === i ? ", terpilih" : ""}`} onClick={() => ketuk(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk(i))} style={{ cursor: "pointer" }}>
              <circle cx={p[0]} cy={p[1]} r="8" fill="transparent" />
              <circle cx={p[0]} cy={p[1]} r={awal === i ? 4.6 : 3.2} fill={awal === i ? "#F0AB00" : "#FFFFFF"} stroke={BIRU} strokeWidth="2" />
            </g>
          ))}
        </svg>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Garis: {garis.length} • Hasil: {kalimatKeping(hitung)}
        </p>
        {beres ? (
          <Berhasil>{ronde.teksTarget}</Berhasil>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={() => setGaris(garis.slice(0, -1))} disabled={garis.length === 0} className={TOMBOL_PUTIH}>
              ↩ Hapus garis
            </button>
            <button
              type="button"
              onClick={() => {
                setGaris([]);
                setAwal(null);
                setKabar(null);
              }}
              disabled={garis.length === 0}
              className={TOMBOL_PUTIH}
            >
              🗑 Ulangi
            </button>
            <button type="button" onClick={periksa} disabled={garis.length === 0} className={TOMBOL_BESAR}>
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

/* ------------------------------ B6. Hasil susunan yang mungkin ------------------------------ */

/** Pusatkan keping di kotak 100 dengan skala bersama supaya ukuran antarbentuk bisa dibandingkan. */
function pusatkan(titik: readonly Titik[], skala: number): Titik[] {
  const xs = titik.map((p) => p[0]);
  const ys = titik.map((p) => p[1]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  return titik.map(([x, y]) => [50 + (x - cx) * skala, 50 + (y - cy) * skala] as Titik);
}

/** Pilih semua bentuk yang bisa disusun dari keping yang diberikan. */
export function HasilSusunan({ ronde, onBeres }: { ronde: RondeKomposit; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<boolean[]>(() => ronde.opsi.map(() => false));
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const semuaTitik = [...ronde.keping.map((k) => k.titik), ...ronde.opsi.map((o) => o.titik)];
  const ukuranMaks = Math.max(
    ...semuaTitik.map((t) => {
      const xs = t.map((p) => p[0]);
      const ys = t.map((p) => p[1]);
      return Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
    }),
  );
  const skala = 76 / ukuranMaks;
  const total = ronde.keping.reduce((s, k) => s + luasPoligon(k.titik), 0);

  const periksa = () => {
    const keliru = ronde.opsi.findIndex((o, i) => dipilih[i] && !o.bisa);
    const terlewat = ronde.opsi.findIndex((o, i) => !dipilih[i] && o.bisa);
    if (keliru < 0 && terlewat < 0) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap("Betul! Kamu memilih semua bentuk yang bisa disusun, dan tidak memilih yang tidak bisa.");
      onBeres();
      return;
    }
    if (keliru >= 0) {
      const o = ronde.opsi[keliru];
      const luas = luasPoligon(o.titik);
      setKabar({ teks: luas > total ? `Bentuk ${o.nama} terlalu besar. Semua keping digabung tidak cukup untuk menutupinya.` : `Bentuk ${o.nama} terlalu kecil untuk memuat semua keping.`, ok: false });
    } else {
      const o = ronde.opsi[terlewat];
      setKabar({ teks: `Bentuk ${o.nama} sebenarnya bisa disusun dari keping-keping itu. Coba geser kepingnya di dalam pikiranmu.`, ok: false });
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-base font-black text-[#1C01A5]">Keping: {ronde.judul}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5]/40 bg-white px-2 py-2">
          {ronde.keping.map((k, i) => (
            <svg key={i} viewBox="0 0 100 100" className="h-16 w-16" role="img" aria-label={`Keping ${k.nama}`}>
              <path d={jalurTitik(pusatkan(k.titik, skala))} fill={WARNA_KEPING[i % WARNA_KEPING.length]} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
            </svg>
          ))}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">Pilih semua bentuk yang bisa disusun dari keping itu.</p>
        <div className="grid grid-cols-2 gap-2">
          {ronde.opsi.map((o, i) => (
            <button
              key={o.nama}
              type="button"
              aria-pressed={dipilih[i]}
              aria-label={`Bentuk ${o.nama}${dipilih[i] ? ", dipilih" : ""}`}
              disabled={beres}
              onClick={() => {
                const baru = dipilih.slice();
                baru[i] = !baru[i];
                setDipilih(baru);
                setKabar(null);
              }}
              className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 px-1 py-1.5 ${dipilih[i] ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}
            >
              <svg viewBox="0 0 100 100" className="h-20 w-20" aria-hidden="true">
                <path d={jalurTitik(pusatkan(o.titik, skala))} fill={dipilih[i] ? "#86EFAC" : "#E0E7FF"} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
              </svg>
              <span className="text-xs font-black text-[#1C01A5]">
                {dipilih[i] ? "✔ " : ""}
                {o.nama}
              </span>
            </button>
          ))}
        </div>
        {beres ? (
          <Berhasil>Bentuk yang bisa disusun sudah tepat</Berhasil>
        ) : (
          <div className="flex justify-center">
            <button type="button" onClick={periksa} disabled={!dipilih.some(Boolean)} className={TOMBOL_BESAR}>
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

/* ------------------------------ B7. Hitung keping ------------------------------ */

/** Hitung banyak segitiga dan segi empat pada bangun yang sudah diurai. */
export function HitungKeping({ ronde, onBeres }: { ronde: BangunDenganGaris; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const hasil = useMemo(() => uraiBangun(ronde.titik, ronde.batas, ronde.ruas), [ronde]);
  const [segitiga, setSegitiga] = useState(0);
  const [segiEmpat, setSegiEmpat] = useState(0);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const kunci = hitungJenis(hasil.keping);

  const periksa = () => {
    if (segitiga !== kunci.segitiga) {
      setKabar({ teks: "Hitung lagi bagian yang punya tiga sisi. Itu segitiga. Beri tanda pada tiap bagian yang kamu hitung.", ok: false });
      return;
    }
    if (segiEmpat !== kunci.segiEmpat) {
      setKabar({ teks: "Hitung lagi bagian yang punya empat sisi. Itu segi empat.", ok: false });
      return;
    }
    setBeres(true);
    setKabar(null);
    letusan.picu();
    ucap(`Betul! ${ronde.nama} terurai menjadi ${kalimatKeping(kunci)}.`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <svg viewBox="-6 -6 112 112" className="mx-auto block h-auto w-full max-w-[280px]" role="img" aria-label={`${ronde.nama} dengan garis pengurai`}>
          <KepingTerurai titik={ronde.titik} keping={hasil.keping} urai={0} label={false} />
          {ronde.ruas.map((g) => (
            <line key={`${g[0]}-${g[1]}`} x1={ronde.titik[g[0]][0]} y1={ronde.titik[g[0]][1]} x2={ronde.titik[g[1]][0]} y2={ronde.titik[g[1]][1]} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
          ))}
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">{ronde.nama} diurai oleh garis tebal</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <p className="text-center text-sm font-black text-[#1C01A5]">Segitiga</p>
            <Pencacah nilai={segitiga} min={0} max={8} onUbah={setSegitiga} label="segitiga" mati={beres} />
          </div>
          <div className="space-y-1">
            <p className="text-center text-sm font-black text-[#1C01A5]">Segi empat</p>
            <Pencacah nilai={segiEmpat} min={0} max={8} onUbah={setSegiEmpat} label="segi empat" mati={beres} />
          </div>
        </div>
        {beres ? (
          <Berhasil>{kalimatKeping(kunci)}</Berhasil>
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
