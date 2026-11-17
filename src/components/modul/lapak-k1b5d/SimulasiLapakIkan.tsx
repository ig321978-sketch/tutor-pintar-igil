"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  arahSusunan,
  awalLapak,
  batasPasang,
  bukaLapak,
  gantiPenanda,
  kalimatBanding,
  kalimatLapak,
  kata,
  layaniPembeli,
  masihBisa,
  pasangSatu,
  pilihMode,
  pilihPasang,
  semuaTerlayani,
  sisaPasang,
  tandai,
  tutupLapak,
  taruhUrut,
  ulangLayani,
  ulangUrut,
  type KeadaanLapak,
  type ModeLapak,
} from "./logika";
import { AKUARIUM_SIM, EMOJI, MISI_LAPAK, PEMBELI_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 5 Sub-Bab D: Misi Lapak Ikan bagian satu, Lapak Ikan (sekaligus penutup bab). Akuarium dan pembeli berbeda dari Story.
 * Eksplorasi bebas tanpa skor, empat alat untuk satu model lapak: Pasangkan (dua akuarium, satu pasang tiap ketukan, sisa terlihat),
 * Tandai (paling banyak dan paling sedikit), Urutkan (pindahkan akuarium ke rak lapak), Layani (antrean pembeli, akuarium yang cukup),
 * lalu Buka lapak dengan perayaan akhir cerita bab.
 */
const D = AKUARIUM_SIM;
const PB = PEMBELI_SIM;
const MODE: { id: ModeLapak; nama: string; ikon: string }[] = [
  { id: "pasang", nama: "Pasangkan", ikon: "\u{1F91D}" },
  { id: "tanda", nama: "Tandai", ikon: "\u{1F3F7}\u{FE0F}" },
  { id: "urut", nama: "Urutkan", ikon: "\u{1F4CF}" },
  { id: "layani", nama: "Layani", ikon: "\u{1F6D2}" },
];
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const isiDari = (id: string | null) => D.find((x) => x.id === id)?.isi ?? 0;
const namaDari = (id: string | null) => D.find((x) => x.id === id)?.nama ?? "";

function Ikan({ jenis, n, terang = n }: { jenis: string; n: number; terang?: number }) {
  return (
    <span className="grid grid-cols-5 gap-0 text-[11px] leading-[14px]" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} style={{ opacity: i < terang ? 1 : 0.35 }}>
          {EMOJI[jenis] ?? EMOJI.ikan}
        </span>
      ))}
    </span>
  );
}

export default function SimulasiLapakIkan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLapak) => void }) {
  const [k, setK] = useState<KeadaanLapak>(() => awalLapak(PB));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanLapak, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#1D4ED8] bg-white text-[#1D4ED8]"}`;

  const ketukAkuarium = (id: string) => {
    if (k.buka) return;
    if (k.mode === "pasang") {
      const baru = pilihPasang(k, id);
      ubah(baru, baru.kanan ? `${namaDari(baru.kiri)} dan ${namaDari(baru.kanan)}. Tekan Pasangkan satu.` : baru.kiri ? `${namaDari(id)} dipilih. Pilih satu akuarium lagi.` : "Pilihan dibatalkan.");
    } else if (k.mode === "tanda") {
      ubah(tandai(k, id), `${namaDari(id)} ditandai paling ${k.penanda}.`);
    } else if (k.mode === "urut") {
      const baru = taruhUrut(k, id, D);
      if (baru === k) return;
      const a = arahSusunan(baru, D);
      ubah(baru, baru.urutan.length < D.length ? `${namaDari(id)} dipindahkan ke rak lapak.` : a === "naik" ? "Urut dari yang paling sedikit sampai paling banyak!" : a === "turun" ? "Urut dari yang paling banyak sampai paling sedikit!" : "Belum urut. Ada yang lebih sedikit di belakang yang lebih banyak. Tekan Ulang susunan.");
    } else {
      const r = layaniPembeli(k, id, D, PB);
      if (r.hasil === "habis") return;
      const p = PB[r.pembeli];
      if (r.hasil === "dipakai") speakGuru(`${namaDari(id)} sudah dipakai pembeli lain. Pilih akuarium lain.`);
      else if (r.hasil === "kurang") speakGuru(`Kurang. ${besar(kata(isiDari(id)))} lebih sedikit dari ${kata(p.mau)}. Pilih akuarium yang cukup.`);
      else {
        const sisa = !masihBisa(r.k, D, PB);
        ubah(
          r.k,
          `Cukup. ${besar(kata(isiDari(id)))} ${isiDari(id) === p.mau ? "sama banyak dengan" : "lebih banyak dari"} ${kata(p.mau)}. ${semuaTerlayani(r.k) ? "Semua pembeli terlayani. Tekan Buka lapak." : sisa ? "Pembeli berikutnya tidak mendapat akuarium yang cukup. Tekan Ulang pesanan dan pilih lagi." : ""}`.trim(),
        );
      }
    }
  };

  const paling = (id: string) => (k.palingBanyak === id ? "banyak" : k.palingSedikit === id ? "sedikit" : null);
  const dipilih = (id: string) => k.mode === "pasang" && (k.kiri === id || k.kanan === id);
  const dilayani = (id: string) => k.layani.indexOf(id);
  const iPembeli = k.layani.indexOf(null);
  const batas = batasPasang(k, D);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_LAPAK}</p>

      {k.buka ? (
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#FACC15] bg-[#1E3A8A] p-3 text-center">
          <style>{`@keyframes ls-jatuh{0%{transform:translateY(-20px) rotate(0)}100%{transform:translateY(140px) rotate(300deg)}}`}</style>
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="absolute top-0 block h-2.5 w-1.5 rounded-sm" style={{ left: `${(i * 37) % 100}%`, background: ["#FACC15", "#F472B6", "#60A5FA", "#34D399"][i % 4], animation: `ls-jatuh ${2 + (i % 5) * 0.4}s linear ${(i % 6) * 0.3}s infinite` }} aria-hidden="true" />
          ))}
          <p className="mx-auto inline-block rounded-lg border-4 border-[#BE185D] bg-white px-4 py-1 text-2xl font-black tracking-widest text-[#BE185D]">BUKA</p>
          <p className="mt-2 text-base font-black text-[#FEF08A]">Lapak Ikan Abang resmi buka! Misi Lapak Ikan dan cerita bab ini selesai.</p>
          <button type="button" className={`${tombol} mt-2`} onClick={() => ubah(tutupLapak(k, PB), "Lapak ditutup. Main lagi dari awal.")}>
            {"\u{1F504}"} Main lagi
          </button>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat lapak">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihMode(k, m.id), kalimatLapak(pilihMode(k, m.id), D, PB))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      {/* Lapak: terpal dan akuarium */}
      <div className="rounded-2xl border-4 border-[#1E3A8A] p-2" style={{ background: "repeating-linear-gradient(90deg,#DBEAFE 0 18px,#EFF6FF 18px 36px)" }}>
        <p className="mb-1 text-center text-xs font-black text-[#1E3A8A]">{"\u{1F41F}"} Akuarium di lapak (ketuk akuarium)</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {D.map((a) => {
            const pl = paling(a.id);
            const ur = k.urutan.indexOf(a.id);
            const ly = dilayani(a.id);
            const pilih = dipilih(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => ketukAkuarium(a.id)}
                disabled={k.mode === "urut" && ur !== -1}
                aria-label={`akuarium ${a.nama}${pl ? `, ditandai paling ${pl}` : ""}${ly !== -1 ? `, melayani ${PB[ly].nama}` : ""}`}
                className={`flex min-h-[110px] flex-col items-center justify-between rounded-xl border-4 p-1 disabled:opacity-40 ${pilih ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#0369A1] bg-[#E0F2FE]"}`}
              >
                <span className="text-xs font-black text-[#1C01A5]">{a.nama}</span>
                <Ikan jenis={a.jenis} n={a.isi} />
                <span className="flex flex-wrap justify-center gap-0.5 text-[10px] font-black">
                  {pl ? <span className={`rounded-full px-1.5 text-white ${pl === "banyak" ? "bg-[#BE185D]" : "bg-[#0369A1]"}`}>paling {pl}</span> : null}
                  {ly !== -1 ? <span className="rounded-full bg-[#FACC15] px-1.5 text-[#1C01A5]">{PB[ly].ikon} terjual</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {k.mode === "pasang" ? (
        <div className="rounded-2xl border-4 border-[#15803D] bg-white p-2 text-center">
          <p className="text-sm font-black text-[#15803D]">{"\u{1F91D}"} Pasangkan satu-satu</p>
          {k.kiri && k.kanan ? (
            <div className="mt-1 space-y-1">
              {[k.kiri, k.kanan].map((id) => {
                const a = D.find((x) => x.id === id);
                if (!a) return null;
                return (
                  <div key={id} className="flex items-center gap-1">
                    <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{a.nama}</span>
                    <span className="flex flex-wrap gap-[2px]" aria-hidden="true">
                      {Array.from({ length: a.isi }, (_, i) => (
                        <span key={i} className={`flex h-5 w-5 items-center justify-center rounded text-[12px] ${i < k.dipasang ? "bg-[#BBF7D0]" : k.dipasang >= batas ? "bg-[#FEF3C7] ring-2 ring-[#B45309]" : "bg-[#F1F5F9]"}`}>
                          {EMOJI[a.jenis] ?? EMOJI.ikan}
                        </span>
                      ))}
                    </span>
                  </div>
                );
              })}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <button type="button" className={tombol} disabled={k.dipasang >= batas} onClick={() => {
                  const baru = pasangSatu(k, D);
                  ubah(baru, baru.dipasang >= batas ? kalimatLapak(baru, D, PB) : kata(baru.dipasang));
                }}>
                  {"\u{1F517}"} Pasangkan satu
                </button>
              </div>
              <p className="text-xs font-bold text-[#1C01A5]/80">
                pasangan: {k.dipasang} · {k.dipasang >= batas ? (sisaPasang(k, D) ? `sisa ${sisaPasang(k, D)} tanpa pasangan` : "tanpa sisa, sama banyak") : "belum selesai"}
              </p>
              {k.dipasang >= batas ? <p className="text-xs font-black text-[#15803D]">{kalimatBanding(isiDari(k.kiri), isiDari(k.kanan))}</p> : null}
            </div>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/80">Ketuk dua akuarium.</p>
          )}
        </div>
      ) : null}

      {k.mode === "tanda" ? (
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-4 border-[#BE185D] bg-white p-2">
          <span className="text-sm font-black text-[#BE185D]">Tanda:</span>
          {(["banyak", "sedikit"] as const).map((p) => (
            <button key={p} type="button" aria-pressed={k.penanda === p} className={saklar(k.penanda === p)} onClick={() => ubah(gantiPenanda(k, p), `Ketuk akuarium yang paling ${p}.`)}>
              paling {p}
            </button>
          ))}
        </div>
      ) : null}

      {k.mode === "urut" ? (
        <div className="rounded-2xl border-4 border-[#78350F] bg-[#FEF3C7] p-2 text-center">
          <p className="text-sm font-black text-[#78350F]">{"\u{1F4CF}"} Rak lapak (kiri ke kanan)</p>
          <div className="mt-1 flex flex-wrap justify-center gap-1 border-b-8 border-[#92400E] pb-1">
            {D.map((_, s) => {
              const id = k.urutan[s];
              const a = D.find((x) => x.id === id);
              return (
                <span key={s} className={`flex min-h-[48px] min-w-[56px] flex-col items-center justify-center rounded-lg border-2 px-1 text-xs font-black ${a ? "border-[#0369A1] bg-[#E0F2FE] text-[#1C01A5]" : "border-dashed border-[#92400E] text-[#92400E]/60"}`}>
                  {a ? (
                    <>
                      <span aria-hidden="true">{EMOJI[a.jenis]}</span>
                      {a.nama}
                    </>
                  ) : (
                    "kosong"
                  )}
                </span>
              );
            })}
          </div>
          <button type="button" className={`${tombol} mt-2`} onClick={() => ubah(ulangUrut(k), "Rak lapak dikosongkan.")}>
            {"\u{1F504}"} Ulang susunan
          </button>
        </div>
      ) : null}

      {k.mode === "layani" ? (
        <div className="rounded-2xl border-4 border-[#CA8A04] bg-[#FFFBEB] p-2 text-center">
          <p className="text-sm font-black text-[#854D0E]">{"\u{1F6D2}"} Antrean pembeli</p>
          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
            {PB.map((p, i) => (
              <span key={p.id} className={`rounded-xl border-2 px-2 py-1 text-xs font-black ${k.layani[i] ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : i === iPembeli ? "border-[#1C01A5] bg-white text-[#1C01A5] ring-2 ring-[#FACC15]" : "border-[#CA8A04] bg-white text-[#854D0E]/70"}`}>
                <span className="text-lg" aria-hidden="true">
                  {p.ikon}
                </span>{" "}
                pesan {p.mau} {k.layani[i] ? `· ${namaDari(k.layani[i])}` : ""}
              </span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            <button type="button" className={tombol} onClick={() => ubah(ulangLayani(k), "Pesanan diulang dari pembeli pertama.")}>
              {"\u{1F504}"} Ulang pesanan
            </button>
            <button type="button" className={tombol} disabled={!semuaTerlayani(k) || k.buka} onClick={() => ubah(bukaLapak(k), "Lapak ikan Abang resmi buka! Semua pesanan terlayani berurutan. Hebat!")}>
              {"\u{1F389}"} Buka lapak
            </button>
          </div>
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatLapak(k, D, PB)}
      </p>
    </div>
  );
}
