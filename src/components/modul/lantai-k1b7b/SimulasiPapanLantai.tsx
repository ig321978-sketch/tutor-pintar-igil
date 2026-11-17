"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  LEBAR_ALAT,
  NAMA_ALAT,
  aturKira,
  aturPita,
  awalLantai,
  kalimatLantai,
  kata,
  kirimPesanan,
  pilihAlatLantai,
  pilihBendaLantai,
  pilihModeLantai,
  selisihKira,
  sudahDiukur,
  taruhSatuan,
  tempatUkur,
  tutupPesanan,
  ukurSelesai,
  ulangUkur,
  type AlatSim,
  type KeadaanLantai,
  type ModeLantai,
} from "./logika";
import { BENDA_SIM, MISI_LANTAI } from "./data";

/**
 * Simulasi Kelas 1 Bab 7 Sub-Bab B: Misi Papan Lantai bagian satu, Papan Lantai (sekaligus penutup bab). Benda dan bilangan berbeda dari Story.
 * Eksplorasi bebas tanpa skor, tiga alat untuk satu model bengkel: Ukur (sedotan atau tongkat kayu ditaruh dari ujung, rapat atau sengaja bercelah,
 * dengan perkiraan lebih dulu), Petak (dua pita di kertas berpetak), Pesan (kirim pesanan papan lantai berisi angka dan nama alat), lalu
 * perayaan akhir cerita bab. Tanpa satuan baku.
 */
const D = BENDA_SIM;
const ID_LANTAI = "lantai";
const MODE: { id: ModeLantai; nama: string; ikon: string }[] = [
  { id: "ukur", nama: "Ukur", ikon: "\u{270B}" },
  { id: "petak", nama: "Petak", ikon: "\u{1F7E9}" },
  { id: "pesan", nama: "Pesan", ikon: "\u{1F4E6}" },
];
const WARNA_ALAT: Record<AlatSim, [string, string, string]> = { sedotan: ["#F9A8D4", "#BE185D", "\u{1F964}"], tongkat: ["#D6A15E", "#78350F", "\u{1F962}"] };
const SEL = 22;
const X0 = 8;

export default function SimulasiPapanLantai({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLantai) => void }) {
  const [k, setK] = useState<KeadaanLantai>(() => awalLantai(D[0].id));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanLantai, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const benda = D.find((x) => x.id === k.benda) ?? D[0];
  const lebar = LEBAR_ALAT[k.pakai];
  const tempat = tempatUkur(k, D);
  const selesai = ukurSelesai(k, D);
  const [fill, garis, ikon] = WARNA_ALAT[k.pakai];
  const sel = selisihKira(k, D);

  const taruh = (rapat: boolean) => {
    const baru = taruhSatuan(k, D, rapat);
    if (baru === k) return;
    const s = selisihKira(baru, D);
    ubah(baru, !rapat ? "Satuan melompat dan meninggalkan celah. Panjang yang terlewat tidak terhitung." : ukurSelesai(baru, D) && baru.celah === 0 ? `Sampai di ujung. Hasilnya ${kata(baru.dipasang)} ${NAMA_ALAT[baru.pakai]}.${s === null ? "" : s === 0 ? " Perkiraanmu tepat." : ` Selisih dengan perkiraanmu ${kata(s)}.`}` : kata(baru.dipasang));
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_LANTAI}</p>

      {k.pesan !== null ? (
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#14532D] p-3 text-center">
          <style>{`@keyframes pl-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(140px) rotate(300deg)}}`}</style>
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="absolute top-0 block h-2.5 w-1.5 rounded-sm" style={{ left: `${(i * 37) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `pl-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }} aria-hidden="true" />
          ))}
          <p className="text-4xl" aria-hidden="true">
            {"\u{1F6A9}"}
          </p>
          <p className="mt-1 text-base font-black text-[#FEF08A]">
            Pesanan: papan sisi lantai {D.find((x) => x.id === ID_LANTAI)!.panjang / LEBAR_ALAT[k.pesan]} {NAMA_ALAT[k.pesan]}. Rumah pohon Abang selesai, bendera dikibarkan!
          </p>
          <button type="button" className={`${tombol} mt-2`} onClick={() => ubah(tutupPesanan(k), "Pesanan ditutup. Main lagi dari awal.")}>
            {"\u{1F504}"} Main lagi
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat bengkel">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModeLantai(k, m.id), kalimatLantai(pilihModeLantai(k, m.id), D))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "ukur" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#92400E] bg-[#FEF3C7] p-2">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih benda">
            {D.map((b) => (
              <button key={b.id} type="button" aria-pressed={k.benda === b.id} className={saklar(k.benda === b.id)} onClick={() => ubah(pilihBendaLantai(k, b.id), `${b.nama}. Catat perkiraan, lalu ukur dari ujung.`)}>
                {b.ikon} {b.nama}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-sm font-black text-[#78350F]">Alat:</span>
            {(["sedotan", "tongkat"] as const).map((a) => (
              <button key={a} type="button" aria-pressed={k.pakai === a} className={saklar(k.pakai === a)} onClick={() => ubah(pilihAlatLantai(k, a), `${NAMA_ALAT[a]}. ${a === "tongkat" ? "Tongkat kayu lebih panjang, angkanya akan lebih sedikit." : "Sedotan lebih pendek, angkanya akan lebih banyak."}`)}>
                {WARNA_ALAT[a][2]} {NAMA_ALAT[a]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-sm font-black text-[#78350F]">Perkiraan:</span>
            <button type="button" className={tombol} aria-label="Kurangi perkiraan" onClick={() => ubah(aturKira(k, (k.kira ?? benda.panjang / lebar) - 1))}>
              −
            </button>
            <span className="min-w-[3.5rem] rounded-lg bg-white px-2 py-1 text-center text-base font-black text-[#1C01A5]">{k.kira ?? "?"}</span>
            <button type="button" className={tombol} aria-label="Tambah perkiraan" onClick={() => ubah(aturKira(k, (k.kira ?? benda.panjang / lebar) + 1), k.kira === null ? "Perkiraan dicatat. Sekarang ukur." : undefined)}>
              +
            </button>
          </div>
          <svg viewBox="0 0 300 120" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" aria-label={`${benda.nama} diukur dengan ${NAMA_ALAT[k.pakai]}`}>
            <rect x={X0} y={22} width={benda.panjang * SEL} height={26} rx={6} fill="#E8B979" stroke="#92400E" strokeWidth={2} />
            <text x={X0 + 13} y={40} textAnchor="middle" fontSize={15}>
              {benda.ikon}
            </text>
            <text x={X0 + benda.panjang * SEL - 4} y={17} textAnchor="end" fontSize={9} fontWeight={900} fill="#92400E">
              {benda.nama}
            </text>
            <line x1={X0} x2={X0} y1={18} y2={104} stroke="#DC2626" strokeWidth={1.4} strokeDasharray="4 3" />
            <line x1={X0 + benda.panjang * SEL} x2={X0 + benda.panjang * SEL} y1={18} y2={104} stroke="#DC2626" strokeWidth={1.4} strokeDasharray="4 3" />
            {Array.from({ length: k.dipasang + k.celah }, (_, i) => {
              /* Celah ditaruh paling akhir dalam hitungan, tetapi digambar di tempat terakhir supaya jelas ada yang terlewat. */
              const sebagaiCelah = i >= k.dipasang;
              return sebagaiCelah ? (
                <rect key={i} x={X0 + i * lebar * SEL + 1} y={62} width={lebar * SEL - 2} height={26} rx={3} fill="#FEE2E2" stroke="#DC2626" strokeWidth={1.4} strokeDasharray="4 3" />
              ) : (
                <g key={i}>
                  <rect x={X0 + i * lebar * SEL + 0.5} y={62} width={lebar * SEL - 1} height={26} rx={6} fill={fill} stroke={garis} strokeWidth={1.5} />
                  <text x={X0 + i * lebar * SEL + (lebar * SEL) / 2} y={79} textAnchor="middle" fontSize={lebar > 1 ? 15 : 12}>
                    {ikon}
                  </text>
                </g>
              );
            })}
            {!selesai ? <rect x={X0 + (k.dipasang + k.celah) * lebar * SEL + 1} y={62} width={lebar * SEL - 2} height={26} rx={4} fill="none" stroke="#1C01A5" strokeWidth={1} strokeDasharray="3 3" opacity={0.5} /> : null}
            <text x={150} y={112} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
              satuan: {k.dipasang} dari {tempat}
            </text>
          </svg>
          <div className="flex flex-wrap justify-center gap-1.5">
            <button type="button" className={tombol} disabled={selesai} onClick={() => taruh(true)}>
              {"\u{2705}"} Taruh rapat
            </button>
            <button type="button" className={tombol} disabled={selesai} onClick={() => taruh(false)}>
              {"\u{26A0}\u{FE0F}"} Taruh loncat
            </button>
            <button type="button" className={tombol} onClick={() => ubah(ulangUkur(k), "Ukur diulang dari ujung.")}>
              {"\u{1F504}"} Ulang ukur
            </button>
          </div>
          {selesai && k.celah === 0 ? (
            <p className="rounded-xl bg-white px-2 py-1 text-center text-sm font-black text-[#15803D]">
              Hasil: {k.dipasang} {NAMA_ALAT[k.pakai]}
              {sel === null ? "" : sel === 0 ? " · perkiraanmu tepat" : ` · selisih dengan perkiraanmu ${sel}`}
            </p>
          ) : null}
        </div>
      ) : null}

      {k.mode === "petak" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#65A30D] bg-[#F7FEE7] p-2 text-center">
          <p className="text-sm font-black text-[#3F6212]">{"\u{1F7E9}"} Dua pita di kertas berpetak (mulai dari ujung kiri)</p>
          <svg viewBox="0 0 300 100" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" aria-label="Pita merah dan biru di kertas berpetak">
            {[0, 1].map((b) => {
              const n = b === 0 ? k.merah : k.biru;
              const y = 12 + b * 40;
              return (
                <g key={b}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <rect key={i} x={X0 + i * SEL} y={y} width={SEL} height={SEL} fill={i < n ? (b === 0 ? "#FCA5A5" : "#93C5FD") : "#ECFCCB"} stroke="#65A30D" strokeWidth={0.9} />
                  ))}
                  <rect x={X0} y={y} width={n * SEL} height={SEL} fill="none" stroke={b === 0 ? "#B91C1C" : "#1D4ED8"} strokeWidth={n > 0 ? 2 : 0} />
                </g>
              );
            })}
            <text x={150} y={92} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
              merah {k.merah} kotak · biru {k.biru} kotak
            </text>
          </svg>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(["merah", "biru"] as const).map((w) => (
              <span key={w} className="flex items-center gap-1 rounded-full border-2 border-[#65A30D] bg-white px-2 py-0.5">
                <span className="text-sm font-black text-[#1C01A5]">{w}</span>
                <button type="button" className={tombol} aria-label={`Kurangi kotak ${w}`} onClick={() => ubah(aturPita(k, w, -1))}>
                  −
                </button>
                <button type="button" className={tombol} aria-label={`Tambah kotak ${w}`} onClick={() => {
                  const baru = aturPita(k, w, 1);
                  ubah(baru, kalimatLantai(baru, D));
                }}>
                  +
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {k.mode === "pesan" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#475569] bg-[#FEF9C3] p-2 text-center">
          <p className="text-sm font-black text-[#1E293B]">{"\u{1F4E6}"} Pesanan papan lantai untuk Kakek Jaya</p>
          <p className="text-xs font-bold text-[#1E293B]/80">Ukur {D.find((x) => x.id === ID_LANTAI)?.nama} di alat Ukur, rapat tanpa celah. Lalu kirim pesanan dengan angka dan nama alat.</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {(["sedotan", "tongkat"] as const).map((a) => {
              const siapKirim = sudahDiukur(k, ID_LANTAI, a);
              return (
                <button key={a} type="button" className={tombol} disabled={!siapKirim || k.pesan !== null} onClick={() => ubah(kirimPesanan(k, a, ID_LANTAI), "Pesanan papan dikirim ke Kakek Jaya, lengkap dengan angka dan nama alatnya. Rumah pohon Abang selesai!")}>
                  {WARNA_ALAT[a][2]} Pesan: {D.find((x) => x.id === ID_LANTAI)!.panjang / LEBAR_ALAT[a]} {NAMA_ALAT[a]} {siapKirim ? "" : "(belum diukur)"}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatLantai(k, D)}
      </p>
    </div>
  );
}
