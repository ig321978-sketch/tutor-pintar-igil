"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, Pengatur, eja } from "./komponen-lab";
import GambarPotong, { BatangPerbandingan, IkonBentuk } from "./gambar-potong-k2b5";
import {
  AWAL_BENTUK,
  LANGKAH_MAKS,
  MAKS_GARIS_A,
  MAKS_GARIS_C,
  NAMA_ARAH,
  NAMA_BENTUK,
  SEBUT_ARAH,
  URUT_ARAH,
  URUT_BENTUK,
  kalimatPotong,
  kalimatWarna,
  lambangBagian,
  namaBagian,
  namaWarna,
  potong,
  rasioBagian,
  samaBesar,
  ucapanPotong,
  type ArahPotong,
  type BentukLab,
  type GarisLab,
} from "./lab-potong-k2b5";
import type { KeadaanLabPotong } from "./misi-k2bab5";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B5 Sub-Bab A dan C): Lab Potong — model PhET.                   */
/* Satu model (bentuk + garis potong), banyak perwakilan terhubung: gambar,    */
/* batang perbandingan, tabel, dan kalimat. Hanya bagian yang sama besar       */
/* diberi nama setengah atau seperempat. Logika: lab-potong-k2b5.ts.           */
/* ------------------------------------------------------------------------ */

const GARIS_BARU: GarisLab[] = [
  { arah: "tegak", langkah: 2 },
  { arah: "datar", langkah: 2 },
];

export default function SimulasiLabPotong({
  mode,
  speakGuru,
  onKeadaan,
}: {
  /** "A": satu garis (setengah). "C": sampai dua garis (seperempat). */
  mode: "A" | "C";
  speakGuru: (t: string) => void;
  onKeadaan?: (k: KeadaanLabPotong) => void;
}) {
  const maksGaris = mode === "C" ? MAKS_GARIS_C : MAKS_GARIS_A;
  const [bentuk, setBentuk] = useState<BentukLab>(AWAL_BENTUK);
  const [garis, setGaris] = useState<GarisLab[]>([]);
  const [warna, setWarna] = useState<boolean[]>([]);
  const [batang, setBatang] = useState(false);
  const [tabel, setTabel] = useState(false);
  const [setengahPada, setSetengahPada] = useState<BentukLab[]>([]);

  const keping = useMemo(() => potong(bentuk, garis), [bentuk, garis]);
  const rasio = useMemo(() => rasioBagian(keping), [keping]);
  const n = keping.length;
  const sama = samaBesar(rasio);
  const nama = namaBagian(rasio);
  const berwarna = Array.from({ length: n }, (_, i) => warna[i] === true);
  const k = berwarna.filter(Boolean).length;
  const namaWr = namaWarna(k, n, sama);
  const arah: ArahPotong | null = garis.length > 0 ? garis[0].arah : null;

  useEffect(() => {
    onKeadaan?.({ alat: "potong", bentuk, garis: garis.length, arah, bagian: n, sama, nama, warna: k, namaWarna: namaWr, batang, tabel, setengahPada });
  }, [onKeadaan, bentuk, garis.length, arah, n, sama, nama, k, namaWr, batang, tabel, setengahPada]);

  /** Mencatat bentuk yang pernah dibelah menjadi dua bagian sama besar. Dipanggil dari penanganan aksi, bukan dari efek. */
  const catatSetengah = (b: BentukLab, g: GarisLab[]) => {
    const kp = potong(b, g);
    if (kp.length === 2 && samaBesar(rasioBagian(kp))) setSetengahPada((s) => (s.includes(b) ? s : [...s, b]));
  };
  const ubahGaris = (baru: GarisLab[]) => {
    setGaris(baru);
    setWarna([]);
    catatSetengah(bentuk, baru);
  };
  const pilihBentuk = (b: BentukLab) => {
    setBentuk(b);
    setWarna([]);
    catatSetengah(b, garis);
  };
  const tambahGaris = () => {
    if (garis.length < maksGaris) ubahGaris([...garis, { ...GARIS_BARU[garis.length] }]);
  };
  const hapusGaris = (i: number) => ubahGaris(garis.filter((_, j) => j !== i));
  const setArah = (i: number, a: ArahPotong) => ubahGaris(garis.map((g, j) => (j === i ? { ...g, arah: a } : g)));
  const geser = (i: number, d: number) => ubahGaris(garis.map((g, j) => (j === i ? { ...g, langkah: Math.max(-LANGKAH_MAKS, Math.min(LANGKAH_MAKS, g.langkah + d)) } : g)));
  const ketukBagian = (i: number) => setWarna(berwarna.map((v, j) => (j === i ? !v : v)));

  const resetSemua = () => {
    setBentuk(AWAL_BENTUK);
    setGaris([]);
    setWarna([]);
    setBatang(false);
    setTabel(false);
  };

  const teks = kalimatPotong(bentuk, garis.length > 0, n, sama);
  const teksWarna = namaWr === "kosong" ? null : kalimatWarna(namaWr, k, n, sama);
  const lambang = nama === "setengah" || nama === "seperempat" ? lambangBagian(nama) : null;
  const tulisan = keping.map(() => lambang);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Potong</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">
            {mode === "C" ? "Belah bentuk dengan satu atau dua garis, lalu warnai bagiannya. Lihat bagian sama besar diberi nama." : "Belah bentuk dengan satu garis. Geser garisnya dan lihat kapan dua bagian sama besar."}
          </p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(ucapanPotong(bentuk, garis.length > 0, n, sama, namaWr, k)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Pilih bentuk">
          <span className="text-xs font-black text-[#1C01A5]">Bentuk:</span>
          {URUT_BENTUK.map((b) => (
            <Pilihan key={b} aktif={bentuk === b} onKlik={() => pilihBentuk(b)} label={`Bentuk ${NAMA_BENTUK[b]}`}>
              <span className="inline-flex items-center gap-1">
                <IkonBentuk bentuk={b} kelas="h-5 w-5" />
                {NAMA_BENTUK[b]}
              </span>
            </Pilihan>
          ))}
        </div>

        {garis.map((g, i) => (
          <div key={i} className="space-y-1.5 rounded-2xl border-2 border-[#DC2626]/40 bg-white p-2" role="group" aria-label={`Garis potong ${i + 1}`}>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-black text-[#7F1D1D]">Garis {i + 1}:</span>
              {URUT_ARAH.map((a) => (
                <Pilihan key={a} aktif={g.arah === a} onKlik={() => setArah(i, a)} label={`Arah ${SEBUT_ARAH[a]}`}>
                  {NAMA_ARAH[a]}
                </Pilihan>
              ))}
              <button type="button" className={`${TOMBOL_BIASA} ml-auto`} onClick={() => hapusGaris(i)} aria-label={`Hapus garis ${i + 1}`}>
                ✕ Hapus
              </button>
            </div>
            <Pengatur
              nama={g.langkah === 0 ? "Posisi garis: tepat di tengah" : `Posisi garis: ${Math.abs(g.langkah)} langkah dari tengah`}
              nilai={g.langkah}
              onKurang={() => geser(i, -1)}
              onTambah={() => geser(i, 1)}
              kurangMati={g.langkah <= -LANGKAH_MAKS}
              tambahMati={g.langkah >= LANGKAH_MAKS}
              kurangLabel={`Geser garis ${i + 1} ke kiri atau atas`}
              tambahLabel={`Geser garis ${i + 1} ke kanan atau bawah`}
            />
          </div>
        ))}
        {garis.length < maksGaris ? (
          <button type="button" className={TOMBOL_BIASA} onClick={tambahGaris}>
            ➕ {garis.length === 0 ? "Tambah garis potong" : "Tambah garis kedua"}
          </button>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex justify-center">
          <GambarPotong bentuk={bentuk} garis={garis} warna={berwarna} teks={tulisan} onKetuk={ketukBagian} kelas="h-56 w-56" label={`${kalimatPotong(bentuk, garis.length > 0, n, sama)} Ketuk bagian untuk mewarnai.`} />
        </div>
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Ketuk satu bagian untuk mewarnainya. Ketuk lagi untuk menghapus warna.</p>
        <KalimatBesar teks={teks} />
        {teksWarna ? <KalimatBesar teks={teksWarna} warna="bg-[#E0E7FF]" /> : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={batang} onKlik={() => setBatang(!batang)}>
            Batang perbandingan
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel(!tabel)}>
            Tabel bagian
          </Cek>
        </div>

        {batang ? (
          <div className="space-y-1">
            <BatangPerbandingan rasio={rasio} warna={berwarna} />
            <p className="text-center text-xs font-bold text-[#1C01A5]/70">{sama ? "Semua batang sama panjang. Bagiannya sama besar." : n > 1 ? "Panjang batang berbeda. Bagiannya tidak sama besar." : "Satu batang penuh: bentuk masih utuh."}</p>
          </div>
        ) : null}

        {tabel ? (
          <table className="w-full border-collapse overflow-hidden rounded-2xl text-center text-sm font-black text-[#1C01A5]" aria-label="Tabel bagian">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="p-1.5">Banyak bagian</th>
                <th className="p-1.5">Sama besar?</th>
                <th className="p-1.5">Namanya</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t-2 border-[#1C01A5]/20 bg-white">
                <td className="p-1.5">{n}</td>
                <td className="p-1.5">{n === 1 ? "—" : sama ? "Ya" : "Tidak"}</td>
                <td className="p-1.5">{nama === "utuh" ? "satu utuh" : nama === "lain" ? "tidak diberi nama" : nama === "setengah" ? "setengah ½" : "seperempat ¼"}</td>
              </tr>
            </tbody>
          </table>
        ) : null}

        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Setengah sudah ditemukan pada {setengahPada.length} dari {URUT_BENTUK.length} bentuk.</p>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            mode === "C"
              ? "Coba ini. Satu, belah persegi dengan dua garis sampai empat bagian sama besar. Apa namanya? Dua, warnai dua bagian. Samakah dengan setengah? Tiga, geser salah satu garis sedikit saja. Apa kata kalimatnya? Empat, coba lingkaran."
              : "Coba ini. Satu, belah persegi dengan satu garis. Geser garis sampai dua bagian sama besar. Dua, coba arah miring. Apakah tetap setengah? Tiga, pilih segitiga dan cari garis yang membuat dua bagian sama besar. Empat, nyalakan batang perbandingan."
          )
        }
        langkah={
          mode === "C"
            ? [
                "Belah persegi dengan dua garis sampai empat bagian sama besar. Apa namanya?",
                "Warnai dua bagian. Samakah dengan setengah?",
                "Geser salah satu garis satu langkah saja. Apa kata kalimatnya?",
                "Coba lingkaran dengan dua garis yang sama.",
              ]
            : [
                "Belah persegi dengan satu garis. Geser garis sampai dua bagian sama besar.",
                "Coba arah miring. Apakah dua bagian tetap sama besar?",
                "Pilih segitiga dan cari garis yang membuat dua bagian sama besar.",
                "Nyalakan Batang perbandingan. Kapan dua batang sama panjang?",
              ]
        }
      />
    </div>
  );
}
