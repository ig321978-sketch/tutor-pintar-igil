"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import KartuAkunOrtu from "@/components/auth/KartuAkunOrtu";
import {
  LABEL_TOMBOL_LUNAS_AKHIR,
  LABEL_TOMBOL_LUNAS_AWAL,
  LABEL_TOMBOL_QRIS,
  TEKS_AKAD,
  TEKS_INFO_CUTOFF,
  TEKS_KUNCI_JADWAL,
  TEKS_PDP,
  lewatTanggalDuaLima,
  modePembayaran,
  type JendelaUji,
} from "@/lib/pembayaran-qris";

interface AnakProfil {
  id: string;
  nama: string;
  kelas: number;
  langgananAktif?: boolean | null;
  langgananMenunggu?: boolean;
  langgananBerakhir?: string | null;
}

type Langkah = "form" | "memuat" | "qr" | "lunas" | "galat";

function tanggalId(iso: string | null | undefined): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Jakarta" }).format(t);
}

/**
 * Checkout langganan 30 hari. Tombol QR baru hidup setelah dua persetujuan wali dicentang.
 */
export default function CheckoutQris() {
  const params = useSearchParams();
  const mode = modePembayaran(process.env.NEXT_PUBLIC_PAYMENT_MODE, process.env.NODE_ENV === "production");
  const [anak, setAnak] = useState<AnakProfil[]>([]);
  const [idAnak, setIdAnak] = useState<string>("");
  const [siap, setSiap] = useState<"memuat" | "masuk" | "tamu" | "kosong" | "galat">("memuat");
  const [akad, setAkad] = useState(false);
  const [pdp, setPdp] = useState(false);
  const [langkah, setLangkah] = useState<Langkah>("form");
  const [pesan, setPesan] = useState("");
  const [orderId, setOrderId] = useState("");
  const [gambar, setGambar] = useState("");
  const [simulasi, setSimulasi] = useState(false);
  const [mulai, setMulai] = useState<string | null>(null);
  const [berakhir, setBerakhir] = useState<string | null>(null);
  const [menunggu, setMenunggu] = useState(false);
  const [infoCutoff, setInfoCutoff] = useState(false);

  useEffect(() => {
    setInfoCutoff(lewatTanggalDuaLima(new Date()));
  }, []);

  const muatProfil = useCallback(async () => {
    setSiap("memuat");
    try {
      const res = await fetch("/api/belajar/profil", { cache: "no-store" });
      const json = (await res.json()) as { status?: string; anak?: AnakProfil[] };
      if (json.status === "belum_masuk") {
        setSiap("tamu");
        return;
      }
      if (json.status === "belum_ada_anak") {
        setSiap("kosong");
        return;
      }
      if (json.status !== "siap" || !json.anak?.length) {
        setSiap("galat");
        return;
      }
      setAnak(json.anak);
      const minta = params.get("anak");
      const pilih = json.anak.find((a) => a.id === minta)?.id ?? json.anak[0].id;
      setIdAnak(pilih);
      setSiap("masuk");
    } catch {
      setSiap("galat");
    }
  }, [params]);

  useEffect(() => {
    void muatProfil();
  }, [muatProfil]);

  const dipilih = useMemo(() => anak.find((a) => a.id === idAnak) ?? null, [anak, idAnak]);
  const bolehTampil = akad && pdp && Boolean(idAnak) && langkah !== "memuat";

  useEffect(() => {
    if (langkah !== "qr" || !orderId) return;
    let batal = false;
    const t = window.setInterval(() => {
      void (async () => {
        try {
          const res = await fetch(`/api/payments/status?order=${orderId}`, { cache: "no-store" });
          const json = (await res.json()) as {
            lunas?: boolean;
            mulai?: string | null;
            berakhir?: string | null;
            menunggu?: boolean;
          };
          if (batal || !json.lunas) return;
          setMulai(json.mulai ?? null);
          setBerakhir(json.berakhir ?? null);
          setMenunggu(json.menunggu === true);
          setLangkah("lunas");
        } catch {
          // Jaringan putus. Percobaan berikutnya mengulang.
        }
      })();
    }, 4000);
    return () => {
      batal = true;
      window.clearInterval(t);
    };
  }, [langkah, orderId]);

  async function tampilkanQris() {
    if (!bolehTampil) return;
    setLangkah("memuat");
    setPesan("");
    try {
      const res = await fetch("/api/payments/qris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anak: idAnak, akad: true, pdp: true }),
      });
      const json = (await res.json()) as {
        status?: string;
        pesan?: string;
        orderId?: string;
        qrDataUrl?: string;
        simulasi?: boolean;
      };
      if (json.status !== "ok" || !json.orderId || !json.qrDataUrl) {
        setPesan(json.pesan || "QRIS belum terbit. Coba lagi.");
        setLangkah("galat");
        return;
      }
      setOrderId(json.orderId);
      setGambar(json.qrDataUrl);
      setSimulasi(json.simulasi === true);
      setLangkah("qr");
    } catch {
      setPesan("Jaringan putus sebelum QR tampil. Coba lagi.");
      setLangkah("galat");
    }
  }

  async function simulasiLunas(jendela: JendelaUji) {
    if (!orderId) return;
    setPesan("");
    try {
      const res = await fetch("/api/payments/mock-settle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, jendela }),
      });
      const json = (await res.json()) as {
        applied?: boolean;
        starts_at?: string | null;
        expires_at?: string | null;
        menunggu?: boolean;
        pesan?: string;
      };
      if (!res.ok || json.applied !== true) {
        setPesan(json.pesan || "Simulasi lunas belum berhasil.");
        return;
      }
      setMulai(json.starts_at ?? null);
      setBerakhir(json.expires_at ?? null);
      setMenunggu(json.menunggu === true);
      setLangkah("lunas");
    } catch {
      setPesan("Jaringan putus saat simulasi lunas.");
    }
  }

  return (
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="judul-checkout"
      data-testid="checkout-qris"
      className="mx-auto w-full max-w-lg space-y-4 rounded-3xl bg-white p-5 text-indigo-950 shadow-xl sm:p-7"
    >
      <p className="text-xs font-black uppercase tracking-wide text-amber-700">Akun &amp; Langganan</p>
      <h1 id="judul-checkout" className="text-2xl font-black">
        Masuk, daftar, atau berlangganan
      </h1>
      <div className="space-y-2 rounded-2xl border border-indigo-100 bg-indigo-50/60 px-3 py-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>
          <span className="font-black text-indigo-950">Gratis tanpa langganan:</span> Silabus, Materi (termasuk
          Simulasi), dan Ranking Beasiswa.
        </p>
        <p>
          <span className="font-black text-indigo-950">Dengan langganan Rp 50.000 / 30 hari:</span> Latihan, Ujian,
          Praktikum, serta seluruh fitur evaluasi. Ini jual-beli layanan, bukan iuran dan bukan undian.
        </p>
      </div>
      {infoCutoff ? (
        <p className="rounded-2xl border border-amber-400 bg-amber-50 px-3 py-2 text-sm font-bold leading-relaxed" data-testid="info-cutoff">
          {TEKS_INFO_CUTOFF}
        </p>
      ) : null}

      {siap === "memuat" ? <p className="text-sm font-bold">Memeriksa akun…</p> : null}
      {siap === "tamu" ? (
        <div className="space-y-3" data-testid="checkout-tamu">
          <KartuAkunOrtu judul="Buat akun atau masuk" onMasuk={() => void muatProfil()} />
          <p className="text-xs font-semibold leading-relaxed text-slate-600">
            Setelah masuk, daftarkan profil anak bila belum ada, lalu lanjut QRIS di halaman ini bila ingin
            berlangganan.
          </p>
        </div>
      ) : null}
      {siap === "kosong" ? (
        <div className="space-y-3" data-testid="checkout-kosong">
          <p className="text-sm font-semibold leading-relaxed text-slate-700">
            Akun sudah masuk. Daftarkan profil anak dulu sebelum berlangganan.
          </p>
          <Link href="/daftar" className="inline-flex rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-indigo-950">
            DAFTARKAN PROFIL ANAK
          </Link>
        </div>
      ) : null}
      {siap === "galat" || mode === "tertutup" ? (
        <p className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-950">
          {mode === "tertutup" ? "Pembayaran belum diaktifkan di server." : "Akun belum bisa dibaca. Muat ulang sebentar lagi."}
        </p>
      ) : null}

      {siap === "masuk" && dipilih?.langgananMenunggu ? (
        <p className="rounded-2xl border border-amber-400 bg-amber-50 px-3 py-2 text-sm font-bold leading-relaxed">{TEKS_KUNCI_JADWAL}</p>
      ) : null}

      {siap === "masuk" && dipilih?.langgananAktif ? (
        <p className="rounded-2xl border border-amber-400 bg-amber-50 px-3 py-2 text-sm font-bold">
          Langganan {dipilih.nama} masih aktif{dipilih.langgananBerakhir ? ` sampai ${tanggalId(dipilih.langgananBerakhir)}` : ""}. Perpanjangan menambah 30 hari.
        </p>
      ) : null}

      {siap === "masuk" && (langkah === "form" || langkah === "galat" || langkah === "memuat") ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void tampilkanQris();
          }}
        >
          {anak.length > 1 ? (
            <label className="block text-sm font-black">
              Anak
              <select
                value={idAnak}
                onChange={(e) => setIdAnak(e.target.value)}
                className="mt-1 w-full rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 px-3 py-3 text-base font-bold"
              >
                {anak.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nama} · Kelas {a.kelas}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p className="text-sm font-black">Untuk {dipilih?.nama}</p>
          )}

          <label className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={akad}
              onChange={(e) => setAkad(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-indigo-800"
            />
            <span>{TEKS_AKAD}</span>
          </label>
          <label className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={pdp}
              onChange={(e) => setPdp(e.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-indigo-800"
            />
            <span>{TEKS_PDP}</span>
          </label>

          <button
            type="submit"
            data-testid="tombol-qris"
            disabled={!bolehTampil || mode === "tertutup"}
            className="w-full rounded-full border-4 border-amber-400 bg-amber-400 px-4 py-3 text-base font-black text-indigo-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {langkah === "memuat" ? "Menyiapkan QR…" : LABEL_TOMBOL_QRIS}
          </button>
        </form>
      ) : null}

      {langkah === "qr" ? (
        <div className="space-y-3 text-center">
          <p className="text-sm font-bold text-slate-700">
            {simulasi ? "QRIS simulasi. Kode ini tidak bisa dibayar di aplikasi bank." : "Pindai QRIS ini sebesar Rp 50.000."}
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gambar} alt="QRIS langganan IGIL Rp 50.000" className="mx-auto h-64 w-64 rounded-2xl bg-white p-2 ring-1 ring-indigo-100" />
          {simulasi ? (
            <div className="space-y-2">
              <button
                type="button"
                data-testid="tombol-simulasi-lunas-awal"
                onClick={() => void simulasiLunas("awal")}
                className="w-full rounded-full border-2 border-indigo-950 bg-indigo-950 px-4 py-3 text-sm font-black text-amber-300"
              >
                {LABEL_TOMBOL_LUNAS_AWAL}
              </button>
              <button
                type="button"
                data-testid="tombol-simulasi-lunas-akhir"
                onClick={() => void simulasiLunas("akhir")}
                className="w-full rounded-full border-2 border-amber-400 bg-white px-4 py-3 text-sm font-black text-indigo-950"
              >
                {LABEL_TOMBOL_LUNAS_AKHIR}
              </button>
            </div>
          ) : (
            <p className="text-xs font-semibold text-slate-500">Halaman ini menunggu konfirmasi pembayaran.</p>
          )}
        </div>
      ) : null}

      {langkah === "lunas" ? (
        <p className="rounded-2xl border-4 border-amber-400 bg-amber-50 px-4 py-3 text-sm font-black leading-relaxed" data-testid="langganan-aktif">
          {menunggu
            ? TEKS_KUNCI_JADWAL
            : `Langganan aktif${mulai ? ` mulai ${tanggalId(mulai)}` : ""}${berakhir ? ` sampai ${tanggalId(berakhir)}` : ""}. Latihan, Ujian, dan Praktikum sudah terbuka.`}
        </p>
      ) : null}

      {pesan ? <p className="text-sm font-bold text-rose-800">{pesan}</p> : null}
    </section>
  );
}
