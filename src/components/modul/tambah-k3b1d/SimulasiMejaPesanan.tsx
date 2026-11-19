"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalPesanan,
  jumlahPesanan,
  kalimatPanjang,
  kalimatPeriksa,
  kalimatSusun,
  kalimatTiga,
  kalimatTukar,
  mulaiLagiPesanan,
  periksaPanjang,
  periksaSusun,
  periksaTiga,
  periksaTukar,
  pesananBerikut,
  pesananKe,
  petunjukPanjang,
  petunjukPeriksa,
  petunjukSusun,
  petunjukTiga,
  petunjukTukar,
  pilihModePesanan,
  pilihPeriksa,
  pilihTaksir,
  tukarSepuluh,
  ubahPanjang,
  ubahSusun,
  ubahTiga,
  type BagianSusun,
  type KeadaanPesanan,
  type ModePesanan,
} from "./logika";
import { MISI_PESANAN_TEKS, PANJANG_SIM, PERIKSA_SIM, TIGA_SIM } from "./data-sim";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab D: Meja Pesanan (Misi Meja Pesanan). Pesanan jajanan (pastel, lemper, onde-onde) dan bilangan berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat:
 * Susun (isi satuan, simpanan, dan puluhan hasil di susun pendek), Tukar (sepuluh butir satuan ditukar satu batang puluhan), Panjang (uraikan puluhan dan satuan), Tiga (jumlahkan tiga bilangan dua-dua)
 * dan Periksa (tukar urutan dan pilih taksiran). Hasil tidak lebih dari seratus.
 */
const MODE: { id: ModePesanan; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F9EE}" },
  { id: "tukar", nama: "Tukar", ikon: "\u{1F504}" },
  { id: "panjang", nama: "Panjang", ikon: "\u{1F4CF}" },
  { id: "tiga", nama: "Tiga", ikon: "\u{2795}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{1F50D}" },
];

/** Satu pengatur angka dengan tombol kurang dan tambah. */
function Atur({ nama, nilai, onKurang, onTambah, lebar = "w-10" }: { nama: string; nilai: number; onKurang: () => void; onTambah: () => void; lebar?: string }) {
  const kecil = "min-h-[44px] min-w-[44px] rounded-lg border-2 border-[#1C01A5] bg-white text-lg font-black text-[#1C01A5]";
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-black text-[#9D174D]">{nama}</span>
      <div className="flex items-center gap-1">
        <button type="button" className={kecil} onClick={onKurang} aria-label={`Kurangi ${nama}`}>
          {"\u{2796}"}
        </button>
        <span className={`${lebar} text-center text-2xl font-black text-[#1C01A5]`}>{nilai}</span>
        <button type="button" className={kecil} onClick={onTambah} aria-label={`Tambah ${nama}`}>
          {"\u{2795}"}
        </button>
      </div>
    </div>
  );
}

export default function SimulasiMejaPesanan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPesanan) => void }) {
  const [k, setK] = useState<KeadaanPesanan>(() => awalPesanan());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPesanan, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#BE185D] bg-[#BE185D] text-white" : "border-[#BE185D] bg-white text-[#BE185D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] rounded-xl border-4 px-3 py-1 text-center text-base font-black text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModePesanan) => {
    ubah(
      pilihModePesanan(k, m),
      m === "susun"
        ? "Isi satuan, simpanan, dan puluhan hasil di susun pendek."
        : m === "tukar"
          ? "Tukar sepuluh butir satuan menjadi satu batang puluhan."
          : m === "panjang"
            ? "Uraikan puluhan dan satuan, lalu jumlahkan tiap bagian."
            : m === "tiga"
              ? "Jumlahkan tiga bilangan dua-dua."
              : "Tukar urutan penjumlahan, lalu pilih taksirannya.",
    );
  };
  const susunUbah = (b: BagianSusun, arah: 1 | -1) => {
    const r = ubahSusun(k, b, arah);
    if (!r.ok) return salah(b === "simpan" ? "Simpanan hanya nol atau satu." : "Satu tempat hanya boleh nol sampai sembilan.");
    ubah(r.k);
  };
  const susunPeriksa = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, kalimatSusun(r.k));
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  const tukarKu = () => {
    const r = tukarSepuluh(k);
    if (r.ok) return ubah(r.k, kalimatTukar(r.k));
    ubah(r.k);
    salah(petunjukTukar(k));
  };
  const panjangUbah = (b: "puluh" | "satuan", arah: 1 | -1) => {
    const r = ubahPanjang(k, b, arah);
    if (!r.ok) return salah(b === "puluh" ? "Jumlah puluhan antara nol sampai seratus." : "Jumlah satuan antara nol sampai delapan belas.");
    ubah(r.k);
  };
  const panjangPeriksa = () => {
    const r = periksaPanjang(k);
    if (r.ok) return ubah(r.k, kalimatPanjang(r.k));
    ubah(r.k);
    salah(petunjukPanjang(k));
  };
  const tigaUbah = (b: "sementara" | "hasil", delta: number) => {
    const r = ubahTiga(k, b, delta);
    if (!r.ok) return salah("Jumlah antara nol sampai seratus.");
    ubah(r.k);
  };
  const tigaPeriksa = () => {
    const r = periksaTiga(k);
    if (r.ok) return ubah(r.k, kalimatTiga(r.k));
    ubah(r.k);
    salah(petunjukTiga(k));
  };
  const periksaKu = () => {
    const r = periksaTukar(k);
    if (r.ok) return ubah(r.k, kalimatPeriksa(r.k));
    ubah(r.k);
    salah(petunjukPeriksa(k));
  };

  const p = pesananKe(k);
  return (
    <div className="space-y-3" data-uji="simulasi-meja-pesanan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#BE185D] bg-[#FDF2F8] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Meja Pesanan</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_PESANAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#B45309] bg-[#FFF7ED] p-2 text-center">
              <p className="text-sm font-black text-[#7C2D12]">
                <span aria-hidden="true">{p.emoji} </span>Pesanan {p.nama} ({k.noSusun + 1} dari 3)
              </p>
              <div className="mx-auto mt-1 w-40 rounded-lg bg-[#1E5B43] p-2 font-mono text-2xl font-black text-white" aria-label={`${p.a} ditambah ${p.b}`}>
                <p className="text-right tracking-widest">{p.a}</p>
                <p className="border-b-2 border-white text-right tracking-widest">+ {p.b}</p>
                <p className="text-right tracking-widest text-[#FDE047]">
                  {k.sPuluhan}
                  {k.sSatuan}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-3" role="group" aria-label="Isi hasil susun">
              <Atur nama="puluhan" nilai={k.sPuluhan} onKurang={() => susunUbah("puluhan", -1)} onTambah={() => susunUbah("puluhan", 1)} />
              <Atur nama="simpanan" nilai={k.sSimpan} onKurang={() => susunUbah("simpan", -1)} onTambah={() => susunUbah("simpan", 1)} />
              <Atur nama="satuan" nilai={k.sSatuan} onKurang={() => susunUbah("satuan", -1)} onTambah={() => susunUbah("satuan", 1)} />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={susunPeriksa}>
                {"\u{2705}"} Periksa
              </button>
              <button type="button" className={tombol} onClick={() => ubah(pesananBerikut(k), "Pesanan berikutnya. Susun lagi.")}>
                Pesanan berikutnya {"\u{27A1}"}
              </button>
            </div>
            <p className="text-center text-xs font-bold text-[#831843]">
              Pesanan tepat: {k.susunBenar.length} dari 3 {k.susunBenar.includes(k.noSusun) ? `(jumlahnya ${jumlahPesanan(k)})` : ""}
            </p>
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border-4 border-[#1E3A8A] bg-[#EFF6FF] p-2 text-center">
                <p className="text-xs font-black text-[#1E3A8A]">Batang puluhan: {k.batang}</p>
                <div className="flex min-h-[48px] flex-wrap items-end justify-center gap-1" aria-hidden="true">
                  {Array.from({ length: k.batang }, (_, i) => (
                    <span key={i} className="block h-10 w-2.5 rounded-sm border border-[#1E3A8A] bg-[#2563EB]" style={{ backgroundImage: "repeating-linear-gradient(180deg,transparent 0 3px,rgba(255,255,255,0.6) 3px 4px)" }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl border-4 border-[#B45309] bg-[#FFFBEB] p-2 text-center">
                <p className="text-xs font-black text-[#B45309]">Butir satuan: {k.butir}</p>
                <div className="flex min-h-[48px] flex-wrap content-start justify-center gap-0.5" aria-hidden="true">
                  {Array.from({ length: k.butir }, (_, i) => (
                    <span key={i} className="block h-3 w-3 border border-[#B45309] bg-[#F59E0B]" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={tukarKu}>
                {"\u{1F504}"} Tukar sepuluh butir
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "panjang" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#1E3A8A] bg-white p-2 text-center text-lg font-black text-[#1E3A8A]">
              <p>
                {PANJANG_SIM.a} = {Math.floor(PANJANG_SIM.a / 10) * 10} + {PANJANG_SIM.a % 10}
              </p>
              <p>
                {PANJANG_SIM.b} = {Math.floor(PANJANG_SIM.b / 10) * 10} + {PANJANG_SIM.b % 10}
              </p>
            </div>
            <div className="flex flex-wrap items-start justify-center gap-4" role="group" aria-label="Jumlahkan tiap bagian">
              <Atur nama="jumlah puluhan" nilai={k.pjPuluh} lebar="w-14" onKurang={() => panjangUbah("puluh", -1)} onTambah={() => panjangUbah("puluh", 1)} />
              <Atur nama="jumlah satuan" nilai={k.pjSatuan} onKurang={() => panjangUbah("satuan", -1)} onTambah={() => panjangUbah("satuan", 1)} />
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={panjangPeriksa}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tiga" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#BE185D] bg-white p-2 text-center text-xl font-black text-[#831843]">
              {TIGA_SIM.a} + {TIGA_SIM.b} + {TIGA_SIM.c}
            </div>
            <div className="flex flex-wrap items-start justify-center gap-4" role="group" aria-label="Jumlahkan dua-dua">
              <div className="space-y-1 text-center">
                <Atur nama="dua bilangan pertama" nilai={k.tgSementara} lebar="w-14" onKurang={() => tigaUbah("sementara", -1)} onTambah={() => tigaUbah("sementara", 1)} />
                <div className="flex justify-center gap-1">
                  <button type="button" className={tombol} onClick={() => tigaUbah("sementara", -10)}>
                    -10
                  </button>
                  <button type="button" className={tombol} onClick={() => tigaUbah("sementara", 10)}>
                    +10
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-center">
                <Atur nama="jumlah seluruhnya" nilai={k.tgHasil} lebar="w-14" onKurang={() => tigaUbah("hasil", -1)} onTambah={() => tigaUbah("hasil", 1)} />
                <div className="flex justify-center gap-1">
                  <button type="button" className={tombol} onClick={() => tigaUbah("hasil", -10)}>
                    -10
                  </button>
                  <button type="button" className={tombol} onClick={() => tigaUbah("hasil", 10)}>
                    +10
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={tigaPeriksa}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "periksa" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#BE185D] bg-white p-2 text-center text-xl font-black text-[#831843]">
              <p>
                {PERIKSA_SIM.a} + {PERIKSA_SIM.b} = ?
              </p>
              <p>
                {PERIKSA_SIM.b} + {PERIKSA_SIM.a} = ?
              </p>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Setelah urutannya ditukar, hasilnya:</p>
            <div className="flex justify-center gap-2" role="group" aria-label="Pilih sama atau beda">
              <button type="button" className={pilihan(k.pkPilih === "sama")} aria-pressed={k.pkPilih === "sama"} onClick={() => ubah(pilihPeriksa(k, "sama"))}>
                sama
              </button>
              <button type="button" className={pilihan(k.pkPilih === "beda")} aria-pressed={k.pkPilih === "beda"} onClick={() => ubah(pilihPeriksa(k, "beda"))}>
                beda
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Taksirannya sekitar:</p>
            <div className="flex justify-center gap-2" role="group" aria-label="Pilih taksiran">
              {PERIKSA_SIM.taksir.map((n) => (
                <button key={n} type="button" className={pilihan(k.pkTaksir === n)} aria-pressed={k.pkTaksir === n} onClick={() => ubah(pilihTaksir(k, n))}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPesanan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "susun" ? kalimatSusun(k) : k.mode === "tukar" ? kalimatTukar(k) : k.mode === "panjang" ? kalimatPanjang(k) : k.mode === "tiga" ? kalimatTiga(k) : kalimatPeriksa(k))}
      </p>
    </div>
  );
}
