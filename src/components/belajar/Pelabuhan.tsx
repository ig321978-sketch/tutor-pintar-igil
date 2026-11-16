"use client";

import { useCallback, useMemo, useState } from "react";
import { pilihBantuan, tawarkanTantangan, type Bantuan } from "@/lib/belajar/bantuan";
import { kataBilangan } from "@/lib/belajar/kata";
import { CEK } from "@/lib/belajar/skema";
import Link from "next/link";
import { catatCek } from "@/lib/belajar/simpan";
import { useSimpanan } from "./pakai-simpanan";
import type { Bentuk, Soal } from "@/lib/belajar/tipe";
import { periksa } from "@/lib/belajar/umum";
import { KONFIGURASI, type KonfigPelabuhan } from "./konfig";

/* Satu pelabuhan Pasar Terapung (Kelas 1 Bab 2). Isi pelabuhan ada di konfig.ts. Draf, perlu review. */

type Fase = "cerita" | "jelajah" | "contoh" | "setengah" | "mandiri" | "cek" | "hasil";
const URUT: Fase[] = ["cerita", "jelajah", "contoh", "setengah", "mandiri", "cek", "hasil"];
const NAMA: Record<Fase, string> = { cerita: "Cerita", jelajah: "Jelajah", contoh: "Contoh", setengah: "Coba sedikit", mandiri: "Mandiri", cek: "Cek materi", hasil: "Hasil" };

export const ROYAL = "#3b2a8c";
export const EMAS = "#f5b50a";
type K = { k: KonfigPelabuhan };

export function bicara(teks: string) {
  try {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(teks);
    u.lang = "id-ID";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch {
    /* suara perangkat tidak tersedia: abaikan */
  }
}

export function Tombol({ children, onClick, aktif = true, utama = false, label }: { children: React.ReactNode; onClick: () => void; aktif?: boolean; utama?: boolean; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={!aktif}
      onClick={onClick}
      className="min-h-12 min-w-12 rounded-2xl px-5 py-2 text-lg font-bold shadow disabled:opacity-40"
      style={utama ? { background: EMAS, color: "#2a1f66" } : { background: "#fff", color: ROYAL, border: `2px solid ${ROYAL}` }}
    >
      {children}
    </button>
  );
}

/** Satu kelompok: benda (apel), diagram (titik polos), atau lambang (angka). */
function Kelompok({ n, bentuk, warna, sorot = false, ketuk, ikon = "🍎" }: { n: number; bentuk: Bentuk; warna: string; sorot?: boolean; ketuk?: (i: number) => void; ikon?: string }) {
  if (n === 0) return null;
  if (bentuk === "lambang")
    return (
      <span className="text-5xl font-extrabold" style={{ color: warna }}>
        {n}
      </span>
    );
  return (
    <span className={`inline-flex max-w-[11rem] flex-wrap justify-center gap-1 rounded-2xl border-4 p-2 ${sorot ? "igil-denyut" : ""}`} style={{ borderColor: warna }}>
      {Array.from({ length: n }, (_, i) =>
        bentuk === "benda" ? (
          <button key={i} type="button" aria-label={`benda ${i + 1}`} onClick={() => ketuk?.(i)} className="min-h-12 min-w-12 text-3xl">
            {ikon}
          </button>
        ) : (
          <button key={i} type="button" aria-label={`titik ${i + 1}`} onClick={() => ketuk?.(i)} className="min-h-12 min-w-12">
            <span className="mx-auto block h-7 w-7 rounded-full" style={{ background: warna }} />
          </button>
        ),
      )}
    </span>
  );
}

export function Bingkai({ children, judul }: { children: React.ReactNode; judul: string }) {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl p-4 text-white sm:p-6" style={{ background: ROYAL }}>
      <h2 className="mb-3 text-2xl font-extrabold" style={{ color: EMAS }}>
        {judul}
      </h2>
      <div className="rounded-2xl bg-white p-4 text-[#2a1f66]">{children}</div>
    </section>
  );
}

export function PilihanJawab({ soal, mati, onPilih, sorotKunci }: { soal: Soal; mati: string[]; onPilih: (id: string) => void; sorotKunci?: boolean }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {soal.pilihan.map((p) => (
        <button
          key={p.id}
          type="button"
          disabled={mati.includes(p.id)}
          onClick={() => onPilih(p.id)}
          className={`min-h-14 rounded-2xl border-4 px-1 font-extrabold disabled:opacity-30 ${p.label ? "text-lg" : "text-3xl"} ${sorotKunci && p.miskonsepsi === null ? "igil-denyut" : ""}`}
          style={{ borderColor: ROYAL, color: ROYAL }}
          aria-label={`pilih ${p.label ?? kataBilangan(p.nilai)}`}
        >
          {p.label ?? p.nilai}
        </button>
      ))}
    </div>
  );
}

/** Garis bilangan 0 sampai 10: penanda di angka awal, busur lompatan sebanyak `lompat`. Tempat mendarat tidak ditandai. */
function GarisBilangan({ awal, lompat, bentuk, ikon = "🐸", sorot }: { awal: number; lompat: number; bentuk: Bentuk; ikon?: string; sorot?: boolean }) {
  const x = (i: number) => 22 + i * 40;
  const akhir = Math.min(10, awal + lompat);
  return (
    <svg viewBox="0 0 450 100" role="img" aria-label={`Garis bilangan, mulai dari ${kataBilangan(Math.min(awal, 10))}, lompat ${kataBilangan(lompat)}`} className={`mx-auto w-full max-w-md ${sorot ? "igil-denyut" : ""}`}>
      <line x1="10" y1="66" x2="440" y2="66" stroke={ROYAL} strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => (
        <g key={i}>
          <line x1={x(i)} y1="58" x2={x(i)} y2="74" stroke={ROYAL} strokeWidth="3" />
          <text x={x(i)} y="94" textAnchor="middle" fontSize="16" fontWeight="700" fill={ROYAL}>
            {i}
          </text>
        </g>
      ))}
      {Array.from({ length: Math.max(0, akhir - awal) }, (_, j) => {
        const x1 = x(awal + j);
        const x2 = x(awal + j + 1);
        return <path key={j} d={`M ${x1} 58 Q ${(x1 + x2) / 2} 14 ${x2} 58`} fill="none" stroke={EMAS} strokeWidth="4" strokeLinecap="round" />;
      })}
      {bentuk === "benda" ? (
        <text x={x(Math.min(awal, 10))} y="44" textAnchor="middle" fontSize="26">
          {ikon}
        </text>
      ) : (
        <circle cx={x(Math.min(awal, 10))} cy="40" r="9" fill="#c0392b" />
      )}
    </svg>
  );
}

/** Bingkai sepuluh: dua baris lima. `isi` kotak terisi, `tambah` kotak berikutnya yang disorot. */
function BingkaiSepuluh({ isi, tambah = 0, bentuk, ikon = "🍎", sorot }: { isi: number; tambah?: number; bentuk: Bentuk; ikon?: string; sorot?: boolean }) {
  return (
    <div className={`mx-auto grid w-fit grid-cols-5 gap-1 rounded-2xl border-4 p-2 ${sorot ? "igil-denyut" : ""}`} style={{ borderColor: ROYAL }} role="img" aria-label={`Bingkai sepuluh berisi ${kataBilangan(Math.min(isi, 10))}`}>
      {Array.from({ length: 10 }, (_, i) => {
        const terisi = i < isi;
        const baru = !terisi && i < isi + tambah;
        return (
          <span key={i} className="flex h-12 w-12 items-center justify-center rounded-lg border-2 text-3xl" style={{ borderColor: baru ? EMAS : "#b9afe6", background: baru ? "#fff6d6" : "#fff" }}>
            {terisi || baru ? (bentuk === "benda" ? ikon : <span className="block h-7 w-7 rounded-full" style={{ background: terisi ? "#c0392b" : EMAS }} />) : null}
          </span>
        );
      })}
    </div>
  );
}

/** Bagan seluruhnya dan sebagian: `a` terisi merah, sisanya kosong (itu yang dicari). */
function Bagan({ seluruhnya, sebagian, bentuk, ikon = "🍎", sorot }: { seluruhnya: number; sebagian: number; bentuk: Bentuk; ikon?: string; sorot?: boolean }) {
  return (
    <div className="mx-auto max-w-sm text-center">
      <p className="font-bold">Seluruhnya: {seluruhnya}</p>
      <div className={`my-2 flex flex-wrap justify-center gap-1 rounded-2xl border-4 p-2 ${sorot ? "igil-denyut" : ""}`} style={{ borderColor: ROYAL }}>
        {Array.from({ length: seluruhnya }, (_, i) => (
          <span key={i} className="flex h-12 w-12 items-center justify-center rounded-lg border-2 text-3xl" style={{ borderColor: i < sebagian ? "#c0392b" : "#b9afe6", borderStyle: i < sebagian ? "solid" : "dashed" }}>
            {i < sebagian ? bentuk === "benda" ? ikon : <span className="block h-7 w-7 rounded-full" style={{ background: "#c0392b" }} /> : null}
          </span>
        ))}
      </div>
      <p className="font-bold">
        Sebagian: {sebagian} <span aria-hidden>·</span> Sebagian lainnya: ?
      </p>
    </div>
  );
}

export function Gambar({ soal, penghubung, sorot, ketuk }: { soal: Soal; penghubung: string; sorot?: boolean; ketuk?: (k: "a" | "b", i: number) => void }) {
  const teks = soal.tampil === "teks" || (soal.bentuk === "lambang" && !!soal.kalimat);
  const kalimat = soal.kalimat ? (
    <p className="py-2 text-center text-4xl font-extrabold" style={{ color: ROYAL }}>
      {soal.kalimat}
    </p>
  ) : null;
  const tanya = soal.tanya ? (
    <p className="py-2 text-center text-4xl font-extrabold" style={{ color: "#c0392b" }}>
      {soal.tanya}
    </p>
  ) : null;
  if (teks)
    return (
      <div>
        {kalimat}
        {tanya}
      </div>
    );
  let isi: React.ReactNode;
  if (soal.tampil === "garis") isi = <GarisBilangan awal={soal.a} lompat={soal.b} bentuk={soal.bentuk} ikon={soal.ikon} sorot={sorot} />;
  else if (soal.tampil === "bingkai") isi = <BingkaiSepuluh isi={soal.a} bentuk={soal.bentuk} ikon={soal.ikon} sorot={sorot} />;
  else if (soal.tampil === "bagan") isi = <Bagan seluruhnya={soal.a + soal.b} sebagian={soal.a} bentuk={soal.bentuk} ikon={soal.ikon} sorot={sorot} />;
  else {
    const na = soal.jumlahA ?? soal.a;
    const nb = soal.jumlahB ?? soal.b;
    isi = (
      <div className="flex flex-wrap items-center justify-center gap-4 py-2">
        <Kelompok n={na} bentuk={soal.bentuk} warna="#c0392b" sorot={sorot} ketuk={(i) => ketuk?.("a", i)} ikon={soal.ikon} />
        {na > 0 && nb > 0 && (
          <span className="text-xl font-bold" aria-hidden>
            {penghubung}
          </span>
        )}
        <Kelompok n={nb} bentuk={soal.bentuk} warna={ROYAL} sorot={sorot} ketuk={(i) => ketuk?.("b", i)} ikon={soal.ikon2 ?? soal.ikon} />
      </div>
    );
  }
  return (
    <div>
      {kalimat}
      {isi}
      {tanya}
    </div>
  );
}

/* ------------------------------ Fase-fase ------------------------------ */

function Cerita({ k, selesai }: K & { selesai: () => void }) {
  const c = k.cerita;
  const total = c.ketuk?.n ?? c.a + c.b;
  const [panel, setPanel] = useState(0);
  const [tebak, setTebak] = useState<number | string | null>(null);
  const [terhitung, setTerhitung] = useState(0);
  const maju = (p: number) => {
    setPanel(p);
    bicara(c.panel[p]);
  };
  return (
    <Bingkai judul={c.judul}>
      <p className="text-xl font-bold">{c.panel[panel]}</p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 py-2">
        {panel < 3 && <Kelompok n={c.a} bentuk="benda" warna="#c0392b" ikon={c.ikon} />}
        {panel >= 1 && panel < 3 && !c.rahasiaB && <Kelompok n={c.b} bentuk="benda" warna={ROYAL} ikon={c.ikon2 ?? c.ikon} />}
        {panel >= 1 && panel < 3 && c.rahasiaB && (
          <span className="flex h-16 w-24 items-center justify-center rounded-2xl border-4 border-dashed text-4xl font-extrabold" style={{ borderColor: ROYAL, color: ROYAL }} aria-label="jumlah yang dicari">
            ?
          </span>
        )}
        {panel === 3 && (
          <span className="inline-flex max-w-xs flex-wrap justify-center gap-1 rounded-2xl border-4 p-2" style={{ borderColor: EMAS }}>
            {Array.from({ length: total }, (_, i) => (
              <button key={i} type="button" aria-label={`benda ${i + 1}`} onClick={() => setTerhitung((t) => (t === i ? i + 1 : t))} className="min-h-12 min-w-12 text-3xl" style={{ opacity: i < terhitung ? 1 : 0.5 }}>
                {c.ketuk ? c.ketuk.ikon : i < c.a ? (c.ikon ?? "🍎") : (c.ikon2 ?? c.ikon ?? "🍎")}
              </button>
            ))}
          </span>
        )}
      </div>
      {panel === 2 && (
        <div>
          <p className="mt-2 text-sm">Tebak dulu. Tidak ada yang salah di sini.</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {c.tebak.map((n) => (
              <button key={n} type="button" onClick={() => setTebak(n)} className="min-h-12 rounded-xl border-4 text-2xl font-bold" style={{ borderColor: tebak === n ? EMAS : ROYAL, color: ROYAL }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
      {panel === 3 && (
        <p className="mt-2 text-lg">
          Dihitung: <b>{terhitung}</b>
          {terhitung === total ? `. ${kataBilangan(total)} semuanya!` : ""}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <Tombol onClick={() => bicara(c.panel[panel])} label="dengar lagi">
          🔊 Dengar
        </Tombol>
        {panel < 2 && (
          <Tombol utama onClick={() => maju(panel + 1)}>
            Lanjut
          </Tombol>
        )}
        {panel === 2 && (
          <Tombol utama aktif={tebak !== null} onClick={() => maju(3)}>
            Buktikan
          </Tombol>
        )}
        {panel === 3 && (
          <Tombol utama aktif={terhitung === total} onClick={selesai}>
            Ke latihan
          </Tombol>
        )}
        <Tombol onClick={selesai}>Lewati</Tombol>
      </div>
    </Bingkai>
  );
}

function Jelajah({ k, selesai }: K & { selesai: () => void }) {
  const j = k.jelajah;
  const [a, setA] = useState(j.awalA);
  const [b, setB] = useState(j.awalB);
  const [wa, wb] = j.bobot ?? [1, 1];
  const total = wa * a + wb * b;
  const misi = total === j.misiTotal && (!j.kembar || a === b) && (!j.beda || a !== b);
  const atur = (set: (f: (n: number) => number) => void, d: number) => set((n) => Math.max(0, Math.min(8, n + d)));
  const sisi = [
    { n: a, set: setA, warna: "#c0392b", nama: j.namaA, ikon: j.ikonA },
    { n: b, set: setB, warna: ROYAL, nama: j.namaB, ikon: j.ikonB ?? j.ikonA },
  ];
  const kalimat = j.bobot ? `${a} sepeda, ${b} becak: ${total} roda` : j.kalimat ? `${a} + ${b} = ${total}` : `Semuanya: ${total}`;
  return (
    <Bingkai judul="Jelajah">
      <p className="font-bold">{j.misi ?? `Misi: buat ${j.kata} apel semuanya.`}</p>
      {j.tampil === "garis" && <GarisBilangan awal={Math.min(a, 10)} lompat={b} bentuk="benda" />}
      {j.tampil === "bingkai" && <BingkaiSepuluh isi={Math.min(a, 10)} tambah={b} bentuk="benda" />}
      <div className="mt-3 grid grid-cols-2 gap-4 text-center">
        {sisi.map(({ n, set, warna, nama, ikon }) => (
          <div key={nama}>
            <p className="font-bold">{nama}</p>
            <div className="min-h-24">{!j.tampil && <Kelompok n={n} bentuk="benda" warna={warna} ikon={ikon} />}{j.tampil && <span className="text-4xl font-extrabold" style={{ color: warna }}>{n}</span>}</div>
            <div className="mt-2 flex justify-center gap-2">
              <Tombol label={`kurangi ${nama}`} onClick={() => atur(set, -1)}>
                −
              </Tombol>
              <Tombol label={`tambah ${nama}`} onClick={() => atur(set, 1)}>
                +
              </Tombol>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-2xl font-extrabold">{kalimat}</p>
      {j.tukar && (
        <p className="text-center text-2xl font-extrabold" style={{ color: "#c0392b" }}>
          {`${b} + ${a} = ${total}`}
        </p>
      )}
      {misi && <p className="text-center font-bold">Misi selesai. Coba cara lain juga!</p>}
      <div className="mt-4 flex gap-3">
        <Tombol utama aktif={misi} onClick={selesai}>
          Lanjut
        </Tombol>
        <Tombol onClick={selesai}>Lewati misi</Tombol>
      </div>
    </Bingkai>
  );
}

function Contoh({ k, selesai, ulang = false }: K & { selesai: () => void; ulang?: boolean }) {
  const langkah = k.langkahContoh(k.contoh.a, k.contoh.b);
  const [i, setI] = useState(0);
  return (
    <Bingkai judul={ulang ? "Lihat contoh lagi" : "Contoh dari Igil"}>
      <Gambar soal={k.contoh} penghubung={k.penghubung} sorot={i === 2} />
      {k.contohKalimat && i >= 2 && (
        <p className="text-center text-4xl font-extrabold" style={{ color: ROYAL }}>
          {k.contoh.a} + {k.contoh.b}
          {i >= 3 ? ` = ${k.contoh.a + k.contoh.b}` : " = ?"}
        </p>
      )}
      <ol className="mt-2 space-y-1 text-lg">
        {langkah.slice(0, i + 1).map((t, n) => (
          <li key={n}>
            {n + 1}. {t}
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-3">
        <Tombol onClick={() => bicara(langkah[i])} label="dengar">
          🔊 Dengar
        </Tombol>
        {i < langkah.length - 1 ? (
          <Tombol
            utama
            onClick={() => {
              setI(i + 1);
              bicara(langkah[i + 1]);
            }}
          >
            Langkah berikutnya
          </Tombol>
        ) : (
          <Tombol utama onClick={selesai}>
            {ulang ? "Coba lagi" : "Aku coba"}
          </Tombol>
        )}
      </div>
    </Bingkai>
  );
}

/** Satu soal latihan (mode belajar): tanpa skor; bantuan menyesuaikan salah beruntun. */
function SoalLatihan({ k, soal, awal, selesai }: K & { soal: Soal; awal?: string; selesai: (tanpaBantuan: boolean) => void }) {
  const [mati, setMati] = useState<string[]>([]);
  const [salah, setSalah] = useState(0);
  const [pesan, setPesan] = useState(awal ?? "");
  const [benar, setBenar] = useState(false);
  const [contoh, setContoh] = useState(false);
  const [hitung, setHitung] = useState<string[]>([]);
  const bantuan: Bantuan = pilihBantuan(salah, soal.bentuk);
  const tampil: Soal = bantuan === "kembali-ke-benda" ? { ...soal, bentuk: "benda", tampil: k.tampilBenda ?? "kelompok" } : soal;
  const pilih = (id: string) => {
    const h = periksa(soal, id);
    if (h.benar) {
      setBenar(true);
      setPesan(salah > 0 ? "Kamu mencoba lagi dan berhasil!" : "Tepat sekali!");
      bicara(`Hasilnya ${kataBilangan(soal.kunci)}.`);
    } else {
      setMati((m) => [...m, id]);
      setSalah((s) => s + 1);
      setPesan(h.miskonsepsi ? k.miskonsepsi[h.miskonsepsi].pesan : "Coba lagi pelan-pelan.");
    }
  };
  if (contoh) return <Contoh k={k} ulang selesai={() => setContoh(false)} />;
  const habis = mati.length >= soal.pilihan.length - 1;
  return (
    <Bingkai judul={soal.bentuk === "benda" ? "Benda" : soal.bentuk === "diagram" ? "Diagram titik" : "Lambang"}>
      <p className="text-xl font-bold">{soal.suara}</p>
      <Gambar soal={tampil} penghubung={k.penghubung} sorot={bantuan === "petunjuk"} ketuk={(kel, i) => setHitung((h) => (h.includes(`${kel}${i}`) ? h : [...h, `${kel}${i}`]))} />
      {bantuan === "petunjuk" && (
        <p className="text-center text-sm">
          {k.petunjuk}
          {k.hitungKetuk === false ? "" : ` Dihitung: ${hitung.length}`}
        </p>
      )}
      {bantuan === "kembali-ke-benda" && <p className="text-center text-sm">Kita lihat bendanya dulu.</p>}
      <div className="mt-2 flex justify-center">
        <Tombol onClick={() => bicara(soal.suara)} label="dengar soal">
          🔊 Dengar
        </Tombol>
      </div>
      <PilihanJawab soal={soal} mati={mati} onPilih={benar ? () => {} : pilih} sorotKunci={habis && !benar} />
      {pesan && (
        <p role="status" className="mt-3 text-center text-lg font-bold">
          {pesan}
        </p>
      )}
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        {bantuan === "contoh-ulang" && !benar && <Tombol onClick={() => setContoh(true)}>Lihat contoh lagi</Tombol>}
        {(benar || habis) && (
          <Tombol utama onClick={() => selesai(salah === 0)}>
            Lanjut
          </Tombol>
        )}
      </div>
    </Bingkai>
  );
}

function Mandiri({ k, selesai }: K & { selesai: () => void }) {
  const [benih] = useState(() => Math.floor(Math.random() * 1000));
  const soalan = useMemo(() => (["benda", "diagram", "lambang"] as Bentuk[]).map((b, i) => k.buatSoal(b, 4000 + i * 37 + benih)), [k, benih]);
  const [n, setN] = useState(0);
  const [beruntun, setBeruntun] = useState(0);
  const [tantangan, setTantangan] = useState(false);
  if (n >= soalan.length)
    return (
      <Bingkai judul="Latihan selesai">
        <p className="text-lg font-bold">Kamu sudah berlatih tiga cara. Saatnya cek materi.</p>
        {tantangan && <p className="mt-2">Kamu lancar sekali. Siap untuk soal lebih menantang!</p>}
        <div className="mt-4">
          <Tombol utama onClick={selesai}>
            Ke cek materi
          </Tombol>
        </div>
      </Bingkai>
    );
  return (
    <SoalLatihan
      k={k}
      key={n}
      soal={soalan[n]}
      selesai={(tb) => {
        const bb = tb ? beruntun + 1 : 0;
        setBeruntun(bb);
        if (tawarkanTantangan(bb)) setTantangan(true);
        setN(n + 1);
      }}
    />
  );
}

function Cek({ k, selesai }: K & { selesai: (benar: number, kode: string[]) => void }) {
  const [benih] = useState(() => Math.floor(Math.random() * 1_000_000) + 1);
  const soalan = useMemo(() => k.buatCek(benih), [k, benih]);
  const [n, setN] = useState(0);
  const [jawab, setJawab] = useState<string[]>([]);
  const [pilihan, setPilihan] = useState<string | null>(null);
  const soal = soalan[n];
  const lanjut = () => {
    const hasil = [...jawab, pilihan as string];
    if (n + 1 < soalan.length) {
      setJawab(hasil);
      setPilihan(null);
      setN(n + 1);
      return;
    }
    const benar = hasil.filter((id, i) => periksa(soalan[i], id).benar).length;
    const kode = hasil.map((id, i) => periksa(soalan[i], id).miskonsepsi).filter((m): m is string => Boolean(m));
    const uniq = [...new Set(kode)];
    catatCek(window.localStorage, k.skillId, benar, uniq);
    selesai(benar, uniq);
  };
  return (
    <Bingkai judul={`Cek materi ${n + 1} dari ${soalan.length}`}>
      <p className="text-sm">Soal ini tanpa petunjuk. Kerjakan pelan-pelan.</p>
      <p className="mt-2 text-xl font-bold">{soal.suara}</p>
      <Gambar soal={soal} penghubung={k.penghubung} />
      <div className="mt-2 flex justify-center">
        <Tombol onClick={() => bicara(soal.suara)} label="dengar soal">
          🔊 Dengar
        </Tombol>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {soal.pilihan.map((p) => (
          <button key={p.id} type="button" onClick={() => setPilihan(p.id)} aria-label={`pilih ${p.label ?? kataBilangan(p.nilai)}`} className={`min-h-14 rounded-2xl border-4 px-1 font-extrabold ${p.label ? "text-lg" : "text-3xl"}`} style={{ borderColor: pilihan === p.id ? EMAS : ROYAL, background: pilihan === p.id ? "#fff6d6" : "#fff", color: ROYAL }}>
            {p.label ?? p.nilai}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Tombol utama aktif={pilihan !== null} onClick={lanjut}>
          {n + 1 < soalan.length ? "Lanjut" : "Selesai"}
        </Tombol>
      </div>
    </Bingkai>
  );
}

function Hasil({ k, benar, kode, ulang }: K & { benar: number; kode: string[]; ulang: () => void }) {
  const lulus = benar >= CEK.minimalBenar;
  const [pilih, setPilih] = useState<string | null>(null);
  const [isi, setIsi] = useState<Record<string, string>>({});
  const lengkap = k.peta.simpul.every(([id, , kunci]) => isi[id] === kunci);
  return (
    <Bingkai judul={lulus ? `Materi ${k.nomor} selesai!` : "Hampir sampai!"}>
      <p className="text-xl font-bold">{lulus ? `Kamu menguasainya: ${benar} dari ${CEK.jumlahSoal} tepat.` : `Baru ${benar} dari ${CEK.jumlahSoal} tepat. Latihan lagi, lalu cek ulang.`}</p>
      {kode.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-sm">
          {kode.map((m) => (
            <li key={m}>{k.miskonsepsi[m]?.pesan}</li>
          ))}
        </ul>
      )}
      <div className="mt-4 rounded-2xl border-4 p-3" style={{ borderColor: EMAS }}>
        <h3 className="font-extrabold">Kartu ringkas</h3>
        <p>{k.kartu.konsep}</p>
        <p>{k.kartu.contoh}</p>
        <p>
          <b>Kesalahan umum:</b> {k.kartu.kesalahan}
        </p>
        <p>
          <b>Coba ingat:</b> {k.kartu.ingat}
        </p>
      </div>
      <div className="mt-4">
        <h3 className="font-extrabold">Lengkapi peta dari ingatanmu</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {k.peta.label.map((l) => (
            <button key={l} type="button" onClick={() => setPilih(l)} className="min-h-12 rounded-xl border-4 px-3 font-bold" style={{ borderColor: pilih === l ? EMAS : ROYAL, color: ROYAL }}>
              {l}
            </button>
          ))}
        </div>
        <ul className="mt-2 space-y-2">
          {k.peta.simpul.map(([id, tanya, kunci]) => (
            <li key={id}>
              <button
                type="button"
                disabled={!pilih}
                onClick={() => {
                  if (pilih) setIsi((s) => ({ ...s, [id]: pilih }));
                }}
                className="min-h-12 w-full rounded-xl border-4 border-dashed px-3 text-left"
                style={{ borderColor: isi[id] === kunci ? "#1f8a4c" : ROYAL }}
              >
                {tanya} <b>{isi[id] ?? "…"}</b>
              </button>
            </li>
          ))}
        </ul>
        {lengkap && <p className="mt-2 font-bold">Petamu lengkap!</p>}
      </div>
      <div className="mt-4">
        <Tombol utama onClick={ulang}>
          {lulus ? "Main lagi" : "Latihan lagi"}
        </Tombol>
      </div>
    </Bingkai>
  );
}

/** Pintu masuk untuk halaman server: hanya menerima id (teks), karena konfigurasi berisi fungsi dan tidak boleh dikirim dari server. */
export default function Pelabuhan({ id }: { id: keyof typeof KONFIGURASI }) {
  return <IsiPelabuhan k={KONFIGURASI[id]} />;
}

function IsiPelabuhan({ k }: K) {
  const [fase, setFase] = useState<Fase>("cerita");
  const [kunciUlang, setKunciUlang] = useState(0);
  const [hasil, setHasil] = useState<{ benar: number; kode: string[] } | null>(null);
  const tersimpan = useSimpanan([k.skillId])[k.skillId];
  const ke = useCallback((f: Fase) => setFase(f), []);
  const idx = URUT.indexOf(fase);
  return (
    <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}>
      <header className="mx-auto mb-3 max-w-2xl">
        <Link href="/ruang-belajar/mtk-1-bab2-baru" className="text-sm font-bold underline" style={{ color: ROYAL }}>
          ← Daftar materi Bab 2
        </Link>
        <p className="text-sm font-bold" style={{ color: ROYAL }}>
          {k.sub} · {k.judulPendek} · draf perlu review
        </p>
        <ol className="mt-2 flex gap-1" aria-label="Langkah materi">
          {URUT.map((f, i) => (
            <li key={f} aria-current={f === fase ? "step" : undefined} title={NAMA[f]} className="h-2 flex-1 rounded-full" style={{ background: i <= idx ? EMAS : "#cfc6f5" }} />
          ))}
        </ol>
        {tersimpan.status.kotak > 0 && fase === "cerita" && <p className="mt-1 text-xs">Kamu sudah lulus {tersimpan.status.kotak} kali. Ulangan berikutnya terjadwal.</p>}
      </header>
      {fase === "cerita" && <Cerita k={k} selesai={() => ke("jelajah")} />}
      {fase === "jelajah" && <Jelajah k={k} selesai={() => ke("contoh")} />}
      {fase === "contoh" && <Contoh k={k} selesai={() => ke("setengah")} />}
      {fase === "setengah" && <SoalLatihan k={k} soal={k.setengah} awal="Igil sudah menaruh dua kelompok. Kamu hitung semuanya." selesai={() => ke("mandiri")} />}
      {fase === "mandiri" && <Mandiri k={k} key={kunciUlang} selesai={() => ke("cek")} />}
      {fase === "cek" && (
        <Cek
          k={k}
          key={kunciUlang}
          selesai={(benar, kode) => {
            setHasil({ benar, kode });
            ke("hasil");
          }}
        />
      )}
      {fase === "hasil" && hasil && (
        <Hasil
          k={k}
          benar={hasil.benar}
          kode={hasil.kode}
          ulang={() => {
            setKunciUlang((n) => n + 1);
            ke(hasil.benar >= CEK.minimalBenar ? "cerita" : "mandiri");
          }}
        />
      )}
    </main>
  );
}
