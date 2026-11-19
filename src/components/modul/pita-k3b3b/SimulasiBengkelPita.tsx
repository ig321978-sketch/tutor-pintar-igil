"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalPita,
  bagianGabung,
  hasilSambung,
  jawabUbah,
  jumlahPotongan,
  kalimatBanding,
  kalimatGabung,
  kalimatSambung,
  kalimatTukar,
  kalimatUbah,
  kata,
  kataUkuran,
  kembalikanTukar,
  mulaiLagiPita,
  nomorPanjang,
  periksaBanding,
  periksaGabung,
  periksaSambung,
  periksaTukar,
  periksaUbah,
  petunjukBanding,
  petunjukGabung,
  petunjukSambung,
  petunjukTukar,
  petunjukUbah,
  pilihBanding,
  pilihModePita,
  targetBanding,
  targetSambung,
  targetTukar,
  targetUbah,
  tigaAngka,
  tukarPuluhan,
  tukarSatuan,
  ubahAngka,
  ubahGabung,
  ubahSambung,
  type KeadaanPita,
  type ModePita,
} from "./logika";
import { MISI_PITA_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 3 Bab 3 Sub-Bab B: Bengkel Pita (Misi Bengkel Pita), simulasi penutup Sub-Bab. Ukuran berbeda dari Story.
 * Eksplorasi bebas tanpa skor, lima alat: Tukar (potongan pita 100 cm, 10 cm, 1 cm ditukar sepuluh-ke-satu), Ubah (meter ke sentimeter dikali seratus, sentimeter ke meter dibagi seratus),
 * Gabung (ukuran ditulis dengan meter dan sentimeter bersama), Sambung (menyambung dan memotong pita, tukar dan pinjam) dan Banding (memilih pita yang paling panjang).
 */
const MODE: { id: ModePita; nama: string; ikon: string }[] = [
  { id: "tukar", nama: "Tukar", ikon: "\u{1F501}" },
  { id: "ubah", nama: "Ubah", ikon: "\u{2716}" },
  { id: "gabung", nama: "Gabung", ikon: "\u{1F4DD}" },
  { id: "sambung", nama: "Sambung", ikon: "\u{1F9F5}" },
  { id: "banding", nama: "Banding", ikon: "\u{1F4CF}" },
];

/** Satu pita selebar sebanding dengan panjangnya (cm) terhadap `maks`. */
function Batang({ cm, maks, warna, teks, sorot }: { cm: number; maks: number; warna: string; teks: string; sorot?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 rounded border-2 border-[#92400E]" style={{ width: `${Math.max(6, Math.round((cm / maks) * 78))}%`, background: warna, outline: sorot ? "3px solid #DC2626" : undefined }} aria-label={teks} role="img" />
      <span className="text-xs font-black text-[#92400E]">{teks}</span>
    </div>
  );
}

/** Kumpulan potongan pita: seratus sentimeter lebar, sepuluh sentimeter sedang, satu sentimeter sempit. */
function Potongan({ n, lebar, label, warna }: { n: number; lebar: string; label: string; warna: string }) {
  return (
    <div className="min-h-[44px] rounded-xl border-4 bg-white/90 p-1" style={{ borderColor: warna }}>
      <p className="text-center text-[11px] font-black" style={{ color: warna }}>
        {label}: {n}
      </p>
      <div className="flex flex-wrap content-start justify-center gap-0.5" aria-hidden="true">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className="block h-4 rounded-sm border border-[#92400E] bg-[#FACC15]" style={{ width: lebar }} />
        ))}
      </div>
    </div>
  );
}

export default function SimulasiBengkelPita({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPita) => void }) {
  const [k, setK] = useState<KeadaanPita>(() => awalPita());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPita, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-1 text-left text-sm font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;
  const langkahAngka = "min-h-[44px] min-w-[44px] rounded-lg border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5]";

  const ganti = (m: ModePita) => {
    ubah(
      pilihModePita(k, m),
      m === "tukar"
        ? "Tukar sepuluh potongan kecil menjadi satu potongan yang lebih besar."
        : m === "ubah"
          ? "Ubah meter ke sentimeter dengan dikali seratus, atau sentimeter ke meter dengan dibagi seratus."
          : m === "gabung"
            ? "Tulis ukuran sentimeter dengan meter dan sentimeter bersama."
            : m === "sambung"
              ? "Sambung atau potong pita: meter dengan meter, sentimeter dengan sentimeter."
              : "Pilih pita yang paling panjang.",
    );
  };

  /** Pengatur tiga angka: `nama` tiap kolom, `onUbah` dipanggil dengan tempat dan arah. */
  const stepper = (nama: string[], onUbah: (t: number, arah: 1 | -1) => void) => (
    <div className="mx-auto grid w-full max-w-[420px] gap-1" style={{ gridTemplateColumns: `repeat(${nama.length}, minmax(0, 1fr))` }} role="group" aria-label="Atur angka tiap tempat">
      {nama.map((n, t) => (
        <div key={n} className="flex flex-col items-center gap-1">
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, 1)} aria-label={`Tambah angka ${n}`}>
            {"\u{2795}"}
          </button>
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, -1)} aria-label={`Kurangi angka ${n}`}>
            {"\u{2796}"}
          </button>
          <span className="text-[11px] font-black text-[#92400E]">{n}</span>
        </div>
      ))}
    </div>
  );
  const kotakAngka = (d: readonly number[], nama: string[], warna: string) => (
    <div className="mx-auto flex max-w-[420px] justify-center gap-2" aria-label="Angka yang diatur">
      {d.map((x, i) => (
        <span key={i} className="flex h-14 min-w-12 flex-col items-center justify-center rounded-xl border-4 bg-white px-1 text-3xl font-black leading-none" style={{ borderColor: warna, color: warna }}>
          {x}
          <span className="text-[9px] font-black">{nama[i]}</span>
        </span>
      ))}
    </div>
  );
  const salahDigit = (arah: 1 | -1) => salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");

  const periksaTukarKu = () => {
    const r = periksaTukar(k);
    if (r.ok) return ubah(r.k, "Betul! Pita sudah ditukar sampai paling sedikit potongan.");
    ubah(r.k);
    salah(petunjukTukar(k));
  };
  const periksaUbahKu = () => {
    const r = periksaUbah(k);
    if (r.ok) return ubah(r.k, `Betul! Hasilnya ${kata(jawabUbah(k))}.`);
    ubah(r.k);
    salah(petunjukUbah(k));
  };
  const periksaGabungKu = () => {
    const r = periksaGabung(k);
    if (r.ok) return ubah(r.k, `Betul! Ukurannya ${kataUkuran(...bagianGabung(k))}.`);
    ubah(r.k);
    salah(petunjukGabung(k));
  };
  const periksaSambungKu = () => {
    const r = periksaSambung(k);
    if (r.ok) return ubah(r.k, `Betul! Hasilnya ${kataUkuran(...hasilSambung(k))}.`);
    ubah(r.k);
    salah(petunjukSambung(k));
  };
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, `Betul! Pita yang paling panjang adalah nomor ${kata(nomorPanjang(k) + 1)}.`);
    ubah(r.k);
    salah(petunjukBanding(k));
  };

  const tu = targetUbah(k);
  const ts = targetSambung(k);
  const tb = targetBanding(k);
  const tt = targetTukar(k);
  const maksSambung = Math.max(ts.a[0] * 100 + ts.a[1], ts.op === "tambah" ? ts.a[0] * 100 + ts.a[1] + ts.b[0] * 100 + ts.b[1] : 0);
  const labelUkur = (cm: number, bersama: boolean) => (bersama ? `${Math.floor(cm / 100)} m ${cm % 100} cm` : `${cm} cm`);

  return (
    <div className="space-y-3" data-uji="simulasi-bengkel-pita">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Bengkel Pita</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_PITA_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <Potongan n={k.potongan[0]} lebar="48px" label="Potongan 100 cm (1 m)" warna="#B45309" />
            <Potongan n={k.potongan[1]} lebar="24px" label="Potongan 10 cm" warna="#CA8A04" />
            <Potongan n={k.potongan[2]} lebar="8px" label="Potongan 1 cm" warna="#A16207" />
            <p className="text-center text-xl font-black text-[#1C01A5]">{jumlahPotongan(k.potongan)} cm</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => { const r = tukarSatuan(k); if (!r.ok) return salah("Potongan satu sentimeter belum sampai sepuluh."); ubah(r.k, "Sepuluh potongan satu sentimeter ditukar menjadi satu potongan sepuluh sentimeter."); }}>
                {"\u{1F501}"} Tukar 10 potongan 1 cm
              </button>
              <button type="button" className={tombol} onClick={() => { const r = tukarPuluhan(k); if (!r.ok) return salah("Potongan sepuluh sentimeter belum sampai sepuluh."); ubah(r.k, "Sepuluh potongan sepuluh sentimeter ditukar menjadi satu potongan seratus sentimeter."); }}>
                {"\u{1F501}"} Tukar 10 potongan 10 cm
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kembalikanTukar(k), "Potongan dikembalikan seperti semula.")}>
                {"\u{21A9}"} Kembalikan
              </button>
              <button type="button" className={tombol} onClick={periksaTukarKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
            <p className="text-center text-[11px] font-bold text-[#7C2D12]/80">Sasaran sekarang: {tt.awal[0] * 100 + tt.awal[1] * 10 + tt.awal[2]} cm, panjangnya tetap.</p>
          </div>
        ) : null}

        {k.mode === "ubah" ? (
          <div className="space-y-2">
            <Batang cm={tu.m * 100 + tu.c} maks={900} warna="#FACC15" teks={tu.arah === "ke-cm" ? `${tu.m} m${tu.c > 0 ? ` ${tu.c} cm` : ""}` : `${tu.m * 100} cm`} />
            <p className="text-center text-xl font-black text-[#1C01A5]">{tu.arah === "ke-cm" ? `${tu.m} m${tu.c > 0 ? ` ${tu.c} cm` : ""} = ${tigaAngka(k.ubah) === 0 ? "…" : tigaAngka(k.ubah)} cm` : `${tu.m * 100} cm = ${tigaAngka(k.ubah) === 0 ? "…" : tigaAngka(k.ubah)} m`}</p>
            <p className="text-center text-xs font-black text-[#7C2D12]">{tu.arah === "ke-cm" ? "Atur banyak sentimeternya:" : "Atur banyak meternya:"}</p>
            {kotakAngka(k.ubah, ["ratusan", "puluhan", "satuan"], "#B45309")}
            {stepper(["ratusan", "puluhan", "satuan"], (t, arah) => {
              const r = ubahAngka(k, t, arah);
              if (!r.ok) return salahDigit(arah);
              ubah(r.k);
            })}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaUbahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "gabung" ? (
          <div className="space-y-2">
            <Batang cm={cmGabung(k)} maks={900} warna="#FACC15" teks={`${cmGabung(k)} cm`} />
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {cmGabung(k)} cm = {k.gabung[0] === 0 && k.gabung[1] === 0 && k.gabung[2] === 0 ? "… m … cm" : `${k.gabung[0]} m ${k.gabung[1] * 10 + k.gabung[2]} cm`}
            </p>
            <p className="text-center text-xs font-black text-[#7C2D12]">Tulis dengan meter dan sentimeter bersama:</p>
            {kotakAngka(k.gabung, ["meter", "puluhan cm", "satuan cm"], "#B45309")}
            {stepper(["meter", "puluhan cm", "satuan cm"], (t, arah) => {
              const r = ubahGabung(k, t, arah);
              if (!r.ok) return salahDigit(arah);
              ubah(r.k);
            })}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaGabungKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sambung" ? (
          <div className="space-y-2">
            <Batang cm={ts.a[0] * 100 + ts.a[1]} maks={Math.max(maksSambung, 100)} warna="#FDE047" teks={`${ts.a[0]} m ${ts.a[1]} cm`} />
            <Batang cm={ts.b[0] * 100 + ts.b[1]} maks={Math.max(maksSambung, 100)} warna={ts.op === "tambah" ? "#FDBA74" : "#FCA5A5"} teks={`${ts.op === "tambah" ? "disambung" : "dipotong"} ${ts.b[0]} m ${ts.b[1]} cm`} />
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {ts.a[0]} m {ts.a[1]} cm {ts.op === "tambah" ? "+" : "−"} {ts.b[0]} m {ts.b[1]} cm = {tigaAngka(k.sambung) === 0 ? "… m … cm" : `${k.sambung[0]} m ${k.sambung[1] * 10 + k.sambung[2]} cm`}
            </p>
            <p className="text-center text-xs font-black text-[#7C2D12]">Atur hasilnya:</p>
            {kotakAngka(k.sambung, ["meter", "puluhan cm", "satuan cm"], "#B45309")}
            {stepper(["meter", "puluhan cm", "satuan cm"], (t, arah) => {
              const r = ubahSambung(k, t, arah);
              if (!r.ok) return salahDigit(arah);
              ubah(r.k);
            })}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSambungKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-[420px] space-y-1.5" role="group" aria-label="Pilih pita yang paling panjang">
              {tb.ukuran.map((u, i) => (
                <button key={i} type="button" onClick={() => ubah(pilihBanding(k, i))} aria-pressed={k.bandingPilih === i} className={pilihan(k.bandingPilih === i)}>
                  <span className="block text-[11px] text-[#7C2D12]">Pita {i + 1}</span>
                  <Batang cm={u} maks={Math.max(...tb.ukuran)} warna="#FACC15" teks={labelUkur(u, tb.bentuk[i])} sorot={k.bandingPilih === i} />
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
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPita(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "tukar" ? kalimatTukar(k) : k.mode === "ubah" ? kalimatUbah(k) : k.mode === "gabung" ? kalimatGabung(k) : k.mode === "sambung" ? kalimatSambung(k) : kalimatBanding(k))}
      </p>
    </div>
  );
}

/** Ukuran gabung sasaran ini dalam sentimeter. */
function cmGabung(k: KeadaanPita): number {
  const [m, c] = bagianGabung(k);
  return m * 100 + c;
}
