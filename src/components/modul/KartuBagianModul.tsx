"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import {
  bagianWajibKuisMateriTuntas,
  type BagianIsi,
  type BagianModul,
} from "@/lib/bagian-modul";
import { PESAN_KUNCI_KUIS_MATERI } from "@/lib/kuis-materi";
import TungguNaskah, { TEKS_MENYUSUN_NASKAH } from "@/components/modul/TungguNaskah";

const META: Record<
  BagianIsi,
  { judul: string; ringkas: string; gambar: string }
> = {
  silabus: {
    judul: "Kurikulum",
    ringkas: "Komponen utama Kurikulum Merdeka yang akan dipelajari",
    gambar: "/kartu-modul/silabus.png",
  },
  materi: {
    judul: "Materi",
    ringkas: "Pelajari konsep bab lewat naskah bergambar",
    gambar: "/kartu-modul/materi.png",
  },
  simulasi: {
    judul: "Simulasi",
    ringkas: "Mainkan lab buatan IGIL dan selesaikan tantangannya",
    gambar: "/kartu-modul/simulasi.png",
  },
  latihan: {
    judul: "Latihan",
    ringkas: "10 soal pilihan ganda, dimuat saat kartu dibuka",
    gambar: "/kartu-modul/latihan.png",
  },
  praktikum: {
    judul: "Praktikum",
    ringkas: "Rancang ide, jalankan, dan dapatkan umpan balik AI",
    gambar: "/kartu-modul/praktikum.png",
  },
  ujian: {
    judul: "Ujian",
    ringkas: "3 soal uraian acak tanpa cache, beda setiap sesi",
    gambar: "/kartu-modul/ujian.png",
  },
};

const URUTAN: BagianIsi[] = ["silabus", "materi", "simulasi", "latihan", "praktikum", "ujian"];

export default function KartuBagianModul({
  daftar,
  aktif,
  isi,
  materiTuntas = false,
  mengunciKlik = false,
  menyusun,
  onPilih,
}: {
  daftar: BagianIsi[];
  aktif: BagianModul;
  isi?: Partial<Record<BagianIsi, ReactNode>>;
  materiTuntas?: boolean;
  mengunciKlik?: boolean;
  menyusun?: Partial<Record<BagianIsi, boolean>>;
  onPilih: (bagian: BagianIsi) => void;
}) {
  const [indeks, setIndeks] = useState(0);
  const pilihInduk = useRef(onPilih);
  pilihInduk.current = onPilih;
  const daftarKunci = daftar.join("|");
  useEffect(() => {
    if (aktif !== "pilih" || mengunciKlik) return;
    const id = daftarKunci.split("|")[0] as BagianIsi | "";
    if (!id) return;
    const timer = window.setTimeout(() => pilihInduk.current(id), 50);
    return () => window.clearTimeout(timer);
  }, [aktif, mengunciKlik, daftarKunci]);
  useEffect(() => {
    if (aktif === "pilih") {
      setIndeks(0);
      return;
    }
    const ketemu = URUTAN.findIndex((id) => id === aktif);
    if (ketemu >= 0) setIndeks(ketemu);
  }, [aktif]);

  const idTampil = URUTAN[indeks] ?? URUTAN[0];
  const item = META[idTampil];
  const terkunci = (id: BagianIsi) => bagianWajibKuisMateriTuntas(id) && !materiTuntas;
  const kartuTerkunci = terkunci(idTampil);
  const adaIsi = daftar.includes(idTampil);
  const menunggu = Boolean(menyusun?.[idTampil]);
  const berikut = URUTAN[indeks + 1];
  const bolehMaju = Boolean(berikut) && !terkunci(berikut) && !mengunciKlik;
  let indeksMundur = -1;
  for (let i = indeks - 1; i >= 0; i -= 1) {
    if (!terkunci(URUTAN[i])) {
      indeksMundur = i;
      break;
    }
  }
  const terbuka = adaIsi && !kartuTerkunci && (aktif === idTampil || (aktif === "pilih" && indeks === 0));

  const pilih = (id: BagianIsi) => {
    if (mengunciKlik || terkunci(id)) return;
    const tujuan = URUTAN.indexOf(id);
    if (tujuan >= 0) setIndeks(tujuan);
    if (!daftar.includes(id) || aktif === id) return;
    onPilih(id);
  };

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="Bagian modul" className="flex gap-2 overflow-x-auto pb-1">
        {URUTAN.map((id) => {
          const tab = META[id];
          const dipilih = id === idTampil;
          const kunci = terkunci(id);
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={dipilih}
              disabled={mengunciKlik || kunci}
              onClick={() => pilih(id)}
              className={`shrink-0 rounded-full px-3 py-2 text-sm font-black ${
                dipilih
                  ? "bg-[#1C01A5] text-white"
                  : kunci
                    ? "bg-slate-200 text-slate-400"
                    : "bg-white text-[#1C01A5] ring-2 ring-[#1C01A5]"
              }`}
            >
              {kunci ? <Lock className="mr-1 inline h-3.5 w-3.5" /> : null}
              {tab.judul}
            </button>
          );
        })}
      </div>

      <article id={`kartu-bagian-${idTampil}`} className="overflow-hidden rounded-none border border-black bg-white">
        <p className="px-4 pt-3 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Pos {indeks + 1} dari {URUTAN.length}
        </p>
        <div className="relative mt-2 aspect-[16/9] w-full bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.gambar}
            alt={item.judul}
            className={`h-full w-full object-cover ${kartuTerkunci ? "grayscale" : ""}`}
          />
          {kartuTerkunci ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/55">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#1C01A5] px-3 py-1.5 text-sm font-extrabold text-white">
                <Lock className="h-4 w-4" />
                Terkunci
              </span>
            </div>
          ) : menunggu ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <TungguNaskah padat />
            </div>
          ) : null}
        </div>
        <div className="p-4">
          <p className="text-xl font-black text-[#1C01A5]">{item.judul}</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[#1C01A5]/70">
            {kartuTerkunci ? PESAN_KUNCI_KUIS_MATERI : menunggu ? TEKS_MENYUSUN_NASKAH : item.ringkas}
          </p>
        </div>
        {terbuka ? <div className="border-t border-black px-4 pb-5 pt-4">{isi?.[idTampil] ?? null}</div> : null}
      </article>

      {berikut && terkunci(berikut) ? (
        <p className="text-sm font-semibold text-slate-600">{PESAN_KUNCI_KUIS_MATERI}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={indeksMundur < 0 || mengunciKlik}
          onClick={() => {
            const sebelumnya = URUTAN[indeksMundur];
            if (sebelumnya) pilih(sebelumnya);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-[#1C01A5] disabled:opacity-40"
        >
          Kembali
        </button>
        {berikut ? (
          <button
            type="button"
            disabled={!bolehMaju}
            onClick={() => pilih(berikut)}
            className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white disabled:opacity-40"
          >
            Lanjut
          </button>
        ) : (
          <p className="text-sm font-black text-emerald-800">Bagian terakhir.</p>
        )}
      </div>
    </div>
  );
}
