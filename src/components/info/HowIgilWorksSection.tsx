"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { KodePhase } from "@/lib/fase";

export type KodeFase = KodePhase;

type Fase = {
  kode: KodeFase;
  huruf: string;
  kelas: string;
  penjelasan: string;
};

const DAFTAR_FASE: readonly Fase[] = [
  {
    kode: "FASE_A",
    huruf: "A",
    kelas: "Kelas 1–2",
    penjelasan:
      "Siswa Kelas 1 dan 2 hanya bersaing dengan sesama Kelas 1 dan 2. Poin Kualifikasi hanya bisa dikumpulkan di modul Fase A.",
  },
  {
    kode: "FASE_B",
    huruf: "B",
    kelas: "Kelas 3–4",
    penjelasan:
      "Siswa Kelas 3 dan 4 hanya bersaing dengan sesama Kelas 3 dan 4. Poin Kualifikasi hanya bisa dikumpulkan di modul Fase B.",
  },
  {
    kode: "FASE_C",
    huruf: "C",
    kelas: "Kelas 5–6",
    penjelasan:
      "Siswa Kelas 5 dan 6 hanya bersaing dengan sesama Kelas 5 dan 6. Poin Kualifikasi hanya bisa dikumpulkan di modul Fase C.",
  },
];

const TAHAP_SMICPA = [
  { huruf: "S", nama: "Story" },
  { huruf: "M", nama: "Mind-map" },
  { huruf: "I", nama: "Infografis" },
  { huruf: "C", nama: "Concrete" },
  { huruf: "P", nama: "Pictorial" },
  { huruf: "A", nama: "Abstract" },
] as const;

const LENCANA_PRIVASI = [
  {
    ikon: "🚫",
    judul: "Tanpa KK & Tanpa NIK",
    isi: "IGIL tidak pernah meminta Kartu Keluarga maupun NIK untuk mendaftar atau belajar.",
  },
  {
    ikon: "🔐",
    judul: "NISN Tidak Disimpan",
    isi: "NISN hanya diubah menjadi kode acak (HMAC di server) untuk mencegah akun ganda. Nomor aslinya tidak tersimpan.",
  },
  {
    ikon: "📷",
    judul: "Tanpa Kamera Saat Materi, Latihan, Ujian, & Praktikum",
    isi: "Anak belajar dan mengerjakan soal tanpa kamera sama sekali. Panggilan kamera 2 menit hanya dilakukan di akhir bulan, khusus verifikasi lisan kandidat penerima beasiswa, dan tidak direkam.",
  },
  {
    ikon: "💳",
    judul: "Rekening Aman",
    isi: "Nomor rekening diurus langsung oleh payment gateway. IGIL tidak menyimpannya.",
  },
] as const;

const BARIS_BANDING = [
  {
    topik: "Siapa yang menjawab soal?",
    bimbing: "Anak sendiri. Orang tua duduk di samping, menjelaskan pelan-pelan, dan menyemangati.",
    joki: "Orang lain menjawab semua soal atas nama anak.",
  },
  {
    topik: "Kalau jawabannya salah",
    bimbing: "Anak membaca ulang materi SMICPA, lalu mencoba lagi sampai paham.",
    joki: "Jawaban ditebak atau dicari sampai kebetulan benar, tanpa paham.",
  },
  {
    topik: "Saat Uji Lisan 2 menit",
    bimbing:
      "Anak bisa bercerita dengan kata-katanya sendiri: bagaimana cara mengerjakan dan mengapa begitu. Lolos!",
    joki: "Anak tidak bisa menjelaskan cara dan alasannya. Akun gugur dari pencairan bulan itu.",
  },
  {
    topik: "Bab berikutnya",
    bimbing: "Anak percaya diri karena fondasinya kuat.",
    joki: "Anak makin tertinggal karena konsepnya belum dimengerti.",
  },
  {
    topik: "Bagi keluarga",
    bimbing: "Beasiswa cair dengan tenang dan anak bangga pada dirinya sendiri.",
    joki: "Kehilangan kesempatan beasiswa dan mengambil tempat anak lain yang belajar jujur.",
  },
] as const;

function rupiah(angka: number): string {
  return `Rp ${new Intl.NumberFormat("id-ID").format(angka)}`;
}

function JudulBagian({ lencana, judul, id, isi }: { lencana: string; judul: string; id: string; isi?: string }) {
  return (
    <div className="space-y-2">
      <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-300">
        {lencana}
      </span>
      <h3 id={id} className="break-words text-xl font-black leading-tight text-indigo-950 sm:text-2xl">
        {judul}
      </h3>
      {isi ? <p className="max-w-3xl text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">{isi}</p> : null}
    </div>
  );
}

function AlurDana({ faseAnak }: { faseAnak?: KodeFase }) {
  const [fase, setFase] = useState<KodeFase>(faseAnak ?? "FASE_A");
  const [langganan, setLangganan] = useState(100000);
  const aktif = DAFTAR_FASE.find((f) => f.kode === fase) ?? DAFTAR_FASE[0];
  const beasiswa = Math.round(langganan * 0.9);
  const operasional = langganan - beasiswa;
  const idRentang = useId();

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
        <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/20">
          <span className="text-3xl" aria-hidden="true">
            👨‍👩‍👧
          </span>
          <p className="text-sm font-black">Langganan Orang Tua</p>
          <p className="text-xs font-semibold text-indigo-200">Setiap bulan, dibagi otomatis oleh sistem</p>
        </div>

        <p className="my-1 text-center text-2xl font-black text-amber-300" aria-hidden="true">
          ↓
        </p>

        <div className="grid gap-3 md:grid-cols-[3fr_2fr]">
          <div className="rounded-2xl bg-amber-400 p-3 text-indigo-950">
            <p className="flex items-center gap-2 text-sm font-black">
              <span className="rounded-full bg-[#1C01A5] px-2.5 py-0.5 text-base text-amber-300">90%</span>
              <span className="min-w-0 flex-1">🎓 Kantong Beasiswa (pilih fase)</span>
            </p>
            <div role="tablist" aria-label="Pilih fase" className="mt-2 grid grid-cols-3 gap-2">
              {DAFTAR_FASE.map((f) => {
                const menyala = f.kode === fase;
                return (
                  <button
                    key={f.kode}
                    type="button"
                    role="tab"
                    aria-selected={menyala}
                    onClick={() => setFase(f.kode)}
                    className={`rounded-xl px-2 py-2 text-center ${
                      menyala
                        ? "border-[#1C01A5] bg-[#1C01A5] text-white shadow-md"
                        : "border-indigo-950/30 bg-white/70 text-indigo-950 hover:bg-white"
                    }`}
                  >
                    <span className="block text-[11px] font-black leading-none">FASE {f.huruf}</span>
                    <span className="block text-sm font-black leading-tight">{f.kelas}</span>
                    {f.kode === faseAnak ? (
                      <span
                        className={`mt-1 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-black leading-none ${
                          menyala ? "bg-amber-400 text-indigo-950" : "bg-[#1C01A5] text-amber-300"
                        }`}
                      >
                        ⭐ Anakmu
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div role="tabpanel" className="mt-2 rounded-xl bg-white p-3">
              <p className="text-sm font-black text-[#1C01A5]">
                Kantong dan Papan Peringkat {aktif.kode.replace("_", " ")} sendiri
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{aktif.penjelasan}</p>
              <p className="mt-2 rounded-lg bg-indigo-50/60 p-2 text-xs font-bold leading-snug text-indigo-950">
                Isi kantong ini: 90% langganan siswa {aktif.kelas} + bagian limpahan surplus operasional.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-3 text-indigo-950">
            <p className="flex items-center gap-2 text-sm font-black">
              <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-base text-indigo-950">10%</span>
              <span className="min-w-0 flex-1">🖥️ Kolam Operasional</span>
            </p>
            <ul className="mt-2 space-y-1.5 text-xs font-semibold leading-snug text-slate-600">
              <li>• Biaya server yang sebenarnya</li>
              <li>• Biaya hidup layak founder (ada batas atas)</li>
              <li className="font-black text-[#1C01A5]">
                • Sisa surplus 100% kembali ke Kantong Beasiswa, dibagi menurut jumlah pelanggan aktif tiap fase
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-bold text-amber-200">
          <span aria-hidden="true">♻️</span>
          Surplus tidak dikantongi. Ia kembali ke beasiswa anak-anak.
        </p>
      </div>

      <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
        <label htmlFor={idRentang} className="text-sm font-black text-indigo-950">
          Coba hitung dengan angka contoh: <span className="whitespace-nowrap text-[#1C01A5]">{rupiah(langganan)}</span>
        </label>
        <input
          id={idRentang}
          type="range"
          min={10000}
          max={500000}
          step={10000}
          value={langganan}
          onChange={(e) => setLangganan(Number(e.target.value))}
          className="mt-2 w-full accent-[#1C01A5]"
        />
        <div className="mt-2 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-2xl bg-amber-400 p-3">
            <p className="text-[11px] font-black uppercase text-indigo-950/80">Ke Kantong Beasiswa</p>
            <p className="text-lg font-black text-indigo-950">{rupiah(beasiswa)}</p>
          </div>
          <div className="rounded-2xl bg-indigo-50/60 p-3">
            <p className="text-[11px] font-black uppercase text-indigo-950/70">Ke Kolam Operasional</p>
            <p className="text-lg font-black text-indigo-950">{rupiah(operasional)}</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] font-semibold text-slate-500">
          Angka contoh untuk membantu memahami pembagian, bukan daftar harga.
        </p>
      </div>
    </div>
  );
}

function RumusToken() {
  const kartu = [
    { ikon: "✏️", nilai: 30, nama: "Latihan", syarat: "10 soal terbimbing dengan pembahasan guru" },
    { ikon: "📝", nilai: 70, nama: "Ujian", syarat: "Lulus 100% (nilai sempurna)" },
    { ikon: "🧪", nilai: 50, nama: "Praktikum", syarat: "Tugas sintesis lintas 4 bab" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-stretch gap-1 md:flex-row md:items-center md:gap-2">
        {kartu.flatMap((k, i) => [
          <div
            key={k.nama}
            className="rounded-2xl border-2 border-indigo-100 bg-white p-3 text-center shadow-sm md:flex-1"
          >
            <p className="text-2xl" aria-hidden="true">
              {k.ikon}
            </p>
            <p className="text-3xl font-black text-[#1C01A5]">{k.nilai}</p>
            <p className="text-sm font-black text-indigo-950">Poin {k.nama}</p>
            <p className="mt-1 text-xs font-semibold leading-snug text-slate-600">{k.syarat}</p>
          </div>,
          <span key={`${k.nama}-tanda`} className="text-center text-3xl font-black leading-none text-amber-500" aria-hidden="true">
            {i < kartu.length - 1 ? "+" : "="}
          </span>,
        ])}
        <div className="rounded-2xl bg-amber-400 p-4 text-center shadow-md md:w-48">
          <p className="text-4xl font-black text-indigo-950">150</p>
          <p className="text-sm font-black text-indigo-950">Poin Kualifikasi per bab</p>
          <p className="mt-1 rounded-full bg-[#1C01A5] px-2 py-0.5 text-[11px] font-black text-amber-300">
            Terbit sekali per bab
          </p>
        </div>
      </div>

      <div className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-4">
        <p className="text-sm font-black text-indigo-950">
          📖 Belajar dengan metode SMICPA: 6 tahap, 24 halaman per bab
        </p>
        <ol className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {TAHAP_SMICPA.map((t) => (
            <li key={t.huruf} className="rounded-xl bg-white p-2 text-center shadow-sm">
              <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#1C01A5] text-sm font-black text-amber-300">
                {t.huruf}
              </span>
              <span className="mt-1 block text-[11px] font-black text-indigo-950">{t.nama}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 rounded-2xl bg-white p-3 text-xs font-semibold leading-relaxed text-slate-600">
          Poin Kualifikasi dipakai untuk peringkat, bukan uang tunai dan bukan janji bayaran per poin. Beasiswa dibagikan akhir bulan kepada pemenang
          peringkat di fase masing-masing. Semua yang dipelajari anak tetap tersimpan setelah poin direset tiap bulan.
        </p>
      </div>
    </div>
  );
}

function TabelBanding() {
  return (
    <div>
      <table className="hidden w-full overflow-hidden rounded-3xl text-left md:table">
        <caption className="sr-only">Perbandingan membimbing anak dan menggunakan joki</caption>
        <thead>
          <tr className="text-sm">
            <th scope="col" className="w-1/5 rounded-tl-3xl bg-indigo-50 p-3 font-black text-indigo-950">
              &nbsp;
            </th>
            <th scope="col" className="bg-[#1C01A5] p-3 font-black text-amber-300">
              🤝 Membimbing
            </th>
            <th scope="col" className="rounded-tr-3xl bg-slate-200 p-3 font-black text-slate-700">
              🎭 Menjoki
            </th>
          </tr>
        </thead>
        <tbody>
          {BARIS_BANDING.map((b) => (
            <tr key={b.topik} className="border-t border-indigo-100 align-top text-sm">
              <th scope="row" className="bg-indigo-50 p-3 font-black text-indigo-950">
                {b.topik}
              </th>
              <td className="bg-white p-3 font-semibold leading-snug text-indigo-950">{b.bimbing}</td>
              <td className="bg-slate-50 p-3 font-semibold leading-snug text-slate-600">{b.joki}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="space-y-3 md:hidden">
        {BARIS_BANDING.map((b) => (
          <div key={b.topik} className="overflow-hidden rounded-2xl border-2 border-indigo-100 bg-white">
            <p className="bg-indigo-50 p-2.5 text-sm font-black text-indigo-950">{b.topik}</p>
            <div className="border-b border-indigo-100 p-3">
              <p className="text-[11px] font-black uppercase text-[#1C01A5]">🤝 Membimbing</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-indigo-950">{b.bimbing}</p>
            </div>
            <div className="bg-slate-50 p-3">
              <p className="text-[11px] font-black uppercase text-slate-500">🎭 Menjoki</p>
              <p className="mt-0.5 text-sm font-semibold leading-snug text-slate-600">{b.joki}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-amber-400 p-3 text-sm font-black leading-snug text-indigo-950">
        <span aria-hidden="true">💬</span>
        <span>
          Anak gugup saat ditanya? Tenang. Ada 1 kesempatan ulang dengan soal lain dari bab yang sama. Yang dinilai
          adalah pemahaman anak, bukan kata-kata yang sempurna.
        </span>
      </p>
    </div>
  );
}

export type HowIgilWorksSectionProps = {
  /** Jika diisi, tombol ajakan emas ditampilkan di akhir bagian. */
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  /** Fase profil anak yang sedang login. Diagram 90:10 langsung terbuka di fase ini dan diberi tanda "Fase anakmu". */
  faseAnak?: KodeFase;
  /** Nama panggilan anak untuk sapaan di header (opsional). */
  namaAnak?: string;
};

export default function HowIgilWorksSection({
  ctaHref,
  ctaLabel = "Mulai Belajar Bersama Anak",
  className = "",
  faseAnak,
  namaAnak,
}: HowIgilWorksSectionProps) {
  const profilFase = faseAnak ? DAFTAR_FASE.find((f) => f.kode === faseAnak) : undefined;
  const idDana = useId();
  const idToken = useId();
  const idPrivasi = useId();
  const idBanding = useId();

  return (
    <section aria-label="Cara kerja IGIL" className={`mx-auto w-full max-w-5xl space-y-10 px-2 py-6 sm:py-10 ${className}`}>
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-5 text-white shadow-lg sm:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] leading-none opacity-15 sm:text-[11rem]"
        >
          🦉
        </span>
        <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-950">
          Transparan untuk orang tua dan siswa
        </span>
        <h2 className="relative mt-3 break-words text-2xl font-black leading-tight sm:text-4xl">Bagaimana IGIL Bekerja?</h2>
        <p className="relative mt-2 max-w-3xl text-sm font-semibold leading-relaxed text-indigo-100 sm:text-base">
          Anak belajar, mengumpulkan Poin Kualifikasi, dan bersaing secara adil dengan teman satu jenjang. Berikut penjelasan
          lengkapnya, tanpa istilah rumit.
        </p>
        {profilFase ? (
          <p className="relative mt-3 inline-block rounded-2xl bg-white/15 px-3 py-2 text-sm font-black text-amber-300 ring-1 ring-white/25">
            {namaAnak ? `${namaAnak} berada di ` : "Anakmu berada di "}
            {`FASE ${profilFase.huruf} (${profilFase.kelas})`}
          </p>
        ) : null}
      </header>

      <div className="space-y-4" aria-labelledby={idDana}>
        <JudulBagian
          id={idDana}
          lencana="1 · Ke mana uang langganan pergi"
          judul="90% untuk Beasiswa, Dibagi per Fase"
          isi="Ketuk fase di bawah untuk melihat kantong beasiswanya. Setiap fase punya kantong dan papan peringkat sendiri, jadi anak Kelas 1 tidak bersaing dengan anak Kelas 6."
        />
        <AlurDana key={faseAnak ?? "umum"} faseAnak={faseAnak} />
      </div>

      <div className="space-y-4" aria-labelledby={idToken}>
        <JudulBagian
          id={idToken}
          lencana="2 · Cara mengumpulkan poin"
          judul="150 Poin Kualifikasi Setiap Bab"
          isi="Setiap bab menghasilkan Poin Kualifikasi satu kali saja. Tidak bisa diulang untuk menambah poin."
        />
        <RumusToken />
      </div>

      <div className="space-y-4" aria-labelledby={idPrivasi}>
        <JudulBagian
          id={idPrivasi}
          lencana="3 · Privasi anak"
          judul="4 Jaminan Privasi"
          isi="Data anak adalah amanah. Ini yang IGIL lakukan, dan yang tidak pernah IGIL lakukan."
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {LENCANA_PRIVASI.map((l) => (
            <li
              key={l.judul}
              className="flex items-start gap-3 rounded-3xl border-2 border-amber-400 bg-white p-4 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-2xl"
              >
                {l.ikon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-base font-black leading-tight text-indigo-950">{l.judul}</p>
                <p className="mt-1 text-sm font-semibold leading-snug text-slate-600">{l.isi}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4" aria-labelledby={idBanding}>
        <JudulBagian
          id={idBanding}
          lencana="4 · Belajar jujur"
          judul="Membimbing vs. Menjoki"
          isi="Setiap pencairan beasiswa, anak diajak bercerita sendiri selama 2 menit tentang cara dan alasan menjawab satu soal. Anak yang benar-benar dibimbing akan lolos dengan mudah."
        />
        <TabelBanding />
      </div>

      {ctaHref ? (
        <div className="text-center">
          <Link
            href={ctaHref}
            className="igil-tombol inline-block rounded-2xl border-amber-400 bg-amber-400 px-6 py-3 text-base font-black text-indigo-950 shadow-md hover:bg-amber-300"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
