"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  buatUcapanGuru,
  normalisasiKelaminGuru,
  profilGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { DATA_KURIKULUM, OPSI_LAIN_NYA, daftarMapelUntukKelas } from "@/lib/kurikulum";
import { hurufKunci, pecahBankSoal } from "@/lib/kuis";
import {
  bacaProgres,
  cariSesiBab,
  catatAudioSelesai,
  catatEvaluasiTambahan,
  catatJawabanKuis,
  catatPraktikumSelesai,
  catatSesiModul,
  catatSimulasiSelesai,
  simpanProfil,
  tetapkanTokenIgil,
} from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";
import { JUMLAH_KARTU_MAKS, susunKonsepMateri, UKURAN_BATCH_DOODLE } from "@/lib/konsep-materi";
import {
  bacaModulLokal,
  hapusModulLokalBanyak,
  simpanModulLokal,
} from "@/lib/cache-modul-lokal";
import { kandidatKunciMateri, kunciMateriTutor } from "@/lib/kunci-siswa";
import { adalahPai1Bab1 } from "@/lib/naskah-resmi";
import { naskahPai1Bab1 } from "@/lib/naskah-resmi-pai-1-bab1";
import {
  gantiNamaLengkapKeDepan,
  sapaanTutorRingkas,
  sapaanVoiceTutor,
} from "@/lib/nama-siswa";
import {
  pilihPenjelasanMateri,
  naskahMateriSiap,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";
import {
  bacaPerlambatVoice,
  lajuPutarDariPerlambat,
  type TingkatPerlambat,
} from "@/lib/laju-suara";
import { naskahSapaanUntukSuara } from "@/lib/naskah-lisan";
import { mintaAudioTts, sedangMemutarSapaan } from "@/lib/putar-tts-klien";
import { skalaWaktuKata, type KataWaktu } from "@/lib/tts";
import { PESAN_GAGAL_SUSUN_MATERI } from "@/lib/validasi-naskah-ai";
import { type GambarSisipan } from "@/components/GambarDoodle";
import PemutarAudioGuru, {
  indeksKataAktif,
  type KontrolPemutarGuru,
} from "@/components/PemutarAudioGuru";
import KartuBagianModul from "@/components/modul/KartuBagianModul";
import PanelLatihanModul from "@/components/modul/PanelLatihanModul";
import PanelMateriModul from "@/components/modul/PanelMateriModul";
import PanelPraktikumModul from "@/components/modul/PanelPraktikumModul";
import PanelSilabusModul from "@/components/modul/PanelSilabusModul";
import PanelSimulasiModul from "@/components/modul/PanelSimulasiModul";
import PanelUjianModul from "@/components/modul/PanelUjianModul";
import TeksNaskah from "@/components/TeksNaskah";
import {
  daftarBagianModul,
  type BagianIsi,
  type BagianModul,
} from "@/lib/bagian-modul";
import {
  ArrowLeft,
  ArrowRight,
  Coins,
  Loader2,
  MessageCircleQuestionMark,
  Send,
} from "lucide-react";

type ModeInput = "teks" | "gambar";
type StatusPemutar = "siaga" | "menyiapkan" | "memutar" | "jeda";
type StatusNaskah = "siaga" | "memuat" | "siap" | "galat";
type BagianNaskah = "kurikulum" | "global" | "latihan";

function gabungModulTutor(sebelum: ModulTutor | null, baru: ModulTutor): ModulTutor {
  if (!sebelum) return baru;
  const kurikulumBaru = (baru.curriculum_view ?? "").trim();
  const globalBaru = (baru.global_best_view ?? "").trim();
  return {
    ...sebelum,
    sapaan: baru.sapaan || sebelum.sapaan,
    curriculum_view: kurikulumBaru
      ? baru.curriculum_view
      : sebelum.curriculum_view,
    global_best_view: globalBaru
      ? baru.global_best_view
      : sebelum.global_best_view,
    penjelasan: kurikulumBaru
      ? baru.curriculum_view || baru.penjelasan
      : sebelum.penjelasan,
    sketsaKartu: baru.sketsaKartu?.trim() || sebelum.sketsaKartu,
    svgCode: baru.svgCode || sebelum.svgCode,
    pertanyaan: pecahBankSoal(baru.pertanyaan).pilihanGanda.length
      ? baru.pertanyaan
      : sebelum.pertanyaan,
    kunciJawaban: baru.kunciJawaban?.length
      ? baru.kunciJawaban
      : sebelum.kunciJawaban,
    motivasi: baru.motivasi || sebelum.motivasi,
    referensiUrl: baru.referensiUrl || sebelum.referensiUrl,
    gambarUtama: sebelum.gambarUtama ?? baru.gambarUtama,
    gambarSisipan: sebelum.gambarSisipan?.length
      ? sebelum.gambarSisipan
      : baru.gambarSisipan,
  };
}

function bagianNaskahSiap(
  modul: ModulTutor | null,
  bagian: BagianNaskah,
  kelasSiswa = "",
): boolean {
  if (!modul) return false;
  if (bagian === "kurikulum") {
    return Boolean((modul.curriculum_view ?? "").trim());
  }
  if (bagian === "global") {
    return Boolean((modul.global_best_view ?? "").trim());
  }
  return pecahBankSoal(modul.pertanyaan).pilihanGanda.length >= 4;
}

function modulDariNaskahPai1Bab1(): ModulTutor {
  const isi = naskahPai1Bab1();
  return {
    sapaan: "",
    penjelasan: isi.curriculum_view,
    curriculum_view: isi.curriculum_view,
    global_best_view: isi.global_best_view,
    sketsaKartu: isi.sketsaKartu,
    svgCode: isi.svgCode,
    pertanyaan: isi.pertanyaan,
    kunciJawaban: isi.kunciJawaban.split(",").map((item) => item.trim()),
    motivasi: isi.motivasi,
    referensiUrl: isi.referensiUrl,
  };
}

type ModulTutor = {
  sapaan: string;
  penjelasan: string;
  curriculum_view?: string;
  global_best_view?: string;
  sketsaKartu?: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban?: string[];
  esai?: string;
  kunciEsai?: string[];
  motivasi: string;
  gambarUtama?: string | null;
  gambarSisipan?: GambarSisipan[];
  referensiUrl?: string;
};

type StatusDoodle = "siaga" | "memuat" | "siap" | "gagal";
type TahapBelajar = BagianModul;

type PanduanAjuan = {
  sapaan: string;
  panduanLangkah: string;
  caraKurikulum: string;
  trikBimbel: string;
  dorongan: string;
};

type JejakAjuan = {
  tanya: string;
  jawab: string;
};

type StatusKuotaUi = {
  batasGratis: number;
  sisaGratis: number;
  biayaToken: number;
  saldoToken: number;
};

const KUNCI_HALAMAN_BUKU = "igil-halaman-buku-v1";
const LAJU_BICARA = 0.92;
const KARAKTER_PER_DETIK = 13 * LAJU_BICARA;
const INTERVAL_KETIK_MS = Math.max(32, Math.round(1000 / KARAKTER_PER_DETIK));
const BATAS_POTONGAN_UCAPAN = 120;
const INTERVAL_WASPADA_SUARA_MS = 1600;

type JenisPotonganSuara = "sapaan" | "penjelasan" | "sisa";
type SegmenSuara = { jenis: "sapaan" } | { jenis: "materi" };

type CacheSegmenAudio = {
  url: string;
  kata: KataWaktu[];
  durasi: number;
};

function kunciSegmen(segmen: SegmenSuara): string {
  return segmen.jenis;
}

function suaraSapaanSelesai(selesai: string[]): boolean {
  return selesai.includes("sapaan");
}

type PotonganSuara = {
  teks: string;
  ucapan: SpeechSynthesisUtterance;
  jenis: JenisPotonganSuara;
  offset: number;
  teksPenjelasan: string;
  percobaan: number;
};

function buatUcapan(
  teks: string,
  guruKelas: string,
  kelamin: KelaminGuru,
  perlambat: TingkatPerlambat = 1,
) {
  const ucapan = buatUcapanGuru(teks, profilGuru(guruKelas, kelamin));
  ucapan.rate = Math.max(0.1, Math.min(2, ucapan.rate / perlambat));
  return ucapan;
}

function pecahTeksUcapan(teks: string, batas = BATAS_POTONGAN_UCAPAN): string[] {
  const bersih = teks.replace(/\s+/g, " ").trim();
  if (!bersih) return [];
  if (bersih.length <= batas) return [bersih];

  const potongan: string[] = [];
  const bagian = bersih.split(/(?<=[.!?…;:])\s+/);
  let buffer = "";

  const simpanPotong = (nilai: string) => {
    const isi = nilai.trim();
    if (isi) potongan.push(isi);
  };

  for (const item of bagian) {
    const calon = buffer ? `${buffer} ${item}` : item;
    if (calon.length <= batas) {
      buffer = calon;
      continue;
    }
    if (buffer) simpanPotong(buffer);
    if (item.length <= batas) {
      buffer = item;
      continue;
    }
    for (let i = 0; i < item.length; i += batas) {
      simpanPotong(item.slice(i, i + batas));
    }
    buffer = "";
  }
  if (buffer) simpanPotong(buffer);
  return potongan;
}

function teksQuery(nilai: string | null, cadangan = ""): string {
  const mentah = (nilai ?? "").trim();
  if (!mentah) return cadangan;
  try {
    return decodeURIComponent(mentah.replace(/\+/g, " ")).replace(/\s+/g, " ").trim();
  } catch {
    return mentah.replace(/\+/g, " ").replace(/\s+/g, " ").trim();
  }
}

export default function TutorAI() {
  const router = useRouter();
  const params = useSearchParams();
  const [isMulai, setIsMulai] = useState(() => params.get("mulai") === "1");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("3 SD");
  const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>(() =>
    normalisasiKelaminGuru(params.get("guru")),
  );
  const [modeInput, setModeInput] = useState<ModeInput>("teks");
  const [pilihanMapel, setPilihanMapel] = useState("");
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanBab, setPilihanBab] = useState("");
  const [babManual, setBabManual] = useState("");
  const [gambarHalaman, setGambarHalaman] = useState<string[]>([]);
  const [hasilData, setHasilData] = useState<ModulTutor | null>(null);
  const [statusKurikulum, setStatusKurikulum] = useState<StatusNaskah>("siaga");
  const [statusGlobal, setStatusGlobal] = useState<StatusNaskah>("siaga");
  const [statusLatihan, setStatusLatihan] = useState<StatusNaskah>("siaga");
  const [soalUjian, setSoalUjian] = useState<string[]>([]);
  const [statusUjian, setStatusUjian] = useState<"siaga" | "memuat" | "siap" | "galat">("siaga");
  const [pesanUjian, setPesanUjian] = useState("");
  const [tahapBelajar, setTahapBelajar] = useState<TahapBelajar>("pilih");
  const [audioCompleted, setAudioCompleted] = useState(false);
  const [simulasiLulus, setSimulasiLulus] = useState(false);
  const [pesanKunci, setPesanKunci] = useState("");
  const [sesiMapel, setSesiMapel] = useState("");
  const [sesiMateri, setSesiMateri] = useState("");
  const [statusPemutar, setStatusPemutar] = useState<StatusPemutar>("siaga");
  const [teksAnimasi, setTeksAnimasi] = useState("");
  const [pesanGalat, setPesanGalat] = useState("");
  const [teksAjuan, setTeksAjuan] = useState("");
  const [isLoadingAjuan, setIsLoadingAjuan] = useState(false);
  const [hasilAjuan, setHasilAjuan] = useState<PanduanAjuan | null>(null);
  const [riwayatAjuan, setRiwayatAjuan] = useState<JejakAjuan[]>([]);
  const [pesanAjuan, setPesanAjuan] = useState("");
  const [kuotaAjuan, setKuotaAjuan] = useState<StatusKuotaUi | null>(null);
  const [statusDoodle, setStatusDoodle] = useState<StatusDoodle>("siaga");
  const [sesiAktifId, setSesiAktifId] = useState<string | null>(null);
  const [jawabanKuis, setJawabanKuis] = useState<Record<string, string>>({});
  const [drafEsai, setDrafEsai] = useState<Record<string, string>>({});
  const [jawabanEsai, setJawabanEsai] = useState<Record<string, string>>({});
  const [sudutPandang, setSudutPandang] = useState<SudutPandangMateri | null>(null);
  const [pesanSuara, setPesanSuara] = useState("");

  const timerKetikRef = useRef<number | null>(null);
  const indeksKetikRef = useRef(0);
  const jagaSuaraRef = useRef<number | null>(null);
  const waspadaSuaraRef = useRef<number | null>(null);
  const antrianSuaraRef = useRef<PotonganSuara[]>([]);
  const indeksAntrianRef = useRef(0);
  const sedangMemutarRef = useRef(false);
  const terakhirBicaraRef = useRef(0);
  const pakaiBatasKataRef = useRef(false);
  const sudahGenerateRef = useRef(false);
  const hasilDataRef = useRef<ModulTutor | null>(null);
  const sesiAktifIdRef = useRef<string | null>(null);
  const naskahJalanRef = useRef<Set<BagianNaskah>>(new Set());
  const doodleAbortRef = useRef<AbortController | null>(null);
  const urlAudioRef = useRef<string | null>(null);
  const kelaminAudioRef = useRef<KelaminGuru | null>(null);
  const muatAwalPromiseRef = useRef<Promise<boolean> | null>(null);
  const muatPenuhPromiseRef = useRef<Promise<boolean> | null>(null);
  const audioLengkapRef = useRef(false);
  const waktuAudioRef = useRef(0);
  const pemutarRef = useRef<KontrolPemutarGuru | null>(null);
  const sudahSiapAudioRef = useRef(false);
  const [srcAudio, setSrcAudio] = useState<string | null>(null);
  const [kataWaktu, setKataWaktu] = useState<KataWaktu[]>([]);
  const [indeksKata, setIndeksKata] = useState(-1);
  const [modeChirp, setModeChirp] = useState(false);
  const [waktuAudio, setWaktuAudio] = useState(0);
  const [durasiAudio, setDurasiAudio] = useState(0);
  const [perlambatVoice, setPerlambatVoice] = useState<TingkatPerlambat>(1);
  const perlambatVoiceRef = useRef<TingkatPerlambat>(1);
  const [segmenSuara, setSegmenSuara] = useState<SegmenSuara>({ jenis: "sapaan" });
  const segmenSuaraRef = useRef<SegmenSuara>({ jenis: "sapaan" });
  const cacheSegmenRef = useRef<Map<string, CacheSegmenAudio>>(new Map());
  const topikTerkunciRef = useRef<Set<string>>(new Set());
  const muatSegmenRef = useRef<Map<string, Promise<boolean>>>(new Map());
  const [segmenSelesai, setSegmenSelesai] = useState<string[]>([]);

  const daftarMapel = useMemo(
    () => daftarMapelUntukKelas(kelas),
    [kelas],
  );
  const daftarBab = useMemo(() => {
    if (!pilihanMapel || pilihanMapel === OPSI_LAIN_NYA) return [];
    return DATA_KURIKULUM[kelas]?.[pilihanMapel] ?? [];
  }, [kelas, pilihanMapel]);

  const mapel =
    pilihanMapel === OPSI_LAIN_NYA ? mapelManual : pilihanMapel;
  const bab = pilihanBab === OPSI_LAIN_NYA ? babManual : pilihanBab;

  const penjelasanAktif = hasilData
    ? pilihPenjelasanMateri(hasilData, sudutPandang ?? "kurikulum")
    : "";
  const bankSoal = useMemo(() => {
    const pecah = pecahBankSoal(hasilData?.pertanyaan ?? "");
    return {
      pilihanGanda: pecah.pilihanGanda,
    };
  }, [hasilData?.pertanyaan]);

  const judulMapelSesi = teksQuery(
    params.get("mapel"),
    sesiMapel || (modeInput === "teks" ? mapel : "Berdasarkan Buku"),
  );
  const judulMateriSesi = sesiMateri || (modeInput === "teks" ? bab : "Analisis halaman buku");
  const judulKelasSesi = teksQuery(params.get("kelas"), kelas);
  const opsiBagian = daftarBagianModul(judulMapelSesi);
  const isGenerating =
    statusKurikulum === "memuat" ||
    statusGlobal === "memuat" ||
    statusLatihan === "memuat";

  const sudahPrefillMapel = useRef(false);
  const sudahPrefillBab = useRef(false);
  const kelasTargetRef = useRef<string | null>(null);
  const namaDariProfilSesi = teksQuery(params.get("nama"), "");
  const namaSesi = namaDariProfilSesi || nama;
  const namaSesiRef = useRef(namaSesi);
  namaSesiRef.current = namaSesi;
  hasilDataRef.current = hasilData;
  const sudutPandangRef = useRef<SudutPandangMateri | null>(sudutPandang);
  sudutPandangRef.current = sudutPandang;

  useEffect(() => {
    if (namaDariProfilSesi) setNama(namaDariProfilSesi);
  }, [namaDariProfilSesi]);

  useEffect(() => {
    setIsMulai(params.get("mulai") === "1");
  }, [params]);

  useEffect(() => {
    const profil = bacaProgres().profil;
    const namaQ = namaDariProfilSesi || profil.nama;
    const kelasQ = teksQuery(params.get("kelas"), profil.kelas || "3 SD");
    const modeQ = params.get("mode");
    const guruQ = params.get("guru") || profil.guruKelamin;
    kelasTargetRef.current = kelasQ;
    if (namaQ) setNama(namaQ);
    setKelas(kelasQ);
    setGuruKelamin(normalisasiKelaminGuru(guruQ));
    if (modeQ === "gambar" || modeQ === "teks") setModeInput(modeQ);
    try {
      const mentah = window.sessionStorage.getItem(KUNCI_HALAMAN_BUKU);
      if (mentah) {
        const daftar = JSON.parse(mentah) as unknown;
        if (Array.isArray(daftar)) {
          setGambarHalaman(daftar.filter((item) => typeof item === "string"));
        }
        window.sessionStorage.removeItem(KUNCI_HALAMAN_BUKU);
      }
    } catch {
      window.sessionStorage.removeItem(KUNCI_HALAMAN_BUKU);
    }
    // Prefill sekali dari URL / profil, lalu siswa bisa ganti manual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !sudahPrefillMapel.current &&
      kelasTargetRef.current &&
      kelas !== kelasTargetRef.current
    ) {
      return;
    }

    const mapelQ = params.get("mapel");
    if (!sudahPrefillMapel.current) {
      if (mapelQ && daftarMapel.includes(mapelQ)) {
        setPilihanMapel(mapelQ);
      } else if (mapelQ && daftarMapel.length > 0) {
        setPilihanMapel(OPSI_LAIN_NYA);
        setMapelManual(mapelQ);
      } else if (daftarMapel.length > 0) {
        setPilihanMapel(daftarMapel[0]);
      }
      sudahPrefillMapel.current = daftarMapel.length > 0 || !mapelQ;
      return;
    }

    if (daftarMapel.length > 0) {
      setPilihanMapel(daftarMapel[0]);
    } else {
      setPilihanMapel("");
    }
    setMapelManual("");
    setBabManual("");
    sudahPrefillBab.current = false;
  }, [kelas, daftarMapel]);

  useEffect(() => {
    if (pilihanMapel === OPSI_LAIN_NYA) {
      const materiQ = params.get("materi");
      setPilihanBab(OPSI_LAIN_NYA);
      if (!sudahPrefillBab.current && materiQ) setBabManual(materiQ);
      sudahPrefillBab.current = true;
      return;
    }

    const materiQ = params.get("materi");
    if (!sudahPrefillBab.current) {
      if (materiQ && daftarBab.includes(materiQ)) {
        setPilihanBab(materiQ);
        setBabManual("");
      } else if (materiQ && daftarBab.length > 0) {
        setPilihanBab(OPSI_LAIN_NYA);
        setBabManual(materiQ);
      } else if (daftarBab.length > 0) {
        setPilihanBab(daftarBab[0]);
      }
      if (daftarBab.length > 0 || pilihanMapel) sudahPrefillBab.current = true;
      return;
    }

    if (daftarBab.length > 0) {
      setPilihanBab(daftarBab[0]);
      setBabManual("");
    } else {
      setPilihanBab(OPSI_LAIN_NYA);
    }
  }, [kelas, pilihanMapel, daftarBab]);

  useEffect(() => {
    const muatSuara = () => {
      window.speechSynthesis.getVoices();
    };
    muatSuara();
    window.speechSynthesis.addEventListener("voiceschanged", muatSuara);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", muatSuara);
      window.speechSynthesis.cancel();
      if (timerKetikRef.current) window.clearInterval(timerKetikRef.current);
      if (jagaSuaraRef.current) window.clearInterval(jagaSuaraRef.current);
      if (waspadaSuaraRef.current) window.clearInterval(waspadaSuaraRef.current);
      doodleAbortRef.current?.abort();
      if (urlAudioRef.current) URL.revokeObjectURL(urlAudioRef.current);
    };
  }, []);

  useEffect(() => {
    const tingkat = bacaPerlambatVoice();
    perlambatVoiceRef.current = tingkat;
    setPerlambatVoice(tingkat);
  }, []);

  const hentikanKetik = () => {
    if (timerKetikRef.current) {
      window.clearInterval(timerKetikRef.current);
      timerKetikRef.current = null;
    }
  };

  const hentikanJagaSuara = () => {
    if (jagaSuaraRef.current) {
      window.clearInterval(jagaSuaraRef.current);
      jagaSuaraRef.current = null;
    }
    if (waspadaSuaraRef.current) {
      window.clearInterval(waspadaSuaraRef.current);
      waspadaSuaraRef.current = null;
    }
  };

  const mulaiKetikDari = (teks: string, mulaiDari: number) => {
    hentikanKetik();
    indeksKetikRef.current = mulaiDari;
    setTeksAnimasi(teks.slice(0, mulaiDari));
    timerKetikRef.current = window.setInterval(() => {
      if (pakaiBatasKataRef.current) return;
      const i = indeksKetikRef.current + 1;
      indeksKetikRef.current = i;
      setTeksAnimasi(teks.slice(0, i));
      if (i >= teks.length) hentikanKetik();
    }, INTERVAL_KETIK_MS * perlambatVoiceRef.current);
  };

  const pulihkanSesiBab = () => {
    const namaAktif = namaSesiRef.current || namaSesi;
    const mapelKirim = teksQuery(
      params.get("mapel"),
      modeInput === "teks" ? mapel : sesiMapel || "Berdasarkan Buku",
    );
    const materiKirim = teksQuery(
      params.get("materi"),
      modeInput === "teks" ? bab : sesiMateri || "Analisis halaman buku",
    );
    const kelasKirim = teksQuery(params.get("kelas"), kelas);
    if (!namaAktif.trim() || !mapelKirim || !materiKirim) return null;
    const sesiLama = cariSesiBab({
      nama: namaAktif,
      kelas: kelasKirim,
      mapel: mapelKirim,
      materi: materiKirim,
    });
    if (!sesiLama) return null;
    sesiAktifIdRef.current = sesiLama.id;
    setSesiAktifId(sesiLama.id);
    if (sesiLama.audioCompleted) setAudioCompleted(true);
    if (sesiLama.simulasiSelesai) setSimulasiLulus(true);
    return sesiLama;
  };

  const pastikanSesiAktif = () => {
    if (sesiAktifIdRef.current) return sesiAktifIdRef.current;
    const sesiLama = pulihkanSesiBab();
    if (sesiLama) return sesiLama.id;
    const sesi = catatSesiModul({
      nama: namaSesiRef.current || namaSesi,
      kelas: teksQuery(params.get("kelas"), kelas),
      mapel:
        modeInput === "teks"
          ? teksQuery(params.get("mapel"), mapel)
          : sesiMapel || "Berdasarkan Buku",
      materi:
        modeInput === "teks"
          ? teksQuery(params.get("materi"), bab)
          : sesiMateri || "Analisis halaman buku",
      mode: modeInput,
      catatanEvaluasi: hasilDataRef.current?.motivasi || "",
      kunciJawaban: hasilDataRef.current?.kunciJawaban,
      kuisTotal:
        pecahBankSoal(hasilDataRef.current?.pertanyaan ?? "").pilihanGanda
          .length + 3,
      jumlahLatihan: pecahBankSoal(hasilDataRef.current?.pertanyaan ?? "")
        .pilihanGanda.length,
    });
    sesiAktifIdRef.current = sesi.id;
    setSesiAktifId(sesi.id);
    return sesi.id;
  };

  const tandaiAudioSelesai = () => {
    setAudioCompleted(true);
    setPesanKunci("");
    catatAudioSelesai(pastikanSesiAktif());
  };

  const tandaiSegmenSelesai = () => {
    const kunci = kunciSegmen(segmenSuaraRef.current);
    setSegmenSelesai((sebelum) => {
      const berikutnya = sebelum.includes(kunci) ? sebelum : [...sebelum, kunci];
      if (suaraSapaanSelesai(berikutnya)) {
        tandaiAudioSelesai();
      }
      return berikutnya;
    });
  };

  const bicaraPotonganSaatIni = () => {
    return;
  };

  const mulaiJagaSuara = () => {
    hentikanJagaSuara();
    waspadaSuaraRef.current = window.setInterval(() => {
      if (!sedangMemutarRef.current) return;
      if (window.speechSynthesis.paused || window.speechSynthesis.speaking) return;
      if (Date.now() - terakhirBicaraRef.current < 2500) return;
      const item = antrianSuaraRef.current[indeksAntrianRef.current];
      if (item && item.percobaan >= 3) {
        indeksAntrianRef.current += 1;
      }
      bicaraPotonganSaatIni();
    }, INTERVAL_WASPADA_SUARA_MS);
  };

  const resetPemutar = () => {
    sedangMemutarRef.current = false;
    antrianSuaraRef.current = [];
    indeksAntrianRef.current = 0;
    window.speechSynthesis.cancel();
    hentikanKetik();
    hentikanJagaSuara();
    pakaiBatasKataRef.current = false;
    indeksKetikRef.current = 0;
    for (const item of cacheSegmenRef.current.values()) {
      URL.revokeObjectURL(item.url);
    }
    cacheSegmenRef.current.clear();
    muatSegmenRef.current.clear();
    urlAudioRef.current = null;
    setSrcAudio(null);
    setKataWaktu([]);
    setIndeksKata(-1);
    setModeChirp(false);
    setStatusPemutar("siaga");
    setWaktuAudio(0);
    setDurasiAudio(0);
    waktuAudioRef.current = 0;
    kelaminAudioRef.current = null;
    muatAwalPromiseRef.current = null;
    muatPenuhPromiseRef.current = null;
    audioLengkapRef.current = false;
    sudahSiapAudioRef.current = false;
    setSegmenSelesai([]);
    segmenSuaraRef.current = { jenis: "sapaan" };
    setSegmenSuara({ jenis: "sapaan" });
    setPesanSuara("");
  };

  const muatIlustrasiDoodle = async (modul: ModulTutor) => {
    doodleAbortRef.current?.abort();
    const pengontrol = new AbortController();
    doodleAbortRef.current = pengontrol;
    setStatusDoodle("memuat");

    const naskahDoodle = pilihPenjelasanMateri(modul, "kurikulum");
    if (
      adalahPai1Bab1(
        kelas,
        modeInput === "teks" ? mapel : "Berdasarkan Buku",
        modeInput === "teks" ? bab : "Analisis AI",
      ) ||
      !naskahMateriSiap(naskahDoodle)
    ) {
      setStatusDoodle("siaga");
      return;
    }
    const jumlahKartu = Math.min(
      susunKonsepMateri(
        modeInput === "teks" ? bab : "Analisis AI",
        naskahDoodle,
        kelas,
      ).kartu.length,
      JUMLAH_KARTU_MAKS,
    );
    let terkumpul: GambarSisipan[] = [];

    try {
      for (let offset = 0; offset < jumlahKartu; offset += UKURAN_BATCH_DOODLE) {
        if (pengontrol.signal.aborted) return;

        const respons = await fetch("/api/tutor/ilustrasi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: pengontrol.signal,
          body: JSON.stringify({
            kelas,
            mapel: modeInput === "teks" ? mapel : "Berdasarkan Buku",
            materi: modeInput === "teks" ? bab : "Analisis AI",
            penjelasan: naskahDoodle,
            sketsaKartu: modul.sketsaKartu,
            offset,
            batas: UKURAN_BATCH_DOODLE,
          }),
        });
        const data = (await respons.json()) as {
          berhasil?: boolean;
          gambarUtama?: string | null;
          gambarSisipan?: GambarSisipan[];
        };

        if (pengontrol.signal.aborted) return;

        if (data.berhasil && (data.gambarSisipan?.length ?? 0) > 0) {
          const peta = new Map<number, GambarSisipan>();
          for (const item of terkumpul) peta.set(item.setelahParagraf, item);
          for (const item of data.gambarSisipan ?? []) {
            peta.set(item.setelahParagraf, item);
          }
          terkumpul = [...peta.values()].sort(
            (a, b) => a.setelahParagraf - b.setelahParagraf,
          );
          setHasilData((sebelum) =>
            sebelum
              ? {
                  ...sebelum,
                  gambarUtama: terkumpul[0]?.src ?? data.gambarUtama ?? null,
                  gambarSisipan: terkumpul,
                }
              : sebelum,
          );
        }
      }

      setStatusDoodle(terkumpul.length > 0 ? "siap" : "gagal");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusDoodle(terkumpul.length > 0 ? "siap" : "gagal");
    }
  };

  const tetapkanStatusNaskah = (
    bagian: BagianNaskah,
    status: StatusNaskah,
  ) => {
    if (bagian === "kurikulum") setStatusKurikulum(status);
    else if (bagian === "global") setStatusGlobal(status);
    else setStatusLatihan(status);
  };

  const terapkanBagianModul = (
    dataModul: ModulTutor,
    mapelKirim: string,
    materiKirim: string,
    kelasKirim: string,
    bagian: BagianNaskah,
    dariCache = false,
  ) => {
    const namaAktif = namaSesiRef.current;
    const gabung = gabungModulTutor(hasilDataRef.current, {
      ...dataModul,
      sapaan: sapaanVoiceTutor(
        namaAktif,
        mapelKirim,
        modeInput === "teks" ? materiKirim : "Analisis halaman buku",
      ),
      curriculum_view: gantiNamaLengkapKeDepan(
        dataModul.curriculum_view || "",
        namaAktif,
      ),
      global_best_view: gantiNamaLengkapKeDepan(
        dataModul.global_best_view || "",
        namaAktif,
      ),
      penjelasan: gantiNamaLengkapKeDepan(
        dataModul.curriculum_view || dataModul.penjelasan || "",
        namaAktif,
      ),
    });
    hasilDataRef.current = gabung;
    setHasilData(gabung);
    tetapkanStatusNaskah(bagian, "siap");
    setSesiMapel(mapelKirim);
    setSesiMateri(modeInput === "teks" ? materiKirim : "Analisis halaman buku");
    simpanProfil({ nama: namaAktif, kelas: kelasKirim, guruKelamin });
    if (!sesiAktifIdRef.current) {
      const sesiLama = pulihkanSesiBab();
      if (!sesiLama) {
        const sesi = catatSesiModul({
          nama: namaAktif,
          kelas: kelasKirim,
          mapel: mapelKirim,
          materi: materiKirim,
          mode: modeInput,
          catatanEvaluasi: gabung.motivasi,
          kunciJawaban: gabung.kunciJawaban,
          kuisTotal: pecahBankSoal(gabung.pertanyaan).pilihanGanda.length + 3,
          jumlahLatihan: pecahBankSoal(gabung.pertanyaan).pilihanGanda.length,
        });
        sesiAktifIdRef.current = sesi.id;
        setSesiAktifId(sesi.id);
      }
    }
    void muatKuota();
    if (
      bagian === "kurikulum" &&
      naskahMateriSiap(gabung.curriculum_view) &&
      !(gabung.gambarSisipan?.length) &&
      !adalahPai1Bab1(kelasKirim, mapelKirim, materiKirim)
    ) {
      void muatIlustrasiDoodle(gabung);
    }
    if (bagian === "latihan") {
      setJawabanKuis({});
    }
    if (
      modeInput === "teks" &&
      !dariCache &&
      !topikTerkunciRef.current.has(
        kunciMateriTutor(kelasKirim, mapelKirim, materiKirim),
      )
    ) {
      void fetch("/api/studio-kreator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: namaAktif,
          kelas: kelasKirim,
          mapel: mapelKirim,
          materi: materiKirim,
          data: gabung,
        }),
      }).catch(() => {
        console.warn("[tutor] gagal mengirim cache modul ke server");
      });
    }
    return gabung;
  };

  const intipModulTersimpan = async (
    kelasKirim: string,
    mapelKirim: string,
    materiKirim: string,
  ): Promise<ModulTutor | null> => {
    try {
      const intip = new URLSearchParams({
        nama: namaSesiRef.current,
        kelas: kelasKirim,
        mapel: mapelKirim,
        materi: materiKirim,
      });
      const topicId = kunciMateriTutor(kelasKirim, mapelKirim, materiKirim);
      const peek = await fetch(`/api/modul?${intip.toString()}`, {
        cache: topikTerkunciRef.current.has(topicId)
          ? "force-cache"
          : "no-store",
      });
      const cacheJson = (await peek.json()) as {
        berhasil?: boolean;
        ada?: boolean;
        isLocked?: boolean;
        data?: ModulTutor;
      };
      if (cacheJson.isLocked) {
        topikTerkunciRef.current.add(topicId);
      }
      if (cacheJson.berhasil && cacheJson.ada && cacheJson.data) {
        return cacheJson.data;
      }
      if (cacheJson.berhasil && cacheJson.ada === false) {
        hapusModulLokalBanyak(
          kandidatKunciMateri(kelasKirim, mapelKirim, materiKirim),
        );
      }
    } catch {
      hapusModulLokalBanyak(
        kandidatKunciMateri(kelasKirim, mapelKirim, materiKirim),
      );
    }
    return null;
  };

  const mintaBagianNaskah = async (
    kelasKirim: string,
    mapelKirim: string,
    materiKirim: string,
    bagian: BagianNaskah,
  ) => {
    try {
      const respons = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(120_000),
        body: JSON.stringify({
          nama: namaSesiRef.current,
          kelas: kelasKirim,
          mapel: mapelKirim,
          materi: modeInput === "teks" ? materiKirim : "Analisis AI",
          gambar: modeInput === "gambar" ? gambarHalaman : null,
          bagian,
        }),
      });
      const teks = await respons.text();
      try {
        return JSON.parse(teks) as {
          berhasil?: boolean;
          pesan?: string;
          dariCache?: boolean;
          data?: ModulTutor;
        };
      } catch {
        return {
          berhasil: false,
          pesan: respons.ok
            ? "Respons server tidak terbaca. Ketuk Coba susun lagi."
            : "Server memutus koneksi saat menyusun naskah. Ketuk Coba susun lagi.",
        };
      }
    } catch (error) {
      const timeout =
        (error instanceof DOMException && error.name === "TimeoutError") ||
        (error instanceof Error && /timeout|timed out|aborted/i.test(error.message));
      return {
        berhasil: false,
        pesan: timeout
          ? "Penyusunan naskah terlalu lama. Ketuk Coba susun lagi."
          : "Gagal terhubung ke server. Periksa koneksi, lalu ketuk Coba susun lagi.",
      };
    }
  };

  const muatBagianNaskah = async (bagian: BagianNaskah) => {
    if (!namaSesiRef.current.trim()) {
      setPesanGalat("Kapten, mohon isi Nama Siswa terlebih dahulu.");
      tetapkanStatusNaskah(bagian, "galat");
      return;
    }

    const kelasKirim = (params.get("kelas") || kelas).trim();
    const mapelKirim =
      modeInput === "teks"
        ? (params.get("mapel") || mapel).trim()
        : "Berdasarkan Buku";
    const materiKirim =
      modeInput === "teks"
        ? (params.get("materi") || bab).trim()
        : "Analisis AI";

    if (modeInput === "teks") {
      if (!mapelKirim) {
        setPesanGalat("Mohon isi Mata Pelajaran.");
        tetapkanStatusNaskah(bagian, "galat");
        return;
      }
      if (!materiKirim) {
        setPesanGalat("Mohon isi Materi Pembahasan.");
        tetapkanStatusNaskah(bagian, "galat");
        return;
      }
    } else if (gambarHalaman.length === 0) {
      setPesanGalat("Mohon unggah foto halaman buku terlebih dahulu.");
      tetapkanStatusNaskah(bagian, "galat");
      return;
    }

    if (naskahJalanRef.current.size > 0 && !naskahJalanRef.current.has(bagian)) {
      return;
    }
    if (bagianNaskahSiap(hasilDataRef.current, bagian, kelasKirim)) {
      tetapkanStatusNaskah(bagian, "siap");
      if (
        bagian === "kurikulum" &&
        hasilDataRef.current &&
        !(hasilDataRef.current.gambarSisipan?.length) &&
        !adalahPai1Bab1(kelasKirim, mapelKirim, materiKirim)
      ) {
        void muatIlustrasiDoodle(hasilDataRef.current);
      }
      return;
    }
    const topicId = kunciMateriTutor(kelasKirim, mapelKirim, materiKirim);
    if (
      modeInput === "teks" &&
      adalahPai1Bab1(kelasKirim, mapelKirim, materiKirim)
    ) {
      const dariServer = await intipModulTersimpan(
        kelasKirim,
        mapelKirim,
        materiKirim,
      );
      if (dariServer && bagianNaskahSiap(dariServer, bagian, kelasKirim)) {
        const gabung = terapkanBagianModul(
          dariServer,
          mapelKirim,
          materiKirim,
          kelasKirim,
          bagian,
          true,
        );
        simpanModulLokal(topicId, gabung);
        tetapkanStatusNaskah(bagian, "siap");
        if (
          bagian === "kurikulum" &&
          !(gabung.gambarSisipan?.length)
        ) {
          void muatIlustrasiDoodle(gabung);
        }
        return;
      }
    }
    if (naskahJalanRef.current.has(bagian)) return;

    if (modeInput === "teks") {
      const dariServer = await intipModulTersimpan(
        kelasKirim,
        mapelKirim,
        materiKirim,
      );
      if (dariServer && bagianNaskahSiap(dariServer, bagian, kelasKirim)) {
        const gabung = terapkanBagianModul(
          dariServer,
          mapelKirim,
          materiKirim,
          kelasKirim,
          bagian,
          true,
        );
        simpanModulLokal(topicId, gabung);
        tetapkanStatusNaskah(bagian, "siap");
        return;
      }
    }
    const lokal = bacaModulLokal<ModulTutor>(topicId);
    if (lokal && bagianNaskahSiap(lokal, bagian, kelasKirim)) {
      terapkanBagianModul(
        lokal,
        mapelKirim,
        materiKirim,
        kelasKirim,
        bagian,
        true,
      );
      return;
    }

    naskahJalanRef.current.add(bagian);
    setPesanGalat("");
    tetapkanStatusNaskah(bagian, "memuat");

    const selesai = (status: StatusNaskah) => {
      naskahJalanRef.current.delete(bagian);
      tetapkanStatusNaskah(bagian, status);
    };

    try {
      if (modeInput === "teks") {
        const cacheAwal = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheAwal && bagianNaskahSiap(cacheAwal, bagian, kelasKirim)) {
          const gabung = terapkanBagianModul(
            cacheAwal,
            mapelKirim,
            materiKirim,
            kelasKirim,
            bagian,
            true,
          );
          simpanModulLokal(topicId, gabung);
          selesai("siap");
          return;
        }
      }

      const data = await mintaBagianNaskah(
        kelasKirim,
        mapelKirim,
        materiKirim,
        bagian,
      );

      if (data.berhasil && data.data && bagianNaskahSiap(data.data, bagian, kelasKirim)) {
        const gabung = terapkanBagianModul(
          data.data,
          mapelKirim,
          materiKirim,
          kelasKirim,
          bagian,
          Boolean(data.dariCache),
        );
        if (modeInput === "teks") {
          simpanModulLokal(topicId, gabung);
        }
        selesai("siap");
        return;
      }

      if (modeInput === "teks") {
        const cacheSetelah = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheSetelah && bagianNaskahSiap(cacheSetelah, bagian, kelasKirim)) {
          const gabung = terapkanBagianModul(
            cacheSetelah,
            mapelKirim,
            materiKirim,
            kelasKirim,
            bagian,
            true,
          );
          simpanModulLokal(topicId, gabung);
          selesai("siap");
          return;
        }
      }

      setPesanGalat(data.pesan || PESAN_GAGAL_SUSUN_MATERI);
      selesai("galat");
    } catch {
      if (modeInput === "teks") {
        const cacheJaringan = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheJaringan && bagianNaskahSiap(cacheJaringan, bagian, kelasKirim)) {
          const gabung = terapkanBagianModul(
            cacheJaringan,
            mapelKirim,
            materiKirim,
            kelasKirim,
            bagian,
            true,
          );
          simpanModulLokal(topicId, gabung);
          selesai("siap");
          return;
        }
      }
      setPesanGalat(PESAN_GAGAL_SUSUN_MATERI);
      selesai("galat");
    }
  };

  const muatUjianAcak = async () => {
    if (statusUjian === "memuat" || statusUjian === "siap") return;
    const kelasKirim = teksQuery(params.get("kelas"), kelas);
    const mapelKirim =
      modeInput === "teks"
        ? teksQuery(params.get("mapel"), mapel)
        : sesiMapel || "Berdasarkan Buku";
    const materiKirim =
      modeInput === "teks"
        ? teksQuery(params.get("materi"), bab)
        : sesiMateri || "Analisis halaman buku";
    setStatusUjian("memuat");
    setPesanUjian("");
    try {
      const res = await fetch("/api/tutor/ujian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: namaSesiRef.current,
          kelas: kelasKirim,
          mapel: mapelKirim,
          materi: materiKirim,
        }),
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        soal?: string[];
        pesan?: string;
      };
      if (!res.ok || !json.berhasil || !json.soal?.length) {
        setStatusUjian("galat");
        setPesanUjian(json.pesan || "Gagal menyusun soal ujian acak.");
        return;
      }
      setSoalUjian(json.soal);
      setStatusUjian("siap");
    } catch {
      setStatusUjian("galat");
      setPesanUjian("Tidak bisa menghubungi server ujian.");
    }
  };

  const bukaBagian = (bagian: BagianIsi) => {
    if (
      statusKurikulum === "memuat" ||
      statusGlobal === "memuat" ||
      statusLatihan === "memuat"
    ) {
      return;
    }
    if (tahapBelajar === bagian) {
      setPesanGalat("");
      setPesanKunci("");
      setTahapBelajar("pilih");
      return;
    }
    setPesanGalat("");
    setPesanKunci("");
    setTahapBelajar(bagian);
    if (bagian === "materi") {
      setSudutPandang((sebelum) => sebelum ?? "kurikulum");
      void muatBagianNaskah("kurikulum");
    }
    if (bagian === "latihan") {
      void muatBagianNaskah("latihan");
    }
    if (bagian === "ujian") {
      void muatUjianAcak();
    }
    window.setTimeout(() => {
      document
        .getElementById(`kartu-bagian-${bagian}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const kunciSesiMulai = `${params.get("mulai")}|${namaSesi}|${params.get("mapel")}|${params.get("materi")}|${params.get("r")}`;

  useEffect(() => {
    if (params.get("mulai") !== "1") return;
    sudahGenerateRef.current = false;
    resetPemutar();
    setHasilData(null);
    hasilDataRef.current = null;
    setStatusKurikulum("siaga");
    setStatusGlobal("siaga");
    setStatusLatihan("siaga");
    setSudutPandang(null);
    sesiAktifIdRef.current = null;
    naskahJalanRef.current.clear();
    setSesiAktifId(null);
    setAudioCompleted(false);
    setSimulasiLulus(false);
    setPesanKunci("");
    setTahapBelajar("pilih");
    const mapelKirim = teksQuery(params.get("mapel"), "");
    const materiKirim = teksQuery(params.get("materi"), "");
    const kelasKirim = teksQuery(params.get("kelas"), kelas);
    if (namaSesi.trim() && mapelKirim && materiKirim) {
      const sesiLama = cariSesiBab({
        nama: namaSesi,
        kelas: kelasKirim,
        mapel: mapelKirim,
        materi: materiKirim,
      });
      if (sesiLama) {
        sesiAktifIdRef.current = sesiLama.id;
        setSesiAktifId(sesiLama.id);
        if (sesiLama.audioCompleted) setAudioCompleted(true);
        if (sesiLama.simulasiSelesai) setSimulasiLulus(true);
      }
    }
  }, [kunciSesiMulai]);

  useEffect(() => {
    if (params.get("mulai") !== "1" || modeInput !== "teks") return;
    const kelasKirim = teksQuery(params.get("kelas"), kelas);
    const mapelKirim = teksQuery(params.get("mapel"), "");
    const materiKirim = teksQuery(params.get("materi"), "");
    if (!mapelKirim || !materiKirim) return;

    const topicId = kunciMateriTutor(kelasKirim, mapelKirim, materiKirim);
    const tandaiSiap = (modul: ModulTutor) => {
      if ((modul.curriculum_view ?? "").trim()) setStatusKurikulum("siap");
      if ((modul.global_best_view ?? "").trim()) setStatusGlobal("siap");
      if (pecahBankSoal(modul.pertanyaan).pilihanGanda.length >= 4) {
        setStatusLatihan("siap");
      }
    };
    const lokal = bacaModulLokal<ModulTutor>(topicId);
    let batal = false;
    void intipModulTersimpan(kelasKirim, mapelKirim, materiKirim).then((data) => {
      if (batal) return;
      if (data) {
        const gabung = gabungModulTutor(lokal, data);
        hasilDataRef.current = gabung;
        setHasilData(gabung);
        simpanModulLokal(topicId, gabung);
        tandaiSiap(gabung);
        return;
      }
      if (lokal) {
        hasilDataRef.current = lokal;
        setHasilData(lokal);
        tandaiSiap(lokal);
        return;
      }
      if (adalahPai1Bab1(kelasKirim, mapelKirim, materiKirim)) {
        const gabung = modulDariNaskahPai1Bab1();
        hasilDataRef.current = gabung;
        setHasilData(gabung);
        tandaiSiap(gabung);
      }
    });
    return () => {
      batal = true;
    };
  }, [kunciSesiMulai, modeInput]);

  useEffect(() => {
    if (params.get("mulai") !== "1") return;
    setTahapBelajar("pilih");
  }, [kunciSesiMulai, params]);

  useEffect(() => {
    if (params.get("mulai") !== "1" || modeInput !== "gambar" || hasilData) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (!sudahGenerateRef.current && gambarHalaman.length === 0) {
        setPesanGalat("Mohon unggah foto halaman buku terlebih dahulu.");
      }
    }, 500);
    return () => window.clearTimeout(timer);
  }, [modeInput, gambarHalaman, hasilData, params]);

  const muatKuota = async () => {
    if (!namaSesiRef.current.trim()) return;
    try {
      const respons = await fetch(
        `/api/tutor?nama=${encodeURIComponent(namaSesiRef.current)}&kelas=${encodeURIComponent(kelas)}`,
      );
      const data = (await respons.json()) as {
        berhasil?: boolean;
        kuota?: StatusKuotaUi;
      };
      if (data.berhasil && data.kuota) setKuotaAjuan(data.kuota);
    } catch {
      /* kuota tampil saat pertanyaan dikirim */
    }
  };

  const tanganiAjuanPertanyaan = async (pakaiToken = false) => {
    if (!teksAjuan.trim()) {
      setPesanAjuan("Tuliskan pertanyaanmu terlebih dahulu.");
      return;
    }

    setPesanAjuan("");
    setIsLoadingAjuan(true);

    try {
      const respons = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: namaSesiRef.current,
          kelas,
          mapel: modeInput === "teks" ? mapel : "Berdasarkan Buku",
          materi: modeInput === "teks" ? bab : "Analisis AI",
          gambar: modeInput === "gambar" ? gambarHalaman : null,
          ajuan: teksAjuan.trim(),
          pakaiToken,
          riwayat: riwayatAjuan.slice(-5),
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        kode?: string;
        kuota?: StatusKuotaUi;
        data?: PanduanAjuan;
      };

      if (data.kuota) {
        setKuotaAjuan(data.kuota);
        if (pakaiToken && typeof data.kuota.saldoToken === "number") {
          tetapkanTokenIgil(data.kuota.saldoToken);
        }
      }

      if (data.berhasil && data.data) {
        const tanya = teksAjuan.trim();
        setHasilAjuan({
          ...data.data,
          sapaan: sapaanTutorRingkas(namaSesiRef.current, data.data.sapaan),
        });
        setRiwayatAjuan((sebelum) =>
          [...sebelum, { tanya, jawab: data.data?.panduanLangkah || "" }].slice(-5),
        );
        if (sesiAktifId && data.data.dorongan) {
          catatEvaluasiTambahan(sesiAktifId, data.data.dorongan);
        }
      } else {
        setPesanAjuan(data.pesan || "Panduan gagal disusun.");
      }
    } catch {
      setPesanAjuan("Gagal terhubung ke server.");
    }
    setIsLoadingAjuan(false);
  };

  const naskahDariSegmen = (segmen: SegmenSuara): string => {
    if (segmen.jenis !== "sapaan") return "";
    const judulMapel = teksQuery(
      params.get("mapel"),
      sesiMapel || (modeInput === "teks" ? mapel : "Berdasarkan Buku"),
    );
    const judulMateri = teksQuery(
      params.get("materi"),
      sesiMateri || (modeInput === "teks" ? bab : "Analisis halaman buku"),
    );
    return naskahSapaanUntukSuara(namaSesiRef.current, judulMapel, judulMateri);
  };

  const kunciCacheSegmen = (
    segmen: SegmenSuara,
    kelaminSuara: KelaminGuru,
  ) =>
    `${kunciSegmen(segmen)}|${segmen.jenis === "materi" ? sudutPandangRef.current ?? "kurikulum" : "sapaan"}|${kelaminSuara}|${namaSesiRef.current}`;

  const pasangCacheSegmen = (item: CacheSegmenAudio, kelaminSuara: KelaminGuru) => {
    urlAudioRef.current = item.url;
    kelaminAudioRef.current = kelaminSuara;
    audioLengkapRef.current = true;
    setSrcAudio(item.url);
    setKataWaktu(item.kata);
    setDurasiAudio(item.durasi);
    setModeChirp(true);
  };

  const mintaAudioSegmen = async (
    segmen: SegmenSuara,
    kelaminSuara: KelaminGuru = guruKelamin,
    pasang = true,
  ): Promise<boolean> => {
    if (segmen.jenis !== "sapaan") return false;
    const kunci = kunciCacheSegmen(segmen, kelaminSuara);
    const cached = cacheSegmenRef.current.get(kunci);
    if (cached) {
      if (pasang && kunciSegmen(segmenSuaraRef.current) === kunciSegmen(segmen)) {
        pasangCacheSegmen(cached, kelaminSuara);
      }
      return true;
    }
    const sedang = muatSegmenRef.current.get(kunci);
    if (sedang) {
      const ok = await sedang;
      const ulang = cacheSegmenRef.current.get(kunci);
      if (
        ok &&
        ulang &&
        pasang &&
        kunciSegmen(segmenSuaraRef.current) === kunciSegmen(segmen)
      ) {
        pasangCacheSegmen(ulang, kelaminSuara);
      }
      return ok;
    }

    const permintaan = (async () => {
      const naskah = naskahDariSegmen(segmen);
      if (!naskah) return false;
      try {
        const hasil = await mintaAudioTts(naskah, kelaminSuara, kelas, {
          persist: true,
          hanyaCache: segmen.jenis === "sapaan",
        });
        if (!hasil) {
          return false;
        }
        cacheSegmenRef.current.set(kunci, {
          url: hasil.url,
          kata: hasil.kata,
          durasi: hasil.durasi,
        });
        setPesanSuara("");
        return true;
      } catch {
        return false;
      } finally {
        muatSegmenRef.current.delete(kunci);
      }
    })();

    muatSegmenRef.current.set(kunci, permintaan);
    const ok = await permintaan;
    const item = cacheSegmenRef.current.get(kunci);
    if (
      ok &&
      item &&
      pasang &&
      kunciSegmen(segmenSuaraRef.current) === kunciSegmen(segmen)
    ) {
      pasangCacheSegmen(item, kelaminSuara);
    }
    return ok;
  };

  const putarSegmen = async (
    segmen: SegmenSuara,
    dariAwal = true,
  ) => {
    if (segmen.jenis !== "sapaan") {
      setStatusPemutar("siaga");
      return;
    }
    window.speechSynthesis.cancel();
    hentikanKetik();
    hentikanJagaSuara();
    segmenSuaraRef.current = segmen;
    setSegmenSuara(segmen);
    setStatusPemutar("menyiapkan");
    setPesanSuara("");
    if (dariAwal) {
      setWaktuAudio(0);
      waktuAudioRef.current = 0;
    }

    const siap = await mintaAudioSegmen(segmen, guruKelamin, true);
    if (kunciSegmen(segmenSuaraRef.current) !== kunciSegmen(segmen)) return;
    if (siap && urlAudioRef.current) {
      sedangMemutarRef.current = true;
      setModeChirp(true);
      setStatusPemutar("memutar");
      try {
        if (dariAwal) {
          await pemutarRef.current?.mainkanDariAwal(urlAudioRef.current);
        } else {
          await pemutarRef.current?.mainkanDari(
            urlAudioRef.current,
            waktuAudioRef.current,
          );
        }
        return;
      } catch {
        // Autoplay ditolak browser: sapaan tetap tanpa tombol PUTAR.
      }
    }
    setStatusPemutar("siaga");
  };

  const pilihJawabanKuis = (nomor: number, pilihan: string) => {
    if (jawabanKuis[String(nomor)]) return;
    const kunci = hurufKunci(hasilData?.kunciJawaban, nomor);
    setJawabanKuis((sebelum) => ({ ...sebelum, [String(nomor)]: pilihan }));
    if (sesiAktifId) {
      catatJawabanKuis(sesiAktifId, nomor, pilihan, kunci === pilihan);
    }
  };

  const kirimJawabanEsai = (nomor: number) => {
    const kunci = String(nomor);
    const isi = (drafEsai[kunci] ?? "").trim();
    if (!isi || jawabanEsai[kunci]) return;
    setJawabanEsai((sebelum) => ({ ...sebelum, [kunci]: isi }));
    if (sesiAktifId) {
      catatJawabanKuis(sesiAktifId, 100 + nomor, isi, false);
    }
  };

  const padaWaktuAudio = useCallback(
    (detik: number) => {
      waktuAudioRef.current = detik;
      setWaktuAudio(detik);
      setIndeksKata(indeksKataAktif(kataWaktu, detik));
    },
    [kataWaktu],
  );

  const padaDurasiAudio = useCallback((detik: number) => {
    setDurasiAudio(detik);
    setKataWaktu((sebelum) => {
      if (sebelum.length === 0) return sebelum;
      const terakhir = sebelum[sebelum.length - 1]?.selesai ?? 0;
      return skalaWaktuKata(sebelum, terakhir, detik);
    });
  }, []);

  const padaSelesaiAudio = useCallback(() => {
    sedangMemutarRef.current = false;
    setStatusPemutar("siaga");
    setWaktuAudio((sebelum) => (durasiAudio > 0 ? durasiAudio : sebelum));
    tandaiSegmenSelesai();
  }, [durasiAudio, tandaiSegmenSelesai]);

  useEffect(() => {
    if (!isMulai || params.get("mulai") !== "1" || !namaSesi.trim()) return;
    if (sudahSiapAudioRef.current) return;
    sudahSiapAudioRef.current = true;
    if (sedangMemutarSapaan()) return;
    void putarSegmen({ jenis: "sapaan" }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMulai, kunciSesiMulai, namaSesi]);

  const kembaliKeMenu = () => {
    resetPemutar();
    sudahSiapAudioRef.current = false;
    setHasilData(null);
    setHasilAjuan(null);
    setRiwayatAjuan([]);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setJawabanKuis({});
    setDrafEsai({});
    setJawabanEsai({});
    setSoalUjian([]);
    setStatusUjian("siaga");
    setPesanUjian("");
    setAudioCompleted(false);
    setSimulasiLulus(false);
    setPesanKunci("");
    setTahapBelajar("pilih");
    setSesiMapel("");
    setSesiMateri("");
    setSudutPandang(null);
    setStatusKurikulum("siaga");
    setStatusGlobal("siaga");
    setStatusLatihan("siaga");
    sesiAktifIdRef.current = null;
    router.push("/ruang-belajar");
  };

  return (
    <main className="flex-1 bg-white text-slate-700 font-sans selection:bg-[#F0AB00]/40 selection:text-[#1C01A5]">
      <div className="flex w-full justify-end px-2 pt-4">
        <div className="rounded-full border border-[#F0AB00]/40 bg-[#F0AB00]/20 px-4 py-2 text-sm font-bold text-[#1C01A5] shadow-sm">
          Kurikulum Merdeka ✦ Mode Multimodal
        </div>
      </div>

      {!isMulai ? (
        <div className="animate-in fade-in duration-700">
          <section className="w-full px-2 pt-12 pb-20 text-center">
            <p className="text-[#1C01A5] font-bold uppercase tracking-[0.2em] mb-4">
              Tutor AI Kurikulum KEMDIKBUD
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/super-hero-dapat-beasiswa.png"
              alt="Super Hero Dapat Beasiswa"
              className="mx-auto aspect-square w-full max-w-md rounded-none border border-black object-cover"
            />
            <p className="mt-6 text-2xl font-extrabold leading-snug text-[#1C01A5] md:text-3xl">
              Belajar, Selesaikan Ujian, Dapatkan Poin Beasiswa.
            </p>
            <Link
              href="/ruang-belajar"
              className={`${kelasTombolUtama} px-8 py-4 rounded-full font-extrabold text-lg shadow-lg shadow-[#1C01A5]/25 mx-auto mt-6 flex items-center justify-center gap-2 text-center`}
            >
              Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </section>
        </div>
      ) : (
        <>
        <div className="w-full px-2 pt-6 pb-8 animate-in slide-in-from-bottom-10 duration-700">
          <div className="mb-6">
            <button
              type="button"
              onClick={kembaliKeMenu}
              className="igil-tanpa-tepi mb-2 flex items-center gap-2 text-[#1C01A5] font-bold hover:text-[#F0AB00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Ganti Materi
            </button>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#F0AB00]">
              Modul belajar
            </p>
            <h1 className="mt-1 text-3xl font-black text-[#1C01A5]">
              {judulMateriSesi}
            </h1>
            <p className="mt-1 text-sm font-bold text-[#1C01A5]/70">
              {judulMapelSesi} · Kelas {judulKelasSesi}
            </p>
          </div>

          {pesanKunci ? (
            <div className="mb-4 rounded-2xl border-2 border-[#F0AB00] bg-[#F0AB00]/15 p-4 text-sm font-bold text-[#1C01A5]">
              {pesanKunci}
            </div>
          ) : null}

          <div className="space-y-8">
            <KartuBagianModul
              daftar={opsiBagian}
              aktif={tahapBelajar}
              materiTuntas
              mengunciKlik={isGenerating}
              onPilih={bukaBagian}
              isi={{
                silabus: (
                  <PanelSilabusModul
                    kelas={judulKelasSesi}
                    mapel={judulMapelSesi}
                    materi={judulMateriSesi}
                    naskahKurikulum={
                      hasilData?.curriculum_view ||
                      hasilData?.penjelasan ||
                      ""
                    }
                  />
                ),
                materi: (
                  <>
                    {pesanGalat &&
                    sudutPandang &&
                    ((sudutPandang === "kurikulum" && statusKurikulum === "galat") ||
                      (sudutPandang === "global" && statusGlobal === "galat")) ? (
                      <div
                        role="alert"
                        className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center"
                      >
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            void muatBagianNaskah(sudutPandang);
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    <PanelMateriModul
                      kelas={judulKelasSesi}
                      mapel={judulMapelSesi}
                      materi={judulMateriSesi}
                      naskah={penjelasanAktif}
                      doodleSrc={
                        hasilData?.gambarUtama ||
                        hasilData?.gambarSisipan?.[0]?.src
                      }
                      doodleMemuat={statusDoodle === "memuat"}
                      gambarSisipan={hasilData?.gambarSisipan}
                      memuat={
                        statusKurikulum === "memuat" ||
                        statusGlobal === "memuat"
                      }
                    />
                    {naskahMateriSiap(penjelasanAktif) ? (
            <div className="mt-6 space-y-4 border-t border-[#1C01A5]/10 pt-5">
              <label className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-[#1C01A5]">
                <MessageCircleQuestionMark className="w-5 h-5" />
                AJUKAN PERTANYAAN
              </label>
              <p className="text-sm text-slate-600">
                Apakah ada yang ingin ditanyakan?...
              </p>
              {kuotaAjuan ? (
                <p className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-[#1C01A5]">
                  <Coins className="h-4 w-4 text-[#F0AB00]" />
                  Tanya gratis hari ini: {kuotaAjuan.sisaGratis}/{kuotaAjuan.batasGratis}
                  <span className="font-bold text-[#1C01A5]/50">·</span>
                  Token $IGIL: {kuotaAjuan.saldoToken}
                </p>
              ) : null}
              <div className="relative">
                <textarea
                  value={teksAjuan}
                  onChange={(e) => setTeksAjuan(e.target.value)}
                  rows={4}
                  placeholder="Ketik pertanyaan kamu disini."
                  className="w-full bg-white border-2 border-[#1C01A5]/20 rounded-xl py-3 px-4 text-slate-800 outline-none font-medium focus:border-[#F0AB00] placeholder:text-slate-400 resize-y"
                />
              </div>
              {pesanAjuan ? (
                <p className="text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                  {pesanAjuan}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => void tanganiAjuanPertanyaan(false)}
                disabled={
                  isLoadingAjuan ||
                  Boolean(kuotaAjuan && kuotaAjuan.sisaGratis <= 0)
                }
                className={`w-full ${kelasTombolUtama} py-3 rounded-xl font-extrabold flex justify-center items-center gap-2 shadow-md shadow-[#1C01A5]/20`}
              >
                {isLoadingAjuan ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Menyusun panduan nalar...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Kirim Pertanyaan
                  </>
                )}
              </button>
              {kuotaAjuan && kuotaAjuan.sisaGratis <= 0 ? (
                <button
                  type="button"
                  onClick={() => void tanganiAjuanPertanyaan(true)}
                  disabled={isLoadingAjuan || kuotaAjuan.saldoToken < kuotaAjuan.biayaToken}
                  className="w-full rounded-xl border-2 border-[#F0AB00] bg-[#FFF8E8] py-3 font-extrabold text-[#C48800] disabled:opacity-50"
                >
                  Tukar {kuotaAjuan.biayaToken} token untuk 1 sesi tambahan
                </button>
              ) : null}

              {hasilAjuan ? (
                <div className="space-y-4 border-t border-[#1C01A5]/10 pt-4">
                  <p className="font-extrabold text-[#1C01A5]">{hasilAjuan.sapaan}</p>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C48800] mb-2">
                      Panduan Langkah Demi Langkah
                    </p>
                    <TeksNaskah teks={hasilAjuan.panduanLangkah} />
                  </div>
                  {hasilAjuan.caraKurikulum ? (
                    <div>
                      <p className="text-sm font-extrabold text-[#1C01A5] mb-2">
                        Cara Resmi Kurikulum Merdeka
                      </p>
                      <TeksNaskah teks={hasilAjuan.caraKurikulum} />
                    </div>
                  ) : null}
                  {hasilAjuan.trikBimbel ? (
                    <div>
                      <p className="text-sm font-extrabold text-[#C48800] mb-2">
                        Trik Cepat Bimbel
                      </p>
                      <TeksNaskah teks={hasilAjuan.trikBimbel} />
                    </div>
                  ) : null}
                  <p className="text-sm font-bold text-[#1C01A5] italic">
                    {hasilAjuan.dorongan}
                  </p>
                </div>
              ) : null}
            </div>
                    ) : null}
                  </>
                ),
                simulasi: (
                  <PanelSimulasiModul
                    nama={namaSesi}
                    kelas={judulKelasSesi}
                    mapel={judulMapelSesi}
                    materi={judulMateriSesi}
                    sudahLulus={simulasiLulus}
                    onSelesai={(lulus, catatan) => {
                      if (!lulus) return;
                      catatSimulasiSelesai(pastikanSesiAktif(), catatan);
                      setSimulasiLulus(true);
                    }}
                  />
                ),
                praktikum: (
                  <PanelPraktikumModul
                    nama={namaSesi}
                    kelas={judulKelasSesi}
                    mapel={judulMapelSesi}
                    materi={judulMateriSesi}
                    onSelesai={(lulus, catatan) =>
                      catatPraktikumSelesai(pastikanSesiAktif(), lulus, catatan)
                    }
                  />
                ),
                latihan: (
                  <>
                    {pesanGalat && statusLatihan === "galat" ? (
                      <div
                        role="alert"
                        className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center"
                      >
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            void muatBagianNaskah("latihan");
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    {statusLatihan === "memuat" ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun soal latihan...
                        </p>
                      </div>
                    ) : null}
                    {bankSoal.pilihanGanda.length > 0 && statusLatihan !== "memuat" ? (
                      <PanelLatihanModul
                        soal={bankSoal.pilihanGanda}
                        kunciJawaban={hasilData?.kunciJawaban}
                        jawaban={jawabanKuis}
                        motivasi={hasilData?.motivasi || "Semangat"}
                        onPilih={pilihJawabanKuis}
                        onLanjutUjian={() => bukaBagian("ujian")}
                      />
                    ) : null}
                  </>
                ),
                ujian: (
                  <>
                    {statusUjian === "memuat" ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun soal ujian acak...
                        </p>
                      </div>
                    ) : null}
                    {statusUjian === "galat" ? (
                      <div className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center">
                        <p className="font-semibold text-rose-600">{pesanUjian}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setStatusUjian("siaga");
                            void muatUjianAcak();
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Susun ujian lagi
                        </button>
                      </div>
                    ) : null}
                    {statusUjian === "siap" ? (
                      <PanelUjianModul
                        soal={soalUjian}
                        draf={drafEsai}
                        jawaban={jawabanEsai}
                        motivasi={hasilData?.motivasi || "Semangat"}
                        onDraf={(nomor, teks) =>
                          setDrafEsai((sebelum) => ({
                            ...sebelum,
                            [String(nomor)]: teks,
                          }))
                        }
                        onKirim={kirimJawabanEsai}
                      />
                    ) : null}
                  </>
                ),
              }}
            />
          </div>
        </div>
        <PemutarAudioGuru
          ref={pemutarRef}
          src={srcAudio}
          memutar={modeChirp && statusPemutar === "memutar"}
          lajuPutar={lajuPutarDariPerlambat(perlambatVoice)}
          tanpaLiveCaption
          padaWaktu={padaWaktuAudio}
          padaDurasi={padaDurasiAudio}
          padaSelesai={padaSelesaiAudio}
        />
        {pesanGalat === PESAN_GAGAL_SUSUN_MATERI &&
        (statusKurikulum === "galat" ||
          statusGlobal === "galat" ||
          statusLatihan === "galat") ? (
          <div
            role="alert"
            className="fixed inset-x-0 bottom-24 z-40 mx-auto w-[min(36rem,calc(100%-1.5rem))] rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-extrabold text-rose-700 shadow-lg"
          >
            {PESAN_GAGAL_SUSUN_MATERI}
          </div>
        ) : null}
        </>
      )}
    </main>
  );
}
