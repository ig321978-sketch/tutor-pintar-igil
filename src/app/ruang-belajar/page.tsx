"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import PilihGuru from "@/components/PilihGuru";
import { MUAT_BAB_BARU } from "@/components/modul/registri-bab-baru";
import { type KelaminGuru } from "@/lib/guru";
import {
  DATA_KURIKULUM,
  DAFTAR_KELAS,
  JUDUL_MTK_1_BAB1,
  JUDUL_MTK_1_BAB2,
  JUDUL_MTK_1_BAB3,
  JUDUL_MTK_1_BAB4,
  JUDUL_MTK_1_BAB5,
  JUDUL_MTK_1_BAB6,
  JUDUL_MTK_1_BAB7,
  JUDUL_MTK_1_BAB8,
  JUDUL_MTK_2_BAB1,
  JUDUL_MTK_2_BAB2,
  JUDUL_MTK_2_BAB3,
  JUDUL_MTK_2_BAB4,
  JUDUL_MTK_2_BAB5,
  JUDUL_MTK_2_BAB6,
  JUDUL_MTK_2_BAB7,
  JUDUL_MTK_2_BAB8,
  JUDUL_MTK_4_BAB1,
  JUDUL_MTK_4_BAB2,
  JUDUL_MTK_4_BAB3,
  JUDUL_MTK_4_BAB4,
  JUDUL_MTK_4_BAB5,
  JUDUL_MTK_4_BAB6,
  JUDUL_MTK_5_BAB1,
  JUDUL_MTK_5_BAB2,
  JUDUL_MTK_5_BAB3,
  JUDUL_MTK_5_BAB4,
  JUDUL_MTK_5_BAB5,
  JUDUL_MTK_5_BAB6,
  JUDUL_MTK_5_BAB7,
  JUDUL_MTK_5_BAB8,
  JUDUL_MTK_5_BAB9,
  JUDUL_MTK_6_BAB1,
  JUDUL_MTK_6_BAB2,
  JUDUL_MTK_6_BAB3,
  JUDUL_MTK_6_BAB4,
  OPSI_LAINNYA,
  daftarMapelUntukKelas,
  labelJenjangKelas,
} from "@/lib/kurikulum";
import { useUserRole } from "@/hooks/useUserRole";
import {
  adalahPilotMatematikaSd,
  KELAS_PILOT_SD,
  KELAS_TERBUKA_PUBLIK,
  MAPEL_TERBUKA_PUBLIK,
  PESAN_MATERI_TERKUNCI_PUBLIK,
  situsHanyaAdmin,
} from "@/lib/situs-hanya-admin";
import { naskahSapaanUntukSuara } from "@/lib/naskah-lisan";
import { bacaProgres, simpanProfil } from "@/lib/progres";
import {
  putarAudioSapaanSiap,
  siapkanAudioSapaan,
} from "@/lib/putar-tts-klien";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

const OPSI_MAPEL_LAIN = OPSI_LAINNYA;
const OPSI_MATERI_LAIN = OPSI_LAINNYA;
const KUNCI_HALAMAN_BUKU = "igil-halaman-buku-v1";

/** Jalur halaman modul untuk satu materi (kosong bila modulnya belum siap). */
function cariJalurModul(kelas: string, mapel: string, materi: string): string {
  const jalurKelas: Record<string, string> =
    kelas === "1 SD"
      ? {
          [JUDUL_MTK_1_BAB1]: "/ruang-belajar/mtk-1-bab1",
          [JUDUL_MTK_1_BAB2]: "/ruang-belajar/mtk-1-bab2",
          [JUDUL_MTK_1_BAB3]: "/ruang-belajar/mtk-1-bab3",
          [JUDUL_MTK_1_BAB4]: "/ruang-belajar/mtk-1-bab4",
          [JUDUL_MTK_1_BAB5]: "/ruang-belajar/mtk-1-bab5",
          [JUDUL_MTK_1_BAB6]: "/ruang-belajar/mtk-1-bab6",
          [JUDUL_MTK_1_BAB7]: "/ruang-belajar/mtk-1-bab7",
          [JUDUL_MTK_1_BAB8]: "/ruang-belajar/mtk-1-bab8",
        }
      : kelas === "2 SD"
        ? { [JUDUL_MTK_2_BAB1]: "/ruang-belajar/mtk-2-bab1", [JUDUL_MTK_2_BAB2]: "/ruang-belajar/mtk-2-bab2", [JUDUL_MTK_2_BAB3]: "/ruang-belajar/mtk-2-bab3", [JUDUL_MTK_2_BAB4]: "/ruang-belajar/mtk-2-bab4", [JUDUL_MTK_2_BAB5]: "/ruang-belajar/mtk-2-bab5", [JUDUL_MTK_2_BAB6]: "/ruang-belajar/mtk-2-bab6", [JUDUL_MTK_2_BAB7]: "/ruang-belajar/mtk-2-bab7", [JUDUL_MTK_2_BAB8]: "/ruang-belajar/mtk-2-bab8" }
        : kelas === "4 SD"
          ? { [JUDUL_MTK_4_BAB1]: "/ruang-belajar/mtk-4-bab1", [JUDUL_MTK_4_BAB2]: "/ruang-belajar/mtk-4-bab2", [JUDUL_MTK_4_BAB3]: "/ruang-belajar/mtk-4-bab3", [JUDUL_MTK_4_BAB4]: "/ruang-belajar/mtk-4-bab4", [JUDUL_MTK_4_BAB5]: "/ruang-belajar/mtk-4-bab5", [JUDUL_MTK_4_BAB6]: "/ruang-belajar/mtk-4-bab6" }
          : kelas === "5 SD"
            ? { [JUDUL_MTK_5_BAB1]: "/ruang-belajar/mtk-5-bab1", [JUDUL_MTK_5_BAB2]: "/ruang-belajar/mtk-5-bab2", [JUDUL_MTK_5_BAB3]: "/ruang-belajar/mtk-5-bab3", [JUDUL_MTK_5_BAB4]: "/ruang-belajar/mtk-5-bab4", [JUDUL_MTK_5_BAB5]: "/ruang-belajar/mtk-5-bab5", [JUDUL_MTK_5_BAB6]: "/ruang-belajar/mtk-5-bab6", [JUDUL_MTK_5_BAB7]: "/ruang-belajar/mtk-5-bab7", [JUDUL_MTK_5_BAB8]: "/ruang-belajar/mtk-5-bab8", [JUDUL_MTK_5_BAB9]: "/ruang-belajar/mtk-5-bab9" }
            : kelas === "6 SD"
              ? {
                  [JUDUL_MTK_6_BAB1]: "/ruang-belajar/mtk-6-bab1",
                  [JUDUL_MTK_6_BAB2]: "/ruang-belajar/mtk-6-bab2",
                  [JUDUL_MTK_6_BAB3]: "/ruang-belajar/mtk-6-bab3",
                  [JUDUL_MTK_6_BAB4]: "/ruang-belajar/mtk-6-bab4",
                }
              : {};
  // Bab Matematika Kelas 3 sampai 6 yang sudah dipasang di registri-bab-baru: jalurnya dibaca dari judul "Bab N: ...".
  const nomorKelas = kelas.match(/^(\d) SD$/)?.[1];
  const nomorBab = materi.match(/^Bab (\d+):/)?.[1];
  const kunciBabBaru = nomorKelas && nomorBab && mapel === "Matematika" ? `mtk-${nomorKelas}-bab${nomorBab}` : "";
  const jalurBabBaru = kunciBabBaru && kunciBabBaru in MUAT_BAB_BARU ? `/ruang-belajar/${kunciBabBaru}` : "";

  return jalurKelas[materi] ?? jalurBabBaru;
}

export default function RuangBelajarPage() {
  const router = useRouter();
  const { adalahAdmin } = useUserRole();
  const kunciPublik = situsHanyaAdmin() && !adalahAdmin;
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState(
    situsHanyaAdmin() ? KELAS_TERBUKA_PUBLIK : "3 SD",
  );
  const [kota, setKota] = useState("Jakarta");
  const [pilihanMapel, setPilihanMapel] = useState(() =>
    situsHanyaAdmin()
      ? MAPEL_TERBUKA_PUBLIK
      : (Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? ""),
  );
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanMateri, setPilihanMateri] = useState(
    () =>
      DATA_KURIKULUM[KELAS_TERBUKA_PUBLIK]?.[MAPEL_TERBUKA_PUBLIK]?.[0] ??
      DATA_KURIKULUM["3 SD"]?.[Object.keys(DATA_KURIKULUM["3 SD"] ?? {})[0] ?? ""]?.[0] ??
      "",
  );
  const [materiManual, setMateriManual] = useState("");
  const [pesanGalat, setPesanGalat] = useState("");
  const [guruKelamin, setGuruKelamin] = useState<KelaminGuru>("wanita");
  const [menyiapkanSapaan, setMenyiapkanSapaan] = useState(false);

  const daftarKelasTampil = useMemo(() => {
    if (!kunciPublik) return DAFTAR_KELAS.filter((k) => /SD$/.test(k));
    return [...KELAS_PILOT_SD];
  }, [kunciPublik]);
  const daftarMapel = useMemo(() => {
    if (!kunciPublik) return daftarMapelUntukKelas(kelas).filter((m) => (DATA_KURIKULUM[kelas]?.[m] ?? []).some((materi) => cariJalurModul(kelas, m, materi)));
    return adalahPilotMatematikaSd(kelas, MAPEL_TERBUKA_PUBLIK)
      ? [MAPEL_TERBUKA_PUBLIK]
      : [];
  }, [kelas, kunciPublik]);
  const daftarMateri = useMemo(() => {
    if (pilihanMapel === OPSI_MAPEL_LAIN) return [];
    const buku = DATA_KURIKULUM[kelas]?.[pilihanMapel] ?? [];
    if (!kunciPublik) return buku;
    if (adalahPilotMatematikaSd(kelas, pilihanMapel)) return buku;
    return [];
  }, [kelas, kunciPublik, pilihanMapel]);
  const mapel =
    pilihanMapel === OPSI_MAPEL_LAIN ? mapelManual : pilihanMapel;
  const materi =
    pilihanMateri === OPSI_MATERI_LAIN ? materiManual : pilihanMateri;

  useEffect(() => {
    const data = bacaProgres();
    if (data.profil.nama) setNama(data.profil.nama);
    if (!kunciPublik && data.profil.kelas) {
      setKelas(data.profil.kelas);
    }
    if (data.profil.kota) setKota(data.profil.kota);
    if (data.profil.guruKelamin) setGuruKelamin(data.profil.guruKelamin);
  }, [kunciPublik]);

  useEffect(() => {
    if (!kunciPublik) return;
    if (!daftarKelasTampil.includes(kelas)) {
      setKelas(daftarKelasTampil[0] ?? KELAS_TERBUKA_PUBLIK);
    }
  }, [daftarKelasTampil, kelas, kunciPublik]);

  useEffect(() => {
    if (pilihanMapel === OPSI_MAPEL_LAIN) return;
    if (!daftarMapel.includes(pilihanMapel)) {
      setPilihanMapel(daftarMapel[0] ?? "");
      setPilihanMateri("");
    }
  }, [daftarMapel, pilihanMapel]);

  useEffect(() => {
    if (pilihanMapel === OPSI_MAPEL_LAIN) {
      setPilihanMateri(OPSI_MATERI_LAIN);
      return;
    }
    if (pilihanMateri === OPSI_MATERI_LAIN) return;
    if (!pilihanMateri || !daftarMateri.includes(pilihanMateri)) {
      setPilihanMateri(daftarMateri[0] ?? OPSI_MATERI_LAIN);
    }
  }, [daftarMateri, pilihanMapel, pilihanMateri]);

  const naskahSapaanSesi = () => {
    const namaPakai = nama.trim() || "Siswa";
    return naskahSapaanUntukSuara(namaPakai, mapel, materi);
  };

  useEffect(() => {
    if (!mapel.trim() || !materi.trim()) return;
    const naskah = naskahSapaanSesi();
    const t = window.setTimeout(() => {
      void siapkanAudioSapaan(naskah, guruKelamin, kelas);
    }, 700);
    return () => window.clearTimeout(t);
    // naskahSapaanSesi follows the fields below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nama, kelas, guruKelamin, mapel, materi]);

  const mulaiPembelajaran = async () => {
    if (kunciPublik && !adalahPilotMatematikaSd(kelas, mapel)) {
      setPesanGalat(PESAN_MATERI_TERKUNCI_PUBLIK);
      return;
    }
    if (!mapel.trim()) {
      setPesanGalat("Mohon pilih mata pelajaran.");
      return;
    }
    window.sessionStorage.removeItem(KUNCI_HALAMAN_BUKU);

    simpanProfil({
      nama: nama.trim() || "Siswa",
      kelas,
      kota: kota.trim() || "Indonesia",
      guruKelamin,
    });

    const jalurModul = cariJalurModul(kelas, mapel, materi);
    if (jalurModul) {
      router.push(
        `${jalurModul}?nama=${encodeURIComponent(nama.trim() || "Siswa")}`,
      );
      return;
    }

    const naskah = naskahSapaanSesi();
    const sudahSiap = putarAudioSapaanSiap();
    if (!sudahSiap) {
      setMenyiapkanSapaan(true);
      try {
        await siapkanAudioSapaan(naskah, guruKelamin, kelas);
        putarAudioSapaanSiap();
      } catch {
        // Sapaan opsional: sesi tetap dibuka meski cache gagal diisi.
      } finally {
        setMenyiapkanSapaan(false);
      }
    }

    setPesanGalat("");
  };

  return (
    <PageShell judul="📚 Ruang Belajar">
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
                {daftarKelasTampil.map((item) => (
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

        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
        <>
            <div>
              <label className={kelasLabel}>Pilih mata pelajaran</label>
              <select
                value={pilihanMapel}
                onChange={(e) => {
                  const nilai = e.target.value;
                  setPilihanMapel(nilai);
                  if (nilai === OPSI_MAPEL_LAIN) {
                    setPilihanMateri(OPSI_MATERI_LAIN);
                  } else {
                    setPilihanMateri("");
                  }
                }}
                className={kelasKotak}
              >
                {daftarMapel.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {pilihanMapel === OPSI_MAPEL_LAIN ? (
                <input
                  value={mapelManual}
                  onChange={(e) => setMapelManual(e.target.value)}
                  placeholder="Ketik disini"
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
                  placeholder="Ketik disini"
                  className={`${kelasKotak} mt-3`}
                />
              ) : null}
            </div>
        </>
        </div>

        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">
            Pilih guru pengajar
          </h2>
          <PilihGuru
            kelas={kelas}
            nilai={guruKelamin}
            onGanti={(kelamin) => {
              setGuruKelamin(kelamin);
              simpanProfil({ guruKelamin: kelamin });
            }}
            tanpaLabel
          />
        </div>
      </section>

      {pesanGalat ? (
        <p className="mt-6 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
          {pesanGalat}
        </p>
      ) : null}

      <div className="mt-6">
        <button
          type="button"
          onClick={() => void mulaiPembelajaran()}
          disabled={menyiapkanSapaan}
          className={`${kelasTombolUtama} flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-lg font-extrabold tracking-wide shadow-md shadow-[#1C01A5]/20 disabled:opacity-70`}
        >
          <Sparkles className="h-5 w-5" />
          {menyiapkanSapaan ? "Menyiapkan sesi..." : "MULAI PEMBELAJARAN"}
        </button>
      </div>
    </PageShell>
  );
}
