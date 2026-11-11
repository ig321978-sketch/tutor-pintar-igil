"use client";

import React, { useEffect, useState } from "react";
import { BendaSeret, TombolSuaraGuru, zonaDi } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, UNGU, eja } from "./komponen-lab";
import { BendaDi, BendaSvg, LatarKamar, LatarTaman, UKURAN_BENDA } from "./dasar-k2b4";
import { ZONA_ACUAN, type BendaId } from "./data-k2b4";
import {
  AWAL_ACUAN,
  AWAL_BENDA,
  NAMA_LAB,
  PASANGAN,
  URUT_ACUAN,
  URUT_BENDA,
  URUT_KATA,
  frasa,
  kalimat,
  kalimatAnak,
  kalimatKosong,
  kalimatLawan,
  lapisPeta,
  selPeta,
  tandaiSudah,
  ucapanPosisi,
  type AcuanLab,
  type BendaLab,
  type KataPos,
} from "./lab-posisi-k2b4";
import type { KeadaanLabPosisi } from "./misi-k2bab4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B4 Sub-Bab A): Lab Posisi — PhET.                              */
/* Satu benda ditaruh di enam tempat di sekitar satu benda acuan. Gambar,      */
/* kalimat, kalimat lawan, peta kotak polos, sudut pandang anak, dan tabel     */
/* pasangan kata berubah bersama. Tanpa skor. Logika: lab-posisi-k2b4.ts.      */
/* ------------------------------------------------------------------------ */

const SKALA_ACUAN: Partial<Record<BendaId, number>> = { kotak: 1.5, meja: 1.3, kursi: 1.5, pohon: 1 };
const NAMA_ZONA: Record<KataPos, string> = { atas: "atas", bawah: "bawah", depan: "depan", belakang: "belakang", kanan: "kanan", kiri: "kiri" };

function Acuan({ id }: { id: AcuanLab }) {
  const [w, h] = UKURAN_BENDA[id];
  const s = SKALA_ACUAN[id] ?? 1.3;
  return <BendaDi id={id} x={50 - (w * s) / 2} y={40 - (h * s) / 2} w={w * s} h={h * s} />;
}

function Benda({ id, kata }: { id: BendaLab; kata: KataPos }) {
  const z = ZONA_ACUAN.find((q) => q.kata === kata)!;
  const [w, h] = UKURAN_BENDA[id];
  return <BendaDi id={id} x={z.x - (w * z.skala) / 2} y={z.y - (h * z.skala) / 2} w={w * z.skala} h={h * z.skala} />;
}

/** Peta kotak polos 3 x 3: acuan di tengah (persegi ungu), benda lingkaran merah. Tanpa gambar benda. */
function PetaPolos({ kata }: { kata: KataPos | null }) {
  const sel = kata ? selPeta(kata) : null;
  const lapis = kata ? lapisPeta(kata) : null;
  const ukuran = 40;
  return (
    <figure className="min-w-0 flex-1">
      <figcaption className="mb-1 text-center text-xs font-black text-[#1C01A5]">Peta kotak (dilihat dari depan)</figcaption>
      <svg viewBox="0 0 120 120" className="mx-auto block w-full max-w-[170px] rounded-2xl bg-indigo-50/60" role="img" aria-label={kata ? `Peta kotak: benda ${frasa(kata)} acuan` : "Peta kotak kosong"}>
        {[0, 1, 2].flatMap((b) => [0, 1, 2].map((k) => <rect key={`${b}${k}`} x={k * ukuran} y={b * ukuran} width={ukuran} height={ukuran} fill="#fff" stroke={UNGU} strokeOpacity={0.35} strokeWidth={1.5} />))}
        {lapis === "belakang" ? <circle cx={60} cy={46} r={13} fill="#EF4444" stroke={UNGU} strokeWidth={2.5} /> : null}
        <rect x={ukuran + 6} y={ukuran + 6} width={ukuran - 12} height={ukuran - 12} rx={4} fill="#C7D2FE" stroke={UNGU} strokeWidth={3} />
        <text x={60} y={64} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          acuan
        </text>
        {sel ? <circle cx={sel.k * ukuran + ukuran / 2} cy={sel.b * ukuran + ukuran / 2} r={13} fill="#EF4444" stroke={UNGU} strokeWidth={2.5} /> : null}
        {lapis === "depan" ? <circle cx={60} cy={74} r={13} fill="#EF4444" stroke={UNGU} strokeWidth={2.5} /> : null}
      </svg>
      <p className="mt-1 text-center text-xs font-bold leading-snug text-[#1C01A5]/80">
        {lapis === "depan"
          ? "Depan: lingkaran merah lebih dekat ke kita, menutupi acuan."
          : lapis === "belakang"
            ? "Belakang: lingkaran merah tersembunyi di balik acuan."
            : kata
              ? `Lingkaran merah ${frasa(kata)} persegi.`
              : "Taruh benda dulu, lalu lihat lingkaran merahnya."}
      </p>
    </figure>
  );
}

/** Anak membelakangi kita (tanpa wajah). Benda di kiri atau kanan anak. */
function AnakBelakang({ kata, benda }: { kata: KataPos | null; benda: BendaLab }) {
  const [w, h] = UKURAN_BENDA[benda];
  const sisi = kata === "kiri" || kata === "kanan" ? kata : null;
  const cx = sisi === "kiri" ? 18 : 82;
  return (
    <figure className="min-w-0 flex-1">
      <figcaption className="mb-1 text-center text-xs font-black text-[#1C01A5]">Anak membelakangi kita</figcaption>
      <svg viewBox="0 0 100 75" className="mx-auto block w-full max-w-[220px] rounded-2xl bg-indigo-50/60" role="img" aria-label="Anak dilihat dari belakang">
        <ellipse cx={50} cy={68} rx={20} ry={3} fill="#C7D2FE" />
        <rect x={38} y={34} width={24} height={26} rx={6} fill="#A78BFA" stroke={UNGU} strokeWidth={1.6} />
        <rect x={28} y={36} width={9} height={20} rx={4} fill="#A78BFA" stroke={UNGU} strokeWidth={1.4} />
        <rect x={63} y={36} width={9} height={20} rx={4} fill="#A78BFA" stroke={UNGU} strokeWidth={1.4} />
        <rect x={40} y={58} width={8} height={9} rx={2} fill="#1F2937" />
        <rect x={52} y={58} width={8} height={9} rx={2} fill="#1F2937" />
        <circle cx={50} cy={24} r={11} fill="#4B2E1A" stroke={UNGU} strokeWidth={1.6} />
        {sisi ? <BendaDi id={benda} x={cx - w / 2} y={52 - h / 2} w={w} h={h} /> : null}
        <text x={14} y={10} fontSize={7} fontWeight={900} fill={UNGU}>
          kiri anak
        </text>
        <text x={63} y={10} fontSize={7} fontWeight={900} fill={UNGU}>
          kanan anak
        </text>
      </svg>
      <p className="mt-1 text-center text-xs font-bold leading-snug text-[#1C01A5]/80">{kalimatAnak(kata)}</p>
    </figure>
  );
}

export default function SimulasiLabPosisi({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabPosisi) => void }) {
  const [acuan, setAcuan] = useState<AcuanLab>(AWAL_ACUAN);
  const [benda, setBenda] = useState<BendaLab>(AWAL_BENDA);
  const [kata, setKata] = useState<KataPos | null>(null);
  const [sudah, setSudah] = useState<KataPos[]>([]);
  const [lawan, setLawan] = useState(false);
  const [peta, setPeta] = useState(false);
  const [anak, setAnak] = useState(false);
  const [tabel, setTabel] = useState(false);
  const [dipilih, setDipilih] = useState(false);

  useEffect(() => {
    onKeadaan?.({ alat: "posisi", acuan, benda, kata, lawan, peta, anak, tabel, sudah });
  }, [onKeadaan, acuan, benda, kata, lawan, peta, anak, tabel, sudah]);

  const namaAcuan = NAMA_LAB[acuan];
  const namaBenda = NAMA_LAB[benda];

  const taruh = (k: KataPos) => {
    setKata(k);
    setSudah((s) => tandaiSudah(s, k));
    setDipilih(false);
  };
  const lepas = (_id: string, x: number, y: number) => {
    const z = zonaDi(x, y);
    if (z?.startsWith("lp:")) taruh(z.slice(3) as KataPos);
  };

  const resetSemua = () => {
    setAcuan(AWAL_ACUAN);
    setBenda(AWAL_BENDA);
    setKata(null);
    setSudah([]);
    setLawan(false);
    setPeta(false);
    setAnak(false);
    setTabel(false);
    setDipilih(false);
  };

  const teks = kata ? kalimat(namaBenda, kata, namaAcuan) : kalimatKosong(namaAcuan);
  const tampilBelakang = kata === "belakang";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Posisi</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Taruh satu benda di sekitar benda acuan. Lihat kalimat, peta, dan pasangan katanya berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(ucapanPosisi(namaAcuan, namaBenda, kata, lawan)))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Benda acuan">
          <span className="text-xs font-black text-[#1C01A5]">Benda acuan:</span>
          {URUT_ACUAN.map((a) => (
            <Pilihan key={a} aktif={acuan === a} onKlik={() => setAcuan(a)} label={`Acuan ${NAMA_LAB[a]}`}>
              <span className="inline-flex items-center gap-1">
                <BendaSvg id={a} kelas="h-5 w-5" label="" />
                {NAMA_LAB[a]}
              </span>
            </Pilihan>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Benda yang ditaruh">
          <span className="text-xs font-black text-[#1C01A5]">Benda yang ditaruh:</span>
          {URUT_BENDA.map((b) => (
            <Pilihan key={b} aktif={benda === b} onKlik={() => setBenda(b)} label={`Benda ${NAMA_LAB[b]}`}>
              <span className="inline-flex items-center gap-1">
                <BendaSvg id={b} kelas="h-5 w-5" label="" />
                {NAMA_LAB[b]}
              </span>
            </Pilihan>
          ))}
        </div>
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border-4 border-[#1C01A5]/50">
          <svg viewBox="0 0 100 75" className="block h-auto w-full" role="img" aria-label={`Panggung: ${teks}`}>
            {acuan === "pohon" ? <LatarTaman /> : <LatarKamar />}
            {kata && tampilBelakang ? <Benda id={benda} kata={kata} /> : null}
            <Acuan id={acuan} />
            {kata && !tampilBelakang ? <Benda id={benda} kata={kata} /> : null}
          </svg>
          {URUT_KATA.map((k) => {
            const z = ZONA_ACUAN.find((q) => q.kata === k)!;
            const aktif = kata === k;
            return (
              <div
                key={k}
                data-zona={`lp:${k}`}
                role="button"
                tabIndex={0}
                aria-label={`Tempat ${frasa(k)} ${namaAcuan}`}
                onClick={() => taruh(k)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    taruh(k);
                  }
                }}
                className={`absolute flex h-[16%] w-[15%] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-end justify-center rounded-full border-4 border-dashed pb-0.5 text-[10px] font-black leading-none ${
                  aktif ? "border-[#F0AB00] bg-[#FFF7CC]/40 text-transparent" : dipilih ? "border-[#F0AB00] bg-[#FFF7CC]/60 text-[#1C01A5]" : "border-[#1C01A5]/35 bg-white/30 text-[#1C01A5]/70"
                }`}
                style={{ left: `${z.x}%`, top: `${(z.y / 75) * 100}%` }}
              >
                {NAMA_ZONA[k]}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/80 p-1.5" role="group" aria-label="Nampan benda">
          <span className="text-sm font-black text-[#1C01A5]">Benda:</span>
          <BendaSeret id="benda-lab" label={`Ambil ${namaBenda}`} onKetuk={() => setDipilih((d) => !d)} onLepas={lepas} kelas={`rounded-2xl p-1 ${dipilih ? "ring-4 ring-[#F0AB00]" : ""}`}>
            <div className="flex h-12 w-12 items-center justify-center">
              <BendaSvg id={benda} kelas="h-12 w-12" label={namaBenda} />
            </div>
          </BendaSeret>
          <span className="text-xs font-black text-[#1C01A5]/70">Seret ke salah satu tempat. Boleh juga ketuk tempatnya langsung.</span>
        </div>
        <KalimatBesar teks={teks} />
        {lawan && kata ? <KalimatBesar teks={kalimatLawan(namaBenda, kata, namaAcuan)} warna="bg-[#E0E7FF]" /> : null}
        {lawan && !kata ? <p className="text-center text-xs font-bold text-[#1C01A5]/70">Taruh benda dulu. Nanti kalimat lawannya muncul di sini.</p> : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Perwakilan yang ditampilkan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={lawan} onKlik={() => setLawan(!lawan)}>
            Kalimat lawan
          </Cek>
          <Cek aktif={peta} onKlik={() => setPeta(!peta)}>
            Peta kotak
          </Cek>
          <Cek aktif={anak} onKlik={() => setAnak(!anak)}>
            Sudut pandang anak
          </Cek>
          <Cek aktif={tabel} onKlik={() => setTabel(!tabel)}>
            Tabel pasangan
          </Cek>
        </div>

        {peta || anak ? (
          <div className="flex flex-wrap items-start gap-3">
            {peta ? <PetaPolos kata={kata} /> : null}
            {anak ? <AnakBelakang kata={kata} benda={benda} /> : null}
          </div>
        ) : null}

        {tabel ? (
          <table className="w-full border-collapse overflow-hidden rounded-2xl text-center text-sm font-black text-[#1C01A5]" aria-label="Pasangan kata posisi">
            <thead>
              <tr className="bg-[#1C01A5] text-[#FFE566]">
                <th className="p-1.5">Kata</th>
                <th className="p-1.5">Lawannya</th>
              </tr>
            </thead>
            <tbody>
              {PASANGAN.map(([a, b]) => (
                <tr key={a} className="border-t-2 border-[#1C01A5]/20 bg-white">
                  {[a, b].map((k, i) => (
                    <td key={k} className={`p-1.5 ${kata === k ? "bg-[#FFE566]" : kata && (kata === (i === 0 ? b : a)) ? "bg-[#FEF3C7]" : ""}`}>
                      {sudah.includes(k) ? "✔ " : ""}
                      {k}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Sudah dicoba: {sudah.length} dari {URUT_KATA.length} kata posisi.</p>
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={resetSemua}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, taruh benda di atas acuan, lalu nyalakan kalimat lawan. Apa yang berubah? Dua, coba depan dan belakang. Apa bedanya pada gambar? Tiga, nyalakan sudut pandang anak lalu taruh benda di sebelah kanan. Sisi mana yang sama? Empat, ganti benda acuan, lalu coba semua enam kata."
          )
        }
        langkah={[
          "Taruh benda di atas acuan, lalu nyalakan Kalimat lawan. Apa yang berubah?",
          "Coba depan lalu belakang. Siapa yang menutupi siapa pada gambar?",
          "Nyalakan Sudut pandang anak, lalu taruh benda di sebelah kanan. Sisi mana yang sama dengan sisi kita?",
          "Ganti benda acuan, lalu coba semua enam kata posisi. Lihat tabel pasangannya.",
        ]}
      />
    </div>
  );
}
