"use client";

import { memo, useMemo } from "react";
import { pecahBlokNaskahModul } from "@/lib/blok-naskah-modul";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import InfografisKelas1 from "@/components/InfografisKelas1";
import NaskahPai1Bab1 from "@/components/NaskahPai1Bab1";
import NaskahKartuSd from "@/components/NaskahKartuSd";
import DaftarLengkapMateri from "@/components/DaftarLengkapMateri";
import { BlokTampil } from "@/components/BlokNaskahTampil";
import { parseInfografisKelas1 } from "@/lib/infografis-kelas1";
import { naskahTampilanPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";
import { adalahJudulPai1Bab1 } from "@/lib/naskah-resmi";
import { potongLengkap } from "@/lib/paket-lengkap-materi";
import { jenjangGuru } from "@/lib/guru";
import { rapikanKunci } from "@/lib/kunci-siswa";
import { Loader2 } from "lucide-react";

function judulSamaDenganBab(judul: string, bab: string): boolean {
  return Boolean(judul.trim() && bab.trim()) && rapikanKunci(judul) === rapikanKunci(bab);
}

function ModuleRenderer({
  konten,
  className = "",
  padat = false,
  gambarSisipan,
  doodleMemuat = false,
  mapel = "",
  materi = "",
  kelas = "",
  sembunyikanJudulUtama = false,
}: {
  konten: string;
  className?: string;
  padat?: boolean;
  gambarSisipan?: GambarSisipan[];
  doodleMemuat?: boolean;
  mapel?: string;
  materi?: string;
  kelas?: string;
  sembunyikanJudulUtama?: boolean;
}) {
  const rapat = padat || /\bprose-p:my-0\b/.test(className);
  const naskah = useMemo(() => (konten ?? "").trim(), [konten]);
  const pakaiKartuBab1 = useMemo(
    () =>
      adalahJudulPai1Bab1(mapel, materi) ||
      naskahTampilanPai1Bab1(naskah),
    [naskah, mapel, materi],
  );
  const pakaiKartuSd =
    !pakaiKartuBab1 && !rapat && jenjangGuru(kelas || "1 SD") === "SD" && Boolean(kelas);
  const infografis = useMemo(
    () => (pakaiKartuBab1 || pakaiKartuSd ? null : parseInfografisKelas1(naskah)),
    [naskah, pakaiKartuBab1, pakaiKartuSd],
  );
  const potong = useMemo(() => potongLengkap(naskah), [naskah]);
  const blok = useMemo(
    () =>
      infografis || pakaiKartuBab1 || pakaiKartuSd
        ? []
        : pecahBlokNaskahModul(potong.tubuh || naskah),
    [naskah, infografis, pakaiKartuBab1, pakaiKartuSd, potong.tubuh],
  );
  if (pakaiKartuBab1) {
    return (
      <div className={className}>
        <NaskahPai1Bab1 />
      </div>
    );
  }
  if (pakaiKartuSd) {
    return (
      <div className={className}>
        <NaskahKartuSd
          konten={naskah}
          materi={materi}
          gambarSisipan={gambarSisipan}
          doodleMemuat={doodleMemuat}
        />
      </div>
    );
  }
  if (infografis) {
    return (
      <div className={className}>
        <InfografisKelas1 data={infografis} tanpaJudul={sembunyikanJudulUtama} />
      </div>
    );
  }
  if (blok.length === 0 && potong.lengkap.length === 0) return null;

  let indeksJudul = 0;

  return (
    <div className={`igil-buku ${rapat ? "igil-buku-padat" : ""} ${className}`}>
      {blok.map((item, indeks) => {
        if (
          sembunyikanJudulUtama &&
          item.jenis === "judul" &&
          judulSamaDenganBab(item.teks, materi)
        ) {
          return null;
        }
        const tampil = (
          <BlokTampil
            key={`${item.jenis}-${indeks}`}
            blok={item}
            padat={rapat}
          />
        );
        if (item.jenis !== "judul" || item.tingkat > 3) return tampil;
        indeksJudul += 1;
        const doodle = gambarSisipan?.find(
          (gambar) => gambar.setelahParagraf === indeksJudul,
        );
        if (!doodle && !doodleMemuat) return tampil;
        return (
          <div key={`${item.jenis}-${indeks}`} className="space-y-3">
            <BlokTampil blok={item} padat={rapat} />
            {doodle ? (
              <GambarDoodle
                src={doodle.src}
                alt={doodle.alt}
                ukuran={doodle.ukuran}
              />
            ) : doodleMemuat ? (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea]">
                <Loader2 className="h-6 w-6 animate-spin text-[#1C01A5]" />
              </div>
            ) : null}
          </div>
        );
      })}
      {potong.lengkap.length > 0 ? (
        <div className="mt-5">
          <DaftarLengkapMateri data={potong.lengkap} />
        </div>
      ) : null}
    </div>
  );
}

export default memo(ModuleRenderer);
