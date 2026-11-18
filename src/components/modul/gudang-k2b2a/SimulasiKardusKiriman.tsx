"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalGudang,
  besar,
  besarTugas,
  gabungKardus,
  jumlahTugas,
  kalimatKardus,
  kata,
  kecilTugas,
  majuSatu,
  mulaiLagiJalur,
  mulaiLagiPasangan,
  mulaiLagiTabel,
  pecahLanjut,
  perluTukar,
  pilihModeKardus,
  pilihTugas,
  puluhan,
  satuan,
  tabelLanjut,
  tukarSepuluh,
  type KeadaanGudang,
  type ModeKardus,
} from "./logika";
import { MISI_KARDUS, SETS, SET_SIM, TUGAS_SIM } from "./data";

/**
 * Simulasi Kelas 2 Bab 2 Sub-Bab A: Kardus Kiriman (Misi Kardus Kiriman bagian satu). Tugas di meja berbeda dari Story (dua belas dan lima, empat belas dan enam, enam belas dan tiga).
 * Eksplorasi bebas tanpa skor, lima alat untuk satu meja: Gabung (dua kardus digabung), Jalur (maju dari bilangan yang besar), Pasangan (bagan pasangan), Tabel (puluhan dan satuan bersusun),
 * dan Tukar (sepuluh satuan ditukar menjadi satu puluhan).
 */
const S = SETS[SET_SIM];
const MODE: { id: ModeKardus; nama: string; ikon: string }[] = [
  { id: "gabung", nama: "Gabung", ikon: "\u{1F4E6}" },
  { id: "jalur", nama: "Jalur", ikon: "\u{1F449}" },
  { id: "pasangan", nama: "Pasangan", ikon: "\u{1F9E9}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F5C2}\u{FE0F}" },
  { id: "tukar", nama: "Tukar", ikon: "\u{1F501}" },
];
const UNGU = "#1C01A5";

/** Isi satu kardus: `n` kertas kecil dalam kisi delapan kolom. */
function IsiKardus({ n, x, y, warna }: { n: number; x: number; y: number; warna: string }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x + (i % 8) * 13} y={y + Math.floor(i / 8) * 13} width={12} height={12} rx={2} fill={warna} stroke={UNGU} strokeWidth={0.7} />
          <text x={x + (i % 8) * 13 + 6} y={y + Math.floor(i / 8) * 13 + 9.6} textAnchor="middle" fontSize={8}>
            {S.emoji}
          </text>
        </g>
      ))}
    </g>
  );
}

export default function SimulasiKardusKiriman({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanGudang) => void }) {
  const [k, setK] = useState<KeadaanGudang>(() => awalGudang());
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const t = TUGAS_SIM[k.tugas];
  const bs = besarTugas(t);
  const kc = kecilTugas(t);
  const jml = jumlahTugas(t);
  const ubah = (baru: KeadaanGudang, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihMode = (m: ModeKardus) => {
    const baru = pilihModeKardus(k, m);
    ubah(baru, kalimatKardus(baru, t));
  };
  const pilihT = (i: number) => {
    const baru = pilihTugas(k, i);
    ubah(baru, kalimatKardus(baru, TUGAS_SIM[i]));
  };
  const digabung = k.digabung.includes(k.tugas);
  const sisa = satuan(bs);
  const jumSatuan = satuan(t.a) + satuan(t.b);
  const adaTukar = perluTukar(t);
  const sudahTukar = k.tukarTuntas.includes(k.tugas);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_KARDUS}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat kardus kiriman">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => pilihMode(m.id)}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tugas di meja">
        <span className="text-xs font-black text-[#7C2D12]">Kardus di meja:</span>
        {TUGAS_SIM.map((x, i) => (
          <button key={i} type="button" aria-pressed={k.tugas === i} className={`min-h-[40px] rounded-xl border-2 px-2 text-sm font-black ${k.tugas === i ? "border-[#1C01A5] bg-[#FACC15] text-[#1C01A5]" : "border-[#92400E] bg-white text-[#92400E]"}`} onClick={() => pilihT(i)}>
            {x.a} + {x.b}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#FDBA74] p-2" style={{ background: "linear-gradient(180deg,#FFF7ED,#FFEDD5)" }}>
        {k.mode === "gabung" ? (
          <div className="space-y-2">
            <svg viewBox="0 0 300 130" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label={digabung ? `Satu kardus berisi ${kata(jml)}` : `Dua kardus berisi ${kata(t.a)} dan ${kata(t.b)}`}>
              {digabung ? (
                <g>
                  <rect x={30} y={22} width={240} height={90} rx={6} fill="#D6A15E" stroke="#92400E" strokeWidth={2.4} />
                  <IsiKardus n={jml} x={44} y={34} warna={S.warna} />
                  <text x={150} y={16} textAnchor="middle" fontSize={11} fontWeight={900} fill="#15803D">
                    gabungan: {jml}
                  </text>
                </g>
              ) : (
                <g>
                  <rect x={10} y={30} width={130} height={80} rx={6} fill="#D6A15E" stroke="#92400E" strokeWidth={2.4} />
                  <rect x={160} y={30} width={130} height={80} rx={6} fill="#D6A15E" stroke="#92400E" strokeWidth={2.4} />
                  <IsiKardus n={t.a} x={16} y={40} warna={S.warna} />
                  <IsiKardus n={t.b} x={166} y={40} warna={S.warna} />
                  <text x={75} y={22} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                    kardus 1: {t.a}
                  </text>
                  <text x={225} y={22} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                    kardus 2: {t.b}
                  </text>
                </g>
              )}
            </svg>
            <div className="flex justify-center">
              <button type="button" className={tombol} disabled={digabung} onClick={() => ubah(gabungKardus(k), kalimatKardus(gabungKardus(k), t))}>
                {"\u{1F4E6}"} Gabungkan dua kardus
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jalur" ? (
          <div className="space-y-2">
            <svg viewBox="0 0 300 120" className="mx-auto block w-full max-w-[460px] touch-none select-none" aria-label={`Jalur bilangan dari ${kata(bs)} maju ${kata(kc)} langkah`}>
              <line x1={20} y1={70} x2={280} y2={70} stroke={UNGU} strokeWidth={2.4} />
              {Array.from({ length: kc + 1 }, (_, i) => {
                const x = 20 + (i / kc) * 260;
                return (
                  <g key={i}>
                    <line x1={x} y1={64} x2={x} y2={76} stroke={UNGU} strokeWidth={2} />
                    <text x={x} y={92} textAnchor="middle" fontSize={11} fontWeight={900} fill={i <= k.posisi ? "#15803D" : "#64748B"}>
                      {bs + i}
                    </text>
                    {i > 0 && i <= k.posisi ? <path d={`M${20 + ((i - 1) / kc) * 260} 68 Q${(20 + ((i - 1) / kc) * 260 + x) / 2} 40 ${x} 68`} fill="none" stroke="#DC2626" strokeWidth={2} /> : null}
                  </g>
                );
              })}
              <circle cx={20 + (k.posisi / kc) * 260} cy={52} r={7} fill="#FACC15" stroke={UNGU} strokeWidth={2} />
              <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                mulai dari {bs}, maju {kc}
              </text>
            </svg>
            <div className="flex justify-center gap-2">
              <button type="button" className={tombol} disabled={k.posisi >= kc} onClick={() => ubah(majuSatu(k, t), kalimatKardus(majuSatu(k, t), t))}>
                Maju {"\u{27A1}\u{FE0F}"}
              </button>
              <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJalur(k), "Mulai lagi dari bilangan yang besar.")}>
                {"\u{1F504}"} Mulai lagi
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pasangan" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Bagan pasangan: pecah {bs} lalu jumlahkan</p>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FDE68A] text-lg font-black text-[#1C01A5]" aria-label={`bilangan besar ${kata(bs)}`}>
              {bs}
            </div>
            {k.pecah >= 1 ? (
              <div className="flex justify-center gap-10" aria-label={`dipecah menjadi sepuluh dan ${kata(sisa)}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#DBEAFE] text-base font-black text-[#1C01A5]">10</span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#1C01A5] bg-[#FBCFE8] text-base font-black text-[#1C01A5]">{sisa}</span>
              </div>
            ) : (
              <p className="text-xs font-bold text-[#1C01A5]/70">Ketuk pecah untuk memisahkan {bs}.</p>
            )}
            {k.pecah >= 2 ? (
              <p className="font-mono text-base font-black text-[#1C01A5]">
                {sisa} + {kc} = {sisa + kc}
              </p>
            ) : null}
            {k.pecah >= 3 ? (
              <p className="font-mono text-lg font-black text-[#15803D]">
                10 + {sisa + kc} = {jml}
              </p>
            ) : null}
            <div className="flex justify-center gap-2">
              <button type="button" className={tombol} disabled={k.pecah >= 3} onClick={() => ubah(pecahLanjut(k), kalimatKardus(pecahLanjut(k), t))}>
                {k.pecah === 0 ? "Pecah" : "Lanjut"}
              </button>
              <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPasangan(k), "Bagan dikosongkan lagi.")}>
                {"\u{1F504}"} Mulai lagi
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Tabel puluhan dan satuan</p>
            <div className="grid grid-cols-[3.5rem_1fr_1fr] gap-1 text-lg font-black" role="table" aria-label="Tabel puluhan dan satuan">
              <span />
              <span className="rounded-md bg-[#93C5FD] py-1 text-sm text-[#1C01A5]">puluhan</span>
              <span className="rounded-md bg-[#FCA5A5] py-1 text-sm text-[#1C01A5]">satuan</span>
              <span className="py-1 text-sm text-[#475569]">{k.tabelTahap >= 1 ? t.a : ""}</span>
              <span className="rounded-md bg-[#DBEAFE] py-1 text-[#1C01A5]">{k.tabelTahap >= 1 ? puluhan(t.a) : ""}</span>
              <span className="rounded-md bg-[#FEE2E2] py-1 text-[#1C01A5]">{k.tabelTahap >= 1 ? satuan(t.a) : ""}</span>
              <span className="py-1 text-sm text-[#475569]">{k.tabelTahap >= 1 ? `+ ${t.b}` : ""}</span>
              <span className="rounded-md bg-[#DBEAFE] py-1 text-[#1C01A5]">{k.tabelTahap >= 1 ? puluhan(t.b) : ""}</span>
              <span className="rounded-md bg-[#FEE2E2] py-1 text-[#1C01A5]">{k.tabelTahap >= 1 ? satuan(t.b) : ""}</span>
              <span className="border-t-2 border-[#1C01A5] py-1 text-sm text-[#15803D]">{k.tabelTahap >= 2 ? "=" : ""}</span>
              <span className="border-t-2 border-[#1C01A5] py-1 text-[#15803D]">{k.tabelTahap >= 3 ? puluhan(jml) : ""}</span>
              <span className="border-t-2 border-[#1C01A5] py-1 text-[#15803D]">{k.tabelTahap >= 2 ? (adaTukar ? 0 : jumSatuan) : ""}</span>
            </div>
            {k.tabelTahap >= 2 && adaTukar ? <p className="text-xs font-bold text-[#DC2626]">Satuannya sepuluh: tukar jadi satu puluhan.</p> : null}
            {k.tabelTahap >= 3 ? <p className="text-base font-black text-[#15803D]">Hasilnya {jml}</p> : null}
            <div className="flex justify-center gap-2">
              <button type="button" className={tombol} disabled={k.tabelTahap >= 3} onClick={() => ubah(tabelLanjut(k), kalimatKardus(tabelLanjut(k), t))}>
                {k.tabelTahap === 0 ? "Susun" : "Lanjut"}
              </button>
              <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTabel(k), "Tabel dikosongkan lagi.")}>
                {"\u{1F504}"} Mulai lagi
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="mx-auto max-w-sm space-y-2 rounded-xl bg-white p-3 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Tukar sepuluh satuan menjadi satu puluhan</p>
            {adaTukar ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="min-h-[88px] rounded-lg border-2 border-[#1C01A5] bg-[#DBEAFE] p-1" aria-label="kolom puluhan">
                    <p className="text-xs font-black text-[#1C01A5]">puluhan</p>
                    <div className="flex items-end justify-center gap-1">
                      {Array.from({ length: puluhan(bs) + puluhan(Math.min(t.a, t.b)) + (sudahTukar ? 1 : 0) }, (_, i) => (
                        <span key={i} className="block h-14 w-3 rounded-sm border-2 border-[#1C01A5] bg-[#60A5FA]" aria-hidden="true" />
                      ))}
                    </div>
                  </div>
                  <div className="min-h-[88px] rounded-lg border-2 border-[#1C01A5] bg-[#FEE2E2] p-1" aria-label="kolom satuan">
                    <p className="text-xs font-black text-[#1C01A5]">satuan</p>
                    <div className="flex flex-wrap justify-center gap-0.5">
                      {sudahTukar ? <span className="text-2xl font-black text-[#DC2626]">0</span> : Array.from({ length: jumSatuan }, (_, i) => <span key={i} className="block h-4 w-4 rounded-sm border-2 border-[#DC2626] bg-[#FCA5A5]" aria-hidden="true" />)}
                    </div>
                  </div>
                </div>
                <p className="text-sm font-black text-[#1C01A5]">{sudahTukar ? `Sekarang ${besar(kata(jml))}: puluhannya bertambah satu, satuannya nol.` : `Ada ${kata(jumSatuan)} satuan. Tukar untuk memindahkannya.`}</p>
                <div className="flex justify-center">
                  <button type="button" className={tombol} disabled={sudahTukar} onClick={() => ubah(tukarSepuluh(k, t), kalimatKardus(tukarSepuluh(k, t), t))}>
                    {"\u{1F501}"} Tukar
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm font-bold text-[#1C01A5]">Kardus ini satuannya belum sampai sepuluh. Pilih kardus empat belas dan enam, satuannya pas sepuluh.</p>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            ubah(awalGudang(), "Meja kardus dirapikan. Main lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKardus(k, t)}
      </p>
    </div>
  );
}
