"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK3B4 } from "../eja-k3b4";
import {
  awalBilah,
  bacaUkur,
  banyakSisiSim,
  beriHuruf,
  diNol,
  geserBilah,
  hurufBesar,
  kalimatJalan,
  kalimatKenali,
  kalimatPosisi,
  kalimatSisi,
  kalimatUbah,
  kalimatUkur,
  kata,
  mulaiLagiBilah,
  periksaJalan,
  periksaKenali,
  periksaSisi,
  periksaUbah,
  periksaUkur,
  petunjukJalan,
  petunjukKenali,
  petunjukSisi,
  petunjukUbah,
  petunjukUkur,
  pilihanKenali,
  pilihanSisi,
  pilihanUbah,
  pilihanUkur,
  pilihJalan,
  pilihKenali,
  pilihModeBilah,
  pilihSisi,
  pilihUbah,
  pilihUkur,
  sisiBernama,
  tarikUjung,
  targetKenali,
  targetSisi,
  targetUbah,
  targetUkur,
  teksBenarUbah,
  ujungKananBilah,
  urutanJalan,
  type KeadaanBilah,
  type ModeBilah,
} from "./logika";
import { MISI_BILAH_TEKS, SKALA_BILAH } from "./data-sim";
import { BangunSvg, BenangSvg, Gambar, JenisSvg, SkalaMm } from "./GambarBilah";

/**
 * Simulasi Kelas 3 Bab 4 Sub-Bab A: Meja Bilah (Misi Rangka). Ukuran sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat:
 * Kenali (tarik ujung gambar lalu pilih jenisnya), Jalan (pilih benang terpendek antara dua paku), Ukur (geser bilah sampai ujung kirinya tepat di angka nol,
 * alat menolak membaca sebelum itu), Ubah (tulis ukuran dalam milimeter atau sentimeter desimal), dan Sisi (beri huruf pada titik sudut lalu hitung sisi).
 */
const MODE: { id: ModeBilah; nama: string; ikon: string }[] = [
  { id: "kenali", nama: "Kenali", ikon: "\u{1F50D}" },
  { id: "jalan", nama: "Jalan", ikon: "\u{1F9F5}" },
  { id: "ukur", nama: "Ukur", ikon: "\u{1F4CF}" },
  { id: "ubah", nama: "Ubah", ikon: "\u{1F522}" },
  { id: "sisi", nama: "Sisi", ikon: "\u{1F3F7}" },
];
const WARNA_JALAN = ["#B45309", "#0F766E", "#7C3AED"];

export default function SimulasiMejaBilah({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBilah) => void }) {
  const [k, setK] = useState<KeadaanBilah>(() => awalBilah());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanBilah, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;

  const ganti = (m: ModeBilah) => {
    ubah(
      pilihModeBilah(k, m),
      m === "kenali"
        ? "Tarik ujung gambar, lalu pilih jenis garisnya."
        : m === "jalan"
          ? "Pilih benang yang paling pendek antara dua paku."
          : m === "ukur"
            ? "Geser bilah sampai ujung kirinya tepat di angka nol."
            : m === "ubah"
              ? "Tulis ukuran yang sama dengan cara yang diminta."
              : "Beri huruf pada titik sudut, lalu hitung sisinya.",
    );
  };

  const tarik = (sisi: "kiri" | "kanan") => {
    const r = tarikUjung(k, sisi);
    ubah(r.k);
    if (r.ok) {
      setCatatan(r.pesan);
      speakGuru(r.pesan);
    } else salah(r.pesan);
  };
  const periksaKenaliKu = () => {
    const r = periksaKenali(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(targetKenali(k).benda)} berjenis ${targetKenali(k).jenis}.`);
    ubah(r.k);
    salah(petunjukKenali(k));
  };
  const periksaJalanKu = () => {
    const r = periksaJalan(k);
    if (r.ok) return ubah(r.k, "Betul! Benang yang lurus paling pendek antara dua paku.");
    ubah(r.k);
    salah(petunjukJalan(k));
  };
  const geser = (d: number) => {
    const r = geserBilah(k, d);
    if (!r.ok) return salah(d < 0 ? "Ujung kiri bilah sudah di angka nol, tidak bisa lebih ke kiri." : "Bilah sudah di ujung penggaris, tidak bisa lebih ke kanan.");
    ubah(r.k, kalimatPosisi(r.k));
  };
  const baca = () => {
    const r = bacaUkur(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukUkur(k));
    }
    ubah(r.k, `Ujung kiri tepat di angka nol. Angka di ujung kanan adalah ${kata(ujungKananBilah(r.k))} milimeter. Pilih bacaan yang tepat.`);
  };
  const periksaUkurKu = () => {
    const r = periksaUkur(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(targetUkur(k).benda)} panjangnya ${kata(targetUkur(k).panjang)} milimeter.`);
    ubah(r.k);
    salah(petunjukUkur(k));
  };
  const periksaUbahKu = () => {
    const r = periksaUbah(k);
    if (r.ok) return ubah(r.k, `Betul! Ditulis ${ejaK3B4(teksBenarUbah(k))}.`);
    ubah(r.k);
    salah(petunjukUbah(k));
  };
  const huruf = () => {
    const r = beriHuruf(k);
    if (!r.ok) return salah(banyakSisiSim(k) === 0 ? "Bangun bundar tidak punya titik sudut, jadi tidak ada yang perlu diberi huruf." : "Semua titik sudut sudah bernama. Pilih banyak sisinya.");
    ubah(r.k, `Titik sudut ${["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam"][r.k.huruf - 1] ?? r.k.huruf} diberi nama ${targetSisi(k).huruf[r.k.huruf - 1]}.`);
  };
  const periksaSisiKu = () => {
    const r = periksaSisi(k);
    if (r.ok) return ubah(r.k, banyakSisiSim(k) === 0 ? `Betul! ${hurufBesar(targetSisi(k).benda)} bundar dan tidak punya sisi lurus.` : `Betul! ${hurufBesar(targetSisi(k).benda)} punya ${kata(banyakSisiSim(k))} sisi.`);
    ubah(r.k);
    salah(petunjukSisi(k));
  };

  const tk = targetKenali(k);
  const tu = targetUkur(k);
  const tb = targetUbah(k);
  const ts = targetSisi(k);
  const pilKenali = pilihanKenali(k);
  const pilUkur = pilihanUkur(k);
  const pilUbah = pilihanUbah(k);
  const pilSisi = pilihanSisi(k);
  const urutan = urutanJalan(k);
  const bangun = { nama: ts.nama as "persegi" | "segilima" | "lingkaran", huruf: ts.huruf };

  return (
    <div className="space-y-3" data-uji="simulasi-meja-bilah">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Meja Bilah</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_BILAH_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "kenali" ? (
          <div className="space-y-2">
            <Gambar label="Gambar garis yang bisa ditarik" judul={`${tk.benda}: tarik ujungnya`}>
              <JenisSvg jenis={tk.jenis} x={100} y={98} w={100} warna="#92400E" kiri={k.tarikKiri} kanan={k.tarikKanan} />
              <text x={150} y={176} textAnchor="middle" fontSize={13} fontWeight={900} fill="#B45309">
                jenis garis = ?
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => tarik("kiri")} aria-label="Tarik ujung kiri">
                {"\u{25C0}"} Tarik kiri
              </button>
              <button type="button" className={tombol} onClick={() => tarik("kanan")} aria-label="Tarik ujung kanan">
                Tarik kanan {"\u{25B6}"}
              </button>
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jenis garis">
              {pilKenali.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihKenali(k, i))} aria-pressed={k.kenaliPilih === i} className={pilihan(k.kenaliPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKenaliKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jalan" ? (
          <div className="space-y-2">
            <Gambar label="Tiga benang antara dua paku" judul="mana benang yang paling pendek?">
              {urutan.map((j, i) => (
                <g key={`${j}${i}`}>
                  <BenangSvg jalan={j} y={52 + i * 44} warna={WARNA_JALAN[i]} sorot={k.jalanPilih === i} />
                  <circle cx={40} cy={52 + i * 44} r={5} fill="#475569" />
                  <circle cx={260} cy={52 + i * 44} r={5} fill="#475569" />
                  <text x={20} y={56 + i * 44} textAnchor="middle" fontSize={12} fontWeight={900} fill={WARNA_JALAN[i]}>
                    {i + 1}
                  </text>
                </g>
              ))}
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih benang">
              {urutan.map((j, i) => (
                <button key={`${j}${i}`} type="button" onClick={() => ubah(pilihJalan(k, i))} aria-pressed={k.jalanPilih === i} className={pilihan(k.jalanPilih === i)}>
                  Benang {i + 1}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJalanKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "ukur" ? (
          <div className="space-y-2">
            <Gambar label="Bilah di atas penggaris" judul={diNol(k) ? "ujung kiri tepat di angka nol" : "geser sampai ujung kiri di angka nol"}>
              <SkalaMm maks={SKALA_BILAH / 10} rupa="benda" batang={[{ dari: k.posisi, ke: ujungKananBilah(k), y: 80, warna: "#FDE68A", label: tu.benda }]} />
              <text x={150} y={186} textAnchor="middle" fontSize={12} fontWeight={900} fill={diNol(k) ? "#15803D" : "#B45309"}>
                ujung kiri di {k.posisi} mm
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geser(-10)} aria-label="Geser bilah satu sentimeter ke kiri">
                {"\u{25C0}"} 10
              </button>
              <button type="button" className={tombol} onClick={() => geser(-5)} aria-label="Geser bilah lima milimeter ke kiri">
                {"\u{25C0}"} 5
              </button>
              <button type="button" className={tombol} onClick={() => geser(5)} aria-label="Geser bilah lima milimeter ke kanan">
                5 {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={() => geser(10)} aria-label="Geser bilah satu sentimeter ke kanan">
                10 {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={baca}>
                {"\u{1F441}"} Baca
              </button>
            </div>
            {k.sudahBaca ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Berapa panjang bilah itu?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bacaan">
                  {pilUkur.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihUkur(k, i))} aria-pressed={k.ukurPilih === i} className={pilihan(k.ukurPilih === i)}>
                      {p} mm
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUkurKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "ubah" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#B45309] bg-[#FFF7ED] px-2 py-2 text-center text-xl font-black text-[#1C01A5]">
              {tb.cm} cm {tb.mm} mm
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">{tb.bentuk === "mm" ? "Tulis dalam milimeter saja." : "Tulis dalam sentimeter dengan koma."}</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih tulisan">
              {pilUbah.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihUbah(k, i))} aria-pressed={k.ubahPilih === i} className={pilihan(k.ubahPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUbahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sisi" ? (
          <div className="space-y-2">
            <Gambar label="Bangun datar" judul={ts.benda}>
              <BangunSvg bangun={bangun} cx={150} cy={96} r={46} warna="#FDE68A" huruf={k.huruf} sorotSisi={sisiBernama(k)} />
              <text x={150} y={186} textAnchor="middle" fontSize={12} fontWeight={900} fill="#B45309">
                {sisiBernama(k).length > 0 ? `sisi: ${sisiBernama(k).join(", ")}` : "banyak sisi = ?"}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={huruf}>
                {"\u{1F3F7}"} Beri huruf
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa banyak sisinya?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih banyak sisi">
              {pilSisi.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihSisi(k, i))} aria-pressed={k.sisiPilih === i} className={pilihan(k.sisiPilih === i)}>
                  {p} sisi
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSisiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiBilah(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "kenali" ? kalimatKenali(k) : k.mode === "jalan" ? kalimatJalan(k) : k.mode === "ukur" ? kalimatUkur(k) : k.mode === "ubah" ? kalimatUbah(k) : kalimatSisi(k))}
      </p>
    </div>
  );
}
