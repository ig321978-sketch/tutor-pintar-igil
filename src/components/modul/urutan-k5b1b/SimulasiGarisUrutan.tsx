"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalUrutan,
  batalUrut,
  kalimatBanding,
  kalimatGaris,
  kalimatPatokan,
  kalimatUrut,
  ketukUrut,
  mulaiLagiUrutan,
  periksaBanding,
  periksaGaris,
  periksaPatokan,
  periksaUrut,
  petunjukBanding,
  petunjukGaris,
  petunjukPatokan,
  petunjukUrut,
  pilihKolom,
  pilihModeUrutan,
  pilihPatokan,
  pilihRuas,
  pilihTanda,
  targetBanding,
  targetGaris,
  targetPatokan,
  targetUrut,
  type KeadaanUrutan,
  type ModeUrutan,
} from "./logika";
import { GarisSvg, PapanKolom } from "./GambarUrutan";
import { MISI_URUTAN_TEKS, TEKS_TANDA_SIM } from "./data-sim";
import { awalGaris, fmt, rancangGaris } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 1 Sub-Bab B: Garis Urutan (tema Hari Pertandingan di Stadion Kota). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Banding (pilih kolom penentu dan tanda; alat menolak Periksa sebelum kolom dipilih), Garis (pilih ruas tempat bilangan di garis berpatokan),
 * Urut (ketuk bilangan naik atau turun; alat menolak bilangan yang bukan giliran), dan Patokan (pilih patokan terdekat). Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeUrutan; nama: string; ikon: string }[] = [
  { id: "banding", nama: "Banding", ikon: "\u{1F448}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F4CF}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
  { id: "patokan", nama: "Patokan", ikon: "\u{1F4CD}" },
];

export default function SimulasiGarisUrutan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUrutan) => void }) {
  const [k, setK] = useState<KeadaanUrutan>(() => awalUrutan());
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
  const ubah = (baru: KeadaanUrutan, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-2 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-2 text-center text-sm font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeUrutan) => {
    ubah(
      pilihModeUrutan(k, m),
      m === "banding"
        ? "Bandingkan dari kiri, pilih kolom penentu dan tandanya."
        : m === "garis"
          ? "Letakkan bilangan di garis, lalu pilih ruasnya."
          : m === "urut"
            ? "Ketuk bilangan satu per satu dalam urutan yang diminta."
            : "Pilih patokan yang paling dekat dengan bilangan itu.",
    );
  };

  const tb = targetBanding(k);
  const tg = targetGaris(k);
  const tu = targetUrut(k);
  const tp = targetPatokan(k);
  const garisG = rancangGaris(tg.lo, [{ nama: tg.nama, n: tg.n }]);
  const garisP = rancangGaris(awalGaris([tp.n, ...tp.pil.map((t) => Number(t.replace(/\./g, "")))]), [{ nama: tp.nama, n: tp.n }]);

  const periksaB = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, "Betul! Angka yang menentukan ada di kolom itu, dan tandanya terbuka ke bilangan yang lebih besar.");
    if (r.ditolak) return ubah(r.k, "Alat menolak. Kolom penentu belum dipilih, jadi pilih dulu kolomnya sebelum memeriksa.");
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  const periksaG = () => {
    const r = periksaGaris(k);
    if (r.ok) return ubah(r.k, "Betul! Bilangan itu terletak di antara dua patokan tersebut.");
    ubah(r.k);
    salah(petunjukGaris(k));
  };
  const periksaU = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, "Betul! Semua bilangan sudah berurutan.");
    ubah(r.k);
    salah(petunjukUrut(k));
  };
  const periksaP = () => {
    const r = periksaPatokan(k);
    if (r.ok) return ubah(r.k, "Betul! Itulah patokan yang jaraknya paling dekat.");
    ubah(r.k);
    salah(petunjukPatokan(k));
  };
  const ketuk = (i: number) => {
    const r = ketukUrut(k, i);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Bilangan itu belum gilirannya, jadi pilih bilangan lain yang lebih tepat untuk urutan ini.");
  };

  return (
    <div className="space-y-2" data-uji="simulasi-garis-urutan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Garis Urutan</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_URUTAN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">Bandingkan {tb.na} dan {tb.nb} dari kiri.</p>
            <PapanKolom
              baris={[
                { nama: tb.na, n: tb.a },
                { nama: tb.nb, n: tb.b },
              ]}
              rupa="diagram"
              tengah={k.tandaPilih >= 0 ? ["<", ">", "="][k.tandaPilih] : "?"}
            />
            <p className="text-center text-xs font-black text-[#1C01A5]">Kolom penentu:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih kolom penentu">
              {tb.kol.map((t, i) => (
                <button key={`${k.bandingKe}-${t}`} type="button" onClick={() => ubah(pilihKolom(k, i))} aria-pressed={k.kolomPilih === i} className={pilihan(k.kolomPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Tanda:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih tanda">
              {TEKS_TANDA_SIM.map((t, i) => (
                <button key={t} type="button" onClick={() => ubah(pilihTanda(k, i))} aria-pressed={k.tandaPilih === i} className={pilihan(k.tandaPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "garis" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              Letakkan {tg.nama} ({fmt(tg.n)}) di garis. Titiknya ada di antara patokan yang mana?
            </p>
            <GarisSvg g={garisG} rupa="diagram" />
            <div className="mx-auto grid max-w-[420px] grid-cols-1 gap-1.5" role="group" aria-label="Pilih ruas">
              {tg.pil.map((t, i) => (
                <button key={`${k.garisKe}-${t}`} type="button" onClick={() => ubah(pilihRuas(k, i))} aria-pressed={k.ruasPilih === i} className={pilihan(k.ruasPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaG}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              Ketuk bilangan dari yang paling {tu.arah === "naik" ? "kecil sampai paling besar (urutan naik)" : "besar sampai paling kecil (urutan turun)"}.
            </p>
            <div className="mx-auto grid max-w-[320px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih bilangan">
              {tu.acak.map((i) => {
                const urut = k.urutPilih.indexOf(i);
                return (
                  <button
                    key={`${k.urutKe}-${tu.item[i].nama}`}
                    type="button"
                    onClick={() => ketuk(i)}
                    disabled={urut >= 0}
                    aria-label={`${tu.item[i].nama} ${fmt(tu.item[i].n)}${urut >= 0 ? `, urutan ${urut + 1}` : ""}`}
                    className={`relative min-h-[56px] rounded-xl border-4 px-1 py-1 text-center ${urut >= 0 ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#FCD34D] bg-white"}`}
                  >
                    <span className="block text-xs font-black text-[#1C01A5]">{tu.item[i].nama}</span>
                    <span className="block text-lg font-black leading-tight text-[#1C01A5]">{fmt(tu.item[i].n)}</span>
                    {urut >= 0 ? <span className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#15803D] bg-white text-xs font-black text-[#14532D]">{urut + 1}</span> : null}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(batalUrut(k))} disabled={k.urutPilih.length === 0}>
                {"\u{21A9}\u{FE0F}"} Batal
              </button>
              <button type="button" className={tombol} onClick={periksaU}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "patokan" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7C2D12]">
              Patokan mana yang paling dekat dengan {tp.nama} ({fmt(tp.n)})?
            </p>
            <GarisSvg g={garisP} rupa="diagram" />
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih patokan">
              {tp.pil.map((t, i) => (
                <button key={`${k.patKe}-${t}`} type="button" onClick={() => ubah(pilihPatokan(k, i))} aria-pressed={k.patPilih === i} className={pilihan(k.patPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaP}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiUrutan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "banding" ? kalimatBanding(k) : k.mode === "garis" ? kalimatGaris(k) : k.mode === "urut" ? kalimatUrut(k) : kalimatPatokan(k))}
      </p>
    </div>
  );
}
