"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Sparkles, UploadCloud, X } from "lucide-react";
import PageShell from "@/components/PageShell";
import PilihGuru from "@/components/PilihGuru";
import { type KelaminGuru } from "@/lib/guru";
import { DATA_KURIKULUM, DAFTAR_KELAS, daftarMapelUntukKelas, labelJenjangKelas } from "@/lib/kurikulum";
import { bacaProgres, simpanProfil, type SesiModul } from "@/lib/progres";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

const OPSI_MAPEL_LAIN = "LAIN NYA (ketik judul Mata Pelajaran)";
const OPSI_MATERI_LAIN = "LAIN NYA (ketik judul materi)";
const KUNCI_HALAMAN_BUKU = "igil-halaman-buku-v1";
const BATAS_HALAMAN = 6;
const BATAS_UKURAN_BYTE = 5 * 1024 * 1024;

type SumberBelajar = "kurikulum" | "unggah";

function kompresGambar(file: File): Promise<string> {
  return new Promise((selesai, gagal) => {
    const reader = new FileReader();
    reader.onerror = () => gagal(new Error("Gagal membaca berkas."));
    reader.onload = () => {
      const gambar = new Image();
      gambar.onload = () => {
        const batas = 960;
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
        selesai(kanvas.toDataURL("image/jpeg", 0.7));
      };
      gambar.onerror = () => selesai(reader.result as string);
      gambar.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function RuangBelajarPage() {
  const router = useRouter();
  const inputBerkasRef = useRef<HTMLInputElement | null>(null);
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("3 SD");
  const [kota, setKota] = useState("Jakarta");
  const [sumber, setSumber] = useState<SumberBelajar>("kurikulum");
  const [pilihanMapel, setPilihanMapel] = useState(
    () => Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? "",
  );
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanMateri, setPilihanMateri] = useState(
    () => DATA_KURIKULUM["3 SD"]?.[Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? ""]?.[0] ?? "",
  );
  const [materiManual, setMateriManual] = useState("");
  const [halamanBuku, setHalamanBuku] = useState<string[]>([]);
  const [sedangSeret, setSedangSeret] = useState(false);
  const [pesanGalat, setPesanGalat] = useState("");
  const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>("wanita");
  const [sesiAktif, setSesiAktif] = useState<SesiModul[]>([]);

  const daftarMapel = useMemo(
    () => daftarMapelUntukKelas(kelas),
    [kelas],
  );
  const daftarMateri = useMemo(
    () =>
      pilihanMapel === OPSI_MAPEL_LAIN
        ? []
        : (DATA_KURIKULUM[kelas]?.[pilihanMapel] ?? []),
    [kelas, pilihanMapel],
  );
  const mapel =
    pilihanMapel === OPSI_MAPEL_LAIN ? mapelManual : pilihanMapel;
  const materi =
    pilihanMateri === OPSI_MATERI_LAIN ? materiManual : pilihanMateri;

  useEffect(() => {
    const data = bacaProgres();
    if (data.profil.nama) setNama(data.profil.nama);
    if (data.profil.kelas) setKelas(data.profil.kelas);
    if (data.profil.kota) setKota(data.profil.kota);
    if (data.profil.guruKelamin) setGuruKelamin(data.profil.guruKelamin);
    setSesiAktif(data.sesi.slice(0, 4));
  }, []);

  useEffect(() => {
    if (pilihanMapel === OPSI_MAPEL_LAIN) return;
    if (!daftarMapel.includes(pilihanMapel)) {
      setPilihanMapel(daftarMapel[0] ?? "");
    }
  }, [daftarMapel, pilihanMapel]);

  useEffect(() => {
    if (pilihanMapel === OPSI_MAPEL_LAIN) {
      setPilihanMateri(OPSI_MATERI_LAIN);
      return;
    }
    if (pilihanMateri === OPSI_MATERI_LAIN) return;
    if (!daftarMateri.includes(pilihanMateri)) {
      setPilihanMateri(daftarMateri[0] ?? OPSI_MATERI_LAIN);
    }
  }, [daftarMateri, pilihanMapel, pilihanMateri]);

  const tambahHalaman = async (berkas: FileList | File[] | null) => {
    if (!berkas || berkas.length === 0) return;
    const daftar = Array.from(berkas);
    const sisa = BATAS_HALAMAN - halamanBuku.length;
    if (sisa <= 0) {
      setPesanGalat(`Maksimal ${BATAS_HALAMAN} halaman buku.`);
      return;
    }

    const terpilih = daftar.slice(0, sisa);
    const hasil: string[] = [];
    for (const file of terpilih) {
      if (!file.type.startsWith("image/")) {
        setPesanGalat("Berkas harus berupa gambar PNG atau JPG.");
        return;
      }
      if (file.size > BATAS_UKURAN_BYTE) {
        setPesanGalat("Ukuran foto maksimal 5MB per halaman.");
        return;
      }
      hasil.push(await kompresGambar(file));
    }
    setPesanGalat("");
    setHalamanBuku((sebelum) => [...sebelum, ...hasil]);
  };

  const mulaiPembelajaran = () => {
    if (sumber === "kurikulum") {
      if (!mapel.trim() || !materi.trim()) {
        setPesanGalat("Mohon isi mata pelajaran dan materi pembahasan.");
        return;
      }
      window.sessionStorage.removeItem(KUNCI_HALAMAN_BUKU);
    } else {
      if (halamanBuku.length === 0) {
        setPesanGalat("Mohon unggah minimal satu halaman buku.");
        return;
      }
      try {
        window.sessionStorage.setItem(
          KUNCI_HALAMAN_BUKU,
          JSON.stringify(halamanBuku),
        );
      } catch {
        setPesanGalat("Foto terlalu besar. Kurangi jumlah halaman, lalu coba lagi.");
        return;
      }
    }

    simpanProfil({
      nama: nama.trim() || "Siswa",
      kelas,
      kota: kota.trim() || "Indonesia",
      guruKelamin,
    });

    const query = new URLSearchParams({
      nama: nama.trim() || "Siswa",
      kelas,
      mode: sumber === "unggah" ? "gambar" : "teks",
      mulai: "1",
      guru: guruKelamin,
    });
    if (sumber === "kurikulum") {
      query.set("mapel", mapel);
      query.set("materi", materi);
    }
    router.push(`/tutor?${query.toString()}`);
  };

  return (
    <PageShell
      judul="📚 Ruang Belajar"
      subjudul="Pilih sumber pembelajaran, pilih guru pengajar, lalu mulai sesi belajar di halaman Tutor."
    >
      <section className="grid gap-6">
        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">Profil sesi</h2>
          <div className="grid gap-4">
            <div>
              <label className={kelasLabel}>Nama Siswa</label>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama panggilan"
                className={kelasKotak}
              />
            </div>
            <div>
              <label className={kelasLabel}>Jenjang</label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className={kelasKotak}
              >
                {DAFTAR_KELAS.map((item) => (
                  <option key={item} value={item}>
                    {labelJenjangKelas(item)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={kelasLabel}>Kota / Daerah</label>
              <input
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                placeholder="Jakarta"
                className={kelasKotak}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#F0AB00]/40 bg-[#FFF8E8] p-6">
          <h2 className="mb-3 text-lg font-extrabold text-[#1C01A5]">Materi aktif</h2>
          {sesiAktif.length === 0 ? (
            <p className="text-sm text-slate-600">
              Belum ada modul. Pilih sumber pembelajaran di bawah, lalu mulai sesi pertamamu.
            </p>
          ) : (
            <ul className="space-y-3">
              {sesiAktif.map((sesi) => (
                <li
                  key={sesi.id}
                  className="rounded-2xl border border-[#1C01A5]/10 bg-white px-4 py-3"
                >
                  <p className="font-bold text-[#1C01A5]">{sesi.materi}</p>
                  <p className="text-sm text-slate-500">
                    {sesi.mapel} · {sesi.kelas} · {sesi.kuisDijawab}/{sesi.kuisTotal} kuis
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">
          Pilih sumber pembelajaran
        </h2>
        <div className="flex flex-col gap-2 rounded-2xl bg-[#F0AB00]/15 p-1">
          <button
            type="button"
            onClick={() => {
              setSumber("kurikulum");
              setPesanGalat("");
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-extrabold uppercase tracking-wide transition-all sm:text-base ${
              sumber === "kurikulum"
                ? "bg-[#1C01A5] text-white shadow-sm"
                : "text-[#1C01A5] hover:text-[#1C01A5]"
            }`}
          >
            <BookOpen className="h-5 w-5 shrink-0" />
            <span>Materi Kurikulum Merdeka</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSumber("unggah");
              setPesanGalat("");
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-extrabold uppercase tracking-wide transition-all sm:text-base ${
              sumber === "unggah"
                ? "bg-[#1C01A5] text-white shadow-sm"
                : "text-[#1C01A5] hover:text-[#1C01A5]"
            }`}
          >
            <UploadCloud className="h-5 w-5 shrink-0" />
            <span>Unggah Halaman Buku</span>
          </button>
        </div>

        {sumber === "kurikulum" ? (
          <>
            <div className="mt-6">
              <label className={kelasLabel}>Pilih mata pelajaran</label>
              <select
                value={pilihanMapel}
                onChange={(e) => {
                  const nilai = e.target.value;
                  setPilihanMapel(nilai);
                  if (nilai === OPSI_MAPEL_LAIN) {
                    setPilihanMateri(OPSI_MATERI_LAIN);
                  }
                }}
                className={kelasKotak}
              >
                {daftarMapel.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                <option value={OPSI_MAPEL_LAIN}>{OPSI_MAPEL_LAIN}</option>
              </select>
              {pilihanMapel === OPSI_MAPEL_LAIN ? (
                <input
                  value={mapelManual}
                  onChange={(e) => setMapelManual(e.target.value)}
                  placeholder="Ketik judul Mata Pelajaran"
                  className={`${kelasKotak} mt-3`}
                />
              ) : null}
            </div>

            <div className="mt-6">
              <label className={kelasLabel}>Materi pembahasan</label>
              <select
                value={
                  pilihanMapel === OPSI_MAPEL_LAIN
                    ? OPSI_MATERI_LAIN
                    : pilihanMateri
                }
                onChange={(e) => {
                  setPilihanMateri(e.target.value);
                  if (e.target.value !== OPSI_MATERI_LAIN) setMateriManual("");
                }}
                className={kelasKotak}
              >
                {daftarMateri.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
                <option value={OPSI_MATERI_LAIN}>{OPSI_MATERI_LAIN}</option>
              </select>
              {pilihanMateri === OPSI_MATERI_LAIN ? (
                <input
                  value={materiManual}
                  onChange={(e) => setMateriManual(e.target.value)}
                  placeholder="Ketik judul materi"
                  className={`${kelasKotak} mt-3`}
                />
              ) : null}
            </div>
          </>
        ) : (
          <div className="mt-6 space-y-4">
            <label className={kelasLabel}>Unggah halaman buku pelajaran</label>
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
                void tambahHalaman(e.dataTransfer.files);
              }}
              className={`flex flex-col items-center justify-center w-full min-h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
                sedangSeret
                  ? "border-[#F0AB00] bg-white"
                  : "border-[#1C01A5]/30 bg-white hover:bg-[#FFF8E8]"
              }`}
            >
              <UploadCloud className="w-10 h-10 text-[#1C01A5] mb-3" />
              <p className="mb-2 text-sm text-slate-600 font-bold">
                <span className="text-[#1C01A5]">Klik untuk mengunggah</span> atau seret foto kemari
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Bisa beberapa halaman. PNG atau JPG, maks. 5MB per halaman, hingga {BATAS_HALAMAN} halaman.
              </p>
            </button>
            <input
              ref={inputBerkasRef}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              onChange={(e) => {
                void tambahHalaman(e.target.files);
                e.target.value = "";
              }}
            />
            {halamanBuku.length > 0 ? (
              <div className="grid gap-3">
                {halamanBuku.map((src, indeks) => (
                  <div key={`${indeks}-${src.slice(-12)}`} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Halaman buku ${indeks + 1}`}
                      className="h-32 w-full rounded-xl object-cover border border-[#1C01A5]/15"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setHalamanBuku((sebelum) =>
                          sebelum.filter((_, i) => i !== indeks),
                        )
                      }
                      className="absolute top-2 right-2 rounded-full bg-white p-1 text-rose-600 shadow"
                      title="Hapus halaman"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-1 text-center text-xs font-bold text-slate-500">
                      Halaman {indeks + 1}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-6">
          <PilihGuru
            kelas={kelas}
            nilai={guruKelamin}
            onGanti={setGuruKelamin}
          />
        </div>

        {pesanGalat ? (
          <p className="mt-4 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
            {pesanGalat}
          </p>
        ) : null}

        <div className="mt-6">
          <button
            type="button"
            onClick={mulaiPembelajaran}
            className={`${kelasTombolUtama} flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-lg font-extrabold tracking-wide shadow-md shadow-[#1C01A5]/20`}
          >
            <Sparkles className="h-5 w-5" />
            MULAI PEMBELAJARAN
          </button>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-[#F0AB00]" />
          Tombol ini membuka AI Tutor sesuai sumber yang dipilih.
        </p>
      </section>
    </PageShell>
  );
}
