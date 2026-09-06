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
import { hurufKunci, pecahBankSoal, pecahBlokSoal } from "@/lib/kuis";
import {
  bacaProgres,
  catatAudioSelesai,
  catatEvaluasiTambahan,
  catatJawabanKuis,
  catatSesiModul,
  simpanProfil,
  tetapkanTokenIgil,
} from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";
import { JUMLAH_KARTU_MAKS, kartuTanpaNaskah, pecahBlokKartu, susunKonsepMateri, UKURAN_BATCH_DOODLE } from "@/lib/konsep-materi";
import {
  bacaModulLokal,
  simpanModulLokalPertama,
} from "@/lib/cache-modul-lokal";
import { kunciMateriTutor } from "@/lib/kunci-siswa";
import {
  gantiNamaLengkapKeDepan,
  sapaanTutorRingkas,
  sapaanVoiceTutor,
} from "@/lib/nama-siswa";
import {
  pilihPenjelasanMateri,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";
import {
  bacaPerlambatVoice,
  lajuPutarDariPerlambat,
  simpanPerlambatVoice,
  type TingkatPerlambat,
} from "@/lib/laju-suara";
import {
  naskahKartuUntukSuara,
  naskahSapaanUntukSuara,
} from "@/lib/naskah-lisan";
import { pecahTokenNaskah, skalaWaktuKata, type KataWaktu } from "@/lib/tts";
import { type GambarSisipan } from "@/components/GambarDoodle";
import PemutarAudioGuru, {
  indeksKataAktif,
  type KontrolPemutarGuru,
} from "@/components/PemutarAudioGuru";
import PemutarTutorMengambang from "@/components/PemutarTutorMengambang";
import KartuBagianModul from "@/components/modul/KartuBagianModul";
import PanelLatihanModul from "@/components/modul/PanelLatihanModul";
import PanelMateriModul from "@/components/modul/PanelMateriModul";
import PanelPraktikumModul from "@/components/modul/PanelPraktikumModul";
import PanelSilabusModul from "@/components/modul/PanelSilabusModul";
import PanelSimulasiModul from "@/components/modul/PanelSimulasiModul";
import PanelUjianModul from "@/components/modul/PanelUjianModul";
import TeksNaskah from "@/components/TeksNaskah";
import {
  butuhNaskahAi,
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
  Mic,
  Send,
} from "lucide-react";

type ModeInput = "teks" | "gambar";
type StatusPemutar = "siaga" | "menyiapkan" | "memutar" | "jeda";

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

type MesinRekamSuara = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
  }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

function buatMesinRekamSuara(): MesinRekamSuara | null {
  if (typeof window === "undefined") return null;
  const win = window as Window & {
    SpeechRecognition?: new () => MesinRekamSuara;
    webkitSpeechRecognition?: new () => MesinRekamSuara;
  };
  const Konstruktor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
  return Konstruktor ? new Konstruktor() : null;
}

const KUNCI_HALAMAN_BUKU = "igil-halaman-buku-v1";
const LAJU_BICARA = 0.92;
const KARAKTER_PER_DETIK = 13 * LAJU_BICARA;
const INTERVAL_KETIK_MS = Math.max(32, Math.round(1000 / KARAKTER_PER_DETIK));
const BATAS_POTONGAN_UCAPAN = 120;
const INTERVAL_WASPADA_SUARA_MS = 1600;

type JenisPotonganSuara = "sapaan" | "penjelasan" | "sisa";
type SegmenSuara = { jenis: "sapaan" } | { jenis: "kartu"; indeks: number };

type CacheSegmenAudio = {
  url: string;
  kata: KataWaktu[];
  durasi: number;
};

function kunciSegmen(segmen: SegmenSuara): string {
  return segmen.jenis === "sapaan" ? "sapaan" : `kartu-${segmen.indeks}`;
}

function labelSegmenSuara(segmen: SegmenSuara): string {
  return segmen.jenis === "sapaan" ? "Sapaan" : `Kartu ${segmen.indeks + 1}`;
}

function semuaKartuSelesai(selesai: string[], jumlahKartu: number): boolean {
  if (jumlahKartu <= 0) return selesai.includes("sapaan");
  for (let i = 0; i < jumlahKartu; i += 1) {
    if (!selesai.includes(`kartu-${i}`)) return false;
  }
  return true;
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
  const [isMulai, setIsMulai] = useState(false);
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("3 SD");
  const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>("wanita");
  const [modeInput, setModeInput] = useState<ModeInput>("teks");
  const [pilihanMapel, setPilihanMapel] = useState("");
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanBab, setPilihanBab] = useState("");
  const [babManual, setBabManual] = useState("");
  const [gambarHalaman, setGambarHalaman] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasilData, setHasilData] = useState<ModulTutor | null>(null);
  const [tahapBelajar, setTahapBelajar] = useState<TahapBelajar>("pilih");
  const [audioCompleted, setAudioCompleted] = useState(false);
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
  const [sedangRekam, setSedangRekam] = useState(false);
  const [statusDoodle, setStatusDoodle] = useState<StatusDoodle>("siaga");
  const [sesiAktifId, setSesiAktifId] = useState<string | null>(null);
  const [jawabanKuis, setJawabanKuis] = useState<Record<string, string>>({});
  const [drafEsai, setDrafEsai] = useState<Record<string, string>>({});
  const [jawabanEsai, setJawabanEsai] = useState<Record<string, string>>({});
  const [sudutPandang, setSudutPandang] = useState<SudutPandangMateri>("kurikulum");

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
  const pengenalSuaraRef = useRef<MesinRekamSuara | null>(null);
  const transkripFinalRef = useRef("");
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
    ? pilihPenjelasanMateri(hasilData, sudutPandang)
    : "";
  const blokKartu = useMemo(
    () => (penjelasanAktif ? pecahBlokKartu(penjelasanAktif) : []),
    [penjelasanAktif],
  );
  const jumlahKartuRef = useRef(0);
  jumlahKartuRef.current = blokKartu.length;
  const kartuAktif =
    segmenSuara.jenis === "kartu" ? segmenSuara.indeks : -1;
  const bankSoal = useMemo(() => {
    const pecah = pecahBankSoal(hasilData?.pertanyaan ?? "");
    const esaiLangsung = pecahBlokSoal(hasilData?.esai ?? "");
    return {
      pilihanGanda: pecah.pilihanGanda,
      esai: esaiLangsung.length > 0 ? esaiLangsung : pecah.esai,
    };
  }, [hasilData?.esai, hasilData?.pertanyaan]);

  const judulMapelSesi = teksQuery(
    params.get("mapel"),
    sesiMapel || (modeInput === "teks" ? mapel : "Berdasarkan Buku"),
  );
  const judulMateriSesi = sesiMateri || (modeInput === "teks" ? bab : "Analisis halaman buku");
  const judulKelasSesi = teksQuery(params.get("kelas"), kelas);
  const opsiBagian = daftarBagianModul(judulMapelSesi);

  const sudahPrefillMapel = useRef(false);
  const sudahPrefillBab = useRef(false);
  const kelasTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const profil = bacaProgres().profil;
    const namaQ = params.get("nama") || profil.nama;
    const kelasQ = teksQuery(params.get("kelas"), profil.kelas || "3 SD");
    const modeQ = params.get("mode");
    const guruQ = params.get("guru") || profil.guruKelamin;
    kelasTargetRef.current = kelasQ;
    if (namaQ) setNama(namaQ);
    setKelas(kelasQ);
    setGuruKelamin(normalisasiKelaminGuru(guruQ));
    if (modeQ === "gambar" || modeQ === "teks") setModeInput(modeQ);
    if (params.get("mulai") === "1") setIsMulai(true);
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
      pengenalSuaraRef.current?.abort();
      doodleAbortRef.current?.abort();
      if (urlAudioRef.current) URL.revokeObjectURL(urlAudioRef.current);
    };
  }, []);

  useEffect(() => {
    const tingkat = bacaPerlambatVoice();
    perlambatVoiceRef.current = tingkat;
    setPerlambatVoice(tingkat);
  }, []);

  const pilihPerlambatVoice = (tingkat: TingkatPerlambat) => {
    perlambatVoiceRef.current = tingkat;
    setPerlambatVoice(tingkat);
    simpanPerlambatVoice(tingkat);
  };

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

  const tandaiAudioSelesai = () => {
    setAudioCompleted(true);
    if (sesiAktifId) catatAudioSelesai(sesiAktifId);
  };

  const tandaiSegmenSelesai = () => {
    const kunci = kunciSegmen(segmenSuaraRef.current);
    setSegmenSelesai((sebelum) => {
      const berikutnya = sebelum.includes(kunci) ? sebelum : [...sebelum, kunci];
      if (semuaKartuSelesai(berikutnya, jumlahKartuRef.current)) {
        tandaiAudioSelesai();
      }
      return berikutnya;
    });
  };

  const bicaraPotonganSaatIni = () => {
    const indeks = indeksAntrianRef.current;
    const item = antrianSuaraRef.current[indeks];
    if (!item) {
      sedangMemutarRef.current = false;
      hentikanJagaSuara();
      setStatusPemutar("siaga");
      tandaiSegmenSelesai();
      return;
    }

    const ucapan = buatUcapan(
      item.teks,
      kelas,
      guruKelamin,
      perlambatVoiceRef.current,
    );
    ucapan.onstart = item.ucapan.onstart;
    ucapan.onboundary = item.ucapan.onboundary;
    ucapan.onend = item.ucapan.onend;
    ucapan.onerror = item.ucapan.onerror;
    item.ucapan = ucapan;
    item.percobaan += 1;
    terakhirBicaraRef.current = Date.now();
    window.speechSynthesis.speak(ucapan);
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
    setAudioCompleted(false);
    setSegmenSelesai([]);
    segmenSuaraRef.current = { jenis: "sapaan" };
    setSegmenSuara({ jenis: "sapaan" });
  };

  const gantiSudutPandang = (sudut: SudutPandangMateri) => {
    if (sudut === sudutPandang) return;
    resetPemutar();
    sudahSiapAudioRef.current = true;
    setTeksAnimasi("");
    setSudutPandang(sudut);
  };

  const muatIlustrasiDoodle = async (modul: ModulTutor) => {
    doodleAbortRef.current?.abort();
    const pengontrol = new AbortController();
    doodleAbortRef.current = pengontrol;
    setStatusDoodle("memuat");

    const naskahDoodle = pilihPenjelasanMateri(modul, "kurikulum");
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

  const terapkanModul = (
    dataModul: ModulTutor,
    _dariCacheModul: boolean,
    mapelKirim: string,
    materiKirim: string,
    kelasKirim: string,
  ) => {
    const kurikulum = gantiNamaLengkapKeDepan(
      dataModul.curriculum_view || dataModul.penjelasan,
      nama,
    );
    const global = gantiNamaLengkapKeDepan(
      dataModul.global_best_view || kurikulum,
      nama,
    );
    const judulMateri =
      modeInput === "teks" ? materiKirim : "Analisis halaman buku";
    setHasilData({
      ...dataModul,
      sapaan: sapaanVoiceTutor(nama, mapelKirim, judulMateri),
      penjelasan: kurikulum,
      curriculum_view: kurikulum,
      global_best_view: global,
    });
    setSudutPandang("kurikulum");
    setJawabanKuis({});
    setDrafEsai({});
    setJawabanEsai({});
    setAudioCompleted(false);
    setSesiMapel(mapelKirim);
    setSesiMateri(modeInput === "teks" ? materiKirim : "Analisis halaman buku");
    simpanProfil({ nama, kelas: kelasKirim, guruKelamin });
    const sesi = catatSesiModul({
      nama,
      kelas: kelasKirim,
      mapel: mapelKirim,
      materi: materiKirim,
      mode: modeInput,
      catatanEvaluasi: dataModul.motivasi,
      kunciJawaban: dataModul.kunciJawaban,
      kuisTotal:
        pecahBankSoal(dataModul.pertanyaan).pilihanGanda.length +
        pecahBlokSoal(dataModul.esai ?? "").length,
      jumlahLatihan: pecahBankSoal(dataModul.pertanyaan).pilihanGanda.length,
    });
    setSesiAktifId(sesi.id);
    void muatKuota();
    void muatIlustrasiDoodle(dataModul);
    if (modeInput === "teks") {
      void fetch("/api/studio-kreator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          kelas: kelasKirim,
          mapel: mapelKirim,
          materi: materiKirim,
          data: dataModul,
        }),
      }).catch(() => {
        console.warn("[tutor] gagal mengirim cache modul ke server");
      });
    }
  };

  const intipModulTersimpan = async (
    kelasKirim: string,
    mapelKirim: string,
    materiKirim: string,
  ): Promise<ModulTutor | null> => {
    try {
      const intip = new URLSearchParams({
        nama,
        kelas: kelasKirim,
        mapel: mapelKirim,
        materi: materiKirim,
      });
      const peek = await fetch(`/api/modul?${intip.toString()}`, {
        cache: "no-store",
      });
      const cacheJson = (await peek.json()) as {
        berhasil?: boolean;
        ada?: boolean;
        data?: ModulTutor;
      };
      if (cacheJson.berhasil && cacheJson.ada && cacheJson.data) {
        return cacheJson.data;
      }
    } catch {
      const topicId = kunciMateriTutor(kelasKirim, mapelKirim, materiKirim);
      const lokal = bacaModulLokal<ModulTutor>(topicId);
      if (lokal?.curriculum_view || lokal?.penjelasan) return lokal;
    }
    return null;
  };

  const mintaSusunModul = async (
    kelasKirim: string,
    mapelKirim: string,
    materiKirim: string,
  ) => {
    const respons = await fetch("/api/tutor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama,
        kelas: kelasKirim,
        mapel: mapelKirim,
        materi: modeInput === "teks" ? materiKirim : "Analisis AI",
        gambar: modeInput === "gambar" ? gambarHalaman : null,
      }),
    });
    return (await respons.json()) as {
      berhasil?: boolean;
      pesan?: string;
      dariCache?: boolean;
      data?: ModulTutor;
    };
  };

  const tanganiBuatModul = async () => {
    if (!nama.trim()) {
      setPesanGalat("Kapten, mohon isi Nama Siswa terlebih dahulu.");
      sudahGenerateRef.current = false;
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
        sudahGenerateRef.current = false;
        return;
      }
      if (!materiKirim) {
        setPesanGalat("Mohon isi Materi Pembahasan.");
        sudahGenerateRef.current = false;
        return;
      }
    } else if (gambarHalaman.length === 0) {
      setPesanGalat("Mohon unggah foto halaman buku terlebih dahulu.");
      sudahGenerateRef.current = false;
      return;
    }

    const topicId = kunciMateriTutor(kelasKirim, mapelKirim, materiKirim);

    setPesanGalat("");
    setIsLoading(true);
    doodleAbortRef.current?.abort();
    setStatusDoodle("siaga");
    setHasilData(null);
    setHasilAjuan(null);
    setRiwayatAjuan([]);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setSesiMapel("");
    setSesiMateri("");
    setSudutPandang("kurikulum");
    resetPemutar();

    try {
      if (modeInput === "teks") {
        const cacheAwal = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheAwal) {
          simpanModulLokalPertama(topicId, cacheAwal);
          terapkanModul(cacheAwal, true, mapelKirim, materiKirim, kelasKirim);
          setIsLoading(false);
          return;
        }
      }

      let data = await mintaSusunModul(kelasKirim, mapelKirim, materiKirim);

      if (!(data.berhasil && data.data) && modeInput === "teks") {
        const cacheSetelah = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheSetelah) {
          simpanModulLokalPertama(topicId, cacheSetelah);
          terapkanModul(
            cacheSetelah,
            true,
            mapelKirim,
            materiKirim,
            kelasKirim,
          );
          setIsLoading(false);
          return;
        }
      }

      if (data.berhasil && data.data) {
        if (modeInput === "teks") {
          simpanModulLokalPertama(topicId, data.data);
        }
        terapkanModul(
          data.data,
          Boolean(data.dariCache),
          mapelKirim,
          materiKirim,
          kelasKirim,
        );
      } else {
        setPesanGalat(data.pesan || "Modul gagal disusun.");
      }
    } catch {
      if (modeInput === "teks") {
        const cacheJaringan = await intipModulTersimpan(
          kelasKirim,
          mapelKirim,
          materiKirim,
        );
        if (cacheJaringan) {
          simpanModulLokalPertama(topicId, cacheJaringan);
          terapkanModul(
            cacheJaringan,
            true,
            mapelKirim,
            materiKirim,
            kelasKirim,
          );
          setIsLoading(false);
          return;
        }
      }
      setPesanGalat("Gagal terhubung ke server.");
    }
    setIsLoading(false);
  };

  const bukaBagian = (bagian: BagianIsi) => {
    if (tahapBelajar === bagian) {
      setPesanGalat("");
      setTahapBelajar("pilih");
      return;
    }
    setPesanGalat("");
    setTahapBelajar(bagian);
    if (butuhNaskahAi(bagian) && !hasilData && !isLoading) {
      sudahGenerateRef.current = true;
      void tanganiBuatModul();
    }
    window.setTimeout(() => {
      document
        .getElementById(`kartu-bagian-${bagian}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const kunciSesiMulai = `${params.get("mulai")}|${params.get("mapel")}|${params.get("materi")}|${params.get("r")}`;

  useEffect(() => {
    if (params.get("mulai") !== "1") return;
    sudahGenerateRef.current = false;
    sudahSiapAudioRef.current = false;
    setHasilData(null);
  }, [kunciSesiMulai, params]);

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
    if (!nama.trim()) return;
    try {
      const respons = await fetch(
        `/api/tutor?nama=${encodeURIComponent(nama)}&kelas=${encodeURIComponent(kelas)}`,
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

    hentikanRekamSuara();
    setPesanAjuan("");
    setIsLoadingAjuan(true);

    try {
      const respons = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
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
          sapaan: sapaanTutorRingkas(nama, data.data.sapaan),
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

  const hentikanRekamSuara = () => {
    pengenalSuaraRef.current?.stop();
    pengenalSuaraRef.current = null;
    setSedangRekam(false);
  };

  const toggleRekamSuara = () => {
    if (sedangRekam) {
      hentikanRekamSuara();
      return;
    }

    const mesin = buatMesinRekamSuara();
    if (!mesin) {
      setPesanAjuan("Browser ini belum mendukung rekam suara. Ketik pertanyaanmu di kotak.");
      return;
    }

    window.speechSynthesis.cancel();
    hentikanJagaSuara();
    sedangMemutarRef.current = false;
    setStatusPemutar(modeChirp && srcAudio ? "jeda" : "siaga");
    setPesanAjuan("");
    transkripFinalRef.current = teksAjuan.trim() ? `${teksAjuan.trim()} ` : "";

    mesin.lang = "id-ID";
    mesin.continuous = true;
    mesin.interimResults = true;

    mesin.onresult = (peristiwa) => {
      let sementara = "";
      for (let i = peristiwa.resultIndex; i < peristiwa.results.length; i++) {
        const bagian = peristiwa.results[i];
        if (bagian.isFinal) {
          transkripFinalRef.current += `${bagian[0].transcript} `;
        } else {
          sementara += bagian[0].transcript;
        }
      }
      setTeksAjuan(`${transkripFinalRef.current}${sementara}`.trim());
    };

    mesin.onerror = (peristiwa) => {
      if (peristiwa.error === "not-allowed") {
        setPesanAjuan("Izin mikrofon ditolak. Izinkan akses mikrofon, lalu coba lagi.");
      } else if (peristiwa.error !== "no-speech" && peristiwa.error !== "aborted") {
        setPesanAjuan("Rekaman suara terganggu. Silakan ketik atau coba lagi.");
      }
      setSedangRekam(false);
    };

    mesin.onend = () => {
      setSedangRekam(false);
      pengenalSuaraRef.current = null;
    };

    try {
      pengenalSuaraRef.current = mesin;
      mesin.start();
      setSedangRekam(true);
    } catch {
      setPesanAjuan("Tidak dapat memulai mikrofon. Coba lagi.");
      setSedangRekam(false);
    }
  };

  const naskahDariSegmen = (segmen: SegmenSuara): string => {
    if (segmen.jenis === "sapaan") {
      const judulMapel = teksQuery(
        params.get("mapel"),
        sesiMapel || (modeInput === "teks" ? mapel : "Berdasarkan Buku"),
      );
      const judulMateri = teksQuery(
        params.get("materi"),
        sesiMateri || (modeInput === "teks" ? bab : "Analisis halaman buku"),
      );
      return naskahSapaanUntukSuara(nama, judulMapel, judulMateri);
    }
    if (!hasilData) return "";
    const blok = blokKartu[segmen.indeks] ?? "";
    return naskahKartuUntukSuara(blok, nama, {
      buangSubjudulVisual: kartuTanpaNaskah(kelas),
    });
  };

  const mulaiAntrianCadangan = () => {
    const naskahAwal = naskahDariSegmen(segmenSuaraRef.current);
    if (!hasilData && !naskahAwal) return;
    setTeksAnimasi("");
    sedangMemutarRef.current = true;
    setStatusPemutar("memutar");

    const antrian: PotonganSuara[] = [];
    const masukkan = (
      teks: string,
      jenis: JenisPotonganSuara,
      teksPenjelasan = penjelasanAktif,
    ) => {
      let cariDari = 0;
      for (const potong of pecahTeksUcapan(teks)) {
        const posisi = teks.indexOf(potong, cariDari);
        const offset = posisi >= 0 ? posisi : cariDari;
        antrian.push({
          teks: potong,
          ucapan: buatUcapan(
            potong,
            kelas,
            guruKelamin,
            perlambatVoiceRef.current,
          ),
          jenis,
          offset,
          teksPenjelasan,
          percobaan: 0,
        });
        cariDari = offset + potong.length;
      }
    };

    const segmen = segmenSuaraRef.current;
    const naskah = naskahDariSegmen(segmen);
    if (segmen.jenis === "sapaan") {
      masukkan(naskah, "sapaan");
    } else {
      masukkan(naskah, "penjelasan", naskah);
    }

    antrian.forEach((item, indeks) => {
      item.ucapan.onstart = () => {
        if (item.jenis !== "penjelasan") return;
        const sudahMulai = antrian
          .slice(0, indeks)
          .some((lalu) => lalu.jenis === "penjelasan");
        if (!sudahMulai) {
          pakaiBatasKataRef.current = false;
          mulaiKetikDari(item.teksPenjelasan, 0);
        }
      };

      item.ucapan.onboundary = (peristiwa) => {
        if (item.jenis !== "penjelasan") return;
        if (peristiwa.name !== "word" && peristiwa.name !== "sentence") return;
        pakaiBatasKataRef.current = true;
        const panjang = peristiwa.charLength ?? 1;
        const indeksTeks = Math.min(
          item.teksPenjelasan.length,
          item.offset + peristiwa.charIndex + panjang,
        );
        indeksKetikRef.current = indeksTeks;
        setTeksAnimasi(item.teksPenjelasan.slice(0, indeksTeks));
      };

      item.ucapan.onend = () => {
        if (!sedangMemutarRef.current) return;
        if (item.jenis === "penjelasan") {
          const selesaiPenjelasan = antrian
            .slice(indeks + 1)
            .every((lanjut) => lanjut.jenis !== "penjelasan");
          if (selesaiPenjelasan) {
            hentikanKetik();
            setTeksAnimasi(item.teksPenjelasan);
            indeksKetikRef.current = item.teksPenjelasan.length;
          }
        }
        indeksAntrianRef.current = indeks + 1;
        bicaraPotonganSaatIni();
      };

      item.ucapan.onerror = (peristiwa) => {
        if (peristiwa.error === "canceled" || peristiwa.error === "interrupted") {
          return;
        }
        if (!sedangMemutarRef.current) return;
        indeksAntrianRef.current = indeks + 1;
        bicaraPotonganSaatIni();
      };
    });

    antrianSuaraRef.current = antrian;
    indeksAntrianRef.current = 0;
    mulaiJagaSuara();
    bicaraPotonganSaatIni();
  };

  const kunciCacheSegmen = (
    segmen: SegmenSuara,
    kelaminSuara: KelaminGuru,
  ) =>
    `${kunciSegmen(segmen)}|${sudutPandang}|${kelaminSuara}`;

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
    if (!hasilData && segmen.jenis !== "sapaan") return false;
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
        const respons = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teks: naskah,
            kelamin: kelaminSuara === "pria" ? "male" : "female",
            kelas,
          }),
        });
        const data = (await respons.json()) as {
          berhasil?: boolean;
          cadangan?: boolean;
          mime?: string;
          audioBase64?: string;
          kata?: KataWaktu[];
          durasiDetik?: number;
        };
        if (!data.berhasil || !data.audioBase64 || data.cadangan) return false;
        const biner = Uint8Array.from(atob(data.audioBase64), (c) =>
          c.charCodeAt(0),
        );
        const url = URL.createObjectURL(
          new Blob([biner], { type: data.mime || "audio/wav" }),
        );
        const durasi =
          typeof data.durasiDetik === "number" && data.durasiDetik > 0
            ? data.durasiDetik
            : data.kata?.[data.kata.length - 1]?.selesai ?? 0;
        cacheSegmenRef.current.set(kunci, {
          url,
          kata: data.kata ?? [],
          durasi,
        });
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

  const prefetchKartu = (kelaminSuara: KelaminGuru = guruKelamin) => {
    void (async () => {
      for (let i = 0; i < blokKartu.length; i += 1) {
        await mintaAudioSegmen(
          { jenis: "kartu", indeks: i },
          kelaminSuara,
          false,
        );
      }
    })();
  };

  const siapkanAudioGuru = async (
    kelaminSuara: KelaminGuru = guruKelamin,
  ): Promise<boolean> => {
    const awal = await mintaAudioSegmen(
      { jenis: "sapaan" },
      kelaminSuara,
      true,
    );
    prefetchKartu(kelaminSuara);
    return awal;
  };

  const putarSegmen = async (
    segmen: SegmenSuara,
    dariAwal = true,
  ) => {
    if (!hasilData && segmen.jenis !== "sapaan") return;
    window.speechSynthesis.cancel();
    hentikanKetik();
    hentikanJagaSuara();
    segmenSuaraRef.current = segmen;
    setSegmenSuara(segmen);
    setStatusPemutar("menyiapkan");
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
        // cadangan browser
      }
    }
    mulaiAntrianCadangan();
  };

  const mulaiSuara = () => {
    if (!hasilData && segmenSuaraRef.current.jenis !== "sapaan") return;
    if (statusPemutar === "menyiapkan") return;

    if (statusPemutar === "jeda") {
      sedangMemutarRef.current = true;
      if (modeChirp && urlAudioRef.current) {
        setStatusPemutar("memutar");
        void pemutarRef.current?.lanjutkan();
        return;
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.speaking) {
        bicaraPotonganSaatIni();
      }
      mulaiKetikDari(naskahDariSegmen(segmenSuaraRef.current), indeksKetikRef.current);
      mulaiJagaSuara();
      setStatusPemutar("memutar");
      return;
    }

    if (
      waktuAudio > 0.4 &&
      durasiAudio > 0 &&
      waktuAudio < durasiAudio - 0.4 &&
      modeChirp &&
      urlAudioRef.current
    ) {
      void putarSegmen(segmenSuaraRef.current, false);
      return;
    }

    void putarSegmen(segmenSuaraRef.current, true);
  };

  const pilihKartuSuara = (indeks: number) => {
    if (!hasilData || indeks < 0 || indeks >= blokKartu.length) return;
    const sama =
      segmenSuaraRef.current.jenis === "kartu" &&
      segmenSuaraRef.current.indeks === indeks;
    if (sama && statusPemutar === "memutar") return;
    if (sama && statusPemutar === "jeda") {
      mulaiSuara();
      return;
    }
    jedaSuara();
    void putarSegmen({ jenis: "kartu", indeks }, true);
  };

  const jedaSuara = () => {
    sedangMemutarRef.current = false;
    pemutarRef.current?.jeda();
    window.speechSynthesis.pause();
    hentikanKetik();
    hentikanJagaSuara();
    setStatusPemutar("jeda");
  };

  const toggleSuara = () => {
    if (!hasilData && segmenSuaraRef.current.jenis !== "sapaan") return;
    if (statusPemutar === "memutar") {
      jedaSuara();
      return;
    }
    mulaiSuara();
  };

  const cariUlangSuara = (detik: number) => {
    if (detik >= waktuAudio - 0.05) return;
    const aman = Math.max(0, detik);
    setWaktuAudio(aman);
    waktuAudioRef.current = aman;
    if (modeChirp && urlAudioRef.current) {
      pemutarRef.current?.cariKe(aman);
      setIndeksKata(indeksKataAktif(kataWaktu, aman));
      return;
    }
    if (!hasilData && segmenSuaraRef.current.jenis !== "sapaan") return;
    const naskah = naskahDariSegmen(segmenSuaraRef.current);
    const durasiEst =
      durasiAudio > 0 ? durasiAudio : naskah.length / KARAKTER_PER_DETIK;
    const rasio = durasiEst > 0 ? aman / durasiEst : 0;
    const indeks = Math.floor(
      pecahTokenNaskah(naskah).length * Math.min(1, rasio),
    );
    setIndeksKata(indeks);
    indeksKetikRef.current = Math.floor(naskah.length * Math.min(1, rasio));
    setTeksAnimasi(naskah.slice(0, indeksKetikRef.current));
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
    if (!isMulai || params.get("mulai") !== "1" || !nama.trim()) return;
    if (sudahSiapAudioRef.current) return;
    sudahSiapAudioRef.current = true;
    void putarSegmen({ jenis: "sapaan" }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMulai, kunciSesiMulai, nama, sudutPandang, params]);

  useEffect(() => {
    if (tahapBelajar !== "materi" || !hasilData || blokKartu.length === 0) return;
    void putarSegmen({ jenis: "kartu", indeks: 0 }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasilData, tahapBelajar, sudutPandang]);

  useEffect(() => {
    if (tahapBelajar !== "materi" || !hasilData) return;
    if (statusPemutar !== "siaga") return;
    const segmen = segmenSuaraRef.current;
    if (segmen.jenis !== "kartu") return;
    const berikutnya = segmen.indeks + 1;
    if (berikutnya >= jumlahKartuRef.current) return;
    void putarSegmen({ jenis: "kartu", indeks: berikutnya }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasilData, statusPemutar, tahapBelajar]);

  const kembaliKeMenu = () => {
    hentikanRekamSuara();
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
    setAudioCompleted(false);
    setTahapBelajar("pilih");
    setSesiMapel("");
    setSesiMateri("");
    setSudutPandang("kurikulum");
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
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[#1C01A5]">
              Ubah Waktu Belajarmu <br className="hidden md:block" />
              <span className="text-[#F0AB00]">Menjadi Beasiswa Instan</span>
            </h1>
            <p className="w-full text-slate-600 text-lg mb-8">
              Ketik judul materi atau unggah halaman buku. $IGIL menampilkan uraian materi dulu, baru membuka soal latihan untuk menambang token.
            </p>
            <Link
              href="/ruang-belajar"
              className={`${kelasTombolUtama} px-8 py-4 rounded-full font-extrabold text-lg shadow-lg shadow-[#1C01A5]/25 mx-auto mt-4 flex items-center justify-center gap-2 text-center`}
            >
              Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </section>
        </div>
      ) : (
        <>
        <div className="w-full px-2 pt-6 pb-32 animate-in slide-in-from-bottom-10 duration-700">
          <div className="mb-6">
            <button
              type="button"
              onClick={kembaliKeMenu}
              className="mb-2 flex items-center gap-2 text-[#1C01A5] font-bold hover:text-[#F0AB00] transition-colors"
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
              {judulMapelSesi} · {judulKelasSesi}
            </p>
          </div>

          <div className="space-y-8">
            <KartuBagianModul
              daftar={opsiBagian}
              aktif={tahapBelajar}
              onPilih={bukaBagian}
              isi={{
                silabus: (
                  <>
                    {pesanGalat ? (
                      <div className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center">
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            sudahGenerateRef.current = true;
                            void tanganiBuatModul();
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    {isLoading && !hasilData ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun bagian ini...
                        </p>
                      </div>
                    ) : (
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
                    )}
                  </>
                ),
                materi: (
                  <>
                    {pesanGalat ? (
                      <div className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center">
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            sudahGenerateRef.current = true;
                            void tanganiBuatModul();
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    {isLoading && !hasilData ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun bagian ini...
                        </p>
                      </div>
                    ) : null}
                    {hasilData ? (
                      <PanelMateriModul
                        materi={judulMateriSesi}
                        mapel={judulMapelSesi}
                        kelas={judulKelasSesi}
                        sapaan={hasilData.sapaan}
                        naskah={penjelasanAktif}
                        doodleSrc={
                          hasilData.gambarUtama ||
                          hasilData.gambarSisipan?.[0]?.src
                        }
                        doodleMemuat={statusDoodle === "memuat"}
                        sudutPandang={sudutPandang}
                        onGantiSudut={gantiSudutPandang}
                      />
                    ) : null}
                    {hasilData ? (
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
                  placeholder="Ketik pertanyaan kamu disini atau gunakan VOICE untuk bertanya lewat suara."
                  className="w-full bg-white border-2 border-[#1C01A5]/20 rounded-xl py-3 pl-4 pr-16 text-slate-800 outline-none font-medium focus:border-[#F0AB00] placeholder:text-slate-400 resize-y"
                />
                <button
                  type="button"
                  onClick={toggleRekamSuara}
                  className={`absolute right-3 bottom-3 p-3 rounded-full transition-all shadow-md ${
                    sedangRekam
                      ? "bg-rose-500 text-white animate-pulse"
                      : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
                  }`}
                  title={sedangRekam ? "Berhenti merekam" : "Bertanya melalui suara"}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              {sedangRekam ? (
                <p className="text-sm font-bold text-rose-600">
                  Mikrofon aktif. Ucapkan pertanyaanmu, lalu klik ikon mikrofon lagi untuk berhenti.
                </p>
              ) : null}
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
                    nama={nama}
                    kelas={judulKelasSesi}
                    mapel={judulMapelSesi}
                    materi={judulMateriSesi}
                  />
                ),
                praktikum: (
                  <PanelPraktikumModul
                    nama={nama}
                    kelas={judulKelasSesi}
                    mapel={judulMapelSesi}
                    materi={judulMateriSesi}
                  />
                ),
                latihan: (
                  <>
                    {pesanGalat ? (
                      <div className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center">
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            sudahGenerateRef.current = true;
                            void tanganiBuatModul();
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    {isLoading && !hasilData ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun bagian ini...
                        </p>
                      </div>
                    ) : null}
                    {hasilData ? (
                      <PanelLatihanModul
                        soal={bankSoal.pilihanGanda}
                        kunciJawaban={hasilData.kunciJawaban}
                        jawaban={jawabanKuis}
                        motivasi={hasilData.motivasi}
                        onPilih={pilihJawabanKuis}
                        onLanjutUjian={() => bukaBagian("ujian")}
                      />
                    ) : null}
                  </>
                ),
                ujian: (
                  <>
                    {pesanGalat ? (
                      <div className="mb-4 rounded-2xl border-2 border-rose-100 bg-rose-50 p-5 text-center">
                        <p className="font-semibold text-rose-600">{pesanGalat}</p>
                        <button
                          type="button"
                          onClick={() => {
                            sudahGenerateRef.current = true;
                            void tanganiBuatModul();
                          }}
                          className={`${kelasTombolUtama} mt-4 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
                        >
                          Coba susun lagi
                        </button>
                      </div>
                    ) : null}
                    {isLoading && !hasilData ? (
                      <div className="rounded-2xl bg-white/80 p-8 text-center">
                        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
                        <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                          Menyusun bagian ini...
                        </p>
                      </div>
                    ) : null}
                    {hasilData ? (
                      <PanelUjianModul
                        soal={bankSoal.esai}
                        draf={drafEsai}
                        jawaban={jawabanEsai}
                        motivasi={hasilData.motivasi}
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
          padaWaktu={padaWaktuAudio}
          padaDurasi={padaDurasiAudio}
          padaSelesai={padaSelesaiAudio}
        />
        <PemutarTutorMengambang
          memutar={statusPemutar === "memutar"}
          waktu={waktuAudio}
          durasi={durasiAudio}
          labelSegmen={labelSegmenSuara(segmenSuara)}
          perlambat={perlambatVoice}
          padaToggle={toggleSuara}
          padaUlang={cariUlangSuara}
          padaPerlambat={pilihPerlambatVoice}
          menyiapkan={statusPemutar === "menyiapkan"}
        />
        </>
      )}
    </main>
  );
}
