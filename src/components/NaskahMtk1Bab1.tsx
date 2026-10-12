"use client";

import { useState, type ReactNode } from "react";
import GambarDoodle from "@/components/GambarDoodle";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";
import type { KartuModulResmi } from "@/lib/modul-resmi-pai";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function kartuModul(kode: string): KartuModulResmi {
  const ketemu = MODUL_MTK1_BAB1.kartu.find((item) => item.kode === kode);
  if (!ketemu) throw new Error(`Kartu ${kode} tidak ada`);
  return ketemu;
}

function ambilAngka(teks: string): number[] {
  const peta: [string, string][] = [
    ["sepuluh", "10"],
    ["sembilan", "9"],
    ["delapan", "8"],
    ["tujuh", "7"],
    ["enam", "6"],
    ["lima", "5"],
    ["empat", "4"],
    ["tiga", "3"],
    ["dua", "2"],
    ["satu", "1"],
    ["nol", "0"],
  ];
  let salin = teks.toLowerCase();
  for (const [kata, digit] of peta) salin = salin.replaceAll(kata, ` ${digit} `);
  return [...salin.matchAll(/\d+/g)].flatMap((temu) => {
    if (temu[0] === "10") return [10];
    return [...temu[0]].map((digit) => Number(digit));
  });
}

function Suara({ kode, indeks }: { kode: string; indeks: number }) {
  const soal = kartuModul(kode).kuis[indeks];
  return (
    <div className="mt-4">
      <SoalRekamSuara
        id={idKuisKartuResmi(MODUL_MTK1_BAB1.id, kode, indeks)}
        pertanyaan={soal?.pertanyaan ?? ""}
        periksa={(transkrip) => ucapanMemuatAlias(transkrip, soal?.alias ?? [])}
      />
    </div>
  );
}

function Kanvas({
  id,
  visual,
  instruksi,
  alias,
}: {
  id: string;
  visual?: ReactNode;
  instruksi: string;
  alias: string[];
}) {
  return (
    <div className="mt-4 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4">
      {visual ? <div className="text-2xl leading-relaxed">{visual}</div> : null}
      <KuisTulisKartu
        id={id}
        rapat
        hanyaKanvas
        pertanyaan={instruksi}
        alias={kumpulkanAlias(alias)}
        konteks={instruksi}
      />
    </div>
  );
}

function Pilih({
  id,
  soal,
  pilihan,
  benar,
  anak,
}: {
  id?: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="mt-4 rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3 text-2xl leading-relaxed">{anak}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => {
          const label =
            item.huruf.length === 1 && /[A-C]/.test(item.huruf)
              ? `${item.huruf}. ${item.teks}`
              : item.teks;
          return (
            <button
              key={item.huruf}
              type="button"
              onClick={() => {
                setPilih(item.huruf);
                if (id && item.huruf === benar) kuis?.tandaiBenar(id);
              }}
              className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
                pilih,
                item.huruf,
                benar,
                "bg-[#1C01A5] text-white hover:bg-[#16017a]",
              )}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba hitung lagi bendanya."
        />
      </div>
    </article>
  );
}

function Isian({
  id,
  soal,
  cocok,
  anak,
  placeholder = "__________",
}: {
  id?: string;
  soal: string;
  cocok: (teks: string) => boolean;
  anak?: ReactNode;
  placeholder?: string;
}) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const ok = cocok(isi);
    setStatus(ok ? "benar" : "salah");
    if (ok && id) kuis?.tandaiBenar(id);
  };
  return (
    <article className="mt-4 rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3 text-2xl leading-relaxed">{anak}</div> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={isi}
          onChange={(event) => setIsi(event.target.value)}
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={isi.trim() || undefined}
          pesanSalah="Coba pikirkan lagi dari petunjuknya."
        />
      </div>
    </article>
  );
}

function Balon({ nama, anak }: { nama: string; anak: string }) {
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function Papan({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <div className="mt-4 rounded-2xl border-2 border-[#1C01A5]/20 bg-[#F4F1FF] px-4 py-4">
      <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">{judul}</p>
      <div className="mt-3 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  );
}

function Poin({ anak }: { anak: string }) {
  return (
    <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold leading-relaxed text-[#1C01A5]">
      💡 {anak}
    </p>
  );
}

function Kepala({
  kartu,
  kelas,
  kelamin,
  ikon,
}: {
  kartu: KartuModulResmi;
  kelas: string;
  kelamin?: KelaminGuru;
  ikon: string;
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
        {kartu.judul}
      </h4>
      <div className="mt-4">
        <TombolVoiceMateriPai1
          kelas={kelas}
          kelamin={kelamin}
          cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
        />
      </div>
      <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
        {kartu.pengantar}
      </p>
    </>
  );
}

function LabelMini({ anak }: { anak: string }) {
  return (
    <p className="mt-5 text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{anak}</p>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK1_BAB1.id, "L", indeks);
}

function JurnalKikoZuzi() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    {
      id: "seru",
      ikon: "🥰",
      teks: "[ SERU BANGET ] - Aku sudah paham semua materi dan siap lanjut bab depan!",
    },
    {
      id: "oke",
      ikon: "😐",
      teks: "[ OKELAH ] - Aku paham, tapi mau latihan pasang angka lagi bersama ayah ibu.",
    },
    {
      id: "bingung",
      ikon: "😢",
      teks: "[ BINGUNG ] - Materi hitung mundur agak cepat, aku butuh bantuan tutor lagi.",
    },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
        Bagaimana pengalaman belajar dan bermainmu di Bab 1 ini bersama Kiko 🐒 dan Zuzi 🐰?
        Lingkari stiker wajah yang paling menggambarkan perasaanmu.
      </p>
      <div className="mt-3 grid gap-2">
        {wajah.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPilih(item.id)}
            className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold ${
              pilih === item.id
                ? "border-[#F0AB00] bg-[#1C01A5] text-white"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            <span className="mr-2 text-2xl" aria-hidden>
              {item.ikon}
            </span>
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

function SubBabA({ kelas, kelamin }: { kelas: string; kelamin?: KelaminGuru }) {
  const kartu = kartuModul("A");
  const id = MODUL_MTK1_BAB1.id;
  return (
    <>
      <KartuBingkai>
        <Kepala kartu={kartu} kelas={kelas} kelamin={kelamin} ikon="🍓🐒🐰" />
        <LabelMini anak="Kartu A · Naskah bergambar" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Kiko 🐒 dan Zuzi 🐰 berdiri di bawah pohon apel besar. Di tanah ada apel merah ranum
          yang berjatuhan.
        </p>
        <p className="mt-2 text-3xl" aria-hidden>
          🐒🐰🌳🍎🍎🍎🍎🍎
        </p>
        <div className="mt-3 space-y-2">
          <Balon
            nama="Kiko 🐒"
            anak="Zuzi! Lihat, banyak sekali apel merah segar jatuh dari pohon! Nyam!"
          />
          <Balon
            nama="Zuzi 🐰"
            anak="Wah, iya! Tapi sebelum dimakan, yuk kita hitung dulu ada berapa buah apelnya!"
          />
          <Balon nama="Kiko 🐒" anak="Satu... Dua... Tiga... Empat... Lima! Ada lima apel, Zuzi!" />
          <Balon
            nama="Zuzi 🐰"
            anak="Hebat, Kiko! Ditulis dengan angka 5 dan dibaca L-I-M-A. Yuk kita tulis angkanya di atas tanah!"
          />
        </div>
        <LabelMini anak="Kuis suara" />
        <Suara kode="A" indeks={0} />
        <Suara kode="A" indeks={1} />
        <LabelMini anak="Kuis tulisan kanvas" />
        <Kanvas
          id={idKuisTulisKartu(id, "A")}
          visual="🌻🌻🌻🌻"
          instruksi="Hitung bunganya, lalu tulis lambang angkanya di kanvas!"
          alias={["4", "empat"]}
        />
        <Kanvas
          id={`${id}-A-kanvas-2`}
          visual={<span className="font-black text-[#1C01A5]">TUJUH</span>}
          instruksi="Yuk, tulis angka tujuh di dalam kotak kanvas ya!"
          alias={["7", "tujuh"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu B · Infografis utama
        </p>
        <Papan judul="INFOGRAFIS RAHASIA ANGKA 1-10">
          <p>🍎 1 = SATU · 🍏🍏 2 = DUA · 🍎🍎🍎 3 = TIGA</p>
          <p>🍏🍏🍏🍏 4 = EMPAT · 🍎🍎🍎🍎🍎 5 = LIMA</p>
          <p>
            ⭐ Cara baku: hitung satu per satu sambil ditunjuk bendanya agar tidak ada yang
            terlewat.
          </p>
          <p>
            🚀 Trik kilat IGIL: kelompokkan per 2 benda. 🍎🍎 (dua) + 🍎🍎 (empat) + 🍎 (lima)
            lebih cepat!
          </p>
        </Papan>
        <LabelMini anak="Kuis permainan" />
        <Pilih
          soal="Tarik garis dari jumlah stroberi ke angka yang pas!"
          anak="🍓🍓🍓"
          pilihan={[
            { huruf: "2", teks: "Angka 2" },
            { huruf: "3", teks: "Angka 3" },
            { huruf: "4", teks: "Angka 4" },
          ]}
          benar="3"
        />
        <Isian
          soal="Urutkan kotak angka acak ini dari yang paling sedikit: 3, 1, 2."
          placeholder="1 2 3"
          cocok={(teks) => {
            const angka = ambilAngka(teks);
            return angka[0] === 1 && angka[1] === 2 && angka[2] === 3;
          }}
        />
        <Pilih
          soal="Temukan gambar hewan yang jumlahnya tepat 4 ekor!"
          pilihan={[
            { huruf: "A", teks: "🦁🦁🦁" },
            { huruf: "B", teks: "🦋🦋🦋🦋" },
            { huruf: "C", teks: "🐸🐸" },
          ]}
          benar="B"
        />
        <Kanvas
          id={`${id}-A-kanvas-3`}
          visual="🍬🍬🍬🍬🍬🍬"
          instruksi="Tuliskan angka lambang bilangan dari permen Sani!"
          alias={["6", "enam"]}
        />
        <Kanvas
          id={`${id}-A-kanvas-4`}
          visual="🖐️👍"
          instruksi="Hitung total jari tegak lalu tulis angkanya di kanvas!"
          alias={["6", "enam"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu C · Misi Kantong Rahasia Sani 🛍️
        </p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
          Siapkan 10 butir kelereng atau tutup botol di rumah. Tutor atau orang tua menyebutkan
          sebuah angka, dan anak memasukkan benda sebanyak itu ke dalam mangkuk sambil bernyanyi.
        </p>
        <p className="mt-3 text-sm font-bold text-[#1C01A5]">
          🛍️ Mangkuk A: masukkan 3 permen 🍬🍬🍬
        </p>
        <p className="mt-1 text-sm font-bold text-[#1C01A5]">
          🛍️ Mangkuk B: masukkan 6 permen 🍬🍬🍬🍬🍬🍬
        </p>
        <Suara kode="A" indeks={2} />
        <Suara kode="A" indeks={3} />
        <Kanvas
          id={`${id}-A-kanvas-5`}
          instruksi="Salin tulisan angka 6 sebanyak dua kali di kanvas!"
          alias={["6 6", "66", "6, 6", "enam enam"]}
        />
        <Kanvas
          id={`${id}-A-kanvas-6`}
          instruksi="Gambar 8 buah lingkaran kecil, atau tulis angka 8 di kanvasmu!"
          alias={["8", "delapan"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu D · Poin penting
        </p>
        <Poin anak="Menghitung itu seru! Selalu coret atau tandai benda yang sudah kamu hitung dengan pensilmu agar tidak dihitung dua kali!" />
      </KartuBingkai>
    </>
  );
}

function SubBabB({ kelas, kelamin }: { kelas: string; kelamin?: KelaminGuru }) {
  const kartu = kartuModul("B");
  const id = MODUL_MTK1_BAB1.id;
  return (
    <>
      <KartuBingkai>
        <Kepala kartu={kartu} kelas={kelas} kelamin={kelamin} ikon="🛍️🐒🐰" />
        <LabelMini anak="Kartu A · Naskah bergambar" />
        <p className="mt-2 text-3xl" aria-hidden>
          🐒🍌🍌🍌🍌 🐰🥕🥕
        </p>
        <div className="mt-3 space-y-2">
          <Balon nama="Kiko 🐒" anak="Zuzi, lihat! Pisangku banyak sekali, ada 4 buah!" />
          <Balon nama="Zuzi 🐰" anak="Wortelku hanya ada 2 buah, Kiko." />
          <Balon nama="Kiko 🐒" anak="Hore, pisangku lebih banyak dari wortelmu!" />
          <Balon nama="Zuzi 🐰" anak="Betul, Kiko! Berarti wortelku lebih sedikit dari pisangmu." />
        </div>
        <Suara kode="B" indeks={0} />
        <Suara kode="B" indeks={1} />
        <Kanvas
          id={idKuisTulisKartu(id, "B")}
          visual="Kotak A 🎈🎈🎈 · Kotak B 🎈🎈"
          instruksi="Tuliskan kata BANYAK di bawah kotak yang isinya lebih banyak!"
          alias={["banyak"]}
        />
        <Kanvas
          id={`${id}-B-kanvas-2`}
          visual="8 dan 5"
          instruksi="Tuliskan angka yang lebih besar di kanvas!"
          alias={["8", "delapan"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Papan judul="INFOGRAFIS MEMBANDINGKAN BENDA">
          <p>🍊🍊🍊🍊 lebih banyak daripada 🍊🍊. 4 jeruk lebih banyak dari 2 jeruk.</p>
          <p>🍦 lebih sedikit daripada 🍦🍦🍦. 1 es krim lebih sedikit dari 3 es krim.</p>
          <p>
            ⭐ Cara baku: pasangkan satu-satu benda kiri ke kanan. Benda yang punya sisa berarti
            lebih banyak.
          </p>
          <p>
            🚀 Trik kilat: ubah gambar menjadi angka. Angka yang lebih jauh saat berhitung adalah
            yang paling banyak.
          </p>
        </Papan>
        <Pilih
          soal="Tarik garis kata yang tepat: 🚗🚗🚗 ...... 🚗🚗🚗"
          pilihan={[
            { huruf: "banyak", teks: "Lebih Banyak" },
            { huruf: "sama", teks: "Sama Banyak" },
          ]}
          benar="sama"
        />
        <Pilih
          soal="Pilihlah kotak buah yang lebih sedikit dari 3 jeruk 🍊🍊🍊."
          pilihan={[
            { huruf: "A", teks: "🍎🍎🍎🍎" },
            { huruf: "B", teks: "🍏🍏" },
          ]}
          benar="B"
        />
        <Pilih
          soal="Pasangkan 2 kucing 🐱🐱 dengan makanan yang jumlahnya sama banyak."
          pilihan={[
            { huruf: "3", teks: "🐟🐟🐟" },
            { huruf: "2", teks: "🐟🐟" },
          ]}
          benar="2"
        />
        <Kanvas
          id={`${id}-B-kanvas-3`}
          instruksi="Tuliskan angka yang nilainya lebih sedikit dari 3!"
          alias={["1", "2", "satu", "dua"]}
        />
        <Kanvas
          id={`${id}-B-kanvas-4`}
          visual="🍬🍬 vs 🍬🍬🍬🍬"
          instruksi="Tulis lambang angka dari kelompok permen yang paling banyak."
          alias={["4", "empat"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu C · Detektif Tangan Timbangan ⚖️
        </p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
          Ambil mainan di tangan kanan sebanyak 5 buah, dan tangan kiri sebanyak 2 buah. Rasakan
          tangan yang memegang benda lebih banyak.
        </p>
        <Suara kode="B" indeks={2} />
        <Suara kode="B" indeks={3} />
        <Kanvas
          id={`${id}-B-kanvas-5`}
          instruksi="Tulis angka jumlah mainan di tangan kananmu (5) di kanvas!"
          alias={["5", "lima"]}
        />
        <Kanvas
          id={`${id}-B-kanvas-6`}
          instruksi="Tulis kata SAMA jika 4 permen dibandingkan dengan 4 permen!"
          alias={["sama", "sama banyak"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Poin anak="Ingat! Kata sama banyak hanya dipakai jika angka jumlah kedua benda kembar atau persis sama!" />
      </KartuBingkai>
    </>
  );
}

function SubBabC({ kelas, kelamin }: { kelas: string; kelamin?: KelaminGuru }) {
  const kartu = kartuModul("C");
  const id = MODUL_MTK1_BAB1.id;
  return (
    <>
      <KartuBingkai>
        <Kepala kartu={kartu} kelas={kelas} kelamin={kelamin} ikon="🏃🐒" />
        <LabelMini anak="Kartu A · Naskah bergambar" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Kiko berdiri di anak tangga paling bawah (angka 1), bersiap melompat naik ke atas pohon.
        </p>
        <p className="mt-2 text-2xl font-black tracking-widest text-[#1C01A5]" aria-hidden>
          1 → 2 → 3 → 4 → 5
        </p>
        <div className="mt-3 space-y-2">
          <Balon nama="Kiko 🐒" anak="Satu, dua, tiga, empat, lima! Hore, aku memanjat naik tangga pohon!" />
          <Balon
            nama="Zuzi 🐰"
            anak="Hebat Kiko! Itu namanya menghitung maju, angkanya makin lama makin besar!"
          />
          <Balon nama="Kiko 🐒" anak="Sekarang aku mau turun, Zuzi. Lima, empat, tiga, dua, satu!" />
          <Balon
            nama="Zuzi 🐰"
            anak="Kalau turun tangga, itu namanya menghitung mundur, angkanya melompat makin kecil!"
          />
        </div>
        <Suara kode="C" indeks={0} />
        <Suara kode="C" indeks={1} />
        <Kanvas
          id={idKuisTulisKartu(id, "C")}
          visual="1, 2, 3, ?, 5"
          instruksi="Tuliskan angka misteri yang hilang pada hitung maju di atas!"
          alias={["4", "empat"]}
        />
        <Kanvas
          id={`${id}-C-kanvas-2`}
          visual="5, 4, 3, ?, 1"
          instruksi="Tuliskan angka misteri yang hilang pada hitung mundur di atas!"
          alias={["2", "dua"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Papan judul="INFOGRAFIS LOMPATAN ANGKA MAJU DAN MUNDUR">
          <p>🏃 Hitung maju (makin besar): 1 → 2 → 3 → 4 → 5 → 6 → 7</p>
          <p>🦘 Hitung mundur (makin kecil): 7 → 6 → 5 → 4 → 3 → 2 → 1</p>
          <p>⭐ Cara baku: melompat satu-satu ke kanan untuk maju, ke kiri untuk mundur.</p>
          <p>🚀 Trik kilat: bayangkan roket mau meluncur. 5, 4, 3, 2, 1, dorr!</p>
        </Papan>
        <Pilih
          soal="Lanjutkan kereta hitung maju: 5 → 6 → 7 → ?"
          pilihan={[
            { huruf: "4", teks: "4" },
            { huruf: "8", teks: "8" },
            { huruf: "9", teks: "9" },
          ]}
          benar="8"
        />
        <Pilih
          soal="Manakah deretan yang merupakan hitung mundur yang benar?"
          pilihan={[
            { huruf: "A", teks: "1, 2, 3, 4" },
            { huruf: "B", teks: "6, 5, 4, 3" },
            { huruf: "C", teks: "2, 4, 6" },
          ]}
          benar="B"
        />
        <Pilih
          soal="Katak melompat mundur dari angka 8. Kotak mana setelah angka 8 menuju 6?"
          anak="8 → ? → 6"
          pilihan={[
            { huruf: "7", teks: "7" },
            { huruf: "9", teks: "9" },
          ]}
          benar="7"
        />
        <Kanvas
          id={`${id}-C-kanvas-3`}
          visual="3, 2, ..."
          instruksi="Lanjutkan hitung mundur ini di kanvasmu: 3, 2, ..."
          alias={["1", "satu"]}
        />
        <Kanvas
          id={`${id}-C-kanvas-4`}
          visual="7, 8, 9, ..."
          instruksi="Tulis angka berikutnya dari hitung maju berikut: 7, 8, 9, ..."
          alias={["10", "sepuluh"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu C · Kangaroo Melompat Tangga 🦘
        </p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
          Berdiri di lantai rumah. Lompat ke depan 3 kali sambil berhitung maju (1, 2, 3). Lalu
          melompat mundur ke belakang 3 kali sambil berhitung mundur (3, 2, 1).
        </p>
        <Suara kode="C" indeks={2} />
        <Suara kode="C" indeks={3} />
        <Kanvas
          id={`${id}-C-kanvas-5`}
          instruksi="Tuliskan angka paling besar dari lompatan majumu tadi (angka 3)!"
          alias={["3", "tiga"]}
        />
        <Kanvas
          id={`${id}-C-kanvas-6`}
          instruksi="Tulis lambang angka nol (0) jika roket sudah meluncur habis!"
          alias={["0", "nol"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Poin anak="Hitung maju itu seperti menambah mainan. Hitung mundur itu seperti mainanmu berkurang. Trik ini akan membantumu belajar penjumlahan nanti!" />
      </KartuBingkai>
    </>
  );
}

function SubBabD({ kelas, kelamin }: { kelas: string; kelamin?: KelaminGuru }) {
  const kartu = kartuModul("D");
  const id = MODUL_MTK1_BAB1.id;
  return (
    <>
      <KartuBingkai>
        <Kepala kartu={kartu} kelas={kelas} kelamin={kelamin} ikon="🧩🐰" />
        <LabelMini anak="Kartu A · Naskah bergambar" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Zuzi memegang 5 butir permen di mangkuk besar, lalu membaginya ke dua kantong kecil.
        </p>
        <p className="mt-2 text-2xl" aria-hidden>
          🍬🍬🍬 | 🍬🍬
        </p>
        <div className="mt-3 space-y-2">
          <Balon
            nama="Zuzi 🐰"
            anak="Kiko, aku punya 5 permen nih. Mau aku bagi ke kantong merah dan kantong biru."
          />
          <Balon nama="Kiko 🐒" anak="Bagaimana caranya, Zuzi?" />
          <Balon
            nama="Zuzi 🐰"
            anak="Aku masukkan 3 permen ke kantong merah, dan sisanya 2 permen ke kantong biru. 3 dan 2 jika digabung tetap jadi 5!"
          />
          <Balon nama="Kiko 🐒" anak="Wah ajaib! Berarti 5 itu pasangannya bisa 3 dan 2 ya!" />
        </div>
        <Suara kode="D" indeks={0} />
        <Suara kode="D" indeks={1} />
        <Kanvas
          id={idKuisTulisKartu(id, "D")}
          visual="3 bercabang menjadi 1 dan ?"
          instruksi="Tuliskan angka pasangan yang hilang untuk melengkapi angka 3!"
          alias={["2", "dua"]}
        />
        <Kanvas
          id={`${id}-D-kanvas-2`}
          visual="2 dan 2 bergabung menjadi ?"
          instruksi="Tuliskan hasil gabungan kedua angka tersebut di kanvas!"
          alias={["4", "empat"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Papan judul="INFOGRAFIS PASANGAN BILANGAN">
          <p>Angka utama 5 bercabang menjadi pasangan 3 dan 2.</p>
          <p>
            ⭐ Cara baku: pisahkan 5 benda menjadi dua kelompok, tangan kiri dan tangan kanan.
          </p>
          <p>
            🚀 Trik kilat: buka 5 jarimu. Tekuk 3 jari. Jari yang masih berdiri ada 2. Itulah
            pasangannya!
          </p>
        </Papan>
        <Pilih
          soal="Tarik garis pasangan angka yang jika digabungkan jumlahnya menjadi 4."
          pilihan={[
            { huruf: "1-3", teks: "1 dan 3" },
            { huruf: "2-1", teks: "2 dan 1" },
            { huruf: "3-3", teks: "3 dan 3" },
          ]}
          benar="1-3"
        />
        <Pilih
          soal="Angka 6 diurai menjadi angka 5 dan kotak kosong. Isi kotak itu adalah..."
          pilihan={[
            { huruf: "A", teks: "Angka 2" },
            { huruf: "B", teks: "Angka 1" },
            { huruf: "C", teks: "Angka 3" },
          ]}
          benar="B"
        />
        <Pilih
          soal="Manakah yang bukan pasangan pembentuk angka 5?"
          pilihan={[
            { huruf: "A", teks: "4 dan 1" },
            { huruf: "B", teks: "2 dan 3" },
            { huruf: "C", teks: "4 dan 2" },
          ]}
          benar="C"
        />
        <Kanvas
          id={`${id}-D-kanvas-3`}
          instruksi="Angka 7 adalah gabungan dari 4 dan ... Tulis angkanya di kanvas!"
          alias={["3", "tiga"]}
        />
        <Kanvas
          id={`${id}-D-kanvas-4`}
          instruksi="Tuliskan angka utama jika pasangannya adalah 3 dan 3!"
          alias={["6", "enam"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-sm font-black tracking-wide text-[#1C01A5]">
          Kartu C · Misi Pecah Pasukan Kelereng 🔮
        </p>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
          Ambil 6 butir kelereng atau batu kecil. Pecah menjadi dua kelompok, misalnya kiri 4 dan
          kanan 2.
        </p>
        <Suara kode="D" indeks={2} />
        <Suara kode="D" indeks={3} />
        <Kanvas
          id={`${id}-D-kanvas-5`}
          instruksi="Tulis angka hasil pemecahan sama ratamu tadi (angka 3) di kanvas!"
          alias={["3", "tiga"]}
        />
        <Kanvas
          id={`${id}-D-kanvas-6`}
          instruksi="Tulis angka 0 jika sebuah angka diurai menjadi 5 dan ... agar tetap bernilai 5!"
          alias={["0", "nol"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <Poin anak="Setiap angka punya banyak pasangan rahasia! Berlatihlah menekuk jari tangan untuk menemukan semua pasangan angka sampai 10 dengan cepat!" />
      </KartuBingkai>
    </>
  );
}

function kotakPalingSedikit(teks: string): boolean {
  const rapat = teks.toLowerCase().replace(/\s+/g, " ").trim();
  if (/kotak a|\ba\b/.test(rapat)) return false;
  if (/kotak c|\bc\b/.test(rapat)) return false;
  return /kotak b|\bb\b/.test(rapat);
}

function lanjutMundur(teks: string): boolean {
  const angka = ambilAngka(teks);
  const indeks = angka.indexOf(5);
  return indeks >= 0 && angka[indeks + 1] === 4;
}

function hanyaAngka(teks: string, target: number): boolean {
  const angka = ambilAngka(teks);
  return angka.length > 0 && angka.every((nilai) => nilai === target);
}

function pasanganTujuh(teks: string): boolean {
  const unik = [...new Set(ambilAngka(teks))];
  return unik.length === 2 && unik.includes(3) && unik.includes(4);
}

function Evaluasi({ kelas, kelamin }: { kelas: string; kelamin?: KelaminGuru }) {
  const kartu = kartuModul("L");
  return (
    <KartuBingkai>
      <Kepala kartu={kartu} kelas={kelas} kelamin={kelamin} ikon="📝🍓" />
      <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
        Tantangan Juara HOTS · Ayo Membilang sampai dengan 10
      </p>
      <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
        Hitung dengan teliti menggunakan gambar dan logikamu. Tuliskan jawaban akhirmu di kanvas
        atau kotak jawaban.
      </p>
      <LabelMini anak="Bagian A · Pilihan ganda" />
      <Pilih
        id={idEvaluasi(0)}
        soal="Kiko menghitung 6 apel: satu, dua, tiga, lima, enam. Zuzi berkata ia salah melompat. Angka berapa yang lupa diucapkan Kiko?"
        anak="🍎🍎🍎🍎🍎🍎"
        pilihan={[
          { huruf: "A", teks: "Angka 2" },
          { huruf: "B", teks: "Angka 4" },
          { huruf: "C", teks: "Angka 7" },
        ]}
        benar="B"
      />
      <Pilih
        id={idEvaluasi(1)}
        soal="Siti punya 6 permen dan ingin membaginya sama banyak kepada Kiko dan Zuzi sampai mangkuknya kosong. Pembagian yang paling adil adalah..."
        pilihan={[
          { huruf: "A", teks: "Kiko 4 permen, Zuzi 2 permen." },
          { huruf: "B", teks: "Kiko 3 permen, Zuzi 3 permen." },
          { huruf: "C", teks: "Kiko 5 permen, Zuzi 1 permen." },
        ]}
        benar="B"
      />
      <Pilih
        id={idEvaluasi(2)}
        soal="Saku Beni ada 5 permen. Saku Dodi ada 3 permen. Beni ingin jumlahnya sama dengan Dodi. Apa yang harus Beni lakukan?"
        anak="Beni 🍬🍬🍬🍬🍬 · Dodi 🍬🍬🍬"
        pilihan={[
          { huruf: "A", teks: "Beni meminta 2 permen lagi." },
          { huruf: "B", teks: "Beni memberikan 2 permen miliknya." },
          { huruf: "C", teks: "Beni tidak perlu melakukan apa-apa." },
        ]}
        benar="B"
      />
      <Pilih
        id={idEvaluasi(3)}
        soal="Berapa lambang angka dan nama bilangan untuk menara donat ini?"
        anak="🍩🍩🍩🍩🍩🍩🍩"
        pilihan={[
          { huruf: "A", teks: "Angka 6 dibaca enam" },
          { huruf: "B", teks: "Angka 7 dibaca tujuh" },
          { huruf: "C", teks: "Angka 8 dibaca delapan" },
        ]}
        benar="B"
      />
      <Pilih
        id={idEvaluasi(4)}
        soal="Katak melompat mundur: 7 → 6 → 5 → bintang → 3. Angka apa yang menggantikan bintang?"
        pilihan={[
          { huruf: "A", teks: "Angka 4" },
          { huruf: "B", teks: "Angka 2" },
          { huruf: "C", teks: "Angka 8" },
        ]}
        benar="A"
      />
      <LabelMini anak="Bagian B · Isian kanvas" />
      <Isian
        id={idEvaluasi(5)}
        soal="Kotak A ada 5 lemon, kotak B ada 2 lemon, kotak C ada 4 lemon. Tuliskan kotak yang isinya paling sedikit."
        anak="A 🍋🍋🍋🍋🍋 · B 🍋🍋 · C 🍋🍋🍋🍋"
        placeholder="Kotak ____"
        cocok={kotakPalingSedikit}
      />
      <Isian
        id={idEvaluasi(6)}
        soal="Beni menghitung mundur dari 9: 9, 8, 7, 6. Tuliskan dua angka berikutnya."
        placeholder="____ dan ____"
        cocok={lanjutMundur}
      />
      <Isian
        id={idEvaluasi(7)}
        soal="Angka utama 8. Satu pasangannya 5. Berapa angka pasangan yang hilang?"
        anak="8 = 5 + ?"
        placeholder="?"
        cocok={(teks) => hanyaAngka(teks, 3)}
      />
      <Isian
        id={idEvaluasi(8)}
        soal="Riko punya 4 roda. Satu mobil-mobilan butuh 4 roda. Berapa mobil yang bisa dibuat sampai roda habis?"
        placeholder="____ buah"
        cocok={(teks) => hanyaAngka(teks, 1)}
      />
      <Isian
        id={idEvaluasi(9)}
        soal="Temukan dua angka pembentuk angka 7 yang selisihnya hanya satu, seperti angka berurutan."
        placeholder="____ dan ____"
        cocok={pasanganTujuh}
      />
      <Kanvas
        id={idKuisTulisKartu(MODUL_MTK1_BAB1.id, "L")}
        instruksi="Salin satu jawaban benar dari lembar ini, misalnya angka 4 atau Kotak B."
        alias={["4", "empat", "kotak b"]}
      />
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-sm font-black uppercase tracking-[0.16em] text-[#F0AB00]">
          Modul interaktif IGIL
        </p>
        <div className="mt-4">
          <GambarDoodle
            src="/doodle-mtk/mtk-1-bab1-pembuka.jpg"
            alt="Petualangan Kiko si monyet cerdik dan Zuzi si kelinci ceria di bawah pohon apel"
            ukuran="lebar"
          />
        </div>
        <h3 className="mt-4 text-center text-2xl font-black text-[#1C01A5]">
          Matematika Kelas 1 SD
        </h3>
        <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">
          Bab 1: Ayo Membilang sampai dengan 10
        </p>
        <p className="mt-3 text-center text-sm font-semibold text-slate-700">
          Petualangan Kiko si monyet cerdik dan Zuzi si kelinci ceria.
        </p>
      </KartuBingkai>

      <p className="px-1 text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Sub-bab A · Menghitung, membaca, dan menulis bilangan
      </p>
      <SubBabA kelas={kelas} kelamin={kelamin} />

      <p className="px-1 text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Sub-bab B · Membandingkan banyak benda
      </p>
      <SubBabB kelas={kelas} kelamin={kelamin} />

      <p className="px-1 text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Sub-bab C · Menghitung maju dan mundur
      </p>
      <SubBabC kelas={kelas} kelamin={kelamin} />

      <p className="px-1 text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Sub-bab D · Pasangan bilangan
      </p>
      <SubBabD kelas={kelas} kelamin={kelamin} />

      <p className="px-1 text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Lembar evaluasi siswa
      </p>
      <Evaluasi kelas={kelas} kelamin={kelamin} />

      <KartuBingkai>
        <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-6 text-center">
          <p className="text-2xl font-black text-[#1C01A5]">🎉 Hore! Selamat adik juara! 🎉</p>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
            Kamu telah berhasil menyelesaikan petualangan seru membilang angka 1 sampai 10 di
            platform IGIL! Kamu adalah anak yang cerdas, hebat, dan pantang menyerah!
          </p>
        </div>
        <JurnalKikoZuzi />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
    </div>
  );
}
