"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalTimbang,
  hasilUbah,
  hurufBesar,
  kalimatBanding,
  kalimatBetulBanding,
  kalimatBetulGaris,
  kalimatBetulUbah,
  kalimatBetulUrut,
  kalimatGaris,
  kalimatUbah,
  kalimatUrut,
  ketukUrut,
  mulaiLagiTimbang,
  periksaBanding,
  periksaGaris,
  periksaUbah,
  petunjukBanding,
  petunjukGaris,
  petunjukUbah,
  petunjukUrut,
  penyebutBaruSah,
  pilihGaris,
  pilihModeTimbang,
  pilihTanda,
  sasaranBanding,
  sasaranGaris,
  sasaranUbah,
  sasaranUrut,
  tandaTerakhirGaris,
  ubahPembilang,
  ubahPenyebutBaru,
  ulangUrut,
  type KeadaanTimbang,
  type ModeTimbang,
  type TandaBanding,
} from "./logika";
import { MISI_TIMBANG_TEKS } from "./data-sim";
import { dariBiasa, eja, kata, pec, pembilangSama, sebutPec, teksPec } from "./logika-data";
import { BarPecahan, DuaSusunan, Gambar, GarisBilangan, PecahanSvg, TeksPecahan, warnaTimbang } from "./GambarTimbang";

/**
 * Simulasi Kelas 5 Bab 3 Sub-Bab A: Garis Timbang (Misi Timbang). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Garis (geser tanda pada garis bilangan sampai letak pecahan yang diminta), Ubah (atur pembilang pecahan biasa yang sama besar dengan pecahan campuran, penyebut tetap),
 * Banding (atur penyebut baru dengan KPK, lalu pilih tanda; alat menolak penyebut yang bukan kelipatan kedua penyebut), dan Urut (ketuk tiga pecahan berurutan; alat menolak kartu yang belum waktunya).
 * Bar pecahan dan garis bilangan digambar dari bilangan.
 */
const MODE: { id: ModeTimbang; nama: string; ikon: string }[] = [
  { id: "garis", nama: "Garis", ikon: "\u{1F4CF}" },
  { id: "ubah", nama: "Ubah", ikon: "\u{1F504}" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
];
const TANDA: { id: TandaBanding; teks: string; nama: string }[] = [
  { id: "<", teks: "<", nama: "lebih kecil" },
  { id: "=", teks: "=", nama: "sama dengan" },
  { id: ">", teks: ">", nama: "lebih besar" },
];

function SusunanUbah({ s, p }: { s: ReturnType<typeof sasaranUbah>; p: number }) {
  const w = warnaTimbang("benda");
  const calon = dariBiasa(p, s.f.q, true);
  const baris = Math.max(s.f.w + 1, calon.w + (calon.p > 0 ? 1 : 0));
  const tinggi = 78 + baris * 18 + 8;
  return (
    <Gambar rupa="benda" label={`Pecahan campuran dan pecahan biasa ${p} per ${s.f.q}`} judul="campuran dan biasa, penyebut sama" tinggi={tinggi}>
      <g data-susunan="ubah">
        <text x={77} y={36} textAnchor="middle" fontSize={14} fontWeight={800} fill={w.angka}>
          campuran
        </text>
        <PecahanSvg f={s.f} x={77} y={57} u={14.5} warna={w.angka} />
        <BarPecahan f={s.f} x={12} y={78} lebar={130} rupa="benda" />
        <text x={223} y={36} textAnchor="middle" fontSize={14} fontWeight={800} fill={w.angka}>
          biasa
        </text>
        <PecahanSvg f={pec(0, p, s.f.q)} x={223} y={57} u={14.5} warna={w.angka} />
        <BarPecahan f={calon} x={158} y={78} lebar={130} rupa="benda" />
      </g>
    </Gambar>
  );
}

export default function SimulasiGarisTimbang({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTimbang) => void }) {
  const [k, setK] = useState<KeadaanTimbang>(() => awalTimbang());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanTimbang, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada sasaran berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(eja(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(eja(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#9F1239] bg-white px-3 text-sm font-black text-[#831843] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9F1239] bg-[#9F1239] text-white" : "border-[#9F1239] bg-white text-[#9F1239]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-1 py-2 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#9F1239] bg-[#FFE4E6]" : "border-[#FDA4AF] bg-white"}`;
  const soalKotak = "rounded-xl border-2 border-dashed border-[#9F1239] bg-white px-2 py-1 text-center text-sm font-black text-[#831843]";

  const ganti = (m: ModeTimbang) =>
    ubah(
      pilihModeTimbang(k, m),
      m === "garis"
        ? "Geser tanda sampai letak pecahan pada garis bilangan."
        : m === "ubah"
          ? "Atur pembilang sampai sama besar dengan pecahan campuran."
          : m === "banding"
            ? "Samakan penyebut dengan KPK, lalu pilih tanda."
            : "Ketuk tiga pecahan berurutan.",
    );

  /* ------------------------------ Garis ------------------------------ */
  const sg = sasaranGaris(k);
  const geserGaris = (delta: 1 | -1) => ubah(pilihGaris(k, k.garisPilih < 0 ? (delta === 1 ? 1 : tandaTerakhirGaris(sg)) : k.garisPilih + delta));
  const periksaGarisKu = () => {
    const r = periksaGaris(k);
    if (r.ok) return ubah(r.k, kalimatBetulGaris(sg));
    ubah(r.k);
    salah(petunjukGaris(k));
  };
  /* ------------------------------ Ubah ------------------------------ */
  const su = sasaranUbah(k);
  const periksaUbahKu = () => {
    const r = periksaUbah(k);
    if (r.ok) return ubah(r.k, kalimatBetulUbah(su));
    ubah(r.k);
    salah(petunjukUbah(k));
  };
  /* ------------------------------ Banding ------------------------------ */
  const sb = sasaranBanding(k);
  const sah = penyebutBaruSah(k);
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, kalimatBetulBanding(sb));
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  const gambarBaru = sah && k.bandingD <= 24;
  /* ------------------------------ Urut ------------------------------ */
  const sr = sasaranUrut(k);
  const ketukKartu = (i: number) => {
    const r = ketukUrut(k, i);
    if (r.selesai) return ubah(r.k, kalimatBetulUrut(sr));
    if (r.ok) return ubah(r.k);
    ubah(r.k);
    if (!k.urutIsi.includes(i)) salah(petunjukUrut(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-garis-timbang">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9F1239] bg-[#FFF1F2] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Garis Timbang</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_TIMBANG_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "garis" ? (
          <div className="space-y-2" key={`ga${k.garisKe}`}>
            <p className={soalKotak}>
              {hurufBesar(sg.benda)}: <TeksPecahan t={teksPec(sg.f)} /> {sg.satuan}. Tiap satuan dibagi {kata(sg.f.q)} bagian sama.
            </p>
            <GarisBilangan q={sg.f.q} maks={sg.maks} rupa="benda" titik={k.garisPilih >= 0 ? [{ i: k.garisPilih }] : []} label={`Garis bilangan nol sampai ${sg.maks}, tanda dipilih ke ${k.garisPilih}`} />
            <div className="mx-auto grid max-w-[300px] grid-cols-[56px_1fr_56px] items-center gap-2 px-2">
              <button type="button" aria-label="Geser tanda ke kiri" className={tombol} onClick={() => geserGaris(-1)}>
                ◀
              </button>
              <p className="text-center text-sm font-black text-[#1C01A5]" data-ruas={k.garisPilih}>
                {k.garisPilih < 0 ? "belum dipilih" : `ruas ke ${k.garisPilih}`}
              </p>
              <button type="button" aria-label="Geser tanda ke kanan" className={tombol} onClick={() => geserGaris(1)}>
                ▶
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaGarisKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "ubah" ? (
          <div className="space-y-2" key={`ub${k.ubahKe}`}>
            <p className={soalKotak}>
              {hurufBesar(su.benda)}: <TeksPecahan t={teksPec(su.f)} /> {su.satuan}. Ubah menjadi pecahan biasa berpenyebut {kata(su.f.q)}.
            </p>
            <SusunanUbah s={su} p={k.ubahP} />
            <div className="mx-auto grid max-w-[300px] grid-cols-[56px_1fr_56px] items-center gap-2 px-2">
              <button type="button" aria-label="Kurangi pembilang" className={tombol} onClick={() => ubah(ubahPembilang(k, -1))}>
                −
              </button>
              <p className="text-center text-xl font-black text-[#1C01A5]" data-pembilang={k.ubahP} data-hasil={hasilUbah(su)}>
                <TeksPecahan t={`${k.ubahP}/${su.f.q}`} />
              </p>
              <button type="button" aria-label="Naikkan pembilang" className={tombol} onClick={() => ubah(ubahPembilang(k, 1))}>
                +
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/80">Penyebut tetap {su.f.q}; hanya pembilang yang diatur.</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUbahKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2" key={`bd${k.bandingKe}`}>
            <p className={soalKotak}>
              {hurufBesar(sb.benda)}: <TeksPecahan t={teksPec(sb.a)} /> dan <TeksPecahan t={teksPec(sb.b)} /> {sb.satuan}. Samakan penyebutnya, lalu pilih tanda.
            </p>
            <DuaSusunan d={{ tipe: "igil", a: sb.a, b: sb.b, satuan: sb.satuan }} rupa="benda" />
            <div className="mx-auto grid max-w-[300px] grid-cols-[56px_1fr_56px] items-center gap-2 px-2">
              <button type="button" aria-label="Kurangi penyebut baru" className={tombol} onClick={() => ubah(ubahPenyebutBaru(k, -1))}>
                −
              </button>
              <p className="text-center text-sm font-black text-[#1C01A5]" data-penyebut={k.bandingD}>
                penyebut baru {k.bandingD}
              </p>
              <button type="button" aria-label="Naikkan penyebut baru" className={tombol} onClick={() => ubah(ubahPenyebutBaru(k, 1))}>
                +
              </button>
            </div>
            {gambarBaru ? (
              <DuaSusunan
                d={{ tipe: "igil", a: dariBiasa(pembilangSama(sb.a, k.bandingD), k.bandingD, true), b: dariBiasa(pembilangSama(sb.b, k.bandingD), k.bandingD, true), satuan: sb.satuan }}
                rupa="benda"
              />
            ) : (
              <p className="rounded-xl bg-white/85 px-2 py-1 text-center text-xs font-black text-[#9F1239]">
                {sah ? "Penyebut baru terlalu besar untuk digambar." : "Penyebut baru belum bisa dibagi oleh kedua penyebut."}
              </p>
            )}
            <div className="grid grid-cols-3 gap-2 px-2" role="group" aria-label="Pilih tanda">
              {TANDA.map((t) => (
                <button key={t.id} type="button" onClick={() => ubah(pilihTanda(k, t.id))} aria-pressed={k.bandingTanda === t.id} aria-label={t.nama} className={pilihan(k.bandingTanda === t.id)}>
                  <span className="block text-xl">{t.teks}</span>
                  <span className="block text-[11px]">{t.nama}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBandingKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2" key={`ur${k.urutKe}`}>
            <p className={soalKotak}>
              {hurufBesar(sr.benda)} ({sr.satuan}). Ketuk pecahan dari yang paling {sr.naik ? "kecil" : "besar"}.
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-1" role="group" aria-label="Tiga pecahan">
              {sr.daftar.map((f, i) => {
                const urutKe = k.urutIsi.indexOf(i);
                return (
                  <button
                    key={`${teksPec(f)}-${i}`}
                    type="button"
                    onClick={() => ketukKartu(i)}
                    aria-label={`Pecahan ${sebutPec(f)}${urutKe >= 0 ? `, urutan ${urutKe + 1}` : ""}`}
                    className={`relative flex min-h-[72px] min-w-0 flex-col items-center justify-center rounded-xl border-4 px-1 text-lg ${urutKe >= 0 ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#FDA4AF] bg-white"} text-[#1C01A5]`}
                  >
                    {urutKe >= 0 ? <span className="absolute left-1 top-0.5 text-[11px] font-black text-[#15803D]">{urutKe + 1}</span> : null}
                    <TeksPecahan t={teksPec(f)} />
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]" data-urut={k.urutIsi.join(",")}>
              Sudah diketuk {k.urutIsi.length} dari {sr.daftar.length}
            </p>
            <div className="flex justify-center">
              <button type="button" className={tombol} disabled={k.urutIsi.length === 0} onClick={() => ubah(ulangUrut(k), "Urutan diulang dari awal.")}>
                {"↩️"} Ulangi urutan
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTimbang(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        <TeksPecahan t={hurufBesar(catatan || (k.mode === "garis" ? kalimatGaris(k) : k.mode === "ubah" ? kalimatUbah(k) : k.mode === "banding" ? kalimatBanding(k) : kalimatUrut(k)))} />
      </p>
    </div>
  );
}
