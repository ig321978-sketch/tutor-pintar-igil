"use client";

import KartuPoinPenting from "@/components/KartuPoinPenting";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import PetaContoh from "@/components/PetaContoh";
import TujuanBelajar from "@/components/TujuanBelajar";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import {
  Adegan,
  Dialog,
  KepalaKartu,
  KartuBingkai,
  KuisBenarSalah,
  KuisCocok,
  KuisSuara,
  Papan,
  Pilih,
  SusunToken,
  TulisBebas,
  cuplikanKalimat,
} from "@/components/modul/KerangkaNaskahMtk5";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB1, TEMA_MTK5_BAB1 } from "@/lib/misi-mtk-5-bab1";
import { MODUL_MTK5_BAB1 } from "@/lib/modul-resmi-mtk-5-bab1";
import {
  baca15590,
  baca26932,
  bagi140,
  kurang27750,
  lebih54675,
  nilai7000,
  tambah20825,
  tulis26932,
  tulis87986,
  urai35247,
  urut13456,
} from "@/lib/nilai-mtk-5-bab1";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState } from "react";

const ID = MODUL_MTK5_BAB1.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

const BACAAN_HARGA = [
  "dua puluh enam ribu sembilan ratus tiga puluh dua",
  "lima belas ribu lima ratus sembilan puluh",
  "delapan puluh tujuh ribu sembilan ratus delapan puluh enam",
];

const HASIL_OPERASI = ["20.825", "500", "140"];

function MainRakNilaiTempat({ id }: { id: string }) {
  const kuis = useKuisMateri();
  const target = [3, 5, 2, 4, 7];
  const label = ["Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
  const [isi, setIsi] = useState<(number | null)[]>([null, null, null, null, null]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Main susun rak</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Susun bilangan 35.247. Pilih angka, lalu ketuk rak yang ingin diisi.
      </p>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {label.map((nama, indeks) => (
          <button
            key={nama}
            type="button"
            onClick={() => {
              if (pilih === null) return;
              const baru = [...isi];
              baru[indeks] = pilih;
              setIsi(baru);
              setStatus(null);
            }}
            className="rounded-xl border-2 border-dashed border-sky-300 bg-sky-50 px-1 py-2 text-center"
          >
            <span className="block text-[9px] font-black leading-tight text-slate-500">{nama}</span>
            <span className="text-2xl font-black text-[#1C01A5]">{isi[indeks] ?? "·"}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPilih(n)}
            className={`rounded-full px-3 py-1 text-sm font-black ${
              pilih === n ? "bg-[#1C01A5] text-white" : "bg-amber-100 text-[#1C01A5]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            const ok = isi.every((n, i) => n === target[i]);
            setStatus(ok ? "benar" : "salah");
            if (ok) kuis?.tandaiBenar(id);
          }}
          className="flex-1 rounded-xl bg-[#16A34A] px-3 py-2 text-sm font-black text-white"
        >
          Periksa rak
        </button>
        <button
          type="button"
          onClick={() => {
            setIsi([null, null, null, null, null]);
            setPilih(null);
            setStatus(null);
          }}
          className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Reset
        </button>
      </div>
      {status === "benar" ? (
        <p className="mt-2 text-center text-sm font-bold text-emerald-800">Tepat! 35.247 sudah rapi di rak.</p>
      ) : null}
      {status === "salah" ? (
        <p className="mt-2 text-center text-sm font-bold text-rose-700">
          Coba lagi. 3 puluh ribuan, 5 ribuan, 2 ratusan, 4 puluhan, 7 satuan.
        </p>
      ) : null}
    </article>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB1.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🛒👧👦🦉"
        judul={kartu.judul}
        anak="Lila, Rafi, dan Igil di Pasar Numerika"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Membaca dan menulis bilangan cacah sampai 100.000.",
          "Menentukan nilai tempat sampai 100.000.",
          "Membandingkan dan mengurutkan bilangan sampai 100.000.",
          "Menyusun dan mengurai bilangan sampai 100.000.",
          "Menghitung penjumlahan, pengurangan, perkalian, dan pembagian sampai 100.000.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab A · Membaca, menulis, dan nilai tempat"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Lima rak: puluh ribuan, ribuan, ratusan, puluhan, satuan.",
            "Titik hanya pemisah ribuan, bukan angka.",
          ]}
          banner={{
            ikon: "🏷️🧃🦉",
            judul: "Harga di etalase",
            anak: "Lila membaca harga jus dan jumlah penduduk di papan pasar.",
          }}
        >
          <Dialog nama="Lila" anak="Papan menulis 26.932 jiwa di Kecamatan Kayu Tanam." />
          <Dialog nama="Rafi" anak="Aku baca dua-enam-sembilan-tiga-dua. Apa itu benar?" />
          <Dialog nama="Igil" anak="Bacanya utuh: dua puluh enam ribu sembilan ratus tiga puluh dua." />
          <Dialog nama="Lila" anak="Pada 87.986, angka 7 berdiri di rak ribuan. Nilainya 7.000." />
          <Dialog nama="Rafi" anak="Harga jus Rp15.590. Bacanya lima belas ribu lima ratus sembilan puluh." />
          <Dialog nama="Igil" anak="Rak yang kosong tetap ditulis nol, tetapi tidak perlu disebut saat membaca." />
          <Papan anak={"26.932 = dua puluh enam ribu sembilan ratus tiga puluh dua\n87.986 → angka 7 bernilai 7.000"} />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Baca bilangan 26.932 dengan lengkap."
            periksa={baca26932}
            petunjuk="Sebutkan dari puluh ribuan sampai satuan."
            benar="Dua puluh enam ribu sembilan ratus tiga puluh dua."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Tulis dari bacaan"
            visual={<Papan anak="dua puluh enam ribu sembilan ratus tiga puluh dua" />}
            pertanyaan="Tulis angkanya."
            pesanSalah="Ada lima digit. Pakai titik pemisah ribuan jika perlu."
            bantuan="26.932."
            umpan="26.932."
            periksa={tulis26932}
            alias={["26932", "26.932"]}
            konteks="Dua puluh enam ribu sembilan ratus tiga puluh dua ditulis 26.932."
          />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Lima rak</p>
          <PetaContoh
            pusat="87.986"
            cabang={[
              { ikon: "👀", judul: "Baca", isi: "delapan puluh tujuh ribu…" },
              { ikon: "7️⃣", judul: "Angka 7", isi: "nilai 7.000" },
              { ikon: "0️⃣", judul: "Titik", isi: "hanya pemisah" },
            ]}
            kolom={["Puluh rb", "Ribuan", "Ratusan", "Puluhan", "Satuan"]}
            baris={[["8", "7", "9", "8", "6"]]}
          />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Berapa nilai angka 7 pada 87.986?"
            periksa={nilai7000}
            petunjuk="Cari raknya dulu."
            benar="7.000, karena ada di rak ribuan."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Tulis bilangan"
            visual={<Papan anak="delapan puluh tujuh ribu sembilan ratus delapan puluh enam" />}
            pertanyaan="Tulis angkanya."
            pesanSalah="Lima digit. Mulai dari 8."
            bantuan="87.986."
            umpan="87.986."
            periksa={tulis87986}
            alias={["87986", "87.986"]}
            konteks="Delapan puluh tujuh ribu sembilan ratus delapan puluh enam."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab B · Membandingkan dan mengurutkan"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Bandingkan dari kiri. Rak yang lebih besar menang.",
            "Urutkan dari yang paling kecil ke paling besar.",
          ]}
          banner={{
            ikon: "📊🛒🦉",
            judul: "Antrian harga",
            anak: "Rafi menyusun harga buah dari yang paling murah.",
          }}
        >
          <Dialog nama="Rafi" anak="40.350 dan 54.675. Mana yang lebih besar?" />
          <Dialog nama="Lila" anak="Puluh ribuan 5 lebih besar dari 4. Jadi 54.675 lebih besar." />
          <Dialog nama="Igil" anak="Urutan dari kecil: 13.456, 25.786, 40.350, 54.675, 88.976." />
          <Papan anak={"54.675 > 40.350\n13.456 < 25.786 < 40.350 < 54.675 < 88.976"} />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Mana yang lebih besar, 40.350 atau 54.675?"
            periksa={lebih54675}
            petunjuk="Lihat digit paling kiri."
            benar="54.675 lebih besar."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Urutkan dari kecil"
            visual={<Papan anak="40.350 · 13.456 · 25.786" />}
            pertanyaan="Tulis ketiga bilangan dari yang paling kecil."
            pesanSalah="Mulai dari 13.456."
            bantuan="13.456, 25.786, 40.350."
            umpan="13.456, 25.786, 40.350."
            periksa={urut13456}
            alias={["13456", "25786", "40350"]}
            konteks="Urutan dari kecil: 13.456, 25.786, 40.350."
          />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Banding dari kiri</p>
          <PetaContoh
            pusat="Dari kiri"
            cabang={[
              { ikon: "1️⃣", judul: "Puluh rb beda", isi: "berhenti di sini" },
              { ikon: "2️⃣", judul: "Sama", isi: "lanjut ke kanan" },
              { ikon: "🏆", judul: "Hasil", isi: "54.675 lebih besar" },
            ]}
            kolom={["Bilangan", "Puluh rb", "Kesimpulan"]}
            baris={[
              ["54.675", "5", "lebih besar"],
              ["40.350", "4", "lebih kecil"],
            ]}
          />
        </Adegan>

        <Adegan
          judul="Sub-bab C · Komposisi dan dekomposisi"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Menyusun berarti menggabungkan nilai rak menjadi satu bilangan.",
            "Mengurai berarti memecah bilangan ke setiap rak.",
          ]}
          banner={{
            ikon: "🧱💰🦉",
            judul: "Susun uang pasar",
            anak: "Lila menyusun uang tip sesuai rak nilai tempat.",
          }}
        >
          <Dialog nama="Lila" anak="Ada 3 puluh ribuan, 5 ribuan, 2 ratusan, 4 puluhan, dan 7 satuan." />
          <Dialog nama="Rafi" anak="Jadi 30.000 + 5.000 + 200 + 40 + 7." />
          <Dialog nama="Igil" anak="Disusun menjadi 35.247. Rak kosong tetap ada nolnya." />
          <Papan anak={"35.247 = 30.000 + 5.000 + 200 + 40 + 7"} />
          <MainRakNilaiTempat id={idKuis("A", 6)} />
          <p className="text-center text-sm font-bold text-[#1C01A5]">
            Setelah rak benar, bilangannya 35.247.
          </p>
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Urai 35.247"
            visual={<Papan anak="35.247 = ⬜ + ⬜ + ⬜ + ⬜ + ⬜" />}
            pertanyaan="Tulis uraian nilai tempatnya."
            pesanSalah="Mulai dari 30.000."
            bantuan="30.000 + 5.000 + 200 + 40 + 7."
            umpan="30.000 + 5.000 + 200 + 40 + 7."
            periksa={urai35247}
            alias={["30000", "5000", "200", "40", "7"]}
            konteks="35.247 = 30.000 + 5.000 + 200 + 40 + 7."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab D · Operasi hitung sampai 100.000"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Penjumlahan dan pengurangan mulai dari satuan.",
            "Perkalian dan pembagian bisa dicek dengan kebalikannya.",
          ]}
          banner={{
            ikon: "➕➖✖️➗🦉",
            judul: "Kasir pasar",
            anak: "Rafi menghitung total belanja dan sisa uang tip.",
          }}
        >
          <Dialog nama="Rafi" anak="Belanja 12.450 ditambah 8.375." />
          <Dialog nama="Lila" anak="Jumlahnya 20.825." />
          <Dialog nama="Igil" anak="Uang 45.000 dikurangi 17.250 menjadi 27.750." />
          <Dialog nama="Rafi" anak="125 botol dikali 4 rak sama dengan 500. 840 kue dibagi 6 kotak, tiap kotak 140." />
          <Papan anak={"12.450 + 8.375 = 20.825\n45.000 − 17.250 = 27.750\n125 × 4 = 500\n840 ÷ 6 = 140"} />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Berapa 12.450 ditambah 8.375?"
            periksa={tambah20825}
            petunjuk="Jumlahkan dari satuan."
            benar="20.825."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Pengurangan"
            visual={<Papan anak="45.000 − 17.250 = ⬜" />}
            pertanyaan="Tulis hasilnya."
            pesanSalah="Pinjam dari rak kiri jika perlu."
            bantuan="45.000 − 17.250 = 27.750."
            umpan="27.750."
            periksa={kurang27750}
            alias={["27750", "27.750"]}
            konteks="45.000 dikurangi 17.250 sama dengan 27.750."
          />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Empat operasi</p>
          <PetaContoh
            pusat="Hitung rapi"
            cabang={[
              { ikon: "➕", judul: "Jumlah", isi: "20.825" },
              { ikon: "➖", judul: "Selisih", isi: "27.750" },
              { ikon: "✖️", judul: "Kali", isi: "500" },
              { ikon: "➗", judul: "Bagi", isi: "140" },
            ]}
            kolom={["Soal", "Hasil"]}
            baris={[
              ["12.450 + 8.375", "20.825"],
              ["45.000 − 17.250", "27.750"],
              ["125 × 4", "500"],
              ["840 ÷ 6", "140"],
            ]}
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="Harga Rp15.590,00 dibaca..."
          visual={<Papan anak="Rp15.590,00" />}
          pilihan={[
            { huruf: "A", teks: "Lima ribu lima ratus sembilan puluh" },
            { huruf: "B", teks: "Lima belas ribu sembilan puluh" },
            { huruf: "C", teks: "Lima belas ribu lima ratus sembilan puluh" },
            { huruf: "D", teks: "Lima puluh satu ribu lima ratus sembilan puluh" },
          ]}
          benar="C"
          umpan="Lima belas ribu lima ratus sembilan puluh."
          salah="Baca dari puluh ribuan. Ada lima ratus juga."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan bilangan dengan bacaannya."
          baris={[
            { kiri: "26.932", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[0] },
            { kiri: "15.590", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[1] },
            { kiri: "87.986", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[2] },
          ]}
          umpan="Tiga bacaan harga sudah cocok."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun dari yang paling kecil."
          acak={["54.675", "13.456", "40.350", "25.786"]}
          benar={["13.456", "25.786", "40.350", "54.675"]}
          umpan="13.456, 25.786, 40.350, 54.675."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Pilih benar atau salah."
          baris={[
            { teks: "Pada 87.986, angka 7 bernilai 7.000.", benar: true },
            { teks: "40.350 lebih besar dari 54.675.", benar: false },
            { teks: "35.247 = 30.000 + 5.000 + 200 + 40 + 7.", benar: true },
          ]}
          umpan="Pernyataan pertama dan ketiga benar."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="125 × 4 = ..."
          visual={<Papan anak="125 × 4 = ⬜" />}
          pilihan={[
            { huruf: "A", teks: "500" },
            { huruf: "B", teks: "450" },
            { huruf: "C", teks: "525" },
            { huruf: "D", teks: "400" },
          ]}
          benar="A"
          umpan="125 × 4 = 500."
          salah="125 + 125 + 125 + 125."
        />

        <KuisSuara
          id={idKuis("B", 0)}
          pertanyaan="Baca bilangan 15.590."
          periksa={baca15590}
          petunjuk="Lima belas ribu…"
          benar="Lima belas ribu lima ratus sembilan puluh."
        />
        <TulisBebas
          id={idKuis("B", 1)}
          judul="Pembagian"
          visual={<Papan anak="840 ÷ 6 = ⬜" />}
          pertanyaan="Tulis hasilnya."
          pesanSalah="Cari kali yang cocok dengan 6."
          bantuan="6 × 140 = 840."
          umpan="140."
          periksa={bagi140}
          alias={["140"]}
          konteks="840 dibagi 6 sama dengan 140."
        />
        <KuisCocok
          id={idKuis("B", 2)}
          perintah="Pasangkan soal dengan hasilnya."
          baris={[
            { kiri: "12.450 + 8.375", pilihan: HASIL_OPERASI, benar: "20.825" },
            { kiri: "125 × 4", pilihan: HASIL_OPERASI, benar: "500" },
            { kiri: "840 ÷ 6", pilihan: HASIL_OPERASI, benar: "140" },
          ]}
          umpan="Tiga operasi sudah cocok."
        />
        <SusunToken
          id={idKuis("B", 3)}
          perintah="Susun hasil dari yang paling kecil."
          acak={["20.825", "140", "500"]}
          benar={["140", "500", "20.825"]}
          umpan="140, 500, 20.825."
        />
        <KuisBenarSalah
          id={idKuis("B", 4)}
          perintah="Pilih benar atau salah."
          baris={[
            { teks: "12.450 + 8.375 = 20.825.", benar: true },
            { teks: "45.000 − 17.250 = 28.750.", benar: false },
            { teks: "840 ÷ 6 = 140.", benar: true },
          ]}
          umpan="Yang tengah salah. Hasilnya 27.750."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB1.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🛒🦉"
        judul={kartu.judul}
        anak="Sepuluh soal pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Pilih satu pos, lalu jawab. Dua pos suara, dua pos tulis.
      </p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK5_BAB1}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK5_BAB1}
          penutup="Pasar sepi. Igil menempelkan stempel koin."
          bunga="🛒🪙🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB1.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let i = 0; i < 10; i += 1) if (kuis?.sudahBenar(idKuis("D", i))) jumlah += 1;
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Pasar Angka" : skor >= 6 ? "🪙 Penjaga Rak" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9 ? "Hebat! Rak angkamu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru pasar." : "Ayo hitung lagi bersama Igil.";

  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak={`${nama} · Kelas 5 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <KuisSuara
          id={idKuis("D", 0)}
          pertanyaan="1. Baca bilangan 26.932."
          periksa={baca26932}
          petunjuk="Baca dari puluh ribuan."
          benar="Dua puluh enam ribu sembilan ratus tiga puluh dua."
        />
        <TulisBebas
          id={idKuis("D", 1)}
          judul="2. Penjumlahan"
          visual={<Papan anak="12.450 + 8.375 = ⬜" />}
          pertanyaan="Tulis hasilnya."
          pesanSalah="Jumlahkan dari satuan."
          bantuan="20.825."
          umpan="20.825."
          periksa={tambah20825}
          alias={["20825", "20.825"]}
          konteks="12.450 + 8.375 = 20.825."
        />
        <Pilih
          id={idKuis("D", 2)}
          pertanyaan="3. Pada 87.986, angka 7 bernilai..."
          visual={<Papan anak="87.986" />}
          pilihan={[
            { huruf: "A", teks: "7.000" },
            { huruf: "B", teks: "70" },
            { huruf: "C", teks: "700" },
            { huruf: "D", teks: "70.000" },
          ]}
          benar="A"
          umpan="Rak ribuan. Nilainya 7.000."
          salah="Hitung posisi dari kanan."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. 45.000 − 17.250 = ..."
          visual={<Papan anak="45.000 − 17.250 = ⬜" />}
          pilihan={[
            { huruf: "A", teks: "28.750" },
            { huruf: "B", teks: "27.850" },
            { huruf: "C", teks: "27.750" },
            { huruf: "D", teks: "62.250" },
          ]}
          benar="C"
          umpan="27.750."
          salah="Kurangi pelan dari satuan."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan bilangan dengan bacaannya."
          baris={[
            { kiri: "15.590", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[1] },
            { kiri: "26.932", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[0] },
            { kiri: "87.986", pilihan: BACAAN_HARGA, benar: BACAAN_HARGA[2] },
          ]}
          umpan="Tiga pasangan benar."
        />
        <SusunToken
          id={idKuis("D", 5)}
          perintah="6. Susun dari yang paling kecil."
          acak={["40.350", "13.456", "25.786"]}
          benar={["13.456", "25.786", "40.350"]}
          umpan="13.456, 25.786, 40.350."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. 125 × 4 = ..."
          visual={<Papan anak="125 × 4 = ⬜" />}
          pilihan={[
            { huruf: "A", teks: "500" },
            { huruf: "B", teks: "450" },
            { huruf: "C", teks: "525" },
            { huruf: "D", teks: "400" },
          ]}
          benar="A"
          umpan="500."
          salah="Tambah 125 empat kali."
        />
        <Pilih
          id={idKuis("D", 7)}
          pertanyaan="8. Mana yang lebih besar?"
          visual={<Papan anak="54.675 · 40.350" />}
          pilihan={[
            { huruf: "A", teks: "40.350" },
            { huruf: "B", teks: "54.675" },
            { huruf: "C", teks: "Sama besar" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="54.675 lebih besar."
          salah="Bandingkan puluh ribuan."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Baca bilangan 15.590."
          periksa={baca15590}
          petunjuk="Lima belas ribu…"
          benar="Lima belas ribu lima ratus sembilan puluh."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Pembagian"
          visual={<Papan anak="840 ÷ 6 = ⬜" />}
          pertanyaan="Tulis hasilnya."
          pesanSalah="6 × berapa = 840?"
          bantuan="140."
          umpan="140."
          periksa={bagi140}
          alias={["140"]}
          konteks="840 ÷ 6 = 140."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab1({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "26.932 dibaca dua puluh enam ribu sembilan ratus tiga puluh dua.",
          "Pada 87.986 angka 7 bernilai 7.000. Bandingkan dari kiri.",
          "35.247 = 30.000 + 5.000 + 200 + 40 + 7. 12.450 + 8.375 = 20.825.",
        ])}
        poin={[
          "Lima rak: puluh ribuan, ribuan, ratusan, puluhan, satuan.",
          "26.932 dibaca dua puluh enam ribu sembilan ratus tiga puluh dua.",
          "Pada 87.986, angka 7 bernilai 7.000.",
          "15.590 dibaca lima belas ribu lima ratus sembilan puluh.",
          "54.675 lebih besar dari 40.350 karena puluh ribuannya lebih besar.",
          "Urutan dari kecil: 13.456, 25.786, 40.350, 54.675, 88.976.",
          "35.247 = 30.000 + 5.000 + 200 + 40 + 7.",
          "12.450 + 8.375 = 20.825. 45.000 − 17.250 = 27.750.",
          "125 × 4 = 500. 840 ÷ 6 = 140.",
          "Titik hanya pemisah ribuan, bukan angka.",
        ]}
        penutup="Kalimat kunci: “Baca dari kiri, susun di rak, bandingkan, lalu hitung dari satuan.”"
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
