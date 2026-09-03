"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import PilihGuru from "@/components/PilihGuru";
import { type KelaminGuru } from "@/lib/guru";
import { DATA_KURIKULUM, DAFTAR_KELAS } from "@/lib/kurikulum";
import { bacaProgres, simpanProfil, type SesiModul } from "@/lib/progres";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

const OPSI_MAPEL_LAIN = "LAIN NYA (ketik judul Mata Pelajaran)";
const OPSI_MATERI_LAIN = "LAIN NYA (ketik judul materi)";

export default function RuangBelajarPage() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("3 SD");
  const [kota, setKota] = useState("Jakarta");
  const [pilihanMapel, setPilihanMapel] = useState(
    () => Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? "",
  );
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanMateri, setPilihanMateri] = useState(
    () => DATA_KURIKULUM["3 SD"]?.[Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? ""]?.[0] ?? "",
  );
  const [materiManual, setMateriManual] = useState("");
  const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>("wanita");
  const [sesiAktif, setSesiAktif] = useState<SesiModul[]>([]);

  const daftarMapel = useMemo(
    () => Object.keys(DATA_KURIKULUM[kelas] ?? {}),
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

  const tautanMulai = () => {
    const query = new URLSearchParams({
      nama: nama.trim() || "Siswa",
      kelas,
      mode: "teks",
      mulai: "1",
      mapel,
      materi,
      guru: guruKelamin,
    });
    return `/tutor?${query.toString()}`;
  };

  const simpanProfilSesi = () => {
    simpanProfil({
      nama: nama.trim() || "Siswa",
      kelas,
      kota: kota.trim() || "Indonesia",
      guruKelamin,
    });
  };

  return (
    <PageShell
      judul="📚 Ruang Belajar"
      subjudul="Pilih mata pelajaran, pilih guru pengajar, lalu mulai sesi belajar langsung di halaman Tutor."
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
        <div>
          <label className={kelasLabel}>Mata pelajaran</label>
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

        <div className="mt-6">
          <PilihGuru
            kelas={kelas}
            nilai={guruKelamin}
            onGanti={setGuruKelamin}
          />
        </div>

        <div className="mt-6">
          <Link
            href={tautanMulai()}
            onClick={simpanProfilSesi}
            className={`${kelasTombolUtama} flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-lg font-extrabold tracking-wide shadow-md shadow-[#1C01A5]/20`}
          >
            <Sparkles className="h-5 w-5" />
            MULAI PEMBELAJARAN
          </Link>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Sparkles className="h-4 w-4 text-[#F0AB00]" />
          Tombol ini membuka AI Tutor. Pindai buku dan pemutar suara guru tetap tersedia di halaman Tutor.
        </p>
      </section>
    </PageShell>
  );
}
