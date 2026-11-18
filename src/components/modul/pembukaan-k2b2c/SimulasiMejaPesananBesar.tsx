"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  BENDA,
  NAMA_LANGKAH,
  URUT_KATA,
  awalDari,
  awalPembukaan,
  balikAwal,
  bukaSlip,
  ceritaSah,
  hasilCerita,
  isiLangkah,
  jumlahTiga,
  kalimatCerita,
  kalimatPembukaan,
  ketukLangkah,
  mulaiLagiPembukaan,
  pasangTanda,
  pilihModePembukaan,
  pilihTiga,
  solusiCerita,
  susunBuat,
  tandaKata,
  tanyaCerita,
  ubahBuat,
  ulangLangkah,
  type KataPetunjuk,
  type KeadaanPembukaan,
  type ModePembukaan,
  type Tanda,
} from "./logika";
import { AWAL_SIM, MISI_PESANAN, SLIP_SIM, TIGA_SIM } from "./data";

/**
 * Simulasi Kelas 2 Bab 2 Sub-Bab C: Meja Pesanan Besar (Misi Meja Pesanan bagian satu). Kertas pesanan, tiga bilangan, dan bilangan awal berbeda dari Story.
 * Eksplorasi bebas tanpa skor, lima alat untuk satu meja: Kata (pasangkan kata petunjuk dengan tanda tambah atau kurang), Langkah (susun diketahui, ditanya, solusi,
 * kesimpulan), Tiga (jumlahkan tiga bilangan, dua bilangan dulu), Awal (balik langkah untuk mencari bilangan awal), dan Buat (susun cerita hitungan sendiri).
 */
const D = SLIP_SIM;
const MODE: { id: ModePembukaan; nama: string; ikon: string }[] = [
  { id: "kata", nama: "Kata", ikon: "\u{1F50E}" },
  { id: "langkah", nama: "Langkah", ikon: "\u{1F4DD}" },
  { id: "tiga", nama: "Tiga", ikon: "\u{1F9EE}" },
  { id: "awal", nama: "Awal", ikon: "\u{23EA}" },
  { id: "buat", nama: "Buat", ikon: "\u{270F}\u{FE0F}" },
];
const MINUS = "−";
const TAMPIL_LANGKAH = [2, 0, 3, 1];
const TANDA: { t: Tanda; teks: string }[] = [
  { t: "tambah", teks: "+ tambah" },
  { t: "kurang", teks: `${MINUS} kurang` },
];

/** Baris emoji benda sebanyak n (paling banyak dua puluh). */
function Deret({ benda, n, redup = 0 }: { benda: number; n: number; redup?: number }) {
  return (
    <span className="flex flex-wrap justify-center gap-0.5" aria-label={`${n} ${BENDA[benda].nama}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} aria-hidden="true" className="text-base leading-none" style={{ opacity: i >= n - redup ? 0.3 : 1 }}>
          {BENDA[benda].emoji}
        </span>
      ))}
    </span>
  );
}

export default function SimulasiMejaPesananBesar({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPembukaan) => void }) {
  const [k, setK] = useState<KeadaanPembukaan>(() => awalPembukaan());
  const [goyang, setGoyang] = useState("");
  const [hasil, setHasil] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPembukaan, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;
  const kal = (baru: KeadaanPembukaan) => kalimatPembukaan(baru, D, TIGA_SIM, AWAL_SIM);

  const slip = D[k.slip];

  const pilihSlip = (i: number) => {
    setHasil("");
    ubah(bukaSlip(k, i, D), undefined);
    const s = D[i];
    speakGuru(`Kertas pesanan baru. Kata petunjuknya ${s.kata}. Pilih tanda hitung yang cocok.`);
  };
  const tandai = (t: Tanda) => {
    const r = pasangTanda(k, t, D);
    if (r.ok) {
      setHasil(solusiCerita(slip));
      ubah(r.k, `Betul. Kata ${slip.kata} berarti ${tandaKata(slip.kata) === "tambah" ? "ditambah" : "dikurangi"}.`);
    } else {
      ubah(r.k);
      salah(`t${t}`, slip.kata === "kurangnya" || slip.kata === "selisih" ? "Tandanya belum cocok. Kurangnya dan selisih berarti dikurangi." : "Tandanya belum cocok. Lebihnya dan jumlah berarti ditambah.");
    }
  };
  const ketukKartu = (n: number) => {
    const r = ketukLangkah(k, n);
    if (r.ok) ubah(r.k, kal(r.k));
    else if (!k.urut.includes(n)) {
      ubah(r.k);
      salah(`l${n}`, `Belum giliran ${NAMA_LANGKAH[n].toLowerCase()}. Ketuk dulu ${NAMA_LANGKAH[k.urut.length].toLowerCase()}.`);
    }
  };
  const jumlahkan = () => {
    const baru = jumlahTiga(k, TIGA_SIM);
    ubah(baru, kal(baru));
  };
  const balik = (t: Tanda) => {
    const r = balikAwal(k, t, AWAL_SIM);
    if (r.ok) ubah(r.k, kal(r.k));
    else {
      ubah(r.k);
      salah(`a${t}`, AWAL_SIM.arah === "ambil" ? "Yang tadi diambil kita kembalikan, jadi ditambah." : "Yang tadi ditambah kita kurangi untuk kembali.");
    }
  };
  const susun = () => {
    const r = susunBuat(k);
    if (r.ok) {
      setHasil(solusiCerita(k.buat));
      ubah(r.k, `Ceritamu sah. Jawabannya ${hasilCerita(k.buat)}.`);
    } else salah("susun", "Ceritamu belum sah. Hasilnya harus satu sampai dua puluh.");
  };

  const tiga = TIGA_SIM;
  const jumlah2 = k.tiga.length === 2 ? tiga.isi[k.tiga[0]] + tiga.isi[k.tiga[1]] : null;
  const sisaTiga = k.tiga.length === 2 ? tiga.isi.findIndex((_, i) => !k.tiga.includes(i)) : -1;
  const b = k.buat;
  const sah = ceritaSah(b);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_PESANAN}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja pesanan">
        {MODE.map((m) => (
          <button
            key={m.id}
            type="button"
            aria-pressed={k.mode === m.id}
            className={saklar(k.mode === m.id)}
            onClick={() => {
              setHasil("");
              ubah(pilihModePembukaan(k, m.id), kal(pilihModePembukaan(k, m.id)));
            }}
          >
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] p-2" style={{ backgroundColor: "#E9C58F", backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.16) 0 2px,transparent 2px 30px)" }}>
        {k.mode === "kata" || k.mode === "langkah" ? (
          <div className="mb-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih kertas pesanan">
            {D.map((s, i) => (
              <button key={i} type="button" aria-pressed={k.slip === i} onClick={() => pilihSlip(i)} className={`${tombol} ${k.slip === i ? "!border-[#15803D] !bg-[#DCFCE7]" : ""}`}>
                {BENDA[s.benda].emoji} Kertas {i + 1}
              </button>
            ))}
          </div>
        ) : null}

        {k.mode === "kata" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-md rounded-lg border-2 border-[#1D4ED8] bg-white p-2 text-center" style={{ backgroundImage: "repeating-linear-gradient(0deg,rgba(59,130,246,0.14) 0 1px,transparent 1px 22px)" }}>
              {kalimatCerita(slip).map((t) => (
                <p key={t} className="text-sm font-black text-[#1C01A5]">
                  {t}
                </p>
              ))}
              <p className="text-sm font-black text-[#DC2626]">{tanyaCerita(slip)}</p>
              <div className="mt-1 space-y-1">
                <Deret benda={slip.benda} n={slip.a} />
                <Deret benda={slip.benda} n={slip.b} />
              </div>
              <p className="mt-1 rounded bg-[#FEF9C3] px-2 text-xs font-black text-[#92400E]">
                Kata petunjuk:{" "}
                {URUT_KATA.map((w: KataPetunjuk) => (
                  <span key={w} className={w === slip.kata ? "rounded bg-[#FDE047] px-1 text-[#7F1D1D]" : "opacity-40"}>
                    {w}{" "}
                  </span>
                ))}
              </p>
            </div>
            <p className="text-center text-xs font-black text-[#7F1D1D]">Pilih tanda hitung yang cocok dengan kata petunjuk:</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tanda hitung">
              {TANDA.map((x) => (
                <button key={x.t} type="button" onClick={() => tandai(x.t)} className={`${tombol} ${goyang === `t${x.t}` ? "lm-goyang" : ""}`}>
                  {x.teks}
                </button>
              ))}
            </div>
            {hasil && k.kataBenar.includes(slip.kata) ? <p className="text-center text-lg font-black text-[#15803D]">{hasil}</p> : null}
            <p className="text-center text-xs font-black text-[#7F1D1D]">Kata petunjuk yang sudah dipasangkan: {k.kataBenar.length} dari 4</p>
          </div>
        ) : null}

        {k.mode === "langkah" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-md rounded-lg border-2 border-[#1D4ED8] bg-white p-2 text-center">
              {kalimatCerita(slip).map((t) => (
                <p key={t} className="text-sm font-black text-[#1C01A5]">
                  {t}
                </p>
              ))}
              <p className="text-sm font-black text-[#DC2626]">{tanyaCerita(slip)}</p>
            </div>
            <p className="text-center text-xs font-black text-[#7F1D1D]">Ketuk empat langkah berurutan:</p>
            <div className="mx-auto grid max-w-md grid-cols-2 gap-2" role="group" aria-label="Empat langkah cerita">
              {TAMPIL_LANGKAH.map((n) => {
                const nomor = k.urut.indexOf(n);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => ketukKartu(n)}
                    aria-pressed={nomor >= 0}
                    className={`min-h-[56px] rounded-xl border-4 px-2 py-1 text-left text-xs font-black leading-tight text-[#1C01A5] ${nomor >= 0 ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#B45309] bg-white"} ${goyang === `l${n}` ? "lm-goyang" : ""}`}
                  >
                    <span className="block text-[11px] uppercase text-[#B45309]">
                      {nomor >= 0 ? `${nomor + 1}. ` : ""}
                      {NAMA_LANGKAH[n]}
                    </span>
                    {nomor >= 0 ? <span className="block">{isiLangkah(slip)[n]}</span> : <span className="block text-[#1C01A5]/40">?</span>}
                  </button>
                );
              })}
            </div>
            {k.urut.length === 4 ? <p className="text-center text-lg font-black text-[#15803D]">{solusiCerita(slip)}</p> : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} disabled={k.urut.length === 0} onClick={() => ubah(ulangLangkah(k), "Susunan diulang. Ketuk diketahui lebih dulu.")}>
                {"\u{21A9}\u{FE0F}"} Ulangi susunan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tiga" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#7F1D1D]">Ketuk dua bilangan untuk dijumlahkan lebih dulu</p>
            <div className="mx-auto grid max-w-md grid-cols-3 gap-2" role="group" aria-label="Tiga bilangan">
              {tiga.isi.map((n, i) => {
                const pilih = k.tiga.includes(i);
                return (
                  <button key={i} type="button" aria-pressed={pilih} onClick={() => ubah(pilihTiga(k, i), kal(pilihTiga(k, i)))} className={`rounded-xl border-4 bg-white p-1 text-center text-xs font-black text-[#1C01A5] ${pilih ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#92400E]"}`}>
                    <Deret benda={tiga.benda} n={n} />
                    <span className="block text-lg">{n}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} disabled={k.tiga.length !== 2} onClick={jumlahkan}>
                {"\u{1F9EE}"} Jumlahkan
              </button>
            </div>
            {k.tiga.length === 2 && k.tigaTuntas > 0 && jumlah2 !== null ? (
              <p className="text-center text-lg font-black text-[#15803D]">
                {tiga.isi[k.tiga[0]]} + {tiga.isi[k.tiga[1]]} = {jumlah2}, lalu {jumlah2} + {tiga.isi[sisaTiga]} = {jumlah2 + tiga.isi[sisaTiga]}
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "awal" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-md rounded-lg border-2 border-[#1D4ED8] bg-white p-2 text-center">
              <p className="text-sm font-black text-[#1C01A5]">
                {BENDA[AWAL_SIM.benda].nama} {AWAL_SIM.arah === "ambil" ? `tinggal ${AWAL_SIM.akhir}` : `jadi ${AWAL_SIM.akhir}`} setelah {AWAL_SIM.b} {AWAL_SIM.arah === "ambil" ? "diambil" : "ditambah"}.
              </p>
              <p className="text-sm font-black text-[#DC2626]">Berapa banyak mula-mula?</p>
              <div className="mt-1">
                <Deret benda={AWAL_SIM.benda} n={AWAL_SIM.akhir} />
              </div>
            </div>
            <p className="text-center text-xs font-black text-[#7F1D1D]">Balik langkahnya: pilih tanda hitung</p>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tanda untuk membalik langkah">
              {TANDA.map((x) => (
                <button key={x.t} type="button" onClick={() => balik(x.t)} className={`${tombol} ${goyang === `a${x.t}` ? "lm-goyang" : ""}`}>
                  {x.teks}
                </button>
              ))}
            </div>
            {k.awalTanda ? (
              <p className="text-center text-lg font-black text-[#15803D]">
                {AWAL_SIM.akhir} {k.awalTanda === "tambah" ? "+" : MINUS} {AWAL_SIM.b} = {awalDari(AWAL_SIM)}
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "buat" ? (
          <div className="space-y-2">
            <div className="mx-auto max-w-md space-y-1.5 rounded-lg border-2 border-[#1D4ED8] bg-white p-2">
              <p className="text-center text-xs font-black text-[#7F1D1D]">Pilih benda, kata petunjuk, dan bilangan:</p>
              <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih benda">
                {BENDA.slice(0, 6).map((x, i) => (
                  <button key={x.nama} type="button" aria-pressed={b.benda === i} onClick={() => ubah(ubahBuat(k, { benda: i }))} className={`${tombol} ${b.benda === i ? "!border-[#15803D] !bg-[#DCFCE7]" : ""}`}>
                    {x.emoji} {x.nama}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih kata petunjuk">
                {URUT_KATA.map((w) => (
                  <button key={w} type="button" aria-pressed={b.kata === w} onClick={() => ubah(ubahBuat(k, { kata: w }))} className={`${tombol} ${b.kata === w ? "!border-[#15803D] !bg-[#DCFCE7]" : ""}`}>
                    {w}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black text-[#1C01A5]">
                {(["a", "b"] as const).map((f) => (
                  <span key={f} className="flex items-center gap-1">
                    <button type="button" className={tombol} aria-label={`Kurangi bilangan ${f === "a" ? "pertama" : "kedua"}`} onClick={() => ubah(ubahBuat(k, { [f]: Math.max(1, b[f] - 1) }))}>
                      {MINUS}
                    </button>
                    <span className="min-w-[2rem] text-center text-lg">{b[f]}</span>
                    <button type="button" className={tombol} aria-label={`Tambah bilangan ${f === "a" ? "pertama" : "kedua"}`} onClick={() => ubah(ubahBuat(k, { [f]: Math.min(20, b[f] + 1) }))}>
                      +
                    </button>
                  </span>
                ))}
              </div>
              <div className="rounded bg-[#FEF9C3] p-1.5 text-center">
                {kalimatCerita(b).map((t) => (
                  <p key={t} className="text-sm font-black text-[#1C01A5]">
                    {t}
                  </p>
                ))}
                <p className="text-sm font-black text-[#DC2626]">{tanyaCerita(b)}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={`${tombol} ${goyang === "susun" ? "lm-goyang" : ""}`} onClick={susun}>
                {"\u{270F}\u{FE0F}"} Susun ceritaku
              </button>
            </div>
            {k.buatTuntas > 0 && sah && hasil ? <p className="text-center text-lg font-black text-[#15803D]">{hasil}</p> : null}
            {!sah ? <p className="text-center text-xs font-black text-[#B91C1C]">Ceritamu belum sah: hasilnya harus satu sampai dua puluh.</p> : null}
            <p className="text-center text-xs font-black text-[#7F1D1D]">Cerita yang sudah disusun: {k.buatTuntas}</p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasil("");
            ubah(mulaiLagiPembukaan(), "Meja pesanan dirapikan. Main lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kal(k)}
      </p>
    </div>
  );
}
