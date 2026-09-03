"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, Camera, Keyboard, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import { DATA_KURIKULUM, DAFTAR_KELAS } from "@/lib/kurikulum";
import { bacaProgres, simpanProfil, type SesiModul } from "@/lib/progres";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

export default function RuangBelajarPage() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("3 SD");
  const [kota, setKota] = useState("Jakarta");
  const [mapel, setMapel] = useState("");
  const [materi, setMateri] = useState("");
  const [sesiAktif, setSesiAktif] = useState<SesiModul[]>([]);

  const daftarMapel = useMemo(
    () => Object.keys(DATA_KURIKULUM[kelas] ?? {}),
    [kelas],
  );
  const daftarMateri = useMemo(
    () => DATA_KURIKULUM[kelas]?.[mapel] ?? [],
    [kelas, mapel],
  );

  useEffect(() => {
    const data = bacaProgres();
    if (data.profil.nama) setNama(data.profil.nama);
    if (data.profil.kelas) setKelas(data.profil.kelas);
    if (data.profil.kota) setKota(data.profil.kota);
    setSesiAktif(data.sesi.slice(0, 4));
  }, []);

  useEffect(() => {
    if (!daftarMapel.includes(mapel)) {
      setMapel(daftarMapel[0] ?? "");
    }
  }, [daftarMapel, mapel]);

  useEffect(() => {
    if (!daftarMateri.includes(materi)) {
      setMateri(daftarMateri[0] ?? "");
    }
  }, [daftarMateri, materi]);

  const tautanSesi = (mode: "teks" | "gambar") => {
    const query = new URLSearchParams({
      nama: nama.trim() || "Siswa",
      kelas,
      mode,
      mulai: "1",
    });
    if (mode === "teks") {
      query.set("mapel", mapel);
      query.set("materi", materi);
    }
    return `/tutor?${query.toString()}`;
  };

  const simpanProfilSesi = () => {
    simpanProfil({
      nama: nama.trim() || "Siswa",
      kelas,
      kota: kota.trim() || "Indonesia",
    });
  };

  return (
    <PageShell
      judul="📚 Ruang Belajar"
      subjudul="Pilih mata pelajaran, lihat materi yang sedang aktif, lalu mulai sesi baru lewat ketikan atau pindai halaman buku."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">Profil sesi</h2>
          <div className="grid gap-4 sm:grid-cols-3">
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
                    Kelas {item}
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
              Belum ada modul. Pilih mapel di bawah, lalu mulai sesi pertamamu.
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
        <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">Pilih mata pelajaran</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {daftarMapel.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMapel(item)}
              className={`rounded-2xl border px-4 py-3 text-left font-bold transition-all ${
                mapel === item
                  ? "border-[#1C01A5] bg-[#1C01A5] text-white"
                  : "border-[#1C01A5]/15 bg-white text-[#1C01A5] hover:border-[#F0AB00] hover:text-[#F0AB00]"
              }`}
            >
              <BookOpen className="mb-2 h-4 w-4" />
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <label className={kelasLabel}>Materi pembahasan</label>
          <select
            value={materi}
            onChange={(e) => setMateri(e.target.value)}
            className={kelasKotak}
          >
            {daftarMateri.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={tautanSesi("teks")}
            onClick={simpanProfilSesi}
            className={`${kelasTombolUtama} flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center font-extrabold shadow-md shadow-[#1C01A5]/20`}
          >
            <Keyboard className="h-5 w-5" />
            Mulai ketik manual
          </Link>
          <Link
            href={tautanSesi("gambar")}
            onClick={simpanProfilSesi}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-[#F0AB00] bg-[#F0AB00] px-4 py-3 text-center font-extrabold text-[#1C01A5] hover:bg-[#e09e00]"
          >
            <Camera className="h-5 w-5" />
            Pindai buku foto
          </Link>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-[#F0AB00]" />
          Sesi akan dibuka di AI Tutor. Pemutar audio dan pemindai gambar tetap tersedia.
        </p>
      </section>
    </PageShell>
  );
}
