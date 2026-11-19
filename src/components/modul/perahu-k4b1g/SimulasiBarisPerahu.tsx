"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalPerahu,
  bagian,
  jumlahPenumpang,
  kalikanSatuan,
  kalimatSusun,
  kalimatUlang,
  kalimatUrai,
  kata,
  mulaiLagiPerahu,
  periksaSusun,
  periksaUlang,
  periksaUrai,
  petunjukSusun,
  petunjukUlang,
  petunjukUrai,
  pilihanSusun,
  pilihanUraiP,
  pilihanUraiS,
  pilihModePerahu,
  pilihSusun,
  pilihUrai,
  sasaranUlang,
  targetSusun,
  targetUlang,
  targetUrai,
  ubahPerahu,
  ubahTulis,
  type KeadaanPerahu,
  type ModePerahu,
} from "./logika";
import { MISI_PERAHU_TEKS } from "./data-sim";
import { DeretPerahu, PapanSusunSvg } from "./GambarPerahu";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab G: Baris Perahu (tema Penginapan Pulau Karang Indah). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Ulang (tambah perahu satu per satu sampai jumlah penumpang tercapai), Urai (pilih hasil kali puluhan dan satuan),
 * dan Susun (tekan Kalikan satuan, tulis dan simpan angkanya, pilih hasil akhir; alat menolak memeriksa sebelum satuan dikalikan).
 */
const MODE: { id: ModePerahu; nama: string; ikon: string }[] = [
  { id: "ulang", nama: "Ulang", ikon: "\u{2795}" },
  { id: "urai", nama: "Urai", ikon: "\u{2702}" },
  { id: "susun", nama: "Susun", ikon: "\u{2716}" },
];

export default function SimulasiBarisPerahu({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPerahu) => void }) {
  const [k, setK] = useState<KeadaanPerahu>(() => awalPerahu());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPerahu, ucap?: string) => {
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
  const kecil = "min-h-[40px] min-w-[40px] rounded-full border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5] disabled:opacity-30";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0369A1] bg-[#0369A1] text-white" : "border-[#0369A1] bg-white text-[#0369A1]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModePerahu) => {
    ubah(pilihModePerahu(k, m), m === "ulang" ? "Tambah perahu satu per satu sampai penumpang cukup." : m === "urai" ? "Pilih hasil kali puluhan dan satuan." : "Tekan Kalikan satuan, lalu tulis dan simpan angkanya.");
  };

  const tu = targetUlang(k);
  const tr = targetUrai(k);
  const ts = targetSusun(k);
  const gs = bagian(ts.a, ts.b);
  const gr = bagian(tr.a, tr.b);

  const tambahPerahu = (d: number) => {
    const r = ubahPerahu(k, d);
    if (!r.ok) return salah(d < 0 ? "Belum ada perahu yang bisa dikurangi." : "Perahunya sudah sembilan, tidak bisa ditambah lagi.");
    ubah(r.k, `${kata(r.k.perahu)} perahu, ${kata(jumlahPenumpang(r.k))} penumpang.`);
  };
  const periksaUlangKu = () => {
    const r = periksaUlang(k);
    if (r.ok) return ubah(r.k, "Betul! Jumlah penumpangnya cukup.");
    ubah(r.k);
    salah(petunjukUlang(k));
  };
  const periksaUraiKu = () => {
    const r = periksaUrai(k);
    if (r.ok) return ubah(r.k, "Betul! Kedua hasil kali bagian sudah tepat.");
    ubah(r.k);
    salah(petunjukUrai(k));
  };
  const tekanSatuan = () => ubah(kalikanSatuan(k), `Satuan dikalikan: ${kata(gs.u)} kali ${kata(ts.b)} sama dengan ${kata(gs.satuan)}.`);
  const ubahAngka = (bg: "tulis" | "simpan", d: number) => {
    const r = ubahTulis(k, bg, d);
    if (!r.ok) return salah(!k.sudahSatuan ? "Tekan Kalikan satuan dulu." : "Angka hanya boleh nol sampai sembilan.");
    ubah(r.k, kata(r.k[bg]));
  };
  const periksaSusunKu = () => {
    const r = periksaSusun(k);
    if (r.ok) return ubah(r.k, "Betul! Hasil susun sudah tepat.");
    ubah(r.k);
    salah(petunjukSusun(k));
  };

  const pilU = pilihanUraiP(k);
  const pilS = pilihanUraiS(k);
  const pilH = pilihanSusun(k);

  return (
    <div className="space-y-3" data-uji="simulasi-baris-perahu">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0369A1] bg-[#F0F9FF] p-2">
        <p className="text-sm font-black text-[#0C4A6E]">Misi Baris Perahu</p>
        <p className="text-xs font-bold text-[#0C4A6E]/80">{MISI_PERAHU_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "ulang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#0C4A6E]">
              Tiap perahu memuat {tu.a} penumpang. Sasaran: {sasaranUlang(k)} penumpang.
            </p>
            {k.perahu > 0 ? <DeretPerahu a={tu.a} b={k.perahu} rupa="diagram" benda="perahu" tanya={`jumlah = ${jumlahPenumpang(k)}`} /> : <p className="mx-auto max-w-[420px] rounded-xl border-2 border-dashed border-[#0EA5E9] p-4 text-center text-sm font-bold text-[#0C4A6E]">Dermaga masih kosong.</p>}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button type="button" className={kecil} onClick={() => tambahPerahu(-1)} aria-label="Kurangi satu perahu">
                {"−"}
              </button>
              <span className="min-w-[5rem] text-center text-lg font-black text-[#15803D]">{k.perahu} perahu</span>
              <button type="button" className={kecil} onClick={() => tambahPerahu(1)} aria-label="Tambah satu perahu">
                +
              </button>
              <button type="button" className={tombol} onClick={periksaUlangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urai" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#0C4A6E]">
              {tr.a} diurai menjadi {gr.t * 10} dan {gr.u}, lalu dikali {tr.b}.
            </p>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-xl border-4 border-[#0369A1] bg-white p-2">
              <p className="text-xs font-black text-[#1C01A5]">Hasil kali puluhan ({gr.t * 10} × {tr.b})</p>
              <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil kali puluhan">
                {pilU.map((p, i) => (
                  <button key={p} type="button" onClick={() => ubah(pilihUrai(k, "p", i))} aria-pressed={k.uraiP === i} className={pilihan(k.uraiP === i)}>
                    {p}
                  </button>
                ))}
              </div>
              <p className="text-xs font-black text-[#1C01A5]">Hasil kali satuan ({gr.u} × {tr.b})</p>
              <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil kali satuan">
                {pilS.map((p, i) => (
                  <button key={p} type="button" onClick={() => ubah(pilihUrai(k, "s", i))} aria-pressed={k.uraiS === i} className={pilihan(k.uraiS === i)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUraiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <PapanSusunSvg a={ts.a} b={ts.b} rupa="diagram" tanya={k.sudahSatuan ? `tulis ${k.tulis}, simpan ${k.simpan}` : "satuan belum dikalikan"} simpan={k.sudahSatuan && k.simpan > 0 ? k.simpan : undefined} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tekanSatuan}>
                {"\u{2716}"} Kalikan satuan
              </button>
            </div>
            {k.sudahSatuan ? (
              <>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {(["tulis", "simpan"] as const).map((bg) => (
                    <div key={bg} className="flex items-center gap-1">
                      <span className="text-sm font-black text-[#1C01A5]">{bg}</span>
                      <button type="button" className={kecil} onClick={() => ubahAngka(bg, -1)} aria-label={`Kurangi angka ${bg}`}>
                        {"−"}
                      </button>
                      <span className="min-w-[1.5rem] text-center text-lg font-black text-[#15803D]">{k[bg]}</span>
                      <button type="button" className={kecil} onClick={() => ubahAngka(bg, 1)} aria-label={`Tambah angka ${bg}`}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-center text-xs font-black text-[#1C01A5]">Pilih hasil akhir</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil akhir">
                  {pilH.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihSusun(k, i))} aria-pressed={k.susunPilih === i} className={pilihan(k.susunPilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSusunKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPerahu(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "ulang" ? kalimatUlang(k) : k.mode === "urai" ? kalimatUrai(k) : kalimatSusun(k))}
      </p>
    </div>
  );
}
