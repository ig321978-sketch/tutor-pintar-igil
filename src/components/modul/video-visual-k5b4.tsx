"use client";

import React from "react";
import { BIRU, EMAS } from "./CeritaBandingB";
import { Muncul, Lompat, Sorot } from "./video-cerita";
import {
  BangunKeliling,
  BangunLuas,
  LabelSvg,
  SegitigaKeliling,
  nyalaDariWaktu,
  HIJAU,
  MERAH,
  ORANYE,
} from "./video-visual-kit";

/**
 * Koreografi visual Story K5B4 — satu adegan visual unik per (sub,v,a,k),
 * progres dalam ketukan memakai `t` agar seirama kecepatan Suara Guru.
 */

function silang(x: number, y: number, s = 18) {
  return (
    <g stroke={MERAH} strokeWidth="3.5" strokeLinecap="round">
      <line x1={x - s} y1={y - s} x2={x + s} y2={y + s} />
      <line x1={x + s} y1={y - s} x2={x - s} y2={y + s} />
    </g>
  );
}

function segiN(cx: number, cy: number, r: number, n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return `${cx + r * Math.cos(ang)},${cy + r * Math.sin(ang)}`;
  }).join(" ");
}

function visualA(v: number, a: number, k: number, t: number): React.ReactNode {
  /* V1: Berjalan Mengelilingi Batas */
  if (v === 0) {
    if (a === 0) {
      // Titik awal → jalan 4 sisi → kembali → jalur tepi (bukan isi)
      if (k === 0) {
        return (
          <>
            <BangunKeliling x={95} y={50} w={110} h={110} nyala={0} outlineSaja sisi={[4, 4, 4, 4]} label={false} tampilJumlah={false} />
            <Lompat>
              <circle cx="95" cy="50" r="8" fill={EMAS} stroke={BIRU} strokeWidth="2.2" />
            </Lompat>
            <Muncul>
              <LabelSvg x={100} y={170} w={100} teks="sudut awal" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        const n = nyalaDariWaktu(t, 4, 1.7);
        const jalan = Math.min(0.98, t / 7);
        return (
          <BangunKeliling
            x={95}
            y={50}
            w={110}
            h={110}
            nyala={n}
            sisi={[4, 4, 4, 4]}
            label={false}
            tampilJumlah={false}
            outlineSaja
            jalan={jalan}
          />
        );
      }
      if (k === 2) {
        return (
          <>
            <BangunKeliling x={95} y={50} w={110} h={110} nyala={4} sisi={[4, 4, 4, 4]} label={false} tampilJumlah={false} outlineSaja />
            <Lompat>
              <circle cx="95" cy="50" r="8" fill={HIJAU} stroke={BIRU} strokeWidth="2.2" />
            </Lompat>
            <Muncul>
              <LabelSvg x={90} y={168} w={120} teks="keliling = jarak" ukuran={12} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      // k === 3: bukan isi
      return (
        <>
          <BangunKeliling x={95} y={50} w={110} h={110} nyala={4} sisi={[4, 4, 4, 4]} label={false} tampilJumlah={false} outlineSaja />
          <text x="150" y="115" textAnchor="middle" fontSize="28" fontWeight="900" fill={MERAH} opacity={0.35}>
            isi?
          </text>
          {silang(150, 108, 22)}
          <Muncul>
            <LabelSvg x={85} y={168} w={130} teks="hanya jalur tepi" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }

    if (a === 1) {
      // Bukan luas: banding keliling vs luas
      if (k === 0) {
        return (
          <>
            <BangunKeliling x={40} y={55} w={90} h={90} nyala={4} label={false} tampilJumlah={false} sisi={[4, 4, 4, 4]} />
            <BangunLuas x={170} y={60} kolom={4} baris={4} nyala={16} ukuran={18} />
            <Muncul>{silang(150, 100, 16)}</Muncul>
            <LabelSvg x={55} y={168} w={70} teks="K ?" ukuran={12} />
            <LabelSvg x={185} y={168} w={70} teks="luas ?" ukuran={12} />
          </>
        );
      }
      if (k === 1) {
        const petak = Math.min(16, Math.floor(t * 3) + 1);
        return (
          <>
            <BangunLuas x={100} y={48} kolom={4} baris={4} nyala={petak} ukuran={22} />
            <Muncul>
              <LabelSvg x={95} y={168} w={110} teks="luas = isi dalam" ukuran={12} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        const n = nyalaDariWaktu(t, 4, 1.5);
        return (
          <>
            <BangunKeliling x={95} y={48} w={110} h={110} nyala={n} outlineSaja label={false} tampilJumlah={false} sisi={[4, 4, 4, 4]} jalan={Math.min(0.95, t / 6.5)} />
            <Muncul aktif={n >= 2}>
              <LabelSvg x={90} y={168} w={120} teks="keliling = jalur" ukuran={12} warna={ORANYE} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <LabelSvg x={30} y={70} w={110} teks="keliling → cm" ukuran={13} warna={ORANYE} />
          <LabelSvg x={160} y={70} w={110} teks="luas → cm²" ukuran={13} warna={HIJAU} />
          <BangunKeliling x={40} y={110} w={70} h={50} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
          <BangunLuas x={175} y={110} kolom={3} baris={2} nyala={6} ukuran={16} />
          <Muncul>
            <LabelSvg x={90} y={175} w={120} teks="satuan beda" ukuran={12} />
          </Muncul>
        </>
      );
    }

    // a === 2: Contoh 4+4+4+4
    if (k === 0) {
      const n = nyalaDariWaktu(t, 4, 1.5);
      return <BangunKeliling x={95} y={48} w={110} h={110} nyala={n} sisi={[4, 4, 4, 4]} tampilJumlah={false} jalan={Math.min(0.95, t / 6.5)} />;
    }
    if (k === 1) {
      return (
        <>
          <BangunKeliling x={95} y={45} w={110} h={100} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={85} y={160} w={130} teks="4+4+4+4 = 16 cm" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={30} y={55} w={90} h={90} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
          <BangunLuas x={160} y={60} kolom={4} baris={4} nyala={16} ukuran={18} />
          {silang(205, 100, 20)}
          <LabelSvg x={35} y={168} w={80} teks="K=16" ukuran={13} warna={HIJAU} />
          <LabelSvg x={165} y={168} w={90} teks="4×4 luas ✕" ukuran={12} warna={MERAH} />
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={95} y={50} w={110} h={100} nyala={4} sisi={[4, 4, 4, 4]} jalan={Math.min(1, 0.3 + t / 8)} />
        <Muncul>
          <LabelSvg x={80} y={168} w={140} teks="path length" ukuran={13} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  /* V2: Baluwarti, Pagar, Bingkai */
  if (v === 1) {
    if (a === 0) {
      // Benteng
      const dinding = [
        [40, 60, 220, 60],
        [220, 60, 220, 150],
        [220, 150, 40, 150],
        [40, 150, 40, 60],
      ] as const;
      if (k === 0) {
        return (
          <>
            <rect x="50" y="70" width="200" height="70" fill="#FEF3C7" stroke={BIRU} strokeWidth="2" />
            <rect x="100" y="90" width="40" height="50" fill="#DBEAFE" stroke={BIRU} strokeWidth="2" />
            <rect x="160" y="95" width="50" height="45" fill="#DBEAFE" stroke={BIRU} strokeWidth="2" />
            <Muncul>
              <LabelSvg x={95} y={160} w={110} teks="Baluwarti" ukuran={13} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        const n = nyalaDariWaktu(t, 4, 1.6);
        return (
          <>
            <rect x="50" y="70" width="200" height="70" fill="#FEF3C7" stroke={BIRU} strokeWidth="1.5" opacity={0.5} />
            {dinding.map((d, i) =>
              n > i ? (
                <line key={i} x1={d[0]} y1={d[1]} x2={d[2]} y2={d[3]} stroke={n === i + 1 ? EMAS : BIRU} strokeWidth={n === i + 1 ? 6 : 4} strokeLinecap="round" />
              ) : null,
            )}
            <Muncul aktif={n >= 2}>
              <LabelSvg x={80} y={165} w={140} teks="panjang dinding" ukuran={12} warna={ORANYE} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <rect x="55" y="65" width="190" height="85" fill="#86EFAC" opacity={0.35} stroke="none" />
            {silang(150, 105, 24)}
            <BangunKeliling x={55} y={65} w={190} h={85} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
            <LabelSvg x={40} y={165} w={100} teks="batas luar ✓" ukuran={12} warna={HIJAU} />
            <LabelSvg x={160} y={165} w={100} teks="luas tanah ✕" ukuran={12} warna={MERAH} />
          </>
        );
      }
      return (
        <>
          <rect x="40" y="55" width="100" height="80" fill="#DBEAFE" stroke={BIRU} strokeWidth="2.5" />
          <rect x="140" y="75" width="110" height="60" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.5" />
          <Muncul>
            <LabelSvg x={80} y={160} w={140} teks="gabungan denah" ukuran={12} />
          </Muncul>
          <Sorot x={36} y={51} w={218} h={92} />
        </>
      );
    }

    if (a === 1) {
      // Pagar rumah
      if (k === 0) {
        return (
          <>
            <BangunKeliling x={70} y={55} w={160} h={90} nyala={0} outlineSaja label={false} tampilJumlah={false} sisi={[8, 5, 8, 5]} />
            {Array.from({ length: 8 }, (_, i) => (
              <line key={i} x1={70 + i * 20} y1={55} x2={70 + i * 20} y2={70} stroke={BIRU} strokeWidth="2.5" />
            ))}
            <Muncul>
              <LabelSvg x={90} y={165} w={120} teks="beli panjang" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        const n = nyalaDariWaktu(t, 4, 1.5);
        return <BangunKeliling x={70} y={55} w={160} h={90} nyala={n} sisi={[8, 5, 8, 5]} tampilJumlah={n >= 4} jalan={Math.min(0.95, t / 6.5)} />;
      }
      if (k === 2) {
        return (
          <>
            <BangunLuas x={90} y={55} kolom={5} baris={3} nyala={15} ukuran={22} />
            {silang(150, 95, 22)}
            <Muncul>
              <LabelSvg x={75} y={160} w={150} teks="p×l = rumput, bukan pagar" ukuran={11} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={70} y={50} w={160} h={90} nyala={4} sisi={[8, 5, 8, 5]} />
          <Muncul>
            <LabelSvg x={95} y={165} w={110} teks="fencing" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }

    // a === 2: Bingkai foto
    if (k === 0) {
      return (
        <>
          <rect x="70" y="50" width="160" height="110" fill="none" stroke={EMAS} strokeWidth="10" />
          <rect x="85" y="65" width="130" height="80" fill="#DBEAFE" stroke={BIRU} strokeWidth="2" />
          <text x="150" y="115" textAnchor="middle" fontSize="28">
            📷
          </text>
          <Muncul>
            <LabelSvg x={100} y={172} w={100} teks="bingkai" ukuran={12} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      const n = nyalaDariWaktu(t, 4, 1.5);
      return <BangunKeliling x={70} y={50} w={160} h={100} nyala={n} sisi={[12, 8, 12, 8]} tampilJumlah={n >= 4} />;
    }
    if (k === 2) {
      return (
        <>
          <rect x="70" y="50" width="160" height="100" fill="none" stroke={EMAS} strokeWidth="8" />
          <BangunLuas x={95} y={70} kolom={4} baris={3} nyala={12} ukuran={20} />
          <LabelSvg x={40} y={168} w={100} teks="kayu = K" ukuran={12} warna={ORANYE} />
          <LabelSvg x={160} y={168} w={100} teks="kertas = luas" ukuran={12} warna={HIJAU} />
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={40} y={60} w={90} h={70} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
        <BangunLuas x={170} y={65} kolom={3} baris={3} nyala={9} ukuran={18} />
        <Muncul>
          <LabelSvg x={70} y={160} w={160} teks="jalur luar atau isi?" ukuran={12} />
        </Muncul>
      </>
    );
  }

  /* V3: Cara hitung dari sisi */
  if (a === 0) {
    if (k === 0) {
      const n = nyalaDariWaktu(t, 4, 1.4);
      return <BangunKeliling x={80} y={50} w={140} h={80} nyala={n} sisi={[6, 4, 6, 4]} tampilJumlah={false} />;
    }
    if (k === 1) {
      return (
        <>
          <BangunKeliling x={80} y={50} w={140} h={80} nyala={4} sisi={[6, 4, 6, 4]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={155} w={160} teks="satuan sama: cm" ukuran={13} warna={ORANYE} />
          </Muncul>
          {t > 1.5 ? <Sorot x={76} y={46} w={148} h={88} /> : null}
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={80} y={45} w={140} h={80} nyala={4} sisi={[6, 4, 6, 4]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={85} y={150} w={130} teks="6+4+6+4 = 20" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={80} y={45} w={140} h={80} nyala={4} sisi={[6, 4, 6, 4]} />
        <Muncul>
          <LabelSvg x={55} y={160} w={190} teks="K > sisi terpanjang ✓" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  if (a === 1) {
    if (k === 0) {
      const n = nyalaDariWaktu(t, 4, 1.5);
      return <BangunKeliling x={70} y={50} w={160} h={80} nyala={n} sisi={[5, 3, 5, 3]} tampilJumlah={false} />;
    }
    if (k === 1) {
      return (
        <>
          <BangunKeliling x={70} y={45} w={160} h={75} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={55} y={145} w={190} teks="16 = 2(5+3)" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={80} y={50} w={140} h={80} nyala={4} sisi={[5, 3, 5, 3]} />
          <Muncul>
            <LabelSvg x={90} y={160} w={120} teks="path length" ukuran={12} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <BangunLuas x={100} y={50} kolom={5} baris={3} nyala={15} ukuran={20} />
        {silang(150, 85, 20)}
        <Muncul>
          <LabelSvg x={75} y={160} w={150} teks="5×3=15 luas ✕" ukuran={13} warna={MERAH} />
        </Muncul>
      </>
    );
  }

  // a === 2: tiga bekal
  if (k === 0) {
    return (
      <>
        <LabelSvg x={20} y={55} w={80} teks="1. jalur" ukuran={12} warna={ORANYE} />
        <LabelSvg x={110} y={55} w={80} teks="2. pagar" ukuran={12} warna={HIJAU} />
        <LabelSvg x={200} y={55} w={80} teks="3. ≠ luas" ukuran={12} warna={MERAH} />
        <BangunKeliling x={95} y={95} w={110} h={60} nyala={Math.min(4, nyalaDariWaktu(t, 4, 1.2))} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
      </>
    );
  }
  if (k === 1) {
    return (
      <>
        <BangunKeliling x={30} y={60} w={100} h={70} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
        <BangunLuas x={170} y={65} kolom={3} baris={3} nyala={9} ukuran={18} />
        <text x="150" y="100" textAnchor="middle" fontSize="22" fontWeight="900" fill={BIRU}>
          ?
        </text>
        <Muncul>
          <LabelSvg x={80} y={160} w={140} teks="keliling atau luas?" ukuran={12} />
        </Muncul>
      </>
    );
  }
  if (k === 2) {
    return (
      <BangunKeliling
        x={95}
        y={50}
        w={110}
        h={100}
        nyala={nyalaDariWaktu(t, 4, 1.5)}
        label={false}
        tampilJumlah={false}
        sisi={[1, 1, 1, 1]}
        outlineSaja
        jalan={Math.min(0.98, t / 7)}
      />
    );
  }
  return (
    <>
      <BangunKeliling x={30} y={55} w={100} h={80} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
      <BangunLuas x={170} y={60} kolom={4} baris={3} nyala={12} ukuran={18} />
      <LabelSvg x={35} y={160} w={90} teks="perimeter" ukuran={11} warna={ORANYE} />
      <LabelSvg x={180} y={160} w={70} teks="area" ukuran={11} warna={HIJAU} />
    </>
  );
}

function visualB(v: number, a: number, k: number, t: number): React.ReactNode {
  if (v === 0) {
    if (a === 0) {
      if (k === 0) {
        const n = nyalaDariWaktu(t, 3, 1.8);
        return <SegitigaKeliling nyala={n} sisi={[5, 4, 7]} tampilJumlah={false} />;
      }
      if (k === 1) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={70} y={175} w={160} teks="semua jenis sama" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={90} y={100} w={120} teks="a + b + c" ukuran={16} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      const n = nyalaDariWaktu(t, 3, 1.7);
      return <SegitigaKeliling nyala={n} sisi={[5, 4, 7]} tampilJumlah={n >= 3} />;
    }
    if (a === 1) {
      if (k === 0) return <SegitigaKeliling nyala={0} sisi={[5, 4, 7]} tampilJumlah={false} />;
      if (k === 1) {
        const n = nyalaDariWaktu(t, 3, 1.8);
        return <SegitigaKeliling nyala={n} sisi={[5, 4, 7]} tampilJumlah={false} />;
      }
      if (k === 2) {
        const tahap = Math.min(3, Math.floor(t / 2) + 1);
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={70} y={100} w={160} teks={tahap >= 3 ? "5+4+7 = 16" : tahap === 2 ? "5+4 = 9 …" : "5+4+7"} ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} />
          <Muncul>
            <LabelSvg x={40} y={175} w={100} teks="K=16 cm" ukuran={13} warna={HIJAU} />
            <text x="220" y={130} textAnchor="middle" fontSize="16" fontWeight="900" fill={MERAH}>
              5×4 ✕
            </text>
          </Muncul>
        </>
      );
    }
    // a === 2 ukur dulu
    if (k === 0) {
      return (
        <>
          <SegitigaKeliling nyala={0} sisi={[3, 4, 5]} tampilJumlah={false} />
          <Muncul>
            <rect x="40" y="170" width="220" height="24" rx="4" fill="#FEF3C7" stroke={BIRU} strokeWidth="2" />
            <text x="150" y="187" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
              📏 ukur dulu
            </text>
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      const n = nyalaDariWaktu(t, 3, 1.6);
      return <SegitigaKeliling nyala={n} sisi={[3, 4, 5]} tampilJumlah={false} />;
    }
    if (k === 2) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[3, 4, 5]} />
          <Muncul>
            <LabelSvg x={70} y={175} w={160} teks="ukur lalu jumlah" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <SegitigaKeliling nyala={3} sisi={[3, 4, 5]} />
        <Muncul>
          <LabelSvg x={90} y={100} w={120} teks="a+b+c" ukuran={14} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  if (v === 1) {
    // sama sisi
    if (a === 0) {
      if (k === 0) return <SegitigaKeliling nyala={3} sisi={[5, 5, 5]} tandaSama tampilJumlah={false} />;
      if (k === 1) {
        const n = nyalaDariWaktu(t, 3, 1.6);
        return <SegitigaKeliling nyala={n} sisi={[5, 5, 5]} tandaSama tampilJumlah={false} />;
      }
      if (k === 2) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 5, 5]} tandaSama tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={70} y={100} w={160} teks="5+5+5 = 3×5" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[5, 5, 5]} tandaSama />
          <Muncul>
            <LabelSvg x={100} y={100} w={100} teks="K=15" ukuran={16} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[6, 6, 6]} tandaSama tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={85} y={100} w={130} teks="3×6 = 18" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} tampilJumlah={false} />
            {silang(150, 110, 20)}
            <Muncul>
              <LabelSvg x={70} y={175} w={160} teks="sisi beda → jangan ×3" ukuran={11} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <SegitigaKeliling nyala={3} sisi={[5, 5, 3]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={55} y={100} w={190} teks="sama kaki: tetap a+b+c" ukuran={12} warna={ORANYE} />
            </Muncul>
          </>
        );
      }
      return <SegitigaKeliling nyala={3} sisi={[6, 6, 6]} tandaSama />;
    }
    // a === 2 mengapa boleh dikali
    if (k === 0) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[4, 4, 4]} tandaSama tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={100} w={160} teks="s+s+s = 3×s" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      const n = nyalaDariWaktu(t, 3, 1.6);
      return <SegitigaKeliling nyala={n} sisi={[4, 4, 4]} tandaSama tampilJumlah={n >= 3} />;
    }
    if (k === 2) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[4, 4, 4]} tandaSama />
          <Muncul>
            <LabelSvg x={60} y={175} w={180} teks="cek: K = 3 × sisi" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <SegitigaKeliling nyala={3} sisi={[4, 4, 4]} tandaSama />
        <Muncul>
          <LabelSvg x={70} y={100} w={160} teks="hanya sama sisi" ukuran={12} warna={ORANYE} />
        </Muncul>
      </>
    );
  }

  // v === 2 cek
  if (a === 0) {
    if (k === 0) return <SegitigaKeliling nyala={3} sisi={[6, 6, 4]} tampilJumlah={false} />;
    if (k === 1) {
      const n = nyalaDariWaktu(t, 3, 1.5);
      return <SegitigaKeliling nyala={n} sisi={[6, 6, 4]} tampilJumlah={n >= 3} />;
    }
    if (k === 2) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[6, 6, 4]} tampilJumlah={false} />
          {silang(150, 110, 18)}
          <Muncul>
            <LabelSvg x={70} y={175} w={160} teks="bukan otomatis ×3" ukuran={12} warna={MERAH} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <SegitigaKeliling nyala={3} sisi={[5, 5, 5]} tandaSama />
        <Muncul>
          <LabelSvg x={80} y={100} w={140} teks="×3 hanya sama sisi" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }
  if (a === 1) {
    if (k === 0) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} />
          <Muncul>
            <LabelSvg x={55} y={175} w={190} teks="K > sisi terpanjang" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          <SegitigaKeliling nyala={3} sisi={[5, 4, 7]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={90} y={100} w={120} teks="satuan: cm" ukuran={13} warna={ORANYE} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      const n = nyalaDariWaktu(t, 3, 1.5);
      return <SegitigaKeliling nyala={n} sisi={[5, 4, 7]} />;
    }
    return (
      <>
        <LabelSvg x={40} y={80} w={100} teks="a+b+c" ukuran={14} warna={HIJAU} />
        <LabelSvg x={160} y={80} w={100} teks="3×s" ukuran={14} warna={ORANYE} />
        <SegitigaKeliling nyala={3} sisi={[4, 4, 4]} tandaSama tampilJumlah={false} />
      </>
    );
  }
  // jembatan segi empat
  if (k === 0) {
    return (
      <>
        <SegitigaKeliling nyala={3} sisi={[3, 4, 5]} tampilJumlah={false} />
        <Muncul aktif={t > 1.2}>
          <BangunKeliling x={175} y={70} w={90} h={60} nyala={2} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
        </Muncul>
      </>
    );
  }
  if (k === 1) {
    return <BangunKeliling x={80} y={50} w={140} h={90} nyala={nyalaDariWaktu(t, 4, 1.5)} sisi={[5, 3, 5, 3]} outlineSaja label={false} tampilJumlah={false} />;
  }
  if (k === 2) {
    return (
      <>
        <LabelSvg x={20} y={60} w={80} teks="side sum" ukuran={11} />
        <LabelSvg x={110} y={60} w={80} teks="3×s" ukuran={11} />
        <LabelSvg x={200} y={60} w={80} teks="ukur" ukuran={11} />
        <SegitigaKeliling nyala={3} sisi={[4, 4, 4]} tandaSama tampilJumlah={false} />
      </>
    );
  }
  return (
    <>
      <SegitigaKeliling nyala={3} sisi={[3, 4, 5]} tampilJumlah={false} />
      <Muncul>
        <LabelSvg x={70} y={100} w={160} teks="ukur dulu → jumlah" ukuran={12} warna={HIJAU} />
      </Muncul>
    </>
  );
}

function visualC(v: number, a: number, k: number, t: number): React.ReactNode {
  if (v === 0) {
    if (a === 0) {
      if (k === 0) return <BangunKeliling x={70} y={50} w={160} h={80} nyala={0} outlineSaja sisi={[5, 3, 5, 3]} tampilJumlah={false} />;
      if (k === 1) {
        const n = nyalaDariWaktu(t, 4, 1.5);
        return <BangunKeliling x={70} y={50} w={160} h={80} nyala={n} sisi={[5, 3, 5, 3]} tampilJumlah={false} />;
      }
      if (k === 2) {
        return (
          <>
            <BangunKeliling x={70} y={45} w={160} h={75} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={80} y={145} w={140} teks="2p + 2l" ukuran={16} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={70} y={45} w={160} h={75} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={145} w={160} teks="2(p+l)" ukuran={16} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        const n = nyalaDariWaktu(t, 4, 1.5);
        return <BangunKeliling x={70} y={50} w={160} h={80} nyala={n} sisi={[5, 3, 5, 3]} tampilJumlah={false} />;
      }
      if (k === 1) {
        return (
          <>
            <BangunKeliling x={70} y={45} w={160} h={75} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={55} y={145} w={190} teks="2×(5+3)=16" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <BangunKeliling x={70} y={45} w={160} h={75} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={70} y={145} w={160} teks="5+3+5+3=16 ✓" ukuran={13} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={70} y={50} w={160} h={80} nyala={4} sisi={[5, 3, 5, 3]} />
          <Muncul>
            <LabelSvg x={80} y={160} w={140} teks="rumus = jalur" ukuran={12} />
          </Muncul>
        </>
      );
    }
    if (k === 0) {
      return (
        <>
          <BangunKeliling x={70} y={50} w={160} h={80} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={155} w={160} teks="2 pasang sisi" ukuran={12} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      const n = nyalaDariWaktu(t, 4, 1.4);
      return <BangunKeliling x={70} y={50} w={160} h={80} nyala={n} sisi={[5, 3, 5, 3]} />;
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={40} y={55} w={100} h={70} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
          <BangunLuas x={170} y={60} kolom={3} baris={3} nyala={9} ukuran={18} />
          <LabelSvg x={45} y={160} w={90} teks="jalur luar" ukuran={11} warna={ORANYE} />
          <LabelSvg x={175} y={160} w={80} teks="bukan isi" ukuran={11} warna={MERAH} />
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={70} y={50} w={160} h={80} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
        <Muncul>
          <LabelSvg x={80} y={155} w={140} teks="2(p+l)" ukuran={15} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  if (v === 1) {
    // persegi 4×s
    if (a === 0) {
      if (k === 0) return <BangunKeliling x={95} y={45} w={110} h={110} nyala={0} outlineSaja sisi={[3, 3, 3, 3]} tampilJumlah={false} />;
      if (k === 1) {
        const n = nyalaDariWaktu(t, 4, 1.4);
        return (
          <>
            <BangunKeliling x={95} y={45} w={110} h={110} nyala={n} sisi={[3, 3, 3, 3]} tampilJumlah={false} />
            <Muncul aktif={n >= 3}>
              <LabelSvg x={90} y={170} w={120} teks="4 × s" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <BangunKeliling x={95} y={45} w={110} h={100} nyala={4} sisi={[3, 3, 3, 3]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={85} y={160} w={130} teks="4×3 = 12" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={95} y={45} w={110} h={100} nyala={4} sisi={[5, 5, 5, 5]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={85} y={160} w={130} teks="4×5 = 20" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            <BangunKeliling x={70} y={55} w={160} h={80} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={80} y={155} w={140} teks="p = l → persegi" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            <BangunKeliling x={95} y={45} w={110} h={110} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={55} y={170} w={190} teks="2(s+s)=4s" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            <BangunKeliling x={40} y={55} w={100} h={100} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
            <BangunKeliling x={160} y={70} w={110} h={70} nyala={4} sisi={[5, 3, 5, 3]} tampilJumlah={false} />
            <LabelSvg x={50} y={170} w={80} teks="4s" ukuran={12} warna={HIJAU} />
            <LabelSvg x={165} y={170} w={100} teks="2(p+l)" ukuran={12} warna={ORANYE} />
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={95} y={50} w={110} h={100} nyala={4} sisi={[4, 4, 4, 4]} />
          <Muncul>
            <LabelSvg x={80} y={170} w={140} teks="hasil harus sama" ukuran={12} />
          </Muncul>
        </>
      );
    }
    // a === 2 bukan luas
    if (k === 0) {
      return (
        <>
          <BangunLuas x={100} y={50} kolom={4} baris={4} nyala={16} ukuran={20} />
          {silang(150, 95, 22)}
          <Muncul>
            <LabelSvg x={70} y={160} w={160} teks="s×s = luas ✕" ukuran={13} warna={MERAH} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          <BangunLuas x={90} y={55} kolom={5} baris={3} nyala={15} ukuran={20} />
          {silang(145, 90, 20)}
          <Muncul>
            <LabelSvg x={70} y={160} w={160} teks="p×l = luas ✕" ukuran={13} warna={MERAH} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return <BangunKeliling x={80} y={50} w={140} h={90} nyala={nyalaDariWaktu(t, 4, 1.5)} sisi={[5, 3, 5, 3]} outlineSaja label={false} tampilJumlah={false} jalan={Math.min(0.95, t / 6.5)} />;
    }
    return (
      <>
        <BangunKeliling x={95} y={45} w={110} h={110} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} />
        <Muncul>
          <LabelSvg x={85} y={170} w={130} teks="4×s persegi" ukuran={13} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  // v === 2 latihan
  if (a === 0) {
    if (k === 0) {
      return (
        <>
          <BangunKeliling x={70} y={50} w={160} h={70} nyala={4} sisi={[4, 2, 4, 2]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={145} w={160} teks="2(4+2)=12" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          <BangunKeliling x={70} y={50} w={160} h={70} nyala={4} sisi={[4, 2, 4, 2]} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={70} y={145} w={160} teks="4+2+4+2=12 ✓" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunLuas x={100} y={55} kolom={4} baris={2} nyala={8} ukuran={22} />
          {silang(150, 80, 18)}
          <Muncul>
            <LabelSvg x={75} y={150} w={150} teks="4×2=8 luas ✕" ukuran={13} warna={MERAH} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={70} y={50} w={160} h={80} nyala={4} sisi={[4, 2, 4, 2]} />
        <Muncul>
          <LabelSvg x={60} y={160} w={180} teks="tolak p×l untuk K" ukuran={12} warna={MERAH} />
        </Muncul>
      </>
    );
  }
  if (a === 1) {
    if (k === 0) {
      return (
        <>
          <BangunKeliling x={80} y={50} w={140} h={80} nyala={4} sisi={[6, 4, 6, 4]} outlineSaja label={false} tampilJumlah={false} />
          <Muncul>
            <LabelSvg x={90} y={155} w={120} teks="pagar → K" ukuran={13} warna={ORANYE} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          <BangunLuas x={100} y={50} kolom={5} baris={3} nyala={15} ukuran={20} />
          <Muncul>
            <LabelSvg x={85} y={155} w={130} teks="lantai → luas" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={30} y={55} w={100} h={70} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
          <BangunLuas x={170} y={60} kolom={3} baris={3} nyala={9} ukuran={18} />
          <text x="150" y="100" textAnchor="middle" fontSize="24" fontWeight="900" fill={BIRU}>
            ?
          </text>
        </>
      );
    }
    return (
      <>
        <BangunKeliling x={40} y={55} w={100} h={80} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
        <BangunLuas x={170} y={60} kolom={4} baris={3} nyala={0} ukuran={18} />
        {silang(210, 95, 16)}
        <Muncul>
          <LabelSvg x={70} y={160} w={160} teks="p×l bukan keliling" ukuran={12} warna={MERAH} />
        </Muncul>
      </>
    );
  }
  if (k === 0) {
    return (
      <>
        <BangunKeliling x={80} y={55} w={140} h={80} nyala={4} sisi={[5, 3, 5, 3]} />
        <Muncul>
          <LabelSvg x={90} y={160} w={120} teks="segi empat ✓" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }
  if (k === 1) {
    const pts = segiN(150, 100, 55, 5);
    const n = nyalaDariWaktu(t, 5, 1.2);
    return (
      <>
        <polygon points={pts} fill="#DBEAFE" stroke={BIRU} strokeWidth="2" opacity={0.45} />
        {n >= 1 ? <LabelSvg x={90} y={165} w={120} teks="segi banyak…" ukuran={12} /> : null}
      </>
    );
  }
  if (k === 2) {
    return (
      <BangunKeliling x={80} y={50} w={140} h={90} nyala={nyalaDariWaktu(t, 4, 1.4)} sisi={[5, 3, 5, 3]} outlineSaja label={false} tampilJumlah={false} jalan={Math.min(0.95, t / 6)} />
    );
  }
  return (
    <>
      <LabelSvg x={30} y={70} w={110} teks="2(p+l)" ukuran={14} warna={HIJAU} />
      <LabelSvg x={160} y={70} w={110} teks="4×s" ukuran={14} warna={ORANYE} />
      <BangunKeliling x={95} y={110} w={110} h={55} nyala={4} sisi={[4, 4, 4, 4]} tampilJumlah={false} label={false} />
    </>
  );
}

function visualD(v: number, a: number, k: number, t: number): React.ReactNode {
  const segi = (n: number, sisiLabel: number, nyala: number) => {
    const pts = segiN(150, 95, 58, n);
    const verts = pts.split(" ").map((p) => {
      const [x, y] = p.split(",").map(Number);
      return { x, y };
    });
    return (
      <g>
        <polygon points={pts} fill="#DBEAFE" stroke={BIRU} strokeWidth="2" opacity={0.4} />
        {verts.map((p, i) => {
          if (nyala <= i) return null;
          const q = verts[(i + 1) % n];
          return (
            <g key={i}>
              <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={nyala === i + 1 ? EMAS : BIRU} strokeWidth={nyala === i + 1 ? 5 : 3.5} strokeLinecap="round" />
              <text x={(p.x + q.x) / 2} y={(p.y + q.y) / 2 - 6} textAnchor="middle" fontSize="12" fontWeight="900" fill={MERAH}>
                {sisiLabel}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  if (v === 0) {
    if (a === 0) {
      if (k === 0) return segi(5, 3, 0);
      if (k === 1) return segi(5, 3, nyalaDariWaktu(t, 5, 1.3));
      if (k === 2) {
        return (
          <>
            {segi(5, 3, 5)}
            <Muncul>
              <LabelSvg x={85} y={165} w={130} teks="5×3 = 15" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={80} y={165} w={140} teks="n×s ringkas" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            <LabelSvg x={40} y={50} w={100} teks="n × s" ukuran={14} />
            <LabelSvg x={160} y={50} w={100} teks="tabel" ukuran={14} />
            {segi(5, 2, Math.min(5, nyalaDariWaktu(t, 5, 1.2)))}
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            {t < 2.5 ? segi(5, 3, 5) : segi(6, 3, nyalaDariWaktu(t - 2.5, 6, 1.0))}
            <Muncul>
              <LabelSvg x={70} y={165} w={160} teks={t < 2.5 ? "5 × sisi" : "6 × sisi"} ukuran={13} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {segi(5, 4, 5)}
            <Muncul>
              <LabelSvg x={80} y={165} w={140} teks="K = n × s" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={90} y={165} w={120} teks="segi-n" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 0) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="n=?  s=?" ukuran={14} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={85} y={165} w={130} teks="15 cm" ukuran={14} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={55} y={165} w={190} teks="K = 5 × sisi" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    return segi(6, 4, nyalaDariWaktu(t, 6, 1.1));
  }

  if (v === 1) {
    if (a === 0) {
      if (k === 0) return segi(6, 4, 0);
      if (k === 1) {
        return (
          <>
            {segi(6, 4, 6)}
            <Muncul>
              <LabelSvg x={75} y={165} w={150} teks="6×4 = 24" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {segi(8, 2, nyalaDariWaktu(t, 8, 0.9))}
            <Muncul aktif={t > 3}>
              <LabelSvg x={75} y={165} w={150} teks="8×2 = 16" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return segi(6, 4, 6);
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            {segi(5, 3, 5)}
            <text x="200" y="80" fontSize="14" fontWeight="900" fill={MERAH}>
              sisi beda
            </text>
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            {segi(5, 3, 5)}
            {silang(150, 95, 22)}
            <Muncul>
              <LabelSvg x={70} y={165} w={160} teks="jangan paksa n×s" ukuran={12} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        const n = nyalaDariWaktu(t, 5, 1.3);
        return (
          <>
            {segi(5, 3, n)}
            <Muncul aktif={n >= 4}>
              <LabelSvg x={70} y={165} w={160} teks="jumlah satu-satu" ukuran={12} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={80} y={165} w={140} teks="aman & tepat" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 0) {
      return (
        <>
          <text x="150" y="90" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
            semua sisi sama?
          </text>
          <Muncul>
            <LabelSvg x={90} y={120} w={120} teks="ya / tidak" ukuran={14} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          <LabelSvg x={30} y={60} w={110} teks="ya → n×s" ukuran={13} warna={HIJAU} />
          <LabelSvg x={160} y={60} w={110} teks="tidak → jumlah" ukuran={12} warna={ORANYE} />
          {segi(5, 3, 5)}
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={60} y={165} w={180} teks="cek dulu sebelum kali" ukuran={12} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        <rect x="40" y="55" width="100" height="80" fill="#DBEAFE" stroke={BIRU} strokeWidth="2.5" />
        <rect x="140" y="75" width="110" height="60" fill="#FEF3C7" stroke={BIRU} strokeWidth="2.5" />
        <Muncul>
          <LabelSvg x={80} y={160} w={140} teks="→ gabungan" ukuran={12} />
        </Muncul>
      </>
    );
  }

  // v === 2 pola
  if (a === 0) {
    if (k === 0) {
      return (
        <>
          <LabelSvg x={15} y={50} w={85} teks="3: a+b+c" ukuran={11} />
          <LabelSvg x={108} y={50} w={85} teks="4: 2(p+l)" ukuran={11} />
          <LabelSvg x={200} y={50} w={85} teks="5: 5s" ukuran={11} />
          {segi(5, 2, Math.min(5, 1 + Math.floor(t)))}
        </>
      );
    }
    if (k === 1) {
      return (
        <BangunKeliling x={80} y={50} w={140} h={90} nyala={nyalaDariWaktu(t, 4, 1.4)} sisi={[5, 3, 5, 3]} outlineSaja label={false} tampilJumlah={false} jalan={Math.min(0.95, t / 6)} />
      );
    }
    if (k === 2) {
      return (
        <>
          {segi(6, 3, 6)}
          <Muncul>
            <LabelSvg x={80} y={165} w={140} teks="sisi sama → kali" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        {segi(5, 3, 5)}
        <Muncul>
          <LabelSvg x={85} y={165} w={130} teks="K = n×s" ukuran={14} warna={HIJAU} />
        </Muncul>
      </>
    );
  }
  if (a === 1) {
    if (k === 0) {
      return (
        <>
          {t < 3 ? (
            <>
              {segi(5, 2, 5)}
              <LabelSvg x={85} y={165} w={130} teks="5×2=10" ukuran={13} warna={HIJAU} />
            </>
          ) : (
            <>
              {segi(6, 3, 6)}
              <LabelSvg x={75} y={165} w={150} teks="6×3=18" ukuran={13} warna={HIJAU} />
            </>
          )}
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={60} y={165} w={180} teks="banyak × panjang" ukuran={12} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          {segi(5, 3, 5)}
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="cek tanda sisi sama" ukuran={12} warna={ORANYE} />
          </Muncul>
        </>
      );
    }
    return segi(5, 3, 5);
  }
  // a === 2 jembatan gabungan
  if (k === 0) {
    return (
      <>
        <rect x="40" y="55" width="100" height="90" fill="#DBEAFE" stroke={BIRU} strokeWidth="2.5" />
        <rect x="140" y="85" width="110" height={60} fill="#FEF3C7" stroke={BIRU} strokeWidth="2.5" />
        <line x1="140" y1="85" x2="140" y2="145" stroke={MERAH} strokeWidth="3" strokeDasharray="6 4" />
        <Muncul>
          <LabelSvg x={70} y={165} w={160} teks="ada sekat dalam" ukuran={12} />
        </Muncul>
      </>
    );
  }
  if (k === 1) {
    return (
      <>
        <rect x="40" y="55" width="100" height="90" fill="#DBEAFE" stroke="none" />
        <rect x="140" y="85" width="110" height={60} fill="#FEF3C7" stroke="none" />
        <polyline points="40,55 140,55 140,85 250,85 250,145 40,145 40,55" fill="none" stroke={EMAS} strokeWidth="5" strokeLinejoin="round" />
        <Muncul>
          <LabelSvg x={70} y={165} w={160} teks="hanya batas luar" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }
  if (k === 2) {
    const n = nyalaDariWaktu(t, 4, 1.5);
    return (
      <>
        <polyline
          points="40,55 140,55 140,85 250,85 250,145 40,145 40,55"
          fill="none"
          stroke={BIRU}
          strokeWidth="3"
          strokeDasharray={n < 4 ? "6 4" : undefined}
        />
        <Muncul aktif={n >= 2}>
          <LabelSvg x={70} y={165} w={160} teks="path length luar" ukuran={12} warna={ORANYE} />
        </Muncul>
      </>
    );
  }
  return (
    <>
      <rect x="40" y="55" width="100" height="90" fill="#DBEAFE" stroke={BIRU} strokeWidth="2" />
      <rect x="140" y="85" width="110" height={60} fill="#FEF3C7" stroke={BIRU} strokeWidth="2" />
      <Muncul>
        <LabelSvg x={90} y={165} w={120} teks="Sub-Bab E →" ukuran={13} warna={HIJAU} />
      </Muncul>
    </>
  );
}

function visualE(v: number, a: number, k: number, t: number): React.ReactNode {
  const denah = (
    <>
      <rect x="40" y="50" width="110" height="100" fill="#DBEAFE" stroke={BIRU} strokeWidth="2" />
      <rect x="150" y="80" width="110" height="70" fill="#FEF3C7" stroke={BIRU} strokeWidth="2" />
    </>
  );
  const luar = "40,50 150,50 150,80 260,80 260,150 40,150 40,50";
  const sekat = { x1: 150, y1: 80, x2: 150, y2: 150 };

  if (v === 0) {
    if (a === 0) {
      if (k === 0) {
        return (
          <>
            {denah}
            <Muncul>
              <LabelSvg x={80} y={165} w={140} teks="denah rumah" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        const n = nyalaDariWaktu(t, 6, 1.2);
        return (
          <>
            {denah}
            <polyline points={luar} fill="none" stroke={n >= 1 ? EMAS : BIRU} strokeWidth="5" strokeLinejoin="round" opacity={Math.min(1, n / 3)} />
            <Muncul aktif={n >= 2}>
              <LabelSvg x={70} y={165} w={160} teks="pagar dinding luar" ukuran={12} warna={ORANYE} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {denah}
            <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="4" strokeDasharray="6 4" />
            {silang(150, 115, 14)}
            <Muncul>
              <LabelSvg x={60} y={165} w={180} teks="sekat dalam ≠ pagar" ukuran={12} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" strokeLinejoin="round" />
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="hanya batas luar" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            {denah}
            <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="3" strokeDasharray="5 4" />
            <Muncul>
              <LabelSvg x={60} y={165} w={180} teks="sekat bagi luas saja" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            {denah}
            <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="4" />
            {silang(150, 100, 18)}
            <Muncul>
              <LabelSvg x={50} y={165} w={200} teks="jangan jumlah sekat" ukuran={12} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {denah}
            <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" strokeLinejoin="round" className="vc-denyut" />
            <Muncul>
              <LabelSvg x={70} y={165} w={160} teks="tandai sisi luar" ukuran={12} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={HIJAU} strokeWidth="5" strokeLinejoin="round" />
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="abaikan sekat" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 0) {
      const n = nyalaDariWaktu(t, 6, 1.1);
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth={3 + Math.min(3, n)} strokeLinejoin="round" />
          <Muncul aktif={n >= 2}>
            <LabelSvg x={60} y={165} w={180} teks="ukur sisi luar satu-satu" ukuran={11} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" strokeLinejoin="round" />
          <Muncul>
            <LabelSvg x={80} y={165} w={140} teks="path length" ukuran={13} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" strokeLinejoin="round" />
          <Sorot x={36} y={46} w={228} h={108} />
          <Muncul>
            <LabelSvg x={60} y={165} w={180} teks="jangan lewat sudut" ukuran={12} warna={ORANYE} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        {denah}
        <Muncul>
          <LabelSvg x={80} y={165} w={140} teks="cara bungkus →" ukuran={12} />
        </Muncul>
      </>
    );
  }

  if (v === 1) {
    if (a === 0) {
      if (k === 0) {
        return (
          <>
            {denah}
            <rect x="40" y="50" width="220" height="100" fill="none" stroke={ORANYE} strokeWidth="3" strokeDasharray="8 5" />
            <Muncul>
              <LabelSvg x={70} y={165} w={160} teks="bungkus besar" ukuran={12} />
            </Muncul>
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            <BangunKeliling x={40} y={50} w={220} h={100} nyala={4} sisi={[12, 6, 12, 6]} tampilJumlah={false} />
            <Muncul>
              <LabelSvg x={55} y={170} w={190} teks="2(12+6)=36" ukuran={14} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {denah}
            <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
            <Muncul>
              <LabelSvg x={60} y={165} w={180} teks="cocokkan dengan luar" ukuran={12} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          <BangunKeliling x={40} y={50} w={220} h={100} nyala={4} sisi={[12, 6, 12, 6]} />
          <Muncul>
            <LabelSvg x={80} y={170} w={140} teks="bungkus = K" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (a === 1) {
      if (k === 0) {
        return (
          <>
            {denah}
            <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="4" />
            <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="3" strokeDasharray="5 4" />
          </>
        );
      }
      if (k === 1) {
        return (
          <>
            {denah}
            <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="4" />
            {silang(150, 115, 14)}
            <Muncul>
              <LabelSvg x={70} y={165} w={160} teks="buang sekat" ukuran={12} warna={MERAH} />
            </Muncul>
          </>
        );
      }
      if (k === 2) {
        return (
          <>
            {denah}
            <polyline points={luar} fill="none" stroke={HIJAU} strokeWidth="5" />
            <Muncul>
              <LabelSvg x={80} y={165} w={140} teks="jumlah luar saja" ukuran={12} warna={HIJAU} />
            </Muncul>
          </>
        );
      }
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
          <Muncul>
            <LabelSvg x={90} y={165} w={120} teks="cek ulang" ukuran={12} />
          </Muncul>
        </>
      );
    }
    if (k === 0) {
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="batas terluar" ukuran={12} warna={HIJAU} />
          </Muncul>
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          {denah}
          <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="3" strokeDasharray="5 4" />
          {silang(150, 115, 12)}
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={40} y={55} w={100} h={80} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
          <BangunLuas x={170} y={60} kolom={3} baris={3} nyala={Math.min(9, Math.floor(t * 2) + 1)} ukuran={18} />
          <LabelSvg x={45} y={160} w={90} teks="keliling" ukuran={11} warna={ORANYE} />
          <LabelSvg x={180} y={160} w={70} teks="luas" ukuran={11} warna={HIJAU} />
        </>
      );
    }
    return (
      <>
        {denah}
        <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
        <Muncul>
          <LabelSvg x={70} y={165} w={160} teks="path length luar" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }

  // v === 2 ringkas
  if (a === 0) {
    if (k === 0) {
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
        </>
      );
    }
    if (k === 1) {
      return (
        <>
          {denah}
          <line x1={sekat.x1} y1={sekat.y1} x2={sekat.x2} y2={sekat.y2} stroke={MERAH} strokeWidth="4" strokeDasharray="5 4" />
          {silang(150, 115, 14)}
        </>
      );
    }
    if (k === 2) {
      return (
        <>
          <BangunKeliling x={40} y={55} w={220} h={90} nyala={nyalaDariWaktu(t, 4, 1.4)} sisi={[12, 6, 12, 6]} tampilJumlah={false} />
        </>
      );
    }
    return (
      <>
        {denah}
        <polyline points={luar} fill="none" stroke={HIJAU} strokeWidth="5" />
        <Muncul>
          <LabelSvg x={80} y={165} w={140} teks="cek masuk akal" ukuran={12} />
        </Muncul>
      </>
    );
  }
  if (a === 1) {
    if (k === 0) {
      return (
        <>
          <LabelSvg x={20} y={55} w={80} teks="segitiga" ukuran={11} />
          <LabelSvg x={110} y={55} w={80} teks="segi 4" ukuran={11} />
          <LabelSvg x={200} y={55} w={80} teks="segi-n" ukuran={11} />
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="4" transform="translate(0,20) scale(1)" />
          {denah}
        </>
      );
    }
    if (k === 1) {
      return (
        <BangunKeliling x={80} y={50} w={140} h={90} nyala={nyalaDariWaktu(t, 4, 1.4)} sisi={[5, 3, 5, 3]} outlineSaja label={false} tampilJumlah={false} jalan={Math.min(0.95, t / 6)} />
      );
    }
    if (k === 2) {
      return (
        <>
          {denah}
          <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
          <Muncul>
            <LabelSvg x={70} y={165} w={160} teks="pagar / bingkai" ukuran={12} warna={ORANYE} />
          </Muncul>
        </>
      );
    }
    return (
      <>
        {denah}
        <polyline points={luar} fill="none" stroke={HIJAU} strokeWidth="5" />
        <Muncul>
          <LabelSvg x={60} y={165} w={180} teks="Bab 4 keliling siap" ukuran={12} warna={HIJAU} />
        </Muncul>
      </>
    );
  }
  if (k === 0) {
    return (
      <>
        {denah}
        <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
      </>
    );
  }
  if (k === 1) {
    return (
      <>
        <BangunLuas x={100} y={55} kolom={5} baris={3} nyala={Math.min(15, Math.floor(t * 2.5) + 1)} ukuran={20} />
        <Muncul aktif={t > 2}>
          <LabelSvg x={85} y={160} w={130} teks="Bab 5: luas →" ukuran={12} />
        </Muncul>
      </>
    );
  }
  if (k === 2) {
    return (
      <>
        <BangunKeliling x={30} y={55} w={100} h={80} nyala={4} label={false} tampilJumlah={false} sisi={[1, 1, 1, 1]} outlineSaja />
        <BangunLuas x={170} y={60} kolom={3} baris={3} nyala={9} ukuran={18} />
        <LabelSvg x={40} y={160} w={80} teks="keliling" ukuran={11} warna={ORANYE} />
        <LabelSvg x={180} y={160} w={70} teks="luas" ukuran={11} warna={HIJAU} />
      </>
    );
  }
  return (
    <>
      {denah}
      <polyline points={luar} fill="none" stroke={EMAS} strokeWidth="5" />
      <Muncul>
        <LabelSvg x={70} y={165} w={160} teks="Path Length ✓" ukuran={13} warna={HIJAU} />
      </Muncul>
    </>
  );
}

export function visualK5B4(sub: string, v: number, a: number, k: number, t = 0): React.ReactNode {
  if (sub === "a") return visualA(v, a, k, t);
  if (sub === "b") return visualB(v, a, k, t);
  if (sub === "c") return visualC(v, a, k, t);
  if (sub === "d") return visualD(v, a, k, t);
  return visualE(v, a, k, t);
}
