"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB1 } from "@/lib/modul-resmi-mtk-6-bab1";
import {
  desimalDuaKomaSembilan,
  desimalLimaKomaDelapan,
  desimalNolKomaSembilan,
  desimalSatuKomaLima,
  desimalSeperlima,
  desimalSetengah,
  desimalTigaDelapanKomaLima,
  desimalTigaKomaEnam,
  desimalTigaKomaTujuh,
  desimalTigaPerEmpat,
  enamPerLima,
  jumlahDelapan,
  jumlahDuaPuluh,
  jumlahEnam,
  jumlahEnamPuluhLima,
  jumlahLimaBelas,
  jumlahSepuluh,
  jumlahTiga,
  jumlahTigaPuluh,
  limaPerTigaPuluhDua,
  seperenam,
  sepersembilan,
  sepertiga,
} from "@/lib/nilai-mtk-6-bab1";
import { useState, type ReactNode } from "react";

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK6_BAB1.id, kode, indeks);
}

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".");
}

function utuh(teks: string, angka: string): boolean {
  return new RegExp(`(?<!\\d)${angka}(?!\\d)`).test(rapat(teks));
}

function pecahan(teks: string, bentuk: string): boolean {
  const aman = bentuk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(rapat(teks).replace("per", "/"));
}

function desimalUtuh(teks: string, angka: string): boolean {
  const aman = angka.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(rapat(teks));
}

function limaBelasPerDua(teks: string): boolean {
  const s = rapat(teks);
  return pecahan(teks, "15/2") || /(?<!\d)7\.5(?!\d)/.test(s) || /71\/2/.test(s);
}

function namaAtauAngka(teks: string, nama: string, angka: string, cek?: (nilai: string) => boolean): boolean {
  return teks.toLowerCase().includes(nama) || (cek ? cek(teks) : utuh(teks, angka));
}

function JudulBagian({ anak }: { anak: string }) {
  return <h2 className="text-2xl font-black text-[#1C01A5]">{anak}</h2>;
}

function Kegiatan({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">{label}</p>
      <div className="space-y-2 text-sm font-semibold leading-relaxed text-slate-800">{children}</div>
    </div>
  );
}

function Rumus({ anak }: { anak: string }) {
  return <p className="rounded-xl bg-[#F8F7FF] px-4 py-3 text-base font-black text-[#1C01A5]">{anak}</p>;
}

function Tabel({ kolom, baris }: { kolom: string[]; baris: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {kolom.map((nama) => (
              <th key={nama} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black text-[#1C01A5]">{nama}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((barisItem) => (
            <tr key={barisItem.join("|")}>
              {barisItem.map((sel, indeks) => (
                <td key={`${indeks}-${sel}`} className="border border-slate-200 px-3 py-2 font-semibold text-slate-800">{sel}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Petak({ kolom, isi, keterangan }: { kolom: number; isi: Array<"isi" | "kosong">; keterangan: string }) {
  return (
    <div className="space-y-1">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, 1.75rem)` }}>
        {isi.map((jenis, indeks) => (
          <div key={indeks} className={`h-7 rounded-sm border ${jenis === "isi" ? "border-sky-600 bg-sky-300" : "border-slate-300 bg-white"}`} />
        ))}
      </div>
      <p className="text-xs font-semibold text-slate-600">{keterangan}</p>
    </div>
  );
}

function KotakJawaban({ id, soal, periksa, umpan }: { id: string; soal: string; periksa: (teks: string) => boolean; umpan: string }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const kirim = () => {
    const tepat = periksa(isi);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white px-3 py-3">
      <label className="block text-sm font-bold text-slate-800">
        {soal}
        <input value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900" />
      </label>
      <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
      {status === "benar" ? <p className="text-sm font-bold text-emerald-800">Benar. {umpan}</p> : null}
      {status === "salah" ? <p className="text-sm font-bold text-rose-700">Belum tepat. Hitung lagi dari angka pada soal.</p> : null}
    </div>
  );
}

export default function NaskahMtk6Bab1(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 1</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">Pecahan dan Desimal</h1>
        <p className="text-sm font-semibold text-slate-700">Urutan kegiatan mengikuti buku siswa: tujuan, peta konsep, permasalahan, eksplorasi, pembahasan, latihan, refleksi, uji kompetensi, lalu pengayaan.</p>
      </header>

      <section className="space-y-2">
        <JudulBagian anak="Tujuan Pembelajaran" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Mengalikan pecahan dengan bilangan asli, dan menghitung hasilnya.</li>
          <li>Membagi pecahan dengan bilangan asli, dan menghitung hasilnya.</li>
          <li>Mengubah pecahan menjadi desimal, lalu membandingkan dan mengurutkan desimal.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pertanyaan Pemantik" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Bagaimana mengalikan pecahan dengan bilangan asli, dan sebaliknya?</li>
          <li>Apakah penyebut harus disamakan lebih dulu?</li>
          <li>Bagaimana membagi pecahan dengan bilangan asli, dan sebaliknya?</li>
          <li>Bagaimana mengubah pecahan menjadi desimal?</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Kata Kunci" />
        <p className="text-sm font-semibold text-slate-800">Pecahan, desimal, perkalian pecahan, pembagian pecahan, bilangan kebalikan, bilangan asli.</p>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Peta Konsep" />
        <p className="text-sm font-semibold text-slate-800">Pecahan dan desimal terbagi menjadi perkalian pecahan, pembagian pecahan, dan bentuk bilangan. Bentuk bilangan mencakup notasi desimal, membandingkan dua desimal, dan mengurutkan desimal.</p>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Ayo Mengingat Kembali" />
        <p className="text-sm font-semibold text-slate-800">Ada 20 permen untuk 5 anak. Tiap anak mendapat 20 ÷ 5 = 4 permen. Pecahan 2/3 berarti 2 bagian dari 3 bagian yang sama besar.</p>
        <Kegiatan label="Pembuka">
          <p>Penampungan air masih terisi 2/3 bagian. Hari ini terpakai 1/5 dari air yang tersisa. Air sisa 2/3 itu juga akan dipakai selama 2 hari, dibagi sama banyak.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 0)} soal="1/5 dari 2/3. Bagian air yang terpakai hari ini?" periksa={(teks) => pecahan(teks, "2/15")} umpan="1/5 × 2/3 = 2/15." />
        <KotakJawaban id={idKuis("A", 1)} soal="2/3 dibagi untuk 2 hari. Bagian tiap hari?" periksa={sepertiga} umpan="2/3 ÷ 2 = 2/3 × 1/2 = 1/3." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Perkalian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Perkalian Bilangan Asli dengan Pecahan</h3>
        <Kegiatan label="Permasalahan">
          <p>Agam menyiram kebun. Satu ember besar menyiram 2 m². Satu ember kecil menyiram 3/5 m². Ia memakai 5 ember besar dan 5 ember kecil.</p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.1">
          <p>Isi tabel ember besar. Satu ember menyiram 2 m², jadi lima ember menyiram 5 × 2 m².</p>
          <Tabel kolom={["Banyak ember besar", "Luas kebun (m²)"]} baris={[["1", "2"], ["5", "…"]]} />
          <p>Lalu hitung 2 ember kecil. Satu kotak penuh = 1 m². Satu kotak kecil = 1/5 m². Bagian 3/5 m² adalah 3 kotak kecil.</p>
          <Petak kolom={5} isi={["isi", "isi", "isi", "kosong", "kosong"]} keterangan="3/5 m² pada satu ember kecil." />
          <Petak kolom={5} isi={["isi", "isi", "isi", "isi", "isi", "isi", "kosong", "kosong", "kosong", "kosong"]} keterangan="Dua ember kecil: 6 bagian dari 1/5 m²." />
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 2)} soal="Luas yang disiram 5 ember besar, dalam m²?" periksa={jumlahSepuluh} umpan="5 × 2 = 10 m²." />
        <KotakJawaban id={idKuis("A", 3)} soal="Luas yang disiram 2 ember kecil, dalam m²?" periksa={enamPerLima} umpan="2 × 3/5 = 6/5 m²." />
        <KotakJawaban id={idKuis("A", 4)} soal="Luas yang disiram 5 ember kecil, dalam m²?" periksa={jumlahTiga} umpan="5 × 3/5 = 3 m²." />
        <Kegiatan label="Pembahasan">
          <p>Lima ember besar memakai perkalian bilangan asli: 5 × 2 = 10 m².</p>
          <p>Dua ember kecil menggandakan 3/5 sebanyak 2 kali. Ada 6 bagian 1/5, yaitu 6/5 m². Kalikan bilangan asli dengan pembilang. Penyebut tetap.</p>
          <Rumus anak="a × b/c = (a × b)/c" />
          <p>Coba uji kalimat ini: hasil kali bilangan asli dengan pecahan selalu lebih kecil. 6/5 lebih kecil dari 2, tetapi lebih besar dari 3/5. Kalimat itu belum berlaku untuk setiap pembanding.</p>
        </Kegiatan>

        <h3 className="text-lg font-black text-[#1C01A5]">2. Perkalian Pecahan dengan Bilangan Asli</h3>
        <Kegiatan label="Permasalahan">
          <p>Agam punya 15 pohon mangga. 2/3 dari pohon itu adalah mangga manalagi.</p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.2">
          <p>Bagi 15 pohon menjadi 3 bagian yang sama. Ambil 2 bagian.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 5)} soal="Banyak pohon mangga manalagi?" periksa={jumlahSepuluh} umpan="2/3 × 15 = 10 pohon." />
        <Kegiatan label="Pembahasan">
          <p>2/3 × 15 mencari bagian tertentu dari 15 pohon. Kalikan pembilang dengan bilangan asli. Penyebut tetap: (2 × 15)/3 = 10.</p>
          <Rumus anak="a/c × b = (a × b)/c" />
          <p>Bandingkan 1/4 × 20 dan 20 × 1/4. Keduanya sama dengan 5.</p>
        </Kegiatan>

        <Kegiatan label="Latihan 1.1">
          <p>1. Hani punya 4 pita. Tiap pita panjangnya 3/4 m.</p>
          <p>2. Fina membuat 75 pastel. Keluarga memakan 2/15 bagian.</p>
          <p>3. Ada 180 siswa kelas 6. 1/6 memilih musik. 2/3 dari siswa musik itu juga memilih melukis.</p>
          <p>4. Buat cerita untuk 1/4 × 20 dan untuk 20 × 1/4. Kedua hasil hitungnya sama dengan 5.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 6)} soal="Panjang seluruh pita Hani, dalam meter?" periksa={jumlahTiga} umpan="4 × 3/4 = 3 meter." />
        <KotakJawaban id={idKuis("A", 7)} soal="Banyak pastel yang sudah dimakan?" periksa={jumlahSepuluh} umpan="2/15 × 75 = 10 pastel." />
        <KotakJawaban id={idKuis("A", 8)} soal="Banyak pastel yang belum dimakan?" periksa={jumlahEnamPuluhLima} umpan="75 − 10 = 65 pastel." />
        <KotakJawaban id={idKuis("A", 9)} soal="Banyak siswa yang memilih musik?" periksa={jumlahTigaPuluh} umpan="1/6 × 180 = 30 siswa." />
        <KotakJawaban id={idKuis("A", 10)} soal="Banyak siswa yang memilih melukis?" periksa={jumlahDuaPuluh} umpan="2/3 × 30 = 20 siswa." />
        <KotakJawaban id={idKuis("A", 11)} soal="Pecahan siswa kelas 6 yang memilih melukis?" periksa={sepersembilan} umpan="20/180 = 1/9." />
        <Kegiatan label="Refleksi subbab">
          <p>Bilangan asli kali pecahan: kali pembilang, penyebut tetap. Pecahan kali bilangan asli memakai aturan yang sama.</p>
        </Kegiatan>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Pembagian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Pembagian Pecahan dengan Bilangan Asli</h3>
        <Kegiatan label="Permasalahan">
          <p>Agam punya satu botol air. Air dibagi rata ke 3 gelas. Isi botol berganti: 1 liter, lalu 1/2 liter, lalu 1/3 liter.</p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.3">
          <p>Satu kotak penuh menggambarkan 1 liter. Bagi kotak itu sesuai isi botol, lalu bagi lagi ke 3 gelas.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 0)} soal="1 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={sepertiga} umpan="1 ÷ 3 = 1/3 liter." />
        <KotakJawaban id={idKuis("B", 1)} soal="1/2 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={seperenam} umpan="1/2 ÷ 3 = 1/2 × 1/3 = 1/6 liter." />
        <KotakJawaban id={idKuis("B", 2)} soal="1/3 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={sepersembilan} umpan="1/3 ÷ 3 = 1/3 × 1/3 = 1/9 liter." />
        <Kegiatan label="Pembahasan">
          <p>Membagi pecahan dengan bilangan asli berarti membagi pecahan itu menjadi beberapa bagian. Bagian bertambah banyak, nilai tiap bagian menjadi lebih kecil.</p>
          <Rumus anak="1/a ÷ b = 1/a × 1/b" />
          <p>Rini menghitung 4/3 ÷ 2 dengan membagi pembilang saja: (4 ÷ 2)/3 = 2/3. Pada soal ini hasilnya sama dengan 4/3 × 1/2 = 2/3. Cara yang berlaku umum tetap kali dengan kebalikan pembagi.</p>
        </Kegiatan>

        <h3 className="text-lg font-black text-[#1C01A5]">2. Pembagian Bilangan Asli dengan Pecahan</h3>
        <Kegiatan label="Permasalahan">
          <p>Agam menyiapkan 3 liter jus jeruk untuk gelas 1/4 liter, 3 liter jus jambu untuk gelas 1/2 liter, dan 3 liter air mineral untuk gelas 1/5 liter. Lalu 3 liter air itu juga diukur dengan botol 2/5 liter.</p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.4">
          <p>Dalam 1 liter ada 4 gelas 1/4 liter, 2 gelas 1/2 liter, dan 5 gelas 1/5 liter. Untuk 2/5 liter, dalam 1 liter ada 5/2 bagian.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 3)} soal="Banyak gelas 1/4 liter dari 3 liter jus jeruk?" periksa={(teks) => utuh(teks, "12")} umpan="3 ÷ 1/4 = 3 × 4 = 12 gelas." />
        <KotakJawaban id={idKuis("B", 4)} soal="Banyak gelas 1/2 liter dari 3 liter jus jambu?" periksa={jumlahEnam} umpan="3 ÷ 1/2 = 6 gelas." />
        <KotakJawaban id={idKuis("B", 5)} soal="Banyak gelas 1/5 liter dari 3 liter air mineral?" periksa={jumlahLimaBelas} umpan="3 ÷ 1/5 = 15 gelas." />
        <KotakJawaban id={idKuis("B", 6)} soal="Banyak botol 2/5 liter dari 3 liter air?" periksa={limaBelasPerDua} umpan="3 ÷ 2/5 = 3 × 5/2 = 15/2, yaitu 7 1/2 botol." />
        <Kegiatan label="Pembahasan">
          <p>Hasilnya lebih besar dari 3 karena gelasnya lebih kecil dari 1 liter. Membagi dengan pecahan sama dengan mengalikan kebalikan pecahan itu.</p>
          <Rumus anak="a ÷ b/c = a × c/b" />
        </Kegiatan>

        <Kegiatan label="Latihan 1.2">
          <p>1. Pak Rudi membagi 2/4 bagian tanah kepada 3 anak secara adil.</p>
          <p>2. Rina punya 6 kg gula. Tiap adonan bolu memakai 3/4 kg.</p>
          <p>3. Astri punya 5 batang cokelat. Tiap teman mendapat 2/3 batang.</p>
          <p>4. Buat cerita untuk 1/5 ÷ 4 dan untuk 4 ÷ 1/5.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 7)} soal="Bagian tanah tiap anak Pak Rudi?" periksa={seperenam} umpan="2/4 ÷ 3 = 2/4 × 1/3 = 1/6." />
        <KotakJawaban id={idKuis("B", 8)} soal="Banyak kue bolu yang dibuat Rina?" periksa={jumlahDelapan} umpan="6 ÷ 3/4 = 8 bolu." />
        <KotakJawaban id={idKuis("B", 9)} soal="5 ÷ 2/3. Tuliskan hasilnya." periksa={limaBelasPerDua} umpan="5 × 3/2 = 15/2. Ada 7 teman yang mendapat bagian penuh, sisa 1/3 batang." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Bilangan Desimal" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Mengubah Pecahan Menjadi Desimal</h3>
        <Kegiatan label="Permasalahan">
          <p>Ibu meminta jeruk 1/2 kg dan salak 1/5 kg. Timbangan menunjukkan 0,50 kg dan 0,20 kg.</p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.5">
          <p>Satu persegi bernilai 1. Jika dibagi 10 bagian sama, tiap bagian 1/10 = 0,1. Sepuluh persegi kecil dari 100 bagian sama dengan 10/100 = 0,10 = 0,1.</p>
          <p>Pecahan berpenyebut 2, 5, atau kelipatannya diubah dulu menjadi penyebut 10 atau 100.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("C", 0)} soal="Bentuk desimal dari 1/2 kg?" periksa={desimalSetengah} umpan="1/2 = 5/10 = 0,5 = 0,50." />
        <KotakJawaban id={idKuis("C", 1)} soal="Bentuk desimal dari 1/5 kg?" periksa={desimalSeperlima} umpan="1/5 = 2/10 = 0,2 = 0,20." />
        <Kegiatan label="Pembahasan">
          <p>Angka di kiri koma menempati satuan. Angka pertama di kanan koma menempati persepuluhan. 0,10 sama dengan 0,1 karena keduanya sama dengan 1/10.</p>
          <p>1/10 = 0,1 = 0,10. Untuk penyebut yang tidak bisa dijadikan 10 atau 100, buku meminta diskusi di kelas.</p>
        </Kegiatan>

        <h3 className="text-lg font-black text-[#1C01A5]">2. Membandingkan dan Mengurutkan Bilangan Desimal</h3>
        <Kegiatan label="Permasalahan">
          <p>Agam mengumpulkan jarak rumah 10 teman ke sekolah.</p>
        </Kegiatan>
        <Tabel
          kolom={["Nama", "Jarak (km)"]}
          baris={[
            ["Alma", "2,3"],
            ["Budi", "10,9"],
            ["Anita", "1,9"],
            ["Fadilah", "4,7"],
            ["Musa", "11,3"],
            ["Rini", "2,6"],
            ["Rido", "3,6"],
            ["Dias", "3,1"],
            ["Fatim", "2,8"],
            ["Andi", "1,5"],
          ]}
        />
        <Kegiatan label="Eksplorasi 1.6">
          <p>Bandingkan dari kiri tanda koma: puluhan, satuan, lalu persepuluhan.</p>
        </Kegiatan>
        <Kegiatan label="Pembahasan">
          <p>Contoh lima jarak: 2,3 km, 0,9 km, 1,9 km, 2,6 km, dan 3,6 km. Ada yang mengira 2,49 lebih besar dari 2,9 karena 49 lebih besar dari 9. Persepuluhan 4 lebih kecil dari 9, jadi 2,9 lebih besar.</p>
          <Tabel
            kolom={["Jarak (km)", "Satuan", "Persepuluhan", "Perseratusan"]}
            baris={[
              ["2,3", "2", "3", "0"],
              ["0,9", "0", "9", "0"],
              ["1,9", "1", "9", "0"],
              ["2,6", "2", "6", "0"],
              ["3,6", "3", "6", "0"],
            ]}
          />
          <p>Urutan terdekat ke terjauh: 0,9 km, 1,9 km, 2,3 km, 2,6 km, 3,6 km.</p>
          <p>Urutan sepuluh siswa dari yang terdekat: Andi 1,5; Anita 1,9; Alma 2,3; Rini 2,6; Fatim 2,8; Dias 3,1; Rido 3,6; Fadilah 4,7; Budi 10,9; Musa 11,3.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("C", 3)} soal="Dari lima jarak itu, yang terdekat berapa km?" periksa={desimalNolKomaSembilan} umpan="0,9 km." />
        <KotakJawaban id={idKuis("C", 4)} soal="Dari lima jarak itu, yang terjauh berapa km?" periksa={desimalTigaKomaEnam} umpan="3,6 km." />
        <KotakJawaban id={idKuis("C", 5)} soal="Siapa yang rumahnya paling dekat, atau berapa km jaraknya?" periksa={(teks) => namaAtauAngka(teks, "andi", "1.5", desimalSatuKomaLima)} umpan="Andi, 1,5 km." />
        <KotakJawaban id={idKuis("C", 6)} soal="Siapa yang rumahnya paling jauh, atau berapa km jaraknya?" periksa={(teks) => namaAtauAngka(teks, "musa", "11.3", (nilai) => desimalUtuh(nilai, "11.3"))} umpan="Musa, 11,3 km." />

        <Kegiatan label="Latihan 1.3">
          <p>1. Kain sepanjang 3/4 meter. Gambar pecahannya, lalu ubah menjadi desimal.</p>
          <p>2. Suhu tertinggi tahun 2015: Sumatra Selatan 37,2; Sumatra Utara 33,3; Nusa Tenggara Timur 36,6; Sulawesi Tengah 38,5; Kalimantan Utara 36,8.</p>
          <p>3. Lompat jauh: Arman 3,7 m, Bayu 3,6 m, Didi 2,9 m.</p>
          <p>4. Pada label, protein 5 g, lemak 10 g, karbohidrat 30 g, serat pangan 2 g, dan natrium 100 mg. Natrium 100 mg sama dengan 0,1 g.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("C", 2)} soal="3/4 meter dalam desimal?" periksa={desimalTigaPerEmpat} umpan="3/4 = 75/100 = 0,75." />
        <KotakJawaban id={idKuis("C", 7)} soal="Provinsi dengan suhu tertinggi, atau tuliskan suhunya." periksa={(teks) => namaAtauAngka(teks, "sulawesi", "38.5", desimalTigaDelapanKomaLima)} umpan="Sulawesi Tengah, 38,5. Urutan dari yang tertinggi: 38,5; 37,2; 36,8; 36,6; 33,3." />
        <KotakJawaban id={idKuis("C", 8)} soal="Siapa yang lompatannya paling jauh?" periksa={(teks) => teks.toLowerCase().includes("arman") || desimalTigaKomaTujuh(teks)} umpan="Arman, 3,7 m." />
        <KotakJawaban id={idKuis("C", 9)} soal="Siapa yang lompatannya paling dekat?" periksa={(teks) => teks.toLowerCase().includes("didi") || desimalDuaKomaSembilan(teks)} umpan="Didi, 2,9 m." />
        <Kegiatan label="Refleksi subbab">
          <p>Bandingkan desimal dari kiri tanda koma. Urutkan setelah nilai tempatnya diketahui.</p>
        </Kegiatan>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Refleksi" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Apakah kamu sudah dapat mengalikan pecahan?</li>
          <li>Apakah kamu sudah dapat membagi pecahan?</li>
          <li>Apakah kamu dapat membedakan pecahan dan desimal?</li>
          <li>Apakah kamu dapat membandingkan dan mengurutkan desimal?</li>
        </ul>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <KotakJawaban id={idKuis("D", 0)} soal="Perjalanan 630 km. Setelah 2/5 perjalanan, berapa km yang sudah ditempuh?" periksa={(teks) => utuh(teks, "252")} umpan="2/5 × 630 = 252 km." />
        <KotakJawaban id={idKuis("D", 1)} soal="Pesanan 100 porsi. Yang selesai 3/4 pesanan. Berapa porsi?" periksa={(teks) => utuh(teks, "75")} umpan="3/4 × 100 = 75 porsi." />
        <KotakJawaban id={idKuis("D", 2)} soal="50 kg beras, tiap hari 2/3 kg. Habis dalam berapa hari?" periksa={(teks) => utuh(teks, "75")} umpan="50 ÷ 2/3 = 75 hari." />
        <KotakJawaban id={idKuis("D", 3)} soal="5/8 potong kue diletakkan rata di 4 kotak. Bagian kue tiap kotak?" periksa={limaPerTigaPuluhDua} umpan="5/8 ÷ 4 = 5/32." />
        <KotakJawaban id={idKuis("D", 4)} soal="Dinding yang dicat 5 4/5 m². Tuliskan bentuk desimalnya." periksa={desimalLimaKomaDelapan} umpan="4/5 = 0,8, jadi 5,8." />
      </section>

      <section className="space-y-3 border-t-4 border-amber-400 pt-6">
        <JudulBagian anak="Pengayaan" />
        <p className="text-sm font-semibold text-slate-800">Bagian ini terpisah dari soal inti. Buku memakainya untuk pecahan kali pecahan, pecahan dibagi pecahan, dan desimal yang berulang.</p>
        <Kegiatan label="Perkalian pecahan">
          <p>Tangki terisi 1/2. Hari ini terpakai 1/3 dari air yang ada. Bagian yang terpakai 1/2 × 1/3 = 1/6.</p>
        </Kegiatan>
        <Kegiatan label="Pembagian pecahan">
          <p>3 gelas air memenuhi 2/3 botol. Satu botol penuh memerlukan 3 ÷ 2/3 = 9/2 gelas. 1/2 gelas memenuhi 3/4 botol, jadi satu botol penuh memerlukan 1/2 ÷ 3/4 = 2/3 gelas.</p>
        </Kegiatan>
        <Kegiatan label="Desimal berulang">
          <p>1/3 liter dan 1/6 liter tidak berhenti pada satu angka di belakang koma. Dengan kalkulator, 1/3 = 0,333… dan 1/6 = 0,1666…</p>
        </Kegiatan>
      </section>
    </article>
  );
}
