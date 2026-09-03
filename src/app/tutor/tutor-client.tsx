"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PilihGuru from "@/components/PilihGuru";
import {
  buatUcapanGuru,
  normalisasiKelaminGuru,
  profilGuru,
  type KelaminGuru,
} from "@/lib/guru";
import { DATA_KURIKULUM, DAFTAR_KELAS, OPSI_LAIN_NYA } from "@/lib/kurikulum";
import { hurufKunci } from "@/lib/kuis";
import {
  bacaProgres,
  catatEvaluasiTambahan,
  catatJawabanKuis,
  catatSesiModul,
  simpanProfil,
} from "@/lib/progres";
import { kelasInput, kelasLabel, kelasTombolUtama } from "@/lib/tema";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  FileText,
  GraduationCap,
  Keyboard,
  Loader2,
  MessageCircleQuestionMark,
  Mic,
  Pause,
  PenLine,
  Play,
  Send,
  Sparkles,
  Square,
  UploadCloud,
  User,
  Volume2,
} from "lucide-react";

type ModeInput = "teks" | "gambar";
type StatusPemutar = "siaga" | "memutar" | "jeda";

type UkuranDoodle = "kecil" | "sedang" | "lebar";

type GambarSisipan = {
  setelahParagraf: number;
  src: string;
  alt: string;
  ukuran: UkuranDoodle;
};

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

function kelasLebarDoodle(ukuran: UkuranDoodle): string {
  if (ukuran === "kecil") return "max-w-[220px] md:max-w-[260px]";
  if (ukuran === "sedang") return "max-w-md";
  return "max-w-3xl";
}

function GambarDoodle({
  src,
  alt,
  ukuran,
  keterangan,
}: {
  src: string;
  alt: string;
  ukuran: UkuranDoodle;
  keterangan?: string;
}) {
  return (
    <figure
      className={`relative mx-auto w-full ${kelasLebarDoodle(ukuran)} rotate-[-0.4deg]`}
    >
      <div className="rounded-2xl border-2 border-dashed border-[#1C01A5]/20 bg-[#fbf6ea] p-2.5 shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="w-full rounded-xl object-cover"
        />
      </div>
      {keterangan ? (
        <figcaption className="mt-3 text-center text-sm font-medium italic text-slate-500">
          {keterangan}
        </figcaption>
      ) : null}
    </figure>
  );
}

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

const LAJU_BICARA = 0.92;
const KARAKTER_PER_DETIK = 13 * LAJU_BICARA;
const INTERVAL_KETIK_MS = Math.max(32, Math.round(1000 / KARAKTER_PER_DETIK));
const BATAS_UKURAN_BYTE = 5 * 1024 * 1024;
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

function kompresGambar(file: File): Promise<string> {
  return new Promise((selesai, gagal) => {
    const reader = new FileReader();
    reader.onerror = () => gagal(new Error("Gagal membaca berkas."));
    reader.onload = () => {
      const gambar = new Image();
      gambar.onload = () => {
        const batas = 1280;
        const rasio = Math.min(1, batas / Math.max(gambar.width, gambar.height));
        const kanvas = document.createElement("canvas");
        kanvas.width = Math.max(1, Math.round(gambar.width * rasio));
        kanvas.height = Math.max(1, Math.round(gambar.height * rasio));
        const ctx = kanvas.getContext("2d");
        if (!ctx) {
          selesai(reader.result as string);
          return;
        }
        ctx.drawImage(gambar, 0, 0, kanvas.width, kanvas.height);
        selesai(kanvas.toDataURL("image/jpeg", 0.78));
      };
      gambar.onerror = () => selesai(reader.result as string);
      gambar.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function TutorAI() {
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
  const [gambarBase64, setGambarBase64] = useState<string | null>(null);
  const [sedangSeret, setSedangSeret] = useState(false);
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
  const inputBerkasRef = useRef<HTMLInputElement | null>(null);
  const pengenalSuaraRef = useRef<MesinRekamSuara | null>(null);
  const transkripFinalRef = useRef("");
  const doodleAbortRef = useRef<AbortController | null>(null);

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

  const progresKetik = hasilData
    ? Math.min(
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
    setStatusPemutar("siaga");
  };

  const tanganiBerkas = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPesanGalat("Berkas harus berupa gambar PNG atau JPG.");
      return;
    }
    if (file.size > BATAS_UKURAN_BYTE) {
      setPesanGalat("Ukuran foto maksimal 5MB.");
      return;
    }
    setPesanGalat("");
    const hasil = await kompresGambar(file);
    setGambarBase64(hasil);
  };

  const tanganiUnggahGambar = (e: React.ChangeEvent<HTMLInputElement>) => {
    void tanganiBerkas(e.target.files?.[0]);
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
    } else if (!gambarBase64) {
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
          gambar: modeInput === "gambar" ? gambarBase64 : null,
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
          gambar: modeInput === "gambar" ? gambarBase64 : null,
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
    setStatusPemutar("siaga");
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

  const mulaiSuara = () => {
    if (!hasilData) return;

    if (statusPemutar === "jeda") {
      sedangMemutarRef.current = true;
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

    resetPemutar();
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

  const kembaliKeMenu = () => {
    hentikanRekamSuara();
    resetPemutar();
    setHasilData(null);
    setHasilAjuan(null);
    setTeksAjuan("");
    setPesanAjuan("");
    setTeksAnimasi("");
    setJawabanKuis({});
  };

  return (
    <main className="flex-1 bg-white text-slate-700 font-sans selection:bg-[#F0AB00]/40 selection:text-[#1C01A5]">
      <div className="mx-auto flex max-w-6xl justify-end px-4 pt-4">
        <div className="rounded-full border border-[#F0AB00]/40 bg-[#F0AB00]/20 px-4 py-2 text-sm font-bold text-[#1C01A5] shadow-sm">
          Kurikulum Merdeka ✦ Mode Multimodal
        </div>
      </div>

      {!isMulai ? (
        <div className="animate-in fade-in duration-700">
          <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-center">
            <p className="text-[#1C01A5] font-bold uppercase tracking-[0.2em] mb-4">
              Tutor AI Kurikulum KEMDIKBUD
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-[#1C01A5]">
              Ubah Waktu Belajarmu <br className="hidden md:block" />
              <span className="text-[#F0AB00]">Menjadi Beasiswa Instan</span>
            </h1>
            <p className="max-w-2xl mx-auto text-slate-600 text-lg mb-8">
              Ketik judul materi atau unggah halaman buku. $IGIL menyusun penjelasan mendalam, sketsa doodle, dan soal-soal latihan — lalu membacakannya untukmu.
            </p>
            <Link
              href="/ruang-belajar"
              className={`${kelasTombolUtama} px-8 py-4 rounded-full font-extrabold text-lg shadow-lg shadow-[#1C01A5]/25 mx-auto flex items-center gap-2 mt-4`}
            >
              Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 text-white" />
            </Link>
          </section>
        </div>
      ) : !hasilData ? (
        <div className="animate-in fade-in zoom-in-95 duration-500 max-w-3xl mx-auto px-4 pt-4 pb-20">
          <div className="bg-white rounded-3xl shadow-xl border-2 border-[#1C01A5]/15 p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={kelasLabel}>Nama Siswa</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                    <input
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Nama panggilan"
                      className={kelasInput}
                    />
                  </div>
                </div>
                <div>
                  <label className={kelasLabel}>Jenjang Kelas</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                    <select
                      value={kelas}
                      onChange={(e) => setKelas(e.target.value)}
                      className={`${kelasInput} appearance-none cursor-pointer`}
                    >
                      {DAFTAR_KELAS.map((k) => (
                        <option key={k} value={k}>
                          Kelas {k}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <PilihGuru
                kelas={kelas}
                nilai={guruKelamin}
                onGanti={(kelamin) => {
                  setGuruKelamin(kelamin);
                  simpanProfil({ guruKelamin: kelamin });
                }}
              />

              <div className="mt-2">
                <label className="block text-sm font-bold text-[#1C01A5] mb-3">
                  Pilih Sumber Materi Pembelajaran
                </label>
                <div className="flex p-1 bg-[#F0AB00]/15 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setModeInput("teks")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                      modeInput === "teks"
                        ? "bg-[#1C01A5] text-white shadow-sm"
                        : "text-[#1C01A5] hover:text-[#1C01A5]"
                    }`}
                  >
                    <Keyboard className="w-5 h-5" /> Ketik Judul Materi
                  </button>
                  <button
                    type="button"
                    onClick={() => setModeInput("gambar")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                      modeInput === "gambar"
                        ? "bg-[#1C01A5] text-white shadow-sm"
                        : "text-[#1C01A5] hover:text-[#1C01A5]"
                    }`}
                  >
                    <Camera className="w-5 h-5" /> Unggah Halaman Buku
                  </button>
                </div>
              </div>

              {modeInput === "teks" ? (
                <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                  <div>
                    <label className={kelasLabel}>Mata Pelajaran</label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                      <select
                        value={pilihanMapel}
                        onChange={(e) => {
                          const nilai = e.target.value;
                          setPilihanMapel(nilai);
                          if (nilai === OPSI_LAIN_NYA) {
                            setPilihanBab(OPSI_LAIN_NYA);
                          } else {
                            setMapelManual("");
                          }
                        }}
                        className={`${kelasInput} appearance-none cursor-pointer`}
                      >
                        {daftarMapel.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                        <option value={OPSI_LAIN_NYA}>{OPSI_LAIN_NYA}</option>
                      </select>
                    </div>
                    {pilihanMapel === OPSI_LAIN_NYA ? (
                      <div className="relative mt-3">
                        <PenLine className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                        <input
                          type="text"
                          value={mapelManual}
                          onChange={(e) => setMapelManual(e.target.value)}
                          placeholder="Ketik nama mata pelajaran..."
                          className={kelasInput}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <label className={kelasLabel}>Materi Pembahasan</label>
                    <div className="relative">
                      <FileText className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                      <select
                        value={pilihanBab}
                        onChange={(e) => {
                          setPilihanBab(e.target.value);
                          if (e.target.value !== OPSI_LAIN_NYA) setBabManual("");
                        }}
                        className={`${kelasInput} appearance-none cursor-pointer`}
                      >
                        {daftarBab.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                        <option value={OPSI_LAIN_NYA}>{OPSI_LAIN_NYA}</option>
                      </select>
                    </div>
                    {pilihanBab === OPSI_LAIN_NYA ? (
                      <div className="relative mt-3">
                        <PenLine className="absolute left-4 top-3.5 w-5 h-5 text-[#1C01A5]" />
                        <input
                          type="text"
                          value={babManual}
                          onChange={(e) => setBabManual(e.target.value)}
                          placeholder="Ketik topik materi secara bebas..."
                          className={kelasInput}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                  <label className="block text-sm font-bold text-[#1C01A5]">
                    Unggah Halaman Buku Pelajaran
                  </label>
                  <button
                    type="button"
                    onClick={() => inputBerkasRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setSedangSeret(true);
                    }}
                    onDragLeave={() => setSedangSeret(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setSedangSeret(false);
                      void tanganiBerkas(e.dataTransfer.files?.[0]);
                    }}
                    className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-colors relative overflow-hidden ${
                      sedangSeret
                        ? "border-[#F0AB00] bg-white"
                        : "border-[#1C01A5]/30 bg-white hover:bg-white"
                    }`}
                  >
                    {gambarBase64 ? (
                      <img
                        src={gambarBase64}
                        alt="Pratinjau halaman buku"
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                    ) : null}
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 relative z-10 bg-white/70 w-full h-full">
                      <UploadCloud className="w-10 h-10 text-[#1C01A5] mb-3" />
                      <p className="mb-2 text-sm text-slate-600 font-bold">
                        <span className="text-[#1C01A5]">Klik untuk mengunggah</span> atau seret foto kemari
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        PNG, JPG, atau JPEG (Maks. 5MB)
                      </p>
                    </div>
                  </button>
                  <input
                    ref={inputBerkasRef}
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={tanganiUnggahGambar}
                  />
                  {gambarBase64 ? (
                    <p className="text-sm text-[#1C01A5] font-bold text-center">
                      Foto buku siap dianalisis AI
                    </p>
                  ) : null}
                </div>
              )}

              {pesanGalat ? (
                <p className="text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
                  {pesanGalat}
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => void tanganiBuatModul()}
                disabled={isLoading}
                className={`w-full ${kelasTombolUtama} py-4 rounded-xl font-extrabold text-lg mt-2 flex justify-center items-center gap-2 shadow-lg shadow-[#1C01A5]/25`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" /> Menyusun Modul Cerdas...
                  </>
                ) : (
                  <>
                    Mulai Pembelajaran Pintar <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-20 animate-in slide-in-from-bottom-10 duration-700">
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
              {teksAnimasi === "" && statusPemutar === "siaga" ? (
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
