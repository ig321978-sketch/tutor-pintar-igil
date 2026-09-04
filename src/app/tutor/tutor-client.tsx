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
import { hurufKunci } from "@/lib/kuis";
import {
  bacaProgres,
  catatEvaluasiTambahan,
  catatJawabanKuis,
  catatSesiModul,
  simpanProfil,
  tetapkanTokenIgil,
} from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";
import { indeksKartuAktif, JUMLAH_KARTU_MAKS, kartuTanpaNaskah, susunKonsepMateri, UKURAN_BATCH_DOODLE } from "@/lib/konsep-materi";
import { gantiNamaLengkapKeDepan, sapaanTutorRingkas } from "@/lib/nama-siswa";
import {
  pilihPenjelasanMateri,
  type SudutPandangMateri,
} from "@/lib/sudut-pandang";
import { naskahLisan, naskahTutorUntukSuara } from "@/lib/naskah-lisan";
import { pecahTokenNaskah, skalaWaktuKata, type KataWaktu } from "@/lib/tts";
import { type GambarSisipan } from "@/components/GambarDoodle";
import PemutarAudioGuru, {
  indeksKataAktif,
  type KontrolPemutarGuru,
} from "@/components/PemutarAudioGuru";
import PemutarTutorMengambang from "@/components/PemutarTutorMengambang";
import RingkasanKonsep from "@/components/RingkasanKonsep";
import TeksNaskah from "@/components/TeksNaskah";
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
  motivasi: string;
  gambarUtama?: string | null;
  gambarSisipan?: GambarSisipan[];
};

type StatusDoodle = "siaga" | "memuat" | "siap" | "gagal";
type TahapBelajar = "konsep" | "latihan";

type PanduanAjuan = {
  sapaan: string;
  panduanLangkah: string;
  caraKurikulum: string;
  trikBimbel: string;
  dorongan: string;
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

type PotonganSuara = {
  teks: string;
  ucapan: SpeechSynthesisUtterance;
  jenis: JenisPotonganSuara;
  offset: number;
  teksPenjelasan: string;
  percobaan: number;
};

function buatUcapan(teks: string, guruKelas: string, kelamin: KelaminGuru) {
  return buatUcapanGuru(teks, profilGuru(guruKelas, kelamin));
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
  const [tahapBelajar, setTahapBelajar] = useState<TahapBelajar>("konsep");
  const [sesiMapel, setSesiMapel] = useState("");
  const [sesiMateri, setSesiMateri] = useState("");
  const [statusPemutar, setStatusPemutar] = useState<StatusPemutar>("siaga");
  const [teksAnimasi, setTeksAnimasi] = useState("");
  const [pesanGalat, setPesanGalat] = useState("");
  const [teksAjuan, setTeksAjuan] = useState("");
  const [isLoadingAjuan, setIsLoadingAjuan] = useState(false);
  const [hasilAjuan, setHasilAjuan] = useState<PanduanAjuan | null>(null);
  const [pesanAjuan, setPesanAjuan] = useState("");
  const [kuotaAjuan, setKuotaAjuan] = useState<StatusKuotaUi | null>(null);
  const [dariCache, setDariCache] = useState(false);
  const [sedangRekam, setSedangRekam] = useState(false);
  const [statusDoodle, setStatusDoodle] = useState<StatusDoodle>("siaga");
  const [sesiAktifId, setSesiAktifId] = useState<string | null>(null);
  const [jawabanKuis, setJawabanKuis] = useState<Record<string, string>>({});
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
  const offsetKataSapaan = hasilData
    ? pecahTokenNaskah(hasilData.sapaan).length
    : 0;
  const indeksKataPenjelasan = indeksKata - offsetKataSapaan;
  const kartuAktif = penjelasanAktif
    ? indeksKartuAktif(penjelasanAktif, indeksKataPenjelasan)
    : 0;

  const sudahPrefillMapel = useRef(false);
  const sudahPrefillBab = useRef(false);
  const kelasTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const profil = bacaProgres().profil;
    const namaQ = params.get("nama") || profil.nama;
    const kelasQ = params.get("kelas") || profil.kelas || "3 SD";
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
    }, INTERVAL_KETIK_MS);
  };

  const bicaraPotonganSaatIni = () => {
    const indeks = indeksAntrianRef.current;
    const item = antrianSuaraRef.current[indeks];
    if (!item) {
      sedangMemutarRef.current = false;
      hentikanJagaSuara();
      setStatusPemutar("siaga");
      return;
    }

    const ucapan = buatUcapan(item.teks, kelas, guruKelamin);
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
    if (urlAudioRef.current) {
      URL.revokeObjectURL(urlAudioRef.current);
      urlAudioRef.current = null;
    }
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
  };

  const gantiSudutPandang = (sudut: SudutPandangMateri) => {
    if (sudut === sudutPandang) return;
    resetPemutar();
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

  const tanganiBuatModul = async () => {
    if (!nama.trim()) {
      setPesanGalat("Kapten, mohon isi Nama Siswa terlebih dahulu.");
      sudahGenerateRef.current = false;
      return;
    }

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

    setPesanGalat("");
    setIsLoading(true);
    doodleAbortRef.current?.abort();
    setStatusDoodle("siaga");
    setHasilData(null);
    setHasilAjuan(null);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setTahapBelajar("konsep");
    setSesiMapel("");
    setSesiMateri("");
    setSudutPandang("kurikulum");
    setDariCache(false);
    resetPemutar();

    try {
      const respons = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          kelas,
          mapel: mapelKirim,
          materi: modeInput === "teks" ? materiKirim : "Analisis AI",
          gambar: modeInput === "gambar" ? gambarHalaman : null,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        dariCache?: boolean;
        data?: ModulTutor;
      };

      if (data.berhasil && data.data) {
        setDariCache(Boolean(data.dariCache));
        const kurikulum = gantiNamaLengkapKeDepan(
          data.data.curriculum_view || data.data.penjelasan,
          nama,
        );
        const global = gantiNamaLengkapKeDepan(
          data.data.global_best_view || kurikulum,
          nama,
        );
        setHasilData({
          ...data.data,
          sapaan: sapaanTutorRingkas(nama, data.data.sapaan),
          penjelasan: kurikulum,
          curriculum_view: kurikulum,
          global_best_view: global,
        });
        setSudutPandang("kurikulum");
        setJawabanKuis({});
        setSesiMapel(mapelKirim);
        setSesiMateri(modeInput === "teks" ? materiKirim : "Analisis halaman buku");
        simpanProfil({ nama, kelas, guruKelamin });
        const sesi = catatSesiModul({
          nama,
          kelas,
          mapel: mapelKirim,
          materi: materiKirim,
          mode: modeInput,
          catatanEvaluasi: data.data.motivasi,
          kunciJawaban: data.data.kunciJawaban,
        });
        setSesiAktifId(sesi.id);
        void muatKuota();
        void muatIlustrasiDoodle(data.data);
      } else {
        setPesanGalat(data.pesan || "Modul gagal disusun.");
      }
    } catch {
      setPesanGalat("Gagal terhubung ke server.");
    }
    setIsLoading(false);
  };

  const kunciSesiMulai = `${params.get("mulai")}|${params.get("mapel")}|${params.get("materi")}|${params.get("r")}`;

  useEffect(() => {
    if (params.get("mulai") !== "1") return;
    sudahGenerateRef.current = false;
    setHasilData(null);
  }, [kunciSesiMulai, params]);

  useEffect(() => {
    if (params.get("mulai") !== "1" || sudahGenerateRef.current || hasilData) {
      return;
    }
    if (modeInput === "teks") {
      const mapelSiap = (params.get("mapel") || mapel).trim();
      const materiSiap = (params.get("materi") || bab).trim();
      if (!nama.trim() || !mapelSiap || !materiSiap) return;
    } else if (!nama.trim() || gambarHalaman.length === 0) {
      return;
    }
    sudahGenerateRef.current = true;
    void tanganiBuatModul();
    // Prefill selesai dulu, lalu generate sekali.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nama, mapel, bab, modeInput, gambarHalaman, kunciSesiMulai, hasilData]);

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
        setHasilAjuan({
          ...data.data,
          sapaan: sapaanTutorRingkas(nama, data.data.sapaan),
        });
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

  const mulaiAntrianCadangan = () => {
    if (!hasilData) return;
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
          ucapan: buatUcapan(potong, kelas, guruKelamin),
          jenis,
          offset,
          teksPenjelasan,
          percobaan: 0,
        });
        cariDari = offset + potong.length;
      }
    };

    masukkan(naskahLisan(hasilData.sapaan, nama), "sapaan");
    masukkan(
      naskahTutorUntukSuara("", penjelasanAktif, nama, {
        buangSubjudulVisual: kartuTanpaNaskah(kelas),
        tanpaSapaan: true,
      }),
      "penjelasan",
    );

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

  const audioChirpSiap = (kelaminSuara: KelaminGuru = guruKelamin) =>
    Boolean(urlAudioRef.current && kelaminAudioRef.current === kelaminSuara);

  const pasangAudioChirp = (
    data: {
      mime?: string;
      audioBase64: string;
      kata?: KataWaktu[];
      durasiDetik?: number;
    },
    kelaminSuara: KelaminGuru,
    lengkap: boolean,
  ) => {
    const biner = Uint8Array.from(atob(data.audioBase64), (c) =>
      c.charCodeAt(0),
    );
    const url = URL.createObjectURL(
      new Blob([biner], { type: data.mime || "audio/wav" }),
    );
    const urlLama = urlAudioRef.current;
    urlAudioRef.current = url;
    kelaminAudioRef.current = kelaminSuara;
    audioLengkapRef.current = lengkap;
    if (urlLama) URL.revokeObjectURL(urlLama);
    setSrcAudio(url);
    setKataWaktu(data.kata ?? []);
    const durasiChirp =
      typeof data.durasiDetik === "number" && data.durasiDetik > 0
        ? data.durasiDetik
        : data.kata?.[data.kata.length - 1]?.selesai;
    if (durasiChirp) setDurasiAudio(durasiChirp);
    setModeChirp(true);
    if (sedangMemutarRef.current) {
      void pemutarRef.current?.mainkanDari(url, waktuAudioRef.current);
    }
    return url;
  };

  const mintaAudioChirp = async (
    kelaminSuara: KelaminGuru,
    awalSaja: boolean,
  ): Promise<boolean> => {
    if (!hasilData) return false;
    const naskah = naskahTutorUntukSuara(
      hasilData.sapaan,
      penjelasanAktif,
      nama,
      { buangSubjudulVisual: kartuTanpaNaskah(kelas) },
    );
    try {
      const respons = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teks: naskah,
          kelamin: kelaminSuara === "pria" ? "male" : "female",
          kelas,
          awalSaja,
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
      if (awalSaja && audioLengkapRef.current && audioChirpSiap(kelaminSuara)) {
        return true;
      }
      if (data.berhasil && data.audioBase64 && !data.cadangan) {
        pasangAudioChirp(
          {
            mime: data.mime,
            audioBase64: data.audioBase64,
            kata: data.kata,
            durasiDetik: data.durasiDetik,
          },
          kelaminSuara,
          !awalSaja,
        );
        return true;
      }
    } catch {
      // Chirp belum siap
    }
    return false;
  };

  const siapkanAudioAwal = async (
    kelaminSuara: KelaminGuru = guruKelamin,
  ): Promise<boolean> => {
    if (!hasilData) return false;
    if (audioChirpSiap(kelaminSuara)) return true;
    if (muatAwalPromiseRef.current) return muatAwalPromiseRef.current;
    const permintaan = mintaAudioChirp(kelaminSuara, true);
    muatAwalPromiseRef.current = permintaan;
    try {
      return await permintaan;
    } finally {
      muatAwalPromiseRef.current = null;
    }
  };

  const siapkanAudioPenuh = async (
    kelaminSuara: KelaminGuru = guruKelamin,
  ): Promise<boolean> => {
    if (!hasilData) return false;
    if (audioLengkapRef.current && audioChirpSiap(kelaminSuara)) return true;
    if (muatPenuhPromiseRef.current) return muatPenuhPromiseRef.current;
    const permintaan = mintaAudioChirp(kelaminSuara, false);
    muatPenuhPromiseRef.current = permintaan;
    try {
      return await permintaan;
    } finally {
      muatPenuhPromiseRef.current = null;
    }
  };

  const siapkanAudioGuru = async (
    kelaminSuara: KelaminGuru = guruKelamin,
  ): Promise<boolean> => {
    const awal = await siapkanAudioAwal(kelaminSuara);
    void siapkanAudioPenuh(kelaminSuara);
    return awal;
  };

  const putarDariAwal = async (kelaminSuara: KelaminGuru = guruKelamin) => {
    if (!hasilData) return;
    window.speechSynthesis.cancel();
    hentikanKetik();
    hentikanJagaSuara();

    const siap = audioChirpSiap(kelaminSuara)
      ? true
      : await siapkanAudioAwal(kelaminSuara);
    void siapkanAudioPenuh(kelaminSuara);
    if (siap && urlAudioRef.current) {
      sedangMemutarRef.current = true;
      setModeChirp(true);
      setStatusPemutar("memutar");
      try {
        await pemutarRef.current?.mainkanDariAwal(urlAudioRef.current);
        return;
      } catch {
        // coba naskah penuh dulu, baru cadangan browser
      }
    }
    const penuh = await siapkanAudioPenuh(kelaminSuara);
    if (penuh && urlAudioRef.current) {
      sedangMemutarRef.current = true;
      setModeChirp(true);
      setStatusPemutar("memutar");
      try {
        await pemutarRef.current?.mainkanDariAwal(urlAudioRef.current);
        return;
      } catch {
        // cadangan browser
      }
    }
    mulaiAntrianCadangan();
  };

  const mulaiSuara = () => {
    if (!hasilData) return;
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
      mulaiKetikDari(penjelasanAktif, indeksKetikRef.current);
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
      sedangMemutarRef.current = true;
      setModeChirp(true);
      setStatusPemutar("memutar");
      void pemutarRef.current?.lanjutkan();
      return;
    }

    if (audioChirpSiap()) {
      sedangMemutarRef.current = true;
      setModeChirp(true);
      setStatusPemutar("memutar");
      setWaktuAudio(0);
      waktuAudioRef.current = 0;
      void siapkanAudioPenuh();
      void pemutarRef.current
        ?.mainkanDariAwal(urlAudioRef.current)
        .catch(() => {
          void putarDariAwal();
        });
      return;
    }

    setStatusPemutar("menyiapkan");
    void (async () => {
      const siap = await siapkanAudioAwal();
      if (siap && urlAudioRef.current) {
        sedangMemutarRef.current = true;
        setModeChirp(true);
        setStatusPemutar("memutar");
        setWaktuAudio(0);
        waktuAudioRef.current = 0;
        void siapkanAudioPenuh();
        try {
          await pemutarRef.current?.mainkanDariAwal(urlAudioRef.current);
          return;
        } catch {
          // lanjut ke naskah penuh
        }
      }
      await putarDariAwal();
    })();
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
    if (!hasilData) return;
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
    if (!hasilData) return;
    const naskah = naskahTutorUntukSuara(
      hasilData.sapaan,
      penjelasanAktif,
      nama,
      { buangSubjudulVisual: kartuTanpaNaskah(kelas) },
    );
    const durasiEst =
      durasiAudio > 0 ? durasiAudio : naskah.length / KARAKTER_PER_DETIK;
    const rasio = durasiEst > 0 ? aman / durasiEst : 0;
    const indeks = Math.floor(
      pecahTokenNaskah(naskah).length * Math.min(1, rasio),
    );
    setIndeksKata(indeks);
    indeksKetikRef.current = Math.floor(
      penjelasanAktif.length * Math.min(1, rasio),
    );
    setTeksAnimasi(penjelasanAktif.slice(0, indeksKetikRef.current));
  };

  const pilihJawabanKuis = (nomor: number, pilihan: string) => {
    if (jawabanKuis[String(nomor)]) return;
    const kunci = hurufKunci(hasilData?.kunciJawaban, nomor);
    setJawabanKuis((sebelum) => ({ ...sebelum, [String(nomor)]: pilihan }));
    if (sesiAktifId) {
      catatJawabanKuis(sesiAktifId, nomor, pilihan, kunci === pilihan);
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
    if (!audioLengkapRef.current) {
      sedangMemutarRef.current = true;
      setStatusPemutar("menyiapkan");
      void siapkanAudioPenuh().then((ok) => {
        if (ok && urlAudioRef.current) {
          setStatusPemutar("memutar");
          void pemutarRef.current?.mainkanDari(
            urlAudioRef.current,
            waktuAudioRef.current,
          );
          return;
        }
        sedangMemutarRef.current = false;
        setStatusPemutar("siaga");
      });
      return;
    }
    sedangMemutarRef.current = false;
    setStatusPemutar("siaga");
    setWaktuAudio((sebelum) => (durasiAudio > 0 ? durasiAudio : sebelum));
    if (hasilData) {
      setTeksAnimasi(penjelasanAktif);
      setIndeksKata(
        pecahTokenNaskah(`${hasilData.sapaan} ${penjelasanAktif}`).length - 1,
      );
    }
  }, [durasiAudio, hasilData, penjelasanAktif]);

  useEffect(() => {
    if (!hasilData || sudahSiapAudioRef.current) return;
    sudahSiapAudioRef.current = true;
    void siapkanAudioGuru();
    // Siapkan potongan awal Chirp dulu, lalu naskah penuh di belakang.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasilData, sudutPandang]);

  const kembaliKeMenu = () => {
    hentikanRekamSuara();
    resetPemutar();
    sudahSiapAudioRef.current = false;
    setHasilData(null);
    setHasilAjuan(null);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setJawabanKuis({});
    setTahapBelajar("konsep");
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
              Ketik judul materi atau unggah halaman buku. $IGIL menampilkan peta konsep dan kartu ringkasan dulu, baru membuka soal latihan untuk menambang token.
            </p>
            <Link
              href="/ruang-belajar"
              className={`${kelasTombolUtama} px-8 py-4 rounded-full font-extrabold text-lg shadow-lg shadow-[#1C01A5]/25 mx-auto mt-4 flex items-center justify-center gap-2 text-center`}
            >
              Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </section>
        </div>
      ) : !hasilData ? (
        <div className="animate-in fade-in duration-500 w-full px-2 pt-16 pb-20 text-center">
          {pesanGalat ? (
            <div className="rounded-3xl border-2 border-rose-100 bg-rose-50 p-8">
              <p className="font-semibold text-rose-600">{pesanGalat}</p>
              <Link
                href="/ruang-belajar"
                className={`${kelasTombolUtama} mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 font-extrabold`}
              >
                Kembali ke Ruang Belajar
              </Link>
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-8 shadow-xl">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#1C01A5]" />
              <p className="mt-4 text-lg font-extrabold text-[#1C01A5]">
                Menyusun modul cerdas...
              </p>
            </div>
          )}
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
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-[#1C01A5]/15 p-8 space-y-8">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider ${
                  tahapBelajar === "konsep"
                    ? "bg-[#F0AB00] text-[#1C01A5]"
                    : "bg-[#1C01A5]/10 text-[#1C01A5]/70"
                }`}
              >
                1 · Konsep
              </span>
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider ${
                  tahapBelajar === "latihan"
                    ? "bg-[#F0AB00] text-[#1C01A5]"
                    : "bg-[#1C01A5]/10 text-[#1C01A5]/70"
                }`}
              >
                2 · Soal latihan
              </span>
            </div>
            {dariCache ? (
              <p className="rounded-2xl border border-[#1C01A5]/15 bg-[#EEE9FF] px-4 py-3 text-sm font-bold text-[#1C01A5]">
                Materi dua perspektif dimuat dari cache Supabase, tanpa memanggil Gemini ulang.
              </p>
            ) : null}
            {tahapBelajar === "konsep" ? (
              <RingkasanKonsep
                materi={sesiMateri || (modeInput === "teks" ? bab : "Analisis halaman buku")}
                mapel={sesiMapel || (modeInput === "teks" ? mapel : "Berdasarkan Buku")}
                kelas={kelas}
                penjelasan={penjelasanAktif}
                sapaan={hasilData.sapaan}
                kartuAktif={kartuAktif}
                gambarSisipan={hasilData.gambarSisipan}
                doodleMemuat={statusDoodle === "memuat"}
                sudutPandang={sudutPandang}
                onGantiSudut={gantiSudutPandang}
                sedangMemutar={statusPemutar === "memutar"}
              />
            ) : (
              <div className="rounded-[2rem] border-2 border-[#1C01A5]/15 bg-gradient-to-br from-[#EEE9FF] via-white to-[#FFF8E8] p-5 sm:p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
                  Langkah 2 · Tambang token dari soal
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#1C01A5] sm:text-3xl">
                  {sesiMateri || (modeInput === "teks" ? bab : "Latihan dari buku")}
                </h2>
                <p className="mt-2 text-sm font-bold text-[#1C01A5]/70">
                  Konsep sudah dibuka. Kerjakan 5 soal, lalu lihat rapor.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setTahapBelajar("konsep");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-extrabold text-[#1C01A5] hover:border-[#F0AB00]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Lihat peta konsep lagi
                </button>
              </div>
            )}

            <div className="p-6 bg-white rounded-2xl border-2 border-[#1C01A5]/20 space-y-4">
              <label className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-[#1C01A5]">
                <MessageCircleQuestionMark className="w-5 h-5" />
                AJUKAN PERTANYAAN
              </label>
              <p className="text-sm text-slate-600">
                Apakah ada yang ingin ditanyakan?...
              </p>
              {dariCache ? (
                <p className="text-xs font-bold text-[#1C01A5]/70">
                  Materi ini dimuat dari perpustakaan $IGIL, tanpa memanggil AI ulang.
                </p>
              ) : null}
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
                <div className="bg-white rounded-2xl border border-[#1C01A5]/15 p-5 space-y-4">
                  <p className="font-extrabold text-[#1C01A5]">{hasilAjuan.sapaan}</p>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C48800] mb-2">
                      Panduan Langkah Demi Langkah
                    </p>
                    <TeksNaskah teks={hasilAjuan.panduanLangkah} />
                  </div>
                  {hasilAjuan.caraKurikulum ? (
                    <div className="p-4 rounded-xl bg-white border border-[#1C01A5]/15">
                      <p className="text-sm font-extrabold text-[#1C01A5] mb-2">
                        Cara Resmi Kurikulum Merdeka
                      </p>
                      <TeksNaskah teks={hasilAjuan.caraKurikulum} />
                    </div>
                  ) : null}
                  {hasilAjuan.trikBimbel ? (
                    <div className="p-4 rounded-xl bg-[#FFF8E8] border border-[#F0AB00]/40">
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

            {tahapBelajar === "konsep" ? (
              <button
                type="button"
                onClick={() => {
                  setTahapBelajar("latihan");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${kelasTombolUtama} flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20`}
              >
                Aku sudah paham · Kerjakan soal
                <ArrowRight className="h-5 w-5 text-[#F0AB00]" />
              </button>
            ) : null}

            {tahapBelajar === "latihan" ? (
            <div className="space-y-8">
            <div className="p-6 bg-[#FFF8E8] rounded-2xl border border-[#F0AB00]/40 shadow-sm">
              <div className="text-[#1C01A5] font-extrabold mb-4 flex items-center gap-2">
                <span>Latihan Soal</span>
                <span className="text-sm font-semibold text-[#C48800]">
                  3 Standar · 2 HOTS · Trik Bimbel untuk hitungan
                </span>
              </div>
              <div className="space-y-6 text-slate-700 text-lg font-medium">
                {hasilData.pertanyaan
                  .split(/\n\n+/)
                  .map((soal) => soal.trim())
                  .filter(Boolean)
                  .map((soal, indeks) => {
                    const nomor = indeks + 1;
                    const pilihan = jawabanKuis[String(nomor)];
                    const kunci = hurufKunci(hasilData.kunciJawaban, nomor);
                    const sudahJawab = Boolean(pilihan);
                    const benar = sudahJawab && pilihan === kunci;
                    return (
                      <div key={`soal-${nomor}`}>
                        <p className="whitespace-pre-wrap">{soal}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {["A", "B", "C", "D"].map((huruf) => {
                            const aktif = pilihan === huruf;
                            const tampilKunci = sudahJawab && huruf === kunci;
                            return (
                              <button
                                key={huruf}
                                type="button"
                                onClick={() => pilihJawabanKuis(nomor, huruf)}
                                disabled={sudahJawab}
                                className={`rounded-xl border-2 px-4 py-2 text-sm font-extrabold ${
                                  tampilKunci
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : aktif
                                      ? "border-rose-600 bg-rose-600 text-white"
                                      : "border-[#1C01A5]/20 bg-white text-[#1C01A5] hover:border-[#F0AB00] disabled:opacity-60"
                                }`}
                              >
                                {huruf}
                              </button>
                            );
                          })}
                        </div>
                        {sudahJawab ? (
                          <p
                            className={`mt-2 text-sm font-extrabold ${
                              benar ? "text-emerald-700" : "text-rose-700"
                            }`}
                          >
                            {benar
                              ? "Benar. Jawabanmu tepat."
                              : kunci
                                ? `Salah. Jawaban yang benar adalah ${kunci}.`
                                : "Jawaban tersimpan. Kunci soal belum tersedia untuk modul ini."}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                <p className="text-xs font-semibold text-slate-500">
                  Pilih satu jawaban. Hasil dicek langsung. Ketepatan di Rapor dihitung dari jawaban yang benar.
                </p>
              </div>
            </div>
            <div className="text-sm font-bold text-[#1C01A5] bg-white p-4 rounded-xl border-2 border-dashed border-[#F0AB00]/50 flex items-center gap-3 text-center justify-center">
              <span className="text-2xl">✨</span>
              <div>{hasilData.motivasi}</div>
            </div>
            </div>
            ) : null}
          </div>
        </div>
        <PemutarAudioGuru
          ref={pemutarRef}
          src={srcAudio}
          memutar={modeChirp && statusPemutar === "memutar"}
          padaWaktu={padaWaktuAudio}
          padaDurasi={padaDurasiAudio}
          padaSelesai={padaSelesaiAudio}
        />
        <PemutarTutorMengambang
          memutar={statusPemutar === "memutar"}
          waktu={waktuAudio}
          durasi={durasiAudio}
          padaToggle={toggleSuara}
          padaUlang={cariUlangSuara}
          menyiapkan={statusPemutar === "menyiapkan"}
        />
        </>
      )}
    </main>
  );
}
