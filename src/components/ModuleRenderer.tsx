"use client";

import { memo, useMemo } from "react";
import { pecahBlokNaskahModul } from "@/lib/blok-naskah-modul";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import InfografisKelas1 from "@/components/InfografisKelas1";
import NaskahPai1Bab1 from "@/components/NaskahPai1Bab1";
import NaskahPai1Bab2 from "@/components/NaskahPai1Bab2";
import NaskahPaiResmi from "@/components/NaskahPaiResmi";
import NaskahMtk1Bab1 from "@/components/NaskahMtk1Bab1";
import NaskahMtk1Bab2 from "@/components/NaskahMtk1Bab2";
import NaskahMtk1Bab3 from "@/components/NaskahMtk1Bab3";
import NaskahMtk1Bab4 from "@/components/NaskahMtk1Bab4";
import NaskahMtk1Bab5 from "@/components/NaskahMtk1Bab5";
import NaskahMtk1Bab6 from "@/components/NaskahMtk1Bab6";
import NaskahMtk1Bab7 from "@/components/NaskahMtk1Bab7";
import NaskahMtk1Bab8 from "@/components/NaskahMtk1Bab8";
import NaskahMtk1Bab9 from "@/components/NaskahMtk1Bab9";
import NaskahMtk1Bab10 from "@/components/NaskahMtk1Bab10";
import NaskahPancasila1 from "@/components/NaskahPancasila1";
import NaskahBindo1 from "@/components/NaskahBindo1";
import NaskahBindo2 from "@/components/NaskahBindo2";
import NaskahPjok1 from "@/components/NaskahPjok1";
import NaskahInggris1 from "@/components/NaskahInggris1";
import NaskahMusik1 from "@/components/NaskahMusik1";
import NaskahSeniRupa1 from "@/components/NaskahSeniRupa1";
import NaskahKristen1 from "@/components/NaskahKristen1";
import NaskahKatolik1 from "@/components/NaskahKatolik1";
import NaskahBuddha1 from "@/components/NaskahBuddha1";
import NaskahHindu1 from "@/components/NaskahHindu1";
import NaskahKhonghucu1 from "@/components/NaskahKhonghucu1";
import NaskahPai2 from "@/components/NaskahPai2";
import NaskahKartuSd from "@/components/NaskahKartuSd";
import DaftarLengkapMateri from "@/components/DaftarLengkapMateri";
import { BlokTampil } from "@/components/BlokNaskahTampil";
import { parseInfografisKelas1 } from "@/lib/infografis-kelas1";
import { naskahTampilanPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";
import { naskahTampilanPai1Bab2 } from "@/lib/naskah-resmi-pai-1-bab2";
import {
  adalahJudulMtk1Bab1,
  adalahJudulMtk1Bab2,
  adalahJudulMtk1Bab3,
  adalahJudulMtk1Bab4,
  adalahJudulMtk1Bab5,
  adalahJudulMtk1Bab6,
  adalahJudulMtk1Bab7,
  adalahJudulMtk1Bab8,
  adalahJudulMtk1Bab9,
  adalahJudulMtk1Bab10,
  adalahJudulPancasila1Bab1,
  adalahJudulPancasila1Bab2,
  adalahJudulPancasila1Bab3,
  adalahJudulPancasila1Bab4,
  cariModulPancasila1DariNaskah,
  cariModulPancasila1Resmi,
  adalahJudulBindo1,
  cariModulBindo1DariNaskah,
  cariModulBindo1Resmi,
  adalahJudulBindo2,
  cariModulBindo2DariNaskah,
  cariModulBindo2Resmi,
  adalahJudulPjok1,
  cariModulPjok1DariNaskah,
  cariModulPjok1Resmi,
  adalahJudulInggris1,
  cariModulInggris1DariNaskah,
  cariModulInggris1Resmi,
  adalahJudulMusik1,
  cariModulMusik1DariNaskah,
  cariModulMusik1Resmi,
  adalahJudulSeniRupa1,
  cariModulSeniRupa1DariNaskah,
  cariModulSeniRupa1Resmi,
  adalahJudulKristen1,
  cariModulKristen1DariNaskah,
  cariModulKristen1Resmi,
  adalahJudulKatolik1,
  cariModulKatolik1DariNaskah,
  cariModulKatolik1Resmi,
  adalahJudulBuddha1,
  cariModulBuddha1DariNaskah,
  cariModulBuddha1Resmi,
  adalahJudulHindu1,
  cariModulHindu1DariNaskah,
  cariModulHindu1Resmi,
  adalahJudulKhonghucu1,
  cariModulKhonghucu1DariNaskah,
  cariModulKhonghucu1Resmi,
  adalahJudulPai2,
  cariModulPai2DariNaskah,
  cariModulPai2Resmi,
  adalahJudulPai1Bab1,
  adalahJudulPai1Bab2,
  cariModulPai1DariNaskah,
  cariModulPai1Resmi,
  naskahTampilanResmi,
} from "@/lib/naskah-resmi";
import { potongLengkap } from "@/lib/paket-lengkap-materi";
import { kelasDuaSd, kelasSatuSd } from "@/lib/infografis-kelas1";
import { jenjangGuru, type KelaminGuru } from "@/lib/guru";
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
  kelamin,
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
  kelamin?: KelaminGuru;
}) {
  const rapat = padat || /\bprose-p:my-0\b/.test(className);
  const naskah = useMemo(() => (konten ?? "").trim(), [konten]);
  const pakaiKartuBab1 = useMemo(
    () =>
      adalahJudulPai1Bab1(mapel, materi) ||
      naskahTampilanPai1Bab1(naskah),
    [naskah, mapel, materi],
  );
  const pakaiKartuBab2 = useMemo(
    () =>
      adalahJudulPai1Bab2(mapel, materi) ||
      naskahTampilanPai1Bab2(naskah),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab1 = useMemo(
    () =>
      adalahJudulMtk1Bab1(mapel, materi) ||
      (naskahTampilanResmi(naskah) && /ayo\s+berhitung/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab2 = useMemo(
    () =>
      adalahJudulMtk1Bab2(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /penjumlahan\s+sampai(\s+dengan)?\s+10/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab3 = useMemo(
    () =>
      adalahJudulMtk1Bab3(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /pengurangan\s+sampai(\s+dengan)?\s+10/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab4 = useMemo(
    () =>
      adalahJudulMtk1Bab4(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /mengenal\s+bentuk(\s+ruang)?/i.test(naskah) &&
        !/bentuk\s+datar/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab5 = useMemo(
    () =>
      adalahJudulMtk1Bab5(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /bilangan\s+yang\s+lebih\s+besar|melompat ke angka belasan/i.test(
          naskah,
        )),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab6 = useMemo(
    () =>
      adalahJudulMtk1Bab6(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /rumah angka|nilai tempat|puluhan dan satuan/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab7 = useMemo(
    () =>
      adalahJudulMtk1Bab7(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /trik hitung cepat|simpan di kepala/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab8 = useMemo(
    () =>
      adalahJudulMtk1Bab8(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /detektif pengukuran|mengukur panjang dan berat/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab9 = useMemo(
    () =>
      adalahJudulMtk1Bab9(mapel, materi) ||
      (naskahTampilanResmi(naskah) && /bentuk datar/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const pakaiKartuMtkBab10 = useMemo(
    () =>
      adalahJudulMtk1Bab10(mapel, materi) ||
      (naskahTampilanResmi(naskah) &&
        /pola gambar dan diagram|bermain pola dan diagram/i.test(naskah)),
    [naskah, mapel, materi],
  );
  const modulPancasila = useMemo(() => {
    if (
      adalahJudulPancasila1Bab1(mapel, materi) ||
      adalahJudulPancasila1Bab2(mapel, materi) ||
      adalahJudulPancasila1Bab3(mapel, materi) ||
      adalahJudulPancasila1Bab4(mapel, materi)
    ) {
      return cariModulPancasila1Resmi(materi);
    }
    return cariModulPancasila1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulBindo = useMemo(() => {
    if (kelasDuaSd(kelas)) return null;
    if (adalahJudulBindo1(mapel, materi)) {
      return cariModulBindo1Resmi(materi);
    }
    return cariModulBindo1DariNaskah(naskah);
  }, [naskah, mapel, materi, kelas]);
  const modulBindo2 = useMemo(() => {
    if (kelasSatuSd(kelas)) return null;
    if (adalahJudulBindo2(mapel, materi)) {
      return cariModulBindo2Resmi(materi);
    }
    if (kelasDuaSd(kelas)) {
      return cariModulBindo2DariNaskah(naskah);
    }
    return cariModulBindo2DariNaskah(naskah);
  }, [naskah, mapel, materi, kelas]);
  const modulPjok = useMemo(() => {
    if (adalahJudulPjok1(mapel, materi)) {
      return cariModulPjok1Resmi(materi);
    }
    return cariModulPjok1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulInggris = useMemo(() => {
    if (adalahJudulInggris1(mapel, materi)) {
      return cariModulInggris1Resmi(materi);
    }
    return cariModulInggris1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulMusik = useMemo(() => {
    if (adalahJudulMusik1(mapel, materi)) {
      return cariModulMusik1Resmi(materi);
    }
    return cariModulMusik1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulSeniRupa = useMemo(() => {
    if (adalahJudulSeniRupa1(mapel, materi)) {
      return cariModulSeniRupa1Resmi(materi);
    }
    return cariModulSeniRupa1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulKristen = useMemo(() => {
    if (adalahJudulKristen1(mapel, materi)) {
      return cariModulKristen1Resmi(materi);
    }
    return cariModulKristen1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulKatolik = useMemo(() => {
    if (adalahJudulKatolik1(mapel, materi)) {
      return cariModulKatolik1Resmi(materi);
    }
    return cariModulKatolik1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulBuddha = useMemo(() => {
    if (adalahJudulBuddha1(mapel, materi)) {
      return cariModulBuddha1Resmi(materi);
    }
    return cariModulBuddha1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulHindu = useMemo(() => {
    if (adalahJudulHindu1(mapel, materi)) {
      return cariModulHindu1Resmi(materi);
    }
    return cariModulHindu1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulKhonghucu = useMemo(() => {
    if (adalahJudulKhonghucu1(mapel, materi)) {
      return cariModulKhonghucu1Resmi(materi);
    }
    return cariModulKhonghucu1DariNaskah(naskah);
  }, [naskah, mapel, materi]);
  const modulPai2 = useMemo(() => {
    if (kelasSatuSd(kelas)) return null;
    if (adalahJudulPai2(mapel, materi)) {
      return cariModulPai2Resmi(materi);
    }
    if (kelasDuaSd(kelas)) {
      return cariModulPai2DariNaskah(naskah);
    }
    return cariModulPai2DariNaskah(naskah);
  }, [naskah, mapel, materi, kelas]);
  const adaKartuMtk =
    pakaiKartuMtkBab1 ||
    pakaiKartuMtkBab2 ||
    pakaiKartuMtkBab3 ||
    pakaiKartuMtkBab4 ||
    pakaiKartuMtkBab5 ||
    pakaiKartuMtkBab6 ||
    pakaiKartuMtkBab7 ||
    pakaiKartuMtkBab8 ||
    pakaiKartuMtkBab9 ||
    pakaiKartuMtkBab10;
  const modulResmiLain = useMemo(() => {
    if (kelasDuaSd(kelas) || modulPai2 || modulBindo2) return null;
    if (pakaiKartuBab1 || pakaiKartuBab2 || adaKartuMtk || modulPancasila || modulBindo || modulPjok || modulInggris || modulMusik || modulSeniRupa || modulKristen || modulKatolik || modulBuddha || modulHindu || modulKhonghucu) return null;
    return cariModulPai1Resmi(materi) ?? cariModulPai1DariNaskah(naskah);
  }, [pakaiKartuBab1, pakaiKartuBab2, adaKartuMtk, modulPancasila, modulBindo, modulBindo2, modulPjok, modulInggris, modulMusik, modulSeniRupa, modulKristen, modulKatolik, modulBuddha, modulHindu, modulKhonghucu, modulPai2, materi, naskah, kelas]);
  const pakaiKartuSd =
    !pakaiKartuBab1 &&
    !pakaiKartuBab2 &&
    !adaKartuMtk &&
    !modulPancasila &&
    !modulBindo &&
    !modulPjok &&
    !modulInggris &&
    !modulMusik &&
    !modulSeniRupa &&
    !modulKristen &&
    !modulKatolik &&
    !modulBuddha &&
    !modulHindu &&
    !modulKhonghucu &&
    !modulPai2 &&
    !modulBindo2 &&
    !modulResmiLain &&
    !rapat &&
    jenjangGuru(kelas || "1 SD") === "SD" &&
    Boolean(kelas);
  const infografis = useMemo(
    () =>
      pakaiKartuBab1 ||
      pakaiKartuBab2 ||
      adaKartuMtk ||
      modulPancasila ||
      modulBindo ||
      modulPjok ||
      modulInggris ||
      modulMusik ||
      modulSeniRupa ||
      modulKristen ||
      modulKatolik ||
      modulBuddha ||
      modulHindu ||
      modulKhonghucu ||
      modulPai2 ||
      modulBindo2 ||
      modulResmiLain ||
      pakaiKartuSd
        ? null
        : parseInfografisKelas1(naskah),
    [
      naskah,
      pakaiKartuBab1,
      pakaiKartuBab2,
      adaKartuMtk,
      modulPancasila,
      modulBindo,
      modulPjok,
      modulInggris,
      modulMusik,
      modulSeniRupa,
      modulKristen,
      modulKatolik,
      modulBuddha,
      modulHindu,
      modulKhonghucu,
      modulPai2,
      modulBindo2,
      modulResmiLain,
      pakaiKartuSd,
    ],
  );
  const potong = useMemo(() => potongLengkap(naskah), [naskah]);
  const blok = useMemo(
    () =>
      infografis ||
      pakaiKartuBab1 ||
      pakaiKartuBab2 ||
      adaKartuMtk ||
      modulPancasila ||
      modulBindo ||
      modulPjok ||
      modulInggris ||
      modulMusik ||
      modulSeniRupa ||
      modulKristen ||
      modulKatolik ||
      modulBuddha ||
      modulHindu ||
      modulKhonghucu ||
      modulPai2 ||
      modulBindo2 ||
      modulResmiLain ||
      pakaiKartuSd
        ? []
        : pecahBlokNaskahModul(potong.tubuh || naskah),
    [
      naskah,
      infografis,
      pakaiKartuBab1,
      pakaiKartuBab2,
      adaKartuMtk,
      modulPancasila,
      modulBindo,
      modulPjok,
      modulInggris,
      modulMusik,
      modulSeniRupa,
      modulKristen,
      modulKatolik,
      modulBuddha,
      modulHindu,
      modulKhonghucu,
      modulPai2,
      modulBindo2,
      modulResmiLain,
      pakaiKartuSd,
      potong.tubuh,
    ],
  );
  if (pakaiKartuBab1) {
    return (
      <div className={className}>
        <NaskahPai1Bab1 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuBab2) {
    return (
      <div className={className}>
        <NaskahPai1Bab2 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab1) {
    return (
      <div className={className}>
        <NaskahMtk1Bab1 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab2) {
    return (
      <div className={className}>
        <NaskahMtk1Bab2 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab3) {
    return (
      <div className={className}>
        <NaskahMtk1Bab3 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab4) {
    return (
      <div className={className}>
        <NaskahMtk1Bab4 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab5) {
    return (
      <div className={className}>
        <NaskahMtk1Bab5 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab6) {
    return (
      <div className={className}>
        <NaskahMtk1Bab6 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab7) {
    return (
      <div className={className}>
        <NaskahMtk1Bab7 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab8) {
    return (
      <div className={className}>
        <NaskahMtk1Bab8 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab9) {
    return (
      <div className={className}>
        <NaskahMtk1Bab9 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtkBab10) {
    return (
      <div className={className}>
        <NaskahMtk1Bab10 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (modulPancasila) {
    return (
      <div className={className}>
        <NaskahPancasila1
          modul={modulPancasila}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulBindo) {
    return (
      <div className={className}>
        <NaskahBindo1
          modul={modulBindo}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulPjok) {
    return (
      <div className={className}>
        <NaskahPjok1
          modul={modulPjok}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulInggris) {
    return (
      <div className={className}>
        <NaskahInggris1
          modul={modulInggris}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulMusik) {
    return (
      <div className={className}>
        <NaskahMusik1
          modul={modulMusik}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulSeniRupa) {
    return (
      <div className={className}>
        <NaskahSeniRupa1
          modul={modulSeniRupa}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulKristen) {
    return (
      <div className={className}>
        <NaskahKristen1
          modul={modulKristen}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulKatolik) {
    return (
      <div className={className}>
        <NaskahKatolik1
          modul={modulKatolik}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulBuddha) {
    return (
      <div className={className}>
        <NaskahBuddha1
          modul={modulBuddha}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulHindu) {
    return (
      <div className={className}>
        <NaskahHindu1
          modul={modulHindu}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulKhonghucu) {
    return (
      <div className={className}>
        <NaskahKhonghucu1
          modul={modulKhonghucu}
          kelas={kelas}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulPai2) {
    return (
      <div className={className}>
        <NaskahPai2
          modul={modulPai2}
          kelas={kelas || "2 SD"}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulBindo2) {
    return (
      <div className={className}>
        <NaskahBindo2
          modul={modulBindo2}
          kelas={kelas || "2 SD"}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (modulResmiLain) {
    return (
      <div className={className}>
        <NaskahPaiResmi
          modul={modulResmiLain}
          kelas={kelas}
          kelamin={kelamin}
        />
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
