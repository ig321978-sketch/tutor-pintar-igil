"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";

/**
 * Mind-map Kelas 2 Bab 6 dan seterusnya: peta radial bergambar (tanpa kata) sebagai layar awal, lalu kartu geser.
 * Peta radial: satu gambar di tengah (topik) dan satu gambar tiap kartu di sekelilingnya; mengetuk gambar membuka kartunya, tanda centang menunjukkan kartu yang selesai.
 * Kartu: satu kartu = satu layar, tanpa menggulir, berisi rantai Masalah, Cara, Hasil dengan label pendek. Satu kotak boleh terisi sejak awal sebagai contoh;
 * label sisanya ditempel anak. Mengetuk label atau kotak menampilkan dan mengucapkan arti singkatnya.
 */
export type Bagian = "masalah" | "cara" | "hasil";
export type IsiKartu = { label: string; arti: string };
export type KartuPeta = { judul: string; masalah: IsiKartu; cara: IsiKartu; hasil: IsiKartu; contoh: Bagian[] };
export type TemaPeta = { bingkai: string; ikon: string; judul: string; latar: string; garisLatar: string };
/** Peta radial awal: `pusat` = gambar topik di tengah, `ikon` = satu gambar per kartu (urutan sama dengan kartu). */
export type RingkasanPeta = { pusat: string; ikon: readonly string[]; suara: string };

const URUT: Bagian[] = ["masalah", "cara", "hasil"];
export const WARNA_BAGIAN: Record<Bagian, { isi: string; garis: string; nama: string }> = {
  masalah: { isi: "#FDE68A", garis: "#A16207", nama: "Masalah" },
  cara: { isi: "#FED7AA", garis: "#C2410C", nama: "Cara" },
  hasil: { isi: "#BBF7D0", garis: "#15803D", nama: "Hasil" },
};
const WARNA_CABANG = ["#FDE68A", "#FED7AA", "#BBF7D0", "#BFDBFE", "#FBCFE8"];
const PESAN_AWAL = "Ketuk label, lalu ketuk kotak yang cocok.";

export default function PetaKartu({
  kartu,
  tema,
  ringkasan,
  suaraAwal,
  speakGuru,
  onLanjut,
  teksLanjut,
  pesanSelesai,
}: {
  kartu: readonly KartuPeta[];
  tema: TemaPeta;
  ringkasan?: RingkasanPeta;
  suaraAwal: string;
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
  pesanSelesai: string;
}) {
  const [layar, setLayar] = useState<"peta" | "kartu">(ringkasan ? "peta" : "kartu");
  const [no, setNo] = useState(0);
  const [isi, setIsi] = useState<Record<number, Bagian[]>>({});
  const [pilih, setPilih] = useState<Bagian | null>(null);
  const [goyang, setGoyang] = useState<Bagian | null>(null);
  const [pesan, setPesan] = useState(PESAN_AWAL);

  const k = kartu[no];
  const terisi = (b: Bagian, n = no) => kartu[n].contoh.includes(b) || (isi[n] ?? []).includes(b);
  const lengkap = (n: number) => URUT.every((b) => terisi(b, n));
  const semua = kartu.every((_, n) => lengkap(n));
  const sisa = URUT.filter((b) => !terisi(b));
  const selesaiBanyak = kartu.filter((_, n) => lengkap(n)).length;

  const ucap = (t: string) => {
    setPesan(t);
    speakGuru(t);
  };
  const ketukLabel = (b: Bagian) => {
    setPilih(b);
    ucap(k[b].arti);
  };
  const ketukKotak = (b: Bagian) => {
    if (terisi(b)) {
      ucap(kartu[no].contoh.includes(b) ? `Ini contoh. ${k[b].arti}` : k[b].arti);
      return;
    }
    if (!pilih) {
      setPesan("Pilih satu label dulu, lalu ketuk kotaknya.");
      return;
    }
    if (pilih === b) {
      setIsi((s) => ({ ...s, [no]: [...(s[no] ?? []), b] }));
      setPilih(null);
      const masihAda = URUT.filter((x) => x !== b && !terisi(x)).length > 0;
      ucap(masihAda ? `Pas! ${k[b].arti}` : `Kartu lengkap! ${k[b].arti}`);
    } else {
      setGoyang(b);
      window.setTimeout(() => setGoyang(null), 480);
      ucap(`Belum pas. Label ${WARNA_BAGIAN[pilih].nama.toLowerCase()} dipasang di kotak ${WARNA_BAGIAN[pilih].nama}.`);
    }
  };
  const bukaKartu = (n: number) => {
    setNo(n);
    setPilih(null);
    setPesan(PESAN_AWAL);
    setLayar("kartu");
    speakGuru(kartu[n].judul);
  };
  const pindah = (arah: -1 | 1) => {
    if (arah === 1 && !lengkap(no)) {
      setPesan("Selesaikan kartu ini dulu, ya.");
      return;
    }
    const baru = no + arah;
    if (baru < 0 || baru >= kartu.length) {
      if (arah === 1 && ringkasan) setLayar("peta");
      return;
    }
    setNo(baru);
    setPilih(null);
    setPesan(PESAN_AWAL);
  };

  const kotak = (b: Bagian) => {
    const w = WARNA_BAGIAN[b];
    const ok = terisi(b);
    const contoh = k.contoh.includes(b);
    return (
      <div key={b} className="flex-1">
        <p className="mb-0.5 text-[11px] font-black" style={{ color: w.garis }}>
          {w.nama}
        </p>
        <button
          type="button"
          onClick={() => ketukKotak(b)}
          aria-label={ok ? `${contoh ? "Contoh: " : ""}${w.nama}: ${k[b].label}` : `Kotak ${w.nama} kosong`}
          className={`relative flex min-h-[56px] w-full items-center justify-center rounded-xl border-[3px] px-2 py-2 text-center text-base font-black leading-tight text-[#1C01A5] sm:min-h-[84px] ${ok ? "lm-muncul" : "border-dashed bg-white/90"} ${goyang === b ? "lm-goyang" : ""} ${contoh ? "!pt-3.5" : ""}`}
          style={{ background: ok ? w.isi : undefined, borderColor: w.garis }}
        >
          {ok ? k[b].label : "?"}
          {contoh ? (
            <span className="pointer-events-none absolute -top-2 right-2 rounded-full bg-[#1C01A5] px-1.5 text-[9px] font-black leading-4 text-white" aria-hidden="true">
              contoh
            </span>
          ) : null}
        </button>
      </div>
    );
  };
  const panah = (
    <div className="flex items-center justify-center text-xl font-black leading-none text-[#1C01A5]" aria-hidden="true">
      <span className="sm:hidden">{"↓"}</span>
      <span className="hidden sm:inline">{"→"}</span>
    </div>
  );

  const intro = (teks: string, suara: string) => (
    <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
      <button type="button" onClick={() => speakGuru(suara)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
        {"\u{1F50A}"}
      </button>
      <p className="text-sm font-bold leading-snug text-[#1C01A5]">{teks}</p>
    </div>
  );

  if (layar === "peta" && ringkasan) {
    const n = kartu.length;
    const titik = (i: number) => {
      const sudut = (-90 + (360 / n) * i) * (Math.PI / 180);
      return { x: 50 + 37 * Math.cos(sudut), y: 50 + 37 * Math.sin(sudut) };
    };
    return (
      <div className="space-y-3">
        <style>{CSS_LEMARI}</style>
        {intro("Ini peta. Ketuk gambar untuk membuka kartunya.", ringkasan.suara)}
        <div className="mx-auto w-full max-w-sm rounded-2xl border-[6px] p-2" style={{ borderColor: tema.bingkai, background: tema.latar }}>
          <div className="relative mx-auto aspect-square w-full" role="group" aria-label={`Peta ${tema.judul}: ${kartu.length} gambar, ${selesaiBanyak} selesai`}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              {kartu.map((_, i) => (
                <line key={i} x1="50" y1="50" x2={titik(i).x} y2={titik(i).y} stroke={tema.garisLatar} strokeWidth="1.6" strokeLinecap="round" />
              ))}
            </svg>
            <div className="absolute flex items-center justify-center rounded-full border-4 border-[#1C01A5] bg-white text-4xl shadow-[0_3px_0_rgba(28,1,165,0.25)]" style={{ left: "35%", top: "35%", width: "30%", height: "30%" }} aria-hidden="true">
              {ringkasan.pusat}
            </div>
            {kartu.map((kt, i) => {
              const p = titik(i);
              const selesai = lengkap(i);
              return (
                <button
                  key={kt.judul}
                  type="button"
                  onClick={() => bukaKartu(i)}
                  aria-label={`${kt.judul}${selesai ? ", selesai" : ""}`}
                  className="absolute flex items-center justify-center rounded-full border-[3px] text-2xl sm:text-3xl"
                  style={{ left: `${p.x - 9.5}%`, top: `${p.y - 9.5}%`, width: "19%", height: "19%", background: WARNA_CABANG[i % WARNA_CABANG.length], borderColor: selesai ? "#15803D" : "#1C01A5" }}
                >
                  <span aria-hidden="true">{ringkasan.ikon[i]}</span>
                  {selesai ? (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#15803D] text-[11px] font-black text-white" aria-hidden="true">
                      {"✓"}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button type="button" onClick={() => bukaKartu(Math.max(0, kartu.findIndex((_, i) => !lengkap(i))))} className="rounded-full border-4 border-[#1C01A5] bg-[#FDE047] px-6 py-1.5 text-xl font-black text-[#1C01A5]" aria-label={semua ? "Ulangi dari kartu pertama" : "Mulai atau lanjutkan kartu"}>
              {"▶"}
            </button>
            <span className="text-sm font-black text-[#1C01A5]" aria-hidden="true">
              {selesaiBanyak}/{kartu.length}
            </span>
          </div>
        </div>
        {semua ? (
          <div className="space-y-2">
            <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#15803D]">
              {pesanSelesai}
            </p>
            <div className="flex justify-center">
              <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
                {teksLanjut}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      {intro(k.contoh.length ? "Tempel label sisanya. Kotak bertanda contoh sudah terisi." : "Tempel semua label ke kotak yang cocok.", suaraAwal)}

      <div className="mx-auto max-w-xl rounded-2xl border-[6px] p-3" style={{ borderColor: tema.bingkai, background: tema.latar }}>
        <div className="mb-1 flex items-center justify-between gap-2 text-xs font-black text-[#1C01A5]">
          {ringkasan ? (
            <button type="button" onClick={() => setLayar("peta")} className="rounded-full border-2 border-[#1C01A5] bg-white px-2 py-0.5 text-sm" aria-label="Kembali ke peta">
              {"\u{1F5FA}️"}
            </button>
          ) : null}
          <span className="flex-1">
            {tema.ikon} Kartu {no + 1} dari {kartu.length}
          </span>
          <span className="flex gap-1" aria-hidden="true">
            {kartu.map((_, n) => (
              <span key={n} className="block h-2.5 w-2.5 rounded-full border border-[#1C01A5]" style={{ background: n === no ? "#1C01A5" : lengkap(n) ? "#86EFAC" : "#FFFFFF" }} />
            ))}
          </span>
        </div>
        <p className="mb-2 text-center text-base font-black text-[#1C01A5]">{k.judul}</p>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:gap-2">
          {kotak("masalah")}
          {panah}
          {kotak("cara")}
          {panah}
          {kotak("hasil")}
        </div>

        <p role="status" aria-live="polite" className="mt-2 mb-1 min-h-[2.5rem] text-center text-sm font-black text-[#1C01A5]">
          {semua ? pesanSelesai : pesan}
        </p>
        <div className="mt-3 flex min-h-[52px] flex-wrap items-center justify-center gap-2 rounded-xl border-[3px] border-dashed p-2" style={{ borderColor: tema.garisLatar }} role="group" aria-label="Label yang belum ditempel">
          {sisa.length === 0 ? (
            <span className="text-sm font-black text-[#15803D]">Semua label di kartu ini sudah menempel.</span>
          ) : (
            sisa.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => ketukLabel(b)}
                aria-pressed={pilih === b}
                className={`rounded-lg border-[3px] bg-white px-3 py-1.5 text-base font-black text-[#1C01A5] ${pilih === b ? "outline outline-4 outline-[#1C01A5]" : ""}`}
                style={{ borderColor: WARNA_BAGIAN[b].garis }}
              >
                {k[b].label}
              </button>
            ))
          )}
        </div>
        <div className="mt-1 flex justify-between gap-2">
          <button type="button" onClick={() => pindah(-1)} className="rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
            {"⬅️"} Kartu sebelumnya
          </button>
          <button type="button" onClick={() => pindah(1)} className="rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
            {no === kartu.length - 1 && ringkasan ? "Lihat peta" : "Kartu berikutnya"} {"➡️"}
          </button>
        </div>
      </div>

      {semua ? (
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      ) : null}
    </div>
  );
}
