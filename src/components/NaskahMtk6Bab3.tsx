"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB3 } from "@/lib/modul-resmi-mtk-6-bab3";
import { useState } from "react";

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK6_BAB3.id, kode, indeks);
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

function lokasi(teks: string, huruf: string, angka: string): boolean {
  return rapat(teks).includes(huruf) && bulat(teks, angka);
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

function Daftar({ anak }: { anak: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm font-semibold leading-8 text-slate-800">
      {anak.map((baris) => <li key={baris}><Teks anak={baris} /></li>)}
    </ul>
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

export default function NaskahMtk6Bab3(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 3</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">Kubus dan Balok</h1>
        <P anak="Tigor dan Tenri tinggal di Makassar. Pada peta, Makassar terletak di petak C2. Saat libur mereka mengunjungi Fort Rotterdam. Bangunan itu tersusun dari balok, dan atapnya berbentuk prisma segitiga. Gambar mereka berbeda karena mereka melihat bangunan dari sisi yang berbeda." />
      </header>

      <section className="space-y-2">
        <JudulBagian anak="Tujuan Pembelajaran" />
        <Daftar anak={[
          "Menentukan hasil menyusun dan mengurai kubus, balok, dan gabungannya.",
          "Menyusun bangun ruang dari model dua dimensi, dan sebaliknya.",
          "Memakai sistem berpetak untuk lokasi, jalur, serta jarak mendatar dan tegak.",
        ]} />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pertanyaan Pemantik" />
        <Daftar anak={[
          "Apakah bangun ruang dapat digabung dan dipisah?",
          "Apa kesamaan kubus dan balok? Apa bedanya?",
          "Apakah bangun ruang terlihat sama dari semua arah?",
          "Mengapa peta memakai petak?",
        ]} />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Kata Kunci" />
        <P anak="Kubus, balok, tampak atas, tampak depan, tampak samping, sistem berpetak, lokasi." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Peta Konsep" />
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="mx-auto w-fit rounded-full bg-[#1C01A5] px-4 py-1 text-sm font-black text-white">Kubus dan Balok</p>
          <div className="grid gap-3 md:grid-cols-3">
            <p className="rounded-xl bg-[#EEF2FF] p-3 text-sm font-black text-[#1C01A5]">Mengonstruksi dan Mengurai</p>
            <p className="rounded-xl bg-[#EEF2FF] p-3 text-sm font-black text-[#1C01A5]">Visualisasi Spasial</p>
            <p className="rounded-xl bg-[#EEF2FF] p-3 text-sm font-black text-[#1C01A5]">Lokasi</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Ayo Mengingat Kembali" />
        <Gambar src="/doodle-mtk/mtk-6-bab3-bangun.jpg" alt="Delapan bangun ruang bernomor" keterangan="1 tabung, 2 kerucut, 3 kubus, 4 balok, 5 prisma segitiga, 6 bola, 7 limas segitiga, 8 prisma segi lima." />
        <Daftar anak={[
          "b. Yang dapat digelindingkan: bola, tabung, dan kerucut.",
          "c. Yang dapat ditumpuk: kubus, balok, prisma, dan limas, karena ada sisi yang datar.",
          "d. Prisma segitiga punya 5 sisi.",
          "e. Limas segi empat punya 5 titik sudut.",
          "f. Balok punya 12 rusuk.",
          "g. Kubus punya sisi yang semuanya sama, yaitu 6 sisi persegi yang kongruen.",
        ]} />
        <SoalLatihan anak="d. Ada berapa sisi pada prisma segitiga?" id={idKuis("A", 0)} periksa={(teks) => bulat(teks, "5")} jawaban="2 sisi segitiga dan 3 sisi persegi panjang. Jumlahnya 5." />
        <SoalLatihan anak="e. Limas segi empat memiliki berapa titik sudut?" id={idKuis("A", 1)} periksa={(teks) => bulat(teks, "5")} jawaban="4 titik pada alas dan 1 titik puncak. Jumlahnya 5." />
        <SoalLatihan anak="f. Ada berapa rusuk pada balok?" id={idKuis("A", 2)} periksa={(teks) => bulat(teks, "12")} jawaban="4 rusuk alas, 4 rusuk tutup, dan 4 rusuk tegak. Jumlahnya 12." />
        <SoalLatihan anak="g. Bangun ruang mana yang semua sisinya sama?" id={idKuis("B", 2)} periksa={(teks) => teks.toLowerCase().includes("kubus")} jawaban="Kubus. Keenam sisinya persegi yang sama." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Mengonstruksi dan Mengurai" />
        <Subjudul anak="Permasalahan" />
        <P anak="Ada perpustakaan dan hotel yang disusun dari kontainer bekas. Kontainer bekas dipakai lagi supaya tidak menjadi limbah, dan bangunannya lebih cepat selesai. Di eksplorasi ini kamu berperan sebagai arsitek." />
        <Subjudul anak="Eksplorasi 3.1" />
        <P anak="Siapkan kubus yang ukurannya sama." />
        <Daftar anak={[
          "1. Dua kubus dapat berdampingan atau ditumpuk. Kedua cara itu bentuk yang sama, hanya arah pandangnya berbeda. Menempelkan dua kubus pada satu sisi hanya menghasilkan satu bentuk.",
          "2a. Tiga kubus satu lantai punya 2 bentuk: lurus dan siku.",
          "2b. Jika boleh ada bagian dua lantai, contohnya dua kubus di bawah dan satu di atas ujung, atau satu di atas tengah.",
          "2c. Jika boleh tiga lantai, hanya ada 1 bentuk: menara tiga kubus.",
          "3. Dua balok dapat disusun satu tingkat. Karena sisi balok tidak semua sama, cara menempelnya bisa berbeda. Dua kubus tidak seperti itu.",
        ]} />
        <Subjudul anak="Ayo Berkomunikasi" />
        <P anak="Bandingkan hasil temanmu. Kesamaannya: kubus dan balok sama-sama dapat digabung dan diurai. Perbedaannya: tempelan kubus lebih sedikit ragamnya karena semua sisinya sama." />
        <Subjudul anak="Pembahasan" />
        <P anak="Bangun ruang dapat digabung menjadi bangun yang baru, dan dapat diurai menjadi bangun yang lebih kecil. Tembok, misalnya, tersusun dari banyak batu bata." />
        <P anak="Susunan kubus dapat dicatat pada kertas isometrik. Susunan yang sama juga dapat dicoba pada alat gambar isometrik: https://www.nctm.org/Classroom-Resources/Illuminations/Interactives/Isometric-Drawing-Tool/" />

        <Subjudul anak="Latihan 3.1" />
        <P anak="1. Susun kubus mengikuti bangun yang diminta. Hitung kubus yang terlihat dan kubus yang tertutup di belakang atau di bawahnya." />
        <P anak="2. Untuk bangun dari balok satuan, hitung setiap balok, termasuk yang tertutup. Tumpukan lurus setinggi 4 memakai 4 balok. Bentuk siku yang tersusun 4 balok juga memakai 4 balok." />
        <P anak="3. Angka pada tiap kolom adalah banyak kubus di kolom itu. Jumlahkan semua angka kolom. Jangan menghitung angka yang sama dua kali jika angka itu tertulis di dua sisi kolom yang sama." />
        <Gambar src="/doodle-mtk/mtk-6-bab3-kubus.jpg" alt="Empat kolom kubus dengan tinggi dua, dua, dua, dan satu" keterangan="Contoh hitung kolom: 2 + 2 + 2 + 1 = 7 kubus." />
        <SoalLatihan anak="4. Pada gambar empat kolom itu, berapa kubus yang diperlukan?" id={idKuis("E", 0)} periksa={(teks) => bulat(teks, "7")} jawaban="2 + 2 + 2 + 1 = 7." />
        <P anak="5. Pak Hasan punya 30 kardus berukuran 20 cm × 30 cm × 50 cm. Gudang berukuran 3 m × 3 m dan tinggi 3,1 m. Kardus boleh ditumpuk ke segala arah. Ia ingin luas lantai yang terpakai sekecil mungkin." />
        <SoalLatihan anak="5b. Berapa luas lantai yang terpakai, dalam m²?" id={idKuis("E", 1)} periksa={(teks) => desimal(teks, "0.3") || bulat(teks, "3000")} jawaban="Tinggi yang terpakai 300 cm dari 310 cm. Volume 30 kardus = 900.000 cm³. Luas lantai = 900.000 : 300 = 3.000 cm² = 0,3 m². Enam tumpuk jika 50 cm tegak, sepuluh tumpuk jika 30 cm tegak, atau lima belas tumpuk jika 20 cm tegak. Ketiganya memakai luas lantai yang sama." />
        <Subjudul anak="Ayo Berefleksi" />
        <Daftar anak={[
          "a. Apakah kamu dapat menyusun bangun ruang dari beberapa kubus?",
          "b. Apakah kamu dapat mengurai bangun ruang menjadi beberapa kubus?",
        ]} />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Visualisasi Spasial" />
        <Subjudul anak="Permasalahan" />
        <P anak="Bangunan terlihat berbeda dari sisi yang berbeda. Arsitek menggambar tampak beberapa arah agar rancangannya dapat dibangun." />
        <Subjudul anak="Eksplorasi 3.2" />
        <Daftar anak={[
          "1. Warnai gambar tampak sesuai warna kubus yang terlihat dari depan, samping, dan atas.",
          "2. Gambar susunan kubus lain dari tiga arah.",
          "3. Buat susunanmu sendiri, lalu gambar tiga tampaknya.",
          "4. Tukar gambar dengan kelompok lain dan susun kembali kubusnya.",
          "5. Bandingkan dengan susunan asli. Satu arah sering belum cukup. Tiga arah lebih menolong.",
        ]} />
        <Subjudul anak="Ayo Berkomunikasi" />
        <P anak="Susunan hasil rekonstruksi bisa sama dengan susunan teman, tetapi kadang ada susunan lain yang tampaknya cocok. Menambah arah pandang mengurangi kemungkinan yang keliru. Dua arah kadang belum cukup. Satu arah saja belum menentukan susunan." />
        <Subjudul anak="Pembahasan" />
        <P anak="Bangun ruang terlihat berbeda dari arah berbeda. Jika tampak dari beberapa arah diketahui, susunan kubusnya dapat ditentukan." />
        <Subjudul anak="Penguatan Karakter" />
        <P anak="Orang dapat melihat sisi yang berbeda dari hal yang sama. Karena itu, lihat lebih dulu cara pandang orang lain." />

        <Subjudul anak="Latihan 3.2" />
        <P anak="1 sampai 5 meminta gambar tampak depan, samping, dan atas, atau menyusun kubus dari tampak yang diberikan. Gambar tiga kotak: depan, samping kanan, dan atas. Kubus yang tersembunyi tetap dihitung jika tampak dari arah lain menunjukkan ada kubus di situ." />
        <Gambar src="/doodle-mtk/mtk-6-bab3-dadu.jpg" alt="Dadu dengan enam titik di atas, dua titik di depan, dan sisi kanan kosong" keterangan="Atas menunjukkan 6. Depan menunjukkan 2. Sisi kanan kosong." />
        <P anak="Pada dadu yang sama dilihat dari arah lain, atas 6, depan 5, dan kanan 3. Sisi yang berlawanan berjumlah 7. Jadi 6 berlawanan dengan 1, 5 berlawanan dengan 2, dan 3 berlawanan dengan 4." />
        <SoalLatihan anak="6b. Berapa mata pada sisi yang kosong?" id={idKuis("B", 0)} periksa={(teks) => bulat(teks, "4")} jawaban="Atas tetap 6, jadi bawah 1. Depan pada gambar ini 2, yaitu sisi yang tadi ada di belakang. Sisi kanan yang sekarang kosong adalah sisi yang tadi di kiri, yaitu lawan dari 3. Lawan 3 adalah 4." />
        <SoalLatihan anak="Uji 1. Berapa kubus pada bangun empat kolom 2, 2, 2, dan 1?" id={idKuis("B", 1)} periksa={(teks) => bulat(teks, "7")} jawaban="Dasar 2 × 2 sama dengan 4. Satu sudut atas kosong, jadi tingkat atas ada 3. Jumlah 4 + 3 = 7." />
        <Subjudul anak="Ayo Berefleksi" />
        <Daftar anak={[
          "a. Apakah kamu dapat menggambarkan tampilan bangun ruang dari berbagai arah?",
          "b. Apakah kamu dapat menyusun kubus jika tampaknya dari berbagai arah diketahui?",
        ]} />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Lokasi" />
        <Subjudul anak="Permasalahan" />
        <P anak="Pada peta Indonesia di kelas, Kota Makassar terletak pada petak C2." />
        <SoalLatihan anak="Tuliskan petak Makassar." id={idKuis("C", 2)} periksa={(teks) => lokasi(teks, "c", "2")} jawaban="Huruf kolom C dan baris 2. Jawabannya (C,2)." />
        <Subjudul anak="Eksplorasi 3.3" />
        <Gambar src="/doodle-mtk/mtk-6-bab3-petak.jpg" alt="Petak A sampai F dan baris 1 sampai 5 dengan tanda silang dan lingkaran" keterangan="Tanda X di (B,4). Tanda O di (D,1)." />
        <P anak="Garis tegak diberi huruf. Garis mendatar diberi bilangan. Lokasi ditulis sebagai pasangan huruf dan bilangan." />
        <SoalLatihan anak="Di petak mana tanda X?" id={idKuis("C", 0)} periksa={(teks) => lokasi(teks, "b", "4")} jawaban="X ada di kolom B dan baris 4. Jawabannya (B,4)." />
        <P anak="Permainan dua kelompok memakai tanda X dan O. Pemenangnya adalah kelompok yang lebih dulu menaruh tiga tanda segaris, mendatar, tegak, atau diagonal. Juru bicara menyebut lokasi. Juru tulis memberi tanda di papan." />
        <Subjudul anak="Latihan 3.3" />
        <Daftar anak={[
          "1. Buat denah kelas pada petak. Huruf untuk deret. Bilangan untuk baris.",
          "2. Tuliskan lokasi tiga teman dengan pasangan huruf dan bilangan.",
          "3. Bangun pada petak ditulis dengan kolom dan baris tempat bangun itu berdiri.",
        ]} />

        <Subjudul anak="Eksplorasi 3.4" />
        <P anak="Pesan hanya boleh ke kiri, kanan, depan, atau belakang. Pesan tidak boleh langsung menyilang. Contoh: dari (B,3) pesan boleh ke (A,3), (C,3), (B,2), atau (B,4), tetapi tidak langsung ke (C,2)." />
        <Gambar src="/doodle-mtk/mtk-6-bab3-jalur.jpg" alt="Satu jalur dari titik P ke titik Q pada petak" keterangan="Dari P(B,5) ke Q(E,1) ada 3 langkah mendatar dan 4 langkah tegak." />
        <P anak="Dari P(B,5) ke Q(E,1) perlu paling sedikit 3 langkah ke kanan dan 4 langkah ke bawah. Panjang terpendek 3 + 4 = 7 langkah. Ada lebih dari satu jalur dengan panjang itu." />
        <Subjudul anak="Ayo Berkomunikasi" />
        <Daftar anak={[
          "a. Sering ada jalur yang lebih pendek daripada jalur yang pertama dicoba.",
          "b. Ada jalur berbeda yang panjangnya sama.",
          "c. Jarak minimal = selisih huruf + selisih bilangan.",
          "d. Jalur yang berputar lebih panjang daripada jarak minimal.",
        ]} />

        <Subjudul anak="Latihan 3.4" />
        <P anak="1a. Dua jalur dari (A,3) ke (E,5): kanan terus sampai E lalu naik ke 5, atau naik dulu ke 5 lalu kanan sampai E." />
        <P anak="1b. Dua jalur dari (B,6) ke (D,3): kanan sampai D lalu turun ke 3, atau turun dulu ke 3 lalu kanan sampai D." />
        <SoalLatihan anak="2a. Berapa langkah terpendek dari (A,3) ke (E,5)?" id={idKuis("C", 1)} periksa={(teks) => bulat(teks, "6")} jawaban="Mendatar A ke E = 4. Tegak 3 ke 5 = 2. Jumlah 4 + 2 = 6." />
        <SoalLatihan anak="2b. Berapa langkah terpendek dari (B,6) ke (D,3)?" id={idKuis("E", 2)} periksa={(teks) => bulat(teks, "5")} jawaban="Mendatar B ke D = 2. Tegak 6 ke 3 = 3. Jumlah 2 + 3 = 5." />
        <P anak="3. Kubus di (F,1) akan ke (D,2) dengan direbahkan, tidak diangkat. Rusuk kubus sama dengan satu petak." />
        <SoalLatihan anak="3b. Berapa kali kubus direbahkan pada jalur terpendek?" id={idKuis("E", 3)} periksa={(teks) => bulat(teks, "3")} jawaban="F ke D = 2 langkah. Baris 1 ke 2 = 1 langkah. Jumlah rebah 2 + 1 = 3. Titik P berpindah mengikuti sisi yang menempel lantai pada tiap rebah." />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Refleksi Bab" />
        <Daftar anak={[
          "1. Apakah kamu dapat menyusun dan mengurai kubus, balok, dan gabungannya?",
          "2. Apakah kamu dapat membuat model dua dimensi dari susunan kubus dan balok?",
          "3. Apakah kamu dapat menyusun kubus dan balok dari gambar dua dimensinya?",
          "4. Apakah kamu dapat menentukan lokasi pada sistem berpetak?",
          "5. Jarak dua titik pada petak ditentukan dari jarak mendatar dan jarak tegak.",
          "6. Apakah kamu dapat menentukan kedua jarak itu?",
        ]} />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <KotakJawaban id={idKuis("D", 0)} soal="1. Berapa kubus pada bangun dengan tinggi kolom 2, 2, 2, dan 1?" periksa={(teks) => bulat(teks, "7")} jawaban="2 + 2 + 2 + 1 = 7. Itu sama dengan kubus 2 × 2 × 2 yang satu sudut atasnya kosong." />
        <P anak="2. Gambarkan dadu dari tiga arah: depan, samping, dan atas. Pada gambar bab ini, atas 6, depan 2, dan sisi kanan kosong." />
        <KotakJawaban id={idKuis("D", 1)} soal="Mata pada sisi dadu yang kosong." periksa={(teks) => bulat(teks, "4")} jawaban="Sisi berlawanan berjumlah 7. Lawan dari 3 adalah 4." />
        <KotakJawaban id={idKuis("D", 2)} soal="3. Kinan di (B,3). Angga dua deret di kanan dan satu baris di belakang. Tuliskan posisi Angga." periksa={(teks) => lokasi(teks, "d", "4")} jawaban="Huruf membesar ke kanan: B, C, lalu D. Bilangan membesar ke belakang: 3 lalu 4. Jawabannya (D,4)." />
        <KotakJawaban id={idKuis("D", 3)} soal="Langkah terpendek dari (A,3) ke (E,5)." periksa={(teks) => bulat(teks, "6")} jawaban="4 mendatar + 2 tegak = 6." />
        <KotakJawaban id={idKuis("D", 4)} soal="Banyak cara terpendek dari (A,1) ke (D,5), hanya ke kanan atau ke atas." periksa={(teks) => bulat(teks, "35")} jawaban="3 langkah kanan dan 4 langkah atas. Banyak cara = 7! : (3! × 4!) = 35." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Pengayaan" />
        <P anak="Tigor berangkat dari K(A,1) ke L(D,5). Ia hanya boleh ke kanan atau ke atas." />
        <P anak="1. Jarak terpendek: 3 langkah mendatar dan 4 langkah tegak. Jumlah 7 langkah." />
        <Tabel kolom={["Titik", "Kanan", "Atas", "Banyak cara"]} baris={[
          ["(A,2)", "0", "1", "1"],
          ["(B,1)", "1", "0", "1"],
          ["(B,2)", "1", "1", "2"],
          ["(A,3)", "0", "2", "1"],
          ["(B,3)", "1", "2", "3"],
          ["(C,1)", "2", "0", "1"],
          ["(C,2)", "2", "1", "3"],
          ["(C,3)", "2", "2", "6"],
          ["(D,5)", "3", "4", "35"],
        ]} />
        <P anak="3. Pola: banyak cara ke titik yang perlu r langkah kanan dan u langkah atas adalah (r + u)! : (r! × u!)." />
        <SoalLatihan anak="4. Berapa banyak cara dari (A,1) ke (D,5)?" id={idKuis("E", 4)} periksa={(teks) => bulat(teks, "35")} jawaban="r = 3 dan u = 4. (3 + 4)! : (3! × 4!) = 5040 : (6 × 24) = 35." />
        <P anak="5. Uji pola itu pada titik awal dan titik akhir yang lain. Selisih huruf menjadi r, selisih bilangan menjadi u, lalu pakai rumus yang sama." />
      </section>
    </article>
  );
}
