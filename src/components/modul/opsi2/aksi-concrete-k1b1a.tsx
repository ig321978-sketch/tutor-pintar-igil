"use client";

import React, { useEffect, useState } from "react";
import { eja } from "@/components/modul/story/kit/dasar";
import { Benda, GAMBAR_BENDA, IsiPetak, KetukBanyak, Letak, PapanBenda, PilihKata, SeretKeWadah, TombolPeriksa, type ItemSeret } from "./primitif";
import { daftarkanKomponen } from "./registri-komponen";
import type { PropsAksi } from "./tipe-aksi";

/**
 * Komponen tindakan Concrete Kelas 1 Bab 1 Sub-Bab A. Satu komponen per id tindakan di
 * src/lib/opsi2/tindakan-concrete-k1b1a.ts. Benda keseharian digambar dengan emoji (paling tinggi U+1FA95) dan
 * bentuk dasar; jawaban banyaknya berupa kata bilangan bersuara, bukan lambang.
 */

type ItemB = { id: string; x: number; y: number; jenis: string; hitung?: boolean };

const emoji = (jenis: string): string => GAMBAR_BENDA[jenis] ?? GAMBAR_BENDA.apel;
const itemDari = (p: PropsAksi): ItemB[] => p.instans.data.item as ItemB[];
const sebut = (j: string): string => (j === "jeruk" ? "jeruk" : "apel");

/** Pilihan yang sudah keliru (hanya bila memang salah: pada jawaban gabungan tindakan bisa salah padahal pilihan benar). */
const pilihanSalah = (p: PropsAksi): string[] =>
  p.riwayat
    .map((r) => (r && typeof r === "object" ? (r as { pilih?: unknown }).pilih : undefined))
    .filter((x): x is string => typeof x === "string" && x !== p.instans.kunciPilihan);

/** Kartu pilihan banyaknya (kata bilangan + tombol dengar). Aktif bila tindakan benda sudah lengkap. */
function BagianPilih({ p, aktif, onPilih }: { p: PropsAksi; aktif: boolean; onPilih: (id: string) => void }) {
  return (
    <PilihKata
      pilihan={p.instans.pilihan ?? []}
      salah={pilihanSalah(p)}
      benarId={p.terkunci ? (p.instans.kunciPilihan ?? null) : null}
      kedip={[]}
      aktif={aktif}
      terkunci={p.terkunci}
      onPilih={onPilih}
      bicara={p.bicara}
      kolom={(p.instans.pilihan?.length ?? 0) === 3 ? 3 : 2}
    />
  );
}

const Bantuan = ({ teks }: { teks: string }) => (
  <p className="text-center text-sm font-black text-[#1C01A5]/70" aria-hidden="true">
    {teks}
  </p>
);

/* ---------------- c-ketuk-hitung ---------------- */
function AksiKetukHitung(p: PropsAksi) {
  const item = itemDari(p);
  const [urutan, setUrutan] = useState<string[]>([]);
  const tampil = p.tunjukBenar ? item.map((b) => b.id) : urutan;
  const lengkap = tampil.length === item.length;
  const ketuk = (id: string) => {
    if (p.terkunci || urutan.includes(id)) return;
    const baru = [...urutan, id];
    setUrutan(baru);
    p.bicara(eja(baru.length));
  };
  return (
    <div className="space-y-3">
      <PapanBenda label="Apel di rumput">
        {item.map((b) => (
          <Letak key={b.id} x={b.x} y={b.y}>
            <Benda emoji={emoji(b.jenis)} label={`Apel ${b.id}`} tanda={tampil.includes(b.id)} kedip={p.kedip.includes(b.id)} aktif={!p.terkunci} onKetuk={() => ketuk(b.id)} />
          </Letak>
        ))}
      </PapanBenda>
      {!lengkap && <Bantuan teks={"\u{1F446} Ketuk tiap apel"} />}
      <BagianPilih p={p} aktif={lengkap} onPilih={(id) => p.kirim({ urutan, pilih: id })} />
    </div>
  );
}

/* ---------------- c-geser-piring dan c-jejer-deret (geser benda ke wadah lalu pilih banyaknya) ---------------- */
function SeretLaluPilih({ p, wadah, kunciDaftar, zona }: { p: PropsAksi; wadah: string; kunciDaftar: string; zona: React.ComponentProps<typeof SeretKeWadah>["zona"] }) {
  const item = itemDari(p);
  const [penempatan, setPenempatan] = useState<Record<string, string>>({});
  const tampilPenempatan = p.tunjukBenar ? Object.fromEntries(item.map((b) => [b.id, wadah])) : penempatan;
  const ids = Object.keys(tampilPenempatan).filter((k) => tampilPenempatan[k] === wadah);
  const lengkap = ids.length === item.length;
  const ubah = (baru: Record<string, string>) => {
    const sebelum = Object.values(penempatan).filter((v) => v === wadah).length;
    const sesudah = Object.values(baru).filter((v) => v === wadah).length;
    setPenempatan(baru);
    if (sesudah > sebelum) p.bicara(eja(sesudah));
  };
  const barang: ItemSeret[] = item.map((b) => ({ id: b.id, isi: emoji(b.jenis), label: `Apel ${b.id}`, x: b.x, y: b.y }));
  return (
    <div className="space-y-3">
      <SeretKeWadah item={barang} zona={zona} penempatan={tampilPenempatan} onUbah={ubah} ketukKe={wadah} kedip={p.kedip} terkunci={p.terkunci} />
      {!lengkap && <Bantuan teks={"\u{1F449} Geser semua apel"} />}
      <BagianPilih p={p} aktif={lengkap} onPilih={(id) => p.kirim({ [kunciDaftar]: ids, pilih: id })} />
    </div>
  );
}

function AksiGeserPiring(p: PropsAksi) {
  return (
    <SeretLaluPilih
      p={p}
      wadah="piring"
      kunciDaftar="dipindah"
      zona={[
        {
          id: "piring",
          label: "Piring",
          kelas: "mx-auto w-full rounded-[2.5rem] border-4 border-[#94A3B8] bg-white p-2",
          render: (ids, tampil) => (
            <div className="flex min-h-[80px] flex-wrap items-center justify-center gap-1">
              {ids.length === 0 ? <span className="text-5xl opacity-40" aria-hidden="true">{GAMBAR_BENDA.piring}</span> : ids.map((id) => tampil(id))}
            </div>
          ),
        },
      ]}
    />
  );
}

function AksiJejerDeret(p: PropsAksi) {
  return (
    <SeretLaluPilih
      p={p}
      wadah="deret"
      kunciDaftar="deret"
      zona={[
        {
          id: "deret",
          label: "Satu deret",
          kelas: "rounded-2xl border-4 border-dashed border-[#92400E] bg-[#FEF3C7] p-1",
          render: (ids, tampil) => (
            <div className="flex min-h-[56px] flex-nowrap items-center justify-center" style={{ fontSize: "min(7vw, 30px)" }}>
              {ids.map((id) => tampil(id))}
            </div>
          ),
        },
      ]}
    />
  );
}

/* ---------------- c-seret-keranjang ---------------- */
function AksiSeretKeranjang(p: PropsAksi) {
  const item = itemDari(p);
  const n = p.instans.kunci as number;
  const [penempatan, setPenempatan] = useState<Record<string, string>>({});
  const tampilPenempatan = p.tunjukBenar ? Object.fromEntries(item.slice(0, n).map((b) => [b.id, "keranjang"])) : penempatan;
  const ids = Object.keys(tampilPenempatan).filter((k) => tampilPenempatan[k] === "keranjang");
  const ubah = (baru: Record<string, string>) => {
    const sebelum = Object.keys(penempatan).length;
    const sesudah = Object.keys(baru).length;
    setPenempatan(baru);
    if (sesudah > sebelum) p.bicara(eja(sesudah));
  };
  const barang: ItemSeret[] = item.map((b) => ({ id: b.id, isi: emoji(b.jenis), label: `Apel ${b.id}`, x: b.x, y: b.y }));
  return (
    <div className="space-y-3">
      <SeretKeWadah
        item={barang}
        zona={[
          {
            id: "keranjang",
            label: "Keranjang",
            kelas: "rounded-b-[2.5rem] rounded-t-xl border-4 border-[#92400E] bg-[#FDE68A] p-2",
            render: (daftar, tampil) => (
              <div className="flex min-h-[84px] flex-wrap items-center justify-center gap-1">
                {daftar.length === 0 ? <span className="text-5xl opacity-50" aria-hidden="true">{GAMBAR_BENDA.keranjang}</span> : daftar.map((id) => tampil(id))}
              </div>
            ),
          },
        ]}
        penempatan={tampilPenempatan}
        onUbah={ubah}
        ketukKe="keranjang"
        kedip={p.kedip}
        terkunci={p.terkunci}
      />
      <TombolPeriksa aktif={!p.terkunci && ids.length > 0} onClick={() => p.kirim({ ids })} />
    </div>
  );
}

/* ---------------- c-melingkar-bendera ---------------- */
function AksiMelingkar(p: PropsAksi) {
  const item = itemDari(p);
  const n = item.length;
  const [urutan, setUrutan] = useState<string[]>([]);
  const [lokal, setLokal] = useState<string[]>([]);
  const tampil = p.tunjukBenar ? item.map((b) => b.id) : urutan;
  const bendera = tampil[0] ?? null;
  const lengkap = tampil.length === n;
  const indeks = (id: string): number => Number(id.slice(1)) - 1;
  const ketuk = (id: string) => {
    if (p.terkunci || urutan.includes(id)) return;
    if (urutan.length === 0) {
      setUrutan([id]);
      setLokal([]);
      p.bicara(eja(1));
      return;
    }
    const s = indeks(urutan[0]);
    const sekarang = indeks(urutan[urutan.length - 1]);
    const arah = urutan.length === 1 ? 0 : (indeks(urutan[1]) - s + n) % n === 1 ? 1 : -1;
    const calon = arah === 0 ? [(sekarang + 1) % n, (sekarang - 1 + n) % n] : [(((sekarang + arah) % n) + n) % n];
    if (calon.includes(indeks(id))) {
      setUrutan([...urutan, id]);
      setLokal([]);
      p.bicara(eja(urutan.length + 1));
    } else setLokal(calon.map((c) => `b${c + 1}`));
  };
  return (
    <div className="space-y-3">
      <PapanBenda tinggi={250} label="Apel melingkar">
        {item.map((b) => (
          <Letak key={b.id} x={b.x} y={b.y}>
            <Benda
              emoji={emoji(b.jenis)}
              label={`Apel ${b.id}`}
              tanda={tampil.includes(b.id)}
              lencana={b.id === bendera ? GAMBAR_BENDA.bendera : undefined}
              kedip={p.kedip.includes(b.id) || lokal.includes(b.id)}
              aktif={!p.terkunci}
              onKetuk={() => ketuk(b.id)}
            />
          </Letak>
        ))}
      </PapanBenda>
      {!lengkap && <Bantuan teks={bendera ? "\u{1F446} Terus searah" : `${GAMBAR_BENDA.bendera} Pilih apel pertama`} />}
      <BagianPilih p={p} aktif={lengkap} onPilih={(id) => p.kirim({ bendera, urutan, pilih: id })} />
    </div>
  );
}

/* ---------------- c-sekilas ---------------- */
function AksiSekilas(p: PropsAksi) {
  const item = itemDari(p);
  const ms = (p.instans.data.tampilMs as number) ?? 1600;
  const [sedang, setSedang] = useState(false);
  const [pernah, setPernah] = useState(false);
  useEffect(() => {
    if (!sedang) return;
    const t = setTimeout(() => setSedang(false), ms);
    return () => clearTimeout(t);
  }, [sedang, ms]);
  const terlihat = sedang || p.terkunci;
  return (
    <div className="space-y-3">
      <PapanBenda tinggi={170} label={terlihat ? "Apel terlihat" : "Apel tertutup daun"} kelas="bg-[#ECFCCB] border-[#65A30D]">
        {terlihat ? (
          item.map((b) => (
            <Letak key={b.id} x={b.x} y={b.y}>
              <span className={`flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-4xl leading-none ${p.kedip.includes(b.id) ? "igil-denyut bg-[#FFF3B0] ring-4 ring-[#FFC800]" : ""}`} aria-hidden="true">
                {emoji(b.jenis)}
              </span>
            </Letak>
          ))
        ) : (
          <Letak x={50} y={50}>
            <span className="text-7xl" aria-hidden="true">
              {GAMBAR_BENDA.daun}
              {GAMBAR_BENDA.daun}
            </span>
          </Letak>
        )}
      </PapanBenda>
      <div className="flex justify-center">
        <button
          type="button"
          disabled={p.terkunci || sedang}
          aria-label="Lihat apel"
          onClick={() => {
            setSedang(true);
            setPernah(true);
          }}
          className={`min-h-[52px] rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 text-lg font-black text-[#FFE566] disabled:opacity-40 ${p.kedip.length > 0 && !sedang ? "igil-denyut" : ""}`}
        >
          <span aria-hidden="true">{"\u{1F440}"}</span> Lihat
        </button>
      </div>
      <BagianPilih p={p} aktif={pernah && !sedang} onPilih={(id) => p.kirim({ pilih: id })} />
    </div>
  );
}

/* ---------------- c-pilah-apel ---------------- */
function AksiPilah(p: PropsAksi) {
  const item = itemDari(p);
  const [dipilih, setDipilih] = useState<string[]>([]);
  const tampil = p.tunjukBenar ? item.filter((b) => b.jenis === "apel").map((b) => b.id) : dipilih;
  const ubah = (ids: string[]) => {
    const baru = ids.find((x) => !dipilih.includes(x));
    setDipilih(ids);
    if (baru) p.bicara(sebut(item.find((b) => b.id === baru)?.jenis ?? "apel"));
  };
  return (
    <div className="space-y-3">
      <KetukBanyak
        item={item.map((b) => ({ id: b.id, isi: emoji(b.jenis), label: sebut(b.jenis), x: b.x, y: b.y }))}
        dipilih={tampil}
        onUbah={ubah}
        kedip={p.kedip}
        terkunci={p.terkunci}
      />
      {tampil.length === 0 && <Bantuan teks={`${GAMBAR_BENDA.apel} Ketuk hanya apel`} />}
      <BagianPilih p={p} aktif={tampil.length > 0} onPilih={(id) => p.kirim({ dipilih, pilih: id })} />
    </div>
  );
}

/* ---------------- c-isi-nampan ---------------- */
function AksiIsiNampan(p: PropsAksi) {
  const n = p.instans.kunci as number;
  const bahan = (p.instans.data.bahan as number) ?? 10;
  const kolom = (p.instans.data.kolom as number) ?? 5;
  const [isi, setIsi] = useState(0);
  const k = p.tunjukBenar ? n : isi;
  const tambah = () => {
    if (p.terkunci || isi >= 10) return;
    setIsi(isi + 1);
    p.bicara(eja(isi + 1));
  };
  const ambil = () => {
    if (!p.terkunci && isi > 0) setIsi(isi - 1);
  };
  const sisa = Math.max(0, bahan - k);
  return (
    <div className="space-y-3">
      <IsiPetak
        baris={2}
        kolom={kolom}
        terisi={Array.from({ length: 10 }, (_, i) => i < k)}
        onKetuk={ambil}
        isi={() => <span aria-hidden="true">{GAMBAR_BENDA.apel}</span>}
        kedip={p.kedip}
        terkunci={p.terkunci}
        bisaDiketuk={(i) => i === k - 1}
      />
      <div role="group" aria-label="Tumpukan apel" className="flex min-h-[56px] flex-wrap items-center justify-center gap-1 rounded-2xl border-4 border-[#65A30D] bg-[#ECFCCB] p-2">
        {Array.from({ length: sisa }, (_, i) => (
          <Benda key={i} emoji={GAMBAR_BENDA.apel} label="Ambil apel" ukuran={30} aktif={!p.terkunci} onKetuk={tambah} />
        ))}
      </div>
      <TombolPeriksa aktif={!p.terkunci && isi > 0} onClick={() => p.kirim({ isi })} />
    </div>
  );
}

/* ---------------- c-keranjang-kosong ---------------- */
function AksiKeranjangKosong(p: PropsAksi) {
  const kr = p.instans.data.keranjang as { id: string; isi: number }[];
  const salah = pilihanSalah(p);
  return (
    <div role="group" aria-label="Tiga keranjang" className="grid grid-cols-3 gap-2">
      {kr.map((k) => {
        const benar = p.terkunci && p.instans.kunciPilihan === k.id;
        const sudahSalah = salah.includes(k.id);
        return (
          <div key={k.id} className="flex flex-col items-center gap-1">
            <button
              type="button"
              disabled={p.terkunci || sudahSalah}
              aria-label={`Keranjang ${k.id}`}
              onClick={() => p.kirim({ pilih: k.id })}
              className={`flex min-h-[132px] w-full flex-col items-center justify-end rounded-2xl border-4 px-1 pb-2 ${benar ? "border-[#16A34A] bg-[#DCFCE7]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9] opacity-50" : "border-[#92400E] bg-[#FEF3C7]"} ${p.kedip.includes(k.id) ? "igil-denyut bg-[#FFF3B0] ring-4 ring-[#FFC800]" : ""}`}
            >
              <span className="flex min-h-[48px] flex-wrap items-end justify-center text-xl leading-none" aria-hidden="true">
                {Array.from({ length: k.isi }, (_, i) => (
                  <span key={i}>{GAMBAR_BENDA.apel}</span>
                ))}
              </span>
              <span className="text-5xl leading-none" aria-hidden="true">
                {GAMBAR_BENDA.keranjang}
              </span>
            </button>
            <button type="button" aria-label={`Dengar: keranjang ${k.id}`} onClick={() => p.bicara(`Keranjang ${k.id}`)} className="min-h-[40px] rounded-full bg-[#1C01A5] px-3 text-sm font-black text-[#FFE566]">
              {k.id}
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- c-cari-terlewat ---------------- */
function AksiCariTerlewat(p: PropsAksi) {
  const item = itemDari(p);
  const lewat = p.instans.kunci as string;
  const sorot = p.terkunci ? [lewat] : p.kedip;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-2xl" aria-hidden="true">
        <span>{"\u{1F9D2}"}</span>
        <span className="text-sm font-black text-[#1C01A5]">Niko</span>
      </div>
      <PapanBenda label="Apel yang dihitung Niko">
        {item.map((b) => (
          <Letak key={b.id} x={b.x} y={b.y}>
            <Benda emoji={emoji(b.jenis)} label={b.hitung === false ? "Apel belum bertanda" : "Apel sudah bertanda"} tanda={b.hitung !== false} kedip={sorot.includes(b.id)} aktif={!p.terkunci} onKetuk={() => p.kirim({ pilih: b.id })} />
          </Letak>
        ))}
      </PapanBenda>
    </div>
  );
}

daftarkanKomponen("c-ketuk-hitung", AksiKetukHitung);
daftarkanKomponen("c-geser-piring", AksiGeserPiring);
daftarkanKomponen("c-seret-keranjang", AksiSeretKeranjang);
daftarkanKomponen("c-melingkar-bendera", AksiMelingkar);
daftarkanKomponen("c-sekilas", AksiSekilas);
daftarkanKomponen("c-pilah-apel", AksiPilah);
daftarkanKomponen("c-jejer-deret", AksiJejerDeret);
daftarkanKomponen("c-isi-nampan", AksiIsiNampan);
daftarkanKomponen("c-keranjang-kosong", AksiKeranjangKosong);
daftarkanKomponen("c-cari-terlewat", AksiCariTerlewat);
