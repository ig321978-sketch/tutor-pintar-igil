"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { Batang, Digital, Jam } from "./LangkahJadwal";
import { HARI_KEGIATAN, MISI_JADWAL_TEKS, WARNA_BAGIAN_SIM } from "./data-sim";
import {
  BATAS_KOTAK,
  SUARA_MODE,
  awalJadwal,
  kalimatJadwal,
  ketukLama,
  kotakSeharusnya,
  mulaiLagiJadwal,
  pasangLama,
  periksaSama,
  periksaSelisih,
  pilihKegiatan,
  pilihModeJadwal,
  putarJarum,
  putarSama,
  targetSama,
  targetSelisih,
  taruhHari,
  ubahKotak,
  type Hasil,
  type KeadaanJadwal,
  type ModeJadwal,
} from "./logika";
import { URUT_BAGIAN, angkaPukul, bagianHari, kataPukul, lamaAngka, tulisDigital, jam12, type Bagian } from "./logika-cpa";

/**
 * Simulasi Kelas 2 Bab 6 Sub-Bab B: Pos Waktu (Misi Pos Waktu). Lima alat tanpa skor: Jarum (putar jarum pendek, lihat jam dinding, jam digital, dan bagian hari),
 * Samakan (jam dinding disamakan dengan jam digital), Hari (taruh kegiatan pada bagian hari), Lama (bandingkan lama dua kegiatan), Selisih (isi kotak jalur jam
 * dari jam mulai sampai jam selesai). Jam dihitung dari jam dua puluh empat; semua jam tepat.
 */
const MODE: { id: ModeJadwal; nama: string; ikon: string }[] = [
  { id: "jarum", nama: "Jarum", ikon: "\u{1F551}" },
  { id: "samakan", nama: "Samakan", ikon: "\u{1F522}" },
  { id: "hari", nama: "Hari", ikon: "\u{1F305}" },
  { id: "lama", nama: "Lama", ikon: "\u{1F4CA}" },
  { id: "selisih", nama: "Selisih", ikon: "\u{1F3C3}" },
];
const UNGU = "#1C01A5";
const EMOJI_HARI: Record<Bagian, string> = { pagi: "\u{1F305}", siang: "\u{1F31E}", sore: "\u{1F307}", malam: "\u{1F319}" };

function Kanvas({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 180" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export default function SimulasiPosWaktu({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJadwal) => void }) {
  const [k, setK] = useState<KeadaanJadwal>(() => awalJadwal());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanJadwal, ucap?: string) => {
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#1D4ED8] bg-white text-[#1D4ED8]"}`;
  const ganti = (m: ModeJadwal) => ubah(pilihModeJadwal(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "jarum") ubah({ ...k, h24: 12 }, "Jarum kembali ke tengah hari.");
    else if (k.mode === "samakan") ubah({ ...k, jamSama: 12 }, "Jam dinding kembali ke angka dua belas.");
    else if (k.mode === "hari") ubah({ ...k, hariPilih: null }, "Pilihan dibatalkan. Ketuk satu kegiatan lagi.");
    else if (k.mode === "lama") ubah({ ...k, lamaIndeks: k.lamaIndeks + 1 }, "Ini pasangan kegiatan yang lain. Ketuk yang lebih lama.");
    else ubah({ ...k, selKotak: 0 }, "Jalur dikosongkan. Isi kotak lagi.");
  };

  const keg = HARI_KEGIATAN;
  const p = pasangLama(k);
  const t = targetSelisih(k);
  const lebarKotak = 24;
  return (
    <div className="space-y-3" data-uji="simulasi-pos-waktu">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#1D4ED8] bg-[#EFF6FF] p-2">
        <p className="text-sm font-black text-[#1E3A8A]">Misi Pos Waktu</p>
        <p className="text-xs font-bold text-[#1E3A8A]/80">{MISI_JADWAL_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#16A34A] bg-[#F0FDF4] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "jarum" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Putar jarum pendek: jam dinding, jam digital, dan bagian hari</p>
            <Kanvas label="Jam dinding dan jam digital">
              <Jam h12={jam12(k.h24)} rupa="benda" cx={86} cy={88} r={64} />
              <Digital teks={tulisDigital(k.h24)} x={168} y={52} w={124} h={48} rupa="benda" />
              <text x={230} y={128} textAnchor="middle" fontSize={22} aria-hidden="true">
                {EMOJI_HARI[bagianHari(k.h24)]}
              </text>
              <text x={230} y={152} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                {bagianHari(k.h24)}
              </text>
              <text x={150} y={176} textAnchor="middle" fontSize={10} fontWeight={800} fill="#166534">
                {angkaPukul(k.h24)}
              </text>
            </Kanvas>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(putarJarum(k, -1))}>
                Mundur satu jam
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(putarJarum(k, 1))}>
                Maju satu jam
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "samakan" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Samakan jam dinding dengan jam digital, lalu tekan Periksa</p>
            <Kanvas label="Jam digital yang harus disamakan dan jam dinding">
              <Digital teks={tulisDigital(targetSama(k))} x={20} y={66} w={110} h={46} rupa="benda" />
              <text x={75} y={134} textAnchor="middle" fontSize={10} fontWeight={800} fill="#166534">
                jam digital
              </text>
              <Jam h12={k.jamSama} rupa="benda" cx={218} cy={90} r={62} />
            </Kanvas>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(putarSama(k, 1))}>
                Putar satu jam
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaSama(k))}>
                Periksa
              </button>
            </div>
            <p className="mt-1 text-center text-[11px] font-bold text-[#166534]">
              {k.sudahSama.length === 0 ? `Cari jam yang sama dengan ${kataPukul(targetSama(k))}.` : `Sudah cocok ${k.sudahSama.length} kali. Ada jam digital baru untuk disamakan.`}
            </p>
          </>
        ) : null}
        {k.mode === "hari" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Ketuk kegiatan, lalu ketuk bagian harinya</p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih kegiatan">
              {keg.map((g) => (
                <button
                  key={g.nama}
                  type="button"
                  onClick={() => ubah(pilihKegiatan(k, g.nama))}
                  aria-pressed={k.hariPilih === g.nama}
                  className={`min-h-[52px] rounded-2xl border-4 px-2 text-sm font-black ${k.hariBenar.includes(g.nama) ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : k.hariPilih === g.nama ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
                >
                  {g.emoji} {g.nama}
                  <span className="block text-[11px] font-bold">{angkaPukul(g.h)}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5" role="group" aria-label="Pilih bagian hari">
              {URUT_BAGIAN.map((b) => (
                <button key={b} type="button" onClick={() => terapkan(taruhHari(k, b))} className="min-h-[56px] rounded-xl border-2 border-[#1C01A5] px-1 text-xs font-black text-[#1C01A5]" style={{ background: WARNA_BAGIAN_SIM[b] }}>
                  <span aria-hidden="true">{EMOJI_HARI[b]}</span>
                  <span className="block capitalize">{b}</span>
                  <span className="block text-[10px] font-bold">{keg.filter((g) => k.hariBenar.includes(g.nama) && bagianHari(g.h) === b).map((g) => g.emoji).join(" ")}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
        {k.mode === "lama" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Bandingkan lama dua kegiatan</p>
            <Kanvas label="Dua batang lama kegiatan">
              <text x={10} y={34} fontSize={10} fontWeight={900} fill={UNGU}>
                {p.a.emoji} {p.a.nama}
              </text>
              <Batang n={p.a.menit / 60} x={20} y={42} lebar={Math.min(50, 220 / (Math.max(p.a.menit, p.b.menit) / 60))} rupa="benda" />
              <text x={20 + (p.a.menit / 60) * Math.min(50, 220 / (Math.max(p.a.menit, p.b.menit) / 60)) + 6} y={57} fontSize={10} fontWeight={900} fill="#DC2626">
                {lamaAngka(p.a.menit)}
              </text>
              <text x={10} y={102} fontSize={10} fontWeight={900} fill={UNGU}>
                {p.b.emoji} {p.b.nama}
              </text>
              <Batang n={p.b.menit / 60} x={20} y={110} lebar={Math.min(50, 220 / (Math.max(p.a.menit, p.b.menit) / 60))} rupa="benda" warna="#FECACA" />
              <text x={20 + (p.b.menit / 60) * Math.min(50, 220 / (Math.max(p.a.menit, p.b.menit) / 60)) + 6} y={125} fontSize={10} fontWeight={900} fill="#DC2626">
                {lamaAngka(p.b.menit)}
              </text>
            </Kanvas>
            <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Ketuk kegiatan yang lebih lama">
              <button type="button" className={tombol} onClick={() => terapkan(ketukLama(k, "a"))}>
                {p.a.nama}
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(ketukLama(k, "b"))}>
                {p.b.nama}
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "selisih" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Isi satu kotak untuk tiap jam dari jam mulai sampai jam selesai</p>
            <Kanvas label="Jalur jam untuk menghitung lama kegiatan">
              <text x={150} y={22} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                {t.nama}
              </text>
              <Digital teks={tulisDigital(t.mulai)} x={20} y={34} w={96} h={36} rupa="benda" />
              <Digital teks={tulisDigital(t.selesai)} x={184} y={34} w={96} h={36} rupa="benda" />
              <text x={150} y={58} textAnchor="middle" fontSize={11} fontWeight={900} fill="#DC2626">
                sampai
              </text>
              {Array.from({ length: BATAS_KOTAK }, (_, i) => (
                <rect key={i} x={30 + i * lebarKotak} y={100} width={lebarKotak} height={20} rx={2} fill="none" stroke="#94A3B8" strokeDasharray="3 2" />
              ))}
              <Batang n={k.selKotak} x={30} y={100} lebar={lebarKotak} rupa="benda" />
              <text x={150} y={150} textAnchor="middle" fontSize={10} fontWeight={800} fill="#166534">
                {k.selKotak} kotak
              </text>
            </Kanvas>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(ubahKotak(k, -1))} disabled={k.selKotak === 0}>
                Kurangi kotak
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(ubahKotak(k, 1))} disabled={k.selKotak >= BATAS_KOTAK}>
                Tambah kotak
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaSelisih(k))}>
                Periksa
              </button>
            </div>
            <p className="mt-1 text-center text-[11px] font-bold text-[#166534]">{k.selBenar.length === 0 ? `Dari ${kataPukul(t.mulai)} sampai ${kataPukul(t.selesai)}.` : `Sudah benar ${k.selBenar.length} kegiatan. Banyak kotak yang pas: ${kotakSeharusnya(k)}.`}</p>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJadwal(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatJadwal(k)}
      </p>
    </div>
  );
}
