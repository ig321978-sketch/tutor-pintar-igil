"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB2 } from "@/lib/modul-resmi-mtk-6-bab2";
import { useState, type ReactNode } from "react";

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK6_BAB2.id, kode, indeks);
}

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".");
}

function angkaUtuh(teks: string, angka: string): boolean {
  const s = rapat(teks).replace(/rp/g, "").replace(/\.(?=\d{3}(?!\d))/g, "");
  return new RegExp(`(?<!\\d)${angka}(?!\\d)`).test(s);
}

function desimalUtuh(teks: string, angka: string): boolean {
  const aman = angka.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(rapat(teks));
}

function rasio(teks: string, kiri: string, kanan: string): boolean {
  const s = rapat(teks).replace(/\//g, ":");
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

function Kegiatan({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">{label}</p>
      <div className="space-y-2 text-sm font-semibold leading-8 text-slate-800">{children}</div>
    </div>
  );
}

function PolaCerita({ adegan, permasalahan, logika, langkah, judulAdegan = "Adegan" }: { adegan: ReactNode; permasalahan: ReactNode; logika: ReactNode; langkah: ReactNode; judulAdegan?: string }) {
  return (
    <>
      <Kegiatan label={judulAdegan}>{adegan}</Kegiatan>
      <Kegiatan label="Permasalahan">{permasalahan}</Kegiatan>
      <Kegiatan label="Logika Pemahaman">{logika}</Kegiatan>
      <Kegiatan label="Langkah Penyelesaian">{langkah}</Kegiatan>
    </>
  );
}

function KartuMetode({ judul, warna, children }: { judul: string; warna: "panah" | "rumus"; children: ReactNode }) {
  const kelas = warna === "rumus" ? "border-[#1C01A5] bg-[#EEF2FF]" : "border-red-600 bg-white";
  const judulKelas = warna === "rumus" ? "text-[#1C01A5]" : "text-red-700";
  return (
    <div className={`space-y-2 rounded-xl border-2 px-4 py-3 ${kelas}`}>
      <h3 className={`text-base font-black uppercase tracking-wide ${judulKelas}`}>{judul}</h3>
      {children}
    </div>
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

function HitungRasio({ kalimat, kolom, baris, rumus, hitung }: { kalimat: string; kolom: string[]; baris: string[][]; rumus: string[]; hitung: string[] }) {
  return (
    <div className="space-y-3">
      <KartuMetode judul="Metode Tabel" warna="panah">
        <p><Teks anak={kalimat} /></p>
        <Tabel kolom={kolom} baris={baris} />
      </KartuMetode>
      <KartuMetode judul="Metode Rumus" warna="rumus">
        {rumus.map((anak) => (
          <p key={anak} className="text-base font-black leading-8 text-[#1C01A5]"><Teks anak={anak} /></p>
        ))}
        {hitung.map((anak) => (
          <p key={anak} className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>
        ))}
      </KartuMetode>
    </div>
  );
}

function SoalLatihan({ anak, id, periksa, jawaban, tanya = "" }: { anak: string; id: string; periksa: (teks: string) => boolean; jawaban: string; tanya?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>
      <KotakJawaban id={id} soal={tanya} periksa={periksa} umpan="" jawaban={jawaban} />
    </div>
  );
}

function KotakJawaban({ id, soal = "", periksa, umpan, jawaban }: { id: string; soal?: string; periksa: (teks: string) => boolean; umpan: string; jawaban?: string }) {
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
      <label className="block text-sm font-bold leading-8 text-slate-800">
        {soal ? <Teks anak={soal} /> : null}
        <input aria-label={soal || "Jawaban"} value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className={`${soal ? "mt-2" : ""} w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900`} />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
        {jawaban ? <button type="button" onClick={() => setBukaJawaban((terbuka) => !terbuka)} className="rounded-full border border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5]" aria-expanded={bukaJawaban}>Jawaban</button> : null}
      </div>
      {bukaJawaban && jawaban ? (
        <div className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-sm font-semibold leading-8 text-slate-800">
          <p className="font-black text-[#1C01A5]">Langkah penyelesaian</p>
          <p><Teks anak={jawaban} /></p>
        </div>
      ) : null}
      {status === "benar" ? <p className="text-sm font-bold leading-8 text-emerald-800">Benar. <Teks anak={umpan} /></p> : null}
      {status === "salah" ? <p className="text-sm font-bold text-rose-700">Belum tepat. Hitung lagi dari angka pada soal.</p> : null}
    </div>
  );
}

function LembaranEvaluasi() {
  const kuis = useKuisMateri();
  const skor = Array.from({ length: 10 }, (_, indeks) => kuis?.sudahBenar(idKuis("F", indeks))).filter(Boolean).length;
  return (
    <section className="space-y-3">
      <JudulBagian anak="Lembaran Evaluasi" />
      <p className="text-sm font-semibold leading-8 text-slate-800">Sepuluh soal. Modelnya berganti: deret, angka hilang, analogi, mana yang beda, dan perbandingan. Angkanya tidak sama dengan contoh bab.</p>
      <p className="text-sm font-black text-[#1C01A5]">Benar {skor} dari 10.</p>
      <SoalLatihan anak="1. Deret. 3 : 4 , 6 : 8 , 9 : 12 , ... Rasio berikutnya?" id={idKuis("F", 0)} periksa={(teks) => rasio(teks, "12", "16")} jawaban="Pembilang bertambah 3, penyebut bertambah 4. Berikutnya 12 : 16." />
      <SoalLatihan anak="2. Angka hilang. 5 : 8 = 15 : ☐. Tuliskan angka di kotak kosong." id={idKuis("F", 1)} periksa={(teks) => angkaUtuh(teks, "24")} jawaban="15 : 5 = 3. Kedua ruas dikali 3. 8 × 3 = 24. Jawabannya 24." />
      <SoalLatihan anak="3. Analogi. 9 : 12 sederhana menjadi 3 : 4. Maka 14 : 21 sederhana menjadi ..." id={idKuis("F", 2)} periksa={(teks) => rasio(teks, "2", "3")} jawaban="14 dan 21 dibagi 7. Jawabannya 2 : 3." />
      <SoalLatihan anak="4. Mana yang beda? 6 : 10 ; 9 : 15 ; 12 : 20 ; 8 : 14." id={idKuis("F", 3)} periksa={(teks) => rasio(teks, "8", "14") || rasio(teks, "4", "7")} jawaban="6 : 10, 9 : 15, dan 12 : 20 sama dengan 3 : 5. 8 : 14 sama dengan 4 : 7. Jawabannya 8 : 14." />
      <SoalLatihan anak="5. 9 pensil berharga Rp18.000. Berapa harga 1 pensil?" id={idKuis("F", 4)} periksa={(teks) => angkaUtuh(teks, "2000")} jawaban="18.000 : 9 = 2.000. Jawabannya Rp2.000." />
      <SoalLatihan anak="6. Rasio dua kelompok 5 : 3. Jumlah semuanya 48. Berapa banyak kelompok pertama?" id={idKuis("F", 5)} periksa={(teks) => angkaUtuh(teks, "30")} jawaban="5 + 3 = 8 bagian. 48 : 8 = 6. Kelompok pertama 5 × 6 = 30." />
      <SoalLatihan anak="7. 5 km ditempuh dalam 15 menit. Berapa km dalam 1 jam?" id={idKuis("F", 6)} periksa={(teks) => angkaUtuh(teks, "20")} jawaban="15 menit ada 4 kali dalam 60 menit. 5 × 4 = 20. Jawabannya 20 km." />
      <SoalLatihan anak="8. 9 : 15 senilai dengan ☐ : 5. Tuliskan angka di kotak kosong." id={idKuis("F", 7)} periksa={(teks) => angkaUtuh(teks, "3")} jawaban="9 : 15 dibagi 3 menjadi 3 : 5. Angka yang hilang 3." />
      <SoalLatihan anak="9. Mana harga satuan yang paling murah? 3 buah Rp9.000 ; 4 buah Rp10.000 ; 6 buah Rp16.200." id={idKuis("F", 8)} periksa={(teks) => angkaUtuh(teks, "4") || angkaUtuh(teks, "2500")} jawaban="3 buah berarti Rp3.000 per buah. 4 buah berarti Rp2.500. 6 buah berarti Rp2.700. Yang paling murah 4 buah." />
      <SoalLatihan anak="10. Deret. 2 jam = 10 km. 3 jam = 15 km. 4 jam = ..." id={idKuis("F", 9)} periksa={(teks) => angkaUtuh(teks, "20")} jawaban="Tiap jam bertambah 5 km. 4 × 5 = 20. Jawabannya 20 km." />
    </section>
  );
}

export default function NaskahMtk6Bab2(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 2</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">Rasio</h1>
        <p className="text-sm font-semibold text-slate-700">Urutan kegiatan mengikuti buku siswa: tujuan, peta konsep, permasalahan, pembahasan, latihan, refleksi, uji kompetensi, lalu pengayaan.</p>
      </header>

      <section className="space-y-3">
        <JudulBagian anak="Pembuka Bab" />
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Agam ikut menanam di kebun sekolah. Di sisi kiri ada 4 pohon pucuk merah. Di sisi kanan ada 6 pohon cemara. Guru meminta kedua banyak itu ditulis sebagai pasangan, bukan hanya disebut lebih banyak.</p>}
          permasalahan={<p><Teks anak="Tuliskan rasio pohon pucuk merah terhadap pohon cemara, lalu sederhanakan." /></p>}
          logika={<p><Teks anak="Rasio menulis dua banyak berurutan. Pucuk merah disebut lebih dulu, jadi 4 ditulis di kiri. Kedua angka dibagi faktor yang sama." /></p>}
          langkah={
            <HitungRasio
              kalimat="4 : 6 = 2 : 3."
              kolom={["Pucuk merah", "Cemara"]}
              baris={[["4", "6"], [": 2", ": 2"], ["2", "3"]]}
              rumus={["a : b = (a : n) : (b : n)"]}
              hitung={["4 : 6 = (4 : 2) : (6 : 2) = 2 : 3."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Agam menukar urutan kalimat. Ia menulis cemara lebih dulu, lalu pucuk merah. Pasangannya berubah arti.</p>}
          permasalahan={<p><Teks anak="Berapa rasio cemara terhadap pucuk merah?" /></p>}
          logika={<p><Teks anak="Urutan rasio mengikuti urutan kalimat. 6 : 4 tidak sama artinya dengan 4 : 6." /></p>}
          langkah={
            <HitungRasio
              kalimat="6 : 4 = 3 : 2."
              kolom={["Cemara", "Pucuk merah"]}
              baris={[["6", "4"], [": 2", ": 2"], ["3", "2"]]}
              rumus={["a : b = (a : n) : (b : n)"]}
              hitung={["6 : 4 = (6 : 2) : (4 : 2) = 3 : 2."]}
            />
          }
        />
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Tujuan Pembelajaran" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Menyatakan rasio dua besaran dan memakai bahasa rasio.</li>
          <li>Menentukan kesamaan rasio dengan tabel.</li>
          <li>Menentukan rasio satuan.</li>
          <li>Menentukan rasio bagian terhadap bagian dan terhadap keseluruhan, termasuk pada durasi waktu.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pertanyaan Pemantik" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Bagaimana dua besaran yang berbeda ditulis sebagai rasio?</li>
          <li>Bagaimana perkalian dan pembagian menyelesaikan rasio?</li>
          <li>Bagaimana sebuah soal dipindah ke tabel rasio?</li>
          <li>Bagaimana faktor bilangan dipakai untuk menyederhanakan rasio?</li>
          <li>Bagaimana rasio satuan ditentukan?</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Kata Kunci" />
        <p className="text-sm font-semibold text-slate-800">Rasio, kesamaan rasio, rasio satuan, rasio bagian, tabel rasio, durasi waktu.</p>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Peta Konsep" />
        <p className="text-sm font-semibold text-slate-800">Rasio terbagi menjadi konsep rasio, kesamaan rasio, dan penerapan rasio. Penerapan mencakup rasio bagian serta rasio pada durasi waktu.</p>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="Ayo Mengingat" />
        <PolaCerita
          adegan={<p>Agam membuka catatan lama. Ia membedakan faktor dan kelipatan sebelum menyederhanakan pasangan angka.</p>}
          permasalahan={<p><Teks anak="Sebutkan faktor 12. Sebutkan tiga kelipatan 4." /></p>}
          logika={<p><Teks anak="Faktor membagi habis. Kelipatan didapat dari mengalikan. Faktor dipakai untuk memperkecil rasio. Kelipatan dipakai untuk memperbesar rasio." /></p>}
          langkah={<p><Teks anak="Faktor 12: 1, 2, 3, 4, 6, 12. Kelipatan 4: 4, 8, 12." /></p>}
        />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Konsep Rasio" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Membandingkan Benda</h3>
        <PolaCerita
          adegan={<p>Di taman hiburan, antrean roller coaster ada 24 orang. Antrean komidi putar ada 18 orang. Agam ingin tahu antrean mana yang lebih panjang.</p>}
          permasalahan={<p><Teks anak="Mana yang lebih banyak, 24 atau 18?" /></p>}
          logika={<p><Teks anak="Dua bilangan sejenis dibanding langsung. Belum perlu ditulis sebagai rasio." /></p>}
          langkah={<p><Teks anak="24 lebih besar dari 18. Antrean roller coaster lebih panjang." /></p>}
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Pengertian Rasio</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Agam menulis kedua antrean sebagai pasangan. Roller coaster disebut lebih dulu.</p>}
          permasalahan={<p><Teks anak="Tuliskan rasio pengunjung roller coaster terhadap komidi putar, lalu sederhanakan." /></p>}
          logika={<p><Teks anak="24 dan 18 sama-sama habis dibagi 6. Bentuk sederhananya tetap menyimpan urutan yang sama." /></p>}
          langkah={
            <HitungRasio
              kalimat="24 : 18 = 4 : 3."
              kolom={["Roller coaster", "Komidi putar"]}
              baris={[["24", "18"], [": 6", ": 6"], ["4", "3"]]}
              rumus={["a : b = (a : n) : (b : n)"]}
              hitung={["24 : 18 = (24 : 6) : (18 : 6) = 4 : 3."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Kebun akan ditambah. Setiap 2 pucuk merah tetap bersama 3 cemara. Pucuk merah yang baru ada 14 pohon.</p>}
          permasalahan={<p><Teks anak="Jika pucuk merah 14, berapa cemara yang ditanam?" /></p>}
          logika={<p><Teks anak="14 adalah 2 dikali 7. Cemara juga dikali 7 supaya rasio tidak berubah." /></p>}
          langkah={
            <HitungRasio
              kalimat="2 : 3 = 14 : 21."
              kolom={["Pucuk merah", "Cemara"]}
              baris={[["2", "3"], ["× 7", "× 7"], ["14", "21"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["2 : 3 = (2 × 7) : (3 × 7) = 14 : 21."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Pagi hari Agam menyiapkan 6 liter minuman untuk 15 teman. Siang hari teman yang datang hanya 10. Ia ingin minuman tiap orang tetap sama.</p>}
          permasalahan={<p><Teks anak="Berapa liter untuk 10 orang?" /></p>}
          logika={<p><Teks anak="6 : 15 disederhanakan dulu menjadi 2 : 5. Sepuluh orang adalah 5 dikali 2, jadi liternya juga dikali 2." /></p>}
          langkah={
            <HitungRasio
              kalimat="6 : 15 = 2 : 5 = 4 : 10."
              kolom={["Liter", "Orang"]}
              baris={[["6", "15"], [": 3", ": 3"], ["2", "5"], ["× 2", "× 2"], ["4", "10"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["6 : 15 = 2 : 5. 2 : 5 = (2 × 2) : (5 × 2) = 4 : 10."]}
            />
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Tuliskan bentuk paling sederhana dari 16 : 28." id={idKuis("A", 0)} periksa={(teks) => rasio(teks, "4", "7")} jawaban="16 dan 28 dibagi 4. Jawabannya 4 : 7." />
        <SoalLatihan anak="2. Rasio pengunjung bianglala terhadap roller coaster adalah 4 : 3. Roller coaster ada 24 orang. Berapa pengunjung bianglala?" id={idKuis("A", 1)} periksa={(teks) => angkaUtuh(teks, "32")} jawaban="24 : 3 = 8. Bianglala 4 × 8 = 32 orang." />
        <SoalLatihan anak="3. Rumah hantu dibanding komidi putar adalah 2 : 6. Komidi putar ada 18 orang. Berapa pengunjung rumah hantu?" id={idKuis("A", 2)} periksa={(teks) => angkaUtuh(teks, "6")} jawaban="2 : 6 = 1 : 3. 18 : 3 = 6. Jawabannya 6 orang." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Kesamaan Rasio" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Kesamaan Rasio</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Satu lahan 10 m² diperkirakan memuat 12 bibit. Agam mencari bentuk paling sederhananya.</p>}
          permasalahan={<p><Teks anak="Sederhanakan rasio 10 : 12." /></p>}
          logika={<p><Teks anak="10 dan 12 habis dibagi 2. Membagi kedua ruas dengan bilangan yang sama tidak mengubah rasio." /></p>}
          langkah={
            <HitungRasio
              kalimat="10 : 12 = 5 : 6."
              kolom={["Luas (m²)", "Bibit"]}
              baris={[["10", "12"], [": 2", ": 2"], ["5", "6"]]}
              rumus={["a : b = (a : n) : (b : n)"]}
              hitung={["10 : 12 = (10 : 2) : (12 : 2) = 5 : 6."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Lahan yang tersedia 25 m². Agam memakai rasio sederhana 5 : 6 agar bibitnya tetap sepadan.</p>}
          permasalahan={<p><Teks anak="Berapa bibit untuk lahan 25 m²?" /></p>}
          logika={<p><Teks anak="25 adalah 5 dikali 5. Bibit pada ruas 6 juga dikali 5." /></p>}
          langkah={
            <HitungRasio
              kalimat="5 : 6 = 25 : 30."
              kolom={["Luas (m²)", "Bibit"]}
              baris={[["5", "6"], ["× 5", "× 5"], ["25", "30"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["5 : 6 = (5 × 5) : (6 × 5) = 25 : 30."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Agam memeriksa dua pasangan lain dari 10 : 12. Satu diperbesar, satu diperkecil.</p>}
          permasalahan={<p><Teks anak="Tunjukkan bahwa 30 : 36 dan 5 : 6 senilai dengan 10 : 12." /></p>}
          logika={<p><Teks anak="Mengali kedua ruas dengan 3, atau membagi kedua ruas dengan 2, menghasilkan rasio yang sama." /></p>}
          langkah={
            <HitungRasio
              kalimat="10 : 12 = 30 : 36 = 5 : 6."
              kolom={["Kiri", "Kanan"]}
              baris={[["10", "12"], ["× 3 menjadi 30", "× 3 menjadi 36"], [": 2 menjadi 5", ": 2 menjadi 6"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["10 : 12 = (10 × 3) : (12 × 3) = 30 : 36. 10 : 12 = (10 : 2) : (12 : 2) = 5 : 6."]}
            />
          }
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Rasio Satuan</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Ibu membandingkan dua kemasan bibit jahe. Tiga bibit berharga Rp37.500. Lima bibit berharga Rp58.000. Harga kemasan saja belum menunjukkan yang lebih murah.</p>}
          permasalahan={<p><Teks anak="Berapa harga satu bibit pada kemasan 3 dan pada kemasan 5?" /></p>}
          logika={<p><Teks anak="Rasio satuan mencari nilai untuk satu benda. Bagi harga dengan banyak bibit." /></p>}
          langkah={
            <>
              <p><Teks anak="37.500 : 3 = 12.500. Satu bibit pada kemasan tiga berharga Rp12.500." /></p>
              <p><Teks anak="58.000 : 5 = 11.600. Satu bibit pada kemasan lima berharga Rp11.600." /></p>
              <p><Teks anak="Rp11.600 lebih kecil dari Rp12.500. Kemasan lima lebih murah untuk setiap bibit." /></p>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Enam bibit perlu 1,5 jam untuk dikemas. Agam ingin tahu berapa bibit selesai dalam satu jam.</p>}
          permasalahan={<p><Teks anak="Berapa bibit per jam, dan berapa bibit dalam 4 jam?" /></p>}
          logika={<p><Teks anak="1,5 jam sama dengan 3/2 jam. Bagi 6 dengan 3/2 supaya ketemu nilai untuk 1 jam." /></p>}
          langkah={
            <HitungRasio
              kalimat="6 bibit dalam 1,5 jam = 4 bibit dalam 1 jam."
              kolom={["Bibit", "Jam"]}
              baris={[["6", "1,5"], [": 1,5", ": 1,5"], ["4", "1"], ["× 4", "× 4"], ["16", "4"]]}
              rumus={["satuan = jumlah : banyak"]}
              hitung={["6 : 1,5 = 4. Jadi 4 bibit tiap jam. 4 × 4 = 16 bibit dalam 4 jam."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Resep wedang jahe untuk 4 liter air memakai 12 jahe merah, 8 batang serai, dan 4 lemon. Agam akan membuat 8 liter.</p>}
          permasalahan={<p><Teks anak="Berapa jahe, serai, dan lemon untuk 8 liter?" /></p>}
          logika={<p><Teks anak="8 liter adalah 4 liter dikali 2. Setiap bahan juga dikali 2." /></p>}
          langkah={
            <HitungRasio
              kalimat="4 liter menjadi 8 liter, jadi setiap bahan dikali 2."
              kolom={["Bahan", "4 liter", "8 liter"]}
              baris={[["Jahe", "12", "24"], ["Serai", "8", "16"], ["Lemon", "4", "8"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["12 × 2 = 24 jahe. 8 × 2 = 16 serai. 4 × 2 = 8 lemon."]}
            />
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Untuk 1 cangkir 250 ml, Ibu memakai 1 sendok kopi dan 2 sendok gula. Dona memakai 4 sendok kopi dan 10 sendok gula untuk 1 liter. Rasanya bagaimana?" id={idKuis("B", 0)} periksa={(teks) => { const s = teks.toLowerCase(); return s.includes("manis") && !s.includes("tidak") && !s.includes("pahit"); }} jawaban="1 liter sama dengan 4 cangkir. Resep Ibu untuk 1 liter adalah 4 sendok kopi dan 8 sendok gula. Dona kopinya sama, gulanya 10. Jawabannya terlalu manis." />
        <SoalLatihan anak="2. Satu kotak berisi 15 pena seharga Rp36.000. Berapa harga 1 pena?" id={idKuis("B", 1)} periksa={(teks) => angkaUtuh(teks, "2400")} jawaban="36.000 : 15 = 2.400. Jawabannya Rp2.400." />
        <SoalLatihan anak="3. Harga 1 pena Rp2.400. Berapa harga 5 pena?" id={idKuis("B", 2)} periksa={(teks) => angkaUtuh(teks, "12000")} jawaban="5 × 2.400 = 12.000. Jawabannya Rp12.000." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Penerapan Rasio" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Rasio Bagian terhadap Bagian dan terhadap Keseluruhan</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Sebuah toko bibit mencatat penjualan bulan ini. Tanaman hias dibanding tanaman obat adalah 4 : 5. Seluruh bibit yang terjual ada 72.</p>}
          permasalahan={<p><Teks anak="Berapa tanaman hias dan berapa tanaman obat yang terjual?" /></p>}
          logika={<p><Teks anak="4 + 5 = 9 bagian. 72 dibagi 9, lalu tiap jenis dikali banyak bagiannya." /></p>}
          langkah={
            <HitungRasio
              kalimat="4 : 5 dari 72 menjadi 32 dan 40."
              kolom={["Hias", "Obat", "Total"]}
              baris={[["4", "5", "9"], ["× 8", "× 8", "× 8"], ["32", "40", "72"]]}
              rumus={["bagian = total : (a + b) × a"]}
              hitung={["72 : 9 = 8. Hias 4 × 8 = 32. Obat 5 × 8 = 40."]}
            />
          }
        />
        <PolaCerita
          adegan={<p>Agam sekarang membandingkan tiap jenis dengan seluruh penjualan, bukan dengan jenis yang lain.</p>}
          permasalahan={<p><Teks anak="Tuliskan rasio tanaman hias terhadap seluruh bibit, dan rasio tanaman obat terhadap seluruh bibit." /></p>}
          logika={<p><Teks anak="Seluruh bibit adalah 9 bagian. Hias 4 bagian dari 9. Obat 5 bagian dari 9." /></p>}
          langkah={<p><Teks anak="Hias terhadap seluruhnya 32 : 72 = 4 : 9. Obat terhadap seluruhnya 40 : 72 = 5 : 9." /></p>}
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Rasio pada Durasi Waktu</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Agam mengelompokkan bibit menurut masa panen. Jahe merah 3 bulan. Kumis kucing 12 minggu. Satuan keduanya belum sama.</p>}
          permasalahan={<p><Teks anak="Apakah 3 bulan sama dengan 12 minggu?" /></p>}
          logika={<p><Teks anak="Samakan satuannya dulu. 1 bulan dihitung 4 minggu." /></p>}
          langkah={<p><Teks anak="3 × 4 = 12 minggu. Jahe merah dan kumis kucing sama-sama 12 minggu." /></p>}
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Banyu berjalan 1 km dalam 30 menit. Ia menjaga kecepatan yang sama.</p>}
          permasalahan={<p><Teks anak="Berapa km dalam 1 jam? Berapa jam untuk 9 km?" /></p>}
          logika={<p><Teks anak="1 jam berisi dua kali 30 menit. Untuk 9 km, lihat berapa kali 2 km muat di dalamnya." /></p>}
          langkah={
            <HitungRasio
              kalimat="1 km dalam 30 menit = 2 km dalam 60 menit."
              kolom={["Jarak (km)", "Waktu"]}
              baris={[["1", "30 menit"], ["× 2", "× 2"], ["2", "1 jam"], ["× 4,5", "× 4,5"], ["9", "4,5 jam"]]}
              rumus={["a : b = (a × k) : (b × k)"]}
              hitung={["1 × 2 = 2 km tiap jam. 9 : 2 = 4,5 jam."]}
            />
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Lengkuas dipanen dalam 1,5 tahun. Agam ingin menulis masa itu dalam bulan supaya mudah dibanding dengan kencur yang 6 bulan.</p>}
          permasalahan={<p><Teks anak="Berapa bulan dalam 1,5 tahun?" /></p>}
          logika={<p><Teks anak="1 tahun berisi 12 bulan. Setengah tahun berisi 6 bulan." /></p>}
          langkah={<p><Teks anak="1,5 × 12 = 18. Lengkuas dipanen dalam 18 bulan." /></p>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Pengunjung pasar malam 390 orang. Setiap 9 anak-anak terdapat 4 orang dewasa. Berapa anak-anak?" id={idKuis("C", 0)} periksa={(teks) => angkaUtuh(teks, "270")} jawaban="9 + 4 = 13 bagian. 390 : 13 = 30. Anak-anak 9 × 30 = 270." />
        <SoalLatihan anak="2. Kecepatan Banyu 2 km tiap jam. Berapa jam untuk 6 km?" id={idKuis("C", 1)} periksa={(teks) => angkaUtuh(teks, "3")} jawaban="6 : 2 = 3. Jawabannya 3 jam." />
        <SoalLatihan anak="3. Tuliskan 1,5 tahun sebagai bulan." id={idKuis("C", 2)} periksa={(teks) => angkaUtuh(teks, "18")} jawaban="1,5 × 12 = 18. Jawabannya 18 bulan." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Refleksi" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Apakah kamu sudah dapat menjelaskan arti sebuah rasio?</li>
          <li>Apakah kamu dapat menulis rasio dari dua besaran?</li>
          <li>Apakah kamu dapat menulis rasio lain yang senilai?</li>
          <li>Apakah kamu dapat menentukan rasio satuan?</li>
        </ul>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <KotakJawaban id={idKuis("D", 0)} soal="Klub sains 16 anggota dan klub seni 24 anggota. Tuliskan perbandingan paling sederhana." periksa={(teks) => rasio(teks, "2", "3")} umpan="16 : 24 dibagi 8 menjadi 2 : 3." />
        <KotakJawaban id={idKuis("D", 1)} soal="Seni ada 24 anggota. Olahraga dibanding seni adalah 3 : 2. Berapa anggota olahraga?" periksa={(teks) => angkaUtuh(teks, "36")} umpan="24 adalah 2 bagian, jadi 1 bagian 12. Olahraga 3 × 12 = 36." />
        <KotakJawaban id={idKuis("D", 2)} soal="Olahraga ada 36 anggota. Olahraga dibanding robotik adalah 4 : 3. Berapa anggota robotik?" periksa={(teks) => angkaUtuh(teks, "27")} umpan="36 : 4 = 9. Robotik 3 × 9 = 27." />
        <KotakJawaban id={idKuis("D", 3)} soal="Dony memakai 30 ml sirup untuk 2 sendok susu. Hana memakai 65 ml untuk 5 sendok. Susu siapa yang lebih terasa cokelat?" periksa={(teks) => teks.toLowerCase().includes("dony")} umpan="30 : 2 = 15 ml tiap sendok. 65 : 5 = 13 ml tiap sendok. Dony lebih cokelat." />
        <KotakJawaban id={idKuis("D", 4)} soal="Novel dibanding komik adalah 11 : 4. Seluruh buku ada 120. Berapa novel?" periksa={(teks) => angkaUtuh(teks, "88")} umpan="11 + 4 = 15. 120 : 15 = 8. Novel 11 × 8 = 88. Komik 4 × 8 = 32." />
      </section>

      <section className="space-y-3 border-t-4 border-amber-400 pt-6">
        <JudulBagian anak="Pengayaan" />
        <p className="text-sm font-semibold text-slate-800">Bagian ini terpisah dari soal inti. Dipakai untuk rasio senilai, pupuk yang hasilnya pecahan, dan durasi mengetik.</p>
        <PolaCerita
          adegan={<p>Agam mencari rasio lain yang senilai dengan 12 : 28.</p>}
          permasalahan={<p><Teks anak="Tuliskan bentuk paling sederhana dari 12 : 28." /></p>}
          logika={<p><Teks anak="12 dan 28 habis dibagi 4." /></p>}
          langkah={
            <HitungRasio
              kalimat="12 : 28 = 3 : 7."
              kolom={["Kiri", "Kanan"]}
              baris={[["12", "28"], [": 4", ": 4"], ["3", "7"]]}
              rumus={["a : b = (a : n) : (b : n)"]}
              hitung={["12 : 28 = (12 : 4) : (28 : 4) = 3 : 7."]}
            />
          }
        />
        <PolaCerita
          adegan={<p>Untuk 2 bibit diperlukan 5 gram pupuk. Agam akan menanam 11 bibit. Hasilnya tidak bulat.</p>}
          permasalahan={<p><Teks anak="Berapa gram pupuk untuk 11 bibit?" /></p>}
          logika={<p><Teks anak="Pupuk tiap bibit adalah 5 : 2 gram. Untuk 11 bibit, kalikan 11 dengan 5/2." /></p>}
          langkah={<p><Teks anak="11 × 5 / 2 = 55/2 = 27,5. Pupuk yang diperlukan 27,5 gram." /></p>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Tuliskan bentuk paling sederhana dari 12 : 28." id={idKuis("E", 0)} periksa={(teks) => rasio(teks, "3", "7")} jawaban="12 dan 28 dibagi 4. Jawabannya 3 : 7." />
        <SoalLatihan anak="2. 2 bibit perlu 5 gram pupuk. Berapa gram untuk 11 bibit?" id={idKuis("E", 1)} periksa={(teks) => desimalUtuh(teks, "27.5") || desimalUtuh(teks, "27.50")} jawaban="11 × 5 / 2 = 27,5. Jawabannya 27,5 gram." />
        <SoalLatihan anak="3. Seseorang mengetik 1.200 kata dalam 1 jam. Berapa menit untuk 3.000 kata?" id={idKuis("E", 2)} periksa={(teks) => angkaUtuh(teks, "150")} jawaban="3.000 : 1.200 = 2,5 jam. 2,5 × 60 = 150 menit." />
      </section>

      <LembaranEvaluasi />
    </article>
  );
}
