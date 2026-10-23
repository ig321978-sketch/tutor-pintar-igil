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
import NaskahMtk3Bab1 from "@/components/NaskahMtk3Bab1";
import NaskahMtk3Ukur from "@/components/NaskahMtk3Ukur";
import NaskahMtk3Kalimat from "@/components/NaskahMtk3Kalimat";
import NaskahMtk3Bangun from "@/components/NaskahMtk3Bangun";
import NaskahMtk4Bab1 from "@/components/NaskahMtk4Bab1";
import NaskahMtk4Bab2 from "@/components/NaskahMtk4Bab2";
import NaskahMtk4Bab3 from "@/components/NaskahMtk4Bab3";
import NaskahMtk4Bab4 from "@/components/NaskahMtk4Bab4";
import NaskahMtk4Bab5 from "@/components/NaskahMtk4Bab5";
import NaskahMtk4Bab6 from "@/components/NaskahMtk4Bab6";
import NaskahMtk6Bab1 from "@/components/NaskahMtk6Bab1";
import Bab2RasioModule from "@/components/modules/Bab2RasioModule";
import Bab3KubusBalokModule from "@/components/modules/Bab3KubusBalokModule";
import Bab4PeluangModule from "@/components/modules/Bab4PeluangModule";
import NaskahMtk7Bab1 from "@/components/NaskahMtk7Bab1";
import NaskahPancasila1 from "@/components/NaskahPancasila1";
import NaskahBindo1 from "@/components/NaskahBindo1";
import NaskahBindo2 from "@/components/NaskahBindo2";
import NaskahMtk2 from "@/components/NaskahMtk2";
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
  adalahJudulMtk3Bab1,
  adalahJudulMtk3Ukur,
  adalahJudulMtk3Kalimat,
  adalahJudulMtk3Bangun,
  adalahJudulMtk4Bab1,
  adalahJudulMtk4Bab2,
  adalahJudulMtk4Bab3,
  adalahJudulMtk4Bab4,
  adalahJudulMtk4Bab5,
  adalahJudulMtk4Bab6,
  adalahJudulMtk6Bab1,
  adalahJudulMtk6Bab2,
  adalahJudulMtk6Bab3,
  adalahJudulMtk6Bab4,
  adalahJudulMtk7Bab1,
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
  adalahJudulMtk2,
  cariModulMtk2DariNaskah,
  cariModulMtk2Resmi,
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
import { kelasDuaSd, kelasEmpatSd, kelasEnamSd, kelasSatuSd, kelasTigaSd } from "@/lib/infografis-kelas1";
import { MODUL_MTK3_BAB1 } from "@/lib/modul-resmi-mtk-3-bab1";
import { MODUL_MTK3_UKUR } from "@/lib/modul-resmi-mtk-3-ukur";
import { MODUL_MTK3_KALIMAT } from "@/lib/modul-resmi-mtk-3-kalimat";
import { MODUL_MTK3_BANGUN } from "@/lib/modul-resmi-mtk-3-bangun";
import { MODUL_MTK4_BAB1 } from "@/lib/modul-resmi-mtk-4-bab1";
import { MODUL_MTK4_BAB2 } from "@/lib/modul-resmi-mtk-4-bab2";
import { MODUL_MTK4_BAB3 } from "@/lib/modul-resmi-mtk-4-bab3";
import { MODUL_MTK4_BAB4 } from "@/lib/modul-resmi-mtk-4-bab4";
import { MODUL_MTK4_BAB5 } from "@/lib/modul-resmi-mtk-4-bab5";
import { MODUL_MTK4_BAB6 } from "@/lib/modul-resmi-mtk-4-bab6";
import { MODUL_MTK6_BAB1 } from "@/lib/modul-resmi-mtk-6-bab1";
import { MODUL_MTK6_BAB2 } from "@/lib/modul-resmi-mtk-6-bab2";
import { MODUL_MTK6_BAB3 } from "@/lib/modul-resmi-mtk-6-bab3";
import { MODUL_MTK6_BAB4 } from "@/lib/modul-resmi-mtk-6-bab4";
import { MODUL_MTK7_BAB1 } from "@/lib/modul-resmi-mtk-7-bab1";
import { naskahTampilanModulResmi } from "@/lib/modul-resmi-pai";
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
      !kelasDuaSd(kelas) &&
      (adalahJudulMtk1Bab1(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /ayo\s+berhitung|ayo\s+membilang\s+sampai(\s+dengan)?\s+10\b|piknik buah rara|rara dan bimo|permen warna-warni sani/i.test(
            naskah,
          ))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab2 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      (adalahJudulMtk1Bab2(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /penjumlahan\s+sampai(\s+dengan)?\s+10\b|piknik seru di pantai|kapal pengumpul harta/i.test(
            naskah,
          ))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab3 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab3(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /pengurangan\s+sampai(\s+dengan)?\s+10\b|pesta ulang tahun yang hilang|toko roti miko/i.test(
            naskah,
          ))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab4 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab4(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /mengenal\s+bentuk\b|petualangan bentuk di rumah nenek|kota bentuk/i.test(naskah))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab6 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab6(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /penjumlahan\s+dan\s+pengurangan\s+sampai(\s+dengan)?\s+20\b|misi penyelamatan anak kucing|menara penyelamat toki/i.test(
            naskah,
          ))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab5 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab5(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /membilang\s+sampai(\s+dengan)?\s+20\b|bendera kecil untuk lomba|pasar malam kemerdekaan/i.test(
            naskah,
          ))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab7 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab7(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /mengukur\s+panjang\s+benda\b|pesta layang-layang|bengkel ukur kodok/i.test(naskah))),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtkBab8 = useMemo(
    () =>
      !kelasDuaSd(kelas) &&
      !kelasTigaSd(kelas) &&
      (adalahJudulMtk1Bab8(mapel, materi) ||
        (naskahTampilanResmi(naskah) &&
          /mengenal\s+diagram\b|kantin sekolah yang berantakan|toko grosir tupi/i.test(naskah))),
    [naskah, mapel, materi, kelas],
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
  const modulMtk2 = useMemo(() => {
    if (kelasSatuSd(kelas) || kelasEnamSd(kelas)) return null;
    if (adalahJudulMtk2(mapel, materi)) {
      return cariModulMtk2Resmi(materi);
    }
    if (kelasDuaSd(kelas)) {
      return cariModulMtk2DariNaskah(naskah);
    }
    return cariModulMtk2DariNaskah(naskah);
  }, [naskah, mapel, materi, kelas]);
  const pakaiKartuMtk3Bab1 = useMemo(
    () =>
      kelasTigaSd(kelas) &&
      (adalahJudulMtk3Bab1(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK3_BAB1, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk3Ukur = useMemo(
    () =>
      kelasTigaSd(kelas) &&
      (adalahJudulMtk3Ukur(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK3_UKUR, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk3Kalimat = useMemo(
    () =>
      kelasTigaSd(kelas) &&
      (adalahJudulMtk3Kalimat(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK3_KALIMAT, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk3Bangun = useMemo(
    () =>
      kelasTigaSd(kelas) &&
      (adalahJudulMtk3Bangun(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK3_BANGUN, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab1 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab1(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB1, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab2 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab2(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB2, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab3 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab3(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB3, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab4 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab4(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB4, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab5 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab5(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB5, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk4Bab6 = useMemo(
    () =>
      kelasEmpatSd(kelas) &&
      (adalahJudulMtk4Bab6(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK4_BAB6, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk6Bab1 = useMemo(
    () =>
      kelasEnamSd(kelas) &&
      (adalahJudulMtk6Bab1(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK6_BAB1, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk6Bab2 = useMemo(
    () =>
      kelasEnamSd(kelas) &&
      (adalahJudulMtk6Bab2(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK6_BAB2, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk6Bab3 = useMemo(
    () =>
      kelasEnamSd(kelas) &&
      (adalahJudulMtk6Bab3(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK6_BAB3, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk6Bab4 = useMemo(
    () =>
      kelasEnamSd(kelas) &&
      (adalahJudulMtk6Bab4(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK6_BAB4, naskah)),
    [naskah, mapel, materi, kelas],
  );
  const pakaiKartuMtk7Bab1 = useMemo(
    () =>
      /^7\s*SMP\b/i.test(kelas.trim()) &&
      (adalahJudulMtk7Bab1(mapel, materi) ||
        naskahTampilanModulResmi(MODUL_MTK7_BAB1, naskah)),
    [naskah, mapel, materi, kelas],
  );
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
    pakaiKartuMtkBab1 || pakaiKartuMtkBab2 || pakaiKartuMtkBab3 || pakaiKartuMtkBab4 || pakaiKartuMtkBab5 || pakaiKartuMtkBab6 || pakaiKartuMtkBab7 || pakaiKartuMtkBab8;
  const modulResmiLain = useMemo(() => {
    if (kelasDuaSd(kelas) || modulPai2 || modulBindo2 || modulMtk2) return null;
    if (pakaiKartuBab1 || pakaiKartuBab2 || adaKartuMtk || modulPancasila || modulBindo || modulPjok || modulInggris || modulMusik || modulSeniRupa || modulKristen || modulKatolik || modulBuddha || modulHindu || modulKhonghucu) return null;
    return cariModulPai1Resmi(materi) ?? cariModulPai1DariNaskah(naskah);
  }, [pakaiKartuBab1, pakaiKartuBab2, adaKartuMtk, modulPancasila, modulBindo, modulBindo2, modulMtk2, modulPjok, modulInggris, modulMusik, modulSeniRupa, modulKristen, modulKatolik, modulBuddha, modulHindu, modulKhonghucu, modulPai2, materi, naskah, kelas]);
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
    !modulMtk2 &&
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
      modulMtk2 ||
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
      modulMtk2,
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
      modulMtk2 ||
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
      modulMtk2,
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
  if (modulMtk2) {
    return (
      <div className={className}>
        <NaskahMtk2
          modul={modulMtk2}
          kelas={kelas || "2 SD"}
          kelamin={kelamin}
        />
      </div>
    );
  }
  if (pakaiKartuMtk3Bab1) {
    return (
      <div className={className}>
        <NaskahMtk3Bab1 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk3Ukur) {
    return (
      <div className={className}>
        <NaskahMtk3Ukur kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk3Kalimat) {
    return (
      <div className={className}>
        <NaskahMtk3Kalimat kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk3Bangun) {
    return (
      <div className={className}>
        <NaskahMtk3Bangun kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab1) {
    return (
      <div className={className}>
        <NaskahMtk4Bab1 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab2) {
    return (
      <div className={className}>
        <NaskahMtk4Bab2 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab3) {
    return (
      <div className={className}>
        <NaskahMtk4Bab3 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab4) {
    return (
      <div className={className}>
        <NaskahMtk4Bab4 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab5) {
    return (
      <div className={className}>
        <NaskahMtk4Bab5 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk4Bab6) {
    return (
      <div className={className}>
        <NaskahMtk4Bab6 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk6Bab1) {
    return (
      <div className={className}>
        <NaskahMtk6Bab1 kelas={kelas} kelamin={kelamin} />
      </div>
    );
  }
  if (pakaiKartuMtk6Bab2) {
    return (
      <div className={className}>
        <Bab2RasioModule />
      </div>
    );
  }
  if (pakaiKartuMtk6Bab3) {
    return (
      <div className={className}>
        <Bab3KubusBalokModule />
      </div>
    );
  }
  if (pakaiKartuMtk6Bab4) {
    return (
      <div className={className}>
        <Bab4PeluangModule />
      </div>
    );
  }
  if (pakaiKartuMtk7Bab1) {
    return (
      <div className={className}>
        <NaskahMtk7Bab1 kelas={kelas} kelamin={kelamin} />
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
