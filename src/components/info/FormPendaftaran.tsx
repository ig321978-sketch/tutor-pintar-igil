"use client";

import { useId, useState } from "react";
import { faseDariKelas, nisnCocokFase } from "@/lib/fase";
import { kelasKotak, kelasLabel } from "@/lib/tema";
import ParentConsentChecklist from "./ParentConsentChecklist";

const DAFTAR_KELAS = ["1", "2", "3", "4", "5", "6"] as const;

/**
 * Formulir pendaftaran anak (diisi orang tua). Hanya meminta data minimal:
 * nama panggilan, kelas, NISN (tidak disimpan), nama pemilik rekening, dan kode undangan rumah (opsional).
 * Tombol daftar baru aktif setelah data valid dan ketiga persetujuan dicentang.
 * Pengiriman ke server belum tersambung: data hanya diperiksa di perangkat dan tidak disimpan.
 */
export default function FormPendaftaran() {
  const idNama = useId();
  const idKelas = useId();
  const idNisn = useId();
  const idPemilik = useId();
  const idKode = useId();
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [nisn, setNisn] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [kode, setKode] = useState("");
  const [pesan, setPesan] = useState("");

  const fase = kelas ? faseDariKelas(kelas) : null;
  const nisnLengkap = nisn.length === 10;
  const nisnValid = fase ? nisnCocokFase(nisn, fase) : false;
  const dataLengkap = nama.trim().length >= 2 && fase !== null && nisnValid && pemilik.trim().length >= 3;

  let galatNisn = "";
  if (nisnLengkap && fase && !nisnValid) {
    galatNisn = "Awalan NISN tidak sesuai dengan kelas yang dipilih. Periksa lagi kelas atau NISN anak.";
  } else if (nisnLengkap && !fase) {
    galatNisn = "Pilih kelas anak terlebih dahulu.";
  }

  function daftar() {
    setNisn("");
    setPesan(
      "Pratinjau: pendaftaran belum tersambung ke server, jadi tidak ada data yang dikirim atau disimpan. NISN sudah dihapus dari layar.",
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 px-2 py-6">
      <header className="rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-5 text-white shadow-lg">
        <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-950">
          Pendaftaran Anak
        </span>
        <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">Daftarkan Anak ke IGIL</h1>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-100">
          Diisi oleh orang tua atau wali. IGIL tidak meminta Kartu Keluarga, NIK, atau foto rapor.
        </p>
      </header>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5"
        aria-label="Data anak"
        autoComplete="off"
      >
        <div>
          <label htmlFor={idNama} className={kelasLabel}>
            Nama panggilan anak
          </label>
          <input
            id={idNama}
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className={kelasKotak}
            placeholder="Contoh: Budi"
            maxLength={40}
          />
        </div>

        <div>
          <label htmlFor={idKelas} className={kelasLabel}>
            Kelas anak (isi sesuai rapor)
          </label>
          <select id={idKelas} value={kelas} onChange={(e) => setKelas(e.target.value)} className={kelasKotak}>
            <option value="">Pilih kelas</option>
            {DAFTAR_KELAS.map((k) => (
              <option key={k} value={k}>
                Kelas {k} SD
              </option>
            ))}
          </select>
          {fase ? (
            <p className="mt-1 text-xs font-bold text-[#1C01A5]">
              Anak akan masuk {fase.replace("_", " ")} dan bersaing hanya dengan teman satu fase.
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={idNisn} className={kelasLabel}>
            NISN (10 angka)
          </label>
          <input
            id={idNisn}
            value={nisn}
            onChange={(e) => setNisn(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            autoComplete="off"
            className={kelasKotak}
            placeholder="0123456789"
            aria-describedby={`${idNisn}-info`}
            aria-invalid={galatNisn ? true : undefined}
          />
          <p id={`${idNisn}-info`} className="mt-1 text-xs font-semibold text-slate-600">
            🔐 NISN tidak disimpan. Server hanya mengubahnya menjadi kode acak untuk mencegah akun ganda.
          </p>
          {galatNisn ? <p className="mt-1 text-xs font-bold text-rose-600">{galatNisn}</p> : null}
        </div>

        <div>
          <label htmlFor={idPemilik} className={kelasLabel}>
            Nama pemilik rekening penerima beasiswa
          </label>
          <input
            id={idPemilik}
            value={pemilik}
            onChange={(e) => setPemilik(e.target.value)}
            className={kelasKotak}
            placeholder="Nama sesuai buku tabungan atau e-wallet"
            maxLength={80}
            aria-describedby={`${idPemilik}-info`}
          />
          <p id={`${idPemilik}-info`} className="mt-1 text-xs font-semibold text-slate-600">
            💳 Hanya nama. Nomor rekening diurus langsung oleh payment gateway dan tidak disimpan IGIL.
          </p>
        </div>

        <div>
          <label htmlFor={idKode} className={kelasLabel}>
            Kode Undangan Rumah (opsional)
          </label>
          <input
            id={idKode}
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase().slice(0, 16))}
            className={kelasKotak}
            placeholder="Isi jika pasangan sudah mendaftar"
            autoCapitalize="characters"
          />
        </div>
      </form>

      <ParentConsentChecklist nonaktif={!dataLengkap} onDaftar={daftar} />

      {!dataLengkap ? (
        <p className="text-center text-xs font-semibold text-slate-500">
          Lengkapi nama, kelas, NISN yang sesuai, dan nama pemilik rekening agar tombol daftar bisa aktif.
        </p>
      ) : null}
      {pesan ? (
        <p
          role="status"
          className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-sm font-bold leading-snug text-indigo-950"
        >
          {pesan}
        </p>
      ) : null}
    </div>
  );
}
