"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  KANAN_MAKS,
  KANAN_MIN,
  NAMA_BENTUK_SIM,
  NAMA_HUBUNGAN,
  SUDUT_MAKS,
  SUDUT_MIN,
  awalLintasan,
  bentukRakitan,
  ciriRakitan,
  geserKanan,
  hubunganDari,
  hurufBesar,
  kalimatBangun,
  kalimatSejajar,
  kalimatTanda,
  kalimatTegak,
  kosongkanBangun,
  mulaiLagiLintasan,
  pakaiLengkung,
  pasangPojok,
  pasanganTanda,
  periksaBangun,
  periksaSejajar,
  periksaTanda,
  periksaTegak,
  petunjukBangun,
  petunjukSejajar,
  petunjukTanda,
  petunjukTegak,
  pilihModeLintasan,
  pilihTanda,
  polaSejajar,
  putarTali,
  samakanSisi,
  sebutNama,
  tambahBatang,
  targetBangun,
  ukurJarak,
  type HubunganTanda,
  type KeadaanLintasan,
  type ModeLintasan,
} from "./logika";
import { MISI_LINTASAN_TEKS } from "./data-sim";
import type { Bentuk } from "./logika-cpa";
import { Petak, Ukur, UNGU } from "./GambarLintasan";
import { PETAK, duaTali, pojokKertas, titikBangun, titikKePoints, titikTemu, ujungKanan, yPada, type Titik } from "./geometri";

/**
 * Simulasi Kelas 3 Bab 4 Sub-Bab C: Lintasan Lomba, simulasi penutup bab. Eksplorasi bebas tanpa skor, empat alat:
 * Tegak lurus (putar tali kedua dan cocokkan pojok kertas), Sejajar (geser ujung tali dan cek jarak kedua ujung pada kertas petak),
 * Tanda (tandai sepasang tali) dan Bangun (rakit bangun dari batang lalu sebut namanya). Data berbeda dari Story.
 */
const MODE: { id: ModeLintasan; nama: string; ikon: string }[] = [
  { id: "tegak", nama: "Tegak lurus", ikon: "\u{1F4D0}" },
  { id: "sejajar", nama: "Sejajar", ikon: "\u{1F4CF}" },
  { id: "tanda", nama: "Tanda", ikon: "\u{1F3F7}\u{FE0F}" },
  { id: "bangun", nama: "Bangun", ikon: "\u{1F9E9}" },
];
const ORANYE = "#EA580C";
const UNGU_TALI = "#7C3AED";
const NAMA_BANGUN: Bentuk[] = ["segitiga", "persegi", "persegiPanjang", "lingkaran"];

const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
function Papan({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} role="img" aria-label={label}>
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}
const Patok = ({ p }: { p: Titik }) => <circle cx={p[0]} cy={p[1]} r={4.6} fill="#F97316" stroke="#7C2D12" strokeWidth={1.2} />;

/** Dua garis bertemu di B dengan sudut tertentu dan pojok kertas bila dipasang. */
function Temu({ derajat, pojok, cx = 150, cy = 104, p = 92 }: { derajat: number; pojok: boolean; cx?: number; cy?: number; p?: number }) {
  const { B, A, C } = titikTemu(cx, cy, derajat, p);
  return (
    <g>
      {pojok ? <polygon points={titikKePoints(pojokKertas(B, p * 0.58))} fill="#FEF08A" fillOpacity={0.7} stroke="#A16207" strokeWidth={1.4} strokeDasharray="3 2" /> : null}
      <line x1={B[0]} y1={B[1]} x2={A[0]} y2={A[1]} stroke={ORANYE} strokeWidth={4.2} strokeLinecap="round" />
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={UNGU_TALI} strokeWidth={4.2} strokeLinecap="round" />
      <Patok p={B} />
      <Patok p={A} />
      <Patok p={C} />
    </g>
  );
}

function PapanTegak({ k }: { k: KeadaanLintasan }) {
  return (
    <Papan label={k.pojok ? "Dua tali bertemu dengan pojok kertas terpasang" : "Dua tali bertemu"} judul="putar tali kedua, cocokkan pojok kertas">
      <rect x={6} y={26} width={288} height={160} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} />
      <Temu derajat={k.sudut} pojok={k.pojok} cx={110} cy={110} p={96} />
      <text x={258} y={150} textAnchor="end" fontSize={9} fontWeight={900} fill={ORANYE}>
        tali pertama
      </text>
      <text x={290} y={46} textAnchor="end" fontSize={9} fontWeight={900} fill={UNGU_TALI}>
        tali kedua
      </text>
      <text x={150} y={196} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
        {k.pojok ? "pojok kertas terpasang di titik temu" : "pojok kertas belum dipasang"}
      </text>
    </Papan>
  );
}

/** Dua tali pada kertas petak. `tampil`: tampilkan panah jarak berangka; bila tidak, panah diberi tanda tanya. */
function PapanTali({ kiri, kanan, miring, tampil, judul }: { kiri: number; kanan: number; miring: number; tampil: boolean; judul: string }) {
  const t = duaTali(kiri, kanan, miring);
  const xL = PETAK.x0 + 16;
  const xR = ujungKanan - 16;
  return (
    <Papan label="Dua tali pada kertas petak" judul={judul}>
      <Petak rupa="benda" />
      <line x1={t.atas[0][0]} y1={t.atas[0][1]} x2={t.atas[1][0]} y2={t.atas[1][1]} stroke={ORANYE} strokeWidth={4.2} strokeLinecap="round" />
      <line x1={t.bawah[0][0]} y1={t.bawah[0][1]} x2={t.bawah[1][0]} y2={t.bawah[1][1]} stroke={UNGU_TALI} strokeWidth={4.2} strokeLinecap="round" />
      {[t.atas[0], t.atas[1], t.bawah[0], t.bawah[1]].map((p, i) => (
        <Patok key={i} p={p} />
      ))}
      <Ukur x={xL} y1={yPada(t.atas, xL)} y2={yPada(t.bawah, xL)} label={tampil ? `${kiri} petak` : "? petak"} anchor="start" />
      <Ukur x={xR} y1={yPada(t.atas, xR)} y2={yPada(t.bawah, xR)} label={tampil ? `${kanan} petak` : "? petak"} anchor="end" />
    </Papan>
  );
}

/** Batang rakitan: sisi bangun digambar sebagai batang berwarna, lingkaran sebagai garis lengkung. */
function PapanBangun({ k }: { k: KeadaanLintasan }) {
  const b = bentukRakitan(k);
  const batang = (p: Titik, q: Titik, i: number) => <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={i % 2 === 0 ? ORANYE : UNGU_TALI} strokeWidth={5} strokeLinecap="round" />;
  let isi: React.ReactNode = null;
  if (k.lengkung) isi = <circle cx={150} cy={100} r={48} fill="none" stroke={ORANYE} strokeWidth={5} />;
  else if (k.batang === 1) isi = batang([100, 130], [200, 130], 0);
  else if (k.batang === 2) isi = [batang([96, 140], [150, 70], 0), batang([150, 70], [204, 140], 1)];
  else if (k.batang === 3 || k.batang === 4) {
    const t = titikBangun(k.batang === 3 ? "segitiga" : k.sama ? "persegi" : "persegiPanjang", 150, 100, k.batang === 3 ? 110 : k.sama ? 84 : 100);
    isi = t.map((p, i) => batang(p, t[(i + 1) % t.length], i));
  }
  return (
    <Papan label={b ? `Rakitan ${NAMA_BENTUK_SIM[b]}` : "Batang rakitan"} judul="rakit bangun dari batang">
      <rect x={6} y={26} width={288} height={160} rx={10} fill="#FFF7ED" stroke="#FDBA74" strokeWidth={1.2} />
      {isi}
      <text x={150} y={176} textAnchor="middle" fontSize={9.4} fontWeight={900} fill={UNGU}>
        {ciriRakitan(k)}
      </text>
    </Papan>
  );
}

export default function SimulasiLintasanLomba({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLintasan) => void }) {
  const [k, setK] = useState<KeadaanLintasan>(() => awalLintasan());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanLintasan, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;

  const ganti = (m: ModeLintasan) => {
    setCatatan("");
    ubah(
      pilihModeLintasan(k, m),
      m === "tegak"
        ? "Putar tali kedua sampai pas dengan pojok kertas."
        : m === "sejajar"
          ? "Geser ujung tali sampai jarak kedua ujung sama."
          : m === "tanda"
            ? "Tandai sepasang tali: tegak lurus, sejajar, atau bukan keduanya."
            : "Rakit bangun dari batang, lalu sebut namanya.",
    );
  };
  const putar = (arah: 1 | -1) => {
    const r = putarTali(k, arah);
    if (!r.ok) return salah("Tali kedua tidak bisa diputar lebih jauh.");
    ubah(r.k);
  };
  const periksaTegakKu = () => {
    const r = periksaTegak(k);
    if (r.ok) return ubah(r.k, "Betul! Pojok kertas pas, jadi kedua tali tegak lurus.");
    ubah(r.k);
    salah(petunjukTegak(k));
  };
  const geser = (arah: 1 | -1) => {
    const r = geserKanan(k, arah);
    if (!r.ok) return salah(arah === 1 ? "Ujung kanan tidak bisa turun lagi." : "Ujung kanan tidak bisa naik lagi.");
    ubah(r.k);
  };
  const periksaSejajarKu = () => {
    const r = periksaSejajar(k);
    if (r.ok) return ubah(r.k, "Betul! Jarak kedua ujung sama, jadi kedua tali sejajar.");
    ubah(r.k);
    salah(petunjukSejajar(k));
  };
  const periksaTandaKu = () => {
    const r = periksaTanda(k);
    if (r.ok) return ubah(r.k, `Betul! Pasangan tali itu ${NAMA_HUBUNGAN[hubunganDari(pasanganTanda(k))]}.`);
    ubah(r.k);
    salah(petunjukTanda(k));
  };
  const periksaBangunKu = () => {
    const r = periksaBangun(k);
    if (r.ok) return ubah(r.k, `Betul! Bangunnya ${NAMA_BENTUK_SIM[targetBangun(k).bentuk]}.`);
    ubah(r.k);
    salah(petunjukBangun(k));
  };
  const batangKu = (arah: 1 | -1) => {
    const r = tambahBatang(k, arah);
    if (!r.ok) return salah(arah === 1 ? "Batang lurus paling banyak empat." : "Batangnya sudah habis.");
    ubah(r.k);
  };

  const p = polaSejajar(k);
  const tr = pasanganTanda(k);
  const tt = targetBangun(k);
  const pilihHubungan: HubunganTanda[] = ["tegak", "sejajar", "bukan"];

  return (
    <div className="space-y-3" data-uji="simulasi-lintasan-lomba">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#9A3412]">Misi Lintasan Lomba</p>
        <p className="text-xs font-bold text-[#9A3412]/80">{MISI_LINTASAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tegak" ? (
          <div className="space-y-2">
            <PapanTegak k={k} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => putar(1)} disabled={k.sudut >= SUDUT_MAKS} aria-label="Putar tali kedua supaya sudutnya membuka">
                {"\u{21BA}"} Buka sudut
              </button>
              <button type="button" className={tombol} onClick={() => putar(-1)} disabled={k.sudut <= SUDUT_MIN} aria-label="Putar tali kedua supaya sudutnya menutup">
                {"\u{21BB}"} Tutup sudut
              </button>
              <button type="button" className={tombol} aria-pressed={k.pojok} onClick={() => ubah(pasangPojok(k), k.pojok ? "Pojok kertas dilepas." : "Pojok kertas dipasang di titik temu.")}>
                {"\u{1F4C4}"} {k.pojok ? "Lepas pojok kertas" : "Pasang pojok kertas"}
              </button>
              <button type="button" className={tombol} onClick={periksaTegakKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sejajar" ? (
          <div className="space-y-2">
            <PapanTali kiri={p.kiri} kanan={k.kanan} miring={p.miring} tampil={k.jarakDiukur} judul="geser ujung kanan tali kedua" />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geser(-1)} disabled={k.kanan <= KANAN_MIN} aria-label="Naikkan ujung kanan tali kedua">
                {"\u{2B06}\u{FE0F}"} Naikkan ujung kanan
              </button>
              <button type="button" className={tombol} onClick={() => geser(1)} disabled={k.kanan >= KANAN_MAKS || k.kanan + p.miring >= 6} aria-label="Turunkan ujung kanan tali kedua">
                {"\u{2B07}\u{FE0F}"} Turunkan ujung kanan
              </button>
              <button type="button" className={tombol} aria-pressed={k.jarakDiukur} onClick={() => ubah(ukurJarak(k), "Jarak kedua ujung sudah diukur pada kertas petak.")}>
                {"\u{1F4CF}"} Ukur jarak
              </button>
              <button type="button" className={tombol} onClick={periksaSejajarKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tanda" ? (
          <div className="space-y-2">
            {tr.jenis === "tali" ? (
              <PapanTali kiri={tr.kiri} kanan={tr.kanan} miring={tr.miring} tampil judul={`pasangan tali nomor ${(k.tandaKe % 4) + 1}`} />
            ) : (
              <Papan label="Dua tali bertemu dengan pojok kertas" judul={`pasangan tali nomor ${(k.tandaKe % 4) + 1}`}>
                <rect x={6} y={26} width={288} height={160} rx={10} fill="#DCFCE7" stroke="#4ADE80" strokeWidth={1.2} />
                <Temu derajat={tr.sudut} pojok cx={150} cy={106} p={96} />
              </Papan>
            )}
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tanda">
              {pilihHubungan.map((h) => (
                <button key={h} type="button" aria-pressed={k.pilihan === h} className={saklar(k.pilihan === h)} onClick={() => ubah(pilihTanda(k, h), `Tandanya ${NAMA_HUBUNGAN[h]}.`)}>
                  {hurufBesar(NAMA_HUBUNGAN[h])}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaTandaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bangun" ? (
          <div className="space-y-2">
            <PapanBangun k={k} />
            <p className="text-center text-sm font-black text-[#9A3412]">Cari bangun yang {tt.ciri}.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => batangKu(1)} disabled={k.batang >= 4}>
                {"\u{2795}"} Tambah batang
              </button>
              <button type="button" className={tombol} onClick={() => batangKu(-1)} disabled={k.batang <= 0}>
                {"\u{2796}"} Kurangi batang
              </button>
              <button
                type="button"
                className={tombol}
                aria-pressed={k.sama}
                disabled={k.batang !== 4}
                onClick={() => {
                  const r = samakanSisi(k);
                  if (r.ok) ubah(r.k, r.k.sama ? "Keempat batang disamakan panjangnya." : "Batang dibuat berbeda panjang.");
                }}
              >
                {"\u{1F4CF}"} Samakan panjang
              </button>
              <button type="button" className={tombol} aria-pressed={k.lengkung} onClick={() => ubah(pakaiLengkung(k), k.lengkung ? "Batang lengkung dilepas." : "Memakai satu batang lengkung.")}>
                {"\u{2B55}"} Batang lengkung
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Sebut nama bangun">
              {NAMA_BANGUN.map((b) => (
                <button key={b} type="button" aria-pressed={k.nama === b} className={saklar(k.nama === b)} onClick={() => ubah(sebutNama(k, b), `Namanya ${NAMA_BENTUK_SIM[b]}.`)}>
                  {hurufBesar(NAMA_BENTUK_SIM[b])}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(kosongkanBangun(k), "Batang dikosongkan.")}>
                {"\u{21A9}"} Kosongkan
              </button>
              <button type="button" className={tombol} onClick={periksaBangunKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiLintasan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "tegak" ? kalimatTegak(k) : k.mode === "sejajar" ? kalimatSejajar(k) : k.mode === "tanda" ? kalimatTanda(k) : kalimatBangun(k))}
      </p>
    </div>
  );
}
