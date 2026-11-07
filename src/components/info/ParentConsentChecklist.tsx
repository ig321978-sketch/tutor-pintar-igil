"use client";

import { useId, useState } from "react";

const POIN_PERSETUJUAN = [
  {
    id: "kelas",
    ikon: "🎒",
    judul: "Kelas anak saya isi dengan jujur",
    isi: "Saya paham bahwa kelas anak harus diisi sesuai Rapor. Kelas hanya bisa naik, tidak bisa diturunkan lagi (One-Way Ratchet), supaya anak bersaing adil dengan teman satu jenjang.",
  },
  {
    id: "data",
    ikon: "🔐",
    judul: "Saya paham data apa yang disimpan",
    isi: "NISN tidak disimpan utuh. IGIL hanya mengubahnya menjadi kode acak (hash) untuk mencegah akun ganda. IGIL tidak menyimpan nomor rekening maupun foto dokumen.",
  },
  {
    id: "uji",
    ikon: "🗣️",
    judul: "Anak akan menjawab sendiri saat pencairan",
    isi: "Saya paham bahwa pencairan beasiswa akhir bulan mewajibkan anak menjawab sendiri 1 soal lisan (sekitar 2 menit) pada jendela pilih jadwal selama 3 hari.",
  },
] as const;

type IdPoin = (typeof POIN_PERSETUJUAN)[number]["id"];

export type ParentConsentChecklistProps = {
  /** Dipanggil saat tombol "Daftarkan Anak" ditekan (hanya aktif jika ketiga kotak dicentang). */
  onDaftar?: () => void;
  /** Mengabarkan induk setiap kali status "semua disetujui" berubah. */
  onPersetujuanBerubah?: (semuaDisetujui: boolean) => void;
  /** Kunci tombol dari luar, misalnya saat form lain belum lengkap atau sedang mengirim. */
  nonaktif?: boolean;
  sedangMengirim?: boolean;
  labelTombol?: string;
  className?: string;
};

function PenjelasanKodeRumah() {
  const [terbuka, setTerbuka] = useState(false);
  const idPanel = useId();
  return (
    <div className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40">
      <button
        type="button"
        aria-expanded={terbuka}
        aria-controls={idPanel}
        onClick={() => setTerbuka((v) => !v)}
        className="flex w-full items-center gap-3 rounded-3xl border-transparent p-3 text-left text-indigo-950"
      >
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 text-base font-black text-indigo-950"
        >
          ?
        </span>
        <span className="min-w-0 flex-1 text-sm font-black leading-snug">
          Apa itu Kode Undangan Rumah? (jika Ayah dan Ibu memakai 2 HP berbeda)
        </span>
        <span aria-hidden="true" className={`shrink-0 text-lg font-black text-[#1C01A5] transition-transform ${terbuka ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {terbuka ? (
        <div id={idPanel} className="space-y-2 px-4 pb-4 text-sm font-semibold leading-relaxed text-slate-700">
          <p>
            <span className="font-black text-[#1C01A5]">Kode Undangan Rumah</span> (
            <code className="rounded bg-white px-1 text-xs font-bold">household_invite_code</code>) menyambungkan akun
            Ayah dan Ibu ke rumah yang sama, tanpa perlu Kartu Keluarga atau NIK.
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Orang tua pertama mendaftar dan mendapat kode undangan rumah.</li>
            <li>Orang tua kedua memasukkan kode itu saat mendaftar di HP-nya sendiri.</li>
            <li>Kedua akun kini satu rumah. Anak-anak tetap punya profil dan peringkatnya masing-masing.</li>
          </ol>
          <p className="rounded-2xl bg-white p-2.5 text-xs font-bold text-indigo-950">
            Cukup 1 HP untuk semua anak? Abaikan bagian ini.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function ParentConsentChecklist({
  onDaftar,
  onPersetujuanBerubah,
  nonaktif = false,
  sedangMengirim = false,
  labelTombol = "Daftarkan Anak",
  className = "",
}: ParentConsentChecklistProps) {
  const [dicentang, setDicentang] = useState<Record<IdPoin, boolean>>({ kelas: false, data: false, uji: false });
  const idJudul = useId();
  const jumlah = Object.values(dicentang).filter(Boolean).length;
  const semua = jumlah === POIN_PERSETUJUAN.length;
  const bisaDaftar = semua && !nonaktif && !sedangMengirim;

  function ubah(id: IdPoin, nilai: boolean) {
    const berikut = { ...dicentang, [id]: nilai };
    setDicentang(berikut);
    onPersetujuanBerubah?.(Object.values(berikut).every(Boolean));
  }

  return (
    <section aria-labelledby={idJudul} className={`mx-auto w-full max-w-2xl space-y-4 ${className}`}>
      <header className="rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-5">
        <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-950">
          Persetujuan Orang Tua
        </span>
        <h2 id={idJudul} className="mt-2 text-xl font-black leading-tight sm:text-2xl">
          Sebelum Mendaftarkan Anak
        </h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-100">
          Sesuai Pasal 25 UU Pelindungan Data Pribadi, data anak diproses dengan persetujuan orang tua atau wali. Mohon
          baca dan centang ketiga poin berikut satu per satu.
        </p>
      </header>

      <ul className="space-y-3">
        {POIN_PERSETUJUAN.map((p) => {
          const aktif = dicentang[p.id];
          return (
            <li key={p.id}>
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-3xl border-2 p-4 shadow-sm transition-colors ${
                  aktif ? "border-amber-400 bg-amber-50" : "border-indigo-100 bg-white hover:border-amber-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={aktif}
                  onChange={(e) => ubah(p.id, e.target.checked)}
                  className="mt-0.5 h-7 w-7 shrink-0 cursor-pointer accent-[#1C01A5]"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-base font-black leading-tight text-indigo-950">
                    <span aria-hidden="true">{p.ikon}</span>
                    <span className="min-w-0 flex-1 break-words">{p.judul}</span>
                  </span>
                  <span className="mt-1 block text-sm font-semibold leading-relaxed text-slate-600">{p.isi}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <PenjelasanKodeRumah />

      <div className="space-y-2">
        <p className="text-center text-sm font-black text-indigo-950" role="status" aria-live="polite">
          {semua ? "✓ Semua poin sudah disetujui" : `${jumlah} dari ${POIN_PERSETUJUAN.length} poin disetujui`}
        </p>
        <button
          type="button"
          disabled={!bisaDaftar}
          onClick={() => onDaftar?.()}
          className={`w-full rounded-2xl px-4 py-3.5 text-lg font-black shadow-md ${
            bisaDaftar
              ? "border-amber-400 bg-amber-400 text-indigo-950 hover:bg-amber-300"
              : "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-500 shadow-none"
          }`}
        >
          {sedangMengirim ? "Mendaftarkan…" : labelTombol}
        </button>
        {!semua ? (
          <p className="text-center text-xs font-semibold text-slate-500">
            Tombol akan aktif setelah ketiga kotak dicentang.
          </p>
        ) : null}
      </div>
    </section>
  );
}
