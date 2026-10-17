"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB2 } from "@/lib/modul-resmi-mtk-6-bab2";
import { useState } from "react";

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK6_BAB2.id, kode, indeks);
}

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".");
}

function tanpaRibuan(teks: string): string {
  return rapat(teks).replace(/rp/g, "").replace(/\.(?=\d{3}(?!\d))/g, "");
}

function bulat(teks: string, angka: string): boolean {
  return new RegExp(`(?<!\\d)${angka}(?![\\d.])`).test(tanpaRibuan(teks));
}

function desimal(teks: string, angka: string): boolean {
  const aman = angka.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(tanpaRibuan(teks));
}

function rasio(teks: string, kiri: string, kanan: string): boolean {
  const s = tanpaRibuan(teks).replace(/\//g, ":");
  return new RegExp(`(?<!\\d)${kiri}:${kanan}(?!\\d)`).test(s);
}

function Pecahan({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <span className="mx-[0.15em] inline-flex translate-y-px flex-col items-center align-middle text-[0.82em] leading-none" aria-label={`${atas} per ${bawah}`}>
      <span className="border-b border-current px-[0.2em] pb-px">{atas}</span>
      <span className="px-[0.2em] pt-px">{bawah}</span>
    </span>
  );
}

function Teks({ anak }: { anak: string }) {
  const potongan = anak.split(/(\([^)]+\)\/\([^)]+\)|\([^)]+\)\/[A-Za-z0-9]+|[A-Za-z0-9]+\/[A-Za-z0-9]+)/g);
  return potongan.map((bagian, indeks) => {
    const duaKurung = bagian.match(/^\(([^)]+)\)\/\(([^)]+)\)$/);
    if (duaKurung) return <Pecahan key={indeks} atas={duaKurung[1]} bawah={duaKurung[2]} />;
    const kurung = bagian.match(/^\(([^)]+)\)\/([A-Za-z0-9]+)$/);
    if (kurung) return <Pecahan key={indeks} atas={kurung[1]} bawah={kurung[2]} />;
    const biasa = bagian.match(/^([A-Za-z0-9]+)\/([A-Za-z0-9]+)$/);
    if (biasa) return <Pecahan key={indeks} atas={biasa[1]} bawah={biasa[2]} />;
    return <span key={indeks}>{bagian}</span>;
  });
}

function JudulBagian({ anak }: { anak: string }) {
  return <h2 className="text-2xl font-black text-[#1C01A5]">{anak}</h2>;
}

function Subjudul({ anak }: { anak: string }) {
  return <h3 className="text-lg font-black text-[#1C01A5]">{anak}</h3>;
}

function P({ anak }: { anak: string }) {
  return <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>;
}

function Gambar({ src, alt, keterangan }: { src: string; alt: string; keterangan: string }) {
  return (
    <figure className="space-y-1">
      <img src={src} alt={alt} className="w-full rounded-xl border border-slate-200 bg-white object-cover" />
      <figcaption className="text-xs font-semibold leading-6 text-slate-600"><Teks anak={keterangan} /></figcaption>
    </figure>
  );
}

function Tabel({ kolom, baris }: { kolom: string[]; baris: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {kolom.map((nama) => (
              <th key={nama} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black leading-8 text-[#1C01A5]"><Teks anak={nama} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((barisItem) => (
            <tr key={barisItem.join("|")}>
              {barisItem.map((sel, indeks) => (
                <td key={`${indeks}-${sel}`} className="border border-slate-200 px-3 py-2 font-semibold leading-8 text-slate-800"><Teks anak={sel} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SoalLatihan({ anak, id, periksa, jawaban }: { anak: string; id: string; periksa: (teks: string) => boolean; jawaban: string }) {
  return (
    <div className="space-y-2">
      <P anak={anak} />
      <KotakJawaban id={id} periksa={periksa} jawaban={jawaban} />
    </div>
  );
}

function KotakJawaban({ id, soal = "", periksa, jawaban }: { id: string; soal?: string; periksa: (teks: string) => boolean; jawaban: string }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const [bukaJawaban, setBukaJawaban] = useState(false);
  const kirim = () => {
    const tepat = periksa(isi);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white px-3 py-3">
      {soal ? <P anak={soal} /> : null}
      <label className="block text-sm font-bold leading-8 text-slate-800">
        <input aria-label={soal || "Jawaban"} value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900" />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
        <button type="button" onClick={() => setBukaJawaban((terbuka) => !terbuka)} className="rounded-full border border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5]" aria-expanded={bukaJawaban}>Jawaban</button>
      </div>
      {bukaJawaban ? (
        <div className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-sm font-semibold leading-8 text-slate-800">
          <p className="font-black text-[#1C01A5]">Langkah penyelesaian</p>
          <P anak={jawaban} />
        </div>
      ) : null}
      {status === "benar" ? <p className="text-sm font-bold leading-8 text-emerald-800">Benar.</p> : null}
      {status === "salah" ? <p className="text-sm font-bold text-rose-700">Belum tepat. Hitung lagi dari angka pada soal.</p> : null}
    </div>
  );
}

function Daftar({ anak }: { anak: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm font-semibold leading-8 text-slate-800">
      {anak.map((baris) => <li key={baris}><Teks anak={baris} /></li>)}
    </ul>
  );
}

export default function NaskahMtk6Bab2(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 2</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">Rasio</h1>
        <P anak="Sekolah ikut Hari Satu Juta Pohon. Besok siswa menanam bibit bersama. Jarak tanam memberi ruang tumbuh. Susunan menurut jenis pohon memakai rasio." />
      </header>

      <section className="space-y-2">
        <JudulBagian anak="Tujuan Pembelajaran" />
        <Daftar anak={[
          "Memahami rasio dan memakai bahasa rasio untuk dua besaran.",
          "Menentukan kesamaan rasio dengan tabel rasio.",
          "Menentukan rasio satuan.",
          "Menentukan rasio bagian terhadap bagian dan terhadap keseluruhan, termasuk pada durasi waktu.",
        ]} />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pertanyaan Pemantik" />
        <Daftar anak={[
          "Bagaimana rasio dua besaran ditulis?",
          "Bagaimana perkalian dan pembagian menyelesaikan soal rasio?",
          "Bagaimana soal dipindah ke tabel rasio?",
          "Bagaimana faktor bilangan menyederhanakan rasio?",
          "Bagaimana rasio satuan ditentukan?",
        ]} />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Kata Kunci" />
        <P anak="Rasio, kesamaan rasio, rasio satuan, rasio bagian, kotak rasio, tabel rasio, rasio pada durasi waktu." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Peta Konsep" />
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mx-auto w-fit rounded-full bg-[#1C01A5] px-4 py-1 text-sm font-black text-white">Rasio</p>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2 rounded-xl bg-[#EEF2FF] p-3">
              <p className="text-sm font-black text-[#1C01A5]">Konsep Rasio</p>
              <p className="text-sm font-semibold text-slate-800">Membandingkan benda</p>
              <p className="text-sm font-semibold text-slate-800">Pengertian rasio</p>
            </div>
            <div className="space-y-2 rounded-xl bg-[#EEF2FF] p-3">
              <p className="text-sm font-black text-[#1C01A5]">Kesamaan Rasio</p>
              <p className="text-sm font-semibold text-slate-800">Konsep kesamaan rasio</p>
              <p className="text-sm font-semibold text-slate-800">Rasio satuan</p>
            </div>
            <div className="space-y-2 rounded-xl bg-[#EEF2FF] p-3">
              <p className="text-sm font-black text-[#1C01A5]">Penerapan Rasio</p>
              <p className="text-sm font-semibold text-slate-800">Bagian terhadap bagian dan terhadap keseluruhan</p>
              <p className="text-sm font-semibold text-slate-800">Rasio pada durasi waktu</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Ayo Mengingat Kembali" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-catatan.jpg" alt="Catatan faktor dan kelipatan" keterangan="Faktor dan kelipatan dipakai untuk memperkecil atau memperbesar rasio." />
        <Daftar anak={[
          "a. Apa beda faktor dan kelipatan suatu bilangan?",
          "b. Apakah 2 merupakan faktor atau kelipatan dari 10?",
          "c. Sebutkan tiga bilangan yang merupakan kelipatan dari 6.",
        ]} />
        <P anak="Faktor membagi habis suatu bilangan. Kelipatan didapat dengan mengalikan. Faktor memperkecil rasio. Kelipatan memperbesar rasio. 2 adalah faktor dari 10 karena 10 : 2 = 5. Tiga kelipatan 6 adalah 6, 12, dan 18." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-pecahan.jpg" alt="Roti, semangka, dan cokelat dengan satu bagian yang hilang" keterangan="Gambar A, B, dan C. Tuliskan pecahan untuk bagian yang hilang." />
        <SoalLatihan anak="A. Pecahan bagian yang hilang pada roti." id={idKuis("E", 8)} periksa={(teks) => rasio(teks, "1", "4")} jawaban="Ada 4 tempat dan 1 kosong. Jawabannya 1/4." />
        <SoalLatihan anak="B. Pecahan bagian yang hilang pada semangka." id={idKuis("E", 9)} periksa={(teks) => rasio(teks, "1", "6")} jawaban="Semangka terbagi 6 dan 1 juring hilang. Jawabannya 1/6." />
        <SoalLatihan anak="C. Pecahan bagian yang hilang pada cokelat." id={idKuis("E", 10)} periksa={(teks) => rasio(teks, "1", "8")} jawaban="Cokelat tersusun 8 kotak dan 1 kotak hilang. Jawabannya 1/8." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Konsep Rasio" />
        <Subjudul anak="Permasalahan" />
        <P anak="Siswa SD Mentari menanam bibit di kebun belakang sekolah. Ada dua paket bibit dengan harga berbeda. Membandingkan hanya banyak bibit, atau hanya harga paket, belum menunjukkan paket yang lebih murah untuk setiap bibit." />

        <Subjudul anak="1. Membandingkan Benda" />
        <P anak="Eksplorasi 2.1. Artus membeli bibit di toko. Ada dua paket pada gambar." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-paket.jpg" alt="Paket A berisi lima bibit dan paket B berisi tiga bibit" keterangan="Paket A berharga Rp50.000. Paket B berharga Rp40.000." />
        <Daftar anak={[
          "a. Paket mana yang jumlah bibitnya lebih banyak?",
          "b. Paket mana yang harganya lebih murah?",
          "c. Paket mana yang sebaiknya dibeli Artus?",
        ]} />
        <Subjudul anak="Ayo Mencoba" />
        <P anak="Hitung harga satu bibit pada kedua paket." />
        <Tabel kolom={["Paket", "Banyak bibit", "Harga paket", "Harga satu bibit"]} baris={[
          ["A", "5", "Rp50.000", "Rp10.000"],
          ["B", "3", "Rp40.000", "Rp13.333 sisa Rp1"],
        ]} />
        <P anak="Paket A lebih banyak karena 5 lebih besar dari 3. Paket B lebih murah untuk satu paket karena Rp40.000 lebih kecil dari Rp50.000. Harga satu bibit paket A adalah 50.000 : 5 = 10.000. Harga satu bibit paket B adalah 40.000 : 3 = 13.333 sisa 1. Perbandingan silang: 50.000 × 3 = 150.000 dan 40.000 × 5 = 200.000. Karena 150.000 lebih kecil, satu bibit paket A lebih murah. Artus sebaiknya membeli paket A." />

        <Subjudul anak="2. Pengertian Rasio" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-pohon.jpg" alt="Agam berdiri di antara pohon pucuk merah dan pohon cemara" keterangan="Pucuk merah di satu sisi, cemara di sisi yang lain." />
        <P anak="Eksplorasi 2.2. Cemara ditanam di sisi kanan. Pucuk merah ditanam di sisi kiri. Setiap 2 pucuk merah berpasangan dengan 3 cemara. Pada gambar ada 4 pucuk merah dan 6 cemara." />
        <P anak="Cemara lebih banyak. Rasio adalah perbandingan dua besaran. Besaran itu boleh ukuran atau jumlah benda. Rasio a terhadap b ditulis a : b atau a/b. Untuk besaran yang sama, satuan tidak ditulis." />
        <P anak="Rasio pucuk merah terhadap cemara adalah 4 : 6. Artinya setiap 4 pucuk merah terdapat 6 cemara. Bentuk paling sederhana membagi kedua angka dengan faktor yang sama. 4 : 6 = 2 : 3." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-urutan.jpg" alt="Agam menunjuk pohon cemara lebih dahulu" keterangan="Urutan rasio mengikuti urutan yang disebut." />
        <P anak="a : b tidak sama artinya dengan b : a. Pucuk merah terhadap cemara 2 : 3 berarti setiap 2 pucuk merah ada 3 cemara. Cemara terhadap pucuk merah adalah 6 : 4 = 3 : 2." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-tambah.jpg" alt="Agam menambah pohon di kebun" keterangan="Pucuk merah ditambah menjadi 14 pohon." />
        <Subjudul anak="Ayo Bekerja Sama" />
        <P anak="Jika lahan diperluas dan pucuk merah yang ditanam 14 pohon, berapa cemara yang ditanam agar rasio tetap 2 : 3?" />
        <P anak="14 : 2 = 7 dan 3 × 7 = 21. Cemara yang ditanam 21 pohon." />
        <Subjudul anak="Ayo Berpikir Kritis" />
        <P anak="Jika pucuk merah diketahui, cemara = pucuk merah × 3 : 2. Jika cemara diketahui, pucuk merah = cemara × 2 : 3." />

        <Subjudul anak="Latihan 2.1" />
        <P anak="1. Hitung dari teman sekelasmu, lalu tulis rasionya." />
        <Daftar anak={[
          "a. Berapa siswa yang lahir di bulan yang sama dengan bulan kelahiranmu?",
          "b. Berapa siswa yang lahir dua bulan sesudah bulan kelahiranmu?",
          "c. Tuliskan rasio kelompok a terhadap kelompok b dalam bentuk paling sederhana.",
          "d. Tuliskan rasio kelompok b terhadap kelompok a dalam bentuk paling sederhana.",
        ]} />
        <P anak="Kunci soal 1 mengikuti jumlah di kelasmu. Bagi kedua angka dengan faktor persekutuan terbesar. Soal d menukar urutan soal c." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-antrean.jpg" alt="Dua antrean wahana di taman hiburan" keterangan="Roller coaster 24 orang. Komidi putar 18 orang." />
        <Tabel kolom={["Wahana", "Banyak pengunjung"]} baris={[["Roller coaster", "24"], ["Komidi putar", "18"], ["Bianglala", "dicari"], ["Rumah hantu", "dicari"]]} />
        <SoalLatihan anak="2a. Tuliskan rasio pengunjung roller coaster terhadap komidi putar dalam bentuk paling sederhana." id={idKuis("A", 0)} periksa={(teks) => rasio(teks, "4", "3")} jawaban="24 : 18 dibagi 6. Jawabannya 4 : 3." />
        <SoalLatihan anak="2b. Rasio bianglala terhadap roller coaster adalah 4 : 3. Roller coaster ada 24 orang. Berapa pengunjung bianglala?" id={idKuis("A", 1)} periksa={(teks) => bulat(teks, "32")} jawaban="3 bagian sama dengan 24, jadi 1 bagian 8. Bianglala 4 × 8 = 32 orang." />
        <SoalLatihan anak="2c. Rasio rumah hantu terhadap komidi putar adalah 2 : 6. Komidi putar ada 18 orang. Berapa pengunjung rumah hantu?" id={idKuis("A", 2)} periksa={(teks) => bulat(teks, "6")} jawaban="6 bagian sama dengan 18, jadi 1 bagian 3. Rumah hantu 2 × 3 = 6 orang." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-minuman.jpg" alt="Minuman dituang untuk teman undangan" keterangan="6 liter disiapkan untuk 15 teman." />
        <SoalLatihan anak="3. Banyu menyiapkan 6 liter minuman untuk 15 teman pagi hari. Siang hari tamu yang datang 10 orang. Berapa liter yang disiapkan agar jatah tiap orang tetap?" id={idKuis("E", 0)} periksa={(teks) => bulat(teks, "4")} jawaban="6 : 15 = 2 : 5. Untuk 10 orang, 2 : 5 = 4 : 10. Jawabannya 4 liter." />
        <Subjudul anak="Ayo Berefleksi" />
        <Daftar anak={[
          "a. Ada berapa cara untuk menyatakan rasio? Tuliskan cara itu.",
          "b. Tuliskan minimal dua contoh rasio dari benda di sekitarmu.",
        ]} />
        <P anak="Ada dua cara: a : b dan a/b. Keduanya dibaca a terhadap b. Contoh: 2 pensil terhadap 5 buku, dan 3 gelas terhadap 4 piring." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Konsep Kesamaan Rasio" />
        <P anak="Satu rak memuat 6 polybag. Tiga rak memuat 6 × 3 = 18 polybag. Rasio rak terhadap polybag 1 : 6 senilai dengan 3 : 18." />
        <Subjudul anak="1. Kesamaan Rasio" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-lahan.jpg" alt="Petak lahan kecil berisi bibit" keterangan="Lahan 10 m² diperkirakan memuat 12 bibit." />
        <P anak="Eksplorasi 2.3. Pak Wayan menjelaskan jarak polybag. Lahan 10 m² memuat 12 bibit. Kesamaan rasio adalah dua perbandingan atau lebih yang nilainya sama. Kedua angka boleh dikali atau dibagi dengan bilangan yang sama." />
        <Subjudul anak="Penguatan Karakter" />
        <P anak="Menjaga rasio yang sama berarti menjaga mutu. Jika rasio berubah, mutu ikut berubah. Campuran semen dan pasir, misalnya, harus pada perbandingan tertentu supaya bangunan tetap kokoh." />
        <P anak="FPB 10 dan 12 adalah 2. Bentuk paling sederhana 10 : 12 = 5 : 6." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-lahan-luas.jpg" alt="Petak lahan yang lebih luas" keterangan="Lahan 25 m² memakai kerapatan yang sama." />
        <Tabel kolom={["", "Luas lahan (m²)", "Banyak bibit"]} baris={[
          ["Data", "10", "12"],
          ["Bagi 2", "5", "6"],
          ["Kali 5", "25", "30"],
          ["Kali 4 dari bentuk sederhana", "20", "24"],
        ]} />
        <P anak="Lahan 25 m² memuat 30 bibit, karena 5 : 6 = 25 : 30. Untuk 24 bibit, luas yang diperlukan 20 m², karena 5 : 6 = 20 : 24. Untuk 30 bibit, luasnya 25 m²." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-senilai.jpg" alt="Dua petak bibit yang senilai" keterangan="Beberapa pasangan rasio punya nilai yang sama." />
        <P anak="Tiga rasio pada tabel sama: 5 : 6 = 10 : 12 = 25 : 30. Cara lain dari pecahan senilai: 10 : 12 dikali 3 menjadi 30 : 36, dan dibagi 2 menjadi 5 : 6. Jadi 30 : 36 dan 5 : 6 senilai dengan 10 : 12." />
        <Subjudul anak="Ayo Berpikir Kritis" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-pupuk.jpg" alt="Pupuk ditakar untuk bibit" keterangan="2 bibit memerlukan 5 gram pupuk." />
        <P anak="Untuk 2 bibit perlu 5 gram pupuk. Berapa gram untuk 11 bibit? 2 : 5 = 11 : 27,5. Hitung 11 × 5 : 2 = 27,5 gram." />
        <Subjudul anak="Ayo Menggunakan Teknologi" />
        <P anak="Latihan manik-manik pada GeoGebra memakai aturan yang sama. Pemain pertama membuat satu perbandingan. Pemain kedua membuat jumlah yang berbeda, tetapi rasionya tetap senilai. Tautan latihan: https://www.geogebra.org/m/esjmefvr" />

        <Subjudul anak="2. Rasio Satuan" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-jahe.jpg" alt="Dua kemasan bibit jahe merah" keterangan="Paket 3 bibit dan paket 5 bibit." />
        <P anak="Eksplorasi 2.4. Ibu dan Anike memilih bibit jahe merah. Paket 3 bibit berharga Rp37.500. Paket 5 bibit berharga Rp58.000. Rasio satuan terjadi ketika salah satu kuantitas sama dengan 1." />
        <Tabel kolom={["Paket", "Banyak bibit", "Harga", "Harga 1 bibit"]} baris={[
          ["Tiga", "3", "Rp37.500", "Rp12.500"],
          ["Lima", "5", "Rp58.000", "Rp11.600"],
        ]} />
        <P anak="37.500 : 3 = 12.500, jadi rasio 3 : 37.500 menjadi 1 : 12.500. 58.000 : 5 = 11.600, jadi rasio 5 : 58.000 menjadi 1 : 11.600. Paket 5 lebih murah untuk setiap bibit. Setelah rasio satuan diketahui, nilai lain didapat dengan mengalikan." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-kemas.jpg" alt="Bibit dikemas sebelum dikirim" keterangan="6 bibit dikemas dalam 1,5 jam." />
        <Subjudul anak="Ayo Berpikir Kritis" />
        <P anak="Jasa antar gratis jika pembelian paling sedikit 5 bibit. Mengemas 6 bibit perlu 1,5 jam." />
        <Daftar anak={[
          "a. Berapa rasio bibit yang dikemas per jam?",
          "b. Berapa bibit yang selesai dikemas dalam 4 jam?",
        ]} />
        <P anak="6 : 1,5 = 4 : 1, yaitu 4 bibit tiap jam. Dalam 4 jam selesai 4 × 4 = 16 bibit. Jika dua satuan berbeda, satuan ditulis, misalnya 4 bibit/jam." />
        <Subjudul anak="Ayo Berpikir Kreatif" />
        <P anak="50 km/jam juga rasio satuan. Artinya 50 km terhadap 1 jam, atau 50 : 1." />

        <Subjudul anak="Latihan 2.2" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-wedang.jpg" alt="Bahan wedang jahe di meja" keterangan="Resep untuk 4 liter air." />
        <P anak="Resep wedang jahe untuk 4 liter air: 12 jahe merah, 8 batang serai, 4 lemon, 20 cm kayu manis, 20 cengkeh, dan 250 gram gula aren." />
        <Tabel kolom={["Bahan", "4 liter", "8 liter"]} baris={[
          ["Jahe merah", "12", "24"],
          ["Serai", "8", "16"],
          ["Lemon", "4", "8"],
          ["Kayu manis", "20 cm", "40 cm"],
          ["Cengkeh", "20", "40"],
          ["Gula aren", "250 gram", "500 gram"],
        ]} />
        <SoalLatihan anak="1. Berapa jahe merah untuk 8 liter air?" id={idKuis("E", 1)} periksa={(teks) => bulat(teks, "24")} jawaban="8 : 4 = 2. Semua bahan dikali 2. Jahe merah 12 × 2 = 24." />
        <SoalLatihan anak="2. Serai yang ada hanya 6 batang. Berapa lemon yang dibutuhkan?" id={idKuis("E", 2)} periksa={(teks) => bulat(teks, "3")} jawaban="Serai terhadap lemon 8 : 4 = 2 : 1. Untuk 6 serai, 2 : 1 = 6 : 3. Lemon yang dibutuhkan 3." />
        <SoalLatihan anak="3. Untuk 250 ml, Ibu memakai 1 sendok kopi dan 2 sendok gula. Dona membuat 1 liter dengan 4 sendok kopi dan 10 sendok gula. Rasanya bagaimana dibanding kopi Ibu?" id={idKuis("B", 0)} periksa={(teks) => { const s = teks.toLowerCase(); return s.includes("manis") && !s.includes("tidak") && !s.includes("pahit"); }} jawaban="1 liter = 4 × 250 ml. Resep Ibu untuk 1 liter adalah 4 sendok kopi dan 8 sendok gula. Dona kopinya sama, gulanya 10. Jawabannya terlalu manis." />
        <SoalLatihan anak="4. Mutia membeli 15 pena seharga Rp36.000. Berapa harga 1 pena?" id={idKuis("B", 1)} periksa={(teks) => bulat(teks, "2400")} jawaban="36.000 : 15 = 2.400. Jawabannya Rp2.400." />
        <SoalLatihan anak="5. Berapa harga 5 pena jika 1 pena Rp2.400?" id={idKuis("B", 2)} periksa={(teks) => bulat(teks, "12000")} jawaban="5 × 2.400 = 12.000. Jawabannya Rp12.000." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-kartu.jpg" alt="Dua kelompok titik yang dibanding" keterangan="Rasio 12 : 28 masih bisa disederhanakan." />
        <Subjudul anak="Ayo Berefleksi" />
        <Daftar anak={[
          "a. Tuliskan minimal empat rasio yang senilai dengan 12 : 28.",
          "b. Jelaskan pengertian rasio satuan dengan bahasamu.",
        ]} />
        <P anak="Empat rasio yang senilai dengan 12 : 28 antara lain 6 : 14, 3 : 7, 24 : 56, dan 9 : 21. Bentuk paling sederhananya 3 : 7. Rasio satuan adalah rasio yang salah satu kuantitasnya sama dengan 1." />
        <SoalLatihan anak="6. Tuliskan bentuk paling sederhana dari 12 : 28." id={idKuis("E", 3)} periksa={(teks) => rasio(teks, "3", "7")} jawaban="FPB 12 dan 28 adalah 4. 12 : 4 = 3 dan 28 : 4 = 7. Jawabannya 3 : 7." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Penerapan Rasio" />
        <Subjudul anak="Permasalahan" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-toko.jpg" alt="Tanaman hias dan tanaman obat di toko" keterangan="Persediaan hias dibanding obat adalah 3 : 2." />
        <P anak="Toko Herbal Tani menjual bibit hias dan bibit obat. Jika persediaan hias terhadap obat adalah 3 : 2, seluruh bagian ada 3 + 2 = 5. Rasio hias terhadap keseluruhan adalah 3 : 5." />

        <Subjudul anak="1. Rasio Bagian terhadap Bagian dan terhadap Keseluruhan" />
        <P anak="Eksplorasi 2.5. Pada bulan Juni terjual 72 bibit. Rasio penjualan hias terhadap obat adalah 4 : 5. Obat lebih banyak karena 5 lebih besar dari 4." />
        <Tabel kolom={["", "Tanaman hias", "Tanaman obat", "Total"]} baris={[
          ["Rasio", "4", "5", "9"],
          ["Jumlah sebenarnya", "32", "40", "72"],
        ]} />
        <P anak="4 + 5 = 9 bagian. 72 : 9 = 8. Hias 4 × 8 = 32. Obat 5 × 8 = 40. Rasio 4 : 5 adalah rasio bagian terhadap bagian. Rasio hias terhadap seluruh tanaman 32 : 72 = 4 : 9. Rasio obat terhadap seluruh tanaman 40 : 72 = 5 : 9. Itulah rasio bagian terhadap keseluruhan." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-keseluruhan.jpg" alt="Satu kelompok dibanding seluruh tanaman" keterangan="Satu jenis dibanding seluruh penjualan." />
        <P anak="Contoh lain bagian terhadap bagian: siswa perempuan terhadap siswa laki-laki, atau gula terhadap garam. Contoh bagian terhadap keseluruhan: perempuan terhadap seluruh siswa, dan laki-laki terhadap seluruh siswa." />
        <Subjudul anak="Ayo Berpikir Kreatif" />
        <P anak="Amati kelasmu. Tuliskan satu rasio bagian terhadap bagian dan satu rasio bagian terhadap keseluruhan dari keadaan kelas itu." />

        <Subjudul anak="2. Rasio pada Durasi Waktu" />
        <Gambar src="/doodle-mtk/mtk-6-bab2-panen.jpg" alt="Beberapa tanaman obat dengan masa panen berbeda" keterangan="Enam tanaman obat punya masa panen yang berbeda." />
        <P anak="Eksplorasi 2.6. Tigor dan ayah menanam enam bibit obat. Tanaman yang panennya berdekatan dikelompokkan supaya lahan bisa ditanami lagi. Satuan waktu pada rasio harus sama lebih dulu." />
        <Tabel kolom={["Tanaman", "Masa panen"]} baris={[
          ["Kumis kucing", "12 minggu"],
          ["Lengkuas", "1,5 tahun"],
          ["Jahe merah", "3 bulan"],
          ["Kencur", "6 bulan"],
          ["Buah merah", "3 tahun"],
          ["Kemangi", "30 hari"],
        ]} />
        <Daftar anak={[
          "a. Tanaman mana yang masa panennya paling cepat, dan mana yang paling lama?",
          "b. Tuliskan rasio masa panen jahe merah terhadap lengkuas, dalam bulan.",
          "c. Tuliskan rasio masa panen kencur terhadap lengkuas, dalam tahun.",
          "d. Tuliskan rasio masa panen jahe merah terhadap kumis kucing, dalam minggu.",
          "e. Dalam satu kali masa panen buah merah, berapa kali kencur dan lengkuas dapat dipanen?",
        ]} />
        <P anak="Paling cepat adalah kemangi, 30 hari. Paling lama adalah buah merah, 3 tahun." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-lengkuas.jpg" alt="Lengkuas di samping catatan waktu" keterangan="1,5 tahun sama dengan 18 bulan." />
        <P anak="Jahe merah terhadap lengkuas, dalam bulan: 3 bulan terhadap 1,5 × 12 = 18 bulan. Rasio 3 : 18 = 1 : 6." />
        <P anak="Kencur terhadap lengkuas, dalam tahun: 6 bulan = 0,5 tahun. Rasio 0,5 : 1,5 = 1 : 3." />
        <P anak="Jahe merah terhadap kumis kucing, dalam minggu: 1 bulan = 4 minggu, jadi 3 bulan = 12 minggu. Rasio 12 : 12 = 1 : 1." />
        <P anak="Dalam satu masa panen buah merah, yaitu 3 tahun atau 36 bulan, kencur dapat dipanen 36 : 6 = 6 kali. Lengkuas dapat dipanen 36 : 18 = 2 kali." />
        <Subjudul anak="Ayo Mengingat Kembali" />
        <P anak="Dua waktu hanya boleh dibanding jika satuannya sama. Hubungan satuan waktu berikut yang dipakai di bab ini." />
        <Tabel kolom={["Satuan", "Sama dengan"]} baris={[
          ["1 menit", "60 detik"],
          ["1 jam", "60 menit"],
          ["1 hari", "24 jam"],
          ["1 minggu", "7 hari"],
          ["1 bulan", "4 minggu"],
          ["1 semester", "6 bulan"],
          ["1 tahun", "12 bulan"],
          ["1 tahun", "365 hari"],
          ["1 lustrum", "5 tahun"],
          ["1 windu", "8 tahun"],
          ["1 dasawarsa", "10 tahun"],
          ["1 abad", "100 tahun"],
        ]} />
        <Subjudul anak="Ayo Bekerja Sama" />
        <P anak="Ayah menanam bibit dalam 10 menit. Tigor perlu (2)/(3) jam." />
        <Daftar anak={[
          "a. Tuliskan rasio waktu Ayah terhadap Tigor dalam menit.",
          "b. Berapa kali lebih cepat Ayah menanam dibanding Tigor?",
        ]} />
        <P anak="(2)/(3) × 60 = 40 menit. Rasio waktunya 10 : 40 = 1 : 4. Ayah 4 kali lebih cepat karena 40 : 10 = 4." />
        <SoalLatihan anak="a. Rasio waktu Ayah terhadap Tigor." id={idKuis("E", 11)} periksa={(teks) => rasio(teks, "1", "4") || rasio(teks, "10", "40")} jawaban="40 menit dibanding 10 menit. Bentuk sederhananya 1 : 4." />
        <SoalLatihan anak="b. Berapa kali lebih cepat Ayah?" id={idKuis("E", 12)} periksa={(teks) => bulat(teks, "4")} jawaban="40 : 10 = 4. Jawabannya 4 kali." />

        <Subjudul anak="Latihan 2.3" />
        <SoalLatihan anak="1. Pengunjung pasar malam 390 orang. Setiap 9 anak-anak terdapat 4 orang dewasa. Berapa jumlah anak-anak?" id={idKuis("C", 0)} periksa={(teks) => bulat(teks, "270")} jawaban="9 + 4 = 13 bagian. 390 : 13 = 30. Anak-anak 9 × 30 = 270. Dewasa 4 × 30 = 120." />
        <Gambar src="/doodle-mtk/mtk-6-bab2-jalan.jpg" alt="Seseorang berjalan di jalan desa" keterangan="1 km ditempuh dalam 30 menit." />
        <SoalLatihan anak="2. Banyu menempuh 1 km dalam 30 menit. Berapa km dalam 1 jam?" id={idKuis("C", 1)} periksa={(teks) => bulat(teks, "2")} jawaban="1 jam = 2 × 30 menit. Jaraknya 2 × 1 km = 2 km." />
        <SoalLatihan anak="3. Dengan kecepatan yang sama, berapa jam untuk 9 km?" id={idKuis("E", 4)} periksa={(teks) => desimal(teks, "4.5")} jawaban="Kecepatan 2 km tiap jam. 9 : 2 = 4,5. Jawabannya 4,5 jam." />
        <SoalLatihan anak="4. Jika Banyu berjalan 3,5 jam, berapa km yang ditempuh?" id={idKuis("E", 5)} periksa={(teks) => bulat(teks, "7")} jawaban="3,5 × 2 = 7. Jawabannya 7 km." />
        <P anak="1 minggu = 7 × 24 = 168 jam. 3 minggu = 168 × 3 = 504 jam. 840 : 168 = 5, jadi 840 jam = 5 minggu." />
        <Tabel kolom={["No.", "Jam", "Minggu"]} baris={[["1", "168", "1"], ["2", "504", "3"], ["3", "840", "5"]]} />
        <SoalLatihan anak="5. Berapa jam dalam 1 minggu?" id={idKuis("E", 6)} periksa={(teks) => bulat(teks, "168")} jawaban="7 × 24 = 168. Jawabannya 168 jam." />
        <SoalLatihan anak="6. 840 jam sama dengan berapa minggu?" id={idKuis("E", 7)} periksa={(teks) => bulat(teks, "5")} jawaban="840 : 168 = 5. Jawabannya 5 minggu." />
        <SoalLatihan anak="7. Lengkuas dipanen dalam 1,5 tahun. Tuliskan masa itu dalam bulan." id={idKuis("C", 2)} periksa={(teks) => bulat(teks, "18")} jawaban="1,5 × 12 = 18. Jawabannya 18 bulan." />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Refleksi Bab" />
        <Daftar anak={[
          "1. Apakah pengertian rasio sudah kamu pahami?",
          "2. Apakah kamu dapat menyatakan rasio dari dua besaran?",
          "3. Apakah kamu dapat menuliskan rasio yang senilai dengan rasio tertentu?",
          "4. Apakah kamu dapat menentukan rasio satuan?",
        ]} />
        <P anak="Cek dirimu. Rasio ditulis a : b atau a/b, sesuai urutan kalimat. Rasio senilai mengalikan atau membagi kedua angka dengan bilangan yang sama. Rasio satuan membuat salah satu kuantitas menjadi 1." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <Tabel kolom={["Klub", "Jumlah anggota"]} baris={[["Sains", "16"], ["Olahraga", "36"], ["Seni", "24"], ["Robotik", "27"]]} />
        <KotakJawaban id={idKuis("D", 0)} soal="1a. Tuliskan perbandingan paling sederhana anggota klub sains dan seni." periksa={(teks) => rasio(teks, "2", "3")} jawaban="16 : 24 dibagi 8 menjadi 2 : 3." />
        <KotakJawaban id={idKuis("D", 1)} soal="1b. Olahraga dibanding seni adalah 3 : 2. Seni ada 24 anggota. Berapa anggota olahraga?" periksa={(teks) => bulat(teks, "36")} jawaban="24 adalah 2 bagian, jadi 1 bagian 12. Olahraga 3 × 12 = 36." />
        <KotakJawaban id={idKuis("D", 2)} soal="1c. Olahraga dibanding robotik adalah 4 : 3. Olahraga ada 36 anggota. Berapa anggota robotik?" periksa={(teks) => bulat(teks, "27")} jawaban="36 : 4 = 9. Robotik 3 × 9 = 27." />
        <KotakJawaban id={idKuis("D", 3)} soal="2. Dony memakai 30 ml sirup untuk 2 sendok susu. Hana memakai 65 ml untuk 5 sendok. Susu siapa yang lebih terasa cokelat?" periksa={(teks) => teks.toLowerCase().includes("dony")} jawaban="30 : 2 = 15 ml tiap sendok. 65 : 5 = 13 ml tiap sendok. Dony lebih cokelat." />
        <P anak="3. Susu Murni: 10 kotak seharga Rp30.000. Susu Segar: 15 kotak seharga Rp34.500. Bandingkan harga satu kotak." />
        <Tabel kolom={["Susu", "Banyak kotak", "Harga", "Harga 1 kotak"]} baris={[["Murni", "10", "Rp30.000", "Rp3.000"], ["Segar", "15", "Rp34.500", "Rp2.300"]]} />
        <KotakJawaban id={idKuis("D", 5)} soal="Kotak mana yang harga satuannya lebih murah?" periksa={(teks) => teks.toLowerCase().includes("segar")} jawaban="30.000 : 10 = 3.000. 34.500 : 15 = 2.300. Susu Segar lebih murah untuk setiap kotak." />
        <KotakJawaban id={idKuis("D", 4)} soal="4. Novel dibanding komik adalah 11 : 4. Seluruh buku 120. Berapa novel?" periksa={(teks) => bulat(teks, "88")} jawaban="11 + 4 = 15. 120 : 15 = 8. Novel 11 × 8 = 88. Komik 4 × 8 = 32." />
        <KotakJawaban id={idKuis("D", 6)} soal="5a. Seorang penulis mengetik 1.200 kata dalam 1 jam. Berapa kata dalam 180 menit?" periksa={(teks) => bulat(teks, "3600")} jawaban="180 menit = 3 jam. 3 × 1.200 = 3.600 kata." />
        <KotakJawaban id={idKuis("D", 7)} soal="5b. Berapa menit untuk menuliskan 3.000 kata?" periksa={(teks) => bulat(teks, "150")} jawaban="3.000 : 1.200 = 2,5 jam. 2,5 × 60 = 150 menit." />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pengayaan" />
        <P anak="Tiap daerah punya makanan khas dari hasil alamnya." />
        <Daftar anak={[
          "a. Dari daerah mana kamu berasal?",
          "b. Sebutkan satu makanan khas daerahmu.",
          "c. Tuliskan bahan makanan itu untuk 5 orang, beserta jumlah tiap bahan.",
          "d. Jika porsinya dijadikan 3 kali lebih banyak, tuliskan jumlah tiap bahan.",
        ]} />
        <P anak="Pada soal d, kalikan setiap bahan dengan 3. Porsi menjadi 15 orang. Rasio bahan terhadap porsi tetap sama." />
      </section>
    </article>
  );
}
