"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalJahit,
  bagiDengan,
  banyakArsir,
  hasilKaliTampil,
  hurufBesar,
  kalimatArsir,
  kalimatBagi,
  kalimatKali,
  kalimatPasang,
  ketukBagian,
  ketukKartu,
  mulaiLagiJahit,
  periksaArsir,
  periksaBagi,
  periksaKali,
  periksaPasang,
  petunjukArsir,
  petunjukBagi,
  petunjukKali,
  petunjukPasang,
  petunjukTolakBagi,
  pilihCaraKali,
  pilihModeJahit,
  pilihPengali,
  perluArsir,
  targetArsir,
  targetBagi,
  targetKali,
  targetPasang,
  ulangBagi,
  type CaraKali,
  type KeadaanJahit,
  type ModeJahit,
} from "./logika";
import { MISI_JAHIT_TEKS, PEMBAGI, PENGALI } from "./data-sim";
import { Batang, Gambar, PecSvg } from "./GambarJahit";
import { TampilPecahan } from "./JawabJahit";
import { ejaK4B2 } from "../eja-k4b2";

/**
 * Simulasi Kelas 4 Bab 2 Sub-Bab C: Meja Jahit (Misi Jahit). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Arsir (ketuk bagian kain bawah sampai arsirannya sama panjang dengan kain atas), Kali (pilih cara dan pengali; alat menolak cara menambah),
 * Bagi (bagi pembilang dan penyebut sampai paling sederhana; alat menolak pembagi yang tidak membagi habis keduanya), dan Pasang (pilih kartu pecahan yang sama besar).
 */
const MODE: { id: ModeJahit; nama: string; ikon: string }[] = [
  { id: "arsir", nama: "Arsir", ikon: "\u{1F9F5}" },
  { id: "kali", nama: "Kali", ikon: "\u{1F380}" },
  { id: "bagi", nama: "Bagi", ikon: "\u{1F4CF}" },
  { id: "pasang", nama: "Pasang", ikon: "\u{1F4D0}" },
];
const CARA: { id: CaraKali; nama: string }[] = [
  { id: "kali", nama: "Kali" },
  { id: "tambah", nama: "Tambah" },
];

export default function SimulasiMejaJahit({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJahit) => void }) {
  const [k, setK] = useState<KeadaanJahit>(() => awalJahit());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Ubah keadaan; pesan lama dikosongkan bila tidak ada pesan baru (soal atau pilihan berganti). */
  const ubah = (baru: KeadaanJahit, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ejaK4B2(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B2(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#BE185D] bg-white px-3 text-sm font-black text-[#9D174D] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#BE185D] bg-[#BE185D] text-white" : "border-[#BE185D] bg-white text-[#BE185D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] min-w-[48px] rounded-xl border-4 px-3 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#F9A8D4] bg-white"}`;

  const ganti = (m: ModeJahit) =>
    ubah(
      pilihModeJahit(k, m),
      m === "arsir"
        ? "Bandingkan kain atas dengan kain bawah, lalu arsir kain bawah."
        : m === "kali"
          ? "Lihat pesanan Kak Sekar, lalu pilih cara dan pengali."
          : m === "bagi"
            ? "Bagi pembilang dan penyebut sampai pecahan paling sederhana."
            : "Pilih semua kartu yang sama besar dengan pecahan di papan.",
    );

  /* ------------------------------ Arsir ------------------------------ */
  const ta = targetArsir(k);
  const ketukBagianKu = (i: number) => ubah(ketukBagian(k, i));
  const tambahBagian = () => {
    const i = k.arsir.findIndex((x) => !x);
    if (i < 0) return salah("Semua bagian sudah diarsir.");
    ketukBagianKu(i);
  };
  const kurangiBagian = () => {
    const i = k.arsir.lastIndexOf(true);
    if (i < 0) return salah("Belum ada bagian yang diarsir.");
    ketukBagianKu(i);
  };
  const periksaArsirKu = () => {
    const r = periksaArsir(k);
    if (r.ok) return ubah(r.k, `Betul! Arsiran kain bawah sama panjang dengan kain atas, yaitu ${ta.p}/${ta.q} sama besar dengan ${perluArsir(k)}/${ta.r}.`);
    ubah(r.k);
    salah(petunjukArsir(k));
  };
  /* ------------------------------ Kali ------------------------------ */
  const tk = targetKali(k);
  const hasil = hasilKaliTampil(k);
  const periksaKaliKu = () => {
    const r = periksaKali(k);
    if (r.ok) return ubah(r.k, `Betul! ${tk.p}/${tk.q} dikali ${k.kaliN}/${k.kaliN} menjadi ${tk.p * k.kaliN}/${tk.t}, sama besar dengan ${tk.p}/${tk.q}.`);
    ubah(r.k);
    salah(petunjukKali(k));
  };
  /* ------------------------------ Bagi ------------------------------ */
  const tb = targetBagi(k);
  const bagiKu = (d: number) => {
    const r = bagiDengan(k, d);
    if (!r.ok) return salah(petunjukTolakBagi());
    ubah(r.k);
  };
  const periksaBagiKu = () => {
    const r = periksaBagi(k);
    if (r.ok) return ubah(r.k, `Betul! ${tb.P}/${tb.Q} sudah menjadi pecahan yang paling sederhana.`);
    ubah(r.k);
    salah(petunjukBagi(k));
  };
  /* ------------------------------ Pasang ------------------------------ */
  const tp = targetPasang(k);
  const periksaPasangKu = () => {
    const r = periksaPasang(k);
    if (r.ok) return ubah(r.k, `Betul! Kedua kartu itu sama besar dengan ${tp.p}/${tp.q}.`);
    ubah(r.k);
    salah(petunjukPasang(k));
  };

  const pesanBawah = catatan || (k.mode === "arsir" ? kalimatArsir(k) : k.mode === "kali" ? kalimatKali(k) : k.mode === "bagi" ? kalimatBagi(k) : kalimatPasang(k));
  return (
    <div className="space-y-3" data-uji="simulasi-meja-jahit">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#BE185D] bg-[#FDF2F8] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Meja Jahit</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_JAHIT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "arsir" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Kain atas berarsir ${ta.p} per ${ta.q} dan kain bawah dibagi ${ta.r} bagian`} judul="arsir kain bawah sama panjang">
              <Batang x={70} y={34} w={200} h={30} q={ta.q} arsir={ta.p} rupa="benda" />
              <PecSvg x={36} y={47} p={ta.p} q={ta.q} />
              <Batang x={70} y={92} w={200} h={30} q={ta.r} arsir={k.arsir} rupa="benda" aktif onKetuk={ketukBagianKu} nama="Kain bawah" />
              <PecSvg x={36} y={105} p="?" q={ta.r} />
              <text x={150} y={150} textAnchor="middle" fontSize={11} fontWeight={900} fill="#9D174D">
                {`kain bawah dibagi ${ta.r} bagian, diarsir ${banyakArsir(k)}`}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tambahBagian}>
                {"\u{2795}"} Arsir satu bagian
              </button>
              <button type="button" className={tombol} onClick={kurangiBagian}>
                {"\u{2796}"} Kurangi satu
              </button>
              <button type="button" className={tombol} onClick={periksaArsirKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kali" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#BE185D] bg-white px-2 py-1 text-center text-sm font-black text-[#831843]">
              Kak Sekar memesan <TampilPecahan teks={`${tk.p}/${tk.q}`} /> ditulis dengan penyebut {tk.t}
            </p>
            <div className="mx-auto flex max-w-[420px] items-center justify-center gap-3 rounded-xl border-4 border-[#F9A8D4] bg-white py-2 text-2xl font-black text-[#1C01A5]" role="group" aria-label="Pecahan yang terbentuk">
              <TampilPecahan teks={`${tk.p}/${tk.q}`} />
              <span aria-hidden="true">{k.kaliCara === "kali" ? "×" : "+"}</span>
              <span className="rounded-lg border-2 border-dashed border-[#BE185D] px-2 py-1">{k.kaliN === 0 ? <TampilPecahan teks="?/?" /> : <TampilPecahan teks={`${k.kaliN}/${k.kaliN}`} />}</span>
              <span aria-hidden="true">=</span>
              {hasil ? <TampilPecahan teks={`${hasil[0]}/${hasil[1]}`} /> : <span>?</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih cara">
              {CARA.map((c) => (
                <button key={c.id} type="button" onClick={() => ubah(pilihCaraKali(k, c.id))} aria-pressed={k.kaliCara === c.id} className={saklar(k.kaliCara === c.id)}>
                  {c.nama}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih bilangan pengali">
              {PENGALI.map((n) => (
                <button key={n} type="button" onClick={() => ubah(pilihPengali(k, n))} aria-pressed={k.kaliN === n} className={pilihan(k.kaliN === n)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKaliKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagi" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Kain berarsir ${k.bagiP} per ${k.bagiQ}`} judul="bagi pembilang dan penyebut">
              <Batang x={30} y={90} w={240} h={26} q={k.bagiQ} arsir={k.bagiP} rupa="benda" />
              <PecSvg x={150} y={52} p={k.bagiP} q={k.bagiQ} u={26} />
              <text x={150} y={150} textAnchor="middle" fontSize={11} fontWeight={900} fill="#9D174D">
                {`pecahan awal ${tb.P}/${tb.Q}`}
              </text>
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih pembagi">
              {PEMBAGI.map((d) => (
                <button key={d} type="button" onClick={() => bagiKu(d)} className={pilihan(false)} aria-label={`Bagi dengan ${d}`}>
                  {"÷"}
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(ulangBagi(k), "Pecahan kembali ke awal.")}>
                {"\u{21A9}"} Ulangi
              </button>
              <button type="button" className={tombol} onClick={periksaBagiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pasang" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#BE185D] bg-white px-2 py-1 text-center text-sm font-black text-[#831843]">
              Papan: <TampilPecahan teks={`${tp.p}/${tp.q}`} />
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5" role="group" aria-label="Kartu pecahan">
              {tp.kartu.map(([a, b], i) => (
                <button key={`${a}/${b}`} type="button" onClick={() => ubah(ketukKartu(k, i))} aria-pressed={k.pasangPilih.includes(i)} className={`${pilihan(k.pasangPilih.includes(i))} text-xl`}>
                  <TampilPecahan teks={`${a}/${b}`} />
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPasangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJahit(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(pesanBawah)}
      </p>
    </div>
  );
}
