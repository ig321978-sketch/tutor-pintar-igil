"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  alatBenar,
  awalUkur,
  bacaGeser,
  diNol,
  geserBenda,
  kalimatAlat,
  kalimatBaca,
  kalimatGeser,
  kalimatPosisi,
  kalimatSelisih,
  kata,
  kataSatuan,
  mulaiLagiUkur,
  periksaAlat,
  periksaBaca,
  periksaGeser,
  periksaSelisih,
  petunjukAlat,
  petunjukBaca,
  petunjukGeser,
  petunjukSelisih,
  pilihanAlat,
  pilihanBaca,
  pilihanGeser,
  pilihanSelisih,
  pilihAlat,
  pilihBaca,
  pilihGeser,
  pilihModeUkur,
  pilihSelisih,
  selisihDari,
  targetAlat,
  targetBaca,
  targetGeser,
  targetSelisih,
  ujungKanan,
  type KeadaanUkur,
  type ModeUkur,
} from "./logika";
import { MISI_UKUR_TEKS, SKALA_GESER } from "./data-sim";
import { EMOJI_BENDA, Gambar, SkalaSvg } from "./GambarUkur";
import { maksSkala } from "./logika-cpa";

/**
 * Simulasi Kelas 3 Bab 3 Sub-Bab A: Meja Ukur (Misi Ukur). Ukuran sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Geser (geser benda sampai ujung kirinya tepat di angka nol, alat menolak membaca sebelum itu, lalu baca panjangnya), Baca (tulis hasil ukur dengan satuan),
 * Alat (pilih penggaris atau meteran), dan Selisih (cari selisih dua batang).
 */
const MODE: { id: ModeUkur; nama: string; ikon: string }[] = [
  { id: "geser", nama: "Geser", ikon: "\u{2194}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F4CF}" },
  { id: "alat", nama: "Alat", ikon: "\u{1F527}" },
  { id: "selisih", nama: "Selisih", ikon: "\u{2796}" },
];

export default function SimulasiMejaUkur({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUkur) => void }) {
  const [k, setK] = useState<KeadaanUkur>(() => awalUkur());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanUkur, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] bg-white text-[#0F766E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeUkur) => {
    ubah(
      pilihModeUkur(k, m),
      m === "geser" ? "Geser benda sampai ujung kirinya tepat di angka nol." : m === "baca" ? "Pilih cara menulis hasil ukur yang tepat." : m === "alat" ? "Pilih alat ukur yang tepat untuk benda itu." : "Cari selisih panjang dua batang.",
    );
  };
  const geser = (d: number) => {
    const r = geserBenda(k, d);
    if (!r.ok) return salah(d < 0 ? "Ujung kiri benda sudah di angka nol, tidak bisa lebih ke kiri." : "Benda sudah di ujung penggaris, tidak bisa lebih ke kanan.");
    ubah(r.k, kalimatPosisi(r.k));
  };
  const baca = () => {
    const r = bacaGeser(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukGeser(k));
    }
    ubah(r.k, `Ujung kiri tepat di angka nol. Angka di ujung kanan adalah ${kata(ujungKanan(r.k))}. Pilih bacaan yang tepat.`);
  };
  const periksaGeserKu = () => {
    const r = periksaGeser(k);
    if (r.ok) return ubah(r.k, `Betul! ${targetGeser(k).benda} panjangnya ${kata(targetGeser(k).panjang)} sentimeter.`);
    ubah(r.k);
    salah(petunjukGeser(k));
  };
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! Ditulis ${kata(targetBaca(k).panjang)} ${kataSatuan(targetBaca(k).sat)}, lengkap dengan satuan.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  const periksaAlatKu = () => {
    const r = periksaAlat(k);
    if (r.ok) return ubah(r.k, `Betul! ${targetAlat(k).benda} diukur dengan ${alatBenar(targetAlat(k))}.`);
    ubah(r.k);
    salah(petunjukAlat(k));
  };
  const periksaSelisihKu = () => {
    const r = periksaSelisih(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(targetSelisih(k).a)} dikurangi ${kata(targetSelisih(k).b)} sama dengan ${kata(selisihDari(targetSelisih(k)))}.`);
    ubah(r.k);
    salah(petunjukSelisih(k));
  };

  const tg = targetGeser(k);
  const tb = targetBaca(k);
  const ta = targetAlat(k);
  const ts = targetSelisih(k);
  const pilGeser = pilihanGeser(k);
  const pilBaca = pilihanBaca(k);
  const pilAlat = pilihanAlat(k);
  const pilSelisih = pilihanSelisih(k);
  const warnaBenda = "#FDBA74";

  return (
    <div className="space-y-3" data-uji="simulasi-meja-ukur">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0F766E] bg-[#F0FDFA] p-2">
        <p className="text-sm font-black text-[#134E4A]">Misi Meja Ukur</p>
        <p className="text-xs font-bold text-[#134E4A]/80">{MISI_UKUR_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "geser" ? (
          <div className="space-y-2">
            <Gambar label="Benda di atas penggaris" judul={diNol(k) ? "ujung kiri tepat di angka nol" : "geser sampai ujung kiri di angka nol"}>
              <SkalaSvg maks={SKALA_GESER} sat="cm" rupa="benda" batang={[{ dari: k.posisi, ke: ujungKanan(k), y: 80, warna: warnaBenda, emoji: EMOJI_BENDA[tg.benda], label: tg.benda }]} />
              <text x={150} y={186} textAnchor="middle" fontSize={12} fontWeight={900} fill={diNol(k) ? "#15803D" : "#B45309"}>
                ujung kiri di angka {k.posisi}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geser(-1)} aria-label="Geser benda satu sentimeter ke kiri">
                {"\u{25C0}"} 1
              </button>
              <button type="button" className={tombol} onClick={() => geser(1)} aria-label="Geser benda satu sentimeter ke kanan">
                1 {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={baca}>
                {"\u{1F4CF}"} Baca
              </button>
            </div>
            {k.sudahBaca ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Berapa panjang benda itu?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bacaan">
                  {pilGeser.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihGeser(k, i))} aria-pressed={k.geserPilih === i} className={pilihan(k.geserPilih === i)}>
                      {p} cm
                    </button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button type="button" className={tombol} onClick={periksaGeserKu}>
                    {"\u{2705}"} Periksa
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <Gambar label="Benda di angka nol" judul="ujung kiri sudah tepat di angka nol">
              <SkalaSvg maks={maksSkala(tb.panjang, tb.sat)} sat={tb.sat} rupa="benda" batang={[{ dari: 0, ke: tb.panjang, y: 80, warna: warnaBenda, label: tb.benda }]} />
              <text x={150} y={186} textAnchor="middle" fontSize={12} fontWeight={900} fill="#B45309">
                tulis hasil ukur dengan satuan
              </text>
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih tulisan">
              {pilBaca.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "alat" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#0F766E] bg-[#F0FDFA] px-2 py-2 text-center text-xl font-black text-[#1C01A5]">
              {ta.benda}: {ta.panjang} {ta.sat}
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Alat ukur apa yang paling tepat?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih alat ukur">
              {pilAlat.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihAlat(k, i))} aria-pressed={k.alatPilih === i} className={pilihan(k.alatPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaAlatKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "selisih" ? (
          <div className="space-y-2">
            <Gambar label="Dua batang diukur dari nol" judul="dua batang, dua panjang">
              <SkalaSvg
                maks={maksSkala(ts.a, "cm")}
                sat="cm"
                rupa="benda"
                pita
                batang={[
                  { dari: 0, ke: ts.a, y: 34, h: 22, warna: "#FCA5A5", label: "pertama" },
                  { dari: 0, ke: ts.b, y: 76, h: 22, warna: "#BBF7D0", label: "kedua" },
                ]}
              />
              <text x={150} y={186} textAnchor="middle" fontSize={12} fontWeight={900} fill="#B45309">
                selisih panjang = ?
              </text>
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih selisih">
              {pilSelisih.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihSelisih(k, i))} aria-pressed={k.selisihPilih === i} className={pilihan(k.selisihPilih === i)}>
                  {p} cm
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSelisihKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiUkur(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "geser" ? kalimatGeser(k) : k.mode === "baca" ? kalimatBaca(k) : k.mode === "alat" ? kalimatAlat(k) : kalimatSelisih(k))}
      </p>
    </div>
  );
}
