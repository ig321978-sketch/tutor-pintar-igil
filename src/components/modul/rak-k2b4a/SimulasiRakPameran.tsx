"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalRak,
  bendaDiPetak,
  hurufBesar,
  kalimatKartu,
  kalimatLawan,
  kalimatPetunjukSim,
  kalimatRak,
  ketukBaca,
  ketukGabung,
  lihatLawan,
  mulaiLagiRak,
  petunjukBaca,
  petunjukGabung,
  petunjukTaruh,
  pilihBendaRak,
  pilihModeRak,
  semuaTerpasangRak,
  taruhBenda,
  tekaBerikut,
  tugasBacaBerikut,
  type KeadaanRak,
  type ModeRak,
} from "./logika";
import { BARIS_SIM, BENDA_SIM, KOLOM_SIM, MISI_RAK_TEKS, TEKA_SIM, TUGAS_BACA } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 4 Sub-Bab A: Rak Pameran (Misi Rak Pameran). Karya di baki berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat untuk satu rak:
 * Taruh (taruh karya di petak sesuai kartu denah, lalu ketuk karya yang sudah ditaruh untuk melihat kalimat lawannya), Baca (kanan dan kiri sesuai posisi pembaca:
 * anak yang membelakangi kita menghadap rak ke arah yang sama dengan kita), dan Gabung (dua petunjuk digabung sampai tinggal satu benda).
 */
const D = BENDA_SIM;
const MODE: { id: ModeRak; nama: string; ikon: string }[] = [
  { id: "taruh", nama: "Taruh", ikon: "\u{1F4E6}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F440}" },
  { id: "gabung", nama: "Gabung", ikon: "\u{1F9E9}" },
];
const UNGU = "#1C01A5";

/** Anak membelakangi kita dan menghadap rak: kepala berambut, topi, dan badan tanpa wajah. */
function AnakMembelakangi() {
  return (
    <svg viewBox="0 0 120 70" className="mx-auto block h-[74px] w-[126px]" role="img" aria-label="Nia berdiri membelakangi kita, menghadap rak">
      <polygon points="60,2 52,14 68,14" fill="#7C3AED" />
      <circle cx="60" cy="30" r="13" fill="#7C2D12" stroke="#431407" strokeWidth={2} />
      <text x="60" y="30" textAnchor="middle" fontSize={17}>
        {"\u{1F9E2}"}
      </text>
      <rect x="44" y="44" width="32" height="24" rx="7" fill="#7C3AED" stroke="#4C1D95" strokeWidth={2} />
    </svg>
  );
}

export default function SimulasiRakPameran({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRak) => void }) {
  const [k, setK] = useState<KeadaanRak>(() => awalRak());
  const [goyang, setGoyang] = useState("");
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanRak, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const u = k.pilih >= 0 ? D[k.pilih] : null;
  const petak: [number, number][] = [];
  for (let b = 0; b < BARIS_SIM; b += 1) for (let c = 0; c < KOLOM_SIM; c += 1) petak.push([c, b]);

  const ganti = (m: ModeRak) => ubah(pilihModeRak(k, m), m === "taruh" ? "Taruh karya di petak sesuai kartu denah." : m === "baca" ? "Baca kanan dan kiri dari posisi pembaca, sama dengan anak yang membelakangi kita." : "Gabungkan dua petunjuk sampai tinggal satu benda.");
  const pegang = (i: number) => {
    const baru = pilihBendaRak(k, i, D);
    ubah(baru, kalimatRak(baru, D, TUGAS_BACA, TEKA_SIM));
  };
  const ketukPetakTaruh = (c: number, b: number) => {
    const i = bendaDiPetak(c, b, D);
    if (i >= 0 && k.terpasang.includes(i)) {
      const r = lihatLawan(k, i, D);
      ubah(r.k, `${hurufBesar(kalimatKartu(i, D) ?? D[i].nama)}. Lawannya: ${kalimatLawan(i, D) ?? ""}.`);
      return;
    }
    const r = taruhBenda(k, c, b, D);
    if (r.ok) {
      const dipasang = D[k.pilih];
      ubah(r.k, semuaTerpasangRak(r.k, D) ? "Semua karya sudah di tempatnya. Rak pameran siap dibuka." : `Pas! ${hurufBesar(kalimatKartu(k.pilih, D) ?? dipasang.nama)}. Ketuk karya itu di rak untuk melihat lawannya.`);
    } else if (r.perlu === "pilih") salah(`p${c}${b}`, "Ketuk satu karya di baki dulu, lalu ketuk petak di rak.");
    else if (r.perlu === "terisi") salah(`p${c}${b}`, "Petak ini sudah terisi. Pilih petak yang masih kosong.");
    else {
      ubah(r.k);
      salah(`p${c}${b}`, petunjukTaruh(k.pilih, c, b, D));
    }
  };
  const ketukKarya = (i: number) => {
    if (k.mode === "baca") {
      const n = tugasBacaBerikut(k, TUGAS_BACA);
      if (n < 0) return;
      const r = ketukBaca(k, i, TUGAS_BACA);
      if (r.ok) ubah(r.k, r.selesai ? "Betul! Semua tugas baca selesai. Kanan dan kiri anak yang membelakangi kita sama dengan kanan dan kiri kita." : `Betul! ${hurufBesar(D[i].nama)} ada di sebelah ${TUGAS_BACA[n].kata} ${D[TUGAS_BACA[n].acuan].nama}.`);
      else {
        ubah(r.k);
        salah(`k${i}`, petunjukBaca(TUGAS_BACA[n], i, D));
      }
    } else if (k.mode === "gabung") {
      const n = tekaBerikut(k, TEKA_SIM);
      if (n < 0) return;
      const r = ketukGabung(k, i, TEKA_SIM);
      if (r.ok) ubah(r.k, r.selesai ? "Semua teka-teki selesai. Dua petunjuk digabung membuat tinggal satu benda." : `Betul! Dua petunjuk digabung, dan tinggal satu benda: ${D[i].nama}.`);
      else {
        ubah(r.k);
        salah(`k${i}`, petunjukGabung(TEKA_SIM[n], i, D));
      }
    }
  };

  const nBaca = tugasBacaBerikut(k, TUGAS_BACA);
  const nTeka = tekaBerikut(k, TEKA_SIM);
  return (
    <div className="space-y-3" data-uji="simulasi-rak-pameran">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Rak Pameran</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_RAK_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "taruh" ? (
        <div className="rounded-2xl border-4 border-[#0369A1] bg-[#E0F2FE] p-2">
          <p className="mb-1 text-center text-xs font-black text-[#075985]">Baki karya: ketuk satu karya</p>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
            {D.map((x, i) => {
              const sudah = k.terpasang.includes(i);
              return (
                <button
                  key={x.id}
                  type="button"
                  disabled={sudah}
                  onClick={() => pegang(i)}
                  aria-pressed={k.pilih === i}
                  aria-label={`Karya ${x.nama}`}
                  className={`rounded-xl border-4 bg-white p-0.5 text-center text-[10px] font-black leading-tight text-[#1C01A5] disabled:opacity-30 ${k.pilih === i ? "border-[#DC2626]" : "border-[#7DD3FC]"}`}
                >
                  <span className="block text-2xl" aria-hidden="true">
                    {x.emoji}
                  </span>
                  {x.nama}
                </button>
              );
            })}
          </div>
          {u ? <p className="mt-1 rounded-lg bg-white px-2 py-1 text-center text-xs font-black text-[#1C01A5]">Kartu denah: {kalimatKartu(k.pilih, D)}</p> : null}
        </div>
      ) : null}

      {k.mode === "gabung" ? (
        <div className="rounded-2xl border-4 border-[#2563EB] bg-[#EFF6FF] p-2 text-sm font-black text-[#1C01A5]">
          {nTeka >= 0 ? (
            <>
              <p>
                <span className="mr-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-xs text-white">1</span>
                Benda {kalimatPetunjukSim(TEKA_SIM[nTeka].petunjuk[0], D)}
              </p>
              <p>
                <span className="mr-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-xs text-white">2</span>
                Benda {kalimatPetunjukSim(TEKA_SIM[nTeka].petunjuk[1], D)}
              </p>
            </>
          ) : (
            <p className="text-center">Semua teka-teki selesai!</p>
          )}
        </div>
      ) : null}

      {k.mode === "baca" ? (
        <div className="rounded-2xl border-4 border-[#7C3AED] bg-[#F5F3FF] p-2 text-center text-sm font-black text-[#1C01A5]">
          {nBaca >= 0 ? `Ketuk benda di sebelah ${TUGAS_BACA[nBaca].kata} ${D[TUGAS_BACA[nBaca].acuan].nama}.` : "Semua tugas baca selesai!"}
        </div>
      ) : null}

      <div className="rounded-xl border-[6px] border-[#92400E] bg-[#F8DDB0] p-2">
        <p className="mb-1 text-center text-xs font-black text-[#92400E]">{k.mode === "taruh" ? "Rak pameran: ketuk petak yang tepat" : "Rak pameran: ketuk benda"}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {petak.map(([c, b]) => {
            const i = bendaDiPetak(c, b, D);
            const ada = k.mode !== "taruh" || k.terpasang.includes(i);
            const gaya = `flex min-h-[76px] flex-col items-center justify-center rounded-xl border-2 text-center text-[10px] font-black leading-tight text-[#1C01A5] ${ada ? "border-[#92400E] bg-[#FFFBEB]" : "border-dashed border-[#92400E] bg-[#FDE68A]/60"} ${goyang === `p${c}${b}` || goyang === `k${i}` ? "lm-goyang" : ""} ${k.mode === "baca" && nBaca >= 0 && TUGAS_BACA[nBaca].acuan === i ? "ring-4 ring-[#DC2626]" : ""}`;
            return (
              <button key={`${c}${b}`} type="button" className={gaya} onClick={() => (k.mode === "taruh" ? ketukPetakTaruh(c, b) : ketukKarya(i))} aria-label={ada ? D[i].nama : `Petak kosong kolom ${c + 1} baris ${b + 1}`}>
                {ada ? (
                  <>
                    <span className="text-3xl" aria-hidden="true">
                      {D[i].emoji}
                    </span>
                    {D[i].nama}
                  </>
                ) : (
                  <span className="text-xl text-[#B45309]" aria-hidden="true">
                    ?
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {k.mode === "baca" ? (
          <div className="mt-2 space-y-0.5">
            <p className="text-center text-[11px] font-black text-[#7C3AED]" style={{ color: UNGU }}>
              Nia berdiri membelakangi kita dan menghadap rak. Arahnya sama dengan kita.
            </p>
            <AnakMembelakangi />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiRak(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatRak(k, D, TUGAS_BACA, TEKA_SIM)}
      </p>
    </div>
  );
}
