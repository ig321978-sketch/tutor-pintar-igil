import type { AdeganStory } from "./logika-story";
import { W, barisTabel, batang, emo, judul, kartu, sisi, susunHasil, susunSimpan, susunSoal, teks } from "./k4b1g-gambar";
import { IKON_METODE, NAMA_METODE, WARNA_METODE, kepala } from "./k4b1g-luar-1";
import { bersih, hapus, idx, k, sebar, sorotkan, tambah } from "./k4b1g-bantu";

/* ------------------------------ 6. Times Table Fluency: konsep ------------------------------ */
const SUARA_C1 = "Metode ketiga, Times Table Fluency, atau Kefasihan Tabel Kali. Murid menghafal fakta kali dasar sampai lancar. Contohnya tabel kali tujuh, bagian pertama.";
const SUARA_C2 = "Bagian kedua tabel kali tujuh. Dua fakta akan kita pakai: empat kali tujuh sama dengan dua puluh delapan, dan delapan kali tujuh sama dengan lima puluh enam.";
const SUARA_C3 = "Hafal fakta kali membuat langkah satuan dan puluhan pada cara bersusun terasa cepat. Kita tidak berhenti menghitung satu per satu.";

/** Satu baris tabel kali tujuh: n kali tujuh. Kolom kiri n = 1 sampai 5, kolom kanan n = 6 sampai 10. */
const baris = (n: number) => teks(`tk${n}`, n <= 5 ? 75 : 225, 84 + ((n - 1) % 5) * 20, `${n} × 7 = ${n * 7}`, 10.5, W.biru);

export const ADEGAN_LUAR_FAKTA: AdeganStory = {
  id: "luar-fakta",
  judul: "Times Table Fluency: fakta kali lancar",
  sumber: "Metode luar: Times Table Fluency",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, kepala(2)),
      tambah("Contohnya", teks("tkj", 150, 66, "tabel kali tujuh", 10, W.coklat)),
      ...[1, 2, 3, 4, 5].map((n, i) => tambah(sebar(SUARA_C1, 5, idx(SUARA_C1, "Contohnya"))[i], baris(n))),
    ),
    k(
      SUARA_C2,
      ...[6, 7, 8, 9, 10].map((n, i) => tambah(sebar(SUARA_C2, 5, 0)[i], baris(n))),
      sorotkan(idx(SUARA_C2, "empat"), "tk4"),
      sorotkan(idx(SUARA_C2, "delapan", 2), "tk8"),
    ),
    k(
      SUARA_C3,
      tambah("Hafal", ...kartu("tkk", 20, 172, 260, 26, W.emas, ["fakta hafal: langkah cepat, tanpa hitung ulang"], 8.8)),
    ),
  ],
};

/* ------------------------------ 7. Times Table Fluency: penerapan ------------------------------ */
const SUARA_D1 = "Terapan pada soal e, empat puluh delapan kali tujuh. Satuan: delapan kali tujuh adalah fakta, lima puluh enam. Tulis enam, simpan lima.";
const SUARA_D2 = "Puluhan: empat kali tujuh adalah fakta, dua puluh delapan. Tambah lima yang disimpan, hasilnya tiga puluh tiga. Tiga ditulis di puluhan, tiga lagi di ratusan.";
const SUARA_D3 = "Hasilnya tiga ratus tiga puluh enam, cocok dengan kunci buku. Karena faktanya lancar, dua langkah itu berjalan cepat.";

const TF = susunSoal("tf", 70, 88, 48, 7);
const TFH = susunHasil("tf", 70, 88, "336");

export const ADEGAN_LUAR_FAKTA_TERAPAN: AdeganStory = {
  id: "luar-fakta-terapan",
  judul: "Times Table Fluency: empat puluh delapan kali tujuh",
  sumber: "Metode luar: Times Table Fluency, soal buku",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, kepala(2)),
      tambah(0, sisi("tfn", 130, 68, "soal e: 48 × 7", 9.4, W.coklat)),
      tambah(idx(SUARA_D1, "empat"), TF[0], TF[1]),
      tambah(idx(SUARA_D1, "tujuh"), TF[3], TF[2], TF[4]),
      tambah("Satuan:", ...kartu("tff1", 128, 92, 156, 26, W.langit, ["fakta: 8 × 7 = 56"], 9.6)),
      tambah("Tulis", TFH[2]),
      tambah("simpan", susunSimpan("tf", 70, 88, "5")),
    ),
    k(
      SUARA_D2,
      tambah("Puluhan:", ...kartu("tff2", 128, 124, 156, 26, W.hijauMuda, ["fakta: 4 × 7 = 28"], 9.6)),
      tambah("Tambah", sisi("tf3", 130, 170, "28 + 5 = 33", 11, W.merah)),
      tambah(idx(SUARA_D2, "ditulis"), TFH[1]),
      tambah("ratusan.", TFH[0]),
    ),
    k(
      SUARA_D3,
      sorotkan("Hasilnya", "tf-h0", "tf-h1", "tf-h2"),
      tambah("kunci", ...kartu("tfk", 14, 160, 106, 28, W.emas, ["48 × 7 = 336"], 10)),
      tambah("lancar,", emo("tfe", 262, 188, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 8. Doubling: konsep ------------------------------ */
const SUARA_E1 = "Metode keempat, Doubling, atau Penggandaan. Menggandakan berarti menambah bilangan dengan dirinya sendiri, sama dengan mengalikan dua. Gandakan dua kali untuk kali empat, tiga kali untuk kali delapan.";
const SUARA_E2 = "Contoh donat: dua belas dikali empat. Gandakan dua belas menjadi dua puluh empat, lalu gandakan lagi menjadi empat puluh delapan.";
const SUARA_E3 = "Jadi dua belas kali empat sama dengan menggandakan dua kali. Hasilnya empat puluh delapan, sama dengan penjumlahan berulang di buku.";

const SKALA = 2.8;
/** Batang bernilai di (14, y) dengan angkanya di dalam batang. Id batang `${id}`, angka `${id}t`. */
const bar = (id: string, y: number, nilai: number, warna: string) => [batang(id, 14, y, nilai, SKALA, 18, warna), teks(`${id}t`, 14 + (nilai * SKALA) / 2, y + 13, String(nilai), 10, W.biru)];

export const ADEGAN_LUAR_GANDA: AdeganStory = {
  id: "luar-ganda",
  judul: "Doubling: menggandakan bilangan",
  sumber: "Metode luar: Doubling",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, kepala(3)),
      tambah(idx(SUARA_E1, "dua"), ...kartu("dc1", 14, 62, 272, 30, W.hijauMuda, ["× 2: gandakan 1 kali"], 9.6)),
      tambah(idx(SUARA_E1, "empat"), ...kartu("dc2", 14, 102, 272, 30, W.langit, ["× 4: gandakan 2 kali"], 9.6)),
      tambah(idx(SUARA_E1, "delapan"), ...kartu("dc3", 14, 142, 272, 30, W.krem, ["× 8: gandakan 3 kali"], 9.6)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, kepala(3)),
      tambah("dua", ...bar("dd0", 64, 12, W.hijauMuda)),
      tambah("puluh", ...bar("dd1", 90, 24, W.langit), sisi("dg1", 87, 103, "12 × 2 = 24", 9.4, W.coklat)),
      tambah(idx(SUARA_E2, "puluh", 2), ...bar("dd2", 116, 48, W.krem), sisi("dg2", 154, 129, "24 × 2 = 48", 9.4, W.coklat)),
    ),
    k(
      SUARA_E3,
      tambah("Jadi", ...kartu("de", 60, 148, 180, 40, W.emas, ["12 × 4 = 48", "kali 4 = gandakan 2 kali"], 9.6)),
      sorotkan("Hasilnya", "dd2"),
    ),
  ],
};

/* ------------------------------ 9. Doubling: penerapan ------------------------------ */
const SUARA_F1 = "Terapan: delapan pak pensil, tiap pak dua belas batang. Delapan sama dengan dua kali dua kali dua, jadi gandakan tiga kali, mulai dari dua belas.";
const SUARA_F2 = "Gandakan pertama: dua belas menjadi dua puluh empat. Gandakan kedua: dua puluh empat menjadi empat puluh delapan.";
const SUARA_F3 = "Gandakan ketiga: empat puluh delapan menjadi sembilan puluh enam. Jadi dua belas kali delapan sama dengan sembilan puluh enam pensil, cocok dengan kunci buku.";
const SUARA_F4 = "Cara serupa pada kucing Azizah: dua puluh satu kali empat. Dua puluh satu menjadi empat puluh dua, lalu delapan puluh empat, cocok dengan kunci kaki kucing.";

export const ADEGAN_LUAR_GANDA_TERAPAN: AdeganStory = {
  id: "luar-ganda-terapan",
  judul: "Doubling: pensil dan kaki kucing",
  sumber: "Metode luar: Doubling, soal buku",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, kepala(3)),
      tambah("dua", ...bar("fp0", 62, 12, W.hijauMuda)),
      tambah(idx(SUARA_F1, "delapan", 2), teks("fpn", 150, 182, "8 pak = 2 × 2 × 2: gandakan 3 kali", 9.4, W.biru)),
    ),
    k(
      SUARA_F2,
      tambah("pertama:", ...bar("fp1", 88, 24, W.langit), sisi("fg1", 87, 101, "12 × 2 = 24", 9.4, W.coklat)),
      tambah("kedua:", ...bar("fp2", 114, 48, W.krem), sisi("fg2", 154, 127, "24 × 2 = 48", 9.4, W.coklat)),
    ),
    k(
      SUARA_F3,
      hapus("Gandakan", "fpn"),
      tambah("Gandakan", ...bar("fp3", 140, 96, W.pink)),
      tambah("Jadi", ...kartu("fpk", 70, 168, 160, 28, W.emas, ["12 × 8 = 96 pensil"], 10)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, kepala(3)),
      tambah("Cara", ...bar("fk0", 64, 21, W.hijauMuda)),
      tambah(idx(SUARA_F4, "dua", 3), ...bar("fk1", 90, 42, W.langit), sisi("fh1", 138, 103, "21 × 2 = 42", 9.4, W.coklat)),
      tambah(idx(SUARA_F4, "puluh", 4), ...bar("fk2", 116, 84, W.krem), sisi("fh2", 14, 150, "42 × 2 = 84", 9.4, W.coklat)),
      tambah("cocok", ...kartu("fkk", 70, 164, 160, 28, W.emas, ["21 × 4 = 84 kaki"], 10)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan metode luar ------------------------------ */
const SUARA_Z1 = "Ringkasnya, empat metode: Equal Groups menambah kelompok sama banyak, Array Model membaca baris dan kolom, Times Table Fluency memakai fakta hafalan, dan Doubling menggandakan bilangan.";
const SUARA_Z2 = "Angka buku yang dipakai: dua belas kotak donat, empat belas baju berkancing, delapan pak pensil, dan soal e, empat puluh delapan kali tujuh.";
const SUARA_Z3 = "Memilih metode: untuk menjumlahkan kelompok, pakai Equal Groups. Untuk membaca baris dan kolom, pakai Array Model. Untuk bilangan yang dikali dua, empat, atau delapan, gandakan. Fakta kali yang hafal membantu semuanya.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Ringkasan empat metode")),
      ...["menambah kelompok sama", "baca baris dan kolom", "pakai fakta hafalan", "menggandakan bilangan"].map((t, i) => tambah(["Equal", "Array", "Times", "Doubling"][i], ...kartu(`r${i}`, 12, 32 + i * 38, 276, 30, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${t}`], 8.8))),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Angka buku yang dipakai")),
      tambah("Angka", ...barisTabel("rt0", 14, 34, [110, 162], ["metode", "angka buku"], 24, 8.4, true)),
      tambah("kotak", ...barisTabel("rt1", 14, 58, [110, 162], ["Equal Groups", "12 × 4, 12 × 3, 21 × 4"], 24, 8.2)),
      tambah("empat", ...barisTabel("rt2", 14, 82, [110, 162], ["Array Model", "12 × 4, 14 × 7"], 24, 8.2)),
      tambah("soal", ...barisTabel("rt3", 14, 106, [110, 162], ["Times Table Fluency", "48 × 7"], 24, 8.2)),
      tambah("pensil,", ...barisTabel("rt4", 14, 130, [110, 162], ["Doubling", "12 × 4, 12 × 8, 21 × 4"], 24, 8.2)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("menjumlahkan", ...kartu("p1", 14, 32, 272, 28, W.hijauMuda, ["kelompok sama: Equal Groups"], 9)),
      tambah("membaca", ...kartu("p2", 14, 66, 272, 28, W.langit, ["baris dan kolom: Array Model"], 9)),
      tambah("bilangan", ...kartu("p3", 14, 100, 272, 28, W.pink, ["kali 2, 4, atau 8: gandakan"], 9)),
      tambah("Fakta", ...kartu("p4", 14, 134, 272, 28, W.krem, ["fakta kali hafal: membantu semuanya"], 9)),
      tambah("hafal", emo("p5", 150, 188, IKON_METODE[2], 22)),
    ),
  ],
};
