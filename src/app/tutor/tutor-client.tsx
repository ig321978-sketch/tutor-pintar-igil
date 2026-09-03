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
import { DATA_KURIKULUM, OPSI_LAIN_NYA } from "@/lib/kurikulum";
import { hurufKunci } from "@/lib/kuis";
import {
  bacaProgres,
  catatEvaluasiTambahan,
  catatJawabanKuis,
  catatSesiModul,
  simpanProfil,
} from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";
import { pecahTokenNaskah, skalaWaktuKata, type KataWaktu } from "@/lib/tts";
import GambarDoodle, { type GambarSisipan } from "@/components/GambarDoodle";
import NaskahSinkron from "@/components/NaskahSinkron";
import PemutarAudioGuru, { indeksKataAktif } from "@/components/PemutarAudioGuru";
import PilihGuru from "@/components/PilihGuru";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  MessageCircleQuestionMark,
  Mic,
  Pause,
  Play,
  Send,
  Square,
  Volume2,
} from "lucide-react";

type ModeInput = "teks" | "gambar";
type StatusPemutar = "siaga" | "memutar" | "jeda";

type ModulTutor = {
  sapaan: string;
  penjelasan: string;
  sketsaDeskripsi: string;
  sketsaSisipan1?: string;
  sketsaSisipan2?: string;
  svgCode: string;
  pertanyaan: string;
  kunciJawaban?: string[];
  motivasi: string;
  gambarUtama?: string | null;
  gambarSisipan?: GambarSisipan[];
};

type StatusDoodle = "siaga" | "memuat" | "siap" | "gagal";

function NaskahBergambar({
  teksPenuh,
  teksTerlihat,
  gambarSisipan,
  sedangMengetik,
}: {
  teksPenuh: string;
  teksTerlihat: string;
  gambarSisipan: GambarSisipan[];
  sedangMengetik: boolean;
}) {
  const paragraf = teksPenuh.split("\n\n");
  const elemen: React.ReactNode[] = [];
  let offset = 0;

  for (let i = 0; i < paragraf.length; i += 1) {
    const isi = paragraf[i];
    const mulai = offset;
    const akhir = mulai + isi.length;
    offset = akhir + 2;

    if (teksTerlihat.length <= mulai) break;

    const panjangTerlihat = Math.max(
      0,
      Math.min(isi.length, teksTerlihat.length - mulai),
    );
    const paragrafSelesai = teksTerlihat.length >= akhir;
    const kursorDiSini =
      sedangMengetik &&
      teksTerlihat.length >= mulai &&
      teksTerlihat.length < akhir;

    elemen.push(
      <p key={`paragraf-${i}`} className="whitespace-pre-wrap">
        {isi.slice(0, panjangTerlihat)}
        {kursorDiSini ? (
          <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-[#F0AB00]" />
        ) : null}
      </p>,
    );

    const sisipan = gambarSisipan.find((item) => item.setelahParagraf === i + 1);
    if (sisipan && paragrafSelesai && sisipan.src) {
      elemen.push(
        <GambarDoodle
          key={`doodle-${i}`}
          src={sisipan.src}
          alt={sisipan.alt}
          ukuran={sisipan.ukuran}
        />,
      );
    }
  }

  return <div className="space-y-6">{elemen}</div>;
}

type PanduanAjuan = {
  sapaan: string;
  panduanLangkah: string;
  caraKurikulum: string;
  trikBimbel: string;
  dorongan: string;
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
const INTERVAL_JAGA_SUARA_MS = 8000;
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
  const [statusPemutar, setStatusPemutar] = useState<StatusPemutar>("siaga");
  const [teksAnimasi, setTeksAnimasi] = useState("");
  const [pesanGalat, setPesanGalat] = useState("");
  const [teksAjuan, setTeksAjuan] = useState("");
  const [isLoadingAjuan, setIsLoadingAjuan] = useState(false);
  const [hasilAjuan, setHasilAjuan] = useState<PanduanAjuan | null>(null);
  const [pesanAjuan, setPesanAjuan] = useState("");
  const [sedangRekam, setSedangRekam] = useState(false);
  const [statusDoodle, setStatusDoodle] = useState<StatusDoodle>("siaga");
  const [sesiAktifId, setSesiAktifId] = useState<string | null>(null);
  const [jawabanKuis, setJawabanKuis] = useState<Record<string, string>>({});

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
  const sudahAutoPutarRef = useRef(false);
  const [srcAudio, setSrcAudio] = useState<string | null>(null);
  const [kataWaktu, setKataWaktu] = useState<KataWaktu[]>([]);
  const [indeksKata, setIndeksKata] = useState(-1);
  const [modeChirp, setModeChirp] = useState(false);

  const daftarMapel = useMemo(
    () => (DATA_KURIKULUM[kelas] ? Object.keys(DATA_KURIKULUM[kelas]) : []),
    [kelas],
  );
  const daftarBab = useMemo(() => {
    if (!pilihanMapel || pilihanMapel === OPSI_LAIN_NYA) return [];
    return DATA_KURIKULUM[kelas]?.[pilihanMapel] ?? [];
  }, [kelas, pilihanMapel]);

  const mapel =
    pilihanMapel === OPSI_LAIN_NYA ? mapelManual : pilihanMapel;
  const bab = pilihanBab === OPSI_LAIN_NYA ? babManual : pilihanBab;

  const offsetKataSapaan = hasilData
    ? pecahTokenNaskah(hasilData.sapaan).length
    : 0;
  const indeksKataPenjelasan = indeksKata - offsetKataSapaan;
  const progresKetik = hasilData
    ? modeChirp && kataWaktu.length > 0
      ? Math.min(
          100,
          Math.round(((Math.max(indeksKata, 0) + 1) / kataWaktu.length) * 100),
        )
      : Math.min(
          100,
          Math.round(
            (teksAnimasi.length / Math.max(hasilData.penjelasan.length, 1)) * 100,
          ),
        )
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
    jagaSuaraRef.current = window.setInterval(() => {
      if (!sedangMemutarRef.current) return;
      if (!window.speechSynthesis.speaking || window.speechSynthesis.paused) return;
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }, INTERVAL_JAGA_SUARA_MS);

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
  };

  const muatIlustrasiDoodle = async (modul: ModulTutor) => {
    doodleAbortRef.current?.abort();
    const pengontrol = new AbortController();
    doodleAbortRef.current = pengontrol;
    setStatusDoodle("memuat");

    try {
      const respons = await fetch("/api/tutor/ilustrasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: pengontrol.signal,
        body: JSON.stringify({
          kelas,
          mapel: modeInput === "teks" ? mapel : "Berdasarkan Buku",
          materi: modeInput === "teks" ? bab : "Analisis AI",
          penjelasan: modul.penjelasan,
          sketsaDeskripsi: modul.sketsaDeskripsi,
          sketsaSisipan1: modul.sketsaSisipan1,
          sketsaSisipan2: modul.sketsaSisipan2,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        gambarUtama?: string | null;
        gambarSisipan?: GambarSisipan[];
      };

      if (pengontrol.signal.aborted) return;

      if (data.berhasil && (data.gambarUtama || (data.gambarSisipan?.length ?? 0) > 0)) {
        setHasilData((sebelum) =>
          sebelum
            ? {
                ...sebelum,
                gambarUtama: data.gambarUtama ?? null,
                gambarSisipan: data.gambarSisipan ?? [],
              }
            : sebelum,
        );
        setStatusDoodle("siap");
      } else {
        setStatusDoodle("gagal");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusDoodle("gagal");
    }
  };

  const tanganiBuatModul = async () => {
    if (!nama.trim()) {
      setPesanGalat("Kapten, mohon isi Nama Siswa terlebih dahulu.");
      return;
    }

    if (modeInput === "teks") {
      if (!mapel.trim()) {
        setPesanGalat("Mohon isi Mata Pelajaran.");
        return;
      }
      if (!bab.trim()) {
        setPesanGalat("Mohon isi Materi Pembahasan.");
        return;
      }
    } else if (gambarHalaman.length === 0) {
      setPesanGalat("Mohon unggah foto halaman buku terlebih dahulu.");
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
    resetPemutar();

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
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        data?: ModulTutor;
      };

      if (data.berhasil && data.data) {
        setHasilData(data.data);
        setJawabanKuis({});
        simpanProfil({ nama, kelas, guruKelamin });
        const sesi = catatSesiModul({
          nama,
          kelas,
          mapel: modeInput === "teks" ? mapel : "Berdasarkan Buku",
          materi: modeInput === "teks" ? bab : "Analisis AI",
          mode: modeInput,
          catatanEvaluasi: data.data.motivasi,
          kunciJawaban: data.data.kunciJawaban,
        });
        setSesiAktifId(sesi.id);
        void muatIlustrasiDoodle(data.data);
      } else {
        setPesanGalat(data.pesan || "Modul gagal disusun.");
      }
    } catch {
      setPesanGalat("Gagal terhubung ke server.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.get("mulai") !== "1" || sudahGenerateRef.current || hasilData) {
      return;
    }
    if (modeInput === "teks") {
      if (!nama.trim() || !mapel.trim() || !bab.trim()) return;
    } else if (!nama.trim() || gambarHalaman.length === 0) {
      return;
    }
    sudahGenerateRef.current = true;
    void tanganiBuatModul();
    // Prefill selesai dulu, lalu generate sekali.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nama, mapel, bab, modeInput, gambarHalaman]);

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

  const tanganiAjuanPertanyaan = async () => {
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
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        data?: PanduanAjuan;
      };

      if (data.berhasil && data.data) {
        setHasilAjuan(data.data);
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
      teksPenjelasan = hasilData.penjelasan,
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

    masukkan(hasilData.sapaan, "sapaan");
    masukkan(hasilData.penjelasan, "penjelasan");
    masukkan(`${hasilData.pertanyaan}. ${hasilData.motivasi}`, "sisa");

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

  const putarDariAwal = async (kelaminSuara: KelaminGuru = guruKelamin) => {
    if (!hasilData) return;
    resetPemutar();
    const naskah = `${hasilData.sapaan} ${hasilData.penjelasan}`.replace(/\s+/g, " ").trim();
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
      };
      if (data.berhasil && data.audioBase64 && !data.cadangan) {
        const biner = Uint8Array.from(atob(data.audioBase64), (c) =>
          c.charCodeAt(0),
        );
        const url = URL.createObjectURL(
          new Blob([biner], { type: data.mime || "audio/mpeg" }),
        );
        urlAudioRef.current = url;
        setSrcAudio(url);
        setKataWaktu(data.kata ?? []);
        setModeChirp(true);
        sedangMemutarRef.current = true;
        setStatusPemutar("memutar");
        return;
      }
    } catch {
      // jatuh ke cadangan browser
    }
    mulaiAntrianCadangan();
  };

  const mulaiSuara = () => {
    if (!hasilData) return;

    if (statusPemutar === "jeda") {
      sedangMemutarRef.current = true;
      if (modeChirp) {
        setStatusPemutar("memutar");
        return;
      }
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.speaking) {
        bicaraPotonganSaatIni();
      }
      mulaiKetikDari(hasilData.penjelasan, indeksKetikRef.current);
      mulaiJagaSuara();
      setStatusPemutar("memutar");
      return;
    }

    void putarDariAwal();
  };

  const jedaSuara = () => {
    sedangMemutarRef.current = false;
    window.speechSynthesis.pause();
    hentikanKetik();
    hentikanJagaSuara();
    setStatusPemutar("jeda");
  };

  const hentikanSuara = () => {
    resetPemutar();
    if (hasilData) {
      setTeksAnimasi(hasilData.penjelasan);
      indeksKetikRef.current = hasilData.penjelasan.length;
      setIndeksKata(pecahTokenNaskah(`${hasilData.sapaan} ${hasilData.penjelasan}`).length - 1);
    }
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
      setIndeksKata(indeksKataAktif(kataWaktu, detik));
    },
    [kataWaktu],
  );

  const padaDurasiAudio = useCallback((detik: number) => {
    setKataWaktu((sebelum) => {
      if (sebelum.length === 0) return sebelum;
      const terakhir = sebelum[sebelum.length - 1]?.selesai ?? 0;
      return skalaWaktuKata(sebelum, terakhir, detik);
    });
  }, []);

  const padaSelesaiAudio = useCallback(() => {
    sedangMemutarRef.current = false;
    setStatusPemutar("siaga");
    if (hasilData) {
      setTeksAnimasi(hasilData.penjelasan);
      setIndeksKata(
        pecahTokenNaskah(`${hasilData.sapaan} ${hasilData.penjelasan}`).length - 1,
      );
    }
  }, [hasilData]);

  const gantiGuru = (kelamin: KelaminGuru) => {
    setGuruKelamin(kelamin);
    simpanProfil({
      nama: nama || bacaProgres().profil.nama,
      kelas,
      guruKelamin: kelamin,
    });
    if (hasilData) {
      sudahAutoPutarRef.current = true;
      void putarDariAwal(kelamin);
    }
  };

  useEffect(() => {
    if (!hasilData || sudahAutoPutarRef.current) return;
    sudahAutoPutarRef.current = true;
    void putarDariAwal();
    // Auto-putar sekali saat modul baru siap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasilData]);

  const kembaliKeMenu = () => {
    hentikanRekamSuara();
    resetPemutar();
    sudahAutoPutarRef.current = false;
    setHasilData(null);
    setHasilAjuan(null);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setJawabanKuis({});
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
              Ketik judul materi atau unggah halaman buku. $IGIL menyusun penjelasan mendalam, sketsa doodle, dan soal-soal latihan — lalu membacakannya untukmu.
            </p>
            <div className="mb-8 text-left">
              <PilihGuru
                kelas={kelas}
                nilai={guruKelamin}
                onGanti={gantiGuru}
              />
            </div>
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
        <div className="w-full px-2 pt-6 pb-20 animate-in slide-in-from-bottom-10 duration-700">
          <div className="bg-[#1C01A5] text-white rounded-2xl shadow-xl shadow-[#1C01A5]/20 p-4 sm:p-5 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="button"
                onClick={kembaliKeMenu}
                className="flex items-center gap-2 text-[#F0AB00] font-bold hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" /> Ganti Materi
              </button>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-[#F0AB00]">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Tutor Suara
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {statusPemutar !== "memutar" ? (
                    <button
                      type="button"
                      onClick={mulaiSuara}
                      className="bg-[#F0AB00] text-[#1C01A5] p-3 rounded-full hover:bg-[#e09e00] transition-all shadow-md"
                      title={statusPemutar === "jeda" ? "Lanjutkan" : "Putar"}
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={jedaSuara}
                      className="bg-[#F0AB00]/70 text-[#1C01A5] p-3 rounded-full hover:bg-[#F0AB00]/50 transition-all shadow-md"
                      title="Jeda"
                    >
                      <Pause className="w-5 h-5 fill-current" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={hentikanSuara}
                    className="bg-rose-500 text-white p-3 rounded-full hover:bg-rose-400 transition-all shadow-md"
                    title="Stop"
                  >
                    <Square className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F0AB00] transition-[width] duration-150"
                style={{ width: `${progresKetik}%` }}
              />
            </div>
            <PemutarAudioGuru
              src={srcAudio}
              memutar={modeChirp && statusPemutar === "memutar"}
              padaWaktu={padaWaktuAudio}
              padaDurasi={padaDurasiAudio}
              padaSelesai={padaSelesaiAudio}
            />
            <div className="mt-4 text-left">
              <PilihGuru
                kelas={kelas}
                nilai={guruKelamin}
                onGanti={gantiGuru}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border-2 border-[#1C01A5]/15 p-8 space-y-8">
            <div className="text-2xl font-extrabold text-[#1C01A5] border-b border-[#1C01A5]/15 pb-4">
              {hasilData.sapaan}
            </div>
            <div className="relative">
              {hasilData.gambarUtama ? (
                <GambarDoodle
                  src={hasilData.gambarUtama}
                  alt={hasilData.sketsaDeskripsi || "Sketsa doodle materi"}
                  ukuran="lebar"
                />
              ) : (
                <figure className="rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea] p-4 text-center shadow-inner">
                  <div
                    className="mx-auto max-w-xl"
                    dangerouslySetInnerHTML={{ __html: hasilData.svgCode }}
                  />
                  <figcaption className="mt-4 text-sm font-medium italic text-slate-500">
                    {statusDoodle === "memuat"
                      ? "Menggambar sketsa doodle materi..."
                      : hasilData.sketsaDeskripsi}
                  </figcaption>
                </figure>
              )}
              {statusDoodle === "memuat" && !hasilData.gambarUtama ? (
                <div className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#1C01A5]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menggambar sketsa doodle...
                </div>
              ) : null}
            </div>
            <div className="min-h-[150px] text-xl font-medium leading-loose text-slate-700">
              {modeChirp ? (
                <NaskahSinkron
                  teksPenuh={hasilData.penjelasan}
                  indeksKata={indeksKataPenjelasan}
                  sedangMemutar={statusPemutar === "memutar"}
                  gambarSisipan={hasilData.gambarSisipan ?? []}
                />
              ) : teksAnimasi === "" && statusPemutar === "siaga" ? (
                <span className="italic text-slate-400">
                  Tekan tombol Play (▶) di atas untuk mendengarkan dan memunculkan teks penjelasan...
                </span>
              ) : (
                <NaskahBergambar
                  teksPenuh={hasilData.penjelasan}
                  teksTerlihat={teksAnimasi}
                  gambarSisipan={hasilData.gambarSisipan ?? []}
                  sedangMengetik={statusPemutar === "memutar"}
                />
              )}
            </div>

            <div className="p-6 bg-white rounded-2xl border-2 border-[#1C01A5]/20 space-y-4">
              <label className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-[#1C01A5]">
                <MessageCircleQuestionMark className="w-5 h-5" />
                AJUKAN PERTANYAAN
              </label>
              <p className="text-sm text-slate-600">
                Apakah ada yang ingin ditanyakan?...
              </p>
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
                onClick={() => void tanganiAjuanPertanyaan()}
                disabled={isLoadingAjuan}
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

              {hasilAjuan ? (
                <div className="bg-white rounded-2xl border border-[#1C01A5]/15 p-5 space-y-4">
                  <p className="font-extrabold text-[#1C01A5]">{hasilAjuan.sapaan}</p>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C48800] mb-2">
                      Panduan Langkah Demi Langkah
                    </p>
                    <div className="text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                      {hasilAjuan.panduanLangkah}
                    </div>
                  </div>
                  {hasilAjuan.caraKurikulum ? (
                    <div className="p-4 rounded-xl bg-white border border-[#1C01A5]/15">
                      <p className="text-sm font-extrabold text-[#1C01A5] mb-2">
                        Cara Resmi Kurikulum Merdeka
                      </p>
                      <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {hasilAjuan.caraKurikulum}
                      </div>
                    </div>
                  ) : null}
                  {hasilAjuan.trikBimbel ? (
                    <div className="p-4 rounded-xl bg-[#FFF8E8] border border-[#F0AB00]/40">
                      <p className="text-sm font-extrabold text-[#C48800] mb-2">
                        Trik Cepat Bimbel
                      </p>
                      <div className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {hasilAjuan.trikBimbel}
                      </div>
                    </div>
                  ) : null}
                  <p className="text-sm font-bold text-[#1C01A5] italic">
                    {hasilAjuan.dorongan}
                  </p>
                </div>
              ) : null}
            </div>

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
        </div>
      )}
    </main>
  );
}
