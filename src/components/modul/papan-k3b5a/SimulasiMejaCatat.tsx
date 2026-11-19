"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalCatat,
  bundelSekarang,
  cekJangkau,
  geserKartu,
  hapusGaris,
  hariLebih,
  hurufBesar,
  jangkauanSasaran,
  kalimatBanding,
  kalimatJangkau,
  kalimatTurus,
  kalimatUjung,
  kalimatUrut,
  kata,
  mulaiLagiCatat,
  periksaBanding,
  periksaJangkau,
  periksaTurus,
  periksaUjung,
  periksaUrut,
  petunjukBanding,
  petunjukJangkau,
  petunjukTurus,
  petunjukUjung,
  petunjukUrut,
  pilihanBanding,
  pilihanJangkau,
  pilihanTurus,
  pilihBanding,
  pilihJangkau,
  pilihKartu,
  pilihLebih,
  pilihModeCatat,
  pilihTurus,
  pilihUjung,
  selisihBanding,
  sisaSekarang,
  tambahGaris,
  tandaiUjung,
  targetBanding,
  targetJangkau,
  targetTurus,
  targetUjung,
  targetUrut,
  urutkanUjung,
  type KeadaanCatat,
  type ModeCatat,
} from "./logika";
import { MAKS_GARIS, MISI_PAPAN_TEKS } from "./data-sim";
import { EMOJI_BENDA, Gambar, TurusSvg } from "./GambarPapan";

/**
 * Simulasi Kelas 3 Bab 5 Sub-Bab A: Meja Catat (Misi Catatan). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, lima alat:
 * Urut (geser kartu data sampai berurutan), Ujung (urutkan, lalu tandai data terkecil dan terbesar; alat menolak menandai sebelum diurutkan),
 * Jangkauan (pilih jangkauan, Cek Jangkauan, Periksa), Banding (dua hari: yang lebih banyak dan selisihnya), dan Turus (ketuk menambah garis, garis kelima menjadi bundel, baca banyak).
 */
const MODE: { id: ModeCatat; nama: string; ikon: string }[] = [
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
  { id: "ujung", nama: "Ujung", ikon: "\u{1F4CF}" },
  { id: "jangkau", nama: "Jangkauan", ikon: "\u{1F501}" },
  { id: "banding", nama: "Banding", ikon: "\u{2696}" },
  { id: "turus", nama: "Turus", ikon: "\u{1F4DD}" },
];

export default function SimulasiMejaCatat({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanCatat) => void }) {
  const [k, setK] = useState<KeadaanCatat>(() => awalCatat());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [hasilCek, setHasilCek] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanCatat, ucap?: string) => {
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
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#93C5FD] bg-white"}`;
  const kartu = (nyala: boolean, tanda?: string) =>
    `relative min-h-[60px] min-w-[44px] flex-1 rounded-xl border-4 px-1 py-1 text-center text-2xl font-black text-[#14532D] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#14532D] bg-white"} ${tanda ? "bg-[#DBEAFE]" : ""}`;

  const ganti = (m: ModeCatat) => {
    setHasilCek("");
    ubah(
      pilihModeCatat(k, m),
      m === "urut"
        ? "Geser kartu sampai data berurutan."
        : m === "ujung"
          ? "Urutkan data, lalu tandai data terkecil dan data terbesar."
          : m === "jangkau"
            ? "Pilih jangkauan, lalu tekan Cek Jangkauan."
            : m === "banding"
              ? "Pilih hari yang lebih banyak dan selisihnya."
              : "Tekan Tambah garis untuk tiap benda.",
    );
  };

  /* ------------------------------ Urut ------------------------------ */
  const geser = (d: -1 | 1) => {
    const r = geserKartu(k, d);
    if (!r.ok) return salah(k.urutSel < 0 ? "Pilih satu kartu dulu, lalu geser." : "Kartu sudah di ujung, tidak bisa lebih jauh.");
    ubah(r.k);
  };
  const periksaUrutKu = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, "Betul! Data sudah berurutan.");
    ubah(r.k);
    salah(petunjukUrut(k));
  };
  /* ------------------------------ Ujung ------------------------------ */
  const urutkan = () => ubah(urutkanUjung(k), "Data sudah berurutan dari yang terkecil ke yang terbesar. Sekarang tandai kedua ujungnya.");
  const tandai = (j: "kecil" | "besar") => {
    const r = tandaiUjung(k, j);
    if (!r.ok) {
      ubah(r.k);
      return salah(k.ujungUrut ? "Pilih satu kartu dulu, lalu tandai." : "Alat menolak. Data belum diurutkan, jadi ujungnya belum bisa ditandai. Tekan Urutkan dulu.");
    }
    ubah(r.k, j === "kecil" ? "Kartu itu ditandai sebagai data terkecil." : "Kartu itu ditandai sebagai data terbesar.");
  };
  const periksaUjungKu = () => {
    const r = periksaUjung(k);
    if (r.ok) return ubah(r.k, `Betul! Data terkecil dan data terbesar sudah tepat untuk ${targetUjung(k).benda}.`);
    ubah(r.k);
    salah(petunjukUjung(k));
  };
  /* ------------------------------ Jangkauan ------------------------------ */
  const cek = () => {
    const r = cekJangkau(k);
    if (!r.ok) return salah(petunjukJangkau(k));
    ubah(r.k);
    const d = targetJangkau(k).data;
    const kecil = Math.min(...d);
    const pesan = r.cocok ? `Data terkecil ${kata(kecil)} ditambah jangkauan itu sama dengan ${kata(r.hasil)}, sama dengan data terbesar. Jangkauannya cocok.` : `Data terkecil ${kata(kecil)} ditambah jangkauan itu sama dengan ${kata(r.hasil)}, belum sama dengan data terbesar. Hitung ulang jangkauannya.`;
    setHasilCek(`${kecil} + ${pilihanJangkau(k)[k.jangPilih]} = ${r.hasil} ${r.cocok ? "(sama dengan data terbesar)" : "(belum sama dengan data terbesar)"}`);
    setCatatan(pesan);
    speakGuru(pesan);
  };
  const periksaJangkauKu = () => {
    const r = periksaJangkau(k);
    if (r.ok) {
      setHasilCek("");
      return ubah(r.k, `Betul! Jangkauannya ${kata(jangkauanSasaran(k))}.`);
    }
    ubah(r.k);
    salah(petunjukJangkau(k));
  };
  /* ------------------------------ Banding ------------------------------ */
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, `Betul! Hari ${hariLebih(k) === 0 ? targetBanding(k).a.hari : targetBanding(k).b.hari} lebih banyak, selisihnya ${kata(selisihBanding(k))}.`);
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  /* ------------------------------ Turus ------------------------------ */
  const tambah = () => {
    const r = tambahGaris(k);
    if (!r.ok) return salah("Garis turus sudah di batas alat.");
    ubah(r.k);
    if (r.k.garis % 5 === 0) {
      const t = `Garis kelima mencoret miring, jadi lima garis menjadi satu bundel. Sudah ${kata(bundelSekarang(r.k))} bundel.`;
      setCatatan(t);
      speakGuru(t);
    }
  };
  const hapus = () => {
    const r = hapusGaris(k);
    if (!r.ok) return salah("Belum ada garis yang bisa dihapus.");
    ubah(r.k);
  };
  const periksaTurusKu = () => {
    const r = periksaTurus(k);
    if (r.ok) return ubah(r.k, `Betul! Ada ${kata(targetTurus(k).banyak)} ${targetTurus(k).benda}.`);
    ubah(r.k);
    salah(petunjukTurus(k));
  };

  const tu = targetUrut(k);
  const tj = targetJangkau(k);
  const tb = targetBanding(k);
  const tt = targetTurus(k);
  const pilJ = pilihanJangkau(k);
  const pilB = pilihanBanding(k);
  const pilT = pilihanTurus(k);
  const emoji = EMOJI_BENDA[tt.benda] ?? "\u{1F527}";

  return (
    <div className="space-y-3" data-uji="simulasi-meja-catat">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#1D4ED8] bg-[#EFF6FF] p-2">
        <p className="text-sm font-black text-[#1E3A8A]">Misi Meja Catat</p>
        <p className="text-xs font-bold text-[#1E3A8A]/80">{MISI_PAPAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tu.benda}: urutkan dari {tu.arah === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil"}</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Kartu data">
              {k.susun.map((n, i) => (
                <button key={`${i}-${n}`} type="button" onClick={() => ubah(pilihKartu(k, i))} aria-pressed={k.urutSel === i} className={kartu(k.urutSel === i)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geser(-1)} aria-label="Geser kartu ke kiri">
                {"\u{25C0}"} Geser kiri
              </button>
              <button type="button" className={tombol} onClick={() => geser(1)} aria-label="Geser kartu ke kanan">
                Geser kanan {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={periksaUrutKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "ujung" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{targetUjung(k).benda}: tandai data terkecil dan data terbesar</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Kartu data">
              {k.ujungSusun.map((n, i) => (
                <button key={`${i}-${n}`} type="button" onClick={() => ubah(pilihUjung(k, i))} aria-pressed={k.ujungSel === i} className={kartu(k.ujungSel === i, i === k.kecilTanda || i === k.besarTanda ? "x" : undefined)}>
                  {n}
                  {i === k.kecilTanda ? <span className="absolute -bottom-1 left-0 right-0 text-[10px] font-black leading-none text-[#1D4ED8]">terkecil</span> : null}
                  {i === k.besarTanda ? <span className="absolute -bottom-1 left-0 right-0 text-[10px] font-black leading-none text-[#DC2626]">terbesar</span> : null}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <button type="button" className={tombol} onClick={urutkan}>
                {"\u{1F522}"} Urutkan
              </button>
              <button type="button" className={tombol} onClick={() => tandai("kecil")}>
                Tandai terkecil
              </button>
              <button type="button" className={tombol} onClick={() => tandai("besar")}>
                Tandai terbesar
              </button>
              <button type="button" className={tombol} onClick={periksaUjungKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jangkau" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tj.benda}: jangkauan = data terbesar dikurangi data terkecil</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Data">
              {tj.data.map((n, i) => (
                <span key={`${i}-${n}`} className="min-h-[52px] min-w-[44px] flex-1 rounded-xl border-4 border-[#14532D] bg-white px-1 py-2 text-center text-2xl font-black text-[#14532D]">
                  {n}
                </span>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa jangkauannya?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jangkauan">
              {pilJ.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setHasilCek("");
                    ubah(pilihJangkau(k, i));
                  }}
                  aria-pressed={k.jangPilih === i}
                  className={pilihan(k.jangPilih === i)}
                >
                  {p}
                </button>
              ))}
            </div>
            {hasilCek ? <p className="rounded-xl border-2 border-dashed border-[#1D4ED8] bg-white px-2 py-1 text-center text-sm font-black text-[#1E3A8A]">{hasilCek}</p> : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={cek}>
                {"\u{1F501}"} Cek Jangkauan
              </button>
              <button type="button" className={tombol} onClick={periksaJangkauKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">Hari mana yang datanya lebih banyak?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-2" role="group" aria-label="Pilih hari yang lebih banyak">
              {[tb.a, tb.b].map((h, i) => (
                <button key={h.hari} type="button" onClick={() => ubah(pilihLebih(k, i as 0 | 1))} aria-pressed={k.bandLebih === i} className={pilihan(k.bandLebih === i)}>
                  {h.hari}
                  <span className="block text-3xl text-[#14532D]">{h.n}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa selisihnya?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih selisih">
              {pilB.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBanding(k, i))} aria-pressed={k.bandPilih === i} className={pilihan(k.bandPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBandingKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "turus" ? (
          <div className="space-y-2">
            <Gambar label="Turus: satu garis satu benda" judul={`${tt.benda}: satu garis untuk satu benda`}>
              <rect x={8} y={22} width={284} height={44} rx={6} fill="#FEF3C7" stroke="#92400E" strokeWidth={2} />
              <text x={150} y={52} textAnchor="middle" fontSize={tt.banyak > 12 ? 13 : 16} aria-hidden="true">
                {Array.from({ length: tt.banyak }, () => emoji).join("")}
              </text>
              <rect x={8} y={74} width={284} height={92} rx={6} fill="#14532D" stroke="#78350F" strokeWidth={5} />
              <TurusSvg banyak={k.garis} cx={150} y={88} warna="#FEF9C3" tinggi={44} jarak={9} tebal={2.8} />
              <text x={150} y={184} textAnchor="middle" fontSize={12} fontWeight={900} fill="#B45309">
                {k.garis} garis{bundelSekarang(k) > 0 ? ` = ${bundelSekarang(k)} bundel + ${sisaSekarang(k)} garis` : ""}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tambah} aria-label="Tambah satu garis turus" disabled={k.garis >= MAKS_GARIS}>
                {"\u{2795}"} Tambah garis
              </button>
              <button type="button" className={tombol} onClick={hapus} aria-label="Hapus satu garis turus">
                {"\u{2796}"} Hapus garis
              </button>
            </div>
            {k.garis === tt.banyak ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Berapa banyak benda?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih banyak">
                  {pilT.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihTurus(k, i))} aria-pressed={k.turusPilih === i} className={pilihan(k.turusPilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTurusKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilCek("");
            ubah(mulaiLagiCatat(), "Mulai lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "urut" ? kalimatUrut(k) : k.mode === "ujung" ? kalimatUjung(k) : k.mode === "jangkau" ? kalimatJangkau(k) : k.mode === "banding" ? kalimatBanding(k) : kalimatTurus(k)))}
      </p>
    </div>
  );
}
