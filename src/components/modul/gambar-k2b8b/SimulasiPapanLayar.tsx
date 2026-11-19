"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { DiagramSvg, Simbol } from "./LangkahGambar";
import { BATAS_BARIS, MISI_LAYAR_TEKS, TEMPEL_TUGAS } from "./data-sim";
import {
  SUARA_MODE,
  awalLayar,
  gantiLambang,
  kalimatLayar,
  mulaiLagiLayar,
  pasangBanding,
  periksaBanding,
  periksaJudul,
  periksaJumlah,
  periksaTempel,
  pilihJudul,
  pilihKataBanding,
  pilihKet,
  pilihModeLayar,
  pilihanJudul,
  tempelLambang,
  tugasJumlah,
  tugasTempel,
  ubahJumlah,
  ubahSelisih,
  ulangTempel,
  type Hasil,
  type KataBanding,
  type KeadaanLayar,
  type ModeLayar,
} from "./logika";
import { URUT_LAMBANG, type Diagram, type Lambang } from "./logika-cpa";

/**
 * Simulasi Kelas 2 Bab 8 Sub-Bab B: Papan Layar (Misi Papan Layar). Empat alat tanpa skor: Tempel (tempel lambang pada tiap baris sesuai tabel, lambang boleh diganti),
 * Judul (pilih judul dan keterangan), Banding (pilih kata dan lebihnya untuk dua baris), Jumlah (jumlahkan baris yang ditandai).
 */
const MODE: { id: ModeLayar; nama: string; ikon: string }[] = [
  { id: "tempel", nama: "Tempel", ikon: "\u{2B50}" },
  { id: "judul", nama: "Judul", ikon: "\u{1F3F7}" },
  { id: "banding", nama: "Banding", ikon: "\u{2696}" },
  { id: "jumlah", nama: "Jumlah", ikon: "\u{2795}" },
];
const NAMA_LAMBANG: Record<Lambang, string> = { bintang: "Bintang", lingkaran: "Lingkaran", hati: "Hati", wajah: "Wajah" };
const KATA: { id: KataBanding; teks: string }[] = [
  { id: "lebih", teks: "lebih banyak" },
  { id: "kurang", teks: "lebih sedikit" },
  { id: "sama", teks: "sama banyak" },
];

export default function SimulasiPapanLayar({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLayar) => void }) {
  const [k, setK] = useState<KeadaanLayar>(() => awalLayar());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanLayar, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9D174D] bg-[#9D174D] text-white" : "border-[#9D174D] bg-white text-[#9D174D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 text-sm font-black ${nyala ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#9D174D] bg-[#FFF1F2] text-[#831843]"}`;
  const ganti = (m: ModeLayar) => ubah(pilihModeLayar(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "tempel") ubah(ulangTempel(k), "Gambar dikosongkan. Tempel lagi sesuai tabel.");
    else if (k.mode === "judul") ubah({ ...k, judulPilih: null, ketPilih: null }, "Pilihan dibatalkan. Pilih judul dan keterangan lagi.");
    else if (k.mode === "banding") ubah({ ...k, bandingKata: null, bandingSelisih: 0 }, "Pilihan dibatalkan. Pilih kata dan selisihnya lagi.");
    else ubah({ ...k, jumlahPilih: 0 }, "Jumlah dikembalikan. Hitung lagi gambar pada baris yang ditandai.");
  };

  const tt = tugasTempel(k);
  const dgTempel: Diagram = { judul: tt.judul, ket: tt.ket, lambang: k.lambang, baris: tt.baris.map((b, i) => ({ nama: b.nama, n: k.tempel[i] ?? 0 })) };
  const pj = pilihanJudul(k);
  const tj = TEMPEL_TUGAS[k.judulIndeks % TEMPEL_TUGAS.length];
  const dgJudul: Diagram = { judul: "?", ket: "?", lambang: "bintang", baris: tj.baris.map((b) => ({ nama: b.nama, n: b.n })) };
  const pb = pasangBanding(k);
  const tb = TEMPEL_TUGAS[pb.t];
  const dgBanding: Diagram = { judul: tb.judul, ket: tb.ket, lambang: "lingkaran", baris: tb.baris.map((b) => ({ nama: b.nama, n: b.n })) };
  const jt = tugasJumlah(k);
  const tjm = TEMPEL_TUGAS[jt.t];
  const dgJumlah: Diagram = { judul: tjm.judul, ket: tjm.ket, lambang: "hati", baris: tjm.baris.map((b) => ({ nama: b.nama, n: b.n })) };
  const jumlahTanda = Object.fromEntries(jt.idx.map((i) => [i, "+"]));

  return (
    <div className="space-y-3" data-uji="simulasi-papan-layar">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9D174D] bg-[#FFF1F2] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Papan Layar</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_LAYAR_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#BE123C] bg-[#FFF7ED] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tempel" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#831843]">
              Tabel: {tt.baris.map((b) => `${b.nama} ${b.n}`).join(", ")}. Tempel lambang sampai sama, lalu tekan Periksa.
            </p>
            <DiagramSvg dg={dgTempel} rupa="diagram" />
            <div className="mt-2 grid grid-cols-1 gap-1" role="group" aria-label="Atur banyak gambar tiap baris">
              {tt.baris.map((b, i) => (
                <div key={b.nama} className="flex items-center justify-between gap-2 rounded-xl bg-white px-2 py-1">
                  <span className="w-24 text-sm font-black text-[#1C01A5]">{b.nama}</span>
                  <button type="button" className={tombol} aria-label={`Kurangi gambar ${b.nama}`} onClick={() => terapkan(tempelLambang(k, i, -1))}>
                    -
                  </button>
                  <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{k.tempel[i] ?? 0}</span>
                  <button type="button" className={tombol} aria-label={`Tambah gambar ${b.nama}`} disabled={(k.tempel[i] ?? 0) >= BATAS_BARIS} onClick={() => terapkan(tempelLambang(k, i, 1))}>
                    +
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1" role="group" aria-label="Pilih lambang">
              {URUT_LAMBANG.map((l) => (
                <button key={l} type="button" onClick={() => ubah(gantiLambang(k, l), `Lambang diganti menjadi ${l}. Semua gambar tetap sama bentuk dan ukurannya.`)} aria-pressed={k.lambang === l} className={`${pilihan(k.lambang === l)} flex flex-col items-center gap-0.5 py-1`}>
                  <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    <Simbol jenis={l} cx={12} cy={12} s={22} warna="#FACC15" />
                  </svg>
                  <span className="text-[10px]">{NAMA_LAMBANG[l]}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaTempel(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "judul" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#831843]">Pilih judul dan keterangan yang tepat, lalu tekan Periksa</p>
            <DiagramSvg dg={dgJudul} rupa="diagram" />
            <p className="mt-2 text-center text-xs font-black text-[#831843]">Judul</p>
            <div className="grid grid-cols-1 gap-1" role="group" aria-label="Pilih judul">
              {pj.judul.map((j, i) => (
                <button key={j} type="button" aria-pressed={k.judulPilih === i} className={pilihan(k.judulPilih === i)} onClick={() => ubah(pilihJudul(k, i))}>
                  {j}
                </button>
              ))}
            </div>
            <p className="mt-2 text-center text-xs font-black text-[#831843]">Keterangan</p>
            <div className="grid grid-cols-1 gap-1" role="group" aria-label="Pilih keterangan">
              {pj.ket.map((j, i) => (
                <button key={j} type="button" aria-pressed={k.ketPilih === i} className={pilihan(k.ketPilih === i)} onClick={() => ubah(pilihKet(k, i))}>
                  {j}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaJudul(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "banding" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#831843]">Baris 1 dibanding baris 2: pilih kata, atur selisihnya, lalu tekan Periksa</p>
            <DiagramSvg dg={dgBanding} rupa="diagram" tanda={{ [pb.a]: "1", [pb.b]: "2" }} />
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Pilih kata perbandingan">
              {KATA.map((x) => (
                <button key={x.id} type="button" aria-pressed={k.bandingKata === x.id} className={pilihan(k.bandingKata === x.id)} onClick={() => ubah(pilihKataBanding(k, x.id))}>
                  {x.teks}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-black text-[#1C01A5]">Selisih:</span>
              <button type="button" className={tombol} aria-label="Kurangi selisihnya" onClick={() => ubah(ubahSelisih(k, -1))}>
                -
              </button>
              <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{k.bandingSelisih}</span>
              <button type="button" className={tombol} aria-label="Tambah selisihnya" onClick={() => ubah(ubahSelisih(k, 1))}>
                +
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaBanding(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "jumlah" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#831843]">Hitung gambar pada baris bertanda plus, atur jumlahnya, lalu tekan Periksa</p>
            <DiagramSvg dg={dgJumlah} rupa="diagram" tanda={jumlahTanda} />
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-sm font-black text-[#1C01A5]">Jumlahnya:</span>
              <button type="button" className={tombol} aria-label="Kurangi jumlahnya" onClick={() => ubah(ubahJumlah(k, -1))}>
                -
              </button>
              <span className="w-8 text-center text-lg font-black text-[#1C01A5]">{k.jumlahPilih}</span>
              <button type="button" className={tombol} aria-label="Tambah jumlahnya" onClick={() => ubah(ubahJumlah(k, 1))}>
                +
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaJumlah(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiLayar(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatLayar(k)}
      </p>
    </div>
  );
}
