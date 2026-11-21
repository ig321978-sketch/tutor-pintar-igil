"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalKursi,
  bedaMesin,
  kalimatMesin,
  kalimatRantai,
  kalimatTabel,
  loncat,
  lompatTabel,
  mulaiLagiKursi,
  pasanganMesin,
  periksaMesin,
  periksaRantai,
  periksaTabel,
  petunjukMesin,
  petunjukRantai,
  petunjukTabel,
  pilihAturan,
  pilihBeda,
  pilihModeKursi,
  pilihTabel,
  pratinjauMesin,
  targetRantai,
  targetTabel,
  ulangRantai,
  urungkanLoncat,
  type KeadaanKursi,
  type ModeKursi,
} from "./logika";
import { polaSuku, urut } from "./logika-cpa";
import { MISI_KURSI_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 3 Sub-Bab B: Papan Kursi (penutup bab, tema Orkestra Angklung Kampung Senandung). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Rantai (pilih beda lalu tarik loncatan tambah atau kurang sampai baris sasaran; alat menolak loncatan yang membuat jumlah kursi kurang dari nol),
 * Mesin (atur aturan tambah atau kurang beserta besarnya sampai cocok dengan dua pasangan masuk dan keluar), dan Tabel (atur banyak lompatan lalu pilih bilangan pada urutan ke-n).
 * Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeKursi; nama: string; ikon: string }[] = [
  { id: "rantai", nama: "Rantai", ikon: "\u{1F517}" },
  { id: "mesin", nama: "Mesin", ikon: "\u{1F527}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
];

/** Satu baris kursi kecil sebanyak `n` (kisi tetap lima belas kolom). */
function BarisKursiKecil({ n }: { n: number }) {
  return (
    <div className="mx-auto w-fit max-w-full rounded-lg border-2 border-[#B45309]/50 bg-white p-1.5" role="img" aria-label={`${n} kursi`} data-kursi={n} style={{ display: "grid", gridTemplateColumns: "repeat(15, 14px)", gridAutoRows: "14px", gap: 2 }}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} data-kursi-sel="1" className="rounded-sm border border-[#92400E] bg-[#F59E0B]" />
      ))}
    </div>
  );
}

export default function SimulasiPapanKursi({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKursi) => void }) {
  const [k, setK] = useState<KeadaanKursi>(() => awalKursi());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap perubahan keadaan mengosongkan pesan lama; pesan baru hanya bila diberikan. */
  const ubah = (baru: KeadaanKursi, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ucap);
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9A3412] bg-[#9A3412] text-white" : "border-[#9A3412] bg-white text-[#9A3412]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeKursi) => {
    ubah(pilihModeKursi(k, m), m === "rantai" ? "Pilih beda, lalu tarik loncatan sampai baris sasaran." : m === "mesin" ? "Atur aturan mesin sampai cocok dengan bilangan masuk dan keluar." : "Atur banyak lompatan, lalu pilih bilangan pada urutan yang ditanyakan.");
  };

  const tr = targetRantai(k);
  const tt = targetTabel(k);
  const pm = pasanganMesin(k);
  const prat = pratinjauMesin(k);

  const loncatK = (op: "tambah" | "kurang") => {
    const r = loncat(k, op);
    if (r.ok) return ubah(r.k);
    if (r.sebab === "nol") return ubah(r.k, "Alat menolak. Jumlah kursi tidak boleh kurang dari nol.");
    if (r.sebab === "penuh") return salah("Rantai sudah cukup panjang. Urungkan satu loncatan bila perlu.");
    salah("Pilih bedanya dulu, lalu tekan Loncat tambah atau Loncat kurang.");
  };
  const periksaR = () => {
    const r = periksaRantai(k);
    if (r.ok) return ubah(r.k, "Betul! Rantai sampai baris sasaran dengan beda yang sama.");
    ubah(r.k);
    salah(petunjukRantai(k));
  };
  const aturanK = (op: "tambah" | "kurang") => {
    const r = pilihAturan(k, op);
    if (!r.ok) return ubah(r.k, "Alat menolak. Aturan kurang sebesar itu membuat jumlah kursi kurang dari nol.");
    ubah(r.k);
  };
  const bedaM = (d: 1 | -1) => {
    const r = bedaMesin(k, d);
    if (!r.ok) return ubah(r.k, "Alat menolak. Aturan kurang sebesar itu membuat jumlah kursi kurang dari nol.");
    ubah(r.k);
  };
  const periksaM = () => {
    const r = periksaMesin(k);
    if (r.ok) return ubah(r.k, "Betul! Aturan mesin cocok dengan kedua pasangan.");
    ubah(r.k);
    salah(petunjukMesin(k));
  };
  const periksaT = () => {
    const r = periksaTabel(k);
    if (r.ok) return ubah(r.k, "Betul! Lompatannya satu kurang dari nomor urutan, dan bilangannya cocok.");
    ubah(r.k);
    salah(petunjukTabel(k));
  };

  const awalRantaiLen = 3;
  const panelBeda = (angka: number, kurang: () => void, tambah: () => void, nama: string) => (
    <div className="flex items-center justify-center gap-2" role="group" aria-label={nama}>
      <button type="button" className={tombol} onClick={kurang} aria-label={`${nama} kurangi`}>
        {"−"}
      </button>
      <span className="min-w-[96px] rounded-xl border-2 border-[#9A3412] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
        {nama}: {angka === 0 ? "?" : angka}
      </span>
      <button type="button" className={tombol} onClick={tambah} aria-label={`${nama} tambahi`}>
        +
      </button>
    </div>
  );

  return (
    <div className="space-y-3" data-uji="simulasi-papan-kursi">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9A3412] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Papan Kursi</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_KURSI_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "rantai" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              Tiga baris pertama sudah ada. Lanjutkan rantai sampai baris {urut(tr.sampai)}. Sekarang ada {k.rantai.length} baris.
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5 rounded-xl border-4 border-[#9A3412] bg-white p-1.5" role="group" aria-label="Rantai loncat">
              {k.rantai.map((n, i) => (
                <div key={i} data-rantai={n} className={`rounded-lg border-2 px-1 py-1 text-center ${i < awalRantaiLen ? "border-[#1C01A5] bg-[#EFF6FF]" : "border-[#B45309] bg-[#FEF3C7]"}`}>
                  <p className="text-[10px] font-black text-[#7C2D12]">baris {urut(i + 1)}</p>
                  <p className="text-lg font-black leading-none text-[#1C01A5]">{n}</p>
                </div>
              ))}
            </div>
            <BarisKursiKecil n={k.rantai[k.rantai.length - 1]} />
            {panelBeda(
              k.beda,
              () => ubah(pilihBeda(k, -1)),
              () => ubah(pilihBeda(k, 1)),
              "Beda",
            )}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => loncatK("kurang")}>
                {"➖"} Loncat kurang
              </button>
              <button type="button" className={tombol} onClick={() => loncatK("tambah")}>
                {"➕"} Loncat tambah
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(urungkanLoncat(k))} disabled={k.rantai.length <= awalRantaiLen}>
                {"↩️"} Urungkan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangRantai(k), "Rantai dikembalikan ke tiga baris pertama.")}>
                {"\u{1F5D1}"} Ulang rantai
              </button>
              <button type="button" className={tombol} onClick={periksaR}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "mesin" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">Atur aturan mesin supaya cocok dengan kedua pasangan bilangan.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pasangan masuk dan keluar">
              {pm.map(([masuk, keluar], i) => (
                <div key={i} className="rounded-xl border-2 border-[#9A3412] bg-white px-2 py-1.5 text-center text-sm font-black text-[#1C01A5]" data-pasangan={`${masuk}-${keluar}`}>
                  masuk {masuk} {"➡️"} keluar {keluar}
                </div>
              ))}
            </div>
            <div className="mx-auto max-w-[420px] rounded-xl border-4 border-[#9A3412] bg-[#FEF3C7] p-2 text-center" role="img" aria-label="Mesin aturan">
              <p className="text-xs font-black text-[#7C2D12]">Mesin aturan</p>
              <p className="text-2xl font-black text-[#DC2626]">
                {k.mesinOp ? (k.mesinOp === "tambah" ? "+" : "−") : "?"}
                {k.mesinBeda === 0 ? "?" : k.mesinBeda}
              </p>
              <p className="text-xs font-black text-[#7C2D12]">
                {prat === null ? "Aturan belum lengkap." : `Coba: masuk ${pm[0][0]} keluar ${prat}`}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tambah atau kurang">
              <button type="button" className={saklar(k.mesinOp === "tambah")} aria-pressed={k.mesinOp === "tambah"} onClick={() => aturanK("tambah")}>
                {"➕"} Tambah
              </button>
              <button type="button" className={saklar(k.mesinOp === "kurang")} aria-pressed={k.mesinOp === "kurang"} onClick={() => aturanK("kurang")}>
                {"➖"} Kurang
              </button>
            </div>
            {panelBeda(
              k.mesinBeda,
              () => bedaM(-1),
              () => bedaM(1),
              "Besar",
            )}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaM}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">Cari bilangan pada urutan {urut(tt.n)}. Atur banyak lompatan dari urutan pertama.</p>
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-xl border-4 border-[#9A3412] bg-white" role="group" aria-label="Tabel urutan">
              {[
                ["urutan", "1", "2", "3", String(tt.n)],
                ["bilangan", ...polaSuku(tt.a, tt.d, tt.arah, 3).map(String), "?"],
              ].map((baris, r) => (
                <div key={r} className="grid" style={{ gridTemplateColumns: "72px repeat(4, minmax(0, 1fr))" }}>
                  {baris.map((t, i) => (
                    <div key={i} className={`border border-[#FCD34D] px-1 py-1.5 text-center text-sm font-black ${i === 0 ? "bg-[#FEF3C7] text-[#7C2D12]" : t === "?" ? "text-[#DC2626]" : "text-[#1C01A5]"}`}>
                      {t}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {panelBeda(
              k.lompat,
              () => ubah(lompatTabel(k, -1)),
              () => ubah(lompatTabel(k, 1)),
              "Lompatan",
            )}
            <p className="text-center text-xs font-black text-[#7C2D12]">Pilih bilangan pada urutan {urut(tt.n)}</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bilangan">
              {tt.pil.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihTabel(k, i))} aria-pressed={k.tabelPilih === i} className={pilihan(k.tabelPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaT}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiKursi(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "rantai" ? kalimatRantai(k) : k.mode === "mesin" ? kalimatMesin(k) : kalimatTabel(k))}
      </p>
    </div>
  );
}
