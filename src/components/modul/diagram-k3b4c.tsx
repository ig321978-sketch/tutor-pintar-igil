import React from "react";
import { bertemu, hubunganPG, titikPotong, type JenisBangun, type PasanganGaris, type SoalJarak, type Titik } from "./data-k3b4";

/* ------------------------------------------------------------------------ */
/* Diagram Sub-Bab C (Matematika Kelas 3 Bab 4): kertas berpetak dengan sepasang  */
/* garis (merah dan biru), tanda siku-siku, tanda panah sejajar, jarak petak, dan  */
/* bangun datar sederhana. Gambar polos tanpa benda, jadi aman dipakai tahap       */
/* Picture dan Abstract. Tanpa acak dan tanpa jaringan.                           */
/* ------------------------------------------------------------------------ */

const BIRU = "#1C01A5";
const MERAH = "#DC2626";
const GARIS_BIRU = "#2563EB";
const bulat = (n: number) => Math.round(n * 100) / 100;

const OX = 18;
const OY = 18;
const SEL = 26;
const px = (x: number) => bulat(OX + x * SEL);
const py = (y: number) => bulat(OY + y * SEL);

/** Mata panah di titik `ujung` yang mengarah dari `dari`. */
function MataPanah({ dari, ujung, warna }: { dari: [number, number]; ujung: [number, number]; warna: string }) {
  const dx = ujung[0] - dari[0];
  const dy = ujung[1] - dari[1];
  const p = Math.hypot(dx, dy) || 1;
  const ux = dx / p;
  const uy = dy / p;
  const kiri = [ujung[0] - ux * 10 - uy * 5, ujung[1] - uy * 10 + ux * 5];
  const kanan = [ujung[0] - ux * 10 + uy * 5, ujung[1] - uy * 10 - ux * 5];
  return <polygon points={`${bulat(ujung[0])},${bulat(ujung[1])} ${bulat(kiri[0])},${bulat(kiri[1])} ${bulat(kanan[0])},${bulat(kanan[1])}`} fill={warna} />;
}

/** Kotak tanda siku-siku di titik pertemuan P (petak) dengan sisi mengikuti arah ke ujung kedua garis yang paling jauh dari P. */
function TandaSiku({ p, pasang }: { p: [number, number]; pasang: PasanganGaris }) {
  const jauh = (a: Titik, b: Titik): [number, number] => {
    const da = Math.hypot(a[0] - p[0], a[1] - p[1]);
    const db = Math.hypot(b[0] - p[0], b[1] - p[1]);
    const t = da >= db ? a : b;
    const l = Math.hypot(t[0] - p[0], t[1] - p[1]) || 1;
    return [(t[0] - p[0]) / l, (t[1] - p[1]) / l];
  };
  const u = jauh(pasang.r1.a, pasang.r1.b);
  const v = jauh(pasang.r2.a, pasang.r2.b);
  const s = 9;
  const cx = px(p[0]);
  const cy = py(p[1]);
  const a: [number, number] = [cx + u[0] * s, cy + u[1] * s];
  const b: [number, number] = [a[0] + v[0] * s, a[1] + v[1] * s];
  const c: [number, number] = [cx + v[0] * s, cy + v[1] * s];
  return <polyline points={`${bulat(a[0])},${bulat(a[1])} ${bulat(b[0])},${bulat(b[1])} ${bulat(c[0])},${bulat(c[1])}`} fill="none" stroke={BIRU} strokeWidth="1.8" />;
}

const kunciTitik = (t: Titik) => `${t[0]},${t[1]}`;

/**
 * Kertas berpetak 5 x 5 dengan sepasang garis: garis pertama merah, garis kedua biru. Pasangan tegak lurus diberi tanda kotak, pasangan sejajar diberi anak panah.
 * Bila `huruf` diberikan (empat huruf untuk ujung a dan b garis pertama, lalu a dan b garis kedua), huruf ditulis di ujung garis.
 */
export function PetakSvg({ pasang, huruf, ringkas = false, label, tanda = true }: { pasang: PasanganGaris; huruf?: [string, string, string, string]; ringkas?: boolean; label?: string; tanda?: boolean }) {
  const h = hubunganPG(pasang);
  const garisKisi: React.ReactNode[] = [];
  for (let i = 0; i <= 5; i += 1) {
    garisKisi.push(<line key={`v${i}`} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(5)} stroke="#CBD5E1" strokeWidth="1" />);
    garisKisi.push(<line key={`h${i}`} x1={px(0)} y1={py(i)} x2={px(5)} y2={py(i)} stroke="#CBD5E1" strokeWidth="1" />);
  }
  const titikTemu = h === "tegak-lurus" && bertemu(pasang.r1, pasang.r2) ? titikPotong(pasang.r1, pasang.r2) : null;
  const huruTampil: { t: Titik; teks: string; arah: [number, number] }[] = [];
  if (huruf) {
    const peta = new Map<string, { t: Titik; teks: string; arah: [number, number] }>();
    const tambah = (t: Titik, lain: Titik, teks: string) => {
      const k = kunciTitik(t);
      const dx = t[0] - lain[0];
      const dy = t[1] - lain[1];
      const p = Math.hypot(dx, dy) || 1;
      const ada = peta.get(k);
      if (ada) peta.set(k, { ...ada, arah: [ada.arah[0] + dx / p, ada.arah[1] + dy / p] });
      else peta.set(k, { t, teks, arah: [dx / p, dy / p] });
    };
    tambah(pasang.r1.a, pasang.r1.b, huruf[0]);
    tambah(pasang.r1.b, pasang.r1.a, huruf[1]);
    tambah(pasang.r2.a, pasang.r2.b, huruf[2]);
    tambah(pasang.r2.b, pasang.r2.a, huruf[3]);
    huruTampil.push(...peta.values());
  }
  const gambarGaris = (r: PasanganGaris["r1"], warna: string) => {
    const a: [number, number] = [px(r.a[0]), py(r.a[1])];
    const b: [number, number] = [px(r.b[0]), py(r.b[1])];
    return (
      <g key={warna}>
        <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={warna} strokeWidth="4" strokeLinecap="round" />
        {tanda && h === "sejajar" ? (
          <>
            <MataPanah dari={a} ujung={b} warna={warna} />
            <MataPanah dari={b} ujung={a} warna={warna} />
          </>
        ) : (
          <>
            <circle cx={a[0]} cy={a[1]} r="3.5" fill={warna} />
            <circle cx={b[0]} cy={b[1]} r="3.5" fill={warna} />
          </>
        )}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 166 166" className="mx-auto block h-auto w-full" role="img" aria-label={label ?? "Kertas berpetak dengan sepasang garis berwarna merah dan biru"}>
      <rect x={px(0)} y={py(0)} width={5 * SEL} height={5 * SEL} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
      {garisKisi}
      {gambarGaris(pasang.r1, MERAH)}
      {gambarGaris(pasang.r2, GARIS_BIRU)}
      {titikTemu && tanda ? <TandaSiku p={titikTemu} pasang={pasang} /> : null}
      {huruTampil.map((x) => {
        const p = Math.hypot(x.arah[0], x.arah[1]) || 1;
        return (
          <text key={kunciTitik(x.t)} x={bulat(px(x.t[0]) + (x.arah[0] / p) * 13)} y={bulat(py(x.t[1]) + (x.arah[1] / p) * 13 + 5)} textAnchor="middle" fontSize={ringkas ? 16 : 14} fontWeight="900" fill={BIRU}>
            {x.teks}
          </text>
        );
      })}
    </svg>
  );
}

/** Dua garis dengan jarak petak di ujung kiri dan kanan, lengkap dengan penanda jarak. Garis atas mendatar, garis bawah dari kiri ke kanan. */
export function JarakPetakSvg({ jarak, pasang }: { jarak: SoalJarak; pasang: PasanganGaris }) {
  const kisi: React.ReactNode[] = [];
  for (let i = 0; i <= 5; i += 1) {
    kisi.push(<line key={`v${i}`} x1={px(i)} y1={py(0)} x2={px(i)} y2={py(5)} stroke="#CBD5E1" strokeWidth="1" />);
    kisi.push(<line key={`h${i}`} x1={px(0)} y1={py(i)} x2={px(5)} y2={py(i)} stroke="#CBD5E1" strokeWidth="1" />);
  }
  const penanda = (x: number, y1: number, y2: number, n: number, kiri: boolean) => (
    <g key={x}>
      <line x1={px(x)} y1={py(y1)} x2={px(x)} y2={py(y2)} stroke={BIRU} strokeWidth="2" strokeDasharray="4 3" />
      <text x={px(x) + (kiri ? -4 : 4)} y={py((y1 + y2) / 2) + 4} textAnchor={kiri ? "end" : "start"} fontSize="11" fontWeight="900" fill={BIRU} stroke="#fff" strokeWidth="3" paintOrder="stroke">
        {n} petak
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 166 166" className="mx-auto block h-auto w-full" role="img" aria-label={`Dua garis berjarak ${jarak.kiri} petak di ujung kiri dan ${jarak.kanan} petak di ujung kanan`}>
      <rect x={px(0)} y={py(0)} width={5 * SEL} height={5 * SEL} fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
      {kisi}
      <line x1={px(pasang.r1.a[0])} y1={py(pasang.r1.a[1])} x2={px(pasang.r1.b[0])} y2={py(pasang.r1.b[1])} stroke={MERAH} strokeWidth="4" strokeLinecap="round" />
      <line x1={px(pasang.r2.a[0])} y1={py(pasang.r2.a[1])} x2={px(pasang.r2.b[0])} y2={py(pasang.r2.b[1])} stroke={GARIS_BIRU} strokeWidth="4" strokeLinecap="round" />
      {penanda(pasang.r1.a[0], pasang.r1.a[1], pasang.r2.a[1], jarak.kiri, true)}
      {penanda(pasang.r1.b[0], pasang.r1.b[1], pasang.r2.b[1], jarak.kanan, false)}
    </svg>
  );
}

/** Bangun datar sederhana polos: segitiga, persegi, persegi panjang, segilima, atau lingkaran. Bila `huruf` benar, titik sudut diberi huruf. */
export function BangunSederhanaSvg({ jenis, huruf = false, ringkas = false }: { jenis: JenisBangun; huruf?: boolean; ringkas?: boolean }) {
  const isi = "#FEF3C7";
  let titikBangun: [number, number][] = [];
  if (jenis === "segitiga") titikBangun = [[80, 18], [128, 108], [32, 108]];
  if (jenis === "persegi") titikBangun = [[45, 28], [115, 28], [115, 98], [45, 98]];
  if (jenis === "persegi panjang") titikBangun = [[30, 40], [130, 40], [130, 100], [30, 100]];
  if (jenis === "segilima") titikBangun = Array.from({ length: 5 }, (_, i) => [bulat(80 + 52 * Math.cos(((-90 + i * 72) * Math.PI) / 180)), bulat(70 + 52 * Math.sin(((-90 + i * 72) * Math.PI) / 180))] as [number, number]);
  const nama = ["A", "B", "C", "D", "E"];
  const kecil = ringkas ? 15 : 13;
  return (
    <svg viewBox="0 0 160 130" className="mx-auto block h-auto w-full" role="img" aria-label={`Gambar ${jenis}`}>
      {jenis === "lingkaran" ? (
        <circle cx="80" cy="66" r="48" fill={isi} stroke={BIRU} strokeWidth="4" />
      ) : (
        <polygon points={titikBangun.map((t) => t.join(",")).join(" ")} fill={isi} stroke={BIRU} strokeWidth="4" strokeLinejoin="round" />
      )}
      {jenis === "persegi" || jenis === "persegi panjang"
        ? titikBangun.map((t, i) => {
            const sx = t[0] < 80 ? 1 : -1;
            const sy = t[1] < 70 ? 1 : -1;
            return <polyline key={i} points={`${t[0] + sx * 9},${t[1]} ${t[0] + sx * 9},${t[1] + sy * 9} ${t[0]},${t[1] + sy * 9}`} fill="none" stroke={MERAH} strokeWidth="1.8" />;
          })
        : null}
      {huruf && jenis !== "lingkaran" ? (
        <g fontSize={kecil} fontWeight="900" fill={BIRU} textAnchor="middle">
          {titikBangun.map((t, i) => (
            <text key={i} x={bulat(t[0] + (t[0] - 80) * 0.16)} y={bulat(t[1] + (t[1] - 68) * 0.2 + 5)}>
              {nama[i]}
            </text>
          ))}
        </g>
      ) : null}
    </svg>
  );
}
