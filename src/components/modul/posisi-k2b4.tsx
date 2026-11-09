"use client";

import React, { useContext, useMemo, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, zonaDi } from "./tahap-b-gaya";
import { Berhasil, PilihanTeks, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { BIRU, BangunSvg, BendaDi, LatarKamar } from "./dasar-k2b4";
import {
  KAMAR, NAMA_BANGUN, NAMA_BENDA, frasaPosisi, kalimatPosisi, kataDiagram, kandidatTebak, periksaSusunan, pilihanKata, relasi, selDi, selSama,
  type BangunId, type BendaId, type ItemDiagram, type KataPosisi, type LapisZona, type RondePeta, type RondeSusun, type Sel, type SoalKamar, type SoalTebak,
} from "./data-k2b4";

/* ------------------------------------------------------------------------ */
/* Permainan Sub-Bab A (Posisi Benda): panggung seret benda, temukan di kamar,  */
/* peta kotak, pilih kata untuk diagram, susun bangun di petak, dan tebak.      */
/* Tanpa API, tanpa acak.                                                      */
/* ------------------------------------------------------------------------ */

const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------ Panggung posisi (A1, A2, A4) ------------------------------ */

export type ZonaDef = { id: string; kata: KataPosisi; acuanNama: string; x: number; y: number; skala: number; lapis: LapisZona };
export type TugasDef = { id: string; benda: string; zona: string; kalimat: string; perintah?: string };

type PropsPanggung = {
  /** Isi svg paling bawah (kotak 100 x 75). */
  latar: React.ReactNode;
  /** Benda acuan, digambar di antara lapisan belakang dan lapisan depan. */
  acuan: React.ReactNode;
  zona: ZonaDef[];
  tugas: TugasDef[];
  /** Menggambar satu benda di titik tengah (x, y) pada skala tertentu. */
  gambar: (benda: string, x: number, y: number, skala: number) => React.ReactNode;
  /** Tampil di nampan: gambar kecil benda. */
  nampan: (benda: string) => React.ReactNode;
  /** Bila true, semua penempatan tetap terlihat. Bila false, hanya yang terakhir. */
  jejak: boolean;
  /** Pertanyaan akhir tentang posisi benda terakhir. */
  akhir?: { benda: string; acuan: string; kata: KataPosisi; nomor: number };
  onBeres: () => void;
};

export function Panggung({ latar, acuan, zona, tugas, gambar, nampan, jejak, akhir, onBeres }: PropsPanggung) {
  const ucap = useContext(SuaraCtx);
  const [langkah, setLangkah] = useState(0);
  const [selesai, setSelesai] = useState<{ tugas: TugasDef; zona: string }[]>([]);
  const [dipilih, setDipilih] = useState(false);
  const [tahap, setTahap] = useState<"tugas" | "tanya" | "selesai">("tugas");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const tugasKini = tugas[Math.min(langkah, tugas.length - 1)];
  const pilihan = useMemo(() => (akhir ? pilihanKata(akhir.kata, akhir.nomor) : []), [akhir]);

  const taruh = (zid: string) => {
    if (tahap !== "tugas") return;
    const sasaran = zona.find((z) => z.id === tugasKini.zona);
    if (zid !== tugasKini.zona) {
      const z = zona.find((q) => q.id === zid);
      setKabar({ teks: z && sasaran ? `Itu ${frasaPosisi(z.kata)} ${z.acuanNama}. Yang diminta ${frasaPosisi(sasaran.kata)} ${sasaran.acuanNama}. Coba tempat lain.` : "Belum tepat. Coba tempat lain.", ok: false });
      setDipilih(false);
      return;
    }
    setSelesai([...selesai, { tugas: tugasKini, zona: zid }]);
    setDipilih(false);
    setKabar({ teks: `Betul! ${tugasKini.kalimat}`, ok: true });
    ucap(tugasKini.kalimat);
    if (langkah + 1 >= tugas.length) {
      if (akhir) setTahap("tanya");
      else {
        setTahap("selesai");
        letusan.picu();
        onBeres();
      }
    } else setLangkah(langkah + 1);
  };
  const lepas = (_id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z?.startsWith("pg:")) taruh(z.slice(3));
  };
  const jawabAkhir = (i: number) => {
    if (!akhir) return;
    if (pilihan[i] !== akhir.kata) {
      setKeliru(i);
      setKabar({ teks: `Lihat lagi petunjuk terakhir. Benda itu sekarang ${frasaPosisi(akhir.kata)} ${akhir.acuan}, bukan ${frasaPosisi(pilihan[i])}.`, ok: false });
      return;
    }
    setKeliru(null);
    setTahap("selesai");
    setKabar(null);
    letusan.picu();
    ucap(`Betul! ${Kapital(kalimatPosisi(akhir.benda, akhir.kata, akhir.acuan))}.`);
    onBeres();
  };

  const tampil = jejak ? selesai : selesai.slice(-1);
  const gambarTempat = (daftar: LapisZona[]) =>
    tampil
      .map((s) => ({ s, z: zona.find((q) => q.id === s.zona)! }))
      .filter(({ z }) => daftar.includes(z.lapis))
      .map(({ s, z }) => <g key={`${s.tugas.id}-${s.zona}`}>{gambar(s.tugas.benda, z.x, z.y, z.skala)}</g>);

  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
          {tahap === "tugas" ? `Petunjuk ${langkah + 1} dari ${tugas.length}: ${(tugasKini.perintah ?? tugasKini.kalimat).replace(/\.$/, "")}.` : tahap === "tanya" ? "Semua petunjuk sudah dijalankan." : "Semua petunjuk selesai."}
        </p>
        <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-2xl border-4 border-[#1C01A5]/50">
          <svg viewBox="0 0 100 75" className="block h-auto w-full" role="img" aria-label="Panggung posisi benda">
            {latar}
            {gambarTempat(["belakang"])}
            {acuan}
            {gambarTempat(["biasa", "depan"])}
          </svg>
          {tahap === "tugas"
            ? zona.map((z) => (
                <div
                  key={z.id}
                  data-zona={`pg:${z.id}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Tempat ${frasaPosisi(z.kata)} ${z.acuanNama}`}
                  onClick={() => dipilih && taruh(z.id)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && dipilih) {
                      e.preventDefault();
                      taruh(z.id);
                    }
                  }}
                  className={`absolute flex h-[16%] w-[13%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-dashed ${dipilih ? "cursor-pointer border-[#F0AB00] bg-[#FFF7CC]/60" : "border-[#1C01A5]/35 bg-white/30"}`}
                  style={{ left: `${z.x}%`, top: `${(z.y / 75) * 100}%` }}
                />
              ))
            : null}
        </div>
        {tahap === "tugas" ? (
          <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/80 p-1.5" role="group" aria-label="Nampan benda">
            <span className="text-sm font-black text-[#1C01A5]">Benda:</span>
            <BendaSeret key={`n${langkah}`} id={`benda-${langkah}`} label={`Ambil ${tugasKini.benda}`} onKetuk={() => setDipilih(!dipilih)} onLepas={lepas} kelas={`rounded-2xl p-1 ${dipilih ? "ring-4 ring-[#F0AB00]" : ""}`}>
              <div className="flex h-14 w-14 items-center justify-center">{nampan(tugasKini.benda)}</div>
            </BendaSeret>
            <span className="text-xs font-black text-[#1C01A5]/70">Seret ke tempatnya, atau ketuk benda lalu ketuk tempat.</span>
          </div>
        ) : null}
        {tahap === "tanya" && akhir ? (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Di manakah {akhir.benda} sekarang terhadap {akhir.acuan}?
            </p>
            <PilihanTeks opsi={pilihan.map((k) => Kapital(frasaPosisi(k)))} keliru={keliru} onPilih={jawabAkhir} />
          </div>
        ) : null}
        {tahap === "selesai" ? <Berhasil>{akhir ? `${Kapital(kalimatPosisi(akhir.benda, akhir.kata, akhir.acuan))}` : "Semua benda sudah di tempatnya"}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A3. Temukan di kamar ------------------------------ */

export function TemukanKamar({ soal, onBeres }: { soal: SoalKamar[]; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [langkah, setLangkah] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const s = soal[Math.min(langkah, soal.length - 1)];

  const ketuk = (id: BendaId) => {
    if (beres || id === s.acuan) return;
    if (id === s.jawab) {
      const kal = `${Kapital(kalimatPosisi(NAMA_BENDA[id], s.kata, NAMA_BENDA[s.acuan]))}`;
      ucap(`Betul! ${kal}.`);
      if (langkah + 1 >= soal.length) {
        setBeres(true);
        setKabar(null);
        letusan.picu();
        onBeres();
      } else {
        setKabar({ teks: `Betul! ${kal}.`, ok: true });
        setLangkah(langkah + 1);
      }
      return;
    }
    const ketukObj = KAMAR.find((o) => o.id === id)!;
    const acuanObj = KAMAR.find((o) => o.id === s.acuan)!;
    const r = relasi(ketukObj, acuanObj);
    setKabar({ teks: r.length ? `Itu ${NAMA_BENDA[id]}, dan ia ${frasaPosisi(r[0])} ${NAMA_BENDA[s.acuan]}. Yang dicari ${frasaPosisi(s.kata)} ${NAMA_BENDA[s.acuan]}.` : `${Kapital(NAMA_BENDA[id])} tidak berada di dekat ${NAMA_BENDA[s.acuan]}. Cari yang ${frasaPosisi(s.kata)} ${NAMA_BENDA[s.acuan]}.`, ok: false });
  };

  const acuanObj = KAMAR.find((o) => o.id === s.acuan)!;
  return (
    <>
      <div className={`${ALAS} relative space-y-2 p-3`}>
        <p className="text-center text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
          {beres ? "Semua benda sudah ditemukan" : `Soal ${langkah + 1} dari ${soal.length}: benda apa yang ada ${frasaPosisi(s.kata)} ${NAMA_BENDA[s.acuan]}?`}
        </p>
        <svg viewBox="0 0 100 75" className="mx-auto block h-auto w-full max-w-[400px] rounded-2xl border-4 border-[#1C01A5]/50" role="group" aria-label="Gambar kamar">
          <LatarKamar />
          {KAMAR.slice()
            .sort((a, b) => a.z - b.z)
            .map((o) => (
              <g key={o.id} role="button" tabIndex={0} aria-label={`${Kapital(NAMA_BENDA[o.id])}`} onClick={() => ketuk(o.id)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), ketuk(o.id))} style={{ cursor: "pointer" }}>
                <BendaDi id={o.id} x={o.x} y={o.y} w={o.w} h={o.h} />
                <rect x={o.x - 1} y={o.y - 1} width={o.w + 2} height={o.h + 2} fill="transparent" />
              </g>
            ))}
          {!beres ? <rect x={acuanObj.x - 1.5} y={acuanObj.y - 1.5} width={acuanObj.w + 3} height={acuanObj.h + 3} rx="2" fill="none" stroke={BIRU} strokeWidth="0.9" strokeDasharray="2 1.5" className="vc-denyut" pointerEvents="none" /> : null}
        </svg>
        {beres ? <Berhasil>Semua benda sudah ditemukan</Berhasil> : <p className="text-center text-xs font-black text-[#1C01A5]/70">Benda yang berkedip adalah benda acuan.</p>}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A5. Peta kotak ------------------------------ */

export function PetaKotak({ ronde, onBeres }: { ronde: RondePeta; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [langkah, setLangkah] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const [benar, setBenar] = useState<Sel[]>([]);
  const letusan = useLetusan();
  const soal = ronde.soal[Math.min(langkah, ronde.soal.length - 1)];
  const dituju = selDi(ronde.acuan, soal.kata);

  const ketuk = (b: number, k: number) => {
    if (beres) return;
    const sel = { b, k };
    if (selSama(sel, ronde.acuan)) {
      setKabar({ teks: "Itu lingkaran biru, benda acuannya. Cari kotak di sebelahnya.", ok: false });
      return;
    }
    if (dituju && selSama(sel, dituju)) {
      setBenar([...benar, sel]);
      ucap(`Betul! Kotak itu ${frasaPosisi(soal.kata)} lingkaran biru.`);
      if (langkah + 1 >= ronde.soal.length) {
        setBeres(true);
        setKabar(null);
        letusan.picu();
        onBeres();
      } else {
        setKabar({ teks: `Betul! Kotak itu ${frasaPosisi(soal.kata)} lingkaran biru.`, ok: true });
        setLangkah(langkah + 1);
      }
      return;
    }
    const rel = (["atas", "bawah", "kiri", "kanan"] as KataPosisi[]).find((q) => {
      const d = selDi(ronde.acuan, q);
      return d && selSama(d, sel);
    });
    setKabar({ teks: rel ? `Kotak itu ${frasaPosisi(rel)} lingkaran biru. Yang diminta ${frasaPosisi(soal.kata)} lingkaran biru.` : `Kotak itu tidak bersebelahan dengan lingkaran biru. Cari kotak ${frasaPosisi(soal.kata)} lingkaran biru.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          {beres ? "Semua kotak sudah ditemukan" : `Ketuk kotak yang ${frasaPosisi(soal.kata)} lingkaran biru (${langkah + 1} dari ${ronde.soal.length})`}
        </p>
        <div className="mx-auto grid w-full max-w-[260px] grid-cols-3 gap-1.5" role="group" aria-label="Peta kotak tiga kali tiga">
          {Array.from({ length: 9 }, (_, i) => {
            const b = Math.floor(i / 3);
            const k = i % 3;
            const acu = selSama({ b, k }, ronde.acuan);
            const sudah = benar.some((q) => selSama(q, { b, k }));
            return (
              <button
                key={i}
                type="button"
                aria-label={`Kotak baris ${b + 1} kolom ${k + 1}${acu ? ", lingkaran biru" : ""}${sudah ? ", sudah benar" : ""}`}
                onClick={() => ketuk(b, k)}
                className={`flex aspect-square items-center justify-center rounded-2xl border-4 ${sudah ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}
              >
                {acu ? (
                  <svg viewBox="0 0 100 100" className="h-3/4 w-3/4" aria-hidden="true">
                    <circle cx="50" cy="50" r="40" fill="#2563EB" stroke={BIRU} strokeWidth="6" />
                  </svg>
                ) : sudah ? (
                  <span className="text-2xl font-black text-[#16A34A]">✓</span>
                ) : null}
              </button>
            );
          })}
        </div>
        {beres ? <Berhasil>Atas, bawah, kiri, dan kanan sudah ditemukan</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A6. Pilih kata posisi ------------------------------ */

function DiagramDua({ d }: { d: ItemDiagram }) {
  const bulat = <circle cx={d.tgt.cx} cy={d.tgt.cy} r={d.tgt.r} fill="#F59E0B" stroke={BIRU} strokeWidth="3" />;
  const kotak = <rect x={d.ref.x} y={d.ref.y} width={d.ref.w} height={d.ref.h} rx="3" fill="#BFDBFE" stroke={BIRU} strokeWidth="3" />;
  return (
    <svg viewBox="0 0 100 100" className="mx-auto block h-24 w-24 rounded-xl bg-white" role="img" aria-label="Lingkaran jingga dan persegi biru">
      {d.lapis === "belakang" ? (
        <>
          {bulat}
          {kotak}
        </>
      ) : (
        <>
          {kotak}
          {bulat}
        </>
      )}
    </svg>
  );
}

export function PilihKataPosisi({ item, nomor, onBeres }: { item: ItemDiagram[]; nomor: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [terjawab, setTerjawab] = useState<(KataPosisi | null)[]>(() => item.map(() => null));
  const [keliru, setKeliru] = useState<{ i: number; k: KataPosisi } | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const opsi = useMemo(() => item.map((d, i) => pilihanKata(kataDiagram(d) ?? d.jawab, nomor + i)), [item, nomor]);

  const pilih = (i: number, k: KataPosisi) => {
    if (terjawab[i]) return;
    const kunci = kataDiagram(item[i]) ?? item[i].jawab;
    if (k !== kunci) {
      setKeliru({ i, k });
      setKabar({ teks: `Gambar ${String.fromCharCode(97 + i)}: lihat lingkarannya terhadap persegi. Kata ${k} belum tepat.`, ok: false });
      return;
    }
    const baru = terjawab.slice();
    baru[i] = k;
    setTerjawab(baru);
    setKeliru(null);
    if (baru.every(Boolean)) {
      setKabar(null);
      letusan.picu();
      ucap("Semua gambar sudah kamu jawab dengan tepat.");
      onBeres();
    } else setKabar({ teks: `Gambar ${String.fromCharCode(97 + i)}: lingkaran ${frasaPosisi(k)} persegi.`, ok: true });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="grid grid-cols-2 gap-2">
          {item.map((d, i) => (
            <div key={i} className={`space-y-1 rounded-2xl border-4 p-1.5 ${terjawab[i] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5]/40 bg-white"}`}>
              <p className="text-center text-xs font-black text-[#1C01A5]">{String.fromCharCode(97 + i)}.</p>
              <DiagramDua d={d} />
              {terjawab[i] ? (
                <p className="text-center text-sm font-black text-[#14532D]">✔ {Kapital(terjawab[i]!)}</p>
              ) : (
                <div className="grid gap-1">
                  {opsi[i].map((k) => (
                    <button
                      key={`${k}-${keliru?.i === i && keliru.k === k ? "x" : "o"}`}
                      type="button"
                      aria-label={`Gambar ${String.fromCharCode(97 + i)}: pilih ${k}`}
                      onClick={() => pilih(i, k)}
                      className={`rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-1 text-sm font-black text-[#1C01A5] ${keliru?.i === i && keliru.k === k ? "igil-goyang" : ""}`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {terjawab.every(Boolean) ? <Berhasil>Semua kata posisi sudah tepat</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ A7. Susun bangun di petak ------------------------------ */

export function SusunBangunPetak({ ronde, onBeres }: { ronde: RondeSusun; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [tempat, setTempat] = useState<Partial<Record<BangunId, Sel>>>({});
  const [dipilih, setDipilih] = useState<BangunId | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const kalimat = (s: RondeSusun["syarat"][number]) => `${Kapital(kalimatPosisi(NAMA_BANGUN[s.a], s.kata, NAMA_BANGUN[s.b]))}.`;
  const siapa = (b: number, k: number): BangunId | undefined => ronde.bangun.find((x) => tempat[x] && tempat[x]!.b === b && tempat[x]!.k === k);

  const ketukSel = (b: number, k: number) => {
    if (beres) return;
    const ada = siapa(b, k);
    if (ada) {
      const baru = { ...tempat };
      delete baru[ada];
      setTempat(baru);
      setKabar(null);
      return;
    }
    if (!dipilih) {
      setKabar({ teks: "Ketuk salah satu bangun dulu, lalu ketuk petaknya.", ok: false });
      return;
    }
    setTempat({ ...tempat, [dipilih]: { b, k } });
    setDipilih(null);
    setKabar(null);
  };
  const periksa = () => {
    const h = periksaSusunan(ronde, tempat);
    if (h.sah) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap("Betul! Semua kalimat sudah terpenuhi oleh susunanmu.");
      onBeres();
      return;
    }
    if (h.gagal) setKabar({ teks: `Belum tepat. ${kalimat(h.gagal)} Periksa lagi letak ${NAMA_BANGUN[h.gagal.a]} dan ${NAMA_BANGUN[h.gagal.b]}. Letaknya harus bersebelahan.`, ok: false });
    else setKabar({ teks: "Letakkan semua bangun di petak yang berbeda dulu.", ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <ul className="space-y-0.5 rounded-2xl bg-[#F5F3FF] px-3 py-1.5 text-sm font-black text-[#1C01A5]">
          {ronde.syarat.map((s, i) => (
            <li key={i}>
              {i + 1}. {kalimat(s)}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Bangun yang tersedia">
          {ronde.bangun.map((b) => (
            <button
              key={b}
              type="button"
              disabled={!!tempat[b] || beres}
              aria-pressed={dipilih === b}
              aria-label={`Bangun ${NAMA_BANGUN[b]}${tempat[b] ? ", sudah di petak" : ""}`}
              onClick={() => setDipilih(dipilih === b ? null : b)}
              className={`flex flex-col items-center rounded-2xl border-4 bg-white p-1 disabled:opacity-35 ${dipilih === b ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`}
            >
              <BangunSvg id={b} kelas="h-12 w-12" />
              <span className="text-[11px] font-black text-[#1C01A5]">{NAMA_BANGUN[b]}</span>
            </button>
          ))}
        </div>
        <div className="mx-auto grid w-full max-w-[260px] grid-cols-3 gap-1.5" role="group" aria-label="Petak tiga kali tiga">
          {Array.from({ length: 9 }, (_, i) => {
            const b = Math.floor(i / 3);
            const k = i % 3;
            const ada = siapa(b, k);
            return (
              <button
                key={i}
                type="button"
                aria-label={`Petak baris ${b + 1} kolom ${k + 1}${ada ? `, berisi ${NAMA_BANGUN[ada]}, ketuk untuk mengambil` : ""}`}
                onClick={() => ketukSel(b, k)}
                className={`flex aspect-square items-center justify-center rounded-2xl border-4 ${dipilih && !ada ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-white"}`}
              >
                {ada ? <BangunSvg id={ada} kelas="h-3/4 w-3/4" /> : null}
              </button>
            );
          })}
        </div>
        {beres ? (
          <Berhasil>Susunanmu memenuhi semua kalimat</Berhasil>
        ) : (
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => { setTempat({}); setDipilih(null); setKabar(null); }} className={TOMBOL_PUTIH}>
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

/* ------------------------------ A9. Tebak aku apa ------------------------------ */

export function TebakPetak({ soal, nomor, onBeres }: { soal: SoalTebak; nomor: number; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [beres, setBeres] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = useMemo(() => [0, 1, 2].map((i) => (i + nomor) % 3), [nomor]);
  const cocok = useMemo(() => kandidatTebak(soal.grid, soal.petunjuk), [soal]);

  const jawab = (j: number) => {
    const nama = soal.opsi[urut[j]];
    if (cocok.length === 1 && nama === cocok[0]) {
      setKeliru(null);
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`Betul! Aku adalah ${nama}.`);
      onBeres();
      return;
    }
    setKeliru(j);
    const langgar = soal.petunjuk.find((p) => !kandidatTebak(soal.grid, [p]).includes(nama));
    setKabar({ teks: langgar ? `${Kapital(nama)} tidak cocok dengan petunjuk: aku ${frasaPosisi(langgar.kata)} ${langgar.acuan}.` : `${Kapital(nama)} cocok dengan satu petunjuk, tetapi belum dengan semuanya. Periksa petunjuk yang lain.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-2`}>
        <div className="mx-auto grid w-full max-w-[300px] grid-cols-3 gap-1.5" role="group" aria-label="Kotak kata tiga kali tiga">
          {soal.grid.flat().map((n, i) => (
            <div key={i} className="flex min-h-12 items-center justify-center rounded-xl border-4 border-[#1C01A5] bg-white px-0.5 text-center text-sm font-black leading-tight text-[#1C01A5]">
              {n}
            </div>
          ))}
        </div>
        <ul className="space-y-0.5 rounded-2xl bg-[#FEF3C7] px-3 py-1.5 text-sm font-black text-[#3B2410]">
          {soal.petunjuk.map((p, i) => (
            <li key={i}>
              {i + 1}. Aku {frasaPosisi(p.kata)} {p.acuan}.
            </li>
          ))}
        </ul>
        {beres ? (
          <Berhasil>Aku adalah {soal.jawab}</Berhasil>
        ) : (
          <div className="space-y-1.5 rounded-2xl bg-white/85 p-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Siapa aku?</p>
            <PilihanTeks opsi={urut.map((i) => Kapital(soal.opsi[i]))} keliru={keliru} onPilih={jawab} />
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

