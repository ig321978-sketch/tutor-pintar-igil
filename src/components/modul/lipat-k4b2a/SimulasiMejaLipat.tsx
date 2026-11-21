"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  TANDA_LIPAT,
  arsirBagian,
  awalLipat,
  hapusKartu,
  hurufBesar,
  jepitTanda,
  kalimatBanding,
  kalimatGaris,
  kalimatLipat,
  kalimatUrut,
  mulaiLagiLipat,
  pec,
  periksaBanding,
  periksaGaris,
  periksaLipat,
  periksaUrut,
  petunjukBanding,
  petunjukGaris,
  petunjukLipat,
  petunjukUrut,
  pilihModeLipat,
  pilihTanda,
  targetBanding,
  targetGaris,
  targetLipat,
  targetUrut,
  taruhKartu,
  ubahBagianGaris,
  ubahBagianLipat,
  urutKecil,
  type KeadaanLipat,
  type ModeLipat,
} from "./logika";
import { MISI_LIPAT_TEKS } from "./data-sim";
import { BarisBagian, GarisBil, TampilDasar } from "./GambarLipat";
import { potongBagian, tandaGaris } from "./logika-cpa";
import { ejaK4B2 } from "../eja-k4b2";

/**
 * Simulasi Kelas 4 Bab 2 Sub-Bab A: Meja Lipat (Misi Lipat). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Lipat (bagi kain menjadi bagian sama besar dan arsir satu bagian; alat menolak memeriksa sebelum ada bagian berarsir), Banding (pilih tanda untuk dua pita),
 * Urut (susun tiga pecahan dari yang terkecil; alat menolak memeriksa selama tempatnya belum penuh), dan Garis (bagi garis dan jepit tanda pertama setelah nol).
 */
const MODE: { id: ModeLipat; nama: string; ikon: string }[] = [
  { id: "lipat", nama: "Lipat", ikon: "\u{1F9F5}" },
  { id: "banding", nama: "Banding", ikon: "\u{1F4CF}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F380}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F9F7}" },
];
const NAMA_TANDA = ["lebih dari", "kurang dari", "sama dengan"];

export default function SimulasiMejaLipat({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLipat) => void }) {
  const [k, setK] = useState<KeadaanLipat>(() => awalLipat());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanLipat, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ejaK4B2(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B2(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#5B21B6] bg-white px-3 text-sm font-black text-[#5B21B6] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#6D28D9] bg-[#6D28D9] text-white" : "border-[#6D28D9] bg-white text-[#6D28D9]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-1 text-center text-2xl font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#C4B5FD] bg-white"}`;

  const ganti = (m: ModeLipat) =>
    ubah(
      pilihModeLipat(k, m),
      m === "lipat" ? "Bagi kain menjadi bagian sama besar, lalu arsir satu bagian." : m === "banding" ? "Lihat dua pita, lalu pilih tanda yang tepat." : m === "urut" ? "Urutkan tiga pecahan dari yang terkecil." : "Bagi garis, lalu jepit pecahan pesanan.",
    );

  /* ------------------------------ Lipat ------------------------------ */
  const nLipat = targetLipat(k);
  const periksaLipatKu = () => {
    const r = periksaLipat(k);
    if (r.ok) return ubah(r.k, `Betul! Kain terbagi menjadi ${nLipat} bagian sama besar, dan satu bagian berarsir ditulis ${pec(nLipat)}.`);
    ubah(r.k);
    salah(petunjukLipat(k));
  };
  /* ------------------------------ Banding ------------------------------ */
  const tb = targetBanding(k);
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, `Betul! ${pec(tb.a)} ${tb.a < tb.b ? ">" : tb.a > tb.b ? "<" : "="} ${pec(tb.b)}.`);
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  /* ------------------------------ Urut ------------------------------ */
  const du = targetUrut(k);
  const periksaUrutKu = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, `Betul! Urutannya ${urutKecil(du).map(pec).join(" < ")}.`);
    ubah(r.k);
    salah(petunjukUrut(k));
  };
  /* ------------------------------ Garis ------------------------------ */
  const nGaris = targetGaris(k);
  const periksaGarisKu = () => {
    const r = periksaGaris(k);
    if (r.ok) return ubah(r.k, `Betul! Pecahan ${pec(nGaris)} ada pada tanda pertama setelah nol, pada garis yang dibagi menjadi ${nGaris} bagian.`);
    ubah(r.k);
    salah(petunjukGaris(k));
  };

  const X0 = 20;
  const LEBAR = 260;
  const bagianKain = potongBagian(k.lipatBagian, X0, LEBAR, []);
  const tandaPilih = tandaGaris(k.garisBagian, X0, LEBAR);

  return (
    <div className="space-y-3" data-uji="simulasi-meja-lipat">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#6D28D9] bg-[#F5F3FF] p-2">
        <p className="text-sm font-black text-[#4C1D95]">Misi Meja Lipat</p>
        <p className="text-xs font-bold text-[#4C1D95]/80">{MISI_LIPAT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "lipat" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#6D28D9] bg-white px-2 py-1 text-center text-sm font-black text-[#4C1D95]">
              Bu Wulan memesan satu bagian kain: {pec(nLipat)}
            </p>
            <svg viewBox="0 0 300 96" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-[#F5EBDD]" role="group" aria-label="Kain di meja lipat">
              <BarisBagian x0={X0} y={14} lebar={LEBAR} h={62} n={k.lipatBagian} arsir={k.lipatArsir >= 0 ? [k.lipatArsir] : []} rupa="benda" />
              {bagianKain.map((b, i) => (
                <rect
                  key={i}
                  x={b.x}
                  y={14}
                  width={b.w}
                  height={62}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`Bagian ${i + 1} dari ${k.lipatBagian}`}
                  aria-pressed={k.lipatArsir === i}
                  style={{ cursor: "pointer" }}
                  onClick={() => ubah(arsirBagian(k, i))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") ubah(arsirBagian(k, i));
                  }}
                />
              ))}
              <text x={150} y={90} textAnchor="middle" fontSize={9} fontWeight={900} fill="#5B21B6">
                {k.lipatBagian} bagian sama besar
              </text>
            </svg>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} disabled={k.lipatBagian <= 1} onClick={() => ubah(ubahBagianLipat(k, -1))}>
                {"➖"} Satukan
              </button>
              <button type="button" className={tombol} disabled={k.lipatBagian >= 9} onClick={() => ubah(ubahBagianLipat(k, 1))}>
                {"➕"} Bagi lagi
              </button>
              <button type="button" className={tombol} onClick={periksaLipatKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2">
            <TampilDasar l={{ tipe: "pita", a: tb.a, b: tb.b }} rupa="benda" cara="klik" />
            <p className="text-center text-xs font-black text-[#1C01A5]">Tanda apa yang tepat antara pecahan atas dan pecahan bawah?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih tanda">
              {TANDA_LIPAT.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihTanda(k, i))} aria-pressed={k.bandingPilih === i} aria-label={NAMA_TANDA[i]} className={pilihan(k.bandingPilih === i)}>
                  {t}
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
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk kartu satu per satu, mulai dari pecahan yang terkecil.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Kartu pecahan">
              {du.map((pen, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={k.urutIsi.includes(i)}
                  onClick={() => {
                    const r = taruhKartu(k, i);
                    if (r.ok) ubah(r.k);
                  }}
                  aria-label={`Kartu ${ejaK4B2(pec(pen))}`}
                  className={`${pilihan(false)} disabled:opacity-30`}
                >
                  {pec(pen)}
                </button>
              ))}
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Tempat urutan">
              {[0, 1, 2].map((t) => (
                <div key={t} className="min-h-[48px] rounded-xl border-4 border-dashed border-[#6D28D9] bg-white/80 px-1 py-1 text-center text-2xl font-black text-[#4C1D95]">
                  {k.urutIsi[t] !== undefined ? pec(du[k.urutIsi[t]]) : ""}
                </div>
              ))}
            </div>
            <p className="text-center text-[11px] font-black text-[#5B21B6]">terkecil {"→"} terbesar</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className={tombol}
                onClick={() => {
                  const r = hapusKartu(k);
                  if (r.ok) ubah(r.k);
                  else salah("Belum ada kartu yang bisa diambil kembali.");
                }}
              >
                {"↩"} Ambil kembali
              </button>
              <button type="button" className={tombol} onClick={periksaUrutKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "garis" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#6D28D9] bg-white px-2 py-1 text-center text-sm font-black text-[#4C1D95]">Pesanan: jepit pecahan {pec(nGaris)} pada garis</p>
            <svg viewBox="0 0 300 96" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-[#F5EBDD]" role="group" aria-label="Garis dari nol sampai satu">
              <GarisBil x0={X0} lebar={LEBAR} y={52} rupa="benda" tanda={k.garisBagian} />
              {k.garisJepit >= 1 ? (
                <g aria-hidden="true">
                  <rect x={tandaPilih[k.garisJepit] - 4} y={34} width={8} height={16} rx={2} fill="#FACC15" stroke="#92400E" strokeWidth={1.4} />
                </g>
              ) : null}
              {tandaPilih.slice(1).map((gx, i) => (
                <circle
                  key={i}
                  cx={gx}
                  cy={52}
                  r={Math.min(12, LEBAR / k.garisBagian / 2)}
                  fill="transparent"
                  role="button"
                  tabIndex={0}
                  aria-label={`Tanda ${i + 1} dari ${k.garisBagian}`}
                  aria-pressed={k.garisJepit === i + 1}
                  style={{ cursor: "pointer" }}
                  onClick={() => ubah(jepitTanda(k, i + 1))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") ubah(jepitTanda(k, i + 1));
                  }}
                />
              ))}
              <text x={150} y={90} textAnchor="middle" fontSize={9} fontWeight={900} fill="#5B21B6">
                {k.garisBagian} bagian sama panjang
              </text>
            </svg>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} disabled={k.garisBagian <= 1} onClick={() => ubah(ubahBagianGaris(k, -1))}>
                {"➖"} Satukan
              </button>
              <button type="button" className={tombol} disabled={k.garisBagian >= 9} onClick={() => ubah(ubahBagianGaris(k, 1))}>
                {"➕"} Bagi lagi
              </button>
              <button type="button" className={tombol} onClick={periksaGarisKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => (k.mode === "urut" ? ubah({ ...k, urutIsi: [] }, "Tempat dikosongkan, mulai lagi dari kartu terkecil.") : ubah(mulaiLagiLipat(), "Mulai lagi dari awal."))}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "lipat" ? kalimatLipat(k) : k.mode === "banding" ? kalimatBanding(k) : k.mode === "urut" ? kalimatUrut(k) : kalimatGaris(k)))}
      </p>
    </div>
  );
}

