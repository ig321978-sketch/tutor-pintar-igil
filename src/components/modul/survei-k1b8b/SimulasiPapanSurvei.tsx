"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  ANAK_SIM,
  JENIS_SIM,
  URUTAN_SIM,
  aturGambar,
  aturMendatar,
  aturRapat,
  awalSurvei,
  centangGanda,
  centangJenis,
  diagramBenar,
  jenisPaling,
  kalimatSurvei,
  kirimLaporan,
  panggilAnak,
  pilihBanding,
  pilihModeSurvei,
  pilihanAnak,
  semuaDitanya,
  tabelSurvei,
  tutupLaporan,
  type KeadaanSurvei,
  type ModeSurvei,
} from "./logika";
import { MISI_SURVEI } from "./data";
import { WARNA_KOLOM, titikBintang } from "./GambarSurvei";

/**
 * Simulasi Kelas 1 Bab 8 Sub-Bab B: Misi Papan Survei, Papan Survei (sekaligus penutup bab). Topik dan bilangan berbeda dari Story.
 * Eksplorasi bebas tanpa skor, empat alat untuk satu antrean anak-anak kampung: Tanya (panggil anak, ketuk jenis yang dipilih untuk mencentang, satu anak satu
 * jawaban), Tabel (centang dihitung ke dalam tabel), Diagram (tambah gambar tiap jenis, tegak atau mendatar, rapat atau renggang), Banding (paling banyak,
 * paling sedikit, sama banyak, selisih), lalu perayaan akhir cerita bab saat laporan survei dikirim kepada Pak Pos.
 */
const MODE: { id: ModeSurvei; nama: string; ikon: string }[] = [
  { id: "tanya", nama: "Tanya", ikon: "\u{1F9D2}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
  { id: "diagram", nama: "Diagram", ikon: "\u{2B50}" },
  { id: "banding", nama: "Banding", ikon: "\u{2696}\u{FE0F}" },
];
const SEL = 14;

export default function SimulasiPapanSurvei({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSurvei) => void }) {
  const [k, setK] = useState<KeadaanSurvei>(awalSurvei);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanSurvei, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] bg-white text-[#0F766E]"}`;
  const tabel = tabelSurvei(k);
  const pilihan = pilihanAnak(k);
  const semua = semuaDitanya(k);

  const centang = (j: number) => {
    const baru = centangJenis(k, j);
    if (!baru) {
      ubah(k, pilihan === null ? "Panggil anak berikutnya dulu." : `Anak ini memilih ${JENIS_SIM[pilihan].nama}. Centang jenis yang dipilihnya.`);
      return;
    }
    ubah(baru, semuaDitanya(baru) ? "Semua anak sudah ditanya dan dicentang. Lihat tabel dan buat diagramnya." : `Dicentang: ${JENIS_SIM[j].nama}. Satu anak, satu jawaban.`);
  };

  /** Satu gambar bintang ke-i pada jenis j untuk diagram buatan anak. */
  const bintangDiagram = (j: number, i: number, x: number, y: number) => <polygon key={`${j}-${i}`} points={titikBintang(x, y, 6.2)} fill={WARNA_KOLOM[j]} stroke="#1C01A5" strokeWidth={0.6} />;
  const jarak = k.rapat ? SEL : SEL * 1.55;

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_SURVEI}</p>

      {k.lapor ? (
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#134E4A] p-3 text-center">
          <style>{`@keyframes ps-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(140px) rotate(300deg)}}`}</style>
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="absolute top-0 block h-2.5 w-1.5 rounded-sm" style={{ left: `${(i * 37) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `ps-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }} aria-hidden="true" />
          ))}
          <p className="text-4xl" aria-hidden="true">
            {"\u{1F69A}"}
          </p>
          <p className="mt-1 text-base font-black text-[#FEF08A]">
            Laporan terkirim: {JENIS_SIM.map((j, i) => `${j.nama} ${tabel[i]}`).join(", ")}. Mobil pustaka berangkat membawa spanduk Perpustakaan Keliling!
          </p>
          <button type="button" className={`${tombol} mt-2`} onClick={() => ubah(tutupLaporan(k), "Laporan ditutup. Main lagi dari mana saja.")}>
            {"\u{1F504}"} Main lagi
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat papan survei">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModeSurvei(k, m.id), kalimatSurvei(pilihModeSurvei(k, m.id)))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "tanya" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#92400E] bg-[#FEF3C7] p-2 text-center">
          <div className="flex flex-wrap justify-center gap-0.5" aria-label={`Antrean ${ANAK_SIM} anak`}>
            {URUTAN_SIM.map((_, i) => (
              <span key={i} className={`flex flex-col items-center text-lg leading-none ${i === k.ditanya && k.menunggu ? "animate-pulse" : ""}`} aria-hidden="true">
                <span className="text-[10px]">{i < k.ditanya ? "\u{2705}" : " "}</span>
                <span style={{ opacity: i < k.ditanya ? 0.5 : 1 }}>{"\u{1F9D2}"}</span>
              </span>
            ))}
          </div>
          {k.menunggu && pilihan !== null ? (
            <p className="rounded-xl bg-white px-2 py-1 text-sm font-black text-[#1C01A5]">
              {"\u{1F4AC}"} Aku pilih {JENIS_SIM[pilihan].ikon} {JENIS_SIM[pilihan].nama}.
            </p>
          ) : (
            <p className="rounded-xl bg-white/80 px-2 py-1 text-sm font-black text-[#78350F]">{semua ? "Semua anak sudah ditanya." : "Panggil anak berikutnya di antrean."}</p>
          )}
          <button type="button" className={tombol} disabled={k.menunggu || semua} onClick={() => ubah(panggilAnak(k), kalimatSurvei(panggilAnak(k)))}>
            {"\u{1F4E3}"} Panggil anak berikutnya
          </button>
          <div className="rounded-xl border-4 border-[#475569] bg-[#FEF9C3] p-2">
            <p className="text-xs font-black text-[#1E293B]">{"\u{1F4DD}"} Lembar centang: ketuk jenis yang dipilih anak</p>
            <div className="mt-1 grid grid-cols-4 gap-1" role="group" aria-label="Lembar centang">
              {JENIS_SIM.map((j, i) => (
                <div key={j.nama} className="space-y-1">
                  <button type="button" disabled={!k.menunggu} onClick={() => centang(i)} className="min-h-[48px] w-full rounded-xl border-2 border-[#1C01A5] bg-white text-sm font-black text-[#1C01A5] disabled:opacity-60" aria-label={`Centang ${j.nama}`}>
                    <span className="block text-xl">{j.ikon}</span>
                    {j.nama}
                  </button>
                  <div className="min-h-[2.2rem] text-xs leading-tight">{"\u{2705}".repeat(tabel[i])}</div>
                </div>
              ))}
            </div>
            <button type="button" className={`${tombol} mt-1`} disabled={k.ditanya === 0 || k.menunggu} onClick={() => ubah(centangGanda(k), "Satu anak hanya boleh satu jawaban. Centang kedua ditolak.")}>
              {"\u{26A0}\u{FE0F}"} Coba centang dua jawaban
            </button>
          </div>
        </div>
      ) : null}

      {k.mode === "tabel" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#0F766E] bg-[#F0FDFA] p-2 text-center">
          <p className="text-sm font-black text-[#134E4A]">{"\u{1F4CB}"} Tabel jawaban anak-anak</p>
          <table className="mx-auto w-full max-w-md border-collapse text-sm font-black text-[#1C01A5]">
            <thead>
              <tr>
                {JENIS_SIM.map((j) => (
                  <th key={j.nama} className="border-2 border-[#0F766E] bg-[#CCFBF1] px-1 py-1">
                    {j.ikon} {j.nama}
                  </th>
                ))}
                <th className="border-2 border-[#0F766E] bg-[#FEF9C3] px-1 py-1">Semua</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {tabel.map((n, i) => (
                  <td key={i} className="border-2 border-[#0F766E] bg-white px-1 py-2 text-lg">
                    {n}
                  </td>
                ))}
                <td className="border-2 border-[#0F766E] bg-[#FEF9C3] px-1 py-2 text-lg">{k.ditanya}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs font-bold text-[#134E4A]/80">
            {k.ditanya === 0 ? "Tabel masih kosong. Tanyai anak-anak di alat Tanya." : `Paling banyak: ${JENIS_SIM[jenisPaling(tabel, "banyak")].nama}. Paling sedikit: ${JENIS_SIM[jenisPaling(tabel, "sedikit")].nama}.`}
          </p>
        </div>
      ) : null}

      {k.mode === "diagram" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#1D4ED8] bg-white p-2 text-center">
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilihan diagram">
            <button type="button" aria-pressed={!k.mendatar} className={saklar(!k.mendatar)} onClick={() => ubah(aturMendatar(k, false), "Diagram tegak.")}>
              Tegak
            </button>
            <button type="button" aria-pressed={k.mendatar} className={saklar(k.mendatar)} onClick={() => ubah(aturMendatar(k, true), "Diagram mendatar. Datanya tetap sama.")}>
              Mendatar
            </button>
            <button type="button" aria-pressed={k.rapat} className={saklar(k.rapat)} onClick={() => ubah(aturRapat(k, true), kalimatSurvei(aturRapat(k, true)))}>
              Rapat
            </button>
            <button type="button" aria-pressed={!k.rapat} className={saklar(!k.rapat)} onClick={() => ubah(aturRapat(k, false), "Gambar renggang membuat kolom tampak lebih tinggi. Yang dihitung banyak gambarnya.")}>
              Renggang
            </button>
          </div>
          <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white" style={{ backgroundImage: "linear-gradient(#DBEAFE 1px,transparent 1px),linear-gradient(90deg,#DBEAFE 1px,transparent 1px)", backgroundSize: "14px 14px" }} aria-label="Diagram gambar buatanmu">
            <text x={150} y={16} textAnchor="middle" fontSize={10} fontWeight={900} fill="#1C01A5">
              Hewan peliharaan anak kampung
            </text>
            {!k.mendatar ? (
              <g>
                <line x1={28} x2={290} y1={168} y2={168} stroke="#1C01A5" strokeWidth={2} />
                <line x1={28} x2={28} y1={30} y2={168} stroke="#1C01A5" strokeWidth={2} />
                {Array.from({ length: 9 }, (_, i) => (
                  <text key={i} x={22} y={168 - (i + 0.5) * SEL + 2.6} textAnchor="end" fontSize={7} fontWeight={700} fill="#1C01A5">
                    {i + 1}
                  </text>
                ))}
                {JENIS_SIM.map((j, c) => {
                  const x = 62 + c * 62;
                  return (
                    <g key={j.nama}>
                      {Array.from({ length: k.gambar[c] }, (_, i) => bintangDiagram(c, i, x, 168 - (i * (jarak / SEL) + 0.5) * SEL))}
                      <text x={x} y={182} textAnchor="middle" fontSize={9} fontWeight={900} fill="#1C01A5">
                        {j.nama}
                      </text>
                    </g>
                  );
                })}
              </g>
            ) : (
              <g>
                <line x1={72} x2={72} y1={28} y2={170} stroke="#1C01A5" strokeWidth={2} />
                <line x1={72} x2={290} y1={170} y2={170} stroke="#1C01A5" strokeWidth={2} />
                {JENIS_SIM.map((j, c) => {
                  const y = 48 + c * 32;
                  return (
                    <g key={j.nama}>
                      <text x={68} y={y + 3} textAnchor="end" fontSize={9} fontWeight={900} fill="#1C01A5">
                        {j.nama}
                      </text>
                      {Array.from({ length: k.gambar[c] }, (_, i) => bintangDiagram(c, i, 80 + (i * (jarak / SEL) + 0.5) * SEL, y))}
                    </g>
                  );
                })}
                {Array.from({ length: 9 }, (_, i) => (
                  <text key={i} x={80 + (i + 0.5) * SEL} y={182} textAnchor="middle" fontSize={7} fontWeight={700} fill="#1C01A5">
                    {i + 1}
                  </text>
                ))}
              </g>
            )}
          </svg>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="group" aria-label="Tambah atau kurangi gambar tiap jenis">
            {JENIS_SIM.map((j, c) => (
              <div key={j.nama} className="flex items-center justify-center gap-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1">
                <button type="button" className="min-h-[40px] min-w-[40px] rounded-full border-2 border-[#1C01A5] bg-white text-lg font-black text-[#1C01A5] disabled:opacity-30" aria-label={`Kurangi ${j.nama}`} disabled={k.gambar[c] === 0} onClick={() => ubah(aturGambar(k, c, -1))}>
                  −
                </button>
                <span className="text-xs font-black text-[#1C01A5]">{j.nama}</span>
                <button
                  type="button"
                  className="min-h-[40px] min-w-[40px] rounded-full border-2 border-[#15803D] bg-[#DCFCE7] text-lg font-black text-[#15803D] disabled:opacity-30"
                  aria-label={`Tambah ${j.nama}`}
                  onClick={() => {
                    const baru = aturGambar(k, c, 1);
                    ubah(baru, diagramBenar(baru) ? kalimatSurvei(baru) : undefined);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <button type="button" className={tombol} disabled={!diagramBenar(k) || k.lapor} onClick={() => ubah(kirimLaporan(k), kalimatSurvei(kirimLaporan(k)))}>
            {"\u{1F4E8}"} Kirim laporan ke Pak Pos {diagramBenar(k) ? "" : "(diagram belum sama dengan tabel)"}
          </button>
        </div>
      ) : null}

      {k.mode === "banding" ? (
        <div className="space-y-2 rounded-2xl border-4 border-[#A16207] bg-[#FFFBEB] p-2 text-center">
          <p className="text-sm font-black text-[#78350F]">{"\u{2696}\u{FE0F}"} Pilih dua jenis untuk dibandingkan</p>
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih jenis">
            {JENIS_SIM.map((j, i) => (
              <button key={j.nama} type="button" aria-pressed={k.bandingA === i || k.bandingB === i} className={saklar(k.bandingA === i || k.bandingB === i)} onClick={() => ubah(pilihBanding(k, i), kalimatSurvei(pilihBanding(k, i)))}>
                {j.ikon} {j.nama} {tabel[i]}
              </button>
            ))}
          </div>
          <p className="rounded-xl bg-white px-2 py-1 text-sm font-black text-[#1C01A5]">{kalimatSurvei(k)}</p>
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatSurvei(k)}
      </p>
    </div>
  );
}
