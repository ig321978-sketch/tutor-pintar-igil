"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye, FlaskConical, Play, Sparkles } from "lucide-react";
import PageShell from "@/components/PageShell";
import {
  daftarMapelUnik,
  daftarMateriUntukMapel,
  OPSI_LAINNYA,
} from "@/lib/kurikulum";
import { bacaProgres, tambahTokenIgil } from "@/lib/progres";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";
import type { BahanSimulasi } from "@/lib/simulasi-global";

type Evaluasi = {
  lulus: boolean;
  judul: string;
  langkah: string;
  yangDiamati: string;
  umpanBalik: string;
  token: number;
};

export default function SimulasiPraktikumPage() {
  const daftarMapel = useMemo(() => daftarMapelUnik(), []);
  const [nama, setNama] = useState("Siswa");
  const [kelas, setKelas] = useState("3 SD");
  const [saldo, setSaldo] = useState(0);
  const [pilihanMapel, setPilihanMapel] = useState(daftarMapel[0] ?? "");
  const [mapelManual, setMapelManual] = useState("");
  const [pilihanMateri, setPilihanMateri] = useState("");
  const [materiManual, setMateriManual] = useState("");
  const [ide, setIde] = useState("");
  const [pesan, setPesan] = useState("");
  const [memuat, setMemuat] = useState<"pratinjau" | "jalankan" | null>(null);
  const [bahan, setBahan] = useState<BahanSimulasi[]>([]);
  const [evaluasi, setEvaluasi] = useState<Evaluasi | null>(null);

  const mapel = pilihanMapel === OPSI_LAINNYA ? mapelManual : pilihanMapel;
  const daftarMateri = useMemo(
    () => (pilihanMapel === OPSI_LAINNYA ? [] : daftarMateriUntukMapel(pilihanMapel)),
    [pilihanMapel],
  );
  const materi = pilihanMateri === OPSI_LAINNYA ? materiManual : pilihanMateri;

  useEffect(() => {
    const data = bacaProgres();
    if (data.profil.nama) setNama(data.profil.nama);
    if (data.profil.kelas) setKelas(data.profil.kelas);
    setSaldo(data.tokenIgil);
  }, []);

  useEffect(() => {
    if (pilihanMapel === OPSI_LAINNYA) {
      setPilihanMateri(OPSI_LAINNYA);
      return;
    }
    if (!daftarMateri.includes(pilihanMateri) && pilihanMateri !== OPSI_LAINNYA) {
      setPilihanMateri(daftarMateri[0] ?? OPSI_LAINNYA);
    }
  }, [daftarMateri, pilihanMapel, pilihanMateri]);

  const kirim = async (pratinjau: boolean) => {
    setPesan("");
    if (!mapel.trim() || !materi.trim()) {
      setPesan("Pilih mata pelajaran dan materi dulu, atau ketik di LAINNYA.");
      return;
    }
    if (!pratinjau && ide.trim().length < 8) {
      setPesan("Tulis ide praktikummu di kotak bawah, lalu jalankan.");
      return;
    }

    setMemuat(pratinjau ? "pratinjau" : "jalankan");
    if (!pratinjau) setEvaluasi(null);

    try {
      const respons = await fetch("/api/praktikum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          kelas,
          mapel: mapel.trim(),
          materi: materi.trim(),
          ide: ide.trim(),
          pratinjau,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        bahan?: BahanSimulasi[];
        evaluasi?: Evaluasi;
      };

      if (!data.berhasil) {
        setPesan(data.pesan || "Belum berhasil. Coba lagi ya.");
        return;
      }

      setBahan(data.bahan ?? []);
      if (!pratinjau && data.evaluasi) {
        setEvaluasi(data.evaluasi);
        if (data.evaluasi.lulus && data.evaluasi.token > 0) {
          setSaldo(tambahTokenIgil(data.evaluasi.token));
        }
      }
    } catch {
      setPesan("Koneksi terputus. Coba beberapa saat lagi.");
    } finally {
      setMemuat(null);
    }
  };

  return (
    <PageShell
      judul="🧪 Simulasi Praktikum"
      subjudul="PREMIUM - isi saldo token untuk menjalankan simulasi dan praktikum"
    >
      <div className="mb-6 flex items-center justify-between gap-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-4">
        <p className="text-lg font-extrabold text-[#1C01A5]">
          Halo {nama}! Yuk eksperimen dengan aman.
        </p>
        <p className="rounded-full bg-white px-4 py-2 text-sm font-extrabold text-[#F0AB00] shadow-sm">
          Saldo $IGIL: {saldo} token
        </p>
      </div>

      <section className="rounded-[2rem] border-2 border-[#1C01A5]/15 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F0AB00]/25 text-3xl">
          <FlaskConical className="h-8 w-8 text-[#1C01A5]" />
        </div>

        <div className="grid gap-5">
          <div>
            <label className={kelasLabel}>Mata pelajaran</label>
            <select
              value={pilihanMapel}
              onChange={(e) => setPilihanMapel(e.target.value)}
              className={`${kelasKotak} text-lg`}
            >
              {daftarMapel.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value={OPSI_LAINNYA}>{OPSI_LAINNYA}</option>
            </select>
            {pilihanMapel === OPSI_LAINNYA ? (
              <input
                value={mapelManual}
                onChange={(e) => setMapelManual(e.target.value)}
                placeholder="Ketik nama mata pelajaran"
                className={`${kelasKotak} mt-3 text-lg`}
              />
            ) : null}
          </div>

          <div>
            <label className={kelasLabel}>Materi pembahasan</label>
            <select
              value={pilihanMateri}
              onChange={(e) => {
                setPilihanMateri(e.target.value);
                if (e.target.value !== OPSI_LAINNYA) setMateriManual("");
              }}
              className={`${kelasKotak} text-lg`}
            >
              {daftarMateri.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
              <option value={OPSI_LAINNYA}>{OPSI_LAINNYA}</option>
            </select>
            {pilihanMateri === OPSI_LAINNYA ? (
              <input
                value={materiManual}
                onChange={(e) => setMateriManual(e.target.value)}
                placeholder="Ketik judul materi"
                className={`${kelasKotak} mt-3 text-lg`}
              />
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => void kirim(true)}
            disabled={memuat !== null}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#F0AB00] bg-[#F0AB00] px-5 py-3 text-lg font-extrabold text-[#1C01A5] hover:bg-[#e09e00] disabled:opacity-70"
          >
            <Eye className="h-5 w-5" />
            {memuat === "pratinjau" ? "Mencari simulasi..." : "LIHAT SIMULASI"}
          </button>

          <div>
            <label className={kelasLabel}>
              PRAKTIKUM - Apa yang ingin kamu praktekan?...
            </label>
            <textarea
              value={ide}
              onChange={(e) => setIde(e.target.value)}
              rows={5}
              placeholder="Contoh: Aku ingin melihat es batu meleleh jadi air, lalu dipanaskan sampai jadi uap."
              className={`${kelasKotak} min-h-32 resize-y text-lg`}
            />
          </div>

          {pesan ? (
            <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 font-semibold text-rose-600">
              {pesan}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => void kirim(false)}
            disabled={memuat !== null}
            className={`${kelasTombolUtama} inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-xl font-extrabold shadow-lg shadow-[#1C01A5]/20`}
          >
            <Play className="h-6 w-6 fill-current" />
            {memuat === "jalankan" ? "AI sedang menilai..." : "JALANKAN PRAKTIKUM"}
          </button>
        </div>
      </section>

      {evaluasi ? (
        <section
          className={`mt-8 rounded-[2rem] border-2 p-6 sm:p-8 ${
            evaluasi.lulus
              ? "border-emerald-300 bg-emerald-50"
              : "border-rose-200 bg-rose-50"
          }`}
        >
          <p className="text-sm font-extrabold uppercase tracking-wider text-[#1C01A5]">
            {evaluasi.lulus ? "Hasil: BERHASIL" : "Hasil: BELUM BERHASIL"}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#1C01A5]">
            {evaluasi.judul}
          </h2>
          <p className="mt-3 text-lg font-medium text-slate-700">
            {evaluasi.umpanBalik}
          </p>
          {evaluasi.lulus ? (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F0AB00] px-4 py-2 font-extrabold text-[#1C01A5]">
              <Sparkles className="h-4 w-4" />
              +{evaluasi.token} token $IGIL ditambang
            </p>
          ) : (
            <p className="mt-3 font-bold text-rose-700">
              Belum ada token. Perbaiki ide, lalu coba lagi.
            </p>
          )}
          {evaluasi.langkah ? (
            <div className="mt-5 whitespace-pre-wrap text-slate-700">
              <p className="mb-2 font-extrabold text-[#1C01A5]">Langkah praktikum</p>
              {evaluasi.langkah}
            </div>
          ) : null}
          {evaluasi.yangDiamati ? (
            <p className="mt-4 text-slate-700">
              <span className="font-extrabold text-[#1C01A5]">Yang diamati: </span>
              {evaluasi.yangDiamati}
            </p>
          ) : null}
        </section>
      ) : null}

      {bahan.length > 0 ? (
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-extrabold text-[#1C01A5]">
            Bahan simulasi dari dunia
          </h2>
          <div className="grid gap-4">
            {bahan.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-[#1C01A5]/15 bg-white p-5 shadow-sm hover:border-[#F0AB00]"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#F0AB00]">
                  {item.sumber}
                </p>
                <p className="mt-2 font-extrabold text-[#1C01A5]">{item.judul}</p>
                <p className="mt-2 text-sm text-slate-600">{item.ringkasan}</p>
                {item.jenis === "simulasi" ? (
                  <iframe
                    title={item.judul}
                    src={item.url}
                    className="mt-4 h-56 w-full rounded-2xl border border-[#1C01A5]/10"
                    loading="lazy"
                  />
                ) : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
