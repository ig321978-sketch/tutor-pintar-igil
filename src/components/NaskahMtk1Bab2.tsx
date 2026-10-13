"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB2.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function duaCaraDelapan(teks: string): boolean {
  const padat = teks.toLowerCase().replace(/\s+/g, "");
  const unik = new Set(
    [...padat.matchAll(/(\d+)\+(\d+)=8/g)]
      .map((temuan) => {
        const kiri = Number(temuan[1]);
        const kanan = Number(temuan[2]);
        if (kiri + kanan !== 8 || kiri > 10 || kanan > 10) return "";
        return [kiri, kanan].sort((a, b) => a - b).join("+");
      })
      .filter(Boolean),
  );
  return unik.size >= 2;
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Lala: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bima: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Raka: "border-[#7C3AED]/25 bg-[#F5F3FF]",
  Kepi: "border-[#F0AB00] bg-[#FFF8E8]",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <span className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </span>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Pilih({
  id,
  soal,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
  onNilai,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
  onNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              const tepat = item.huruf === benar;
              if (tepat) kuis?.tandaiBenar(id);
              onNilai?.(tepat);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              item.huruf,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function KuisCocok({
  id,
  soal,
  baris,
  umpan,
  salah,
}: {
  id: string;
  soal: string;
  baris: { label: string; gambar: string; benar: string }[];
  umpan: string;
  salah: string;
}) {
  const kuis = useKuisMateri();
  const pilihan = [...new Set(baris.map((item) => item.benar))];
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = baris.every((item) => pilih[item.label] === item.benar);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
      <p className="text-sm font-semibold text-slate-700">{soal}</p>
      <div className="mt-3 grid gap-3">
        {baris.map((item) => (
          <div key={item.label} className="rounded-xl bg-white px-3 py-3">
            <p className="text-sm font-black text-[#1C01A5]">{item.label}</p>
            <p className="text-2xl leading-relaxed">{item.gambar}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {pilihan.map((kalimat) => {
                const terpilih = pilih[item.label] === kalimat;
                const dasar = terpilih
                  ? "bg-[#F0AB00] text-[#1C01A5]"
                  : "bg-[#1C01A5] text-white hover:bg-[#16017a]";
                return (
                  <button
                    key={kalimat}
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setPilih((lama) => ({ ...lama, [item.label]: kalimat }));
                    }}
                    className={`rounded-xl px-3 py-2 text-sm font-black ${
                      status
                        ? kelasTombolHasilKuis(pilih[item.label] ?? "", kalimat, item.benar, dasar)
                        : dasar
                    }`}
                  >
                    {kalimat}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function SusunBalok() {
  const kuis = useKuisMateri();
  const pool = [
    { kunci: "4", tampil: "4" },
    { kunci: "=", tampil: "=" },
    { kunci: "7", tampil: "7" },
    { kunci: "+", tampil: "+" },
    { kunci: "3", tampil: "3" },
  ];
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((item) => !susun.includes(item.kunci));
  const periksa = () => {
    const kalimat = susun.join("");
    const ok = kalimat === "4+3=7" || kalimat === "3+4=7";
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("B", 1));
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold text-slate-700">
        Susun balok supaya jadi kalimat matematika yang benar.
      </p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-xl bg-white px-3 py-3">
        {susun.length === 0 ? (
          <p className="text-sm font-bold text-slate-400">Ketuk balok untuk menyusun.</p>
        ) : null}
        {susun.map((kunci) => (
          <span key={kunci} className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white">
            {kunci}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, item.kunci]);
            }}
            className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
          >
            {item.tampil}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Susun lagi. Hasilnya harus 7." />
        <Umpan status={status} teks="Benar! 4 + 3 = 7 dan 3 + 4 = 7 sama-sama benar." />
      </div>
    </article>
  );
}

function DuaCaraDelapan() {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pertanyaan: "Tulis 2 cara berbeda untuk mendapatkan angka 8.",
            konteks: "Benar hanya jika ada dua penjumlahan berbeda yang hasilnya 8, misalnya 4 + 4 = 8 dan 5 + 3 = 8.",
            alias: [],
            jawaban: data,
          }),
        });
        const json = (await respons.json()) as {
          berhasil?: boolean;
          benar?: boolean;
          bacaan?: string;
          pesan?: string;
        };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && duaCaraDelapan(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(idKuis("D", 4));
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    setCuplikan(data.trim());
    const ok = duaCaraDelapan(data);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("D", 4));
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      <p className="text-center text-lg font-black text-[#1C01A5]">⬜ + ⬜ = 8 &nbsp;&nbsp; ⬜ + ⬜ = 8</p>
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        5. Tulis 2 cara berbeda untuk mendapatkan angka 8.
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis
        status={status}
        cuplikan={cuplikan || undefined}
        pesanSalah="Tulis dua kalimat yang berbeda, misalnya 4 + 4 = 8 dan 5 + 3 = 8."
      />
      <Umpan status={status} teks="Hebat! Ada banyak jalan menuju angka 8." />
    </div>
  );
}

function KapalHarta() {
  const kuis = useKuisMateri();
  const [tuang, setTuang] = useState(false);
  const [jalur, setJalur] = useState({ tenang: false, badai: false });
  const [teropong, setTeropong] = useState(false);
  const [putar, setPutar] = useState(false);
  const sudah = (indeks: number) => kuis?.sudahBenar(idKuis("C", indeks)) === true;
  const permata = Math.max(
    0,
    (sudah(0) ? 1 : 0) +
      (sudah(1) ? 2 : 0) +
      (sudah(2) ? 3 : 0) +
      (jalur.tenang ? 1 : 0) +
      (jalur.badai ? 3 : 0) +
      (sudah(3) ? 1 : 0) +
      (kuis?.sudahBenar(idKuisTulisKartu(ID, "C")) ? 2 : 0) -
      (teropong ? 1 : 0),
  );
  const gagal = () => setPutar(true);

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm font-semibold text-slate-700">
        Kamu kapten kapal. Kepi memandu di atas tiang. Kapal berlayar kalau jawaban benar. Kumpulkan 10 permata.
      </p>
      <p className={`text-center text-3xl ${putar ? "animate-spin" : ""}`} aria-hidden>
        ⛵
      </p>
      <p className="text-center text-sm font-black text-[#1C01A5]">🗺️ 🏝️ Gabung · 🏝️ Simbol · 🏝️ Cerita · 🏝️ Tenang · 🏝️ Badai</p>
      <p className="text-sm font-black text-[#1C01A5]">Permata {permata}/10 💎</p>
      {putar ? (
        <p className="text-sm font-semibold text-amber-800">Kapal berputar. Permatamu tetap aman. Coba lagi.</p>
      ) : null}

      <article className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 px-4 py-4">
        <p className="text-sm font-black text-[#166534]">Level 1 · Pulau Gabung</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">Ada 2 peti. Tarik keduanya ke kapal, lalu hitung koinnya.</p>
        {tuang || sudah(0) ? (
          <p className="mt-3 text-center text-2xl">🪙🪙🪙🪙🪙</p>
        ) : (
          <p className="mt-3 text-center text-2xl">🪙🪙 &nbsp; 🪙🪙🪙</p>
        )}
        {tuang || sudah(0) ? (
          <p className="mt-2 text-sm font-bold text-[#1C01A5]">Satu… dua… tiga… empat… lima!</p>
        ) : (
          <button
            type="button"
            onClick={() => setTuang(true)}
            className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
          >
            Tuang kedua peti ke kapal
          </button>
        )}
        {tuang || sudah(0) ? (
          <div className="mt-3">
            <Pilih
              id={idKuis("C", 0)}
              soal="Jadi berapa koin semuanya?"
              benar="B"
              umpan="Hebat! 2 + 3 = 5. Kamu mendapat 1 permata."
              salah="Gabungkan, lalu hitung satu per satu."
              pilihan={[
                { huruf: "A", teks: "4" },
                { huruf: "B", teks: "5" },
                { huruf: "C", teks: "6" },
              ]}
              onNilai={(benar) => {
                if (!benar) gagal();
              }}
            />
          </div>
        ) : null}
      </article>

      <article className="rounded-2xl border-2 border-amber-400 bg-amber-50 px-4 py-4">
        <p className="text-sm font-black text-[#92400E]">Level 2 · Pulau Simbol</p>
        <KuisTulisKartu
          id={idKuis("C", 1)}
          hanyaKanvas
          rapat
          pertanyaan="Tulis tanda + dan = supaya kalimatnya lengkap."
          alias={kumpulkanAlias(["4 + 2 = 6", "4+2=6"])}
          konteks="Empat tambah dua sama dengan enam."
          visual={<p className="text-center text-2xl font-black text-[#1C01A5]">4 ⬜ 2 ⬜ 6</p>}
          sesudahNilai={(benar) => {
            if (!benar) gagal();
          }}
        />
        {sudah(1) ? <p className="text-sm font-bold text-emerald-800">2 permata masuk ke kapal.</p> : null}
      </article>

      <article className="rounded-2xl border-2 border-rose-400 bg-rose-50 px-4 py-4">
        <p className="text-sm font-black text-[#9F1239]">Level 3 · Pulau Cerita</p>
        <Dialog nama="Putri duyung" anak="Aku punya 5 mutiara. Temanku memberi 4 mutiara lagi. Berapa mutiaraku sekarang?" />
        <KuisTulisKartu
          id={idKuis("C", 2)}
          hanyaKanvas
          rapat
          pertanyaan="Tuliskan kalimat matematikanya dan hasilnya."
          alias={kumpulkanAlias(["5 + 4 = 9", "5+4=9", "4 + 5 = 9", "4+5=9"])}
          konteks="Lima tambah empat sama dengan sembilan."
          visual={<p className="text-center text-2xl">⚪⚪⚪⚪⚪ + ⚪⚪⚪⚪</p>}
          sesudahNilai={(benar) => {
            if (!benar) gagal();
          }}
        />
        {sudah(2) ? <p className="text-sm font-bold text-emerald-800">3 permata masuk ke kapal.</p> : null}
      </article>

      <article className="rounded-2xl border-2 border-sky-500 bg-sky-50 px-4 py-4">
        <p className="text-sm font-black text-[#0C4A6E]">Persimpangan peta</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Laut tenang memberi soal mudah dan 1 permata. Laut badai memberi soal cerita dan 3 permata.
        </p>
        <div className="mt-3">
          <Pilih
            id={idKuis("C", 4)}
            soal="🌤️ Laut tenang: 🐚 + 🐚🐚. Berapa jumlah kerangnya?"
            benar="B"
            umpan="Laut tenang dilalui. 2 + 1 = 3. Kamu mendapat 1 permata."
            salah="Hitung kerang di kedua kelompok."
            pilihan={[
              { huruf: "A", teks: "2" },
              { huruf: "B", teks: "3" },
              { huruf: "C", teks: "4" },
            ]}
            onNilai={(benar) => {
              if (benar) setJalur((lama) => ({ ...lama, tenang: true }));
              else gagal();
            }}
          />
        </div>
        <div className="mt-4">
          <KuisTulisKartu
            id={idKuis("C", 4)}
            hanyaKanvas
            rapat
            pertanyaan="⛈️ Laut badai: Bima punya 6 bendera. Raka menambah 3. Tuliskan hasilnya."
            alias={kumpulkanAlias(["9", "sembilan", "6 + 3 = 9", "6+3=9"])}
            konteks="Enam tambah tiga sama dengan sembilan."
            visual={<p className="text-center text-2xl">🚩🚩🚩🚩🚩🚩 + 🚩🚩🚩</p>}
            sesudahNilai={(benar) => {
              if (benar) setJalur((lama) => ({ ...lama, badai: true }));
              else gagal();
            }}
          />
        </div>
        {jalur.badai ? <p className="text-sm font-bold text-emerald-800">Laut badai dilalui. 3 permata masuk.</p> : null}
      </article>

      <button
        type="button"
        onClick={() => {
          if (permata < 1 || teropong) return;
          setTeropong(true);
        }}
        className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-black text-[#1C01A5]"
      >
        {teropong ? "Teropong sudah dipakai" : "Pakai teropong petunjuk · biaya 1 permata"}
      </button>
      {teropong ? (
        <p className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
          0 – 1 – 2 – 3 – 4 – 5 – 6 – 7 – 8 – 9 – 10
        </p>
      ) : null}

      <div className="border-t-2 border-[#1C01A5]/10 pt-4">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-2xl">🪙🪙🪙🪙🪙🪙 &nbsp; 🪙🪙🪙</p>
        <SoalRekamSuara
          id={idKuis("C", 3)}
          pertanyaan="Kalau dua peti digabung, ada berapa koin?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["9", "sembilan"])}
          petunjuk="Ucapkan jawabannya."
          sesudahNilai={(benar) => {
            if (!benar) gagal();
          }}
        />
      </div>
      <KuisTulisKartu
        id={idKuisTulisKartu(ID, "C")}
        hanyaKanvas
        pertanyaan="Kapal sudah punya 7 permata. Tinggal butuh berapa lagi supaya jadi 10?"
        alias={kumpulkanAlias(["3", "tiga"])}
        konteks="Tujuh ditambah tiga sama dengan sepuluh."
        visual={<p className="text-center text-2xl font-black text-[#1C01A5]">7 + ⬜ = 10</p>}
        sesudahNilai={(benar) => {
          if (!benar) gagal();
        }}
      />

      <article className="rounded-2xl border-2 border-[#7C3AED]/30 bg-[#F5F3FF] px-4 py-3">
        <p className="text-sm font-black text-[#5B21B6]">Mode berdua</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Dua kapten menggabungkan permata: 4 💎 + 6 💎 = 10 💎.
        </p>
      </article>

      {permata >= 10 ? (
        <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4 text-center">
          <p className="text-3xl" aria-hidden>
            👑💎
          </p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Peti Harta Raja Laut terbuka!</p>
        </div>
      ) : null}
    </div>
  );
}

function LembarEvaluasi() {
  const kuis = useKuisMateri();
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [suaraPasar, setSuaraPasar] = useState(false);
  const [tulisPasar, setTulisPasar] = useState(false);
  const sudahPasar = useRef(false);
  useEffect(() => {
    if (sudahPasar.current || !suaraPasar || !tulisPasar) return;
    sudahPasar.current = true;
    kuis?.tandaiBenar(idKuis("D", 6));
  }, [kuis, suaraPasar, tulisPasar]);
  const skor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((indeks) => kuis?.sudahBenar(idKuis("D", indeks))).length;
  const lencana =
    skor >= 9 ? "👑 Raja Laut Penjumlahan. Luar biasa! Kamu kapten paling hebat!"
    : skor >= 6 ? "⛵ Pelaut Cerdas. Hebat! Sedikit lagi sampai ke harta karun!"
    : "🐚 Kerang Pintar. Ayo berlayar lagi bersama Kepi, kamu pasti bisa!";

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-3">
        <label className="text-xs font-black uppercase text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Kelas
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">1</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Skor
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">⭐ {skor} / 10</span>
        </p>
      </div>

      <KuisTulisKartu
        id={idKuis("D", 0)}
        hanyaKanvas
        pertanyaan="1. Tulis jumlah semua kue."
        alias={kumpulkanAlias(["7", "tujuh"])}
        konteks="Tiga kue ditambah empat kue sama dengan tujuh."
        visual={<p className="text-center text-2xl">🧁🧁🧁 + 🧁🧁🧁🧁 = ⬜</p>}
      />
      <KuisTulisKartu
        id={idKuis("D", 1)}
        hanyaKanvas
        pertanyaan="2. Ada 2 kupu-kupu. Datang 3 kupu-kupu lagi. Gambar jumlahnya dengan bulatan, lalu tulis kalimat matematikanya."
        alias={kumpulkanAlias(["2 + 3 = 5", "2+3=5", "dua tambah tiga sama dengan lima"])}
        konteks="Lima kupu-kupu. Dua tambah tiga sama dengan lima."
        visual={<p className="text-center text-2xl">🦋🦋 + 🦋🦋🦋</p>}
      />
      <KuisTulisKartu
        id={idKuis("D", 2)}
        hanyaKanvas
        pertanyaan="3. Angka berapa yang ada di dalam kotak?"
        alias={kumpulkanAlias(["5", "lima"])}
        konteks="Empat ditambah lima sama dengan sembilan."
        visual={<p className="text-center text-2xl font-black text-[#1C01A5]">4 + ⬜ = 9</p>}
      />
      <div>
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-sm font-semibold text-slate-700">4. Raka berkata, “6 + 3 = 8!”</p>
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan="Apakah Raka benar? Ucapkan Benar atau Salah, lalu sebutkan jawaban yang benar."
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["salah", "tidak benar", "tidak tepat", "keliru"],
              ["9", "sembilan"],
            ])
          }
          petunjuk="Sebut salah, lalu sebut angka yang benar."
        />
      </div>
      <DuaCaraDelapan />
      <Pilih
        id={idKuis("D", 5)}
        soal="6. Timbangan kiri 3 + 4. Pilih kartu supaya timbangan seimbang."
        benar="B"
        umpan="Timbangannya seimbang. 3 + 4 = 7 dan 5 + 2 = 7."
        salah="Hitung kedua sisi. Hasilnya harus sama."
        visual={<p>⚖️ 3 + 4 &nbsp;&nbsp; ❓</p>}
        pilihan={[
          { huruf: "A", teks: "2 + 4" },
          { huruf: "B", teks: "5 + 2" },
          { huruf: "C", teks: "6 + 3" },
        ]}
      />
      <div className="space-y-3">
        <p className="text-sm font-semibold text-slate-700">
          7. Ibu membeli 5 tomat dan 5 wortel. Berapa sayur yang dibeli Ibu semuanya?
        </p>
        <p className="text-2xl">🍅🍅🍅🍅🍅 + 🥕🥕🥕🥕🥕</p>
        <KuisTulisKartu
          id={`${ID}-D-pasar`}
          hanyaKanvas
          rapat
          pertanyaan="Tulis kalimat matematikanya."
          alias={kumpulkanAlias(["5 + 5 = 10", "5+5=10"])}
          konteks="Lima tambah lima sama dengan sepuluh."
          sesudahNilai={(benar) => {
            if (benar) setTulisPasar(true);
          }}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="Ucapkan jumlah sayurnya."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["10", "sepuluh"])}
          petunjuk="Sebutkan hasilnya."
          sesudahNilai={(benar) => {
            if (benar) setSuaraPasar(true);
          }}
        />
      </div>
      <KuisCocok
        id={idKuis("D", 7)}
        soal="8. Pasangkan kartu yang hasilnya sama."
        baris={[
          { label: "2 + 7", gambar: "2 + 7", benar: "4 + 5" },
          { label: "1 + 5", gambar: "1 + 5", benar: "6 + 0" },
          { label: "3 + 1", gambar: "3 + 1", benar: "2 + 2" },
        ]}
        umpan="Semua pasangan seimbang."
        salah="Hitung setiap kartu, lalu cari hasil yang sama."
      />
      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="9. Bus punya 10 kursi. Sudah ada 6 anak. Berapa anak lagi supaya bus penuh?"
        alias={kumpulkanAlias(["4", "empat"])}
        konteks="Sepuluh dikurangi enam, atau enam ditambah empat sama dengan sepuluh."
        visual={<p className="text-center text-2xl">💺 × 10 · 👧👦 sudah 6</p>}
      />
      <div>
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-2xl">🐤🐤🐤 + 🐤🐤🐤🐤🐤</p>
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="Buat cerita pendek dari gambar ini, lalu sebutkan hasilnya."
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["3", "tiga"],
              ["5", "lima"],
              ["8", "delapan"],
            ])
          }
          petunjuk="Sebut kedua jumlah, lalu sebut hasilnya."
        />
      </div>
      <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">{lencana}</p>
    </div>
  );
}

export default function NaskahMtk1Bab2({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kartuA = MODUL_MTK1_BAB2.kartu[0];
  const kartuB = MODUL_MTK1_BAB2.kartu[1];
  const kartuC = MODUL_MTK1_BAB2.kartu[2];
  const kartuD = MODUL_MTK1_BAB2.kartu[3];
  const [kedip, setKedip] = useState(0);
  const kuis = useKuisMateri();

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏖️🦀🐚
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Penjumlahan sampai dengan 10</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Setelah belajar, siswa dapat:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
            <li>Menggabungkan dua kelompok benda.</li>
            <li>Memakai simbol + dan =.</li>
            <li>Menyelesaikan soal cerita penjumlahan sampai 10.</li>
          </ul>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#0C4A6E]">Adegan 1 · Tiba di pantai</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-1.jpg"
              alt="Lala, Bima, dan Raka tiba di pantai membawa ember. Kepi si katak ikut berjalan."
            />
            <p className="mt-2 text-center text-4xl" aria-hidden>
              🌊 ⛱️ 🕊️ 🪣
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Pantai biru, pasir kuning, dan payung merah putih. Tiga anak membawa ember.</p>
          </article>
          <Dialog nama="Lala" anak="Hore, kita sampai di pantai!" />
          <Dialog nama="Bima" anak="Ayo kita cari kerang!" />
          <Dialog nama="Kepi" anak="Cik-cik! Aku bantu cari, ya!" />
          <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">Adegan 2 · Menggabungkan kerang</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-2.jpg"
              alt="Ember Lala berisi 3 kerang. Ember Bima berisi 2 kerang."
            />
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase text-[#92400E]">Ember Lala</p>
                <IkonUlang ikon="🐚" jumlah={3} ukuran="text-3xl" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-[#92400E]">Ember Bima</p>
                <IkonUlang ikon="🐚" jumlah={2} ukuran="text-3xl" />
              </div>
            </div>
          </article>
          <Dialog nama="Lala" anak="Kerangku ada 3." />
          <Dialog nama="Bima" anak="Kerangku ada 2." />
          <Dialog nama="Raka" anak="Kalau digabung, jadi berapa?" />
          <p className="text-center text-sm font-bold text-[#1C01A5]">Satu, dua, tiga, empat, lima!</p>
          <p className="text-center text-2xl">
            <IkonUlang ikon="🐚" jumlah={3} /> + <IkonUlang ikon="🐚" jumlah={2} /> = <IkonUlang ikon="🐚" jumlah={5} />
          </p>
          <p className="text-center text-4xl font-black text-[#1C01A5]">3 + 2 = 5</p>
          <Dialog nama="Kepi" anak="Jadi 5 kerang! Menggabungkan itu namanya menjumlahkan!" />
          <article className="rounded-2xl border-2 border-[#7C3AED]/30 bg-[#F5F3FF] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#5B21B6]">Adegan 3 · Kenalan dengan simbol</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-3.jpg"
              alt="Tanda tambah dan tanda sama dengan di pasir pantai."
            />
            <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">➕ &nbsp; 🟰</p>
          </article>
          <Dialog nama="Raka" anak="Tanda silang itu apa?" />
          <Dialog nama="Kepi" anak="Itu tanda tambah. Artinya digabung!" />
          <Dialog nama="Raka" anak="Kalau dua garis itu?" />
          <Dialog nama="Lala" anak="Itu tanda sama dengan. Artinya hasilnya!" />
          <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">Adegan 4 · Istana pasir</p>
            <GambarCerita
              src="/doodle-mtk/mtk-1-bab2-adegan-4.jpg"
              alt="Istana pasir punya 4 bendera. Di sampingnya ada 3 bendera lagi."
            />
            <p className="mt-2 text-center text-3xl" aria-hidden>
              🏰
            </p>
            <p className="text-center text-2xl">
              <IkonUlang ikon="🚩" jumlah={4} /> + <IkonUlang ikon="🚩" jumlah={3} />
            </p>
          </article>
          <Dialog nama="Bima" anak="Istanaku punya 4 bendera." />
          <Dialog nama="Raka" anak="Aku tambah 3 bendera, ya!" />
          <Dialog nama="Kepi" anak="Sekarang ada berapa bendera?" />
          <p className="text-center text-sm font-bold text-[#1C01A5]">Lima… enam… tujuh!</p>
          <p className="text-center text-4xl font-black text-[#1C01A5]">4 + 3 = 7</p>
          <p className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">Horeee! Menjumlahkan itu seru!</p>
        </div>
        <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="text-center text-2xl">
            <IkonUlang ikon="🦀" jumlah={2} /> + <IkonUlang ikon="🦀" jumlah={4} />
          </p>
          <SoalRekamSuara
            id={idKuis("A", 0)}
            pertanyaan="Ada 2 kepiting, lalu datang 4 kepiting lagi. Jadi berapa semuanya?"
            periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["6", "enam"])}
            petunjuk="Ucapkan dengan keras."
          />
          {kuis?.sudahBenar(idKuis("A", 0)) ? (
            <p className="text-sm font-bold text-emerald-800">Cik-cik! Kamu hebat!</p>
          ) : null}
        </div>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          hanyaKanvas
          pertanyaan="Tulis jumlah semua kerang di kotak."
          alias={kumpulkanAlias(["8", "delapan"])}
          konteks="Lima kerang ditambah tiga kerang sama dengan delapan."
          visual={
            <p className={`text-center text-2xl ${kedip >= 2 ? "animate-pulse" : ""}`}>
              🐚🐚🐚🐚🐚 + 🐚🐚🐚 = ⬜
            </p>
          }
          sesudahNilai={(benar) => {
            if (!benar) setKedip((lama) => lama + 1);
          }}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          ➕🧺🦘
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>
        <TabelInfoGrafis
          judul="Infografis: Ayo Menjumlahkan"
          kepala={["Gambar", "Kalimat", "Hasil"]}
          baris={[
            ["🍎🍎 + 🍎🍎🍎", "2 + 3", "5"],
            ["⭐⭐⭐⭐ + ⭐⭐", "4 + 2", "6"],
            ["5 lalu lompat 3", "5 + 3", "8"],
            ["6 jari + 4 jari", "6 + 4", "10"],
            ["🍩🍩🍩 + 🍩", "3 + 1", "4"],
            ["🍩 + 🍩🍩🍩", "1 + 3", "4"],
          ]}
          kaki="Dibalik tetap sama. 3 + 1 = 1 + 3"
        />
        <div className="mt-4 space-y-4">
          <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-black text-[#166534]">Poin 1 · Menjumlahkan = menggabungkan</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="🍎" jumlah={2} /> + <IkonUlang ikon="🍎" jumlah={3} /> = <IkonUlang ikon="🍎" jumlah={5} />
            </p>
            <p className="text-2xl font-black text-[#1C01A5]">2 + 3 = 5</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">2 dan 3 adalah benda yang digabung. + artinya digabung. = artinya hasilnya. 5 adalah jumlah semuanya.</p>
            <p className="text-sm font-bold text-[#1C01A5]">Dibaca: dua tambah tiga sama dengan lima.</p>
          </article>
          <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
            <p className="text-sm font-black text-[#0C4A6E]">Poin 2 · Hitung semua</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="⭐" jumlah={4} /> + <IkonUlang ikon="⭐" jumlah={2} />
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Gabungkan, hitung 1 sampai 6. Angka terakhir adalah hasilnya. 4 + 2 = 6.</p>
          </article>
          <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-sm font-black text-[#92400E]">Poin 3 · Hitung lanjut, lompat kanguru</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Simpan 5 di kepala. Lompat 3 kali: 6, 7, 8.</p>
            <div className="mt-3 flex flex-wrap justify-center gap-1">
              {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((angka) => (
                <span
                  key={angka}
                  className={`rounded-full px-2 py-1 text-sm font-black ${
                    angka === "6" || angka === "7" || angka === "8"
                      ? "bg-[#1C01A5] text-white"
                      : "bg-white text-[#1C01A5]"
                  }`}
                >
                  {angka}
                </span>
              ))}
            </div>
            <p className="text-2xl font-black text-[#1C01A5]">5 + 3 = 8</p>
          </article>
          <article className="rounded-2xl border-2 border-[#7C3AED]/30 bg-[#F5F3FF] px-4 py-3">
            <p className="text-sm font-black text-[#5B21B6]">Poin 4 · Pakai jari</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Angkat 6 jari, lalu 4 jari lagi. Semua jari terangkat. 6 + 4 = 10.</p>
          </article>
          <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 px-4 py-3">
            <p className="text-sm font-black text-[#9F1239]">Poin 5 · Dibalik, hasilnya tetap sama</p>
            <p className="mt-2 text-center text-2xl">
              <IkonUlang ikon="🍩" jumlah={3} /> + <IkonUlang ikon="🍩" jumlah={1} /> = 4
            </p>
            <p className="text-center text-2xl">
              <IkonUlang ikon="🍩" jumlah={1} /> + <IkonUlang ikon="🍩" jumlah={3} /> = 4
            </p>
            <p className="text-sm font-semibold text-slate-700">3 + 1 = 4 dan 1 + 3 = 4. Mulai dari angka yang lebih besar supaya lebih cepat.</p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-3">
            <p className="text-sm font-black text-[#1C01A5]">Poin 6 · Teman sepuluh</p>
            <div className="mt-3 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
              {[
                ["1", "9"],
                ["2", "8"],
                ["3", "7"],
                ["4", "6"],
                ["5", "5"],
              ].map(([kiri, kanan], indeks) => (
                <div
                  key={kiri}
                  className={`grid grid-cols-3 items-center px-3 py-2 text-center ${
                    indeks % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
                  }`}
                >
                  <span className="text-2xl font-black text-[#1C01A5]">{kiri}</span>
                  <span className="text-2xl font-black text-[#1C01A5]">{kanan}</span>
                  <span className="text-lg font-black text-[#92400E]">= 10</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-3">
            <p className="text-sm font-black text-[#0F766E]">Poin 7 · Soal cerita</p>
            <p className="mt-2 text-center text-2xl">🎈🎈🎈🎈 + 🎈🎈</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Lala punya 4 balon. Ibu memberi 2 balon lagi.</p>
            <p className="mt-2 text-sm font-bold text-[#1C01A5]">Cari angka 4 dan 2. Kata “memberi lagi” berarti tambah. 4 + 2 = 6. Balon Lala sekarang ada 6.</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Kata kunci tambah: digabung, ditambah, diberi lagi, datang lagi, semuanya, jumlahnya.</p>
          </article>
        </div>
        <div className="mt-6 space-y-4">
          <KuisCocok
            id={idKuis("B", 0)}
            soal="Cocokkan gambar dengan kalimat matematika yang benar."
            baris={[
              { label: "Ikan", gambar: "🐟🐟 + 🐟🐟🐟🐟🐟", benar: "2 + 5 = 7" },
              { label: "Es krim", gambar: "🍦🍦🍦 + 🍦🍦🍦", benar: "3 + 3 = 6" },
              { label: "Lebah", gambar: "🐝 + 🐝🐝🐝🐝🐝🐝🐝🐝", benar: "1 + 8 = 9" },
            ]}
            umpan="Cocok! Ikan 2 + 5 = 7, es krim 3 + 3 = 6, lebah 1 + 8 = 9."
            salah="Hitung setiap gambar, lalu pilih kalimatnya."
          />
          <SusunBalok />
          <Pilih
            id={idKuis("B", 2)}
            soal="Tiga kartu hasilnya sama. Ketuk kartu yang berbeda."
            benar="C"
            umpan="Kartu C hasilnya 9. Kartu yang lain hasilnya 8."
            salah="Hitung setiap kartu. Cari yang hasilnya tidak sama."
            pilihan={[
              { huruf: "A", teks: "5 + 3" },
              { huruf: "B", teks: "6 + 2" },
              { huruf: "C", teks: "4 + 5" },
              { huruf: "D", teks: "7 + 1" },
            ]}
          />
          <div className="border-t-2 border-[#1C01A5]/10 pt-4">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <SoalRekamSuara
              id={idKuis("B", 3)}
              pertanyaan="Teman sepuluh dari angka 7 adalah berapa?"
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["3", "tiga"])}
              petunjuk="Ucapkan angkanya."
            />
          </div>
          <KuisTulisKartu
            id={idKuisTulisKartu(ID, "B")}
            hanyaKanvas
            pertanyaan="Bima punya 3 bola. Raka punya 5 bola. Tulis kalimat matematika dan hasilnya."
            alias={kumpulkanAlias(["3 + 5 = 8", "3+5=8", "5 + 3 = 8", "5+3=8"])}
            konteks="Tiga tambah lima sama dengan delapan."
            visual={
              <p className="text-center text-2xl">
                <IkonUlang ikon="⚽" jumlah={3} /> + <IkonUlang ikon="⚽" jumlah={5} />
              </p>
            }
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚢💎🦀
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <KapalHarta />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🔑📝
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)} />
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
          <li>Tambah artinya gabung.</li>
          <li>Sama dengan artinya hasilnya.</li>
          <li>Simpan yang besar, lompat yang kecil.</li>
          <li>Dibalik tetap sama. 3 + 2 = 2 + 3.</li>
          <li>Tambah nol, angkanya tetap. 5 + 0 = 5.</li>
          <li>Cari angka, cari kata kunci, lalu hitung.</li>
        </ul>
        <LembarEvaluasi />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Tambah artinya gabung."
          alias={kumpulkanAlias(["tambah artinya gabung"])}
          konteks="Tambah artinya dua kelompok dijadikan satu."
        />
      </KartuBingkai>
    </div>
  );
}
