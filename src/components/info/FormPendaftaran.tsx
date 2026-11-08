"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { faseDariKelas, nisnCocokFase } from "@/lib/fase";
import { kelasKotak, kelasLabel } from "@/lib/tema";
import ParentConsentChecklist from "./ParentConsentChecklist";

const DAFTAR_KELAS = ["1", "2", "3", "4", "5", "6"] as const;

interface AnakTerdaftar {
  id: string;
  nama: string;
  kelas: number;
  fase: string;
}

interface Rumah {
  kodeUndangan: string;
  pemilik: string;
}

type Tahap = "memuat" | "belum_siap" | "belum_masuk" | "siap" | "galat";

async function panggil<T>(url: string, isi?: unknown): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: isi === undefined ? "GET" : "POST",
      headers: isi === undefined ? undefined : { "Content-Type": "application/json" },
      body: isi === undefined ? undefined : JSON.stringify(isi),
      cache: "no-store",
    });
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface BalasanStatus {
  status: string;
  rumah?: Rumah | null;
  pinSudah?: boolean;
  anak?: AnakTerdaftar[];
}

const ambilStatus = () => panggil<BalasanStatus>("/api/daftar/status");

const KARTU = "space-y-4 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5";

/** Masuk atau buat akun orang tua. Setelah berhasil, induk memuat ulang status pendaftaran. */
function KartuAkun({ onMasuk }: { onMasuk: () => void }) {
  const idEmail = useId();
  const idSandi = useId();
  const [buat, setBuat] = useState(true);
  const [email, setEmail] = useState("");
  const [sandi, setSandi] = useState("");
  const [kirim, setKirim] = useState(false);
  const [pesan, setPesan] = useState("");

  async function lanjut() {
    setKirim(true);
    setPesan("");
    const res = await panggil<{ berhasil: boolean; masuk?: boolean; pesan?: string }>(
      buat ? "/api/auth/buat-akun" : "/api/auth/masuk",
      { email, password: sandi },
    );
    setKirim(false);
    if (!res) {
      setPesan("Tidak ada sinyal. Coba lagi sebentar.");
      return;
    }
    if (!res.berhasil) {
      setPesan(res.pesan ?? "Belum berhasil. Periksa isian lalu coba lagi.");
      return;
    }
    if (buat && res.masuk === false) {
      setPesan(res.pesan ?? "Akun dibuat. Silakan pilih Masuk.");
      setBuat(false);
      return;
    }
    setSandi("");
    onMasuk();
  }

  const lengkap = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) && sandi.length >= 8;

  return (
    <form
      className={KARTU}
      aria-label="Akun orang tua"
      onSubmit={(e) => {
        e.preventDefault();
        if (lengkap && !kirim) void lanjut();
      }}
    >
      <div>
        <h2 className="text-lg font-black text-indigo-950">Langkah 1: Akun orang tua</h2>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
          Akun ini yang mengelola profil anak. Email hanya dipakai untuk masuk. IGIL tidak mengirim pemberitahuan ke
          email maupun WhatsApp. Semua kabar tampil di dalam aplikasi.
        </p>
      </div>

      <div className="flex gap-2" role="tablist" aria-label="Pilih cara masuk">
        {[
          { nilai: true, label: "Buat akun baru" },
          { nilai: false, label: "Sudah punya akun" },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            role="tab"
            aria-selected={buat === p.nilai}
            onClick={() => {
              setBuat(p.nilai);
              setPesan("");
            }}
            className={`flex-1 rounded-2xl border-2 px-3 py-2 text-sm font-black ${
              buat === p.nilai
                ? "border-amber-400 bg-amber-400 text-indigo-950"
                : "border-indigo-100 bg-white text-indigo-950 hover:border-amber-400"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor={idEmail} className={kelasLabel}>
          Email orang tua
        </label>
        <input
          id={idEmail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={kelasKotak}
          autoComplete="email"
          placeholder="nama@contoh.com"
          maxLength={120}
        />
      </div>
      <div>
        <label htmlFor={idSandi} className={kelasLabel}>
          Kata sandi {buat ? "(minimal 8 karakter)" : ""}
        </label>
        <input
          id={idSandi}
          type="password"
          value={sandi}
          onChange={(e) => setSandi(e.target.value)}
          className={kelasKotak}
          autoComplete={buat ? "new-password" : "current-password"}
          maxLength={72}
        />
      </div>

      {pesan ? (
        <p role="status" className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-3 text-sm font-bold text-indigo-950">
          {pesan}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!lengkap || kirim}
        className={`w-full rounded-2xl px-4 py-3 text-base font-black shadow-md ${
          lengkap && !kirim
            ? "bg-amber-400 text-indigo-950 hover:bg-amber-300"
            : "cursor-not-allowed bg-slate-200 text-slate-500 shadow-none"
        }`}
      >
        {kirim ? "Memproses…" : buat ? "Buat Akun dan Lanjut" : "Masuk dan Lanjut"}
      </button>
    </form>
  );
}

/**
 * Formulir pendaftaran anak (diisi orang tua).
 * Alur: akun orang tua, lalu (jika belum punya) rumah dengan PIN keamanan atau gabung lewat kode undangan,
 * lalu profil anak (nama panggilan, kelas, NISN). NISN dikirim sekali ke server dan tidak disimpan.
 * Rumah, PIN, dan anak dibuat lewat RPC SECURITY DEFINER di /api/daftar/anak.
 */
export default function FormPendaftaran() {
  const idNama = useId();
  const idKelas = useId();
  const idNisn = useId();
  const idPemilik = useId();
  const idKode = useId();
  const idPin = useId();
  const idPinUlang = useId();

  const [tahap, setTahap] = useState<Tahap>("memuat");
  const [rumah, setRumah] = useState<Rumah | null>(null);
  const [pinSudah, setPinSudah] = useState(false);
  const [anakAda, setAnakAda] = useState<AnakTerdaftar[]>([]);

  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [nisn, setNisn] = useState("");
  const [pemilik, setPemilik] = useState("");
  const [kode, setKode] = useState("");
  const [pin, setPin] = useState("");
  const [pinUlang, setPinUlang] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [putaranPersetujuan, setPutaranPersetujuan] = useState(0);
  const [kirim, setKirim] = useState(false);
  const [galat, setGalat] = useState("");
  const [sukses, setSukses] = useState<{ nama: string; kodeUndangan: string | null } | null>(null);

  const terapkanStatus = useCallback((res: BalasanStatus | null) => {
    if (!res || !res.status) {
      setTahap("belum_siap");
      return;
    }
    if (res.status === "siap") {
      setRumah(res.rumah ?? null);
      setPinSudah(Boolean(res.pinSudah));
      setAnakAda(res.anak ?? []);
      setTahap("siap");
      return;
    }
    setTahap(res.status === "belum_masuk" ? "belum_masuk" : res.status === "belum_siap" ? "belum_siap" : "galat");
  }, []);

  const muat = useCallback(async () => {
    terapkanStatus(await ambilStatus());
  }, [terapkanStatus]);

  useEffect(() => {
    let batal = false;
    (async () => {
      const res = await ambilStatus();
      if (!batal) terapkanStatus(res);
    })();
    return () => {
      batal = true;
    };
  }, [terapkanStatus]);

  const fase = kelas ? faseDariKelas(kelas) : null;
  const nisnLengkap = nisn.length === 10;
  const nisnValid = fase ? nisnCocokFase(nisn, fase) : false;

  const bergabung = !rumah && kode.trim().length > 0;
  const rumahBaru = !rumah && !bergabung;
  const pinValid = /^\d{6}$/.test(pin) && pin === pinUlang;
  const dataLengkap =
    nama.trim().length >= 2 &&
    fase !== null &&
    nisnValid &&
    (rumah ? true : bergabung ? kode.trim().length >= 6 : pemilik.trim().length >= 3 && pinValid);

  let galatNisn = "";
  if (nisnLengkap && fase && !nisnValid) {
    galatNisn = "Awalan NISN tidak sesuai dengan kelas yang dipilih. Periksa lagi kelas atau NISN anak.";
  } else if (nisnLengkap && !fase) {
    galatNisn = "Pilih kelas anak terlebih dahulu.";
  }

  async function daftar() {
    if (!dataLengkap || kirim) return;
    setKirim(true);
    setGalat("");
    const res = await panggil<{ status: string; pesan?: string; kodeUndangan?: string | null }>(
      "/api/daftar/anak",
      {
        nama: nama.trim(),
        kelas: Number(kelas),
        nisn,
        pemilik: rumahBaru ? pemilik.trim() : undefined,
        kode: bergabung ? kode.trim() : undefined,
        pin: rumahBaru ? pin : undefined,
      },
    );
    setKirim(false);
    // NISN tidak boleh tersisa di layar, apa pun hasilnya.
    setNisn("");
    setPin("");
    setPinUlang("");
    if (!res) {
      setGalat("Tidak ada sinyal. Coba lagi sebentar.");
      return;
    }
    if (res.status === "ok") {
      setSukses({ nama: nama.trim(), kodeUndangan: res.kodeUndangan ?? null });
      setNama("");
      setKelas("");
      setSetuju(false);
      setPutaranPersetujuan((n) => n + 1);
      void muat();
      return;
    }
    if (res.status === "belum_masuk") {
      setTahap("belum_masuk");
      return;
    }
    if (res.status === "belum_siap") {
      setTahap("belum_siap");
      return;
    }
    setGalat(res.pesan ?? "Pendaftaran belum berhasil. Coba lagi.");
    // Rumah mungkin sudah terbentuk walau anak gagal. Muat ulang agar isian rumah tidak diminta dua kali.
    void muat();
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

      {tahap === "memuat" ? (
        <p role="status" className="text-center text-sm font-bold text-indigo-950">
          ⏳ Menyiapkan pendaftaran…
        </p>
      ) : null}

      {tahap === "belum_siap" ? (
        <p role="status" className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-4 text-sm font-bold leading-snug text-indigo-950">
          🛠️ Pendaftaran belum dibuka di server. Mohon kembali beberapa saat lagi.
        </p>
      ) : null}

      {tahap === "galat" ? (
        <p role="alert" className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4 text-sm font-bold text-rose-700">
          Data pendaftaran belum bisa dibaca. Muat ulang halaman lalu coba lagi.
        </p>
      ) : null}

      {tahap === "belum_masuk" ? <KartuAkun onMasuk={() => void muat()} /> : null}

      {tahap === "siap" ? (
        <>
          {sukses ? (
            <section
              role="status"
              className="space-y-2 rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 text-indigo-950 shadow-sm"
            >
              <p className="text-lg font-black">🎉 {sukses.nama} sudah terdaftar!</p>
              <p className="text-sm font-semibold leading-relaxed">
                NISN sudah dihapus dari layar dan tidak disimpan. Sekarang {sukses.nama} bisa belajar, mengerjakan
                Latihan, dan Ujian dengan penilaian di server.
              </p>
              {sukses.kodeUndangan ? (
                <p className="text-sm font-semibold leading-relaxed">
                  Kode Undangan Rumah untuk pasangan Anda:{" "}
                  <strong className="rounded bg-white px-2 py-0.5 font-mono text-base font-black tracking-wider text-[#1C01A5]">
                    {sukses.kodeUndangan}
                  </strong>
                  . Simpan baik-baik, kode juga tampil di halaman ini.
                </p>
              ) : null}
              <Link
                href="/ruang-belajar"
                className="inline-block rounded-2xl bg-amber-400 px-5 py-2.5 text-sm font-black text-indigo-950 shadow-md hover:bg-amber-300"
              >
                Mulai Belajar ➡️
              </Link>
            </section>
          ) : null}

          {rumah ? (
            <section className="space-y-3 rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-4" aria-label="Rumah keluarga">
              <h2 className="text-base font-black text-indigo-950">🏠 Rumah keluarga Anda</h2>
              <p className="text-sm font-semibold leading-relaxed text-slate-700">
                Kode Undangan Rumah (untuk Ayah atau Ibu yang memakai HP lain):{" "}
                <strong className="rounded bg-white px-2 py-0.5 font-mono font-black tracking-wider text-[#1C01A5]">
                  {rumah.kodeUndangan || "—"}
                </strong>
              </p>
              {anakAda.length > 0 ? (
                <ul className="space-y-1 text-sm font-bold text-indigo-950">
                  {anakAda.map((a) => (
                    <li key={a.id} className="rounded-2xl bg-white px-3 py-2">
                      🧒 {a.nama} · Kelas {a.kelas} SD · {a.fase.replace("_", " ")}
                    </li>
                  ))}
                </ul>
              ) : null}
              {!pinSudah ? (
                <p className="rounded-2xl bg-amber-50 p-2.5 text-xs font-bold text-indigo-950">
                  PIN keamanan orang tua belum dipasang untuk rumah ini.
                </p>
              ) : null}
            </section>
          ) : (
            <section className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-xs font-bold text-indigo-950">
              ✅ Akun sudah masuk. Lengkapi data di bawah untuk membuat rumah keluarga dan mendaftarkan anak pertama.
            </section>
          )}

          <form
            onSubmit={(e) => e.preventDefault()}
            className={KARTU}
            aria-label="Data anak"
            autoComplete="off"
          >
            <h2 className="text-lg font-black text-indigo-950">
              {rumah ? "Tambah anak" : "Langkah 2: Data anak dan rumah"}
            </h2>

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

            {!rumah ? (
              <>
                <div>
                  <label htmlFor={idKode} className={kelasLabel}>
                    Kode Undangan Rumah (opsional)
                  </label>
                  <input
                    id={idKode}
                    value={kode}
                    onChange={(e) => setKode(e.target.value.replace(/[^0-9a-fA-F]/g, "").toLowerCase().slice(0, 32))}
                    className={kelasKotak}
                    placeholder="Isi jika pasangan sudah mendaftar"
                    autoCapitalize="none"
                    spellCheck={false}
                  />
                  {bergabung ? (
                    <p className="mt-1 text-xs font-bold text-[#1C01A5]">
                      Anda akan bergabung ke rumah pasangan. Nama pemilik rekening dan PIN sudah diatur di sana.
                    </p>
                  ) : null}
                </div>

                {rumahBaru ? (
                  <>
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

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor={idPin} className={kelasLabel}>
                          PIN orang tua (6 angka)
                        </label>
                        <input
                          id={idPin}
                          type="password"
                          value={pin}
                          onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          inputMode="numeric"
                          autoComplete="new-password"
                          className={kelasKotak}
                          placeholder="••••••"
                        />
                      </div>
                      <div>
                        <label htmlFor={idPinUlang} className={kelasLabel}>
                          Ulangi PIN
                        </label>
                        <input
                          id={idPinUlang}
                          type="password"
                          value={pinUlang}
                          onChange={(e) => setPinUlang(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          inputMode="numeric"
                          autoComplete="new-password"
                          className={kelasKotak}
                          placeholder="••••••"
                        />
                      </div>
                    </div>
                    <p className="-mt-2 text-xs font-semibold text-slate-600">
                      🔑 PIN dipakai untuk mengubah data rekening. PIN tidak disimpan utuh dan tidak bisa dibaca
                      siapa pun, jadi catat sendiri. Lima kali salah mengunci percobaan selama 15 menit.
                    </p>
                    {pin.length === 6 && pinUlang.length === 6 && pin !== pinUlang ? (
                      <p className="-mt-2 text-xs font-bold text-rose-600">Kedua PIN belum sama.</p>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </form>

          <ParentConsentChecklist
            key={putaranPersetujuan}
            nonaktif={!dataLengkap}
            sedangMengirim={kirim}
            onPersetujuanBerubah={setSetuju}
            onDaftar={() => {
              if (setuju) void daftar();
            }}
          />

          {!dataLengkap ? (
            <p className="text-center text-xs font-semibold text-slate-500">
              {`Lengkapi nama, kelas, NISN yang sesuai${
                rumah ? "" : bergabung ? ", dan kode undangan" : ", nama pemilik rekening, dan PIN 6 angka"
              } agar tombol daftar bisa aktif.`}
            </p>
          ) : null}
          {galat ? (
            <p role="alert" className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-3 text-sm font-bold leading-snug text-rose-700">
              {galat}
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
