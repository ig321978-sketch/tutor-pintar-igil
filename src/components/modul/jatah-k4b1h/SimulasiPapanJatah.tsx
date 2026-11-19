"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalJatah,
  bagikanPutaran,
  cekKali,
  hasilKaliKlaim,
  hurufBesar,
  kalimatKali,
  kalimatKurang,
  kalimatRata,
  kalimatSusun,
  kata,
  klaimBenar,
  kurangi,
  mulaiLagiJatah,
  periksaKali,
  periksaKurang,
  periksaRata,
  periksaSusun,
  petunjukKali,
  petunjukKurang,
  petunjukRata,
  petunjukSusun,
  pilihanKurang,
  pilihanQ1,
  pilihanQ2,
  pilihanRata,
  pilihanS1,
  pilihKurang,
  pilihModeJatah,
  pilihQ1,
  pilihQ2,
  pilihRata,
  pilihS1,
  putusKali,
  satuanSusun,
  sisaKurang,
  tamuTersisa,
  targetKali,
  targetKurang,
  targetRata,
  targetSusun,
  turunkanSusun,
  type KeadaanJatah,
  type ModeJatah,
} from "./logika";
import { MISI_JATAH_TEKS } from "./data-sim";
import { EMOJI_BENDA, Gambar, PintuKamar } from "./GambarJatah";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab H: Papan Jatah (Misi Jatah). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Rata (bagikan satu putaran ke tiap kamar; alat menolak Periksa selama masih bisa satu putaran lagi), Kurang (kurangi pembagi berulang kali; alat menolak bila sisa kurang dari pembagi),
 * Susun (hasil puluhan, sisa puluhan, turunkan angka satuan; alat menolak menurunkan sebelum sisa puluhan dipilih benar), dan Kali (Cek Kali, lalu putuskan benar atau keliru).
 */
const MODE: { id: ModeJatah; nama: string; ikon: string }[] = [
  { id: "rata", nama: "Rata", ikon: "\u{1F9FA}" },
  { id: "kurang", nama: "Kurang", ikon: "\u{1F501}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F4DD}" },
  { id: "kali", nama: "Kali", ikon: "\u{2705}" },
];

export default function SimulasiPapanJatah({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJatah) => void }) {
  const [k, setK] = useState<KeadaanJatah>(() => awalJatah());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** `tampil` false: ucapan hanya didengar, teks di layar dikosongkan supaya pesan lama tidak tertinggal di bawah tantangan baru. */
  const ubah = (baru: KeadaanJatah, ucap?: string, tampil = true) => {
    setK(baru);
    setCatatan(ucap && tampil ? ucap : "");
    if (ucap) speakGuru(ucap);
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9D174D] bg-[#9D174D] text-white" : "border-[#9D174D] bg-white text-[#9D174D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#F9A8D4] bg-white"}`;

  const ganti = (m: ModeJatah) =>
    ubah(
      pilihModeJatah(k, m),
      m === "rata" ? "Bagikan benda ke kamar, satu putaran tiap ketukan." : m === "kurang" ? "Kurangi bilangan dengan pembagi berulang kali." : m === "susun" ? "Bagi dari puluhan: pilih hasil puluhan dan sisanya." : "Tekan Cek Kali, lalu putuskan hasil bagi benar atau keliru.",
    );

  const tr = targetRata(k);
  const tk = targetKurang(k);
  const ts = targetSusun(k);
  const tl = targetKali(k);
  const pilR = pilihanRata(k);
  const pilK = pilihanKurang(k);
  const emoji = EMOJI_BENDA[tr.benda] ?? "\u{1F9F3}";

  const bagikan = () => {
    const r = bagikanPutaran(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(`Alat menolak. ${hurufBesar(tr.benda)} yang tersisa tidak cukup untuk satu putaran lagi, jadi pilih banyak ${tr.benda} di tiap kamar.`);
    }
    ubah(r.k);
  };
  const periksaRataKu = () => {
    const r = periksaRata(k);
    if (r.ok) return ubah(r.k, `Betul! Tiap kamar mendapat ${kata(Math.floor(tr.n / tr.d))} ${tr.benda}${tr.n % tr.d > 0 ? `, dan tersisa ${kata(tr.n % tr.d)}` : ""}.`, false);
    ubah(r.k);
    salah(petunjukRata(k));
  };
  const kurangKu = () => {
    const r = kurangi(k);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Sisanya sudah kurang dari pembagi, jadi tidak bisa dikurangi lagi. Pilih banyak pengurangan.");
    }
    ubah(r.k);
  };
  const periksaKurangKu = () => {
    const r = periksaKurang(k);
    if (r.ok) return ubah(r.k, `Betul! Ada ${kata(Math.floor(tk.n / tk.d))} pengurangan, itulah hasil baginya.`, false);
    ubah(r.k);
    salah(petunjukKurang(k));
  };
  const turunKu = () => {
    const r = turunkanSusun(k);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Pilih dulu hasil puluhan dan sisa puluhan dengan benar, baru turunkan angka satuan.");
    }
    ubah(r.k, `Angka satuan ${kata(satuanSusun(k))} diturunkan di samping sisa puluhan.`);
  };
  const periksaSusunKu = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, "Betul! Pembagian bersusun sudah selesai.", false);
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  const cekKaliKu = () => {
    const baru = cekKali(k);
    const t = `${tl.klaim} × ${tl.d} = ${hasilKaliKlaim(k)}`;
    ubah(baru, `${tl.klaim} kali ${tl.d} hasilnya ${kata(hasilKaliKlaim(k))}. ${klaimBenar(k) ? "Sama dengan bilangan awal." : "Belum sama dengan bilangan awal."}`);
    void t;
  };
  const putus = (p: 0 | 1) => {
    const r = putusKali(k, p);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Tekan Cek Kali dulu sebelum memutuskan.");
    }
    ubah(r.k);
  };
  const periksaKaliKu = () => {
    const r = periksaKali(k);
    if (r.ok) return ubah(r.k, "Betul! Hasil bagi sudah diperiksa dengan perkalian.", false);
    ubah(r.k);
    salah(petunjukKali(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-papan-jatah">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9D174D] bg-[#FDF2F8] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Papan Jatah</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_JATAH_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "rata" ? (
          <div className="space-y-2">
            <Gambar label={`${tr.benda} dibagikan ke kamar`} judul={`${tr.n} ${tr.benda} dibagi ke ${tr.d} kamar, satu putaran tiap ketukan`}>
              <rect x={8} y={20} width={284} height={40} rx={6} fill="#FEF3C7" stroke="#92400E" strokeWidth={2} />
              {Array.from({ length: tamuTersisa(k) }, (_, i) => (
                <text key={i} x={16 + (i % 16) * 16} y={i < 16 ? 35 : 52} fontSize={12} aria-hidden="true" data-sisa="1">
                  {emoji}
                </text>
              ))}
              <text x={16} y={71} fontSize={10} fontWeight={900} fill="#1C01A5">
                belum dibagi: {tamuTersisa(k)} {tr.benda}
              </text>
              <PintuKamar d={tr.d} y={76} rupa="benda" tinggi={96} isi={{ emoji, banyak: k.putaran }} />
              <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill="#B45309">
                tiap kamar berisi {k.putaran} {tr.benda}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={bagikan}>
                {"\u{1F9F3}"} Bagikan satu putaran
              </button>
              <button type="button" className={tombol} onClick={periksaRataKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa {tr.benda} di tiap kamar?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil tiap kamar">
              {pilR.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihRata(k, i))} aria-pressed={k.rataPilih === i} className={pilihan(k.rataPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "kurang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Bilangan {tk.n}, tiap ketukan dikurangi {tk.d}
            </p>
            <div className="mx-auto max-w-[420px] rounded-xl border-4 border-[#F9A8D4] bg-white px-2 py-2 text-center">
              <p className="text-3xl font-black text-[#9D174D]">{sisaKurang(k)}</p>
              <p className="text-xs font-black text-[#831843]/80">{k.kali} kali dikurangi</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={kurangKu}>
                {"\u{2796}"} Kurangi
              </button>
              <button type="button" className={tombol} onClick={periksaKurangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa kali pengurangan?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih banyak pengurangan">
              {pilK.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihKurang(k, i))} aria-pressed={k.kurangPilih === i} className={pilihan(k.kurangPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              {ts.n} dibagi {ts.d}: bagi dari puluhan ke satuan
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Hasil membagi angka puluhan?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil puluhan">
              {pilihanQ1(k).map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihQ1(k, i))} aria-pressed={k.q1Pilih === i} className={pilihan(k.q1Pilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Sisa dari puluhan?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih sisa puluhan">
              {pilihanS1(k).map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihS1(k, i))} aria-pressed={k.s1Pilih === i} className={pilihan(k.s1Pilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={turunKu}>
                {"\u{2B07}"} Turunkan angka
              </button>
              <button type="button" className={tombol} onClick={periksaSusunKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
            {k.turun ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Hasil membagi bilangan yang diturunkan?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil satuan">
                  {pilihanQ2(k).map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihQ2(k, i))} aria-pressed={k.q2Pilih === i} className={pilihan(k.q2Pilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {k.mode === "kali" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-[420px] rounded-xl border-4 border-[#F9A8D4] bg-white px-2 py-2 text-center">
              <p className="text-xs font-black text-[#831843]/80">
                {tl.n} dibagi {tl.d} katanya {tl.klaim}
              </p>
              {k.kaliCek ? (
                <p className="text-2xl font-black text-[#9D174D]">
                  {tl.klaim} × {tl.d} = {hasilKaliKlaim(k)}
                </p>
              ) : (
                <p className="text-sm font-black text-[#831843]/60">Tekan Cek Kali</p>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={cekKaliKu}>
                {"\u{1F501}"} Cek Kali
              </button>
              <button type="button" className={saklar(k.kaliPutus === 0)} onClick={() => putus(0)}>
                {"\u{2705}"} Benar
              </button>
              <button type="button" className={saklar(k.kaliPutus === 1)} onClick={() => putus(1)}>
                {"\u{274C}"} Keliru
              </button>
              <button type="button" className={tombol} onClick={periksaKaliKu}>
                Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJatah(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "rata" ? kalimatRata(k) : k.mode === "kurang" ? kalimatKurang(k) : k.mode === "susun" ? kalimatSusun(k) : kalimatKali(k)))}
      </p>
    </div>
  );
}
