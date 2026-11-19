"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalSudut,
  bacaBusur,
  kalimatBesarSudut,
  kalimatBusur,
  kalimatJenis,
  kalimatPasang,
  kalimatPutar,
  kata,
  kataDerajat,
  lepasBusur,
  mulaiLagiSudut,
  pasanganDari,
  pasangBusur,
  periksaBusur,
  periksaJenis,
  periksaPasang,
  periksaPutar,
  petunjukBusur,
  petunjukJenis,
  petunjukPasang,
  petunjukPutar,
  pilihanBusur,
  pilihanJenis,
  pilihanPasang,
  pilihBacaBusur,
  pilihJenisSudut,
  pilihModeSudut,
  pilihPasangan,
  putarSudut,
  targetBusur,
  targetJenis,
  targetPasang,
  targetPutar,
  terpasang,
  type KeadaanSudut,
  type ModeSudut,
} from "./logika";
import { LANGKAH_PUTAR, MISI_SUDUT_TEKS } from "./data-sim";
import { BusurSvg, EMOJI_BENDA, Gambar, PojokKertas, SudutKaki, jalurJuring, ujung } from "./GambarSudut";

/**
 * Simulasi Kelas 3 Bab 4 Sub-Bab B: Lapangan Sudut (Misi Sudut). Besar sudut berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Putar (putar kaki sudut dan bandingkan dengan pojok kertas sampai sudut dari jenis sasaran ditemukan), Busur (pasang titik tengah dan garis nol dulu, alat menolak membaca sebelum dipasang benar, lalu baca dari nol),
 * Jenis (pilih jenis sudut), dan Pasang (pasangan sudut refleks sampai satu putaran penuh).
 */
const MODE: { id: ModeSudut; nama: string; ikon: string }[] = [
  { id: "putar", nama: "Putar", ikon: "\u{1F504}" },
  { id: "busur", nama: "Busur", ikon: "\u{1F9ED}" },
  { id: "jenis", nama: "Jenis", ikon: "\u{1F53A}" },
  { id: "pasang", nama: "Pasangan", ikon: "\u{1F501}" },
];

export default function SimulasiLapanganSudut({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSudut) => void }) {
  const [k, setK] = useState<KeadaanSudut>(() => awalSudut());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanSudut, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#1D4ED8] bg-white text-[#1D4ED8]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeSudut) => {
    ubah(
      pilihModeSudut(k, m),
      m === "putar" ? `Putar kaki sudut sampai sudutnya ${targetPutar(k).jenis}.` : m === "busur" ? "Pasang busur dulu: titik tengah di titik sudut dan garis nol di kaki pertama." : m === "jenis" ? "Bandingkan sudut dengan pojok kertas, lalu pilih jenisnya." : "Cari pasangan sudut refleks sampai satu putaran penuh.",
    );
  };
  const putar = (d: number) => {
    const r = putarSudut(k, d);
    if (!r.ok) return salah(d < 0 ? "Kaki sudut sudah paling dekat, tidak bisa diputar lebih kecil." : "Kaki sudut sudah hampir satu putaran, tidak bisa diputar lebih besar.");
    ubah(r.k, kalimatBesarSudut(r.k));
  };
  const periksaPutarKu = () => {
    const r = periksaPutar(k);
    if (r.ok) return ubah(r.k, `Betul! Sudut ${kataDerajat(k.deg)} adalah sudut ${targetPutar(k).jenis}.`);
    ubah(r.k);
    salah(petunjukPutar(k));
  };
  const pasangKu = (bagian: "tengah" | "nol") => {
    const baru = pasangBusur(k, bagian);
    ubah(baru, bagian === "tengah" ? "Titik tengah busur sudah di titik sudut." : "Garis nol busur sudah di kaki pertama.");
  };
  const bacaKu = () => {
    const r = bacaBusur(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukBusur(k));
    }
    ubah(r.k, "Busur terpasang benar. Pilih bacaan yang dimulai dari garis nol di kaki pertama.");
  };
  const periksaBusurKu = () => {
    const r = periksaBusur(k);
    if (r.ok) return ubah(r.k, `Betul! ${targetBusur(k).benda} membentuk sudut ${kataDerajat(targetBusur(k).deg)}.`);
    ubah(r.k);
    salah(petunjukBusur(k));
  };
  const periksaJenisKu = () => {
    const r = periksaJenis(k);
    if (r.ok) return ubah(r.k, `Betul! Sudut ${kataDerajat(targetJenis(k).deg)} adalah sudut ${pilihanJenis(k)[k.jenisPilih]}.`);
    ubah(r.k);
    salah(petunjukJenis(k));
  };
  const periksaPasangKu = () => {
    const r = periksaPasang(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(targetPasang(k).refleks)} ditambah ${kata(pasanganDari(targetPasang(k).refleks))} sama dengan tiga ratus enam puluh.`);
    ubah(r.k);
    salah(petunjukPasang(k));
  };

  const tp = targetPutar(k);
  const tb = targetBusur(k);
  const tj = targetJenis(k);
  const ts = targetPasang(k);
  const pilBusur = pilihanBusur(k);
  const pilJenis = pilihanJenis(k);
  const pilPasang = pilihanPasang(k);

  /* Busur di sudut: bergeser dan miring sebelum terpasang. */
  const phi = tb.sisi === "kanan" ? tb.deg : 180 - tb.deg;
  const kakiPertama = tb.sisi === "kanan" ? 0 : 180;
  const geserBusur = !k.tengah ? "translate(46 -16)" : !k.nol ? "rotate(18 150 165)" : "";
  const u1 = ujung(150, 165, 130, kakiPertama);
  const u2 = ujung(150, 165, 130, phi);

  return (
    <div className="space-y-3" data-uji="simulasi-lapangan-sudut">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#1D4ED8] bg-[#EFF6FF] p-2">
        <p className="text-sm font-black text-[#1E3A8A]">Misi Lapangan Sudut</p>
        <p className="text-xs font-bold text-[#1E3A8A]/80">{MISI_SUDUT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "putar" ? (
          <div className="space-y-2">
            <Gambar label="Kaki sudut dan pojok kertas lipat" judul={`cari sudut ${tp.jenis}`}>
              <PojokKertas cx={110} cy={112} />
              <SudutKaki cx={110} cy={112} len={70} ke={k.deg} rupa="benda" emoji={EMOJI_BENDA["layang-layang"]} />
              <text x={236} y={96} textAnchor="middle" fontSize={9} fontWeight={800} fill="#475569">
                besar sudut
              </text>
              <text x={236} y={114} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1C01A5">
                {k.deg}°
              </text>
              <text x={150} y={193} textAnchor="middle" fontSize={12} fontWeight={900} fill="#D97706">
                {`cari sudut ${tp.jenis}`}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => putar(-LANGKAH_PUTAR)} aria-label="Putar kaki sudut sepuluh derajat lebih kecil">
                {"\u{25C0}"} 10°
              </button>
              <button type="button" className={tombol} onClick={() => putar(LANGKAH_PUTAR)} aria-label="Putar kaki sudut sepuluh derajat lebih besar">
                10° {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={periksaPutarKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "busur" ? (
          <div className="space-y-2">
            <Gambar label="Busur derajat di atas sudut" judul={terpasang(k) ? "busur terpasang: titik tengah dan garis nol" : "pasang titik tengah dan garis nol"}>
              <g transform={geserBusur}>
                <BusurSvg deg={tb.deg} sisi={tb.sisi} rupa="benda" tanpaKaki />
              </g>
              <path d={jalurJuring(150, 165, 38, Math.min(kakiPertama, phi), Math.max(kakiPertama, phi))} fill="#FEF3C7" stroke="#92400E" strokeWidth={0.8} opacity={0.9} />
              <line x1={150} y1={165} x2={u1.x} y2={u1.y} stroke="#15803D" strokeWidth={3.2} strokeLinecap="round" />
              <line x1={150} y1={165} x2={u2.x} y2={u2.y} stroke="#DC2626" strokeWidth={3.2} strokeLinecap="round" />
              <circle cx={150} cy={165} r={3.4} fill="#DC2626" stroke="#1C01A5" strokeWidth={1} />
              <text x={150} y={193} textAnchor="middle" fontSize={11} fontWeight={900} fill={terpasang(k) ? "#15803D" : "#B45309"}>
                {terpasang(k) ? "busur terpasang, tekan Baca" : k.tengah ? "garis nol belum di kaki pertama" : "titik tengah belum di titik sudut"}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => pasangKu("tengah")} disabled={k.tengah}>
                {"\u{1F4CD}"} Titik tengah
              </button>
              <button type="button" className={tombol} onClick={() => pasangKu("nol")} disabled={k.nol}>
                {"\u{1F9ED}"} Garis nol
              </button>
              <button type="button" className={tombol} onClick={() => ubah(lepasBusur(k), "Busur dilepas. Pasang lagi dari awal.")}>
                {"\u{21A9}"} Lepas
              </button>
              <button type="button" className={tombol} onClick={bacaKu}>
                {"\u{1F4CF}"} Baca
              </button>
            </div>
            {k.sudahBaca ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Berapa derajat besar sudut itu?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bacaan">
                  {pilBusur.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihBacaBusur(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                      {p}°
                    </button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button type="button" className={tombol} onClick={periksaBusurKu}>
                    {"\u{2705}"} Periksa
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {k.mode === "jenis" ? (
          <div className="space-y-2">
            <Gambar label="Sudut yang dibandingkan dengan pojok kertas" judul="bandingkan dengan pojok kertas lipat">
              <PojokKertas cx={110} cy={112} />
              <SudutKaki cx={110} cy={112} len={70} ke={tj.deg} rupa="benda" emoji={EMOJI_BENDA[tj.benda]} />
              <text x={236} y={96} textAnchor="middle" fontSize={9} fontWeight={800} fill="#475569">
                besar sudut
              </text>
              <text x={236} y={114} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1C01A5">
                {tj.deg}°
              </text>
              <text x={150} y={193} textAnchor="middle" fontSize={12} fontWeight={900} fill="#D97706">
                jenis sudut = ?
              </text>
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jenis sudut">
              {pilJenis.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihJenisSudut(k, i))} aria-pressed={k.jenisPilih === i} className={pilihan(k.jenisPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJenisKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pasang" ? (
          <div className="space-y-2">
            <Gambar label="Sudut refleks dan pasangannya" judul="dua sudut berpasangan jumlahnya satu putaran">
              <path d={jalurJuring(105, 108, 66, 0, ts.refleks)} fill="#DDD6FE" stroke="#7C3AED" strokeWidth={1.6} />
              <path d={jalurJuring(105, 108, 66, ts.refleks, 360)} fill="#FED7AA" stroke="#F97316" strokeWidth={1.6} strokeDasharray="4 3" />
              <circle cx={105} cy={108} r={3.4} fill="#DC2626" stroke="#1C01A5" strokeWidth={1} />
              <text x={236} y={70} textAnchor="middle" fontSize={9} fontWeight={800} fill="#6D28D9">
                sudut refleks
              </text>
              <text x={236} y={88} textAnchor="middle" fontSize={15} fontWeight={900} fill="#6D28D9">
                {ts.refleks}°
              </text>
              <text x={236} y={118} textAnchor="middle" fontSize={9} fontWeight={800} fill="#C2410C">
                pasangannya
              </text>
              <text x={236} y={136} textAnchor="middle" fontSize={15} fontWeight={900} fill="#C2410C">
                ?
              </text>
              <text x={150} y={193} textAnchor="middle" fontSize={11} fontWeight={900} fill="#D97706">
                jumlah dua sudut = 360°
              </text>
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih pasangan">
              {pilPasang.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihPasangan(k, i))} aria-pressed={k.pasangPilih === i} className={pilihan(k.pasangPilih === i)}>
                  {p}°
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPasangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiSudut(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "putar" ? kalimatPutar(k) : k.mode === "busur" ? kalimatBusur(k) : k.mode === "jenis" ? kalimatJenis(k) : kalimatPasang(k))}
      </p>
    </div>
  );
}
